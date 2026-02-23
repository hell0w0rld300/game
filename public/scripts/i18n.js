/**
 * Internationalization (i18n) System
 * Supports English and Chinese with easy extensibility
 */

const I18N = {
    en: {
        // Menu
        singlePlayer: 'Single Player',
        multiplayer: 'Multiplayer',
        settings: 'Settings',
        startGame: 'Start Game',
        mainMenu: 'Main Menu',

        // Settings
        gameSettings: 'Game Settings',
        startingHealth: 'Starting Health',
        startingGold: 'Starting Gold',
        gameSpeed: 'Game Speed',
        difficulty: 'Difficulty',
        language: 'Language',
        waveDuration: 'Wave Duration (seconds)',
        apply: 'Apply',
        back: 'Back',

        // Difficulty levels
        easy: 'Easy (0.7×)',
        normal: 'Normal (1.0×)',
        hard: 'Hard (1.5×)',
        extreme: 'Extreme (2.0×)',

        // HUD
        wave: 'Wave',
        lives: 'Lives',
        gold: 'Gold',
        score: 'Score',
        enemies: 'Enemies',
        towers: 'Towers',

        // Controls
        pause: 'Pause',
        resume: 'Resume',
        speed: 'Speed',

        // Towers
        selectTower: 'Select Tower',
        arrowTower: 'Arrow Tower',
        cannonTower: 'Cannon Tower',
        iceTower: 'Ice Tower',
        teslaTower: 'Tesla Tower',
        infernoTower: 'Inferno Tower',
        chronosTower: 'Chronos Tower',

        // Tower properties
        cost: 'Cost',
        damage: 'Damage',
        fireRate: 'Fire Rate',
        range: 'Range',
        level: 'Level',
        upgrade: 'Upgrade',
        sell: 'Sell',
        dps: 'DPS',

        // Enemies
        normalEnemy: 'Normal',
        armoredEnemy: 'Armored',
        swiftEnemy: 'Swift',
        bossEnemy: 'Boss',

        // Messages
        insufficient_gold: 'Insufficient gold!',
        cannot_place_tower_on_path: 'Cannot place tower on path!',
        tower_placed: 'Tower placed!',
        tower_upgraded: 'Tower upgraded!',
        tower_sold: 'Tower sold!',
        enemy_escaped: 'Enemy escaped!',
        wave_complete: 'Wave complete!',
        all_waves_complete: 'All waves complete!',

        // Game Over
        gameOver: 'Game Over',
        victory: 'Victory!',
        defeat: 'Defeat!',
        finalStats: 'Final Statistics',
        wavesSurvived: 'Waves Survived',
        towersBuilt: 'Towers Built',
        enemiesKilled: 'Enemies Killed',
        totalScore: 'Total Score',
        restartGame: 'Restart Game',
        returnMainMenu: 'Return to Main Menu',

        // Multiplayer
        createRoom: 'Create Room',
        joinRoom: 'Join Room',
        roomCode: 'Room Code',
        players: 'Players',
        waiting: 'Waiting for players...',
        startMatch: 'Start Match',

        // Status Effects
        slowed: 'Slowed',
        burning: 'Burning',
        stunned: 'Stunned',
        frozen: 'Frozen',

        // Notifications
        notEnoughGold: 'Not enough gold',
        cannotPlace: 'Cannot place tower here',
        towerSold: 'Tower sold for {amount} gold',
        enemyKilled: '{type} killed! +{gold} gold',
    },

    zh: {
        // 菜单
        singlePlayer: '单人游戏',
        multiplayer: '多人游戏',
        settings: '设置',
        startGame: '开始游戏',
        mainMenu: '主菜单',

        // 设置
        gameSettings: '游戏设置',
        startingHealth: '初始生命值',
        startingGold: '初始金币',
        gameSpeed: '游戏速度',
        difficulty: '难度',
        language: '语言',
        waveDuration: '波次持续时间(秒)',
        apply: '应用',
        back: '返回',

        // 难度等级
        easy: '简单 (0.7×)',
        normal: '普通 (1.0×)',
        hard: '困难 (1.5×)',
        extreme: '极难 (2.0×)',

        // HUD
        wave: '波次',
        lives: '生命',
        gold: '金币',
        score: '分数',
        enemies: '敌人',
        towers: '防御塔',

        // 控制
        pause: '暂停',
        resume: '继续',
        speed: '速度',

        // 防御塔
        selectTower: '选择防御塔',
        arrowTower: '箭塔',
        cannonTower: '加农炮塔',
        iceTower: '冰冻塔',
        teslaTower: '特斯拉塔',
        infernoTower: '地狱火塔',
        chronosTower: '时间塔',

        // 防御塔属性
        cost: '费用',
        damage: '伤害',
        fireRate: '射速',
        range: '范围',
        level: '级别',
        upgrade: '升级',
        sell: '出售',
        dps: '伤害/秒',

        // 敌人
        normalEnemy: '普通',
        armoredEnemy: '装甲',
        swiftEnemy: '敏捷',
        bossEnemy: '首领',

        // 消息
        insufficient_gold: '金币不足!',
        cannot_place_tower_on_path: '无法在路径上放置防御塔!',
        tower_placed: '防御塔已放置!',
        tower_upgraded: '防御塔已升级!',
        tower_sold: '防御塔已出售!',
        enemy_escaped: '敌人逃脱了!',
        wave_complete: '波次完成!',
        all_waves_complete: '所有波次完成!',

        // 游戏结束
        gameOver: '游戏结束',
        victory: '胜利!',
        defeat: '失败!',
        finalStats: '最终统计',
        wavesSurvived: '存活波次',
        towersBuilt: '建造防御塔',
        enemiesKilled: '击杀敌人',
        totalScore: '总分数',
        restartGame: '重新开始',
        returnMainMenu: '返回主菜单',

        // 多人游戏
        createRoom: '创建房间',
        joinRoom: '加入房间',
        roomCode: '房间代码',
        players: '玩家',
        waiting: '等待其他玩家...',
        startMatch: '开始匹配',

        // 状态效果
        slowed: '减速',
        burning: '燃烧',
        stunned: '眩晕',
        frozen: '冻结',

        // 通知
        notEnoughGold: '金币不足',
        cannotPlace: '无法在此放置防御塔',
        towerSold: '防御塔出售获得 {amount} 金币',
        enemyKilled: '{type} 被击杀! +{gold} 金币',
    },
};

let currentLanguage = 'en';

function setLanguage(lang) {
    if (I18N[lang]) {
        currentLanguage = lang;
        saveSettings({language: lang});
        updateAllUI();
    }
}

function t(key, replacements = {}) {
    let text = I18N[currentLanguage]?.[key] || I18N.en[key] || key;

    // Replace placeholders
    Object.entries(replacements).forEach(([placeholder, value]) => {
        text = text.replace(`{${placeholder}}`, value);
    });

    return text;
}

function updateAllUI() {
    // Update all elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = t(key);

        if (element.tagName === 'INPUT' || element.tagName === 'OPTION') {
            element.value = text;
        } else if (element.tagName === 'BUTTON') {
            element.textContent = text;
        } else {
            element.textContent = text;
        }
    });

    // Trigger custom event for app to update
    window.dispatchEvent(new CustomEvent('languageChanged', {detail: {language: currentLanguage}}));
}

// Initialize language from settings or browser
function initializeLanguage() {
    const settings = loadSettings();
    const lang = settings.language || navigator.language.substring(0, 2);
    setLanguage(lang === 'zh' ? 'zh' : 'en');
}
