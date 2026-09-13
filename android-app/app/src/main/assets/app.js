/**
 * BlueArchive Scene Maker - app.js
 * Version: v1.0.47
 */

(function () {
  'use strict';

  // Global error monitoring for WebView
  window.addEventListener('error', (e) => {
    console.error('Global JS Error:', e.message, e.filename, e.lineno, e.error);
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
  });

  // --- Initial Default Presets ---
  const DEFAULT_PRESETS = [
    {
      id: 'preset_basic_empty',
      name: '【初期基本形】UI＋セリフ枠（テキスト空白）',
      dialogue: {
        visible: true,
        name: '',
        sub: '',
        nameColor: '#ffffff',
        subColor: '#43b5ff',
        text: '',
        marker: true,
        gradient: true,
        yOffset: 0
      },
      sensei: {
        visible: false,
        count: 1,
        text1: '',
        text2: '',
        quotes: true,
        posY: 41.2,
        scale: 100
      },
      effect: {
        visible: false,
        type: 'dots',
        customText: 'zzz',
        tail: 'bottom-left',
        posX: 32,
        posY: 30,
        scale: 100
      },
      ui: {
        visible: true,
        showAuto: true,
        showMenu: true,
        scale: 100
      },
      bgType: 'none',
      charVariant: 'none',
      charCount: 0,
      charDim: false
    },
    {
      id: 'preset_himari',
      name: 'ヒマリ「内部から領域を破壊」',
      dialogue: {
        visible: true,
        name: 'ヒマリ',
        sub: '特異現象捜査部',
        nameColor: '#ffffff',
        subColor: '#43b5ff',
        text: 'おそらく、内部から領域を破壊する必要があるかと。',
        marker: true,
        gradient: true,
        yOffset: 0
      },
      sensei: {
        visible: true,
        count: 1,
        text1: '領域……分かった！',
        text2: 'でも、偽物で良かった。これでコノカも安心――',
        quotes: true,
        posY: 40,
        scale: 100
      },
      effect: {
        visible: true,
        type: 'dots',
        customText: 'zzz',
        tail: 'bottom-left',
        posX: 32,
        posY: 30,
        scale: 100
      },
      ui: {
        visible: true,
        showAuto: true,
        showMenu: true,
        scale: 100
      },
      bgType: 'day',
      charVariant: 'A',
      charDim: false
    },
    {
      id: 'preset_konoka',
      name: 'コノカ「うわぁぁぁぁぁ！！」',
      dialogue: {
        visible: true,
        name: 'コノカ',
        sub: '公安局',
        nameColor: '#ffffff',
        subColor: '#43b5ff',
        text: 'うわぁぁぁぁぁ！！',
        marker: true,
        gradient: true,
        yOffset: 0
      },
      sensei: {
        visible: false,
        count: 1,
        text1: '大丈夫か！？',
        text2: '',
        quotes: true,
        posY: 40,
        scale: 100
      },
      effect: {
        visible: true,
        type: 'sweat',
        customText: '',
        tail: 'bottom-left',
        posX: 38,
        posY: 26,
        scale: 110
      },
      ui: {
        visible: true,
        showAuto: true,
        showMenu: true,
        scale: 100
      },
      bgType: 'night',
      charVariant: 'B',
      charDim: false
    },
    {
      id: 'preset_mirai',
      name: 'ミライ「え、ちょ、ちょっと待ってください！？」',
      dialogue: {
        visible: true,
        name: 'ミライ',
        sub: '疑似科学部',
        nameColor: '#ffffff',
        subColor: '#43b5ff',
        text: 'え、ちょ、ちょっと待ってください！？',
        marker: true,
        gradient: true,
        yOffset: 0
      },
      sensei: {
        visible: false,
        count: 1,
        text1: '',
        text2: '',
        quotes: true,
        posY: 40,
        scale: 100
      },
      effect: {
        visible: true,
        type: 'exclamation_question',
        customText: '',
        tail: 'bottom-left',
        posX: 34,
        posY: 28,
        scale: 110
      },
      ui: {
        visible: true,
        showAuto: true,
        showMenu: true,
        scale: 100
      },
      bgType: 'night',
      charVariant: 'A',
      charDim: false
    },
    {
      id: 'preset_rena',
      name: 'レナ「ほらね！やっぱ大したことなかったでしょ？」',
      dialogue: {
        visible: true,
        name: 'レナ',
        sub: 'オカルト研究会',
        nameColor: '#ffffff',
        subColor: '#43b5ff',
        text: 'ほらね！やっぱ大したことなかったでしょ？\nねぇ、先生！',
        marker: true,
        gradient: true,
        yOffset: 0
      },
      sensei: {
        visible: true,
        count: 2,
        text1: 'わ、私に振らないでよぉ……。',
        text2: 'でも、偽物で良かった。これでコノカも安心――',
        quotes: true,
        posY: 38,
        scale: 100
      },
      effect: {
        visible: false,
        type: 'dots',
        customText: '',
        tail: 'bottom-left',
        posX: 32,
        posY: 30,
        scale: 100
      },
      ui: {
        visible: true,
        showAuto: true,
        showMenu: true,
        scale: 100
      },
      bgType: 'day',
      charVariant: 'A',
      charDim: false
    },
    {
      id: 'preset_scenery',
      name: '【生徒0人】キヴォトスの風景（背景・選択肢のみ）',
      dialogue: {
        visible: true,
        name: '',
        sub: '',
        nameColor: '#ffffff',
        subColor: '#43b5ff',
        text: '――今日もキヴォトスには、穏やかな日常の風が流れている。',
        marker: true,
        gradient: true,
        yOffset: 0
      },
      sensei: {
        visible: true,
        count: 1,
        text1: 'さて、今日のスケジュールを確認しよう',
        text2: '',
        quotes: true,
        posY: 42,
        scale: 100
      },
      effect: {
        visible: false,
        type: 'dots',
        customText: '',
        tail: 'bottom-left',
        posX: 32,
        posY: 30,
        scale: 100
      },
      ui: {
        visible: true,
        showAuto: true,
        showMenu: true,
        scale: 100
      },
      bgType: 'day',
      charVariant: 'none',
      charCount: 0,
      charDim: false
    }
  ];

  // --- State ---
  const state = {
    version: 'v1.0.47',
    screen: {
      width: 1440,
      height: 1080
    },
    bg: {
      mode: 'image', // 'image' or 'camera'
      image: null,
      blur: 0,
      brightness: 100,
      cachedBgImage: null // Preserve preset background when camera is active
    },
    camera: {
      active: false,
      stream: null,
      facingMode: 'environment' // 'environment' (back) or 'user' (front)
    },
    characters: [],
    selectedCharId: null,
    dialogue: {
      visible: true,
      name: '',
      sub: '',
      nameColor: '#ffffff',
      subColor: '#43b5ff',
      text: '',
      marker: true,
      gradient: true,
      yOffset: 0,
      scale: 100
    },
    sensei: {
      visible: false,
      count: 1,
      text1: '',
      text2: '',
      quotes: true,
      posY: 38.9,
      scale: 100
    },
    effect: {
      visible: false,
      type: 'dots',
      customText: 'zzz',
      tail: 'bottom-left',
      posX: 32,
      posY: 30,
      scale: 100,
      flipX: false
    },
    ui: {
      visible: true,
      showAuto: true,
      showMenu: true,
      scale: 100
    }
  };

// Student Name & Affiliation Database
const STUDENT_DATABASE = [["アイリ", "放課後スイーツ部"], ["アオイ", "連邦生徒会"], ["アオバ", "貨物輸送管理部"], ["アカネ", "Cleaning&Clearing"], ["アカリ", "美食研究会"], ["アキラ", "寮監隊"], ["アケミ", ""], ["アコ", "風紀委員会"], ["アザミ", "花鳥風月部"], ["アスナ", "Cleaning&Clearing"], ["アズサ", "補習授業部"], ["アツコ", "アリウススクワッド"], ["アミ", "アイランド"], ["アヤネ", "対策委員会"], ["アヤメ", "百花繚乱紛争調停委員会"], ["アユム", "連邦生徒会"], ["アラタ", "魑魅一座・路上流"], ["アリス", "ゲーム開発部"], ["アル", "便利屋68"], ["アロナ", "シッテムの箱"], ["イオリ", "風紀委員会"], ["イズナ", "忍術研究部"], ["イズミ", "美食研究会"], ["イチカ", "正義実現委員会"], ["イブキ", "万魔殿"], ["イロハ", "万魔殿"], ["ウイ", "図書委員会"], ["ウタハ", "エンジニア部"], ["ウミカ", "お祭り運営委員会"], ["エイミ", "特異現象捜査部"], ["エリ", "オカルト研究会"], ["エリカ", "キラキラ部"], ["オトギ", "FOX小隊"], ["カイ", "錬丹術研究会(元)"], ["カエデ", "修行部"], ["カグヤ", "京劇部"], ["カスミ", "温泉開発部"], ["カズサ", "放課後スイーツ部"], ["カナエ", "玄龍門"], ["カノエ", "オカルト研究会"], ["カホ", "陰陽部"], ["カヤ", "連邦生徒会"], ["カヨコ", "便利屋68"], ["カリン", "Cleaning&Clearing"], ["カレン", "ゲヘナ再興委員会"], ["カンナ", "公安局"], ["キキョウ", "百花繚乱紛争調停委員会"], ["キサキ", "玄龍門"], ["キララ", "キラキラ部"], ["キリノ", "生活安全局"], ["クズノハ", ""], ["クルミ", "FOX小隊"], ["ケイ", "特異現象捜査部"], ["コクリコ", "花鳥風月部"], ["ココナ", "梅花園"], ["ココロ", "ダイビング部"], ["コタマ", "ヴェリタス"], ["コトネ", "ダイビング部"], ["コトリ", "エンジニア部"], ["コノカ", "公安局"], ["コハル", "補習授業部"], ["コユキ", "セミナー"], ["サオリ", "アリウススクワッド"], ["サキ", "RABBIT小隊"], ["サクラコ", "シスターフッド"], ["サツキ", "万魔殿"], ["サナエ", "医務室"], ["サヤ", "錬丹術研究会"], ["サユリ", "ダイビング部"], ["シグレ", "227号特別クラス"], ["シズコ", "お祭り運営委員会"], ["シノン", "報道部"], ["シミコ", "図書委員会"], ["シュロ", "花鳥風月部"], ["シュン", "梅花園"], ["ショウコ", "ゲヘナ再興委員会"], ["シロコ", "対策委員会"], ["シロコ", "アビドス生徒会"], ["ジュリ", "給食部"], ["ジュンコ", "美食研究会"], ["スイコ", "雛鳥組"], ["スオウ", "ハイランダー監理室"], ["スズミ", "トリニティ自警団"], ["スバル", "ニコメディアトゥループ"], ["スミカ", "トライデント"], ["スミレ", "トレーニング部"], ["スモモ", "連邦生徒会"], ["セイア", "ティーパーティー"], ["セナ", "救急医学部"], ["セリカ", "対策委員会"], ["セリナ", "救護騎士団"], ["ソラ", "エンジェル24"], ["タカネ", "出版部"], ["チアキ", "万魔殿"], ["チェリノ", "レッドウィンター事務局"], ["チセ", "陰陽部"], ["チナツ", "風紀委員会"], ["チヒロ", "ヴェリタス"], ["ツクヨ", "忍術研究部"], ["ツバキ", "修行部"], ["ツバサ", "疑似科学部"], ["ツムギ", "オカルト研究会"], ["ツルギ", "正義実現委員会"], ["トキ", "Cleaning&Clearing"], ["トモエ", "レッドウィンター事務局"], ["ナギサ", "ティーパーティー"], ["ナグサ", "百花繚乱紛争調停委員会"], ["ナゴミ", "雛鳥組"], ["ナツ", "放課後スイーツ部"], ["ナツキ", "人力車部"], ["ナナミ", ""], ["ニコ", "FOX小隊"], ["ニヤ", "陰陽部"], ["ニヤニヤ教授", ""], ["ネル", "Cleaning&Clearing"], ["ノア", "セミナー"], ["ノゾミ", "CCC"], ["ノドカ", "227号特別クラス"], ["ノノミ", "対策委員会"], ["ハイネ", "連邦生徒会"], ["ハスミ", "正義実現委員会"], ["ハナエ", "救護騎士団"], ["ハナコ", "補習授業部"], ["ハルカ", "便利屋68"], ["ハルナ", "美食研究会"], ["ハレ", "ヴェリタス"], ["ヒカリ", "CCC"], ["ヒナ", "風紀委員会"], ["ヒナタ", "シスターフッド"], ["ヒビキ", "エンジニア部"], ["ヒフミ", "補習授業部"], ["ヒマリ", "特異現象捜査部"], ["ヒヨリ", "アリウススクワッド"], ["ヒロミ", "寮監隊"], ["フィーナ", "お祭り運営委員会"], ["フウカ", "給食部"], ["フブキ", "生活安全局"], ["フユ", "特殊交易部"], ["プラナ", "シッテムの箱"], ["ホシノ", "対策委員会"], ["マイ", "報道部"], ["マイア", "ニコメディアトゥループ"], ["マキ", "ヴェリタス"], ["マキナ", "ダイビング部"], ["マコト", "万魔殿"], ["マシロ", "正義実現委員会"], ["マユミ", "ゲヘナ再興委員会"], ["マリナ", "レッドウィンター事務局"], ["マリー", "シスターフッド"], ["ミカ", "ティーパーティー"], ["ミサキ", "アリウススクワッド"], ["ミスズ", "矯正局"], ["ミチル", "忍術研究部"], ["ミツキ", "クルーズ運営部"], ["ミドリ", "ゲーム開発部"], ["ミナ", "玄龍門"], ["ミナト", "アイランド"], ["ミネ", "救護騎士団"], ["ミノリ", "工務部"], ["ミモリ", "修行部"], ["ミヤコ", "RABBIT小隊"], ["ミユ", "RABBIT小隊"], ["ミヨ", "特殊交易部"], ["ミライ", "疑似科学部"], ["ムツキ", "便利屋68"], ["メグ", "温泉開発部"], ["メル", "知識解放戦線"], ["モエ", "RABBIT小隊"], ["モミジ", "知識解放戦線"], ["モモイ", "ゲーム開発部"], ["モモカ", "連邦生徒会"], ["ヤクモ", "出版部"], ["ユウカ", "セミナー"], ["ユカリ", "百花繚乱紛争調停委員会"], ["ユキノ", "FOX小隊"], ["ユズ", "ゲーム開発部"], ["ユメ", "アビドス生徒会"], ["ヨウコ", "雛鳥組"], ["ヨシミ", "放課後スイーツ部"], ["ラブ", "ジャブジャブヘルメット団"], ["リオ", "セミナー"], ["リツ", "特殊交易部"], ["リン", "連邦生徒会"], ["ルミ", "玄武商会"], ["レイ", "トレーニング部"], ["レイサ", "トリニティ自警団"], ["レイジョ", "玄武商会"], ["レナ", "オカルト研究会"], ["レンゲ", "百花繚乱紛争調停委員会"], ["ワカモ", "無所属"]];


  // --- Hiragana to Katakana Conversion Helper ---
  function toKatakana(str) {
    if (!str) return '';
    return str.replace(/[\u3041-\u3096]/g, function(match) {
      return String.fromCharCode(match.charCodeAt(0) + 0x60);
    });
  }

  // --- Student Candidate Suggestion Feature ---
  const studentSuggestionOverlay = document.getElementById('studentSuggestionOverlay');
  const suggestionListGrid = document.getElementById('suggestionListGrid');
  const suggestionCount = document.getElementById('suggestionCount');
  const btnCloseSuggestion = document.getElementById('btnCloseSuggestion');
  let suggestionBlurTimer = null;

  function clearSuggestionBlurTimer() {
    if (suggestionBlurTimer) {
      clearTimeout(suggestionBlurTimer);
      suggestionBlurTimer = null;
    }
  }

  function hideStudentSuggestions() {
    clearSuggestionBlurTimer();
    if (studentSuggestionOverlay) {
      studentSuggestionOverlay.style.display = 'none';
    }
  }

  function showStudentSuggestions(inputQuery) {
    if (!studentSuggestionOverlay || !suggestionListGrid) return;
    const raw = (inputQuery || '').trim();
    if (!raw) {
      hideStudentSuggestions();
      return;
    }

    // Convert Hiragana to Katakana and uppercase ASCII
    const kanaQuery = toKatakana(raw).toUpperCase();

    // Prefix match
    const matched = STUDENT_DATABASE.filter(function(entry) {
      const name = entry[0];
      const upperName = name.toUpperCase();
      return upperName.startsWith(kanaQuery) || name.startsWith(raw);
    });

    if (matched.length === 0) {
      suggestionListGrid.innerHTML = '<div class="suggestion-empty-msg">該当する生徒が見つかりませんでした</div>';
      if (suggestionCount) suggestionCount.textContent = '0件';
      studentSuggestionOverlay.style.display = 'flex';
      return;
    }

    if (suggestionCount) suggestionCount.textContent = matched.length + '件';
    suggestionListGrid.innerHTML = '';

    matched.forEach(function(entry) {
      const name = entry[0];
      const affil = entry[1];

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'suggestion-item-btn';

      const nameEl = document.createElement('span');
      nameEl.className = 'suggestion-item-name';
      nameEl.textContent = name;

      const affilEl = document.createElement('span');
      affilEl.className = 'suggestion-item-affil';
      affilEl.textContent = affil || '（所属なし）';

      btn.appendChild(nameEl);
      btn.appendChild(affilEl);

      btn.addEventListener('click', function() {
        clearSuggestionBlurTimer();
        const inputName = document.getElementById('dialogueName');
        const inputSub = document.getElementById('dialogueSub');

        if (inputName) {
          inputName.value = name;
          state.dialogue.name = name;
        }
        if (inputSub) {
          inputSub.value = affil;
          state.dialogue.sub = affil;
        }
        hideStudentSuggestions();
        render();
        if (typeof recordHistory === 'function') {
          recordHistory(true);
        }
      });

      suggestionListGrid.appendChild(btn);
    });

    studentSuggestionOverlay.style.display = 'flex';
  }

  if (btnCloseSuggestion) {
    btnCloseSuggestion.addEventListener('click', function() {
      hideStudentSuggestions();
    });
  }

  // Prevent input blur from hiding suggestions before candidate click can execute
  if (studentSuggestionOverlay) {
    studentSuggestionOverlay.addEventListener('mousedown', function(e) {
      clearSuggestionBlurTimer();
    });
    studentSuggestionOverlay.addEventListener('pointerdown', function(e) {
      clearSuggestionBlurTimer();
    });
  }

  // --- DOM Elements ---
  const canvas = document.getElementById('renderCanvas');
  const ctx = canvas.getContext('2d');
  const cameraVideo = document.getElementById('cameraVideo');
  const lblResolution = document.getElementById('lblResolution');
  const cameraStatusBadge = document.getElementById('cameraStatusBadge');
  const btnStartCamera = document.getElementById('btnStartCamera');
  const btnStopCamera = document.getElementById('btnStopCamera');
  const btnToggleCamera = document.getElementById('btnToggleCamera');
  const lblToggleCamera = document.getElementById('lblToggleCamera');
  const btnMainAction = document.getElementById('btnMainAction');
  const lblMainAction = document.getElementById('lblMainAction');
  const headerPresetSelect = document.getElementById('headerPresetSelect');
  const inAppPresetList = document.getElementById('inAppPresetList');
  const inputNewPresetName = document.getElementById('inputNewPresetName');
  const btnSaveCurrentPreset = document.getElementById('btnSaveCurrentPreset');
  const btnResetDefaultPresets = document.getElementById('btnResetDefaultPresets');
  const presetModal = document.getElementById('presetModal');
  const btnOpenPresetModal = document.getElementById('btnOpenPresetModal');
  const btnClosePresetModal = document.getElementById('btnClosePresetModal');

  // Sidebar & Tab Navigation Controls
  const sidebarDrawer = document.getElementById('sidebarDrawer');
  const btnSideTabPrev = document.getElementById('btnSideTabPrev');
  const btnSideTabNext = document.getElementById('btnSideTabNext');

  // --- Original Effect Sprites (Preloaded) ---
  const effectImages = {};
  const spriteSource = (typeof window !== 'undefined' && window.EFFECT_SPRITES) || (typeof EFFECT_SPRITES !== 'undefined' ? EFFECT_SPRITES : null);
  if (spriteSource) {
    Object.keys(spriteSource).forEach((key) => {
      const img = new Image();
      img.src = spriteSource[key];
      effectImages[key] = img;
    });
  }

  // Pinch Scale HUD Elements
  const pinchScaleBadge = document.getElementById('pinchScaleBadge');
  const pinchScaleVal = document.getElementById('pinchScaleVal');
  let hudFadeTimeout = null;

  function showPinchScaleHUD(scale) {
    if (!pinchScaleBadge || !pinchScaleVal) return;
    pinchScaleVal.textContent = `${scale}%`;
    pinchScaleBadge.style.display = 'flex';
    if (hudFadeTimeout) clearTimeout(hudFadeTimeout);
    hudFadeTimeout = setTimeout(() => {
      if (pinchScaleBadge) pinchScaleBadge.style.display = 'none';
    }, 1200);
  }

  // Mobile Pinch & Tap State
  let selectedElement = null; // 'dialogue' | 'sensei' | 'effect' | 'char' | 'ui'
  let dragTarget = null;
  let dragOffset = { x: 0, y: 0 };
  let dragStartValues = {}; // store initial pos/offsets when drag begins
  let isDragging = false;
  let touchStartDist = 0;
  let initialPinchScale = 100;
  let pointerStartTime = 0;
  let pointerStartPos = { x: 0, y: 0 };
  let hasMovedSignificantly = false;
  let animFrameId = null;

  // --- Sample Assets Generator ---
  function createSampleBackground(type = 'day') {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 2772;
    tempCanvas.height = 1280;
    const tCtx = tempCanvas.getContext('2d');

    if (type === 'day') {
      const grad = tCtx.createLinearGradient(0, 0, 0, tempCanvas.height);
      grad.addColorStop(0, '#3582cf');
      grad.addColorStop(0.35, '#68b1ee');
      grad.addColorStop(0.7, '#c6e5fc');
      grad.addColorStop(1, '#8db9a8');
      tCtx.fillStyle = grad;
      tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      tCtx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      for (let i = 0; i < 7; i++) {
        tCtx.beginPath();
        tCtx.moveTo(tempCanvas.width * 0.45, 0);
        tCtx.lineTo(tempCanvas.width * (0.1 * i - 0.2), tempCanvas.height);
        tCtx.lineTo(tempCanvas.width * (0.1 * i), tempCanvas.height);
        tCtx.closePath();
        tCtx.fill();
      }

      tCtx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      tCtx.beginPath();
      tCtx.arc(tempCanvas.width * 0.3, tempCanvas.height * 0.55, 140, 0, Math.PI * 2);
      tCtx.arc(tempCanvas.width * 0.45, tempCanvas.height * 0.5, 220, 0, Math.PI * 2);
      tCtx.arc(tempCanvas.width * 0.65, tempCanvas.height * 0.56, 180, 0, Math.PI * 2);
      tCtx.fill();

      tCtx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
      tCtx.lineWidth = 4;
      tCtx.beginPath();
      tCtx.ellipse(tempCanvas.width * 0.5, tempCanvas.height * 0.25, 600, 160, -0.05, 0, Math.PI * 2);
      tCtx.stroke();
    } else if (type === 'night') {
      const grad = tCtx.createLinearGradient(0, 0, 0, tempCanvas.height);
      grad.addColorStop(0, '#060d1f');
      grad.addColorStop(0.5, '#0b1d3a');
      grad.addColorStop(1, '#182b42');
      tCtx.fillStyle = grad;
      tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      tCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      for (let i = 0; i < 150; i++) {
        const sx = Math.sin(i * 99) * 10000 % tempCanvas.width;
        const sy = Math.cos(i * 33) * 10000 % (tempCanvas.height * 0.7);
        const r = (i % 3 === 0) ? 2.5 : 1.2;
        tCtx.beginPath();
        tCtx.arc(Math.abs(sx), Math.abs(sy), r, 0, Math.PI * 2);
        tCtx.fill();
      }

      tCtx.strokeStyle = 'rgba(100, 220, 255, 0.4)';
      tCtx.lineWidth = 3;
      tCtx.beginPath();
      tCtx.ellipse(tempCanvas.width * 0.55, tempCanvas.height * 0.2, 500, 120, -0.08, 0, Math.PI * 2);
      tCtx.stroke();
    } else {
      const grad = tCtx.createLinearGradient(0, 0, 0, tempCanvas.height);
      grad.addColorStop(0, '#1a2a44');
      grad.addColorStop(0.5, '#2e496a');
      grad.addColorStop(1, '#3d5269');
      tCtx.fillStyle = grad;
      tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      tCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      tCtx.lineWidth = 10;
      for (let x = 300; x < tempCanvas.width; x += 450) {
        tCtx.beginPath();
        tCtx.moveTo(x, 0);
        tCtx.lineTo(x, tempCanvas.height);
        tCtx.stroke();
      }
      tCtx.beginPath();
      tCtx.moveTo(0, tempCanvas.height * 0.45);
      tCtx.lineTo(tempCanvas.width, tempCanvas.height * 0.45);
      tCtx.stroke();
    }

    const img = new Image();
    img.src = tempCanvas.toDataURL();
    return img;
  }

  function createSampleCharacter(variant = 'A') {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 900;
    tempCanvas.height = 1400;
    const tCtx = tempCanvas.getContext('2d');

    const cx = tempCanvas.width / 2;
    const cy = 460;

    tCtx.strokeStyle = variant === 'A' ? '#44c8f5' : '#ff7a9e';
    tCtx.lineWidth = 8;
    tCtx.shadowColor = variant === 'A' ? '#44c8f5' : '#ff7a9e';
    tCtx.shadowBlur = 18;

    tCtx.beginPath();
    tCtx.ellipse(cx, 160, 150, 45, -0.1, 0, Math.PI * 2);
    tCtx.stroke();
    tCtx.shadowBlur = 0;

    tCtx.fillStyle = variant === 'A' ? '#e2ecf7' : '#f5e8ea';
    tCtx.beginPath();
    tCtx.arc(cx, cy, 140, 0, Math.PI * 2);
    tCtx.fill();

    tCtx.fillStyle = variant === 'A' ? '#8cb8e6' : '#63536b';
    tCtx.beginPath();
    tCtx.arc(cx, cy - 30, 165, Math.PI * 0.75, Math.PI * 2.25);
    tCtx.fill();

    tCtx.fillStyle = variant === 'A' ? '#276ea8' : '#e63968';
    tCtx.beginPath();
    tCtx.ellipse(cx - 55, cy + 15, 20, 30, 0, 0, Math.PI * 2);
    tCtx.ellipse(cx + 55, cy + 15, 20, 30, 0, 0, Math.PI * 2);
    tCtx.fill();

    tCtx.fillStyle = 'rgba(255, 120, 140, 0.4)';
    tCtx.beginPath();
    tCtx.ellipse(cx - 65, cy + 50, 24, 10, 0, 0, Math.PI * 2);
    tCtx.ellipse(cx + 65, cy + 50, 24, 10, 0, 0, Math.PI * 2);
    tCtx.fill();

    tCtx.fillStyle = '#ffffff';
    tCtx.beginPath();
    tCtx.moveTo(cx - 90, cy + 150);
    tCtx.lineTo(cx - 240, cy + 600);
    tCtx.lineTo(cx + 240, cy + 600);
    tCtx.lineTo(cx + 90, cy + 150);
    tCtx.closePath();
    tCtx.fill();

    tCtx.fillStyle = variant === 'A' ? '#204374' : '#88223b';
    tCtx.beginPath();
    tCtx.moveTo(cx - 70, cy + 160);
    tCtx.lineTo(cx, cy + 320);
    tCtx.lineTo(cx + 70, cy + 160);
    tCtx.closePath();
    tCtx.fill();

    const img = new Image();
    img.src = tempCanvas.toDataURL();
    return img;
  }

  // --- Main Rendering Loop ---
  function render(options = {}) {
    const isExporting = options.isExporting === true;
    try {
      const W = state.screen.width;
      const H = state.screen.height;

      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }
      if (lblResolution) {
        lblResolution.textContent = `${W} × ${H}`;
      }

      // 1. Draw Background: Camera Mode completely replaces preset background!
      ctx.save();
      try {
        if (state.bg.mode === 'camera' && state.camera.active && cameraVideo.readyState >= 2) {
          // Draw live camera video feed (preset background is hidden!)
          drawImageCover(ctx, cameraVideo, 0, 0, W, H);
        } else if (state.bg.image && state.bg.image.complete && state.bg.image.naturalWidth > 0) {
          if (state.bg.blur > 0 || state.bg.brightness !== 100) {
            ctx.filter = `blur(${state.bg.blur}px) brightness(${state.bg.brightness}%)`;
          }
          drawImageCover(ctx, state.bg.image, 0, 0, W, H);
        } else {
          // Default placeholder background: Blue Archive Dark Navy gradient
          const grad = ctx.createLinearGradient(0, 0, 0, H);
          grad.addColorStop(0, '#22416b');
          grad.addColorStop(1, '#0e1826');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, W, H);
        }
      } catch (bgErr) {
        console.error('Background render error:', bgErr);
      }
      ctx.restore();

      // 2. Draw Characters
      try {
        state.characters.forEach((char) => {
          if (!char.image || !char.image.complete) return;

          ctx.save();
          const scale = char.scale / 100;
          const charW = char.image.naturalWidth * scale * (H / 1080);
          const charH = char.image.naturalHeight * scale * (H / 1080);

          const posX = (char.posX / 100) * W;
          const posY = (char.posY / 100) * H;

          ctx.translate(posX, posY);
          if (char.flip) {
            ctx.scale(-1, 1);
          }

          if (char.dim) {
            ctx.filter = 'brightness(60%) contrast(90%)';
          }

          ctx.drawImage(char.image, -charW / 2, -charH, charW, charH);
          ctx.restore();
        });
      } catch (charErr) {
        console.error('Character render error:', charErr);
      }

      // 3. Draw Dialogue Bottom Gradient Overlay
      try {
        if (state.dialogue.visible && state.dialogue.gradient) {
          ctx.save();
          const is4to3 = (W / H) < 1.55;
          const gradH = is4to3 ? H * 0.30 : H * 0.45;
          const gradY = H - gradH;
          const vigGrad = ctx.createLinearGradient(0, gradY, 0, H);
          vigGrad.addColorStop(0, 'rgba(8, 16, 30, 0)');
          vigGrad.addColorStop(0.35, 'rgba(6, 14, 26, 0.45)');
          vigGrad.addColorStop(0.7, 'rgba(4, 10, 20, 0.75)');
          vigGrad.addColorStop(1, 'rgba(3, 8, 16, 0.92)');
          ctx.fillStyle = vigGrad;
          ctx.fillRect(0, gradY, W, gradH);
          ctx.restore();
        }
      } catch (gradErr) {
        console.error('Gradient render error:', gradErr);
      }

      // 4. Draw Student Dialogue Window
      try {
        if (state.dialogue.visible) {
          drawDialogueWindow(ctx, W, H);
        }
      } catch (diaErr) {
        console.error('Dialogue window render error:', diaErr);
      }

      // 5. Draw Sensei Choice Window
      try {
        if (state.sensei.visible) {
          drawSenseiChoiceWindow(ctx, W, H);
        }
      } catch (senseiErr) {
        console.error('Sensei window render error:', senseiErr);
      }

      // 6. Draw Emote / Effect Bubble
      try {
        if (state.effect.visible) {
          drawEffectBubble(ctx, W, H);
        }
      } catch (effErr) {
        console.error('Effect bubble render error:', effErr);
      }

      // 7. Draw Upper-Right Buttons (AUTO / MENU) - Fixed to '/' shape
      try {
        if (state.ui.visible) {
          drawUpperRightButtons(ctx, W, H);
        }
      } catch (btnErr) {
        console.error('Upper right buttons render error:', btnErr);
      }

      // 8. Draw Selected Element Highlight (Mobile Selection Indicator - Never shown during image export)
      if (selectedElement && !state.camera.active && !isExporting) {
        drawSelectedHighlight(ctx, W, H);
      }
    } catch (mainErr) {
      console.error('Render error:', mainErr);
    }
  }

  function drawSelectedHighlight(tCtx, W, H) {
    tCtx.save();
    tCtx.strokeStyle = 'rgba(40, 192, 245, 0.85)';
    tCtx.lineWidth = 2.5;
    tCtx.setLineDash([8, 6]);

    const is4to3 = (W / H) < 1.55;

    if (selectedElement === 'dialogue' && state.dialogue.visible) {
      const lineY = is4to3 ? Math.round(H * 0.8372 + state.dialogue.yOffset * (H / 768)) : Math.round(H * 0.7492 + state.dialogue.yOffset * (H / 1220));
      const boxTop = lineY - (is4to3 ? H * 0.08 : H * 0.10);
      const boxHeight = (H - boxTop) - (H * 0.02);
      tCtx.strokeRect(W * 0.05, boxTop, W * 0.90, boxHeight);
    } else if (selectedElement === 'sensei' && state.sensei.visible) {
      const sY = (state.sensei.posY / 100) * H;
      const sW = W * 0.72;
      const sH = (state.sensei.count === 2 ? H * 0.22 : H * 0.12) * (state.sensei.scale / 100);
      tCtx.strokeRect((W - sW) / 2, sY - sH * 0.1, sW, sH);
    } else if (selectedElement === 'effect' && state.effect.visible) {
      const effX = (state.effect.posX / 100) * W;
      const effY = (state.effect.posY / 100) * H;
      const r = 90 * (H / 1080) * (state.effect.scale / 100);
      tCtx.strokeRect(effX - r, effY - r, r * 2, r * 2);
    } else if (selectedElement === 'char') {
      const activeChar = getActiveChar();
      if (activeChar && activeChar.image) {
        const charX = (activeChar.posX / 100) * W;
        const charY = (activeChar.posY / 100) * H;
        const scale = activeChar.scale / 100;
        const cW = activeChar.image.naturalWidth * scale * (H / 1080);
        const cH = activeChar.image.naturalHeight * scale * (H / 1080);
        tCtx.strokeRect(charX - cW / 2 - 4, charY - cH - 4, cW + 8, cH + 8);
      }
    } else if (selectedElement === 'ui' && state.ui.visible) {
      const topY = is4to3 ? Math.round(H * 0.0195) : Math.round(H * 0.0279);
      const btnH = is4to3 ? Math.round(H * 0.052 * (state.ui.scale / 100)) : Math.round(H * 0.065 * (state.ui.scale / 100));
      const autoW = is4to3 ? Math.round(W * 0.125 * (state.ui.scale / 100)) : Math.round(H * 0.180 * (state.ui.scale / 100));
      const totalW = autoW * 2 + (is4to3 ? Math.round(W * 0.012) : Math.round(H * 0.020));
      const rightX = W - (is4to3 ? Math.round(W * 0.024) : Math.round(W * 0.045));
      tCtx.strokeRect(rightX - totalW - 6, topY - 4, totalW + 12, btnH + 8);
    }

    tCtx.restore();
  }

  function renderLoop() {
    if (state.bg.mode === 'camera' && state.camera.active) {
      render();
      animFrameId = requestAnimationFrame(renderLoop);
    }
  }

  function startRenderLoop() {
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(renderLoop);
    }
  }

  function stopRenderLoop() {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    render();
  }

  function drawImageCover(targetCtx, img, x, y, w, h) {
    const naturalW = img.videoWidth || img.naturalWidth || img.width;
    const naturalH = img.videoHeight || img.naturalHeight || img.height;
    if (!naturalW || !naturalH) return;

    const imgRatio = naturalW / naturalH;
    const boxRatio = w / h;
    let sWidth, sHeight, sx, sy;

    if (imgRatio > boxRatio) {
      sHeight = naturalH;
      sWidth = sHeight * boxRatio;
      sx = (naturalW - sWidth) / 2;
      sy = 0;
    } else {
      sWidth = naturalW;
      sHeight = sWidth / boxRatio;
      sx = 0;
      sy = (naturalH - sHeight) / 2;
    }
    targetCtx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
  }

  // 4. Dialogue Window Drawing - Exact Blue Archive screen alignment (Wide & 4:3)
  function drawDialogueWindow(tCtx, W, H) {
    const d = state.dialogue;
    const is4to3 = (W / H) < 1.55;

    let startX, lineStartX, lineEndX, lineY, baseY, nameFontSize, subFontSize, bodyTopY, bodyFontSize, lineHeight, markerX, markerY, mW, mH;

    if (is4to3) {
      // Exact 4:3 ratios (Measured from 1024x768 reference)
      startX = Math.round(W * 0.0996);
      lineStartX = Math.round(W * 0.0976);
      lineEndX = Math.round(W * 0.9375);
      lineY = Math.round(H * 0.8372 + d.yOffset * (H / 768));
      baseY = Math.round(H * 0.8216 + d.yOffset * (H / 768));
      nameFontSize = Math.round(H * 0.0365);
      subFontSize = Math.round(H * 0.0260);
      bodyTopY = Math.round(H * 0.8560 + d.yOffset * (H / 768));
      bodyFontSize = Math.round(H * 0.0313);
      lineHeight = Math.round(H * 0.0417);
      markerX = Math.round(W * 0.9375);
      markerY = Math.round(H * 0.9271 + d.yOffset * (H / 768));
      mW = Math.round(W * 0.0088);
      mH = Math.round(H * 0.0156);
    } else {
      // Exact Wide ratios (Measured from 2712x1220 reference)
      startX = Math.round(W * 0.1327);
      lineStartX = Math.round(W * 0.1272);
      lineEndX = Math.round(W * 0.8724);
      lineY = Math.round(H * 0.7492 + d.yOffset * (H / 1220));
      baseY = Math.round(H * 0.7254 + d.yOffset * (H / 1220));
      nameFontSize = Math.round(H * 0.0508);
      subFontSize = Math.round(H * 0.0360);
      bodyTopY = Math.round(H * 0.7762 + d.yOffset * (H / 1220));
      bodyFontSize = Math.round(H * 0.0426);
      lineHeight = Math.round(H * 0.0557);
      markerX = Math.round(W * 0.8909);
      markerY = Math.round(H * 0.9385 + d.yOffset * (H / 1220));
      mW = Math.round(W * 0.00625);
      mH = Math.round(H * 0.0180);
    }

    const dScale = (d.scale || 100) / 100;
    nameFontSize = Math.round(nameFontSize * dScale);
    subFontSize = Math.round(subFontSize * dScale);
    bodyFontSize = Math.round(bodyFontSize * dScale);
    lineHeight = Math.round(lineHeight * dScale);

    tCtx.save();

    // Student Name & Subtitle
    if (d.name && d.name.trim().length > 0) {
      tCtx.font = `900 ${nameFontSize}px "MPLUSRounded1c", "M PLUS Rounded 1c", "Noto Sans JP", sans-serif`;
      tCtx.textBaseline = 'alphabetic';
      tCtx.fillStyle = d.nameColor || '#ffffff';
      tCtx.shadowColor = 'rgba(0, 0, 0, 0.65)';
      tCtx.shadowBlur = 8;
      tCtx.shadowOffsetX = 2;
      tCtx.shadowOffsetY = 2;
      tCtx.fillText(d.name, startX, baseY);

      const nameWidth = tCtx.measureText(d.name).width;

      if (d.sub && d.sub.trim().length > 0) {
        tCtx.font = `700 ${subFontSize}px "MPLUSRounded1c", "M PLUS Rounded 1c", "Noto Sans JP", sans-serif`;
        tCtx.textBaseline = 'alphabetic';
        tCtx.fillStyle = d.subColor || '#43b5ff';
        const gap = is4to3 ? 14 : 24;
        tCtx.fillText(d.sub, startX + nameWidth + gap, baseY);
      }
      tCtx.shadowBlur = 0;
    }

    // Horizontal separator line (Always visible as part of basic dialogue UI)
    const lineGrad = tCtx.createLinearGradient(lineStartX, 0, lineEndX, 0);
    lineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    lineGrad.addColorStop(0.3, 'rgba(180, 225, 255, 0.7)');
    lineGrad.addColorStop(0.8, 'rgba(120, 190, 250, 0.35)');
    lineGrad.addColorStop(1, 'rgba(100, 180, 240, 0)');

    tCtx.lineWidth = Math.max(1.5, Math.round(H * 0.0018));
    tCtx.strokeStyle = lineGrad;
    tCtx.beginPath();
    tCtx.moveTo(lineStartX, lineY);
    tCtx.lineTo(lineEndX, lineY);
    tCtx.stroke();

    // Dialogue body text
    if (d.text && d.text.trim().length > 0) {
      tCtx.font = `700 ${bodyFontSize}px "MPLUSRounded1c", "M PLUS Rounded 1c", "Noto Sans JP", sans-serif`;
      tCtx.textBaseline = 'top';
      tCtx.fillStyle = '#ffffff';
      tCtx.shadowColor = 'rgba(0, 0, 0, 0.75)';
      tCtx.shadowBlur = 6;
      tCtx.shadowOffsetX = 2;
      tCtx.shadowOffsetY = 2;

      const lines = d.text.split('\n');
      lines.forEach((line, idx) => {
        tCtx.fillText(line, startX, bodyTopY + (idx * lineHeight));
      });
      tCtx.shadowBlur = 0;
    }

    // Next dialogue marker (▼)
    if (d.marker) {
      tCtx.fillStyle = '#3eb8ff';
      tCtx.shadowColor = 'rgba(62, 184, 255, 0.6)';
      tCtx.shadowBlur = 8;
      tCtx.beginPath();
      tCtx.moveTo(markerX - mW, markerY - mH);
      tCtx.lineTo(markerX + mW, markerY - mH);
      tCtx.lineTo(markerX, markerY);
      tCtx.closePath();
      tCtx.fill();
    }

    tCtx.restore();
  }

  // 5. Sensei Choice Window Drawing - Exact Blue Archive screen alignment (Wide & 4:3)
  function drawSenseiChoiceWindow(tCtx, W, H) {
    const s = state.sensei;
    const scale = s.scale / 100;
    const is4to3 = (W / H) < 1.55;

    const boxW = Math.round((is4to3 ? W * 0.82 : W * 0.7930) * scale);
    const boxH = Math.round((is4to3 ? H * 0.092 : H * 0.0984) * scale);
    const skewAngle = (is4to3 ? 14.5 : 17.5) * (Math.PI / 180);

    const centerY = (s.posY / 100) * H;
    const centerX = W / 2;

    const texts = s.count === 2 ? [s.text1, s.text2] : [s.text1];
    const totalH = texts.length === 2 ? boxH * 2 + Math.round(H * 0.0230) : boxH;
    const startY = centerY - totalH / 2;

    texts.forEach((txt, idx) => {
      const curY = startY + idx * (boxH + Math.round(H * 0.0230));
      drawSingleSenseiBox(tCtx, centerX, curY, boxW, boxH, skewAngle, txt, s.quotes, H);
    });
  }

  function drawSingleSenseiBox(tCtx, cx, cy, w, h, skew, rawText, useQuotes, H) {
    tCtx.save();
    tCtx.translate(cx, cy);

    tCtx.save();
    tCtx.shadowColor = 'rgba(12, 28, 55, 0.28)';
    tCtx.shadowBlur = 16;
    tCtx.shadowOffsetY = 6;

    drawAccurateParallelogram(tCtx, -w / 2, 0, w, h, skew, 6);
    tCtx.fillStyle = 'rgba(245, 250, 255, 0.98)';
    tCtx.fill();
    tCtx.restore();

    tCtx.save();
    drawAccurateParallelogram(tCtx, -w / 2, 0, w, h, skew, 6);
    tCtx.clip();

    const bgGrad = tCtx.createLinearGradient(-w / 2, 0, w / 2, 0);
    bgGrad.addColorStop(0, 'rgba(215, 238, 255, 0.95)');
    bgGrad.addColorStop(0.18, 'rgba(255, 255, 255, 0.99)');
    bgGrad.addColorStop(0.82, 'rgba(255, 255, 255, 0.99)');
    bgGrad.addColorStop(1, 'rgba(215, 238, 255, 0.95)');
    tCtx.fillStyle = bgGrad;
    tCtx.fillRect(-w, -h, w * 2, h * 3);

    drawAccurateDiamondPattern(tCtx, -w / 2, 0, w, h, skew);

    tCtx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    tCtx.lineWidth = 2.5;
    drawAccurateParallelogram(tCtx, -w / 2, 0, w, h, skew, 6);
    tCtx.stroke();
    tCtx.restore();

    tCtx.strokeStyle = 'rgba(105, 185, 245, 0.45)';
    tCtx.lineWidth = 1.5;
    drawAccurateParallelogram(tCtx, -w / 2, 0, w, h, skew, 6);
    tCtx.stroke();

    let displayText = rawText;
    if (useQuotes) {
      displayText = `"${rawText}"`;
    }
    const fontSize = Math.round(h * 0.42);
    tCtx.font = `500 ${fontSize}px "MPLUSRounded1c", "M PLUS Rounded 1c", "Noto Sans JP", sans-serif`;
    tCtx.fillStyle = '#323f52';
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.fillText(displayText, 0, Math.round(h / 2));

    tCtx.restore();
  }

  // Draw accurate rounded parallelogram (skew > 0 means '/' slant)
  function drawAccurateParallelogram(tCtx, x, y, w, h, skew, r) {
    const dx = Math.tan(skew) * h;
    tCtx.beginPath();
    tCtx.moveTo(x + dx + r, y);
    tCtx.lineTo(x + w + dx - r, y);
    tCtx.quadraticCurveTo(x + w + dx, y, x + w + dx - r * 0.3, y + r * 0.9);
    tCtx.lineTo(x + w + r * 0.3, y + h - r * 0.9);
    tCtx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    tCtx.lineTo(x + r, y + h);
    tCtx.quadraticCurveTo(x, y + h, x + r * 0.3, y + h - r * 0.9);
    tCtx.lineTo(x + dx - r * 0.3, y + r * 0.9);
    tCtx.quadraticCurveTo(x + dx, y, x + dx + r, y);
    tCtx.closePath();
  }

  function drawAccurateDiamondPattern(tCtx, x, y, w, h, skew) {
    tCtx.save();
    const size = h * 0.28;
    const cols = 5;
    const rows = 3;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const px = x + 35 + c * (size * 0.9) + (r % 2) * (size * 0.45);
        const py = y + 14 + r * (size * 0.85);
        const alpha = Math.max(0, 0.16 - c * 0.032);
        tCtx.fillStyle = `rgba(70, 165, 235, ${alpha})`;
        drawSinglePolygonDiamond(tCtx, px, py, size * 0.45);
      }
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const px = x + w - 35 - c * (size * 0.9) - (r % 2) * (size * 0.45);
        const py = y + 14 + r * (size * 0.85);
        const alpha = Math.max(0, 0.16 - c * 0.032);
        tCtx.fillStyle = `rgba(70, 165, 235, ${alpha})`;
        drawSinglePolygonDiamond(tCtx, px, py, size * 0.45);
      }
    }
    tCtx.restore();
  }

  function drawSinglePolygonDiamond(tCtx, px, py, s) {
    tCtx.beginPath();
    tCtx.moveTo(px, py - s);
    tCtx.lineTo(px + s * 1.1, py);
    tCtx.lineTo(px, py + s);
    tCtx.lineTo(px - s * 1.1, py);
    tCtx.closePath();
    tCtx.fill();
  }

  // 6. Emote Bubble Drawing - Unified organic smooth anime speech balloon
  function buildSmoothBubblePath(tCtx, rx, ry, isRight) {
    const sign = isRight ? 1 : -1;
    const t_start = (isRight ? 0.25 : 0.54) * Math.PI;
    const t_end   = (isRight ? 0.46 : 0.76) * Math.PI;
    const tip_x   = sign * rx * 0.50;
    const tip_y   = ry * 1.38;

    // Start at t_end and draw ellipse arc clockwise around to t_start
    tCtx.ellipse(0, 0, rx, ry, 0, t_end, t_start + Math.PI * 2, false);

    const p_start = { x: rx * Math.cos(t_start), y: ry * Math.sin(t_start) };
    const p_end   = { x: rx * Math.cos(t_end),   y: ry * Math.sin(t_end) };

    if (!isRight) {
      // Smooth concave fillet from ellipse into right side of rounded tip
      const cp1_x = p_start.x + (tip_x - p_start.x) * 0.25 + rx * 0.05;
      const cp1_y = p_start.y + (tip_y - p_start.y) * 0.45;
      const cp2_x = tip_x + 3 + rx * 0.05;
      const cp2_y = tip_y - 1 - ry * 0.15;
      tCtx.bezierCurveTo(cp1_x, cp1_y, cp2_x, cp2_y, tip_x + 3, tip_y - 1);

      // Cute softly rounded tip
      tCtx.quadraticCurveTo(tip_x, tip_y + 2, tip_x - 3, tip_y - 1);

      // Smooth concave fillet back up into left side of ellipse
      const cp3_x = tip_x - 3 - rx * 0.02;
      const cp3_y = tip_y - 1 - ry * 0.18;
      const cp4_x = p_end.x + (tip_x - p_end.x) * 0.25 - rx * 0.05;
      const cp4_y = p_end.y + (tip_y - p_end.y) * 0.35;
      tCtx.bezierCurveTo(cp3_x, cp3_y, cp4_x, cp4_y, p_end.x, p_end.y);
    } else {
      // Smooth concave fillet from ellipse into left side of rounded tip
      const cp1_x = p_start.x + (tip_x - p_start.x) * 0.25 - rx * 0.05;
      const cp1_y = p_start.y + (tip_y - p_start.y) * 0.45;
      const cp2_x = tip_x - 3 - rx * 0.05;
      const cp2_y = tip_y - 1 - ry * 0.15;
      tCtx.bezierCurveTo(cp1_x, cp1_y, cp2_x, cp2_y, tip_x - 3, tip_y - 1);

      // Cute softly rounded tip
      tCtx.quadraticCurveTo(tip_x, tip_y + 2, tip_x + 3, tip_y - 1);

      // Smooth concave fillet back up into right side of ellipse
      const cp3_x = tip_x + 3 + rx * 0.02;
      const cp3_y = tip_y - 1 - ry * 0.18;
      const cp4_x = p_end.x + (tip_x - p_end.x) * 0.25 + rx * 0.05;
      const cp4_y = p_end.y + (tip_y - p_end.y) * 0.35;
      tCtx.bezierCurveTo(cp3_x, cp3_y, cp4_x, cp4_y, p_end.x, p_end.y);
    }
    tCtx.closePath();
  }

  function drawEffectBubble(tCtx, W, H) {
    const eff = state.effect;
    const scale = eff.scale / 100;
    const cx = (eff.posX / 100) * W;
    const cy = (eff.posY / 100) * H;
    const is4to3 = (W / H) < 1.55;

    // 1. Original BlueArchive Transparent PNG Sprites (dots, twirl, exclamation, sweat, anger, question, shine, note, flash, cross, exclamation_question)
    const spriteImg = effectImages[eff.type];
    if (spriteImg && spriteImg.complete && spriteImg.naturalWidth > 0) {
      tCtx.save();
      tCtx.translate(cx, cy);
      if (eff.flipX) {
        tCtx.scale(-1, 1);
      }

      const refH = is4to3 ? 768 : 1080;
      let baseHeight = (is4to3 ? 120 : 160) * (H / refH) * scale;
      if (eff.type === 'sweat') baseHeight *= 0.85;
      if (eff.type === 'anger') baseHeight *= 0.85;
      if (eff.type === 'shine') baseHeight *= 1.1;
      if (eff.type === 'note') baseHeight *= 1.0;
      if (eff.type === 'flash') baseHeight *= 1.05;
      if (eff.type === 'cross') baseHeight *= 1.0;
      if (eff.type === 'exclamation_question') baseHeight *= 1.1;

      const aspect = spriteImg.naturalWidth / spriteImg.naturalHeight;
      const baseWidth = baseHeight * aspect;

      // Optional subtle drop shadow for depth
      tCtx.shadowColor = 'rgba(0, 20, 50, 0.22)';
      tCtx.shadowBlur = 10;
      tCtx.shadowOffsetY = 4;

      tCtx.drawImage(spriteImg, -baseWidth / 2, -baseHeight / 2, baseWidth, baseHeight);
      tCtx.restore();
      return;
    }

    const baseW = 168 * (H / 1080) * scale;
    const baseH = 108 * (H / 1080) * scale;
    const rx = baseW / 2;
    const ry = baseH / 2;

    tCtx.save();
    tCtx.translate(cx, cy);
    if (eff.flipX) {
      tCtx.scale(-1, 1);
    }

    if (eff.tail === 'thought-left' || eff.tail === 'thought-right') {
      const sign = eff.tail === 'thought-right' ? 1 : -1;
      const bubbles = [
        { x: sign * rx * 0.55, y: ry * 1.20, r: ry * 0.24 },
        { x: sign * rx * 0.78, y: ry * 1.46, r: ry * 0.16 },
        { x: sign * rx * 0.95, y: ry * 1.68, r: ry * 0.10 }
      ];

      // Dropshadow
      tCtx.save();
      tCtx.shadowColor = 'rgba(0, 30, 70, 0.24)';
      tCtx.shadowBlur = 14;
      tCtx.shadowOffsetY = 5;
      tCtx.fillStyle = '#ffffff';

      tCtx.beginPath();
      tCtx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      tCtx.fill();
      bubbles.forEach(b => {
        tCtx.beginPath();
        tCtx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        tCtx.fill();
      });
      tCtx.restore();

      // Outline
      tCtx.strokeStyle = 'rgba(225, 238, 252, 0.9)';
      tCtx.lineWidth = 2.5;
      tCtx.beginPath();
      tCtx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      tCtx.stroke();
      bubbles.forEach(b => {
        tCtx.beginPath();
        tCtx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        tCtx.stroke();
      });
    } else if (eff.tail === 'none') {
      tCtx.save();
      tCtx.shadowColor = 'rgba(0, 30, 70, 0.24)';
      tCtx.shadowBlur = 14;
      tCtx.shadowOffsetY = 5;
      tCtx.fillStyle = '#ffffff';
      tCtx.beginPath();
      tCtx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      tCtx.fill();
      tCtx.restore();

      tCtx.strokeStyle = 'rgba(225, 238, 252, 0.9)';
      tCtx.lineWidth = 2.5;
      tCtx.beginPath();
      tCtx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      tCtx.stroke();
    } else {
      // Default: Unified organic smooth single-path speech balloon
      const isRight = eff.tail === 'bottom-right';

      tCtx.save();
      tCtx.shadowColor = 'rgba(0, 30, 70, 0.24)';
      tCtx.shadowBlur = 14;
      tCtx.shadowOffsetY = 5;
      tCtx.fillStyle = '#ffffff';

      tCtx.beginPath();
      buildSmoothBubblePath(tCtx, rx, ry, isRight);
      tCtx.fill();
      tCtx.restore();

      // Unified single outline stroke - zero interior seams or sharp angle kinks!
      tCtx.strokeStyle = 'rgba(225, 238, 252, 0.9)';
      tCtx.lineWidth = 2.5;
      tCtx.beginPath();
      buildSmoothBubblePath(tCtx, rx, ry, isRight);
      tCtx.stroke();
    }

    drawEffectContent(tCtx, eff.type, baseW, baseH, eff.customText, H);

    tCtx.restore();
  }

  function drawEffectContent(tCtx, type, bw, bh, customText, H) {
    tCtx.save();

    if (type === 'dots') {
      tCtx.fillStyle = '#20a7ea';
      const dotRadius = bh * 0.12;
      const spacing = bw * 0.26;
      [-spacing, 0, spacing].forEach((dx) => {
        tCtx.beginPath();
        tCtx.arc(dx, 0, dotRadius, 0, Math.PI * 2);
        tCtx.fill();
      });
    } else if (type === 'exclamation') {
      tCtx.fillStyle = '#20a7ea';
      const fSize = Math.round(bh * 0.7);
      tCtx.font = `900 ${fSize}px "MPLUSRounded1c", "Noto Sans JP", sans-serif`;
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.fillText('！', 0, 0);
    } else if (type === 'question') {
      tCtx.fillStyle = '#20a7ea';
      const fSize = Math.round(bh * 0.7);
      tCtx.font = `900 ${fSize}px "MPLUSRounded1c", "Noto Sans JP", sans-serif`;
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.fillText('？', 0, 0);
    } else if (type === 'exclamation_question') {
      tCtx.fillStyle = '#20a7ea';
      const fSize = Math.round(bh * 0.62);
      tCtx.font = `900 ${fSize}px "MPLUSRounded1c", "Noto Sans JP", sans-serif`;
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.fillText('！？', 0, 0);
    } else if (type === 'sweat') {
      tCtx.fillStyle = '#2bb8fa';
      tCtx.beginPath();
      tCtx.moveTo(0, -bh * 0.3);
      tCtx.quadraticCurveTo(bw * 0.2, 0, bw * 0.2, bh * 0.15);
      tCtx.arc(0, bh * 0.15, bw * 0.2, 0, Math.PI);
      tCtx.quadraticCurveTo(-bw * 0.2, 0, 0, -bh * 0.3);
      tCtx.closePath();
      tCtx.fill();
    } else if (type === 'heart') {
      tCtx.fillStyle = '#ff4d79';
      const fSize = Math.round(bh * 0.7);
      tCtx.font = `900 ${fSize}px "MPLUSRounded1c", "Noto Sans JP", sans-serif`;
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.fillText('♥', 0, 0);
    } else if (type === 'anger') {
      tCtx.fillStyle = '#ef3a3a';
      const fSize = Math.round(bh * 0.65);
      tCtx.font = `900 ${fSize}px "MPLUSRounded1c", "Noto Sans JP", sans-serif`;
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.fillText('💢', 0, 0);
    } else if (type === 'lightbulb') {
      tCtx.fillStyle = '#f59e0b';
      const fSize = Math.round(bh * 0.65);
      tCtx.font = `900 ${fSize}px "MPLUSRounded1c", "Noto Sans JP", sans-serif`;
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.fillText('💡', 0, 0);
    } else if (type === 'custom') {
      tCtx.fillStyle = '#1c2838';
      const fSize = Math.round(bh * 0.45);
      tCtx.font = `700 ${fSize}px "MPLUSRounded1c", "Noto Sans JP", sans-serif`;
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.fillText(customText || '...', 0, 0);
    }

    tCtx.restore();
  }

  // 7. Upper Right Buttons (AUTO / MENU) - Exact Blue Archive screen alignment (Wide & 4:3)
  function drawUpperRightButtons(tCtx, W, H) {
    const scale = state.ui.scale / 100;
    const is4to3 = (W / H) < 1.55;

    let btnH, skew, topY, rightX, menuW, autoW, gap;

    if (is4to3) {
      // 4:3 Screen Reference (Standard 4:3 like iPad or 1440x1080)
      // Exactly match MENU and AUTO widths as requested by user
      btnH = Math.round(H * 0.052 * scale);
      skew = 10.0 * (Math.PI / 180);
      topY = Math.round(H * 0.022);
      rightX = W - Math.round(W * 0.024);
      autoW = Math.round(W * 0.125 * scale);
      menuW = autoW; // Same width as AUTO
      gap = Math.round(W * 0.012 * scale);
    } else {
      // Wide Screen Reference (2712x1220, 16:9, 20:9, etc.)
      btnH = Math.round(H * 0.065 * scale);
      skew = 10.08 * (Math.PI / 180);
      topY = Math.round(H * 0.028);
      rightX = W - Math.round(W * 0.045);
      autoW = Math.round(H * 0.180 * scale);
      menuW = autoW; // Same width as AUTO
      gap = Math.round(H * 0.020 * scale);
    }

    tCtx.save();

    if (state.ui.showMenu) {
      rightX -= menuW;
      drawSingleTopButton(tCtx, rightX, topY, menuW, btnH, skew, 'MENU');
      rightX -= gap;
    }

    if (state.ui.showAuto) {
      rightX -= autoW;
      drawSingleTopButton(tCtx, rightX, topY, autoW, btnH, skew, 'AUTO');
    }

    tCtx.restore();
  }

  function drawSingleTopButton(tCtx, x, y, w, h, skew, text) {
    tCtx.save();

    // 1. Drop shadow & Base fill
    tCtx.save();
    tCtx.shadowColor = 'rgba(12, 28, 55, 0.28)';
    tCtx.shadowBlur = 12;
    tCtx.shadowOffsetY = 4;
    tCtx.fillStyle = 'rgba(255, 255, 255, 0.98)';
    drawAccurateParallelogram(tCtx, x, y, w, h, skew, 6);
    tCtx.fill();
    tCtx.restore();

    // 2. Subtle gradient overlay
    tCtx.save();
    drawAccurateParallelogram(tCtx, x, y, w, h, skew, 6);
    tCtx.clip();
    const bgGrad = tCtx.createLinearGradient(x, y, x + w, y);
    bgGrad.addColorStop(0, 'rgba(235, 245, 255, 0.45)');
    bgGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
    bgGrad.addColorStop(1, 'rgba(235, 245, 255, 0.45)');
    tCtx.fillStyle = bgGrad;
    tCtx.fillRect(x - 20, y - 20, w + 40, h + 40);
    tCtx.restore();

    // 3. Clean single outline border
    tCtx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    tCtx.lineWidth = 2.0;
    drawAccurateParallelogram(tCtx, x, y, w, h, skew, 6);
    tCtx.stroke();

    tCtx.strokeStyle = 'rgba(105, 185, 245, 0.45)';
    tCtx.lineWidth = 1.0;
    drawAccurateParallelogram(tCtx, x, y, w, h, skew, 6);
    tCtx.stroke();

    // 4. Text: Italic Bold Navy Blue
    const dx = Math.tan(skew) * h;
    const fSize = Math.round(h * 0.64);
    tCtx.font = `italic 900 ${fSize}px "MPLUSRounded1c", "Noto Sans JP", "Helvetica Neue", "Arial", sans-serif`;
    tCtx.fillStyle = '#1d3862';
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.fillText(text, x + w / 2 + dx / 2, y + h / 2 + 1);

    tCtx.restore();
  }

  // --- In-App Presets Management (localStorage) ---
  function getInAppPresets() {
    try {
      const saved = localStorage.getItem('ba_scene_presets_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PRESETS.slice();
  }

  function saveInAppPresets(presets) {
    try {
      localStorage.setItem('ba_scene_presets_v1', JSON.stringify(presets));
    } catch (e) {
      console.error(e);
    }
  }

  function renderPresetUI() {
    const presets = getInAppPresets();

    // 1. Populate header quick dropdown (if element exists)
    if (headerPresetSelect) {
      headerPresetSelect.innerHTML = '<option value="">-- プリセット切替 --</option>';
      presets.forEach((p) => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.name;
        headerPresetSelect.appendChild(opt);
      });
    }

    // 2. Populate preset list in modal (Ultra-slim single line per item)
    if (inAppPresetList) {
      inAppPresetList.innerHTML = '';
      presets.forEach((p) => {
        const item = document.createElement('div');
        item.className = 'preset-item-row';
        item.innerHTML = `
          <div class="preset-item-title" title="${p.name}">${p.name}</div>
          <div class="preset-item-actions">
            <button class="btn btn-primary btn-xs btn-load-preset">適用</button>
            <button class="btn btn-danger btn-xs btn-del-preset">削除</button>
          </div>
        `;

        const btnLoad = item.querySelector('.btn-load-preset');
        if (btnLoad) {
          btnLoad.addEventListener('click', () => {
            applyPreset(p);
            if (presetModal) presetModal.style.display = 'none';
          });
        }

        const btnDel = item.querySelector('.btn-del-preset');
        if (btnDel) {
          btnDel.addEventListener('click', () => {
            if (confirm(`プリセット「${p.name}」を削除しますか？`)) {
              const updated = presets.filter((item) => item.id !== p.id);
              saveInAppPresets(updated);
              renderPresetUI();
            }
          });
        }

        inAppPresetList.appendChild(item);
      });
    }
  }

  function applyPreset(p) {
    if (p.dialogue) Object.assign(state.dialogue, p.dialogue);
    if (p.sensei) Object.assign(state.sensei, p.sensei);
    if (p.effect) Object.assign(state.effect, p.effect);
    if (p.ui) Object.assign(state.ui, p.ui);

    // Character settings in preset (supports 0 characters)
    if (p.charCount === 0 || p.charVariant === 'none') {
      state.characters = [];
      state.selectedCharId = null;
    } else if (p.charVariant) {
      if (state.characters.length === 0) {
        state.characters.push({
          id: 'char_default',
          name: '生徒',
          image: createSampleCharacter(p.charVariant),
          posX: 50,
          posY: 85,
          scale: 100,
          flip: false,
          dim: typeof p.charDim === 'boolean' ? p.charDim : false
        });
        state.selectedCharId = 'char_default';
      } else {
        const char = getActiveChar();
        if (char) {
          char.image = createSampleCharacter(p.charVariant);
          if (typeof p.charDim === 'boolean') char.dim = p.charDim;
        }
      }
    }

    // Set background image
    if (p.bgType === 'none') {
      state.bg.cachedBgImage = null;
      if (!state.camera.active) {
        state.bg.image = null;
        state.bg.mode = 'image';
      }
    } else if (p.bgType) {
      state.bg.cachedBgImage = createSampleBackground(p.bgType);
      // If camera is NOT active, update current background
      if (!state.camera.active) {
        state.bg.image = state.bg.cachedBgImage;
        state.bg.mode = 'image';
      }
    }

    // Sync all UI inputs
    syncAllUIInputs();

    if (!state.camera.active) {
      render();
    }
    recordHistory(true);
  }

  function syncAllUIInputs() {
    if (document.getElementById('dialogueName')) document.getElementById('dialogueName').value = state.dialogue.name;
    if (document.getElementById('dialogueSub')) document.getElementById('dialogueSub').value = state.dialogue.sub;
    if (document.getElementById('dialogueText')) document.getElementById('dialogueText').value = state.dialogue.text;
    if (document.getElementById('dialogueVisible')) document.getElementById('dialogueVisible').checked = state.dialogue.visible;
    if (document.getElementById('dialogueMarker')) document.getElementById('dialogueMarker').checked = state.dialogue.marker;
    if (document.getElementById('dialogueGradient')) document.getElementById('dialogueGradient').checked = state.dialogue.gradient;
    if (document.getElementById('dialogueNameColor')) document.getElementById('dialogueNameColor').value = state.dialogue.nameColor || '#ffffff';
    if (document.getElementById('dialogueSubColor')) document.getElementById('dialogueSubColor').value = state.dialogue.subColor || '#43b5ff';
    if (document.getElementById('dialogueYOffset')) {
      document.getElementById('dialogueYOffset').value = state.dialogue.yOffset || 0;
      const lbY = document.getElementById('dialogueYOffsetVal');
      if (lbY) lbY.textContent = `${state.dialogue.yOffset || 0}px`;
    }

    if (document.getElementById('senseiVisible')) document.getElementById('senseiVisible').checked = state.sensei.visible;
    if (document.getElementById('senseiText1')) document.getElementById('senseiText1').value = state.sensei.text1;
    if (document.getElementById('senseiText2')) document.getElementById('senseiText2').value = state.sensei.text2;
    if (document.getElementById('senseiQuotes')) document.getElementById('senseiQuotes').checked = state.sensei.quotes;
    if (document.getElementById('senseiPosY')) {
      document.getElementById('senseiPosY').value = state.sensei.posY;
      const valY = document.getElementById('senseiPosYVal');
      if (valY) valY.textContent = `${state.sensei.posY}%`;
    }

    if (state.sensei.count === 2) {
      if (document.getElementById('senseiCount2')) document.getElementById('senseiCount2').click();
    } else {
      if (document.getElementById('senseiCount1')) document.getElementById('senseiCount1').click();
    }

    if (document.getElementById('effectVisible')) document.getElementById('effectVisible').checked = state.effect.visible;
    if (document.getElementById('effectCustomText')) document.getElementById('effectCustomText').value = state.effect.customText || '';
    if (document.getElementById('effectTail')) document.getElementById('effectTail').value = state.effect.tail || 'bottom-left';
    if (document.getElementById('effectPosX')) {
      document.getElementById('effectPosX').value = state.effect.posX;
      const valX = document.getElementById('effectPosXVal');
      if (valX) valX.textContent = `${state.effect.posX}%`;
    }
    if (document.getElementById('effectPosY')) {
      document.getElementById('effectPosY').value = state.effect.posY;
      const valY = document.getElementById('effectPosYVal');
      if (valY) valY.textContent = `${state.effect.posY}%`;
    }
    const btnEffectFlipX = document.getElementById('btnEffectFlipX');
    if (btnEffectFlipX) {
      btnEffectFlipX.classList.toggle('active', !!state.effect.flipX);
    }

    // Effect chip selection & custom settings toggle
    document.querySelectorAll('.effect-icon-chip[data-effect]').forEach((c) => {
      c.classList.toggle('active', c.dataset.effect === state.effect.type);
    });
    const customSettings = document.getElementById('groupCustomEffectSettings');
    if (customSettings) {
      customSettings.style.display = (state.effect.type === 'custom') ? 'block' : 'none';
    }

    // Background adjustments sync
    if (document.getElementById('bgBlur')) {
      document.getElementById('bgBlur').value = state.bg.blur;
      const lbBlur = document.getElementById('bgBlurVal');
      if (lbBlur) lbBlur.textContent = `${state.bg.blur}px`;
    }
    if (document.getElementById('bgBrightness')) {
      document.getElementById('bgBrightness').value = state.bg.brightness;
      const lbBri = document.getElementById('bgBrightnessVal');
      if (lbBri) lbBri.textContent = `${state.bg.brightness}%`;
    }

    // UI buttons sync
    if (document.getElementById('uiButtonsVisible')) {
      document.getElementById('uiButtonsVisible').checked = state.ui.visible;
    }
    if (document.getElementById('uiShowAuto')) {
      document.getElementById('uiShowAuto').checked = state.ui.showAuto;
    }
    if (document.getElementById('uiShowMenu')) {
      document.getElementById('uiShowMenu').checked = state.ui.showMenu;
    }
    if (document.getElementById('uiScale')) {
      document.getElementById('uiScale').value = state.ui.scale;
      document.getElementById('uiScaleVal').textContent = `${state.ui.scale}%`;
    }

    // Character UI sync
    if (typeof renderCharToggleGrid === 'function') {
      renderCharToggleGrid();
    }
  }

  // --- Undo / Redo History Management ---
  const MAX_HISTORY = 40;
  const historyStack = [];
  let historyIndex = -1;
  let isHistoryAction = false;
  let historyDebounceTimer = null;

  function snapshotToKey(snap) {
    if (!snap) return '';
    const clone = {
      dialogue: snap.dialogue,
      sensei: snap.sensei,
      effect: snap.effect,
      ui: snap.ui,
      bg: snap.bg,
      characters: (snap.characters || []).map(function(c) {
        return {
          id: c.id,
          dictId: c.dictId,
          name: c.name,
          posX: c.posX,
          posY: c.posY,
          scale: c.scale,
          dim: c.dim,
          visible: c.visible,
          variant: c.variant
        };
      })
    };
    return JSON.stringify(clone);
  }

  function getHistorySnapshot() {
    return {
      dialogue: JSON.parse(JSON.stringify(state.dialogue)),
      sensei: JSON.parse(JSON.stringify(state.sensei)),
      effect: JSON.parse(JSON.stringify(state.effect)),
      ui: JSON.parse(JSON.stringify(state.ui)),
      bg: {
        blur: state.bg.blur,
        brightness: state.bg.brightness
      },
      characters: state.characters.map(function(c) {
        return {
          id: c.id,
          dictId: c.dictId,
          name: c.name,
          image: c.image,
          posX: c.posX,
          posY: c.posY,
          scale: c.scale,
          dim: c.dim,
          visible: c.visible,
          variant: c.variant
        };
      })
    };
  }

  function applyHistorySnapshot(snap) {
    if (!snap) return;
    state.dialogue = JSON.parse(JSON.stringify(snap.dialogue));
    state.sensei = JSON.parse(JSON.stringify(snap.sensei));
    state.effect = JSON.parse(JSON.stringify(snap.effect));
    state.ui = JSON.parse(JSON.stringify(snap.ui));
    if (snap.bg) {
      state.bg.blur = snap.bg.blur;
      state.bg.brightness = snap.bg.brightness;
    }
    if (snap.characters && Array.isArray(snap.characters)) {
      state.characters = snap.characters.map(function(sc) {
        return Object.assign({}, sc);
      });
      if (typeof renderCharToggleGrid === 'function') {
        renderCharToggleGrid();
      }
    }
  }

  function updateUndoRedoButtons() {
    const btnUndo = document.getElementById('btnUndo');
    const btnRedo = document.getElementById('btnRedo');
    if (btnUndo) {
      btnUndo.disabled = (historyIndex <= 0);
    }
    if (btnRedo) {
      btnRedo.disabled = (historyIndex >= historyStack.length - 1 || historyIndex < 0);
    }
  }

  function recordHistory(immediate) {
    if (isHistoryAction) return;

    function executeRecord() {
      if (isHistoryAction) return;
      const snap = getHistorySnapshot();
      const currentKey = snapshotToKey(snap);

      // Avoid duplicating identical state
      if (historyIndex >= 0 && historyIndex < historyStack.length) {
        if (snapshotToKey(historyStack[historyIndex]) === currentKey) {
          return;
        }
      }

      // Truncate forward redo branch when new action is taken
      historyStack.splice(historyIndex + 1);
      historyStack.push(snap);

      if (historyStack.length > MAX_HISTORY) {
        historyStack.shift();
      }
      historyIndex = historyStack.length - 1;
      updateUndoRedoButtons();
    }

    if (immediate) {
      if (historyDebounceTimer) {
        clearTimeout(historyDebounceTimer);
        historyDebounceTimer = null;
      }
      executeRecord();
    } else {
      if (historyDebounceTimer) clearTimeout(historyDebounceTimer);
      historyDebounceTimer = setTimeout(executeRecord, 320);
    }
  }

  function undo() {
    if (historyIndex > 0) {
      isHistoryAction = true;
      historyIndex--;
      applyHistorySnapshot(historyStack[historyIndex]);
      syncAllUIInputs();
      render();
      updateUndoRedoButtons();
      isHistoryAction = false;
    }
  }

  function redo() {
    if (historyIndex < historyStack.length - 1 && historyIndex >= 0) {
      isHistoryAction = true;
      historyIndex++;
      applyHistorySnapshot(historyStack[historyIndex]);
      syncAllUIInputs();
      render();
      updateUndoRedoButtons();
      isHistoryAction = false;
    }
  }

  function saveCurrentAsNewPreset() {
    const name = (inputNewPresetName.value || '').trim();
    if (!name) {
      alert('プリセット名を入力してください。');
      return;
    }

    const currentPresets = getInAppPresets();
    const newPreset = {
      id: `custom_${Date.now()}`,
      name: name,
      dialogue: JSON.parse(JSON.stringify(state.dialogue)),
      sensei: JSON.parse(JSON.stringify(state.sensei)),
      effect: JSON.parse(JSON.stringify(state.effect)),
      ui: JSON.parse(JSON.stringify(state.ui)),
      charDim: getActiveChar() ? getActiveChar().dim : false
    };

    currentPresets.push(newPreset);
    saveInAppPresets(currentPresets);
    inputNewPresetName.value = '';
    renderPresetUI();
    alert(`プリセット「${name}」を保存しました！`);
  }

  // --- Camera Management (AR Camera Mode) ---
  // In camera mode: completely hide the preset background, keep characters & dialogue!
  async function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('お使いのブラウザはカメラアクセスに対応していません。');
      return;
    }

    try {
      if (state.camera.stream) {
        state.camera.stream.getTracks().forEach((t) => t.stop());
      }

      // Preserve current background image before switching to camera
      if (state.bg.image) {
        state.bg.cachedBgImage = state.bg.image;
      }

      // 4:3 Camera Constraints (User requested 4:3)
      const constraints = {
        video: {
          facingMode: state.camera.facingMode,
          aspectRatio: { ideal: 4 / 3 },
          width: { ideal: 1440 },
          height: { ideal: 1080 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      state.camera.stream = stream;
      state.camera.active = true;
      state.bg.mode = 'camera';

      // Automatically switch canvas to 4:3 (1440x1080) for camera
      state.screen.width = 1440;
      state.screen.height = 1080;
      const sw = document.getElementById('screenW');
      if (sw) sw.value = 1440;
      const sh = document.getElementById('screenH');
      if (sh) sh.value = 1080;
      document.querySelectorAll('.preset-chip[data-w]').forEach((c) => {
        if (c.dataset.w === '1440' && c.dataset.h === '1080') {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });

      cameraVideo.srcObject = stream;

      // Robust play handling to fix "play() request was interrupted by a new load request"
      await new Promise((resolve) => {
        let isResolved = false;
        const doPlay = () => {
          if (isResolved) return;
          isResolved = true;
          cameraVideo.play().then(resolve).catch((err) => {
            console.warn('Camera play warning (will proceed):', err);
            resolve();
          });
        };

        cameraVideo.onloadedmetadata = doPlay;
        cameraVideo.oncanplay = doPlay;
        setTimeout(doPlay, 400); // Fallback timeout
      });

      if (cameraStatusBadge) {
        cameraStatusBadge.textContent = '動作中';
        cameraStatusBadge.style.background = '#10b981';
        cameraStatusBadge.style.color = '#ffffff';
      }
      if (btnStartCamera) btnStartCamera.style.display = 'none';
      if (btnStopCamera) btnStopCamera.style.display = 'inline-flex';
      
      updateBottomBarUI();

      startRenderLoop();
    } catch (err) {
      alert('カメラの起動に失敗しました: ' + err.message);
      console.error(err);
      stopCamera();
    }
  }

  function stopCamera() {
    if (state.camera.stream) {
      state.camera.stream.getTracks().forEach((t) => t.stop());
      state.camera.stream = null;
    }
    state.camera.active = false;
    state.bg.mode = 'image';

    // Restore cached preset background if available
    if (state.bg.cachedBgImage) {
      state.bg.image = state.bg.cachedBgImage;
    }

    if (cameraStatusBadge) {
      cameraStatusBadge.textContent = '停止中';
      cameraStatusBadge.style.background = '';
      cameraStatusBadge.style.color = '';
    }
    if (btnStartCamera) btnStartCamera.style.display = 'inline-flex';
    if (btnStopCamera) btnStopCamera.style.display = 'none';

    updateBottomBarUI();

    stopRenderLoop();
  }

  // Synchronize the 3-button bottom bar UI based on camera state
  function updateBottomBarUI() {
    if (state.camera.active) {
      // Camera ON: [ 📷 カメラOFF (Red) ] [ 📸 撮影 (Green) ] [ 📁 プリセット ]
      if (btnToggleCamera) {
        btnToggleCamera.className = 'btn btn-danger btn-slim btn-bottom-col btn-camera-toggle';
      }
      if (lblToggleCamera) {
        lblToggleCamera.textContent = '📷 カメラOFF';
      }
      if (btnMainAction) {
        btnMainAction.className = 'btn btn-success btn-slim btn-bottom-col btn-main-action';
        btnMainAction.title = '写真を撮影して編集モードへ';
      }
      if (lblMainAction) {
        lblMainAction.textContent = '📸 撮影';
      }
    } else {
      // Camera OFF: [ 📷 カメラON ] [ 保存 ] [ 📁 プリセット ]
      if (btnToggleCamera) {
        btnToggleCamera.className = 'btn btn-secondary btn-slim btn-bottom-col btn-camera-toggle';
      }
      if (lblToggleCamera) {
        lblToggleCamera.textContent = '📷 カメラON';
      }
      if (btnMainAction) {
        btnMainAction.className = 'btn btn-success btn-slim btn-bottom-col btn-main-action';
        btnMainAction.title = '作成した画像を端末に保存';
      }
      if (lblMainAction) {
        lblMainAction.textContent = '保存';
      }
    }
  }

  // Camera capture: Take pure photo (without overlay), save raw photo, set as background, open sidebar edit mode!
  function captureAndSwitchToEdit() {
    if (!state.camera.active || !cameraVideo || cameraVideo.readyState < 2) {
      alert('カメラが動作していません。');
      return;
    }

    const snapCanvas = document.createElement('canvas');
    snapCanvas.width = state.screen.width;
    snapCanvas.height = state.screen.height;
    const sCtx = snapCanvas.getContext('2d');
    drawImageCover(sCtx, cameraVideo, 0, 0, snapCanvas.width, snapCanvas.height);

    const rawDataUrl = snapCanvas.toDataURL('image/jpeg', 0.95);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const rawFilename = `BlueArchive_Photo_Raw_${timestamp}.jpg`;

    // Save pure photo without overlay (MediaStore in Android app, download link in browser)
    if (window.AndroidApp && typeof window.AndroidApp.saveImage === 'function') {
      window.AndroidApp.saveImage(rawDataUrl, rawFilename);
    } else {
      const link = document.createElement('a');
      link.download = rawFilename;
      link.href = rawDataUrl;
      link.click();
    }

    // Convert snapCanvas to background Image
    const capturedImg = new Image();
    capturedImg.onload = () => {
      stopCamera();
      state.bg.image = capturedImg;
      state.bg.cachedBgImage = capturedImg;
      state.bg.mode = 'image';

      // Switch to Dialogue Tab for user to input lines
      switchToTab('tab-dialogue');

      render();
    };
    capturedImg.src = rawDataUrl;
  }

  // --- Mobile Touch Gestures & Direct Element Interaction ---
  function getTouchDistance(touches) {
    if (!touches || touches.length < 2) return 0;
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  }

  // Exact resolution-based coordinates calculation with letterbox/pillarbox offset compensation
  function getEventCoords(e) {
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else if (typeof e.clientX === 'number') {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const canvasAspect = canvas.width / canvas.height;
    const rectAspect = rect.width / rect.height;

    let renderW = rect.width;
    let renderH = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (rectAspect > canvasAspect) {
      // Pillarbox (black bars on left & right)
      renderW = rect.height * canvasAspect;
      offsetX = (rect.width - renderW) / 2;
    } else {
      // Letterbox (black bars on top & bottom)
      renderH = rect.width / canvasAspect;
      offsetY = (rect.height - renderH) / 2;
    }

    const scaleX = canvas.width / renderW;
    const scaleY = canvas.height / renderH;

    const x = (clientX - rect.left - offsetX) * scaleX;
    const y = (clientY - rect.top - offsetY) * scaleY;

    return { x, y };
  }

  function getHitElement(x, y, W, H) {
    const is4to3 = (W / H) < 1.55;

    // 1. Emote hit check
    if (state.effect.visible) {
      const effX = (state.effect.posX / 100) * W;
      const effY = (state.effect.posY / 100) * H;
      const effR = 110 * (H / 1080) * (state.effect.scale / 100);
      if (Math.hypot(x - effX, y - effY) <= effR) {
        return { type: 'effect', x: effX, y: effY };
      }
    }

    // 2. Sensei choice hit check
    if (state.sensei.visible) {
      const sY = (state.sensei.posY / 100) * H;
      const sH = (state.sensei.count === 2 ? H * 0.25 : H * 0.15) * (state.sensei.scale / 100);
      if (y >= sY - sH * 0.2 && y <= sY + sH * 1.1 && Math.abs(x - W / 2) <= W * 0.45) {
        return { type: 'sensei', x: W / 2, y: sY };
      }
    }

    // 3. UI Buttons (AUTO / MENU) hit check
    if (state.ui.visible) {
      const topY = is4to3 ? Math.round(H * 0.015) : Math.round(H * 0.025);
      const btnH = is4to3 ? Math.round(H * 0.075 * (state.ui.scale / 100)) : Math.round(H * 0.085 * (state.ui.scale / 100));
      const autoW = is4to3 ? Math.round(W * 0.15 * (state.ui.scale / 100)) : Math.round(H * 0.22 * (state.ui.scale / 100));
      const totalW = autoW * 2 + (is4to3 ? Math.round(W * 0.02) : Math.round(H * 0.03));
      const rightX = W - (is4to3 ? Math.round(W * 0.02) : Math.round(W * 0.035));
      if (x >= rightX - totalW - 25 && x <= rightX + 25 && y >= topY - 20 && y <= topY + btnH + 25) {
        return { type: 'ui', x: rightX - totalW / 2, y: topY + btnH / 2 };
      }
    }

    // 4. Character hit check (Front-to-back: later added characters are on top)
    for (let i = state.characters.length - 1; i >= 0; i--) {
      const ch = state.characters[i];
      if (ch && ch.image) {
        const charX = (ch.posX / 100) * W;
        const charY = (ch.posY / 100) * H;
        const scale = (ch.scale || 100) / 100;
        const cW = ch.image.naturalWidth * scale * (H / 1080);
        const cH = ch.image.naturalHeight * scale * (H / 1080);
        if (x >= charX - cW / 2 - 25 && x <= charX + cW / 2 + 25 && y >= charY - cH - 25 && y <= charY + 25) {
          state.selectedCharId = ch.id;
          return { type: 'char', charId: ch.id, x: charX, y: charY };
        }
      }
    }

    // 5. Dialogue window hit check (lower 35% of screen)
    if (state.dialogue.visible) {
      const lineY = is4to3 ? Math.round(H * 0.8372 + state.dialogue.yOffset * (H / 768)) : Math.round(H * 0.7492 + state.dialogue.yOffset * (H / 1220));
      const boxTop = lineY - (is4to3 ? H * 0.16 : H * 0.18);
      if (y >= boxTop && y <= H && x >= W * 0.01 && x <= W * 0.99) {
        return { type: 'dialogue', x: W / 2, y: lineY };
      }
    }

    return null;
  }

  const TAB_IDS = ['tab-screen', 'tab-char', 'tab-dialogue', 'tab-sensei', 'tab-effect', 'tab-ui'];

  function switchToTab(tabId) {
    if (!tabId) return;
    document.querySelectorAll('.tab-btn').forEach((b) => {
      const isActive = b.dataset.tab === tabId;
      b.classList.toggle('active', isActive);
      if (isActive) {
        b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
    document.querySelectorAll('.tab-pane').forEach((p) => {
      p.classList.toggle('active', p.id === tabId);
    });
  }

  function navigateTab(direction) {
    const activeBtn = document.querySelector('.tab-btn.active');
    const currentTabId = activeBtn ? activeBtn.dataset.tab : TAB_IDS[0];
    let index = TAB_IDS.indexOf(currentTabId);
    if (index === -1) index = 0;
    const nextIndex = (index + direction + TAB_IDS.length) % TAB_IDS.length;
    switchToTab(TAB_IDS[nextIndex]);
  }

  function onPointerDown(e) {
    pointerStartTime = Date.now();
    hasMovedSignificantly = false;

    // Handle 2-finger pinch gesture
    if (e.touches && e.touches.length === 2) {
      isDragging = false;
      touchStartDist = getTouchDistance(e.touches);
      if (selectedElement === 'dialogue') {
        initialPinchScale = state.dialogue.scale || 100;
      } else if (selectedElement === 'char' && getActiveChar()) {
        initialPinchScale = getActiveChar().scale;
      } else if (selectedElement === 'sensei') {
        initialPinchScale = state.sensei.scale;
      } else if (selectedElement === 'effect') {
        initialPinchScale = state.effect.scale;
      } else if (selectedElement === 'ui') {
        initialPinchScale = state.ui.scale;
      }
      return;
    }

    const { x, y } = getEventCoords(e);
    pointerStartPos = { x, y };
    const W = canvas.width;
    const H = canvas.height;

    const hit = getHitElement(x, y, W, H);
    if (hit) {
      isDragging = true;
      dragTarget = hit.type;
      selectedElement = hit.type;
      dragOffset = { x: x - hit.x, y: y - hit.y };

      const activeChar = getActiveChar();
      dragStartValues = {
        dialogueY: state.dialogue.yOffset || 0,
        senseiY: state.sensei.posY,
        effectX: state.effect.posX,
        effectY: state.effect.posY,
        charX: activeChar ? activeChar.posX : 50,
        charY: activeChar ? activeChar.posY : 90
      };
      canvas.classList.add('cursor-grabbing');
    } else {
      isDragging = false;
      dragTarget = null;
    }
  }

  function onPointerMove(e) {
    // Prevent scrolling if dragging or pinching
    if (isDragging || (e.touches && e.touches.length === 2)) {
      if (e.cancelable) e.preventDefault();
    }

    // 2-finger Pinch to Scale
    if (e.touches && e.touches.length === 2) {
      if (!selectedElement) return;
      const currentDist = getTouchDistance(e.touches);
      if (touchStartDist > 10) {
        const factor = currentDist / touchStartDist;
        const newScale = Math.round(initialPinchScale * factor);

        if (selectedElement === 'dialogue') {
          state.dialogue.scale = Math.max(70, Math.min(150, newScale));
          showPinchScaleHUD(state.dialogue.scale);
        } else if (selectedElement === 'char') {
          const char = getActiveChar();
          if (char) {
            char.scale = Math.max(30, Math.min(250, newScale));
            updateDictFromChar(char);
            showPinchScaleHUD(char.scale);
          }
        } else if (selectedElement === 'sensei') {
          state.sensei.scale = Math.max(70, Math.min(150, newScale));
          showPinchScaleHUD(state.sensei.scale);
        } else if (selectedElement === 'effect') {
          state.effect.scale = Math.max(50, Math.min(200, newScale));
          showPinchScaleHUD(state.effect.scale);
        } else if (selectedElement === 'ui') {
          state.ui.scale = Math.max(70, Math.min(150, newScale));
          const sl = document.getElementById('uiScale');
          if (sl) sl.value = state.ui.scale;
          const lb = document.getElementById('uiScaleVal');
          if (lb) lb.textContent = `${state.ui.scale}%`;
          showPinchScaleHUD(state.ui.scale);
        }
        render();
      }
      return;
    }

    const { x, y } = getEventCoords(e);
    if (Math.hypot(x - pointerStartPos.x, y - pointerStartPos.y) > 15) {
      hasMovedSignificantly = true;
    }

    if (!isDragging || !dragTarget) {
      if (e.touches) return;
      const W = canvas.width;
      const H = canvas.height;
      const hit = getHitElement(x, y, W, H);
      if (hit) {
        canvas.classList.add('cursor-grab');
      } else {
        canvas.classList.remove('cursor-grab');
      }
      return;
    }

    const W = canvas.width;
    const H = canvas.height;

    if (dragTarget === 'effect') {
      const deltaPercentX = ((x - pointerStartPos.x) / W) * 100;
      const deltaPercentY = ((y - pointerStartPos.y) / H) * 100;
      state.effect.posX = Math.max(2, Math.min(98, Math.round(dragStartValues.effectX + deltaPercentX)));
      state.effect.posY = Math.max(2, Math.min(98, Math.round(dragStartValues.effectY + deltaPercentY)));
      const elX = document.getElementById('effectPosX');
      if (elX) elX.value = state.effect.posX;
      const valX = document.getElementById('effectPosXVal');
      if (valX) valX.textContent = `${state.effect.posX}%`;
      const elY = document.getElementById('effectPosY');
      if (elY) elY.value = state.effect.posY;
      const valY = document.getElementById('effectPosYVal');
      if (valY) valY.textContent = `${state.effect.posY}%`;
    } else if (dragTarget === 'sensei') {
      const deltaPercentY = ((y - pointerStartPos.y) / H) * 100;
      state.sensei.posY = Math.max(5, Math.min(90, Math.round(dragStartValues.senseiY + deltaPercentY)));
      const elY = document.getElementById('senseiPosY');
      if (elY) elY.value = state.sensei.posY;
      const valY = document.getElementById('senseiPosYVal');
      if (valY) valY.textContent = `${state.sensei.posY}%`;
    } else if (dragTarget === 'char') {
      const activeChar = getActiveChar();
      if (activeChar) {
        const deltaPercentX = ((x - pointerStartPos.x) / W) * 100;
        const deltaPercentY = ((y - pointerStartPos.y) / H) * 100;
        activeChar.posX = Math.max(-20, Math.min(120, Math.round(dragStartValues.charX + deltaPercentX)));
        activeChar.posY = Math.max(10, Math.min(150, Math.round(dragStartValues.charY + deltaPercentY)));
        updateDictFromChar(activeChar);
      }
    } else if (dragTarget === 'dialogue') {
      const deltaPxY = y - pointerStartPos.y;
      const is4to3 = (W / H) < 1.55;
      const normDelta = deltaPxY / (is4to3 ? (H / 768) : (H / 1220));
      state.dialogue.yOffset = Math.max(-250, Math.min(250, Math.round(dragStartValues.dialogueY + normDelta)));
      const sl = document.getElementById('dialogueYOffset');
      if (sl) sl.value = state.dialogue.yOffset;
      const lb = document.getElementById('dialogueYOffsetVal');
      if (lb) lb.textContent = `${state.dialogue.yOffset}px`;
    }

    if (!state.camera.active) {
      render();
    }
  }

  function onPointerUp(e) {
    const elapsed = Date.now() - pointerStartTime;

    // Detect single clean Tap (short duration, minimal movement)
    if (elapsed < 450 && !hasMovedSignificantly) {
      const coords = getEventCoords(e.changedTouches ? e.changedTouches[0] : e);
      const hit = getHitElement(coords.x, coords.y, canvas.width, canvas.height);
      if (hit) {
        selectedElement = hit.type;
        render();

        // Switch to corresponding tab directly on tap!
        const tabMap = {
          dialogue: 'tab-dialogue',
          sensei: 'tab-sensei',
          effect: 'tab-effect',
          char: 'tab-char',
          ui: 'tab-ui'
        };
        const targetTab = tabMap[hit.type];
        if (targetTab) {
          switchToTab(targetTab);
        }
      } else {
        selectedElement = null;
        render();
      }
    }

    if (hasMovedSignificantly) {
      recordHistory(true);
    }

    isDragging = false;
    dragTarget = null;
    canvas.classList.remove('cursor-grabbing');
  }

  canvas.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  canvas.addEventListener('touchstart', onPointerDown, { passive: false });
  window.addEventListener('touchmove', onPointerMove, { passive: false });
  window.addEventListener('touchend', onPointerUp);

  function getActiveChar() {
    return state.characters.find((c) => c.id === state.selectedCharId) || state.characters[0];
  }

  // --- UI Event Binding ---
  function setupUI() {
    // 0. Tab Navigation (Adjacent Buttons & Direct Tab Switching)
    if (btnSideTabPrev) btnSideTabPrev.addEventListener('click', () => navigateTab(-1));
    if (btnSideTabNext) btnSideTabNext.addEventListener('click', () => navigateTab(1));

    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        switchToTab(btn.dataset.tab);
      });
    });

    // Main Bottom Action Button (Save when Camera OFF, Shutter Capture when Camera ON)
    if (btnMainAction) {
      btnMainAction.addEventListener('click', () => {
        if (state.camera.active) {
          captureAndSwitchToEdit();
        } else {
          exportImage();
        }
      });
    }

    // 2. Preset Modal & Events
    if (btnOpenPresetModal && presetModal) {
      btnOpenPresetModal.addEventListener('click', () => {
        renderPresetUI();
        presetModal.style.display = 'flex';
      });
    }
    if (btnClosePresetModal && presetModal) {
      btnClosePresetModal.addEventListener('click', () => {
        presetModal.style.display = 'none';
      });
    }
    if (presetModal) {
      presetModal.addEventListener('click', (e) => {
        if (e.target === presetModal) {
          presetModal.style.display = 'none';
        }
      });
    }

    if (btnSaveCurrentPreset) btnSaveCurrentPreset.addEventListener('click', saveCurrentAsNewPreset);

    // 3. Camera Controls
    if (btnStartCamera) btnStartCamera.addEventListener('click', startCamera);
    if (btnStopCamera) btnStopCamera.addEventListener('click', stopCamera);
    if (btnToggleCamera) {
      btnToggleCamera.addEventListener('click', () => {
        if (state.camera.active) {
          stopCamera();
        } else {
          startCamera();
        }
      });
    }

    // 4. Screen Presets (Optional if elements exist)
    document.querySelectorAll('.preset-chip[data-w]').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.preset-chip[data-w]').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const w = parseInt(chip.dataset.w, 10);
        const h = parseInt(chip.dataset.h, 10);
        state.screen.width = w;
        state.screen.height = h;
        const sw = document.getElementById('screenW');
        if (sw) sw.value = w;
        const sh = document.getElementById('screenH');
        if (sh) sh.value = h;
        render();
      });
    });

    const screenWEl = document.getElementById('screenW');
    if (screenWEl) {
      screenWEl.addEventListener('input', (e) => {
        state.screen.width = parseInt(e.target.value, 10) || 1920;
        render();
      });
    }
    const screenHEl = document.getElementById('screenH');
    if (screenHEl) {
      screenHEl.addEventListener('input', (e) => {
        state.screen.height = parseInt(e.target.value, 10) || 1080;
        render();
      });
    }

    // 5. Background Upload & Presets
    const bgDropzone = document.getElementById('bgDropzone');
    const inputBg = document.getElementById('inputBg');

    if (bgDropzone && inputBg) {
      bgDropzone.addEventListener('click', () => inputBg.click());
      bgDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        bgDropzone.classList.add('dragover');
      });
      bgDropzone.addEventListener('dragleave', () => bgDropzone.classList.remove('dragover'));
      bgDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        bgDropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          loadBgFile(e.dataTransfer.files[0]);
        }
      });
      inputBg.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          loadBgFile(e.target.files[0]);
        }
      });
    }

    function loadBgFile(file) {
      if (state.camera.active) stopCamera();
      const reader = new FileReader();
      reader.onload = (re) => {
        const img = new Image();
        img.onload = () => {
          state.bg.image = img;
          state.bg.cachedBgImage = img;
          state.bg.mode = 'image';

          // Automatically adapt canvas aspect ratio to the loaded image
          const aspect = img.naturalWidth / img.naturalHeight;
          if (aspect < 1.55) {
            // 4:3 or standard portrait/photo aspect ratio
            state.screen.width = 1440;
            state.screen.height = 1080;
            const sw = document.getElementById('screenW');
            if (sw) sw.value = 1440;
            const sh = document.getElementById('screenH');
            if (sh) sh.value = 1080;
            document.querySelectorAll('.preset-chip[data-w]').forEach((c) => {
              c.classList.toggle('active', c.dataset.w === '1440' && c.dataset.h === '1080');
            });
          } else {
            // Wide aspect ratio
            state.screen.width = 2712;
            state.screen.height = 1220;
            const sw = document.getElementById('screenW');
            if (sw) sw.value = 2712;
            const sh = document.getElementById('screenH');
            if (sh) sh.value = 1220;
            document.querySelectorAll('.preset-chip[data-w]').forEach((c) => {
              c.classList.toggle('active', c.dataset.w === '2712' && c.dataset.h === '1220');
            });
          }

          render();
        };
        img.onerror = (err) => {
          console.error('Image load error:', err);
          alert('画像の読み込みに失敗しました。');
        };
        img.src = re.target.result;
      };
      reader.onerror = (err) => {
        console.error('File read error:', err);
        alert('ファイルの読み込みに失敗しました。');
      };
      reader.readAsDataURL(file);
    }

    document.getElementById('bgBlur').addEventListener('input', (e) => {
      state.bg.blur = parseInt(e.target.value, 10);
      document.getElementById('bgBlurVal').textContent = `${state.bg.blur}px`;
      render();
      recordHistory(false);
    });
    document.getElementById('bgBlur').addEventListener('change', () => recordHistory(true));

    document.getElementById('bgBrightness').addEventListener('input', (e) => {
      state.bg.brightness = parseInt(e.target.value, 10);
      document.getElementById('bgBrightnessVal').textContent = `${state.bg.brightness}%`;
      render();
      recordHistory(false);
    });
    document.getElementById('bgBrightness').addEventListener('change', () => recordHistory(true));

    // 6. Character Controls
    setupCharacterControls();

    // 7. Dialogue Controls
    document.getElementById('dialogueVisible').addEventListener('change', (e) => {
      state.dialogue.visible = e.target.checked;
      render();
      recordHistory(true);
    });
    document.getElementById('dialogueName').addEventListener('input', (e) => {
      state.dialogue.name = e.target.value;
      render();
      showStudentSuggestions(e.target.value);
      recordHistory(false);
    });
    document.getElementById('dialogueName').addEventListener('focus', (e) => {
      clearSuggestionBlurTimer();
      if (e.target.value && e.target.value.trim().length > 0) {
        showStudentSuggestions(e.target.value);
      }
    });
    document.getElementById('dialogueName').addEventListener('blur', (e) => {
      clearSuggestionBlurTimer();
      suggestionBlurTimer = setTimeout(() => {
        hideStudentSuggestions();
      }, 200);
      recordHistory(true);
    });
    document.getElementById('dialogueSub').addEventListener('input', (e) => {
      state.dialogue.sub = e.target.value;
      render();
      recordHistory(false);
    });
    document.getElementById('dialogueSub').addEventListener('change', () => recordHistory(true));

    document.getElementById('dialogueNameColor').addEventListener('input', (e) => {
      state.dialogue.nameColor = e.target.value;
      render();
      recordHistory(false);
    });
    document.getElementById('dialogueNameColor').addEventListener('change', () => recordHistory(true));

    document.getElementById('dialogueSubColor').addEventListener('input', (e) => {
      state.dialogue.subColor = e.target.value;
      render();
      recordHistory(false);
    });
    document.getElementById('dialogueSubColor').addEventListener('change', () => recordHistory(true));

    document.getElementById('dialogueText').addEventListener('input', (e) => {
      state.dialogue.text = e.target.value;
      render();
      recordHistory(false);
    });
    document.getElementById('dialogueText').addEventListener('change', () => recordHistory(true));

    document.getElementById('dialogueMarker').addEventListener('change', (e) => {
      state.dialogue.marker = e.target.checked;
      render();
      recordHistory(true);
    });
    document.getElementById('dialogueGradient').addEventListener('change', (e) => {
      state.dialogue.gradient = e.target.checked;
      render();
      recordHistory(true);
    });

    // 8. Sensei Controls
    document.getElementById('senseiVisible').addEventListener('change', (e) => {
      state.sensei.visible = e.target.checked;
      render();
      recordHistory(true);
    });
    document.getElementById('senseiCount1').addEventListener('click', () => {
      state.sensei.count = 1;
      document.getElementById('senseiCount1').classList.add('active');
      document.getElementById('senseiCount2').classList.remove('active');
      document.getElementById('groupSenseiText2').style.display = 'none';
      render();
      recordHistory(true);
    });
    document.getElementById('senseiCount2').addEventListener('click', () => {
      state.sensei.count = 2;
      document.getElementById('senseiCount2').classList.add('active');
      document.getElementById('senseiCount1').classList.remove('active');
      document.getElementById('groupSenseiText2').style.display = 'block';
      render();
      recordHistory(true);
    });
    document.getElementById('senseiText1').addEventListener('input', (e) => {
      state.sensei.text1 = e.target.value;
      render();
      recordHistory(false);
    });
    document.getElementById('senseiText1').addEventListener('change', () => recordHistory(true));

    document.getElementById('senseiText2').addEventListener('input', (e) => {
      state.sensei.text2 = e.target.value;
      render();
      recordHistory(false);
    });
    document.getElementById('senseiText2').addEventListener('change', () => recordHistory(true));

    document.getElementById('senseiQuotes').addEventListener('change', (e) => {
      state.sensei.quotes = e.target.checked;
      render();
      recordHistory(true);
    });

    // 9. Emote / Effect Controls
    document.getElementById('effectVisible').addEventListener('change', (e) => {
      state.effect.visible = e.target.checked;
      render();
      recordHistory(true);
    });

    // Populate effect thumbnail images from EFFECT_SPRITES
    if (typeof EFFECT_SPRITES !== 'undefined') {
      const thumbs = {
        effectThumbDots: EFFECT_SPRITES.dots,
        effectThumbTwirl: EFFECT_SPRITES.twirl,
        effectThumbExclamation: EFFECT_SPRITES.exclamation,
        effectThumbSweat: EFFECT_SPRITES.sweat,
        effectThumbAnger: EFFECT_SPRITES.anger,
        effectThumbQuestion: EFFECT_SPRITES.question,
        effectThumbShine: EFFECT_SPRITES.shine,
        effectThumbNote: EFFECT_SPRITES.note,
        effectThumbFlash: EFFECT_SPRITES.flash,
        effectThumbCross: EFFECT_SPRITES.cross,
        effectThumbExclamationQuestion: EFFECT_SPRITES.exclamation_question
      };
      Object.keys(thumbs).forEach((id) => {
        const imgEl = document.getElementById(id);
        if (imgEl && thumbs[id]) {
          imgEl.src = thumbs[id];
        }
      });
    }

    document.querySelectorAll('.effect-icon-chip[data-effect]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const effectType = chip.dataset.effect;
        const effectVisibleCheckbox = document.getElementById('effectVisible');

        if (state.effect.visible && state.effect.type === effectType) {
          // Already visible with this type -> turn OFF
          state.effect.visible = false;
          chip.classList.remove('active');
          if (effectVisibleCheckbox) effectVisibleCheckbox.checked = false;
        } else {
          // Turn ON with selected type
          state.effect.visible = true;
          state.effect.type = effectType;
          document.querySelectorAll('.effect-icon-chip[data-effect]').forEach((c) => c.classList.remove('active'));
          chip.classList.add('active');
          if (effectVisibleCheckbox) effectVisibleCheckbox.checked = true;
        }

        const customSettings = document.getElementById('groupCustomEffectSettings');
        if (customSettings) {
          customSettings.style.display = (state.effect.visible && state.effect.type === 'custom') ? 'block' : 'none';
        }
        render();
        recordHistory(true);
      });
    });

    if (document.getElementById('effectCustomText')) {
      document.getElementById('effectCustomText').addEventListener('input', (e) => {
        state.effect.customText = e.target.value;
        render();
        recordHistory(false);
      });
      document.getElementById('effectCustomText').addEventListener('change', () => recordHistory(true));
    }
    if (document.getElementById('effectTail')) {
      document.getElementById('effectTail').addEventListener('change', (e) => {
        state.effect.tail = e.target.value;
        render();
        recordHistory(true);
      });
    }
    const btnEffectFlipX = document.getElementById('btnEffectFlipX');
    if (btnEffectFlipX) {
      btnEffectFlipX.addEventListener('click', () => {
        state.effect.flipX = !state.effect.flipX;
        btnEffectFlipX.classList.toggle('active', !!state.effect.flipX);
        render();
        recordHistory(true);
      });
    }

    // 10. UI Controls
    document.getElementById('uiButtonsVisible').addEventListener('change', (e) => {
      state.ui.visible = e.target.checked;
      render();
      recordHistory(true);
    });
    document.getElementById('uiShowAuto').addEventListener('change', (e) => {
      state.ui.showAuto = e.target.checked;
      render();
      recordHistory(true);
    });
    document.getElementById('uiShowMenu').addEventListener('change', (e) => {
      state.ui.showMenu = e.target.checked;
      render();
      recordHistory(true);
    });
    document.getElementById('uiScale').addEventListener('input', (e) => {
      state.ui.scale = parseInt(e.target.value, 10);
      document.getElementById('uiScaleVal').textContent = `${state.ui.scale}%`;
      render();
      recordHistory(false);
    });
    document.getElementById('uiScale').addEventListener('change', () => recordHistory(true));

    // 11. Undo / Redo Floating Action Buttons & Shortcuts
    const btnUndo = document.getElementById('btnUndo');
    if (btnUndo) {
      btnUndo.addEventListener('click', () => {
        undo();
      });
    }
    const btnRedo = document.getElementById('btnRedo');
    if (btnRedo) {
      btnRedo.addEventListener('click', () => {
        redo();
      });
    }

    window.addEventListener('keydown', (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') {
        return; // Retain standard native undo inside active text inputs
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
    });

    // 12. Export & Import
    const btnExp = document.getElementById('btnExportImage');
    if (btnExp) btnExp.addEventListener('click', exportImage);
    const btnExpJson = document.getElementById('btnExportJson');
    if (btnExpJson) btnExpJson.addEventListener('click', exportProjectJson);
    const inputImpJson = document.getElementById('inputImportJson');
    if (inputImpJson) inputImpJson.addEventListener('change', importProjectJson);
  }

  // --- JSON Save Helper (Supports both Native Android Downloads and Web Browser fallback) ---
  function downloadOrSaveJson(jsonData, filename) {
    const jsonStr = typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData, null, 2);
    if (window.AndroidApp && typeof window.AndroidApp.saveJsonFile === 'function') {
      window.AndroidApp.saveJsonFile(jsonStr, filename);
    } else {
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const link = document.createElement('a');
      link.download = filename;
      link.href = URL.createObjectURL(blob);
      link.click();
    }
  }

  // --- Character Image Optimizer (Resize high-res PNG to max 1400px preserving transparency) ---
  function optimizeCharacterImage(dataUrl, maxDimension = 1400) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        if (w <= maxDimension && h <= maxDimension) {
          resolve(dataUrl);
          return;
        }
        const scale = Math.min(maxDimension / w, maxDimension / h);
        const targetW = Math.max(1, Math.round(w * scale));
        const targetH = Math.max(1, Math.round(h * scale));

        const offCanvas = document.createElement('canvas');
        offCanvas.width = targetW;
        offCanvas.height = targetH;
        const oCtx = offCanvas.getContext('2d');
        oCtx.imageSmoothingEnabled = true;
        oCtx.imageSmoothingQuality = 'high';
        oCtx.drawImage(img, 0, 0, targetW, targetH);
        resolve(offCanvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  }

  // --- Robust IndexedDB Storage for Character Dictionary ---
  const DB_NAME = 'BA_Scene_Maker_DB';
  const DB_VERSION = 1;
  const STORE_NAME = 'characters';

  function openCharDb() {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        resolve(null);
        return;
      }
      try {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
  }

  async function saveCharDictToDb(dictList) {
    try {
      const db = await openCharDb();
      if (!db) return false;
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      await new Promise((res, rej) => {
        const clearReq = store.clear();
        clearReq.onsuccess = res;
        clearReq.onerror = rej;
      });
      for (const item of dictList) {
        store.put({
          id: item.id,
          name: item.name,
          image: item.image,
          lastPosX: item.lastPosX,
          lastPosY: item.lastPosY,
          lastScale: item.lastScale,
          flip: item.flip || false,
          dim: item.dim || false
        });
      }
      return true;
    } catch (e) {
      console.warn('saveCharDictToDb error:', e);
      return false;
    }
  }

  async function loadCharDictFromDb() {
    try {
      const db = await openCharDb();
      if (!db) return null;
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve(null);
      });
    } catch (e) {
      console.warn('loadCharDictFromDb error:', e);
      return null;
    }
  }

  // Character Dictionary & On-Screen Toggle Management
  const CHAR_DICT_STORAGE_KEY = 'ba_char_dict_v1';
  let charDict = [];

  async function loadCharDict() {
    // 1. Try loading from IndexedDB first (no quota limits)
    const idbData = await loadCharDictFromDb();
    if (idbData && idbData.length > 0) {
      charDict = idbData;
    } else {
      // 2. Fallback to localStorage
      try {
        const raw = localStorage.getItem(CHAR_DICT_STORAGE_KEY);
        if (raw) {
          charDict = JSON.parse(raw);
        }
      } catch (e) {
        console.warn('Failed to load charDict from localStorage:', e);
        charDict = [];
      }
    }

    if (!charDict || charDict.length === 0) {
      // Create initial sample entries
      const sampleA = createSampleCharacter('A');
      const sampleB = createSampleCharacter('B');
      charDict = [
        {
          id: 'dict_sample_a',
          name: '生徒A (青)',
          image: sampleA.src,
          lastPosX: 40,
          lastPosY: 85,
          lastScale: 100,
          flip: false,
          dim: false
        },
        {
          id: 'dict_sample_b',
          name: '生徒B (赤)',
          image: sampleB.src,
          lastPosX: 60,
          lastPosY: 85,
          lastScale: 100,
          flip: false,
          dim: false
        }
      ];
      saveCharDict();
    }

    // Preload image elements for all entries
    charDict.forEach((entry) => {
      if (!entry.imgElement && entry.image) {
        const img = new Image();
        img.src = entry.image;
        entry.imgElement = img;
      }
    });

    renderCharToggleGrid();
    renderDictListUI();
  }

  function saveCharDict() {
    // Save to IndexedDB (robust, large capacity)
    saveCharDictToDb(charDict);

    // Also attempt localStorage backup (safely ignore quota exceeded)
    try {
      const serializable = charDict.map((d) => ({
        id: d.id,
        name: d.name,
        image: d.image,
        lastPosX: d.lastPosX,
        lastPosY: d.lastPosY,
        lastScale: d.lastScale,
        flip: d.flip || false,
        dim: d.dim || false
      }));
      localStorage.setItem(CHAR_DICT_STORAGE_KEY, JSON.stringify(serializable));
    } catch (e) {
      // Silently ignore quota exceeded errors since IndexedDB handles persistence
    }
  }

  function updateDictFromChar(char) {
    if (!char || !char.dictId) return;
    const entry = charDict.find((d) => d.id === char.dictId);
    if (entry) {
      entry.lastPosX = char.posX;
      entry.lastPosY = char.posY;
      entry.lastScale = char.scale;
      entry.flip = char.flip;
      entry.dim = char.dim;
      saveCharDict();
      renderDictListUI();
    }
  }

  function renderCharToggleGrid() {
    const grid = document.getElementById('charToggleGrid');
    if (!grid) return;
    grid.innerHTML = '';

    if (charDict.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 12px; text-align: center; color: #64748b; font-size: 11px; background: rgba(18, 128, 254, 0.05); border: 1.5px dashed #b9d8fc; border-radius: 8px;">
          キャラクター辞書に登録がありません。<br>下の「新規キャラ登録」から追加してください。
        </div>
      `;
      return;
    }

    charDict.forEach((entry) => {
      const isOnScreen = state.characters.some((c) => c.dictId === entry.id);
      const btn = document.createElement('button');
      btn.className = `char-toggle-btn ${isOnScreen ? 'active' : ''}`;
      btn.type = 'button';
      btn.innerHTML = `
        <img class="char-toggle-thumb" src="${entry.image}" alt="${entry.name}">
        <span class="char-toggle-name" title="${entry.name}">${entry.name}</span>
        <span class="char-toggle-status">${isOnScreen ? '表示中' : '非表示'}</span>
      `;

      btn.addEventListener('click', () => {
        toggleCharOnScreen(entry);
      });

      grid.appendChild(btn);
    });
  }

  function toggleCharOnScreen(entry) {
    const existingIndex = state.characters.findIndex((c) => c.dictId === entry.id);
    if (existingIndex >= 0) {
      // Remove from screen
      state.characters.splice(existingIndex, 1);
      if (state.selectedCharId === entry.id) {
        state.selectedCharId = state.characters.length > 0 ? state.characters[state.characters.length - 1].id : null;
      }
    } else {
      // Add to screen at the end (renders on top)
      let imgObj = entry.imgElement;
      if (!imgObj || !imgObj.complete) {
        imgObj = new Image();
        imgObj.src = entry.image;
        entry.imgElement = imgObj;
      }

      const newChar = {
        id: `on_${entry.id}_${Date.now()}`,
        dictId: entry.id,
        name: entry.name,
        image: imgObj,
        posX: typeof entry.lastPosX === 'number' ? entry.lastPosX : 50,
        posY: typeof entry.lastPosY === 'number' ? entry.lastPosY : 85,
        scale: typeof entry.lastScale === 'number' ? entry.lastScale : 100,
        flip: !!entry.flip,
        dim: !!entry.dim
      };

      state.characters.push(newChar);
      state.selectedCharId = newChar.id;
    }

    renderCharToggleGrid();
    render();
    recordHistory(true);
  }

  function renderDictListUI() {
    const list = document.getElementById('dictCharList');
    if (!list) return;
    list.innerHTML = '';

    if (charDict.length === 0) {
      list.innerHTML = '<div style="font-size: 11px; color: #94a3b8; text-align: center; padding: 8px;">登録されたキャラはいません</div>';
      return;
    }

    charDict.forEach((entry) => {
      const row = document.createElement('div');
      row.className = 'dict-item-row';
      row.innerHTML = `
        <img class="dict-item-thumb" src="${entry.image}" alt="${entry.name}">
        <div class="dict-item-name" title="${entry.name}">${entry.name}</div>
        <div class="dict-item-pos">X:${entry.lastPosX}% Y:${entry.lastPosY}% (${entry.lastScale}%)</div>
        <div class="dict-item-actions">
          <button class="btn btn-secondary btn-xs btn-dict-flip" title="左右反転">${entry.flip ? '反転中' : '反転'}</button>
          <button class="btn btn-secondary btn-xs btn-dict-dim" title="暗転明暗">${entry.dim ? '暗転中' : '明暗'}</button>
          <button class="btn btn-danger btn-xs btn-dict-del" title="辞書から削除">削除</button>
        </div>
      `;

      row.querySelector('.btn-dict-flip').addEventListener('click', () => {
        entry.flip = !entry.flip;
        // Also update any on-screen instance
        const onScreen = state.characters.find((c) => c.dictId === entry.id);
        if (onScreen) {
          onScreen.flip = entry.flip;
          render();
        }
        saveCharDict();
        renderDictListUI();
      });

      row.querySelector('.btn-dict-dim').addEventListener('click', () => {
        entry.dim = !entry.dim;
        const onScreen = state.characters.find((c) => c.dictId === entry.id);
        if (onScreen) {
          onScreen.dim = entry.dim;
          render();
        }
        saveCharDict();
        renderDictListUI();
      });

      row.querySelector('.btn-dict-del').addEventListener('click', () => {
        if (confirm(`「${entry.name}」を辞書から削除しますか？`)) {
          // Remove from screen if present
          state.characters = state.characters.filter((c) => c.dictId !== entry.id);
          charDict = charDict.filter((d) => d.id !== entry.id);
          saveCharDict();
          renderCharToggleGrid();
          renderDictListUI();
          render();
        }
      });

      list.appendChild(row);
    });
  }

  function setupCharacterControls() {
    loadCharDict();

    const btnClearChars = document.getElementById('btnClearChars');
    if (btnClearChars) {
      btnClearChars.addEventListener('click', () => {
        state.characters = [];
        state.selectedCharId = null;
        renderCharToggleGrid();
        render();
        recordHistory(true);
      });
    }

    // New Character Registration
    const dictNewCharName = document.getElementById('dictNewCharName');
    const dictCharDropzone = document.getElementById('dictCharDropzone');
    const dictInputCharImg = document.getElementById('dictInputCharImg');
    const dictPreviewNotice = document.getElementById('dictPreviewNotice');
    const btnAddCharToDict = document.getElementById('btnAddCharToDict');

    let pendingCharImage = null;

    if (dictCharDropzone && dictInputCharImg) {
      dictCharDropzone.addEventListener('click', () => dictInputCharImg.click());
      dictInputCharImg.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = async (re) => {
            try {
              // Automatically resize high-res PNG to max 1400px preserving transparency and sharpness
              const optimized = await optimizeCharacterImage(re.target.result, 1400);
              pendingCharImage = optimized;
              if (dictPreviewNotice) {
                dictPreviewNotice.textContent = '✓ 画像選択済み（軽量最適化完了）';
                dictPreviewNotice.style.display = 'block';
              }
            } catch (err) {
              pendingCharImage = re.target.result;
              if (dictPreviewNotice) {
                dictPreviewNotice.textContent = '✓ 画像選択済み';
                dictPreviewNotice.style.display = 'block';
              }
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (btnAddCharToDict) {
      btnAddCharToDict.addEventListener('click', () => {
        const name = (dictNewCharName.value || '').trim();
        if (!name) {
          alert('キャラ名を入力してください。');
          return;
        }
        if (!pendingCharImage) {
          alert('立ち絵画像を選択してください。');
          return;
        }

        const newId = `dict_${Date.now()}`;
        const img = new Image();
        img.src = pendingCharImage;

        const newEntry = {
          id: newId,
          name: name,
          image: pendingCharImage,
          imgElement: img,
          lastPosX: 50,
          lastPosY: 85,
          lastScale: 100,
          flip: false,
          dim: false
        };

        charDict.push(newEntry);
        saveCharDict();

        dictNewCharName.value = '';
        pendingCharImage = null;
        dictInputCharImg.value = '';
        if (dictPreviewNotice) dictPreviewNotice.style.display = 'none';

        renderCharToggleGrid();
        renderDictListUI();
        alert(`キャラ「${name}」を辞書に登録しました！`);
      });
    }

    // JSON Export & Import for Character Dictionary
    const btnExportCharDictJson = document.getElementById('btnExportCharDictJson');
    if (btnExportCharDictJson) {
      btnExportCharDictJson.addEventListener('click', () => {
        const exportData = {
          app: 'BlueArchive Scene Maker',
          type: 'character_dictionary',
          version: state.version,
          characters: charDict.map((d) => ({
            id: d.id,
            name: d.name,
            image: d.image,
            lastPosX: d.lastPosX,
            lastPosY: d.lastPosY,
            lastScale: d.lastScale,
            flip: d.flip || false,
            dim: d.dim || false
          }))
        };

        downloadOrSaveJson(exportData, `BA_Character_Dictionary_${Date.now()}.json`);
      });
    }

    const inputImportCharDictJson = document.getElementById('inputImportCharDictJson');
    if (inputImportCharDictJson) {
      inputImportCharDictJson.addEventListener('change', (e) => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (re) => {
          try {
            const data = JSON.parse(re.target.result);
            if (data.characters && Array.isArray(data.characters)) {
              let addedCount = 0;
              data.characters.forEach((incoming) => {
                if (!incoming.name || !incoming.image) return;
                const exists = charDict.find((d) => d.id === incoming.id || d.name === incoming.name);
                if (exists) {
                  // Update existing
                  exists.image = incoming.image;
                  exists.lastPosX = incoming.lastPosX || 50;
                  exists.lastPosY = incoming.lastPosY || 85;
                  exists.lastScale = incoming.lastScale || 100;
                  exists.flip = !!incoming.flip;
                  exists.dim = !!incoming.dim;
                  const img = new Image();
                  img.src = incoming.image;
                  exists.imgElement = img;
                } else {
                  // Add new
                  const img = new Image();
                  img.src = incoming.image;
                  incoming.imgElement = img;
                  charDict.push(incoming);
                }
                addedCount++;
              });
              saveCharDict();
              renderCharToggleGrid();
              renderDictListUI();
              alert(`キャラクター辞書から ${addedCount} 件のキャラを読み込みました！`);
            } else {
              alert('有効なキャラクター辞書JSONファイルではありません。');
            }
          } catch (err) {
            alert('辞書ファイルの読み込みに失敗しました: ' + err.message);
          }
        };
        reader.readAsText(file);
        inputImportCharDictJson.value = '';
      });
    }

    renderCharToggleGrid();
    renderDictListUI();
  }

  // Export / Capture
  function exportImage() {
    // Render cleanly without selection borders / highlights
    render({ isExporting: true });
    const dataUrl = canvas.toDataURL('image/png');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `BlueArchive_Scene_${timestamp}.png`;

    // Restore preview with selection indicator if an element was selected
    render();

    // Android ネイティブアプリ実行時は MediaStore 経由で直接画像保存
    if (window.AndroidApp && typeof window.AndroidApp.saveImage === 'function') {
      window.AndroidApp.saveImage(dataUrl, filename);
      return;
    }

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  }

  // JSON Save & Load (File fallback)
  function exportProjectJson() {
    const exportData = {
      app: 'BlueArchive Scene Maker',
      version: state.version,
      screen: state.screen,
      dialogue: state.dialogue,
      sensei: state.sensei,
      effect: state.effect,
      ui: state.ui,
      bg: { blur: state.bg.blur, brightness: state.bg.brightness },
      characters: state.characters.map((c) => ({
        id: c.id,
        name: c.name,
        posX: c.posX,
        posY: c.posY,
        scale: c.scale,
        flip: c.flip,
        dim: c.dim
      }))
    };
    downloadOrSaveJson(exportData, `BlueArchive_Project_${Date.now()}.json`);
  }

  function importProjectJson(e) {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (re) => {
      try {
        const loaded = JSON.parse(re.target.result);
        if (loaded.dialogue) Object.assign(state.dialogue, loaded.dialogue);
        if (loaded.sensei) Object.assign(state.sensei, loaded.sensei);
        if (loaded.effect) Object.assign(state.effect, loaded.effect);
        if (loaded.ui) Object.assign(state.ui, loaded.ui);
        if (loaded.screen) Object.assign(state.screen, loaded.screen);
        if (loaded.bg) {
          state.bg.blur = loaded.bg.blur || 0;
          state.bg.brightness = loaded.bg.brightness || 100;
        }

        syncAllUIInputs();
        render();
        alert('設定ファイルを読み込みました！');
      } catch (err) {
        alert('設定ファイルの読み込みに失敗しました: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  async function loadCustomFont() {
    try {
      if (document.fonts) {
        const fontMedium = new FontFace('MPLUSRounded1c', 'url(fonts/MPLUSRounded1c-Medium.ttf)', { weight: '100 600' });
        const fontBold = new FontFace('MPLUSRounded1c', 'url(fonts/MPLUSRounded1c-Bold.ttf)', { weight: '700 900' });
        const [loadedMedium, loadedBold] = await Promise.all([fontMedium.load(), fontBold.load()]);
        document.fonts.add(loadedMedium);
        document.fonts.add(loadedBold);
        await document.fonts.ready;
      }
    } catch (e) {
      console.warn('Custom font load notice:', e);
    }
  }

  function loadInitialBackground() {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        state.bg.image = img;
        state.bg.cachedBgImage = img;
        state.bg.mode = 'image';
        resolve();
      };
      img.onerror = (e) => {
        console.warn('Failed to load initial sample_park.jpg:', e);
        resolve();
      };
      img.src = 'sample_park.jpg';
    });
  }

  // --- Initial Launch ---
  async function init() {
    setupUI();
    renderPresetUI();
    await loadCharDict();
    await loadCustomFont();
    await loadInitialBackground();

    state.characters = [];
    state.selectedCharId = null;
    syncAllUIInputs();
    updateBottomBarUI();
    render();
    recordHistory(true);
  }

  window.addEventListener('DOMContentLoaded', init);
})();
