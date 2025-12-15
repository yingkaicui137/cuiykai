// 音效系统
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.initAudio();
    }
    
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createSounds();
            
            // 手机端音频需要用户交互后才能播放
            this.setupMobileAudio();
        } catch (e) {
            console.log('音频不支持');
        }
    }
    
    // 设置手机端音频
    setupMobileAudio() {
        const enableAudio = () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            document.removeEventListener('touchstart', enableAudio);
            document.removeEventListener('click', enableAudio);
        };
        
        document.addEventListener('touchstart', enableAudio);
        document.addEventListener('click', enableAudio);
    }
    
    createSounds() {
        // 创建各种音效
        this.sounds = {
            click: () => this.createTone(800, 0.1, 'square'),
            buy: () => this.createTone(600, 0.2, 'sine'),
            mine: () => this.createTone(400, 0.3, 'sawtooth'),
            damage: () => this.createHorrorSound(),
            gem: () => this.createChord([523, 659, 784], 0.5),
            cardReveal: () => this.createSweep(300, 800, 0.8),
            retreat: () => this.createTone(350, 0.3, 'triangle'),
            death: () => this.createSweep(400, 100, 1.0),
            footsteps: () => this.createFootsteps(),
            explosion: () => this.createExplosion(),
            heartBreak: () => this.createHeartBreak(),
            // 新增挖矿音效
            mineBronze: () => this.createMiningSound('bronze'),
            mineSilver: () => this.createMiningSound('silver'),
            mineGold: () => this.createMiningSound('gold'),
            pickaxeHit: () => this.createPickaxeHit(),
            // 语音音效
            angelBlessing: () => this.speakChinese('这里很安全')
        };
    }
    
    createTone(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    createChord(frequencies, duration) {
        frequencies.forEach(freq => {
            this.createTone(freq, duration, 'sine');
        });
    }
    
    createSweep(startFreq, endFreq, duration) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(startFreq, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(endFreq, this.audioContext.currentTime + duration);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    createFootsteps() {
        // 创建脚步声效果 - 快速的低频噪音序列
        if (!this.audioContext) return;
        
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(150 + Math.random() * 50, this.audioContext.currentTime);
                oscillator.type = 'square';
                
                gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.1);
            }, i * 100);
        }
    }
    
    createHorrorSound() {
        // 创建恐怖音效 - 低频震颤
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(40, this.audioContext.currentTime + 0.8);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.8);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.8);
    }
    
    createExplosion() {
        // 创建爆炸音效
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.3);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
    
    createHeartBreak() {
        // 创建爱心破碎音效
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.5);
        oscillator.type = 'triangle';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }
    
    createMiningSound(pickaxeType) {
        // 根据镐子类型创建不同次数的挖矿音效
        if (!this.audioContext) return;
        
        const miningConfig = {
            bronze: {
                hits: 3,
                frequencies: [300, 350, 280],
                interval: 500, // 1.5秒 / 3次 = 500ms间隔
                volume: 0.08
            },
            silver: {
                hits: 6,
                frequencies: [500, 600, 550, 520, 580, 540],
                interval: 250, // 1.5秒 / 6次 = 250ms间隔
                volume: 0.1
            },
            gold: {
                hits: 9,
                frequencies: [800, 900, 1000, 850, 950, 1050, 820, 920, 980],
                interval: 167, // 1.5秒 / 9次 ≈ 167ms间隔
                volume: 0.12
            }
        };
        
        const config = miningConfig[pickaxeType] || miningConfig.bronze;
        
        // 创建连续的叮叮叮音效
        for (let i = 0; i < config.hits; i++) {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                const freq = config.frequencies[i % config.frequencies.length];
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                oscillator.type = pickaxeType === 'gold' ? 'sine' : 'square';
                
                gainNode.gain.setValueAtTime(config.volume, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.15);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.15);
                
                // 金镐额外的华丽音效
                if (pickaxeType === 'gold' && i % 3 === 0) {
                    setTimeout(() => {
                        // 每3次敲击添加一次华丽音效
                        this.createChord([freq, freq * 1.25, freq * 1.5], 0.2);
                    }, 30);
                }
            }, i * config.interval);
        }
    }
    
    createPickaxeHit() {
        // 创建镐子敲击石头的音效
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(80, this.audioContext.currentTime + 0.1);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }
    
    // 中文语音合成
    speakChinese(text) {
        if ('speechSynthesis' in window) {
            // 停止之前的语音
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            
            // 设置中文语音参数
            utterance.lang = 'zh-CN';
            utterance.rate = 0.9; // 语速稍慢一点
            utterance.pitch = 1.2; // 音调稍高一点，更像天使
            utterance.volume = 0.8; // 音量适中
            
            // 尝试选择中文语音
            const voices = speechSynthesis.getVoices();
            const chineseVoice = voices.find(voice => 
                voice.lang.includes('zh') || 
                voice.name.includes('Chinese') ||
                voice.name.includes('中文')
            );
            
            if (chineseVoice) {
                utterance.voice = chineseVoice;
            }
            
            // 播放语音
            speechSynthesis.speak(utterance);
            
            console.log(`播放中文语音: ${text}`);
        } else {
            console.log('浏览器不支持语音合成');
        }
    }
}

// 特效系统
class EffectsManager {
    static addButtonPressEffect(element) {
        element.classList.add('button-pressed');
        setTimeout(() => {
            element.classList.remove('button-pressed');
        }, 200);
    }
    
    static addCardRevealEffect(element) {
        element.classList.add('card-revealing');
        setTimeout(() => {
            element.classList.remove('card-revealing');
        }, 1000);
    }
    
    static addGemEffect(element) {
        element.classList.add('gem-effect');
        setTimeout(() => {
            element.classList.remove('gem-effect');
        }, 800);
    }
    
    static addDamageEffect(element) {
        element.classList.add('damage-effect');
        setTimeout(() => {
            element.classList.remove('damage-effect');
        }, 600);
    }
    
    static addSettlementEffect(element) {
        element.classList.add('settlement-appearing');
        setTimeout(() => {
            element.classList.remove('settlement-appearing');
        }, 500);
    }
}

// 游戏状态管理
class MiningGame {
    constructor() {
        this.players = [];
        this.currentRound = 1;
        this.maxRounds = 3;
        this.currentPhase = 'preparation'; // preparation, shop, mine-display, mining, results
        this.currentMineIndex = 0;
        this.mineCards = [];
        this.currentCard = null;
        this.playerChoices = {};
        this.playerPositions = {}; // 玩家位置：-1=营地，0-19=矿洞位置
        this.damageHistory = {}; // 记录每个玩家受到的伤害历史
        this.roundEnding = false; // 防止重复结束轮次
        
        // 准备阶段状态
        this.characterStates = {
            1: { selected: false, ready: false, playerName: '', playerId: null },
            2: { selected: false, ready: false, playerName: '', playerId: null },
            3: { selected: false, ready: false, playerName: '', playerId: null },
            4: { selected: false, ready: false, playerName: '', playerId: null }
        };
        
        // 当前玩家选择的角色ID（每个玩家只能选一个）
        this.currentPlayerSelection = null;
        
        // 初始化音效系统
        this.soundManager = new SoundManager();
        
        this.initializePreparation();
        this.setupMobileDetection();
        
        // 房间系统
        this.isHost = false;
        this.roomCode = null;
        this.roomPlayers = [];
        this.setupRoomSystem();
    }
    
