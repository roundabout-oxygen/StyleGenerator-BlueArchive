package com.example.bluearchivescenemaker

import android.Manifest
import android.content.ContentValues
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.util.Base64
import android.webkit.JavascriptInterface
import android.webkit.PermissionRequest
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat
import java.io.File
import java.io.FileOutputStream
import java.io.OutputStream

class MainActivity : ComponentActivity() {

    companion object {
        const val VERSION = "v1.0.48"
    }

    private lateinit var webView: WebView
    private var filePathCallback: ValueCallback<Array<Uri>>? = null

    private val fileChooserLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            val intent = result.data
            val results: Array<Uri>? = when {
                intent?.data != null -> arrayOf(intent.data!!)
                intent?.clipData != null -> {
                    val clip = intent.clipData!!
                    Array(clip.itemCount) { i -> clip.getItemAt(i).uri }
                }
                else -> null
            }
            filePathCallback?.onReceiveValue(results)
        } else {
            filePathCallback?.onReceiveValue(null)
        }
        filePathCallback = null
    }

    private val cameraPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (!isGranted) {
            Toast.makeText(this, "カメラ機能を利用するにはカメラの権限が必要です", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // フルスクリーン・イマーシブモード設定
        setupFullScreen()

        // カメラパーミッション確認
        checkCameraPermission()

        // WebView セットアップ
        webView = WebView(this)
        setContentView(webView)

        setupWebView()
    }

    private fun setupFullScreen() {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        val controller = WindowInsetsControllerCompat(window, window.decorView)
        controller.hide(WindowInsetsCompat.Type.systemBars())
        controller.systemBarsBehavior =
            WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
    }

    private fun checkCameraPermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
            != PackageManager.PERMISSION_GRANTED
        ) {
            cameraPermissionLauncher.launch(Manifest.permission.CAMERA)
        }
    }

    private fun setupWebView() {
        val settings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.allowFileAccess = true
        settings.allowContentAccess = true
        settings.mediaPlaybackRequiresUserGesture = false
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true

        // WebViewAssetLoader により HTTPS オリジンとしてローカルアセットを安全に読み込む
        val assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        webView.webViewClient = object : WebViewClientCompat() {
            override fun shouldInterceptRequest(
                view: WebView,
                request: WebResourceRequest
            ): WebResourceResponse? {
                return assetLoader.shouldInterceptRequest(request.url)
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            // WebRTC カメラ権限の要求を許可
            override fun onPermissionRequest(request: PermissionRequest) {
                runOnUiThread {
                    request.grant(request.resources)
                }
            }

            // ファイル選択（画像読み込み・JSON読込）のサポート
            override fun onShowFileChooser(
                webView: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                this@MainActivity.filePathCallback?.onReceiveValue(null)
                this@MainActivity.filePathCallback = filePathCallback

                val acceptTypes = fileChooserParams?.acceptTypes ?: emptyArray()
                val isImageExplicit = acceptTypes.isNotEmpty() && acceptTypes.all { it.startsWith("image/", ignoreCase = true) }

                val chooserIntent = if (isImageExplicit) {
                    // ACTION_PICK with MediaStore launches the full gallery view rather than a cramped bottom sheet
                    val pickIntent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI).apply {
                        type = "image/*"
                    }
                    val getContentIntent = Intent(Intent.ACTION_GET_CONTENT).apply {
                        addCategory(Intent.CATEGORY_OPENABLE)
                        type = "image/*"
                    }
                    Intent.createChooser(pickIntent, "画像を選択").apply {
                        putExtra(Intent.EXTRA_INITIAL_INTENTS, arrayOf(getContentIntent))
                    }
                } else {
                    // For JSON, text, or general file picker: launch system document/file manager
                    val getDocIntent = Intent(Intent.ACTION_GET_CONTENT).apply {
                        addCategory(Intent.CATEGORY_OPENABLE)
                        type = "*/*"
                        putExtra(Intent.EXTRA_MIME_TYPES, arrayOf("application/json", "text/plain", "application/octet-stream", "*/*"))
                    }
                    Intent.createChooser(getDocIntent, "ファイルを選択")
                }

                fileChooserLauncher.launch(chooserIntent)
                return true
            }
        }

        // JavaScript との連携用ネイティブインターフェース登録
        webView.addJavascriptInterface(WebAppInterface(), "AndroidApp")

        // 安全なHTTPSオリジンから assets/index.html を読み込み
        webView.loadUrl("https://appassets.androidplatform.net/assets/index.html")
    }

    override fun onResume() {
        super.onResume()
        setupFullScreen()
    }

    inner class WebAppInterface {
        @JavascriptInterface
        fun getAppVersion(): String {
            return VERSION
        }

        @JavascriptInterface
        fun showToast(message: String) {
            runOnUiThread {
                Toast.makeText(this@MainActivity, message, Toast.LENGTH_SHORT).show()
            }
        }

        @JavascriptInterface
        fun saveJsonFile(jsonString: String, filename: String) {
            try {
                val name = if (filename.endsWith(".json", ignoreCase = true)) filename else "$filename.json"
                val savedUri = saveTextToDownloads(jsonString, name)
                runOnUiThread {
                    if (savedUri != null) {
                        Toast.makeText(
                            this@MainActivity,
                            "JSONを保存しました: $name",
                            Toast.LENGTH_LONG
                        ).show()
                    } else {
                        Toast.makeText(
                            this@MainActivity,
                            "JSONの保存に失敗しました",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
                runOnUiThread {
                    Toast.makeText(this@MainActivity, "JSON保存エラー: ${e.localizedMessage}", Toast.LENGTH_LONG).show()
                }
            }
        }

        @JavascriptInterface
        fun saveImage(base64Data: String, filename: String) {
            try {
                val cleanBase64 = if (base64Data.contains(",")) {
                    base64Data.substringAfter(",")
                } else {
                    base64Data
                }
                val imageBytes = Base64.decode(cleanBase64, Base64.DEFAULT)
                val bitmap = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.size)

                val savedUri = saveBitmapToGallery(bitmap, filename)
                runOnUiThread {
                    if (savedUri != null) {
                        Toast.makeText(
                            this@MainActivity,
                            "画像をギャラリーに保存しました: $filename",
                            Toast.LENGTH_LONG
                        ).show()
                    } else {
                        Toast.makeText(
                            this@MainActivity,
                            "画像の保存に失敗しました",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
                runOnUiThread {
                    Toast.makeText(
                        this@MainActivity,
                        "保存エラー: ${e.localizedMessage}",
                        Toast.LENGTH_LONG
                    ).show()
                }
            }
        }
    }

    private fun saveBitmapToGallery(bitmap: Bitmap, filename: String): Uri? {
        val fos: OutputStream?
        var imageUri: Uri? = null

        val name = if (filename.endsWith(".png", ignoreCase = true)) filename else "$filename.png"

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val resolver = contentResolver
            val contentValues = ContentValues().apply {
                put(MediaStore.MediaColumns.DISPLAY_NAME, name)
                put(MediaStore.MediaColumns.MIME_TYPE, "image/png")
                put(
                    MediaStore.MediaColumns.RELATIVE_PATH,
                    Environment.DIRECTORY_PICTURES + File.separator + "BlueArchiveScene"
                )
            }
            val uri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, contentValues)
            if (uri != null) {
                fos = resolver.openOutputStream(uri)
                if (fos != null) {
                    bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos)
                    fos.flush()
                    fos.close()
                    imageUri = uri
                }
            }
        } else {
            val imagesDir = Environment.getExternalStoragePublicDirectory(
                Environment.DIRECTORY_PICTURES + File.separator + "BlueArchiveScene"
            )
            if (!imagesDir.exists()) {
                imagesDir.mkdirs()
            }
            val image = File(imagesDir, name)
            fos = FileOutputStream(image)
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos)
            fos.flush()
            fos.close()
            imageUri = Uri.fromFile(image)

            val mediaScanIntent = Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE)
            mediaScanIntent.data = imageUri
            sendBroadcast(mediaScanIntent)
        }
        return imageUri
    }

    private fun saveTextToDownloads(textContent: String, filename: String): Uri? {
        var fileUri: Uri? = null
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                val resolver = contentResolver
                val contentValues = ContentValues().apply {
                    put(MediaStore.MediaColumns.DISPLAY_NAME, filename)
                    put(MediaStore.MediaColumns.MIME_TYPE, "application/json")
                    put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + File.separator + "BlueArchiveScene")
                }
                val uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, contentValues)
                if (uri != null) {
                    val fos = resolver.openOutputStream(uri)
                    if (fos != null) {
                        fos.write(textContent.toByteArray(Charsets.UTF_8))
                        fos.flush()
                        fos.close()
                        fileUri = uri
                    }
                }
            } else {
                val downloadsDir = Environment.getExternalStoragePublicDirectory(
                    Environment.DIRECTORY_DOWNLOADS + File.separator + "BlueArchiveScene"
                )
                if (!downloadsDir.exists()) {
                    downloadsDir.mkdirs()
                }
                val file = File(downloadsDir, filename)
                val fos = FileOutputStream(file)
                fos.write(textContent.toByteArray(Charsets.UTF_8))
                fos.flush()
                fos.close()
                fileUri = Uri.fromFile(file)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return fileUri
    }
}
