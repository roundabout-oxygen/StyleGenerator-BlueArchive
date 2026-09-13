"""
BlueArchive Scene Maker - server.py
Version: v1.0.37
Local server supporting PC and Smartphone (Android) Wi-Fi access with Local IP announcement
"""

import http.server
import socketserver
import os
import json
import urllib.parse
import webbrowser
import sys
import socket

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DOWNLOAD_SAMPLE_DIR = os.path.join(DIRECTORY, "samples")

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class BlueArchiveHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = http.server.SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        '.otf': 'font/otf',
        '.ttf': 'font/ttf',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.json': 'application/json',
    })

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        # API: List sample images
        if path == "/api/local-samples":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

            samples = []
            if os.path.isdir(DOWNLOAD_SAMPLE_DIR):
                for fname in sorted(os.listdir(DOWNLOAD_SAMPLE_DIR)):
                    if fname.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                        samples.append(fname)

            resp_data = json.dumps({"samples": samples}, ensure_ascii=False)
            self.wfile.write(resp_data.encode("utf-8"))
            return

        # API: Serve sample image
        if path == "/api/sample-image":
            query = urllib.parse.parse_qs(parsed_url.query)
            filename = query.get("file", [None])[0]
            if filename:
                safe_name = os.path.basename(filename)
                target_path = os.path.join(DOWNLOAD_SAMPLE_DIR, safe_name)
                if os.path.isfile(target_path):
                    self.send_response(200)
                    if safe_name.lower().endswith('.png'):
                        self.send_header("Content-Type", "image/png")
                    elif safe_name.lower().endswith(('.jpg', '.jpeg')):
                        self.send_header("Content-Type", "image/jpeg")
                    else:
                        self.send_header("Content-Type", "application/octet-stream")
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    with open(target_path, "rb") as f:
                        self.wfile.write(f.read())
                    return

            self.send_error(404, "File Not Found")
            return

        super().do_GET()

def start_server():
    port = PORT
    max_attempts = 10
    httpd = None

    for attempt in range(max_attempts):
        try:
            httpd = socketserver.TCPServer(("", port), BlueArchiveHandler)
            break
        except OSError:
            print(f"Port {port} is occupied, trying {port + 1}...")
            port += 1

    if not httpd:
        print("Could not find an available port to start server.")
        sys.exit(1)

    local_ip = get_local_ip()
    local_url = f"http://localhost:{port}/index.html"
    mobile_url = f"http://{local_ip}:{port}/index.html"

    print("=" * 64)
    print("  BlueArchive Scene Maker [v1.0.37]")
    print("=" * 64)
    print(f" [PC Access]         : {local_url}")
    print(f" [Smartphone Access] : {mobile_url}")
    print("=" * 64)
    print(" - スマホ（Android）のブラウザで [Smartphone Access] のURLを開くと、")
    print("   同じWi-Fi内からカメラ重ね合わせ撮影アプリとして使用できます。")
    print(" - Press Ctrl+C to stop the server")
    print("=" * 64)

    # Open browser on PC
    webbrowser.open(local_url)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.server_close()

if __name__ == "__main__":
    start_server()