    // 设置房间系统
    setupRoomSystem() {
        // 使用localStorage作为简单的本地存储
        this.roomStorage = {
            setRoom: (code, data) => {
                localStorage.setItem(`room_${code}`, JSON.stringify({
                    ...data,
                    lastUpdate: Date.now()
                }));
                // 同时更新房间列表
                this.updateRoomsList();
            },
            getRoom: (code) => {
                const data = localStorage.getItem(`room_${code}`);
                if (!data) return null;
                const room = JSON.parse(data);
                // 检查房间是否过期（10分钟）
                if (Date.now() - room.lastUpdate > 600000) {
                    localStorage.removeItem(`room_${code}`);
                    return null;
                }
                return room;
            },
            getAllRooms: () => {
                const rooms = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('room_')) {
                        const code = key.replace('room_', '');
                        const room = this.roomStorage.getRoom(code);
                        if (room) {
                            rooms.push({ code, ...room });
                        }
                    }
                }
                return rooms;
            },
            updateRoom: (code, updates) => {
                const room = this.roomStorage.getRoom(code);
                if (room) {
                    this.roomStorage.setRoom(code, { ...room, ...updates });
                }
            },
            deleteRoom: (code) => {
                localStorage.removeItem(`room_${code}`);
                this.updateRoomsList();
            }
        };
        
        // 启动房间列表刷新
        this.startRoomsListRefresh();
    }
    
    // 生成房间号
    generateRoomCode() {
        return Math.random().toString(36).substr(2, 6).toUpperCase();
    }
    
    // 创建房间
    createRoom() {
        this.isHost = true;
        this.roomCode = this.generateRoomCode();
        
        // 确保房间号唯一
        while (this.roomStorage.getRoom(this.roomCode)) {
            this.roomCode = this.generateRoomCode();
        }
        
        // 获取房主名字
        const hostName = prompt('请输入你的名字（作为房主）：') || '房主';
        this.playerName = hostName; // 保存玩家名字，后面选角色时使用
        
        // 创建房间数据
        const roomData = {
            hostName: hostName,
            roomName: `${hostName}的房间`,
            players: [{ name: hostName, isHost: true }],
            gameState: 'waiting',
            characterStates: {
                1: { selected: false, ready: false, playerName: '', playerId: null },
                2: { selected: false, ready: false, playerName: '', playerId: null },
                3: { selected: false, ready: false, playerName: '', playerId: null },
                4: { selected: false, ready: false, playerName: '', playerId: null }
            }
        };
        
        this.roomStorage.setRoom(this.roomCode, roomData);
        this.showRoomStatus();
        this.startRoomPolling();
    }
    
    // 加入房间
    joinRoom(code) {
        const room = this.roomStorage.getRoom(code);
        if (!room) {
            alert('房间不存在或已过期！');
            return;
        }
        
        // 获取玩家名字
        const playerName = prompt('请输入你的名字：') || '玩家';
        this.playerName = playerName; // 保存玩家名字，后面选角色时使用
        
        // 添加玩家到房间
        room.players.push({ name: playerName, isHost: false });
        this.roomStorage.setRoom(code, room);
        
        this.isHost = false;
        this.roomCode = code;
        this.showRoomStatus();
        this.startRoomPolling();
    }
    
    // 显示房间状态
    showRoomStatus() {
        const roomSelection = document.getElementById('room-selection');
        const roomStatus = document.getElementById('room-status');
        const roomInfo = document.getElementById('room-info');
        const hostControls = document.getElementById('host-controls');
        
        // 隐藏房间选择，显示房间状态
        roomSelection.style.display = 'none';
        roomStatus.style.display = 'block';
        
        const room = this.roomStorage.getRoom(this.roomCode);
        if (!room) return;
        
        if (this.isHost) {
            roomInfo.textContent = `房间：${room.roomName} - 你是房主`;
            hostControls.style.display = 'block';
        } else {
            roomInfo.textContent = `已加入：${room.roomName} - 等待房主开始游戏`;
            hostControls.style.display = 'none';
        }
        
        this.updateRoomPlayersList();
    }
    
    // 更新房间玩家列表
    updateRoomPlayersList() {
        const room = this.roomStorage.getRoom(this.roomCode);
        if (!room) return;
        
        const playersList = document.getElementById('room-players-list');
        if (!playersList) return;
        
        playersList.innerHTML = '<h4 style="color: #ffd700; margin-bottom: 1vh;">房间内玩家：</h4>';
        
        room.players.forEach((player, index) => {
            const playerDiv = document.createElement('div');
            playerDiv.style.cssText = `
                padding: 1vh 1.5vw;
                margin: 0.5vh 0;
                background: rgba(139, 105, 20, 0.3);
                border-radius: 0.5vh;
                color: #f4e4bc;
                border: 1px solid #8b6914;
                font-size: 1.1rem;
            `;
            const playerName = typeof player === 'string' ? player : player.name;
            const isHost = typeof player === 'string' ? index === 0 : player.isHost;
            playerDiv.textContent = `${index + 1}. ${playerName}${isHost ? ' 👑 (房主)' : ''}`;
            playersList.appendChild(playerDiv);
        });
    }
    
    // 更新房间列表
    updateRoomsList() {
        const roomsList = document.getElementById('rooms-list');
        if (!roomsList) return;
        
        const rooms = this.roomStorage.getAllRooms();
        
        if (rooms.length === 0) {
            roomsList.innerHTML = '<div class="no-rooms">暂无可用房间，创建一个新房间吧！</div>';
            return;
        }
        
        roomsList.innerHTML = '';
        rooms.forEach(room => {
            const roomDiv = document.createElement('div');
            roomDiv.className = 'room-item';
            
            const playerCount = room.players ? room.players.length : 0;
            
            roomDiv.innerHTML = `
                <div class="room-info">
                    <div class="room-name">${room.roomName || '未命名房间'}</div>
                    <div class="room-players">${playerCount} 人在房间</div>
                </div>
                <button class="join-room-btn" onclick="joinSpecificRoom('${room.code}')">
                    加入房间
                </button>
            `;
            
            roomsList.appendChild(roomDiv);
        });
    }
    
    // 启动房间列表刷新
    startRoomsListRefresh() {
        // 立即更新一次
        this.updateRoomsList();
        
        // 每3秒刷新一次房间列表
        this.roomsListInterval = setInterval(() => {
            if (document.getElementById('room-selection').style.display !== 'none') {
                this.updateRoomsList();
            }
        }, 3000);
    }
    
    // 开始多人游戏
    startMultiplayerGame() {
        if (!this.isHost) return;
        
        // 更新房间状态
        this.roomStorage.updateRoom(this.roomCode, {
            gameState: 'character_selection'
        });
        
        // 切换到角色选择
        document.getElementById('room-selection').style.display = 'none';
        document.getElementById('preparation-phase').style.display = 'block';
        
        this.soundManager.play('cardReveal');
    }
    
    // 房间轮询
    startRoomPolling() {
        this.roomPollingInterval = setInterval(() => {
            this.updateRoomState();
        }, 1000); // 每秒检查一次
    }
    
    // 更新房间状态
    updateRoomState() {
        if (!this.roomCode) return;
        
        const room = this.roomStorage.getRoom(this.roomCode);
        if (!room) {
            alert('房间已过期或被删除！');
            this.leaveRoom();
            return;
        }
        
        // 同步角色状态
        if (room.gameState === 'character_selection') {
            // 如果不是房主且还在房间选择界面，切换到角色选择
            if (!this.isHost && document.getElementById('room-selection').style.display !== 'none') {
                document.getElementById('room-selection').style.display = 'none';
                document.getElementById('preparation-phase').style.display = 'block';
            }
            
            // 同步角色状态
            this.characterStates = room.characterStates;
            this.updateCharacterSelectionUI();
        }
    }
    
    // 离开房间
    leaveRoom() {
        if (this.roomPollingInterval) {
            clearInterval(this.roomPollingInterval);
        }
        
        this.isHost = false;
        this.roomCode = null;
        
        // 返回房间选择界面
        document.getElementById('room-status').style.display = 'none';
        document.getElementById('preparation-phase').style.display = 'none';
        document.getElementById('room-selection').style.display = 'block';
    }
    
    // 检测手机并显示提示
    setupMobileDetection() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            const mobileTip = document.getElementById('mobile-tip');
            if (mobileTip) {
                mobileTip.style.display = 'block';
                
                // 3秒后自动隐藏提示
                setTimeout(() => {
                    mobileTip.style.display = 'none';
                }, 3000);
            }
        }
    }
    
    // 重置准备阶段状态
    resetPreparationState() {
        // 重置所有角色状态
        for (let i = 1; i <= 4; i++) {
            this.characterStates[i] = {
                selected: false,
                ready: false,
                playerName: '',
                playerId: null
            };
            
            // 重置UI
            const characterSlot = document.getElementById(`character-${i}`);
            if (characterSlot) {
                characterSlot.classList.remove('selected', 'ready');
                characterSlot.onclick = function() { selectCharacter(i); };
                
                const statusDiv = characterSlot.querySelector('.character-status');
                const inputDiv = characterSlot.querySelector('.character-input');
                const input = inputDiv ? inputDiv.querySelector('input') : null;
                
                if (statusDiv) {
                    statusDiv.style.display = 'block';
                    statusDiv.textContent = '点击选择';
                    statusDiv.style.color = '#f4e4bc';
                }
                
                if (inputDiv) {
                    inputDiv.style.display = 'none';
                }
                
                if (input) {
                    input.value = '';
                }
            }
        }
        
        // 重置当前选择
        this.currentPlayerSelection = null;
        
        // 隐藏开始按钮
        const startContainer = document.getElementById('start-game-container');
        if (startContainer) {
            startContainer.style.display = 'none';
        }
    }
    
    initializePreparation() {
        // 准备阶段不需要创建玩家，等待玩家选择
        this.generateMineCards();
        this.updateDisplay();
    }
    
    initializeGame() {
        // 创建玩家（包括AI）
        this.players = [
            { id: 1, name: '玩家1', isHuman: true, campGems: 10, mineGems: 0, health: 3, pickaxes: [], isAlive: true, color: 'player1' },
            { id: 2, name: '玩家2(AI)', isHuman: false, campGems: 10, mineGems: 0, health: 3, pickaxes: [], isAlive: true, color: 'player2' },
            { id: 3, name: '玩家3(AI)', isHuman: false, campGems: 10, mineGems: 0, health: 3, pickaxes: [], isAlive: true, color: 'player3' }
        ];
        
        // 初始化玩家位置（都在营地）
        this.players.forEach(player => {
            this.playerPositions[player.id] = -1;
            this.damageHistory[player.id] = []; // 初始化伤害历史
        });
        
        this.generateMineCards();
        this.updateDisplay();
    }
    
    // 生成矿洞牌库
    generateMineCards() {
        const cardTypes = [
            { damage: 1, gems: 0, count: 10, type: 'normal' },
            { damage: 2, gems: 20, count: 10, type: 'normal' },
            { damage: 3, gems: 30, count: 5, type: 'normal' },
            { damage: 0, gems: 10, count: 10, type: 'normal' },
            { damage: 0, gems: 15, count: 5, type: 'normal' },
            { damage: 0, gems: 30, count: 5, type: 'normal' },
            { damage: 0, gems: 0, count: 5, type: 'dice' }
        ];
        
        this.allCards = [];
        cardTypes.forEach(cardType => {
            for (let i = 0; i < cardType.count; i++) {
                this.allCards.push({
                    damage: cardType.damage,
                    gems: cardType.gems,
                    type: cardType.type
                });
            }
        });
    }
    
    // 随机选择12张牌组成矿洞
    generateMineForRound() {
        const shuffled = [...this.allCards].sort(() => Math.random() - 0.5);
        this.mineCards = shuffled.slice(0, 12);
        this.currentMineIndex = 0;
    }
    
    // 更新显示
    updateDisplay() {
        document.getElementById('round-number').textContent = this.currentRound;
        document.getElementById('phase').textContent = this.getPhaseText();
        
        if (this.currentPhase === 'preparation') {
            // 准备阶段不需要更新玩家信息
            return;
        }
        
        // 总是更新房子里的矿石数量
        this.updateHouseGems();
        
        if (this.currentPhase === 'shop') {
            this.updateShopDisplay();
        } else if (this.currentPhase === 'mining') {
            this.updateMiningDisplay();
        }
    }
    
    getPhaseText() {
        switch (this.currentPhase) {
            case 'preparation': return '准备阶段';
            case 'shop': return '购买阶段';
            case 'mine-display': return '矿洞展示';
            case 'mining': return '挖矿阶段';
            case 'results': return '结果阶段';
            default: return '';
        }
    }
    
    // 更新商店显示
    updateShopDisplay() {
        const humanPlayer = this.players.find(p => p.isHuman);
        if (humanPlayer) {
            // 更新玩家信息显示
            const playerInfoDiv = document.getElementById('human-player-info');
            if (playerInfoDiv) {
                playerInfoDiv.innerHTML = `
                    <div class="player-info">
                        <h4>${humanPlayer.name}</h4>
                        <div class="player-stats">
                            <span>营地矿石: ${humanPlayer.campGems}</span>
                            <span>血量: ${humanPlayer.health}</span>
                        </div>
                        <div class="player-inventory">
                            装备: ${this.getPickaxeText(humanPlayer.pickaxes)}
                        </div>
                    </div>
                `;
            }
        }
    }
    
    getPickaxeText(pickaxes) {
        const counts = { bronze: 0, silver: 0, gold: 0 };
        pickaxes.forEach(p => counts[p]++);
        const parts = [];
        // 铜镐总是显示为无限
        parts.push('铜∞');
        if (counts.silver > 0) parts.push(`银${counts.silver}`);
        if (counts.gold > 0) parts.push(`金${counts.gold}`);
        return parts.join(', ');
    }
    
    // 购买镐子
    buyItem(type, grade, cost) {
        const player = this.players.find(p => p.isHuman);
        if (!player || player.campGems < cost) {
            this.soundManager.play('click');
            return false;
        }
        
        player.campGems -= cost;
        player.pickaxes.push(grade);
        
        // 播放购买音效
        this.soundManager.play('buy');
        
        this.updateDisplay();
        return true;
    }
    
    // 开始挖矿
    startMining() {
        // 显示AI购买状态
        this.showAIShoppingStatus();
        
        // AI购买逻辑（延迟执行以显示动画）
        setTimeout(() => {
            this.players.filter(p => !p.isHuman).forEach((player, index) => {
                setTimeout(() => {
                    this.aiPurchase(player);
                }, index * 1000);
            });
            
            // 所有AI购买完成后继续
            setTimeout(() => {
                this.hideAIShoppingStatus();
                
                // 每轮开始时都生成新的矿洞
                this.generateMineForRound();
                console.log(`第${this.currentRound}轮：生成新的矿洞，总共12张牌`);
                
                this.currentPhase = 'mine-display';
                this.showMineDisplayPhase();
                this.updateDisplay();
            }, 2000);
        }, 500);
    }
    
    // 显示AI购买状态
    showAIShoppingStatus() {
        const aiStatus = document.getElementById('ai-status');
        if (aiStatus) {
            aiStatus.style.display = 'block';
        }
    }
    
    // 隐藏AI购买状态
    hideAIShoppingStatus() {
        const aiStatus = document.getElementById('ai-status');
        if (aiStatus) {
            aiStatus.style.display = 'none';
        }
    }
    
    // AI购买逻辑
    aiPurchase(player) {
        // 简单的AI策略：购买镐子（铜镐无限，不需要购买）
        while (player.campGems >= 5) {
            if (player.pickaxes.length < 4 && Math.random() > 0.2) {
                // 购买镐子
                if (player.campGems >= 10 && Math.random() > 0.6) {
                    player.campGems -= 10;
                    player.pickaxes.push('gold');
                } else if (player.campGems >= 5 && Math.random() > 0.4) {
                    player.campGems -= 5;
                    player.pickaxes.push('silver');
                }
            } else {
                break;
            }
        }
    }
    
    // 显示矿洞地图阶段
    showMineDisplayPhase() {
        document.getElementById('shop-phase').style.display = 'none';
        document.getElementById('mine-display-phase').style.display = 'block';
        
        // 新的视觉化结算系统不需要额外的UI清理
        
        // 重置所有存活玩家位置到当前矿洞位置
        this.players.forEach(player => {
            if (player.isAlive && this.playerPositions[player.id] === -1) {
                // 只有在营地的玩家才进入矿洞
                // 带动画移动到矿洞
                this.movePlayerWithAnimation(player.id, -1, this.currentMineIndex);
                // 进入矿洞时重置矿洞矿石为0
                player.mineGems = 0;
            }
        });
        
        this.generateMineMap();
        this.generateDisplayChoices();
        this.updateMineDisplay();
    }
    
    // 生成矿洞地图
    generateMineMap() {
        const minePath = document.getElementById('mine-path');
        minePath.innerHTML = '';
        
        this.mineCards.forEach((card, index) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'mine-card';
            cardDiv.id = `mine-card-${index}`;
            
            // 显示已经翻开的牌的内容
            let cardContent = '未知';
            if (index < this.currentMineIndex) {
                if (card.type === 'dice') {
                    // 如果是已经结算过的骰子矿洞，显示实际矿石数
                    if (index === this.currentMineIndex - 1 && this.totalDiceGems > 0) {
                        cardContent = `骰子矿洞<br>伤害: ${card.damage}<br>矿石: ${this.totalDiceGems}`;
                    } else {
                        cardContent = `骰子矿洞<br>伤害: ${card.damage}<br>矿石: 骰子决定`;
                    }
                } else {
                    cardContent = `伤害: ${card.damage}<br>矿石: ${card.gems}`;
                }
            } else if (index === this.currentMineIndex && card.type === 'dice' && this.totalDiceGems > 0) {
                // 当前正在结算的骰子矿洞
                cardContent = `骰子矿洞<br>伤害: ${card.damage}<br>矿石: ${this.totalDiceGems}`;
            }
            
            cardDiv.innerHTML = `
                <div class="mine-card-number">${index + 1}</div>
                <div class="mine-card-content">${cardContent}</div>
                <div class="mine-card-players" id="card-players-${index}"></div>
            `;
            
            minePath.appendChild(cardDiv);
        });
    }
    
    // 更新矿洞显示
    updateMineDisplay() {
        this.updateMineDisplayStatic();
    }
    
    // 静态更新矿洞显示（不带动画）
    updateMineDisplayStatic() {
        // 清除所有玩家标记
        for (let i = 0; i < 12; i++) {
            const playersDiv = document.getElementById(`card-players-${i}`);
            if (playersDiv) playersDiv.innerHTML = '';
        }
        
        // 清除营地房子里的玩家
        for (let i = 1; i <= 3; i++) {
            const housePlayer = document.getElementById(`player-in-house-${i}`);
            if (housePlayer) housePlayer.innerHTML = '';
        }
        
        // 放置玩家标记
        this.players.forEach(player => {
            this.placePlayerToken(player, this.playerPositions[player.id]);
        });
        
        // 更新房子里的矿石数量
        this.updateHouseGems();
        
        // 高亮当前矿洞
        document.querySelectorAll('.mine-card').forEach((card, index) => {
            card.classList.toggle('current', index === this.currentMineIndex);
        });
    }
    
    // 更新房子里的矿石数量显示和标签
    updateHouseGems() {
        this.players.forEach(player => {
            const gemsSpan = document.getElementById(`gems-${player.id}`);
            if (gemsSpan) {
                gemsSpan.textContent = player.campGems;
                
                // 如果矿石数量发生变化，添加闪烁效果
                gemsSpan.classList.add('gems-updated');
                setTimeout(() => {
                    gemsSpan.classList.remove('gems-updated');
                }, 1000);
            }
            
            // 更新房子标签显示玩家名字
            const house = document.getElementById(`house-${player.id}`);
            if (house) {
                const houseLabel = house.querySelector('.house-label');
                if (houseLabel) {
                    houseLabel.textContent = `${player.name}的营地`;
                }
            }
        });
    }
    
    // 放置玩家标记
    placePlayerToken(player, position) {
        if (position === -1) {
            // 在营地 - 放到玩家的房子里
            const housePlayer = document.getElementById(`player-in-house-${player.id}`);
            const token = document.createElement('div');
            token.className = `camp-token ${player.color}`;
            token.id = `player-token-${player.id}`;
            token.setAttribute('data-player-id', player.id);
            
            if (housePlayer) {
                housePlayer.appendChild(token);
                // 更新房子的颜色主题
                const house = document.getElementById(`house-${player.id}`);
                if (house) {
                    house.classList.add(player.color);
                }
            }
        } else if (position >= 0 && position < 12) {
            // 在矿洞 - 使用增强的玩家标记
            const token = document.createElement('div');
            token.className = `player-token-enhanced ${player.color}`;
            token.id = `player-token-${player.id}`;
            token.setAttribute('data-player-id', player.id);
            
            // 添加玩家名字显示（最上方）
            const nameContainer = document.createElement('div');
            nameContainer.className = `player-name ${player.color}`;
            nameContainer.textContent = player.name;
            token.appendChild(nameContainer);
            
            // 添加血量显示（名字下方）
            const healthContainer = document.createElement('div');
            healthContainer.className = 'player-health';
            healthContainer.innerHTML = `❤️<span class="health-count">${player.health}</span>`;
            token.appendChild(healthContainer);
            
            // 添加矿洞钻石数量显示（下方）
            const gemsContainer = document.createElement('div');
            gemsContainer.className = 'player-mine-gems';
            gemsContainer.innerHTML = `💎<span class="gems-count">${player.mineGems}</span>`;
            token.appendChild(gemsContainer);
            
            // 添加悬停提示
            const tooltip = document.createElement('div');
            tooltip.className = 'player-tooltip';
            tooltip.innerHTML = `
                ${player.name}<br>
                血量: ${player.health}/3<br>
                矿洞矿石: ${player.mineGems}
            `;
            token.appendChild(tooltip);
            
            const playersDiv = document.getElementById(`card-players-${position}`);
            if (playersDiv) playersDiv.appendChild(token);
        }
    }
    
    // 更新玩家图标的血量和矿石显示
    updatePlayerTokenDisplay(player) {
        const token = document.getElementById(`player-token-${player.id}`);
        if (!token) return;
        
        // 更新血量显示
        const healthContainer = token.querySelector('.player-health');
        if (healthContainer) {
            const healthCount = healthContainer.querySelector('.health-count');
            if (healthCount) {
                healthCount.textContent = player.health;
                
                // 根据血量添加不同的颜色
                healthContainer.className = 'player-health';
                if (player.health <= 1) {
                    healthContainer.classList.add('health-critical');
                } else if (player.health <= 2) {
                    healthContainer.classList.add('health-warning');
                } else {
                    healthContainer.classList.add('health-good');
                }
            }
        }
        
        // 更新矿洞钻石数量显示
        const gemsContainer = token.querySelector('.player-mine-gems');
        if (gemsContainer) {
            const gemsCount = gemsContainer.querySelector('.gems-count');
            if (gemsCount) {
                gemsCount.textContent = player.mineGems;
                
                // 添加更新动画
                gemsCount.classList.add('gems-updated');
                setTimeout(() => {
                    gemsCount.classList.remove('gems-updated');
                }, 1000);
            }
        }
        
        // 更新玩家名字显示
        const nameContainer = token.querySelector('.player-name');
        if (nameContainer) {
            nameContainer.textContent = player.name;
        }
        
        // 更新悬停提示
        const tooltip = token.querySelector('.player-tooltip');
        if (tooltip) {
            tooltip.innerHTML = `
                ${player.name}<br>
                血量: ${player.health}/3<br>
                矿洞矿石: ${player.mineGems}
            `;
        }
    }
    
    // 带动画的玩家移动
    movePlayerWithAnimation(playerId, fromPosition, toPosition, callback) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;
        
        console.log(`移动玩家 ${playerId} 从位置 ${fromPosition} 到位置 ${toPosition}`);
        
        // 立即更新玩家位置（不等动画）
        this.playerPositions[playerId] = toPosition;
        
        // 获取当前玩家标记
        const currentToken = document.getElementById(`player-token-${playerId}`);
        if (!currentToken) {
            // 如果没有找到标记，直接放置到新位置
            this.placePlayerToken(player, toPosition);
            if (callback) callback();
            return;
        }
        
        // 播放脚步声
        this.soundManager.play('footsteps');
        
        // 立即重新放置玩家标记到新位置
        this.updateMineDisplayStatic();
        
        if (callback) callback();
    }
    
    // 生成矿洞地图选择界面
    generateDisplayChoices() {
        console.log('=== 生成选择界面 ===');
        console.log(`当前矿洞索引: ${this.currentMineIndex}`);
        console.log(`当前阶段: ${this.currentPhase}`);
        
        const displayChoices = document.getElementById('display-player-choices');
        displayChoices.innerHTML = '';
        
        // 重置选择状态
        this.playerChoices = {};
        
        // 只为仍在矿洞中的玩家生成选择界面
        const playersInMine = this.players.filter(player => 
            player.isAlive && this.playerPositions[player.id] >= 0
        );
        
        console.log('玩家状态:');
        this.players.forEach(p => {
            console.log(`  ${p.name}: 位置=${this.playerPositions[p.id]}, 存活=${p.isAlive}, 血量=${p.health}`);
        });
        
        playersInMine.forEach(player => {
            const choiceDiv = document.createElement('div');
            choiceDiv.className = 'display-player-choice';
            
            if (player.isHuman) {
                // 只为人类玩家显示详细信息和选择按钮
                let pickaxeButtons = '';
                if (player.pickaxes.length > 0) {
                    const uniquePickaxes = [...new Set(player.pickaxes)];
                    uniquePickaxes.forEach(pickaxe => {
                        const count = player.pickaxes.filter(p => p === pickaxe).length;
                        pickaxeButtons += `
                            <button onclick="makeDisplayChoice(${player.id}, 'mine', '${pickaxe}')">
                                用${this.getPickaxeName(pickaxe)}挖矿 (剩余${count})
                            </button>
                        `;
                    });
                }
                
                choiceDiv.innerHTML = `
                    <h4>${player.name}</h4>
                    <div class="player-stats">
                        <span>矿洞矿石: ${player.mineGems}</span>
                        <span>血量: ${player.health}</span>
                    </div>
                    <div class="display-choice-buttons" id="choice-buttons-${player.id}">
                        <button onclick="makeDisplayChoice(${player.id}, 'retreat')">回营地</button>
                        <button onclick="makeDisplayChoice(${player.id}, 'mine', 'bronze')">用铜镐挖矿</button>
                        ${pickaxeButtons}
                    </div>
                    <div id="choice-status-${player.id}" style="margin-top: 10px; color: #d4af37; font-size: 0.9em;">
                        等待选择...
                    </div>
                `;
            } else {
                // AI玩家只显示基本信息，不显示装备详情
                choiceDiv.innerHTML = `
                    <h4>${player.name}</h4>
                    <div class="player-stats">
                        <span>矿洞矿石: ${player.mineGems}</span>
                        <span>血量: ${player.health}</span>
                    </div>
                    <div class="ai-thinking">
                        <div id="choice-status-${player.id}" style="margin-top: 10px; color: #d4af37; font-size: 0.9em;">
                            AI思考中...
                        </div>
                        <button onclick="game.forceAIChoice(${player.id})" style="margin-top: 5px; padding: 5px 10px; background: #666; color: white; border: none; border-radius: 3px; cursor: pointer;">
                            强制AI选择
                        </button>
                        <button onclick="debugGame()" style="margin-top: 5px; padding: 5px 10px; background: #444; color: white; border: none; border-radius: 3px; cursor: pointer;">
                            调试状态
                        </button>
                    </div>
                `;
            }
            
            displayChoices.appendChild(choiceDiv);
        });
        
        console.log(`选择界面生成完成，矿洞中玩家数量: ${playersInMine.length}`);
        
        // 如果没有玩家在矿洞中，直接结束本轮
        if (playersInMine.length === 0) {
            console.log('矿洞中没有玩家，结束本轮');
            setTimeout(() => {
                if (this.currentPhase === 'mine-display') { // 只有在矿洞展示阶段才结束轮次
                    this.endRound();
                }
            }, 1000);
            return;
        }
        
        // 检查是否只有AI玩家在矿洞中
        const humanPlayersInMine = playersInMine.filter(p => p.isHuman);
        const aiPlayersInMine = playersInMine.filter(p => !p.isHuman);
        
        console.log('玩家状态检查:');
        this.players.forEach(p => {
            console.log(`${p.name}: 位置=${this.playerPositions[p.id]}, 存活=${p.isAlive}, 是人类=${p.isHuman}`);
        });
        console.log(`矿洞中人类玩家: ${humanPlayersInMine.length}, AI玩家: ${aiPlayersInMine.length}`);
        
        if (humanPlayersInMine.length === 0 && aiPlayersInMine.length > 0) {
            console.log('矿洞中只有AI玩家，自动开始AI选择');
            // 让所有AI玩家做选择
            aiPlayersInMine.forEach((player, index) => {
                setTimeout(() => {
                    this.aiMakeDisplayChoice(player);
                }, (index + 1) * 800 + Math.random() * 500);
            });
        } else if (humanPlayersInMine.length > 0) {
            console.log('有人类玩家在矿洞中，等待人类选择');
            // 如果有人类玩家，也让AI开始思考（但不立即选择）
            aiPlayersInMine.forEach((player, index) => {
                setTimeout(() => {
                    const statusDiv = document.getElementById(`choice-status-${player.id}`);
                    if (statusDiv) {
                        statusDiv.textContent = 'AI思考中...';
                    }
                }, (index + 1) * 200);
            });
        }
    }
    
    getPickaxeName(grade) {
        const names = { bronze: '铜镐', silver: '银镐', gold: '金镐' };
        return names[grade] || grade;
    }
    
    // 强制AI做选择（调试用）
    forceAIChoice(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (player && !player.isHuman && !this.playerChoices[playerId]) {
            console.log(`强制 ${player.name} 做选择`);
            this.aiMakeDisplayChoice(player);
        }
    }
    
    // 检查游戏状态（调试用）
    checkGameState() {
        console.log('=== 游戏状态检查 ===');
        console.log(`当前轮次: ${this.currentRound}`);
        console.log(`当前阶段: ${this.currentPhase}`);
        console.log(`当前矿洞索引: ${this.currentMineIndex}`);
        console.log('玩家状态:');
        this.players.forEach(p => {
            console.log(`  ${p.name}: 位置=${this.playerPositions[p.id]}, 存活=${p.isAlive}, 血量=${p.health}, 营地矿石=${p.campGems}, 矿洞矿石=${p.mineGems}`);
        });
        console.log('当前选择:', this.playerChoices);
        
        const playersInMine = this.players.filter(p => p.isAlive && this.playerPositions[p.id] >= 0);
        console.log(`矿洞中玩家数量: ${playersInMine.length}`);
        console.log(`已选择玩家数量: ${Object.keys(this.playerChoices).length}`);
    }
    
    // AI在地图界面做选择
    aiMakeDisplayChoice(player) {
        console.log(`${player.name} 开始做选择`);
        
        const hasPickaxes = player.pickaxes.length > 0;
        const currentHealth = player.health;
        const currentGems = player.mineGems;
        const minePosition = this.currentMineIndex + 1; // 1-20
        
        let action, pickaxe = null;
        
        // 改进的AI决策逻辑（现在总是有铜镐可用）
        const riskFactor = Math.random();
        const healthFactor = currentHealth / 3; // 0.33 - 1.0
        const positionFactor = (20 - minePosition) / 20; // 越深风险越高
        const gemsFactor = currentGems > 5 ? 0.3 : 0.7; // 矿石多时更保守
        
        const retreatThreshold = 0.15 + (1 - healthFactor) * 0.3 + (1 - positionFactor) * 0.2 + (1 - gemsFactor) * 0.15;
        
        if (riskFactor < retreatThreshold) {
            action = 'retreat';
        } else {
            // 选择挖矿，优先使用更好的镐子
            action = 'mine';
            if (player.pickaxes.includes('gold')) {
                pickaxe = 'gold';
            } else if (player.pickaxes.includes('silver')) {
                pickaxe = 'silver';
            } else {
                // 总是有铜镐可用
                pickaxe = 'bronze';
            }
        }
        
        console.log(`${player.name} 选择: ${action}${pickaxe ? ` 使用${pickaxe}镐` : ''} (血量:${currentHealth}, 位置:${minePosition}, 矿石:${currentGems})`);
        
        // 直接调用选择逻辑，不依赖按钮
        this.processAIChoice(player.id, action, pickaxe);
    }
    
    // 处理AI选择（不依赖UI按钮）
    processAIChoice(playerId, action, pickaxe = null) {
        this.playerChoices[playerId] = { action, pickaxe };
        
        // 更新AI状态显示
        const statusDiv = document.getElementById(`choice-status-${playerId}`);
        if (statusDiv) {
            statusDiv.textContent = '已选择';
        }
        
        console.log(`AI玩家 ${playerId} 完成选择，当前选择数量: ${Object.keys(this.playerChoices).length}`);
        
        // 检查是否所有在矿洞中的玩家都做了选择
        const playersInMine = this.players.filter(p => 
            p.isAlive && this.playerPositions[p.id] >= 0
        );
        
        if (Object.keys(this.playerChoices).length === playersInMine.length) {
            console.log('所有玩家都完成了选择，开始公布结果');
            setTimeout(() => {
                this.revealAllChoicesAndProcess();
            }, 1000);
        }
    }
    
    // 公布所有选择并开始处理
    revealAllChoicesAndProcess() {
        console.log('公布所有玩家的选择');
        
        // 公布所有玩家的选择
        Object.entries(this.playerChoices).forEach(([playerId, choice]) => {
            const player = this.players.find(p => p.id == playerId);
            const statusDiv = document.getElementById(`choice-status-${playerId}`);
            
            if (statusDiv) {
                if (choice.action === 'retreat') {
                    statusDiv.textContent = '选择：回营地';
                    statusDiv.style.color = '#90ee90';
                } else if (choice.action === 'wait') {
                    statusDiv.textContent = '选择：不挖矿';
                    statusDiv.style.color = '#ffd700';
                } else if (choice.action === 'mine') {
                    statusDiv.textContent = `选择：用${this.getPickaxeName(choice.pickaxe)}挖矿`;
                    statusDiv.style.color = '#ff6b6b';
                }
            }
            
            console.log(`${player.name} 的选择: ${choice.action}${choice.pickaxe ? ` (${choice.pickaxe})` : ''}`);
        });
        
        // 等待2秒让玩家看到所有选择，然后显示矿洞牌
        setTimeout(() => {
            this.showCardReveal();
        }, 2000);
    }
    
    // 显示矿洞牌展示界面 - 新的视觉化结算
    showCardReveal() {
        // 翻开当前矿洞牌
        this.currentCard = this.mineCards[this.currentMineIndex];
        
        console.log(`展示第${this.currentMineIndex + 1}张矿洞牌:`, this.currentCard);
        
        // 直接开始新的视觉化结算流程
        this.startVisualSettlement();
    }
    
    // 开始新的视觉化结算流程
    startVisualSettlement() {
        console.log('=== 开始视觉化结算 ===');
        console.log(`当前矿洞: ${this.currentMineIndex + 1}, 卡牌:`, this.currentCard);
        
        // 第1步：移动所有玩家到当前矿洞（2秒）
        this.movePlayersToCurrentMine(() => {
            // 第2步：伤害展示阶段
            this.showDamagePhase(() => {
                // 第3步：矿石获得阶段
                this.showGemsPhase(() => {
                    // 第4步：准备下一个矿洞或结束
                    this.prepareNextMine();
                });
            });
        });
    }
    
    // 第1步：移动所有玩家到当前矿洞
    movePlayersToCurrentMine(callback) {
        console.log('移动玩家到当前矿洞');
        
        // 播放脚步声
        this.soundManager.play('footsteps');
        
        // 移动所有在矿洞中的玩家到当前位置
        const playersInMine = this.players.filter(p => 
            p.isAlive && this.playerPositions[p.id] >= 0
        );
        
        playersInMine.forEach(player => {
            this.playerPositions[player.id] = this.currentMineIndex;
        });
        
        // 更新显示
        this.updateMineDisplayStatic();
        
        // 更新所有玩家图标显示
        playersInMine.forEach(player => {
            setTimeout(() => {
                this.updatePlayerTokenDisplay(player);
            }, 100);
        });
        
        // 2秒后继续
        setTimeout(callback, 2000);
    }
    
    // 第2步：伤害展示阶段
    showDamagePhase(callback) {
        console.log('开始伤害展示阶段');
        
        const currentCardDiv = document.getElementById(`mine-card-${this.currentMineIndex}`);
        const cardContentDiv = currentCardDiv.querySelector('.mine-card-content');
        
        // 让"未知"文字逐渐消失
        cardContentDiv.style.transition = 'opacity 1s ease-out';
        cardContentDiv.style.opacity = '0';
        
        setTimeout(() => {
            // 清空内容，准备显示骷髅头
            cardContentDiv.innerHTML = '<div class="damage-skulls"></div>';
            cardContentDiv.style.opacity = '1';
            
            // 显示骷髅头
            this.showSkulls(currentCardDiv, callback);
        }, 1000);
    }
    
    // 显示骷髅头
    showSkulls(cardDiv, callback) {
        const damage = this.currentCard.damage;
        const skullsContainer = cardDiv.querySelector('.damage-skulls');
        
        if (damage === 0) {
            // 没有伤害，显示小天使
            this.showAngel(skullsContainer, callback);
            return;
        }
        
        // 逐个显示骷髅头
        for (let i = 0; i < damage; i++) {
            setTimeout(() => {
                const skull = document.createElement('div');
                skull.className = 'damage-skull';
                skull.textContent = '💀';
                skull.style.animationDelay = `${i * 0.2}s`;
                skullsContainer.appendChild(skull);
                
                // 播放恐怖音效
                this.soundManager.play('damage');
            }, i * 800);
        }
        
        // 等待所有骷髅头显示完毕，然后处理伤害
        setTimeout(() => {
            this.processDamageEffects(cardDiv, callback);
        }, damage * 800 + 1000);
    }
    
    // 显示小天使（伤害为0时）
    showAngel(container, callback) {
        console.log('显示小天使 - 无伤害');
        
        const angel = document.createElement('div');
        angel.className = 'blessing-angel';
        angel.textContent = '👼';
        angel.style.fontSize = '4vh';
        angel.style.position = 'absolute';
        angel.style.left = '50%';
        angel.style.top = '50%';
        angel.style.transform = 'translate(-50%, -50%)';
        angel.style.zIndex = '10';
        angel.style.animation = 'angelBless 2s ease-in-out';
        
        container.appendChild(angel);
        
        // 播放祝福音效和中文语音
        setTimeout(() => {
            this.soundManager.play('gem'); // 使用宝石音效作为祝福音效
            this.soundManager.play('angelBlessing'); // 播放中文语音
        }, 300);
        
        // 2秒后移除天使并继续
        setTimeout(() => {
            angel.remove();
            callback();
        }, 2000);
    }
    
    // 处理伤害效果
    processDamageEffects(cardDiv, callback) {
        const damage = this.currentCard.damage;
        // 只处理选择挖矿的玩家
        const miningPlayers = this.players.filter(p => 
            p.isAlive && 
            this.playerPositions[p.id] === this.currentMineIndex &&
            this.playerChoices[p.id] && 
            this.playerChoices[p.id].action === 'mine'
        );
        
        let effectsCompleted = 0;
        const totalEffects = miningPlayers.length;
        
        if (totalEffects === 0) {
            // 没有挖矿玩家，直接移动骷髅头
            this.moveSkullsToSide(cardDiv, callback);
            return;
        }
        
        miningPlayers.forEach((player, index) => {
            setTimeout(() => {
                const actualDamage = this.calculateDamage(player, damage);
                
                if (actualDamage > 0) {
                    // 伤害触发：骷髅头爆炸
                    this.explodeSkull(() => {
                        // 先播放血量减少动画
                        this.animateHealthLoss(player);
                        
                        player.health -= actualDamage;
                        console.log(`${player.name} 受到 ${actualDamage} 点伤害，剩余血量: ${player.health}`);
                        
                        // 检查玩家是否死亡
                        if (player.health <= 0) {
                            this.handlePlayerDeath(player);
                        }
                        
                        effectsCompleted++;
                        if (effectsCompleted === totalEffects) {
                            this.moveSkullsToSide(cardDiv, callback);
                        }
                    });
                } else {
                    // 伤害未触发：骷髅头保持
                    console.log(`${player.name} 免疫了 ${damage} 点伤害`);
                    effectsCompleted++;
                    if (effectsCompleted === totalEffects) {
                        this.moveSkullsToSide(cardDiv, callback);
                    }
                }
            }, index * 500);
        });
    }
    
    // 骷髅头爆炸效果
    explodeSkull(callback) {
        const skulls = document.querySelectorAll('.damage-skull');
        if (skulls.length > 0) {
            const skull = skulls[0];
            skull.classList.add('skull-explode');
            
            // 播放爆炸音效
            this.soundManager.play('explosion');
        }
        
        setTimeout(callback, 500);
    }
    
    // 血量减少动画
    animateHealthLoss(player) {
        const token = document.getElementById(`player-token-${player.id}`);
        if (!token) return;
        
        const healthContainer = token.querySelector('.player-health');
        if (!healthContainer) return;
        
        // 添加受伤动画
        healthContainer.classList.add('health-damage');
        
        // 播放爱心破碎音效
        this.soundManager.play('heartBreak');
        
        setTimeout(() => {
            healthContainer.classList.remove('health-damage');
            this.updatePlayerTokenDisplay(player);
        }, 500);
    }
    
    // 移动骷髅头到卡片左侧
    moveSkullsToSide(cardDiv, callback) {
        const skulls = cardDiv.querySelectorAll('.damage-skull');
        skulls.forEach(skull => {
            skull.classList.add('move-to-side');
        });
        
        setTimeout(callback, 1000);
    }
    
    // 第3步：矿石获得阶段
    showGemsPhase(callback) {
        console.log('开始矿石获得阶段');
        
        // 先处理回营地的玩家
        this.processRetreatPlayers(() => {
            // 然后显示矿石和挖矿动画
            this.showMiningAnimation(callback);
        });
    }
    
    // 处理回营地的玩家
    processRetreatPlayers(callback) {
        const retreatPlayers = this.players.filter(p => 
            p.isAlive && 
            this.playerChoices[p.id] && 
            this.playerChoices[p.id].action === 'retreat'
        );
        
        if (retreatPlayers.length === 0) {
            callback();
            return;
        }
        
        retreatPlayers.forEach((player, index) => {
            setTimeout(() => {
                // 将矿洞矿石转移到营地
                player.campGems += player.mineGems;
                player.mineGems = 0;
                
                // 移动到营地
                this.playerPositions[player.id] = -1;
                this.movePlayerWithAnimation(player.id, this.currentMineIndex, -1);
                
                console.log(`${player.name} 回营地，带着矿石安全返回`);
            }, index * 300);
        });
        
        // 等待所有回营地动画完成
        setTimeout(callback, retreatPlayers.length * 300 + 1000);
    }
    
    // 显示挖矿动画
    showMiningAnimation(callback) {
        const currentCardDiv = document.getElementById(`mine-card-${this.currentMineIndex}`);
        const cardContentDiv = currentCardDiv.querySelector('.mine-card-content');
        
        // 计算矿石数量
        let totalGems = this.currentCard.gems;
        if (this.currentCard.type === 'dice') {
            if (!this.diceResults) {
                this.calculateDiceResults();
            }
            totalGems = this.totalDiceGems;
        }
        
        if (totalGems === 0) {
            // 没有矿石，直接继续
            setTimeout(callback, 500);
            return;
        }
        
        // 显示大矿石
        const gemSize = Math.min(totalGems / 10 + 1, 3);
        const bigGem = document.createElement('div');
        bigGem.className = 'big-gem';
        bigGem.textContent = '💎';
        bigGem.style.fontSize = `${gemSize * 2}vh`;
        bigGem.style.animation = 'gemAppear 0.5s ease-out';
        
        cardContentDiv.appendChild(bigGem);
        
        // 开始玩家挖矿动画
        setTimeout(() => {
            this.startPlayerMining(callback);
        }, 1000);
    }
    
    // 开始玩家挖矿
    startPlayerMining(callback) {
        const miningPlayers = this.players.filter(p => 
            p.isAlive && 
            this.playerPositions[p.id] === this.currentMineIndex &&
            this.playerChoices[p.id] && 
            this.playerChoices[p.id].action === 'mine'
        );
        
        let playerIndex = 0;
        
        const processNextPlayer = () => {
            if (playerIndex >= miningPlayers.length) {
                callback();
                return;
            }
            
            const player = miningPlayers[playerIndex];
            const choice = this.playerChoices[player.id];
            
            this.animatePlayerMining(player, choice.pickaxe, () => {
                playerIndex++;
                setTimeout(processNextPlayer, 500);
            });
        };
        
        processNextPlayer();
    }
    
    // 玩家挖矿动画
    animatePlayerMining(player, pickaxe, callback) {
        console.log(`${player.name} 开始挖矿动画，使用${pickaxe}镐`);
        
        // 计算获得的矿石
        const gemsEarned = this.calculatePlayerGems(player, pickaxe);
        
        // 检查当前矿洞是否有矿石
        let totalGems = this.currentCard.gems;
        if (this.currentCard.type === 'dice') {
            totalGems = this.totalDiceGems || 0;
        }
        
        const hasGems = totalGems > 0;
        
        // 消耗镐子（铜镐无限，不消耗）- 无论是否有矿石都要消耗
        if (pickaxe !== 'bronze') {
            const index = player.pickaxes.indexOf(pickaxe);
            if (index > -1) {
                player.pickaxes.splice(index, 1);
            }
        }
        
        // 根据是否有矿石决定动画类型
        if (hasGems) {
            // 有矿石：正常挖矿动画
            this.showPickaxeAnimation(pickaxe, () => {
                // 镐子动画完成后的回调
            });
            
            // 根据CSS动画的实际敲击时机同步矿石飞行
            const gemStrikeTiming = {
                // 基于CSS动画的实际敲击时机（1.5秒总时长）
                bronze: [250, 750, 1250], // 16.7%, 50%, 83.3% of 1500ms
                silver: [125, 375, 625, 875, 1125, 1375], // 8.3%, 25%, 41.7%, 58.3%, 75%, 91.7% of 1500ms
                gold: [84, 250, 417, 583, 750, 917, 1083, 1250, 1417] // 5.6%, 16.7%, 27.8%, 38.9%, 50%, 61.1%, 72.2%, 83.3%, 94.4% of 1500ms
            };
            
            const strikeTimes = gemStrikeTiming[pickaxe] || gemStrikeTiming.bronze;
            const gemsPerStrike = Math.ceil(gemsEarned / strikeTimes.length);
            
            // 在每次敲击时发放矿石，与镐子动画完全同步
            strikeTimes.forEach((strikeTime, index) => {
                setTimeout(() => {
                    const gemsThisStrike = Math.min(gemsPerStrike, gemsEarned - (index * gemsPerStrike));
                    if (gemsThisStrike > 0) {
                        // 每次敲击发放1-3个矿石，稍微错开时间避免重叠
                        for (let i = 0; i < gemsThisStrike; i++) {
                            setTimeout(() => {
                                this.createFlyingGem(player);
                                this.soundManager.play('gem');
                            }, i * 50); // 50ms间隔避免矿石重叠
                        }
                    }
                }, strikeTime);
            });
            
            // 1.5秒后完成整个动画
            setTimeout(callback, 1500);
        } else {
            // 无矿石：显示石头图标，只敲击1下
            this.showRockBreakingAnimation(pickaxe, callback);
        }
        
        // 更新玩家矿石数量
        player.mineGems += gemsEarned;
        console.log(`${player.name} 获得 ${gemsEarned} 矿石`);
        
        // 更新玩家图标显示
        setTimeout(() => {
            this.updatePlayerTokenDisplay(player);
        }, 800);
    }
    
    // 显示镐子敲击动画
    showPickaxeAnimation(pickaxe, callback) {
        const pickaxeColors = {
            bronze: '#8B4513', // 土黄色
            silver: '#C0C0C0', // 银色
            gold: '#FFD700'    // 金色
        };
        
        const currentCardDiv = document.getElementById(`mine-card-${this.currentMineIndex}`);
        const pickaxeDiv = document.createElement('div');
        pickaxeDiv.className = `mining-pickaxe pickaxe-${pickaxe}`;
        pickaxeDiv.textContent = '⛏️';
        pickaxeDiv.style.color = pickaxeColors[pickaxe];
        
        // 添加发光效果
        if (pickaxe === 'silver') {
            pickaxeDiv.style.filter = 'drop-shadow(0 0 0.5vh #C0C0C0) brightness(1.3)';
        } else if (pickaxe === 'gold') {
            pickaxeDiv.style.filter = 'drop-shadow(0 0 1vh #FFD700) brightness(1.5)';
            pickaxeDiv.classList.add('pickaxe-gold-glow');
        }
        
        // 根据镐子类型设置不同的动画
        const animationName = `pickaxeStrike${pickaxe.charAt(0).toUpperCase() + pickaxe.slice(1)}`;
        pickaxeDiv.style.animation = `${animationName} 1.5s ease-in-out`;
        
        currentCardDiv.appendChild(pickaxeDiv);
        
        // 播放对应的挖矿音效
        this.soundManager.play(`mine${pickaxe.charAt(0).toUpperCase() + pickaxe.slice(1)}`);
        
        // 根据镐子类型添加不同次数的敲击音效
        const hitConfig = {
            bronze: { hits: 3, interval: 500 },
            silver: { hits: 6, interval: 250 },
            gold: { hits: 9, interval: 167 }
        };
        
        const config = hitConfig[pickaxe] || hitConfig.bronze;
        
        // 添加敲击音效
        for (let i = 0; i < config.hits; i++) {
            setTimeout(() => {
                this.soundManager.play('pickaxeHit');
            }, i * config.interval);
        }
        
        setTimeout(() => {
            pickaxeDiv.remove();
            callback();
        }, 1500);
    }
    
    // 显示石头破碎动画（无矿石时）
    showRockBreakingAnimation(pickaxe, callback) {
        const currentCardDiv = document.getElementById(`mine-card-${this.currentMineIndex}`);
        
        // 显示石头图标
        const rockDiv = document.createElement('div');
        rockDiv.className = 'breaking-rock';
        rockDiv.textContent = '🪨';
        rockDiv.style.position = 'absolute';
        rockDiv.style.left = '50%';
        rockDiv.style.top = '50%';
        rockDiv.style.transform = 'translate(-50%, -50%)';
        rockDiv.style.fontSize = '4vh';
        rockDiv.style.zIndex = '10';
        
        currentCardDiv.appendChild(rockDiv);
        
        // 显示镐子
        const pickaxeDiv = document.createElement('div');
        pickaxeDiv.className = 'rock-breaking-pickaxe';
        pickaxeDiv.textContent = '⛏️';
        pickaxeDiv.style.position = 'absolute';
        pickaxeDiv.style.left = '50%';
        pickaxeDiv.style.top = '40%';
        pickaxeDiv.style.transform = 'translate(-50%, -50%)';
        pickaxeDiv.style.fontSize = '3vh';
        pickaxeDiv.style.zIndex = '11';
        
        const pickaxeColors = {
            bronze: '#8B4513',
            silver: '#C0C0C0', 
            gold: '#FFD700'
        };
        pickaxeDiv.style.color = pickaxeColors[pickaxe];
        
        currentCardDiv.appendChild(pickaxeDiv);
        
        // 敲击1下的动画
        setTimeout(() => {
            // 镐子敲击动画
            pickaxeDiv.style.animation = 'rockBreakStrike 0.5s ease-in-out';
            
            // 播放敲击音效
            this.soundManager.play('pickaxeHit');
            
            // 石头破碎效果
            setTimeout(() => {
                rockDiv.style.animation = 'rockBreaking 0.3s ease-out';
            }, 200);
            
        }, 100);
        
        // 0.8秒后清理并完成
        setTimeout(() => {
            rockDiv.remove();
            pickaxeDiv.remove();
            callback();
        }, 800);
    }
    
    // 矿石飞向玩家动画
    animateGemsToPlayer(player, gemsCount, callback) {
        for (let i = 0; i < gemsCount; i++) {
            setTimeout(() => {
                this.createFlyingGem(player);
                // 播放金币音效
                this.soundManager.play('gem');
            }, i * 200);
        }
        
        // 更新玩家矿石数量
        player.mineGems += gemsCount;
        console.log(`${player.name} 获得 ${gemsCount} 矿石`);
        
        // 更新玩家图标显示
        setTimeout(() => {
            this.updatePlayerTokenDisplay(player);
        }, gemsCount * 200);
        
        setTimeout(callback, gemsCount * 200 + 500);
    }
    
    // 创建飞行的矿石
    createFlyingGem(player) {
        const gem = document.createElement('div');
        gem.className = 'flying-gem';
        gem.textContent = '💎';
        gem.style.position = 'absolute';
        gem.style.fontSize = '2vh';
        gem.style.zIndex = '15';
        gem.style.pointerEvents = 'none';
        
        // 获取当前矿洞牌
        const currentCardDiv = document.getElementById(`mine-card-${this.currentMineIndex}`);
        if (!currentCardDiv) {
            console.log('找不到矿洞牌');
            return;
        }
        
        // 查找玩家图标
        let playerToken = document.getElementById(`player-token-${player.id}`);
        
        if (!playerToken) {
            console.log(`找不到玩家 ${player.id} 的图标`);
            return;
        }
        
        // 设置矿石初始位置（矿洞牌中心）
        gem.style.left = '50%';
        gem.style.top = '50%';
        gem.style.transform = 'translate(-50%, -50%)';
        
        // 添加到矿洞牌中
        currentCardDiv.appendChild(gem);
        
        // 直接飞向玩家图标位置
        // 计算玩家图标相对于矿洞牌的位置
        const playersContainer = currentCardDiv.querySelector('.mine-card-players');
        if (!playersContainer) {
            console.log('找不到玩家容器');
            gem.remove();
            return;
        }
        
        // 获取玩家图标在玩家容器中的位置
        const playerTokens = Array.from(playersContainer.children);
        const targetToken = playerTokens.find(token => token.id === `player-token-${player.id}`);
        
        if (!targetToken) {
            console.log(`找不到玩家 ${player.id} 的图标`);
            gem.remove();
            return;
        }
        
        // 计算目标位置（玩家容器在矿洞牌底部）
        const targetY = 6; // 玩家容器大约在矿洞牌底部6vh的位置
        const playerIndex = playerTokens.indexOf(targetToken);
        const totalPlayers = playerTokens.length;
        
        // 根据玩家数量和位置计算X偏移
        let targetX = 0;
        if (totalPlayers > 1) {
            const spacing = 6; // 增加玩家之间的间距
            const startX = -(totalPlayers - 1) * spacing / 2;
            targetX = startX + playerIndex * spacing;
        }
        
        console.log(`矿石飞向 ${player.name}: 目标位置=(${targetX}vh, ${targetY}vh), 玩家索引=${playerIndex}/${totalPlayers}`);
        
        // 设置CSS变量并添加动画
        gem.style.setProperty('--target-x', `${targetX}vh`);
        gem.style.setProperty('--target-y', `${targetY}vh`);
        
        setTimeout(() => {
            gem.classList.add('gem-flying-to-player');
        }, 50);
        
        // 800ms后移除矿石
        setTimeout(() => {
            if (gem.parentNode) {
                gem.remove();
            }
        }, 800);

    }
    
    // 处理玩家死亡
    handlePlayerDeath(deadPlayer) {
        console.log(`${deadPlayer.name} 死亡`);
        
        // 播放死亡音效
        this.soundManager.play('death');
        
        // 只给在矿洞中的存活玩家分配矿石
        const aliveMinePlayers = this.players.filter(p => 
            p.isAlive && 
            p.id !== deadPlayer.id && 
            this.playerPositions[p.id] >= 0
        );
        
        if (aliveMinePlayers.length > 0 && deadPlayer.mineGems > 0) {
            const gemsPerPlayer = Math.floor(deadPlayer.mineGems / aliveMinePlayers.length);
            aliveMinePlayers.forEach(player => {
                player.mineGems += gemsPerPlayer;
            });
            console.log(`${deadPlayer.name} 的 ${deadPlayer.mineGems} 矿洞矿石平分给矿洞中的存活玩家`);
        }
        
        // 清空死亡玩家的矿洞物品和矿石（营地矿石保留）
        deadPlayer.mineGems = 0;
        deadPlayer.pickaxes = [];
        deadPlayer.isAlive = false;
        
        // 移动到营地
        this.playerPositions[deadPlayer.id] = -1;
        this.movePlayerWithAnimation(deadPlayer.id, this.currentMineIndex, -1);
    }
    
    // 处理视觉化结算的游戏逻辑（备用，现在使用分步骤的视觉化）
    processVisualSettlementLogic() {
        console.log('处理结算逻辑');
        
        // 处理回营地的玩家
        const retreatPlayers = this.players.filter(p => 
            p.isAlive && 
            this.playerChoices[p.id] && 
            this.playerChoices[p.id].action === 'retreat'
        );
        
        retreatPlayers.forEach(player => {
            player.campGems += player.mineGems;
            player.mineGems = 0;
            this.playerPositions[player.id] = -1;
            console.log(`${player.name} 回营地，带着矿石安全返回`);
        });
        
        // 处理挖矿的玩家
        const miningPlayers = this.players.filter(p => 
            p.isAlive && 
            this.playerChoices[p.id] && 
            this.playerChoices[p.id].action === 'mine'
        );
        
        // 计算骰子结果（如果需要）
        if (this.currentCard.type === 'dice') {
            this.calculateDiceResults();
        }
        
        // 处理挖矿和伤害
        miningPlayers.forEach(player => {
            const choice = this.playerChoices[player.id];
            
            // 消耗镐子
            if (choice.pickaxe !== 'bronze') {
                const index = player.pickaxes.indexOf(choice.pickaxe);
                if (index > -1) {
                    player.pickaxes.splice(index, 1);
                }
            }
            
            // 计算矿石
            const gemsEarned = this.calculatePlayerGems(player, choice.pickaxe);
            player.mineGems += gemsEarned;
            
            // 处理伤害
            const damage = this.calculateDamage(player, this.currentCard.damage);
            if (damage > 0) {
                player.health -= damage;
                console.log(`${player.name} 受到 ${damage} 点伤害，剩余血量: ${player.health}`);
                
                if (player.health <= 0) {
                    // 简化的死亡处理
                    console.log(`${player.name} 死亡`);
                    
                    // 只给在矿洞中的存活玩家分配矿石
                    const aliveMinePlayers = this.players.filter(p => 
                        p.isAlive && 
                        p.id !== player.id && 
                        this.playerPositions[p.id] >= 0
                    );
                    
                    if (aliveMinePlayers.length > 0 && player.mineGems > 0) {
                        const gemsPerPlayer = Math.floor(player.mineGems / aliveMinePlayers.length);
                        aliveMinePlayers.forEach(p => {
                            p.mineGems += gemsPerPlayer;
                        });
                        console.log(`${player.name} 的 ${player.mineGems} 矿洞矿石平分给矿洞中的存活玩家`);
                    }
                    
                    // 清空死亡玩家的矿洞物品和矿石（营地矿石保留）
                    player.mineGems = 0;
                    player.pickaxes = [];
                    player.isAlive = false;
                    this.playerPositions[player.id] = -1;
                }
            }
        });
        
        // 视觉化结算已经展示了所有信息，不需要额外的文字显示
        
        // 更新显示
        this.updateMineDisplay();
        
        // 继续下一个矿洞
        setTimeout(() => {
            this.prepareNextMine();
        }, 1000);
    }
    
    // 复杂的动画函数已被简化的逻辑处理替代
    
    // 计算玩家获得的矿石数量
    calculatePlayerGems(player, pickaxe) {
        // 确保骰子结果已计算
        if (this.currentCard.type === 'dice' && !this.diceResults) {
            this.calculateDiceResults();
        }
        
        // 使用原有的计算逻辑
        const allMiners = Object.entries(this.playerChoices)
            .filter(([id, choice]) => choice.action === 'mine')
            .map(([id, choice]) => ({ id: parseInt(id), pickaxe: choice.pickaxe }));
        
        const totalShares = allMiners.reduce((sum, miner) => {
            return sum + this.getPickaxeShares(miner.pickaxe);
        }, 0);
        
        const playerShares = this.getPickaxeShares(pickaxe);
        
        let totalGems = this.currentCard.gems;
        if (this.currentCard.type === 'dice') {
            totalGems = this.totalDiceGems;
        }
        
        const gemsEarned = Math.floor(totalGems * playerShares / totalShares);
        console.log(`${player.name} 用${this.getPickaxeName(pickaxe)}获得 ${gemsEarned} 矿石 (总矿石:${totalGems}, 份额:${playerShares}/${totalShares})`);
        
        return gemsEarned;
    }
    
    // 准备下一个矿洞
    prepareNextMine() {
        console.log('视觉化结算完成，准备下一个矿洞');
        
        // 视觉化结算已经展示了所有信息，保持骷髅头和矿石的视觉效果
        
        // 等待一段时间让玩家看到结果
        setTimeout(() => {
            // 检查是否还有更多矿洞
            if (this.currentMineIndex + 1 >= this.mineCards.length) {
                // 矿洞结束
                this.endRound();
                return;
            }
            
            // 检查是否还有玩家在矿洞中
            const playersInMine = this.players.filter(p => 
                p.isAlive && this.playerPositions[p.id] >= 0
            );
            
            if (playersInMine.length === 0) {
                // 没有玩家了
                this.endRound();
                return;
            }
            
            // 移动到下一个矿洞
            this.currentMineIndex++;
            console.log(`移动到矿洞 ${this.currentMineIndex + 1}`);
            
            // 移动所有仍在矿洞中的玩家到新位置
            playersInMine.forEach(player => {
                this.playerPositions[player.id] = this.currentMineIndex;
            });
            
            // 清空选择状态
            this.playerChoices = {};
            
            // 重新生成地图和选择界面
            this.generateMineMap();
            this.generateDisplayChoices();
            this.updateMineDisplay();
        }, 3000);
    }
    
    // 计算骰子结果
    calculateDiceResults() {
        this.diceResults = {};
        this.totalDiceGems = 0;
        
        // 为所有挖矿玩家投骰子
        const allMiners = Object.entries(this.playerChoices)
            .filter(([id, choice]) => choice.action === 'mine')
            .map(([id, choice]) => parseInt(id));
        
        allMiners.forEach(minerId => {
            const dice1 = Math.floor(Math.random() * 6) + 1;
            const dice2 = Math.floor(Math.random() * 6) + 1;
            this.diceResults[minerId] = { dice1, dice2, total: dice1 + dice2 };
            this.totalDiceGems += dice1 + dice2;
        });
    }
    
    // 更新地图上的矿洞牌显示
    updateMapCardDisplay() {
        const currentCardDiv = document.getElementById(`mine-card-${this.currentMineIndex}`);
        if (currentCardDiv) {
            // 添加翻牌特效
            EffectsManager.addCardRevealEffect(currentCardDiv);
            
            const cardContentDiv = currentCardDiv.querySelector('.mine-card-content');
            
            // 检查是否已经有视觉化元素（骷髅头或大矿石）
            const hasVisualElements = cardContentDiv.querySelector('.damage-skulls') || 
                                    cardContentDiv.querySelector('.big-gem');
            
            if (!hasVisualElements) {
                // 只有在没有视觉化元素时才显示文字
                if (this.currentCard.type === 'dice') {
                    cardContentDiv.innerHTML = `骰子矿洞<br>伤害: ${this.currentCard.damage}<br>矿石: ${this.totalDiceGems}`;
                } else {
                    cardContentDiv.innerHTML = `伤害: ${this.currentCard.damage}<br>矿石: ${this.currentCard.gems}`;
                }
            }
            
            // 根据卡牌类型添加不同的发光效果
            if (this.currentCard.gems > 0 || this.currentCard.type === 'dice') {
                currentCardDiv.classList.add('mine-card-glowing');
                setTimeout(() => {
                    currentCardDiv.classList.remove('mine-card-glowing');
                }, 3000);
            }
        }
    }
    
    // 旧的文字结算系统已被新的视觉化结算系统替代
    
    getPickaxeShares(grade) {
        const shares = { bronze: 1, silver: 2, gold: 3 };
        return shares[grade] || 1;
    }
    
    // 计算玩家受到的伤害
    calculateDamage(player, cardDamage) {
        if (cardDamage === 0) return 0;
        
        // 检查玩家的伤害历史
        const damageHistory = this.damageHistory[player.id];
        
        // 计算这个伤害值出现的次数
        const damageCount = damageHistory.filter(d => d === cardDamage).length;
        
        // 记录这次伤害
        damageHistory.push(cardDamage);
        
        // 只有第二次及以后相同伤害值才造成伤害
        if (damageCount === 0) {
            // 第一次遇到这个伤害值，免疫
            return 0;
        } else {
            // 第二次及以后，造成伤害
            return cardDamage;
        }
    }
    
    // 生成免疫描述文案
    generateImmuneDescription(playerName, originalDamage) {
        const immuneTexts = {
            1: [
                `${playerName}机敏地躲开了蝙蝠的攻击`,
                `${playerName}小心避开了尖锐的石头`,
                `${playerName}及时发现了陷阱并绕过`,
                `${playerName}用衣物驱赶了毒虫`
            ],
            2: [
                `${playerName}成功驱赶了矿洞蜘蛛`,
                `${playerName}及时躲避了坍塌的碎石`,
                `${playerName}绕过了危险的酸性水坑`,
                `${playerName}与骷髅守卫擦肩而过`
            ],
            3: [
                `${playerName}勇敢地与恶魔对峙后全身而退`,
                `${playerName}在巨石落下前及时逃脱`,
                `${playerName}抓住岩壁边缘避免坠入深渊`,
                `${playerName}识破了诅咒宝箱的陷阱`
            ]
        };
        
        const texts = immuneTexts[originalDamage] || [`${playerName}成功避开了危险`];
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
    }
    
    // 生成伤害描述文案
    generateDamageDescription(playerName, damage) {
        const damageTexts = {
            1: [
                `${playerName}在矿洞中被蝙蝠咬到受到1点伤害`,
                `${playerName}被尖锐的石头划伤受到1点伤害`,
                `${playerName}踩到了陷阱受到1点伤害`,
                `${playerName}被毒虫叮咬受到1点伤害`
            ],
            2: [
                `${playerName}遭遇矿洞蜘蛛攻击受到2点伤害`,
                `${playerName}被坍塌的碎石砸中受到2点伤害`,
                `${playerName}踏入了酸性水坑受到2点伤害`,
                `${playerName}被矿洞守卫骷髅攻击受到2点伤害`
            ],
            3: [
                `${playerName}遭遇矿洞恶魔攻击受到3点伤害`,
                `${playerName}被巨石压伤受到3点伤害`,
                `${playerName}掉入了深渊受到3点伤害`,
                `${playerName}被诅咒的宝箱反噬受到3点伤害`
            ]
        };
        
        const texts = damageTexts[damage] || [`${playerName}受到${damage}点伤害`];
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
    }
    
    // 处理玩家死亡
    handlePlayerDeath(deadPlayer, results) {
        // 播放死亡音效
        this.soundManager.play('death');
        
        // 只给在矿洞中的存活玩家分配矿石
        const aliveMinePlayers = this.players.filter(p => 
            p.isAlive && 
            p.id !== deadPlayer.id && 
            this.playerPositions[p.id] >= 0
        );
        
        if (aliveMinePlayers.length > 0 && deadPlayer.mineGems > 0) {
            const gemsPerPlayer = Math.floor(deadPlayer.mineGems / aliveMinePlayers.length);
            aliveMinePlayers.forEach(player => {
                player.mineGems += gemsPerPlayer;
            });
            results.push(`${deadPlayer.name} 死亡，${deadPlayer.mineGems} 矿洞矿石平分给矿洞中的存活玩家`);
        } else if (deadPlayer.mineGems > 0) {
            results.push(`${deadPlayer.name} 死亡，但没有其他玩家在矿洞中，${deadPlayer.mineGems} 矿洞矿石消失`);
        }
        
        // 清空死亡玩家的矿洞物品和矿石（营地矿石保留）
        deadPlayer.mineGems = 0;
        deadPlayer.pickaxes = [];
        deadPlayer.isAlive = false;
        
        // 带动画移动到营地
        const fromPosition = this.playerPositions[deadPlayer.id];
        this.movePlayerWithAnimation(deadPlayer.id, fromPosition, -1);
        
        results.push(`${deadPlayer.name} 失去所有物品，回到营地`);
    }
    
    // 下一个矿洞
    nextMine() {
        console.log(`当前矿洞索引: ${this.currentMineIndex}, 准备移动到下一个矿洞`);
        
        // 等待一小段时间确保所有位置更新完成
        setTimeout(() => {
            // 检查是否还有玩家在矿洞中（只检查存活且仍在矿洞的玩家）
            const playersInMine = this.players.filter(p => 
                p.isAlive && this.playerPositions[p.id] >= 0
            );
            
            console.log('检查矿洞中的玩家:');
            this.players.forEach(p => {
                console.log(`  ${p.name}: 位置=${this.playerPositions[p.id]}, 存活=${p.isAlive}`);
            });
            console.log(`矿洞中存活玩家数量: ${playersInMine.length}`);
            
            if (this.currentMineIndex + 1 >= this.mineCards.length || playersInMine.length === 0) {
                console.log('矿洞结束或无玩家在矿洞中，结束本轮');
                // 矿洞结束，确保所有剩余的矿洞矿石转移到营地
                playersInMine.forEach(player => {
                    if (player.mineGems > 0) {
                        player.campGems += player.mineGems;
                        player.mineGems = 0;
                        this.playerPositions[player.id] = -1; // 确保回到营地
                    }
                });
                
                if (!this.roundEnding) { // 只有在轮次还没结束时才调用
                    this.endRound();
                }
                return;
            }
            
            // 移动到下一个矿洞
            this.currentMineIndex++;
            console.log(`移动到矿洞索引: ${this.currentMineIndex}`);
            
            // 只移动仍在矿洞中的存活玩家
            playersInMine.forEach(player => {
                const fromPosition = this.playerPositions[player.id];
                // 带动画移动到新矿洞
                this.movePlayerWithAnimation(player.id, fromPosition, this.currentMineIndex);
                console.log(`${player.name} 移动到位置 ${this.currentMineIndex}`);
            });
            
            // 清空之前的选择状态
            this.playerChoices = {};
            
            // 重新生成地图（显示已翻开的牌）
            this.generateMineMap();
            // 重新生成选择界面
            this.generateDisplayChoices();
            this.updateMineDisplay();
        }, 100);
    }
    
    // 结束当前轮次
    endRound() {
        if (this.roundEnding) {
            console.log('轮次已经在结束中，跳过重复调用');
            return;
        }
        
        this.roundEnding = true;
        console.log(`结束第${this.currentRound}轮`);
        
        if (this.currentRound >= this.maxRounds) {
            this.endGame();
        } else {
            this.currentRound++;
            this.currentPhase = 'shop';
            this.currentMineIndex = 0; // 重置矿洞索引
            
            console.log(`开始第${this.currentRound}轮`);
            
            // 重置玩家状态
            this.players.forEach(player => {
                player.health = 3;
                player.isAlive = true;
                player.mineGems = 0; // 确保矿洞矿石清零
                this.playerPositions[player.id] = -1; // 回到营地
                this.damageHistory[player.id] = []; // 重置伤害历史
            });
            
            // 清空选择状态
            this.playerChoices = {};
            
            // 重置轮次结束标志
            this.roundEnding = false;
            
            // 回到购买阶段
            document.getElementById('mine-display-phase').style.display = 'none';
            document.getElementById('mining-phase').style.display = 'none';
            document.getElementById('shop-phase').style.display = 'block';
            this.updateDisplay();
        }
    }
    
    // 结束游戏
    endGame() {
        this.currentPhase = 'results';
        
        // 排序玩家（按营地矿石）
        const sortedPlayers = [...this.players].sort((a, b) => b.campGems - a.campGems);
        
        const rankingsDiv = document.getElementById('final-rankings');
        rankingsDiv.innerHTML = '<h3>最终排名:</h3>' +
            sortedPlayers.map((player, index) => 
                `<div class="result-item">第${index + 1}名: ${player.name} - ${player.campGems} 矿石</div>`
            ).join('');
        
        document.getElementById('mining-phase').style.display = 'none';
        document.getElementById('results-phase').style.display = 'block';
    }
    
    // 更新角色选择UI状态
    updateCharacterSelectionUI() {
        for (let i = 1; i <= 4; i++) {
            const characterSlot = document.getElementById(`character-${i}`);
            const characterState = this.characterStates[i];
            
            if (characterState.ready) {
                // 已准备的角色完全禁用点击事件
                characterSlot.classList.remove('disabled');
                characterSlot.onclick = null;
                continue;
            }
            
            if (characterState.selected) {
                // 已选择但未准备的角色保持选中状态
                continue;
            }
            
            // 未选择的角色
            if (this.currentPlayerSelection === null) {
                // 如果当前没有玩家选择角色，启用所有未选择的角色
                characterSlot.classList.remove('disabled');
                characterSlot.onclick = () => selectCharacter(i);
            } else {
                // 如果有玩家正在选择角色，禁用其他角色
                characterSlot.classList.add('disabled');
                characterSlot.onclick = null;
            }
        }
    }
    
    // 检查是否可以开始游戏
    checkCanStartGame() {
        const readyPlayers = Object.values(this.characterStates).filter(state => state.ready);
        
        if (readyPlayers.length >= 1) { // 至少1个玩家准备好就可以开始
            document.getElementById('start-game-container').style.display = 'block';
        }
    }
    
    // 根据选择创建玩家
    createPlayersFromSelection() {
        this.players = [];
        let playerId = 1;
        
        // 遍历角色状态，创建已准备的玩家
        Object.entries(this.characterStates).forEach(([characterId, state]) => {
            if (state.ready) {
                const player = {
                    id: playerId,
                    characterId: parseInt(characterId),
                    name: state.playerName,
                    isHuman: playerId === 1, // 第一个准备的玩家是人类，其他是AI
                    campGems: 10,
                    mineGems: 0,
                    health: 3,
                    pickaxes: [],
                    isAlive: true,
                    color: `player${characterId}` // 使用角色ID作为颜色
                };
                
                this.players.push(player);
                this.playerPositions[playerId] = -1;
                this.damageHistory[playerId] = [];
                
                playerId++;
            }
        });
        
        console.log(`创建了 ${this.players.length} 个玩家:`, this.players.map(p => p.name));
        
        // 立即更新房子标签
        this.updateHouseLabels();
    }
    
    // 更新房子标签显示玩家名字
    updateHouseLabels() {
        // 先隐藏所有房子
        for (let i = 1; i <= 4; i++) {
            const house = document.getElementById(`house-${i}`);
            if (house) {
                house.style.display = 'none';
            }
        }
        
        // 只显示有玩家的房子
        this.players.forEach(player => {
            const house = document.getElementById(`house-${player.id}`);
            if (house) {
                house.style.display = 'flex';
                const houseLabel = house.querySelector('.house-label');
                if (houseLabel) {
                    houseLabel.textContent = `${player.name}的营地`;
                }
            }
        });
    }
    
    // 重新开始游戏
    restart() {
        this.currentRound = 1;
        this.currentPhase = 'preparation';
        this.currentMineIndex = 0;
        this.playerChoices = {};
        this.roundEnding = false;
        this.players = [];
        
        // 重置角色状态
        this.characterStates = {
            1: { selected: false, ready: false, playerName: '', playerId: null },
            2: { selected: false, ready: false, playerName: '', playerId: null },
            3: { selected: false, ready: false, playerName: '', playerId: null },
            4: { selected: false, ready: false, playerName: '', playerId: null }
        };
        this.currentPlayerSelection = null;
        
        console.log('重新开始游戏 - 回到准备阶段');
        
        // 重置准备界面
        for (let i = 1; i <= 4; i++) {
            const characterSlot = document.getElementById(`character-${i}`);
            characterSlot.classList.remove('selected', 'ready');
            characterSlot.onclick = () => selectCharacter(i);
            
            const statusDiv = characterSlot.querySelector('.character-status');
            const inputDiv = characterSlot.querySelector('.character-input');
            const input = inputDiv.querySelector('input');
            
            statusDiv.style.display = 'block';
            statusDiv.textContent = '点击选择';
            statusDiv.style.color = '#d4af37';
            inputDiv.style.display = 'none';
            input.value = '';
        }
        
        document.getElementById('start-game-container').style.display = 'none';
        document.getElementById('results-phase').style.display = 'none';
        document.getElementById('shop-phase').style.display = 'none';
        document.getElementById('mine-display-phase').style.display = 'none';
        document.getElementById('preparation-phase').style.display = 'block';
        
        this.updateDisplay();
    }
}

// 全局游戏实例
let game;

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', function() {
    game = new MiningGame();
});

// 准备阶段函数
function selectCharacter(characterId) {
    try {
        if (!game) {
            console.log('游戏未初始化');
            return;
        }
        
        const characterState = game.characterStates[characterId];
        if (!characterState) {
            console.log('角色状态不存在:', characterId);
            return;
        }
        
        // 如果已经被选择或已准备，不能再选择
        if (characterState.selected || characterState.ready) {
            alert('这个角色已经被其他玩家选择了！');
            return;
        }
        
        // 如果当前玩家已经选择了其他角色，不能再选择
        if (game.currentPlayerSelection !== null && game.currentPlayerSelection !== characterId) {
            alert('你已经选择了一个角色！如果要更换，请先取消当前选择。');
            return;
        }
        
        // 播放选择音效
        if (game.soundManager && game.soundManager.play) {
            game.soundManager.play('click');
        }
        
        // 标记为已选择
        characterState.selected = true;
        game.currentPlayerSelection = characterId;
        
        // 更新UI
        const characterSlot = document.getElementById(`character-${characterId}`);
        if (!characterSlot) {
            console.log('找不到角色槽:', characterId);
            return;
        }
        
        characterSlot.classList.add('selected');
        
        // 显示输入框和取消按钮
        const statusDiv = characterSlot.querySelector('.character-status');
        const inputDiv = characterSlot.querySelector('.character-input');
        
        if (statusDiv && inputDiv) {
            statusDiv.style.display = 'none';
            inputDiv.style.display = 'flex';
            
            // 聚焦到输入框并自动填入名字（苹果手机兼容）
            const input = inputDiv.querySelector('input');
            if (input) {
                // 如果在房间中，自动填入之前输入的名字
                if (game.playerName) {
                    input.value = game.playerName;
                }
                
                setTimeout(() => {
                    try {
                        input.focus();
                        input.select(); // 选中文字，方便修改
                    } catch (e) {
                        console.log('聚焦失败，这在某些手机上是正常的');
                    }
                }, 200);
            }
        }
        
        // 禁用其他角色的选择
        if (game.updateCharacterSelectionUI) {
            game.updateCharacterSelectionUI();
        }
        
    } catch (error) {
        console.error('选择角色时出错:', error);
        alert('选择角色时出现问题，请刷新页面重试');
    }
}

function cancelCharacter(characterId) {
    if (!game) return;
    
    const characterState = game.characterStates[characterId];
    
    // 播放取消音效
    game.soundManager.play('click');
    
    // 重置状态
    characterState.selected = false;
    characterState.ready = false;
    characterState.playerName = '';
    game.currentPlayerSelection = null;
    
    // 更新UI
    const characterSlot = document.getElementById(`character-${characterId}`);
    characterSlot.classList.remove('selected', 'ready');
    
    // 重新启用点击事件
    characterSlot.onclick = function() { selectCharacter(characterId); };
    
    const statusDiv = characterSlot.querySelector('.character-status');
    const inputDiv = characterSlot.querySelector('.character-input');
    const input = inputDiv.querySelector('input');
    
    // 重置显示
    statusDiv.style.display = 'block';
    statusDiv.textContent = '点击选择';
    statusDiv.style.color = '#f4e4bc';
    inputDiv.style.display = 'none';
    input.value = '';
    
    // 重新启用所有角色的选择
    game.updateCharacterSelectionUI();
}

function confirmCharacter(characterId) {
    if (!game) return;
    
    const characterState = game.characterStates[characterId];
    const characterSlot = document.getElementById(`character-${characterId}`);
    const input = characterSlot.querySelector('input');
    
    const playerName = input.value.trim();
    if (!playerName) {
        alert('请输入角色名字！');
        return;
    }
    
    // 播放确认音效
    game.soundManager.play('buy');
    
    // 保存玩家信息
    characterState.ready = true;
    characterState.playerName = playerName;
    
    // 如果在多人房间中，同步到房间
    if (game.roomCode) {
        game.roomStorage.updateRoom(game.roomCode, {
            characterStates: game.characterStates
        });
    }
    
    // 清除当前玩家选择状态（因为已经确认了）
    game.currentPlayerSelection = null;
    
    // 更新UI
    characterSlot.classList.add('ready');
    characterSlot.onclick = null; // 立即移除点击事件
    
    const statusDiv = characterSlot.querySelector('.character-status');
    const inputDiv = characterSlot.querySelector('.character-input');
    
    inputDiv.style.display = 'none';
    statusDiv.style.display = 'block';
    statusDiv.textContent = `${playerName} - 已准备`;
    statusDiv.style.color = '#90ee90';
    
    // 重新启用其他角色的选择（让其他玩家可以选择）
    game.updateCharacterSelectionUI();
    
    // 检查是否可以开始游戏
    game.checkCanStartGame();
}

function startGameFromPreparation() {
    if (!game) return;
    
    // 播放开始音效
    game.soundManager.play('cardReveal');
    
    // 创建选中的玩家
    game.createPlayersFromSelection();
    
    // 切换到商店阶段
    game.currentPhase = 'shop';
    document.getElementById('preparation-phase').style.display = 'none';
    document.getElementById('shop-phase').style.display = 'block';
    
    game.updateDisplay();
}

// 全局函数供HTML调用
function buyItem(type, grade, cost) {
    if (game) {
        return game.buyItem(type, grade, cost);
    }
}

// 调试函数
function debugGame() {
    if (game) {
        game.checkGameState();
    }
}

function forceAllAI() {
    if (game) {
        game.players.filter(p => !p.isHuman && !game.playerChoices[p.id] && p.isAlive && game.playerPositions[p.id] >= 0)
            .forEach(p => game.forceAIChoice(p.id));
    }
}

function startMining() {
    if (game) {
        game.startMining();
    }
}

function makeDisplayChoice(playerId, action, pickaxe = null) {
    if (game) {
        // 播放对应的音效
        if (action === 'retreat') {
            game.soundManager.play('retreat');
        } else if (action === 'mine') {
            game.soundManager.play('mine');
        } else {
            game.soundManager.play('click');
        }
        
        game.playerChoices[playerId] = { action, pickaxe };
        
        // 更新按钮状态
        const buttonsDiv = document.getElementById(`choice-buttons-${playerId}`);
        const statusDiv = document.getElementById(`choice-status-${playerId}`);
        
        if (buttonsDiv) {
            const buttons = buttonsDiv.querySelectorAll('button');
            
            buttons.forEach(button => {
                button.disabled = true;
                button.classList.remove('selected');
            });
            
            // 高亮选中的按钮
            const selectedButton = Array.from(buttons).find(btn => {
                if (action === 'retreat' && btn.textContent.includes('回营地')) return true;
                if (action === 'mine' && btn.textContent.includes(game.getPickaxeName(pickaxe))) return true;
                return false;
            });
            
            if (selectedButton) {
                selectedButton.classList.add('selected');
            }
        }
        
        // 更新状态文本 - 但不显示具体选择
        if (statusDiv) {
            statusDiv.textContent = '已选择';
        }
        
        console.log(`人类玩家选择完成，当前选择数量: ${Object.keys(game.playerChoices).length}`);
        
        // 检查是否所有在矿洞中的玩家都做了选择
        const playersInMine = game.players.filter(p => 
            p.isAlive && game.playerPositions[p.id] >= 0
        );
        
        if (Object.keys(game.playerChoices).length === playersInMine.length) {
            console.log('所有玩家都完成了选择，开始公布结果');
            setTimeout(() => {
                game.revealAllChoicesAndProcess();
            }, 1000);
        } else {
            // 让所有未选择且仍在矿洞中的AI做选择
            const unselectedAI = game.players.filter(p => 
                !p.isHuman && 
                !game.playerChoices[p.id] && 
                p.isAlive && 
                game.playerPositions[p.id] >= 0
            );
            console.log(`需要选择的AI数量: ${unselectedAI.length}`);
            
            unselectedAI.forEach((player, index) => {
                setTimeout(() => {
                    game.aiMakeDisplayChoice(player);
                }, (index + 1) * 800 + Math.random() * 500); // 错开AI选择时间
            });
        }
    }
}

// 旧的结算按钮函数已被新的视觉化结算系统替代

function restartGame() {
    if (game) {
        game.restart();
    }
}
// 重置所有选择
function resetAllSelections() {
    if (!game) return;
    
    if (confirm('确定要重置所有角色选择吗？这将清除所有玩家的准备状态。')) {
        game.soundManager.play('click');
        game.resetPreparationState();
        alert('所有选择已重置，可以重新选择角色了！');
    }
}
// 房间管理函数
function createRoom() {
    if (game) {
        game.createRoom();
    }
}

function joinSpecificRoom(roomCode) {
    if (game) {
        game.joinRoom(roomCode);
    }
}

function refreshRooms() {
    if (game) {
        game.updateRoomsList();
    }
}

function startMultiplayerGame() {
    if (game && game.isHost) {
        game.startMultiplayerGame();
    }
}
// 返回房间选择
function backToRoomSelection() {
    if (game && game.roomCode) {
        // 如果是房主，删除房间
        if (game.isHost) {
            if (confirm('确定要解散房间吗？')) {
                game.roomStorage.deleteRoom(game.roomCode);
                game.leaveRoom();
            }
        } else {
            // 如果是玩家，离开房间
            if (confirm('确定要离开房间吗？')) {
                const room = game.roomStorage.getRoom(game.roomCode);
                if (room) {
                    // 从玩家列表中移除自己
                    room.players = room.players.filter(p => {
                        const playerName = typeof p === 'string' ? p : p.name;
                        return playerName !== game.playerName;
                    });
                    game.roomStorage.setRoom(game.roomCode, room);
                }
                game.leaveRoom();
            }
        }
    }
}
