"use client"

import { useState } from "react"
import { toast } from "sonner"
import { User, Copy, RefreshCw, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"

// 昵称词库
const nicknameWords = {
  gaming: {
    chinese: {
      prefix: [
        "无敌", "战神", "暗影", "狂战", "血煞", "雷霆", "冰封", "烈焰", "幽灵", "狂暴",
        "霸王", "神级", "绝世", "傲天", "龙魂", "虎啸", "鹰眼", "狼牙", "毒刺", "风暴",
        "狂龙", "魔神", "霸气", "嗜血", "神话", "传说", "不朽", "永恒", "极限", "无双",
        "破军", "灭世", "天罚", "地煞", "星辰", "月影", "日光", "火舞", "水灵", "雷鸣",
        "风行", "山岳", "海啸", "电光", "闪电", "飓风", "狂沙", "烈日", "寒冰", "炎魔",
        "冰魄", "雷神", "风神", "火神", "水神", "土神", "光明", "黑暗", "混沌", "秩序",
        "毁灭", "创造", "生命", "死亡", "轮回", "永生", "不灭", "无限", "至尊", "霸主",
        "王者", "帝皇", "君临", "统治", "征服", "无情", "冷血", "热血", "沸腾", "激情",
        "狂热", "冷静", "理智", "疯狂", "癫狂", "嗜杀", "噬魂", "夺命", "屠戮", "猎杀",
        "追猎", "狩猎", "捕食", "掠夺", "抢夺", "称雄", "独尊", "唯我", "无我", "有我",
        "自我", "超我", "逆天", "逆命", "逆世", "逆行", "逆流", "逆风", "逆境", "逆战",
        "逆袭", "逆转", "逆乱", "逆魔", "逆神", "逆圣", "逆仙", "逆佛", "逆道", "逆法",
        "逆武", "逆文", "逆儒", "逆侠", "逆士", "逆将", "逆帅", "逆师", "逆徒", "逆客",
        "逆者", "逆人", "逆世", "逆生", "逆命", "逆死", "逆灭", "逆亡", "逆存", "逆在",
        "傲视", "傲立", "傲然", "孤傲", "高傲", "清傲", "傲雪", "傲霜", "傲风", "傲云",
        "傲雨", "傲雷", "傲电", "傲火", "傲冰", "傲沙", "傲海", "傲山", "傲林", "傲星",
        "傲月", "傲日", "傲天", "傲地", "傲苍", "傲穹", "傲宇", "傲空", "傲虚", "傲玄",
        "傲灵", "傲魂", "傲神", "傲魔", "傲鬼", "傲仙", "傲佛", "傲道", "傲法", "傲武",
        "傲文", "傲儒", "傲侠", "傲士", "傲将", "傲帅", "傲师", "傲徒", "傲客", "傲者",
        "傲人", "傲世", "傲生", "傲命", "傲死", "傲灭", "傲亡", "傲存", "傲在"
      ],
      middle: [
        "之", "的", "与", "和", "与", "对", "为", "已", "所", "因",
        "乃", "即", "亦", "也", "兮", "焉", "哉", "矣", "耶", "欤",
        "夫", "且", "而", "况", "虽", "若", "如", "尚", "犹", "仍",
        "然", "则", "但", "却", "只", "就", "算", "当", "既", "曾",
        "已", "经", "向", "从", "于", "以", "被", "把", "将", "要",
        "能", "可", "会", "应", "该", "须", "得", "必", "需", "当",
        "做", "行", "往", "来", "去", "至", "到", "在", "于", "与",
        "同", "共", "并", "及", "或", "而", "且", "但", "却", "只"
      ],
      suffix: [
        "王者", "杀手", "刺客", "战士", "枪神", "剑客", "法师", "猎人", "狂人", "之影",
        "统帅", "指挥", "大师", "宗师", "教父", "霸主", "领袖", "之王", "帝君", "主宰",
        "霸者", "至尊", "神话", "传说", "不朽", "永恒", "无双", "绝伦", "无敌", "无上",
        "至高", "无冕", "称霸", "独尊", "独霸", "独断", "独裁", "君王", "帝王", "天子",
        "霸天", "傲世", "傲骨", "傲气", "傲视", "傲立", "傲然", "孤傲", "高傲", "清傲",
        "傲雪", "傲霜", "傲风", "傲云", "傲雨", "傲雷", "傲电", "傲火", "傲冰", "傲沙",
        "傲海", "傲山", "傲林", "傲星", "傲月", "傲日", "傲天", "傲地", "傲苍", "傲穹",
        "傲宇", "傲空", "傲虚", "傲玄", "傲灵", "傲魂", "傲神", "傲魔", "傲鬼", "傲仙",
        "傲佛", "傲道", "傲法", "傲武", "傲文", "傲儒", "傲侠", "傲士", "傲将", "傲帅",
        "傲师", "傲徒", "傲客", "傲者", "傲人", "傲世", "傲生", "傲命", "傲死", "傲灭",
        "傲亡", "傲存", "傲在", "无双", "无对", "无敌", "无上", "无为", "无欲", "无求",
        "无念", "无相", "无形", "无色", "无味", "无声", "无息", "无影", "无踪", "无迹",
        "无痕", "无垢", "无暇", "无瑕", "无缺", "无漏", "无尽", "无穷", "无极", "无限",
        "无边", "无际", "无涯", "无量", "无数", "无计", "无谋", "无策", "无虑", "无忧",
        "无愁", "无烦", "无扰", "无挠", "无惧", "无畏", "无惑", "无疑", "无虞", "无患"
      ]
    },
    english: {
      prefix: [
        "Epic", "Shadow", "Dark", "Toxic", "Pro", "Ninja", "Ghost", "Savage", "Elite", "Sniper",
        "Lethal", "Deadly", "Brutal", "Fierce", "Vicious", "Ruthless", "Merciless", "Relentless", "Unstoppable", "Invincible",
        "Immortal", "Eternal", "Legendary", "Mythic", "Godly", "Divine", "Supreme", "Ultimate", "Extreme", "Radical",
        "Intense", "Furious", "Raging", "Burning", "Blazing", "Flaming", "Frozen", "Icy", "Thundering", "Stormy",
        "Tempest", "Hurricane", "Tornado", "Cyclone", "Tsunami", "Earthquake", "Volcanic", "Meteoric", "Stellar", "Cosmic",
        "Galactic", "Universal", "Dimensional", "Void", "Abyss", "Chaos", "Order", "Balance", "Harmony", "Discord",
        "Anarchy", "Rebellion", "Revolution", "Insurrection", "Uprising", "Resistance", "Defiance", "Dominance", "Supremacy", "Tyranny",
        "Monarchy", "Empire", "Kingdom", "Realm", "Domain", "Territory", "Frontier", "Horizon", "Infinity", "Eternity",
        "Oblivion", "Extinction", "Annihilation", "Destruction", "Creation", "Genesis", "Origin", "Source", "Essence", "Core",
        "Heart", "Soul", "Spirit", "Mind", "Will", "Determination", "Resolve", "Courage", "Valor", "Honor",
        "Glory", "Pride", "Dignity", "Respect", "Reverence", "Worship", "Adoration", "Devotion", "Loyalty", "Fidelity",
        "Treachery", "Betrayal", "Deception", "Illusion", "Reality", "Truth", "Lie", "Falsehood", "Deceit", "Trickery",
        "Cunning", "Clever", "Brilliant", "Genius", "Mastermind", "Prodigy", "Savant", "Virtuoso", "Maestro", "Artisan",
        "Craftsman", "Architect", "Engineer", "Inventor", "Creator", "Maker", "Builder", "Founder", "Pioneer", "Trailblazer",
        "Pathfinder", "Explorer", "Adventurer", "Voyager", "Traveler", "Wanderer", "Nomad", "Vagabond", "Drifter", "Rover",
        "Rambler", "Roamer", "Ranger", "Scout", "Spy", "Agent", "Operative", "Mercenary", "Soldier", "Fighter",
        "Brawler", "Pugilist", "Boxer", "Wrestler", "Gladiator", "Combatant", "Duelist", "Fencer", "Swordsman", "Archer",
        "Marksman", "Sharpshooter", "Gunslinger", "Rifleman", "Musketeer", "Cannoneer", "Bombardier", "Grenadier", "Demolitionist", "Sapper",
        "Miner", "Digger", "Excavator", "Archaeologist", "Historian", "Scholar", "Academic", "Intellectual", "Thinker", "Philosopher"
      ],
      middle: [
        "Of", "The", "And", "With", "For", "In", "On", "At", "By", "To",
        "From", "Into", "Onto", "Upon", "Over", "Under", "Above", "Below", "Beyond", "Behind",
        "Before", "After", "During", "Within", "Without", "Through", "Throughout", "Across", "Along", "Around",
        "About", "Against", "Amid", "Among", "Beside", "Besides", "Between", "Betwixt", "Beyond", "But",
        "Concerning", "Despite", "Down", "Except", "Excepting", "Excluding", "Following", "Like", "Near", "Off",
        "Out", "Outside", "Past", "Per", "Plus", "Regarding", "Round", "Since", "Than", "Till",
        "Until", "Up", "Versus", "Via", "Toward", "Towards", "Underneath", "Unlike", "Until", "Unto",
        "Up", "Upon", "Versus", "Via", "With", "Within", "Without", "Worth", "Yet", "So"
      ],
      suffix: [
        "Killer", "Slayer", "Master", "Hunter", "Warrior", "Legend", "Assassin", "Gamer", "King", "Lord",
        "Emperor", "Overlord", "Warlord", "Commander", "General", "Captain", "Chief", "Leader", "Boss", "Champion",
        "Victor", "Conqueror", "Vanquisher", "Destroyer", "Annihilator", "Executioner", "Terminator", "Eliminator", "Eradicator", "Exterminator",
        "Decimator", "Devastator", "Demolisher", "Crusher", "Smasher", "Breaker", "Shatterer", "Wrecker", "Ruiner", "Ravager",
        "Marauder", "Raider", "Pillager", "Plunderer", "Looter", "Thief", "Bandit", "Outlaw", "Renegade", "Rebel",
        "Revolutionary", "Insurgent", "Insurrectionist", "Mutineer", "Dissident", "Heretic", "Apostate", "Blasphemer", "Infidel", "Heathen",
        "Pagan", "Cultist", "Zealot", "Fanatic", "Extremist", "Radical", "Fundamentalist", "Purist", "Perfectionist", "Idealist",
        "Realist", "Pragmatist", "Opportunist", "Strategist", "Tactician", "Mastermind", "Genius", "Prodigy", "Savant", "Virtuoso",
        "Maestro", "Artisan", "Craftsman", "Architect", "Engineer", "Inventor", "Creator", "Maker", "Builder", "Founder",
        "Pioneer", "Trailblazer", "Pathfinder", "Explorer", "Adventurer", "Voyager", "Traveler", "Wanderer", "Nomad", "Vagabond",
        "Drifter", "Rover", "Rambler", "Roamer", "Ranger", "Scout", "Spy", "Agent", "Operative", "Mercenary",
        "Soldier", "Fighter", "Brawler", "Pugilist", "Boxer", "Wrestler", "Gladiator", "Combatant", "Duelist", "Fencer",
        "Swordsman", "Archer", "Marksman", "Sharpshooter", "Gunslinger", "Rifleman", "Musketeer", "Cannoneer", "Bombardier", "Grenadier",
        "Demolitionist", "Sapper", "Miner", "Digger", "Excavator", "Archaeologist", "Historian", "Scholar", "Academic", "Intellectual",
        "Thinker", "Philosopher", "Sage", "Wiseman", "Prophet", "Seer", "Oracle", "Diviner", "Soothsayer", "Fortune-teller",
        "Mystic", "Occultist", "Esoteric", "Arcane", "Magical", "Mystical", "Supernatural", "Paranormal", "Ethereal", "Celestial",
        "Astral", "Cosmic", "Galactic", "Interstellar", "Intergalactic", "Universal", "Multiversal", "Omniversal", "Dimensional", "Interdimensional",
        "Transdimensional", "Extradimensional", "Hyperdimensional", "Ultradimensional", "Megadimensional", "Gigadimensional", "Teradimensional", "Petadimensional", "Exadimensional", "Zettadimensional"
      ]
    }
  },
  literary: {
    chinese: {
      prefix: [
        "清风", "明月", "流云", "落雪", "微雨", "晓风", "夜空", "星辰", "山水", "花间",
        "竹影", "松涛", "梅香", "兰馨", "菊韵", "荷风", "柳絮", "桃花", "杏雨", "梨云",
        "枫叶", "槐荫", "莲心", "菱角", "芙蓉", "牡丹", "茉莉", "紫薇", "丁香", "玫瑰",
        "百合", "水仙", "郁金", "含笑", "栀子", "桂花", "木棉", "石榴", "海棠", "樱花",
        "杜鹃", "紫藤", "凌霄", "月季", "蔷薇", "茶花", "山茶", "芍药", "牵牛", "风信",
        "夜来", "香雪", "雪莲", "雪松", "雪竹", "雪梅", "雪兰", "雪菊", "雪荷", "雪柳",
        "雪桃", "雪杏", "雪梨", "雪枫", "雪槐", "雪莲", "雪菱", "雪芙", "雪牡", "雪茉",
        "雪薇", "雪香", "雪玫", "雪百", "雪仙", "雪金", "雪笑", "雪栀", "雪桂", "雪棉",
        "雪榴", "雪棠", "雪樱", "雪鹃", "雪藤", "雪霄", "雪季", "雪蔷", "雪茶", "雪山",
        "雪芍", "雪牵", "雪信", "雪来", "雪香", "风雪", "月雪", "云雪", "雨雪", "晓雪",
        "夜雪", "星雪", "山雪", "花雪", "竹雪", "松雪", "梅雪", "兰雪", "菊雪", "荷雪",
        "柳雪", "桃雪", "杏雪", "梨雪", "枫雪", "槐雪", "莲雪", "菱雪", "芙雪", "牡雪",
        "茉雪", "薇雪", "香雪", "玫雪", "百雪", "仙雪", "金雪", "笑雪", "栀雪", "桂雪",
        "棉雪", "榴雪", "棠雪", "樱雪", "鹃雪", "藤雪", "霄雪", "季雪", "蔷雪", "茶雪",
        "山雪", "芍雪", "牵雪", "信雪", "来雪", "香雪", "青山", "绿水", "碧空", "翠竹",
        "红叶", "白雪", "黄花", "紫藤", "蓝天", "灰云", "黑夜", "银河", "金星", "铜镜",
        "铁骨", "锡杖", "铅华", "汞波", "钨灯", "锌光", "钴蓝", "镍白", "铂金", "钛辉",
        "春风", "夏雨", "秋月", "冬雪", "朝霞", "暮云", "晨露", "夕阳", "宵月", "昼日",
        "旭日", "夕照", "晓星", "暮霭", "朝雾", "暮霭", "晨曦", "夕晖", "宵灯", "昼影",
        "旭光", "夕烟", "晓雾", "暮色", "朝露", "暮霞", "晨光", "夕辉", "宵色", "昼光"
      ],
      middle: [
        "之", "的", "与", "和", "伴", "随", "携", "共", "同", "依",
        "相", "偕", "俱", "偶", "配", "侣", "侪", "友", "朋", "伙",
        "侣", "侪", "友", "朋", "伙", "侣", "侪", "友", "朋", "伙",
        "侣", "侪", "友", "朋", "伙", "侣", "侪", "友", "朋", "伙",
        "侣", "侪", "友", "朋", "伙", "侣", "侪", "友", "朋", "伙",
        "侣", "侪", "友", "朋", "伙", "侣", "侪", "友", "朋", "伙",
        "侣", "侪", "友", "朋", "伙", "侣", "侪", "友", "朋", "伙"
      ],
      suffix: [
        "清歌", "明镜", "如梦", "似水", "无痕", "有情", "知音", "听雨", "赏雪", "望月",
        "忆秋", "思冬", "念春", "忆夏", "怀古", "思今", "念旧", "忆新", "怀远", "思近",
        "念远", "忆近", "怀人", "思人", "念人", "忆人", "怀情", "思情", "念情", "忆情",
        "怀景", "思景", "念景", "忆景", "怀物", "思物", "念物", "忆物", "怀事", "思事",
        "念事", "忆事", "怀境", "思境", "念境", "忆境", "怀心", "思心", "念心", "忆心",
        "怀意", "思意", "念意", "忆意", "怀志", "思志", "念志", "忆志", "怀愿", "思愿",
        "念愿", "忆愿", "怀梦", "思梦", "念梦", "忆梦", "怀想", "思想", "念想", "忆想",
        "怀念", "思念", "念念", "忆念", "怀忆", "思忆", "念忆", "忆忆", "怀思", "思思",
        "念思", "忆思", "怀怀", "思怀", "念怀", "忆怀", "怀恋", "思恋", "念恋", "忆恋",
        "怀慕", "思慕", "念慕", "忆慕", "怀想", "思想", "念想", "忆想", "怀念", "思念",
        "念念", "忆念", "怀忆", "思忆", "念忆", "忆忆", "怀思", "思思", "念思", "忆思",
        "怀怀", "思怀", "念怀", "忆怀", "怀恋", "思恋", "念恋", "忆恋", "怀慕", "思慕",
        "念慕", "忆慕", "怀想", "思想", "念想", "忆想", "怀念", "思念", "念念", "忆念",
        "怀忆", "思忆", "念忆", "忆忆", "怀思", "思思", "念思", "忆思", "怀怀", "思怀",
        "念怀", "忆怀", "怀恋", "思恋", "念恋", "忆恋", "怀慕", "思慕", "念慕", "忆慕",
        "听风", "观雨", "品茶", "赏花", "闻香", "尝果", "触叶", "感雪", "嗅草", "看云",
        "听雨", "观月", "品酒", "赏景", "闻草", "尝茗", "触水", "感风", "嗅花", "看山",
        "听涛", "观星", "品诗", "赏画", "闻曲", "尝书", "触琴", "感音", "嗅墨", "看水",
        "听泉", "观云", "品文", "赏曲", "闻歌", "尝酒", "触画", "感物", "嗅香", "看花",
        "听松", "观雪", "品画", "赏诗", "闻琴", "尝茶", "触琴", "感景", "嗅墨", "看竹"
      ]
    },
    english: {
      prefix: [
        "Poetic", "Dreamy", "Misty", "Silent", "Gentle", "Autumn", "Spring", "Whisper", "Serene", "Calm",
        "Tranquil", "Peaceful", "Quiet", "Soft", "Tender", "Delicate", "Fragile", "Subtle", "Ethereal", "Celestial",
        "Heavenly", "Divine", "Sacred", "Holy", "Blessed", "Angelic", "Seraphic", "Cherubic", "Arcane", "Mystic",
        "Magical", "Enchanted", "Charmed", "Spellbound", "Bewitched", "Entranced", "Captivated", "Fascinated", "Intrigued", "Curious",
        "Wondering", "Wandering", "Roaming", "Drifting", "Floating", "Soaring", "Flying", "Gliding", "Sailing", "Cruising",
        "Voyaging", "Journeying", "Traveling", "Exploring", "Discovering", "Finding", "Seeking", "Searching", "Questing", "Hunting",
        "Pursuing", "Chasing", "Following", "Trailing", "Tracking", "Tracing", "Shadowing", "Stalking", "Haunting", "Lingering",
        "Remaining", "Staying", "Abiding", "Dwelling", "Residing", "Living", "Existing", "Being", "Becoming", "Growing",
        "Developing", "Evolving", "Changing", "Transforming", "Shifting", "Altering", "Modifying", "Adjusting", "Adapting", "Conforming",
        "Yielding", "Submitting", "Surrendering", "Resigning", "Accepting", "Embracing", "Welcoming", "Greeting", "Meeting", "Encountering",
        "Facing", "Confronting", "Challenging", "Defying", "Resisting", "Opposing", "Fighting", "Battling", "Struggling", "Striving",
        "Endeavoring", "Attempting", "Trying", "Seeking", "Searching", "Questing", "Hunting", "Pursuing", "Chasing", "Following",
        "Trailing", "Tracking", "Tracing", "Shadowing", "Stalking", "Haunting", "Lingering", "Remaining", "Staying", "Abiding",
        "Dwelling", "Residing", "Living", "Existing", "Being", "Becoming", "Growing", "Developing", "Evolving", "Changing",
        "Transforming", "Shifting", "Altering", "Modifying", "Adjusting", "Adapting", "Conforming", "Yielding", "Submitting", "Surrendering",
        "Resigning", "Accepting", "Embracing", "Welcoming", "Greeting", "Meeting", "Encountering", "Facing", "Confronting", "Challenging",
        "Defying", "Resisting", "Opposing", "Fighting", "Battling", "Struggling", "Striving", "Endeavoring", "Attempting", "Trying",
        "Seeking", "Searching", "Questing", "Hunting", "Pursuing", "Chasing", "Following", "Trailing", "Tracking", "Tracing",
        "Shadowing", "Stalking", "Haunting", "Lingering", "Remaining", "Staying", "Abiding", "Dwelling", "Residing", "Living",
        "Existing", "Being", "Becoming", "Growing", "Developing", "Evolving", "Changing", "Transforming", "Shifting", "Altering"
      ],
      middle: [
        "Of", "The", "And", "With", "For", "In", "On", "At", "By", "To",
        "From", "Into", "Onto", "Upon", "Over", "Under", "Above", "Below", "Beyond", "Behind",
        "Before", "After", "During", "Within", "Without", "Through", "Throughout", "Across", "Along", "Around",
        "About", "Against", "Amid", "Among", "Beside", "Besides", "Between", "Betwixt", "Beyond", "But",
        "Concerning", "Despite", "Down", "Except", "Excepting", "Excluding", "Following", "Like", "Near", "Off",
        "Out", "Outside", "Past", "Per", "Plus", "Regarding", "Round", "Since", "Than", "Till",
        "Until", "Up", "Versus", "Via", "Toward", "Towards", "Underneath", "Unlike", "Until", "Unto",
        "Up", "Upon", "Versus", "Via", "With", "Within", "Without", "Worth", "Yet", "So"
      ],
      suffix: [
        "Soul", "Heart", "Mind", "Dream", "Verse", "Poem", "Thought", "Muse", "Spirit", "Essence",
        "Whisper", "Echo", "Sigh", "Breath", "Voice", "Song", "Melody", "Harmony", "Rhythm", "Tune",
        "Ballad", "Sonnet", "Ode", "Elegy", "Lyric", "Rhyme", "Stanza", "Verse", "Canto", "Refrain",
        "Chorus", "Hymn", "Anthem", "Chant", "Mantra", "Prayer", "Blessing", "Invocation", "Incantation", "Spell",
        "Charm", "Enchantment", "Magic", "Wonder", "Marvel", "Miracle", "Mystery", "Secret", "Enigma", "Riddle",
        "Puzzle", "Conundrum", "Question", "Answer", "Solution", "Resolution", "Conclusion", "End", "Finale", "Coda",
        "Epilogue", "Afterword", "Postscript", "Addendum", "Appendix", "Supplement", "Addition", "Extension", "Expansion", "Enlargement",
        "Growth", "Development", "Evolution", "Progress", "Advancement", "Improvement", "Enhancement", "Refinement", "Perfection", "Ideal",
        "Utopia", "Paradise", "Heaven", "Nirvana", "Elysium", "Valhalla", "Eden", "Arcadia", "Shangri-La", "Xanadu",
        "Atlantis", "Avalon", "Camelot", "Olympus", "Asgard", "Zion", "Canaan", "Promised Land", "Kingdom", "Realm",
        "Domain", "Territory", "Land", "Country", "Nation", "State", "Province", "Region", "Area", "Zone",
        "Space", "Place", "Location", "Position", "Spot", "Site", "Venue", "Scene", "Setting", "Backdrop",
        "Background", "Foreground", "Middleground", "Horizon", "Skyline", "Landscape", "Seascape", "Cityscape", "Portrait", "Still Life",
        "Abstract", "Impressionist", "Expressionist", "Surrealist", "Cubist", "Dadaist", "Minimalist", "Maximalist", "Realist", "Naturalist",
        "Romanticist", "Classicist", "Neoclassicist", "Baroque", "Rococo", "Gothic", "Renaissance", "Enlightenment", "Modernist", "Postmodernist",
        "Contemporary", "Traditional", "Conventional", "Unconventional", "Radical", "Conservative", "Liberal", "Progressive", "Regressive", "Revolutionary",
        "Evolutionary", "Innovative", "Creative", "Imaginative", "Inventive", "Original", "Unique", "Distinct", "Different", "Similar",
        "Same", "Identical", "Equivalent", "Equal", "Unequal", "Inequal", "Disparate", "Diverse", "Varied", "Various",
        "Assorted", "Mixed", "Blended", "Combined", "Merged", "Fused", "Integrated", "Unified", "United", "Divided",
        "Separated", "Split", "Broken", "Fractured", "Shattered", "Fragmented", "Splintered", "Scattered", "Dispersed", "Spread"
      ]
    }
  },
  professional: {
    chinese: {
      prefix: [
        "专业", "精英", "智慧", "卓越", "创新", "思维", "领航", "先锋", "博学", "睿智",
        "高效", "务实", "严谨", "精准", "深度", "广博", "前沿", "尖端", "顶尖", "一流",
        "卓著", "杰出", "非凡", "超群", "绝伦", "无双", "独特", "独到", "独具", "独有",
        "独创", "原创", "创造", "创意", "创新", "创见", "创获", "创优", "创先", "创举",
        "创立", "创建", "创办", "创设", "创制", "创造", "创作", "创导", "创引", "创启",
        "创始", "创基", "创元", "创源", "创本", "创根", "创底", "创初", "创端", "创首",
        "精深", "精湛", "精良", "精妙", "精巧", "精细", "精密", "精确", "精准", "精当",
        "精到", "精微", "精审", "精研", "精思", "精察", "精辨", "精鉴", "精识", "精明",
        "精悟", "精晓", "精通", "精擅", "精专", "精工", "精制", "精造", "精雕", "精琢",
        "精刻", "精镂", "精磨", "精炼", "精煅", "精锻", "精锤", "精打", "精铸", "精塑",
        "精化", "精纯", "精粹", "精萃", "精华", "精英", "精锐", "精干", "精练", "精强",
        "精健", "精壮", "精悍", "精猛", "精勇", "精武", "精技", "精艺", "精能", "精巧",
        "精妙", "精绝", "精绮", "精美", "精良", "精优", "精品", "精选", "精萃", "精粹",
        "精华", "精髓", "精义", "精理", "精谛", "精奥", "精微", "精妙", "精深", "精邃",
        "精湛", "精熟", "精专", "精擅", "精明", "精辟", "精当", "精准", "精确", "精密",
        "精细", "精巧", "精致", "精工", "精美", "精良", "精优", "精品", "精选", "精萃",
        "精粹", "精华", "精髓", "精义", "精理", "精谛", "精奥", "精微", "精妙", "精深",
        "精邃", "精湛", "精熟", "精专", "精擅", "精明", "精辟", "精当", "精准", "精确",
        "精密", "精细", "精巧", "精致", "精工", "精美", "精良", "精优", "精品", "精选",
        "精萃", "精粹", "精华", "精髓", "精义", "精理", "精谛", "精奥", "精微", "精妙"
      ],
      middle: [
        "之", "的", "与", "和", "为", "是", "乃", "即", "亦", "也",
        "所", "以", "而", "且", "则", "因", "故", "致", "使", "令",
        "让", "得", "能", "可", "堪", "足", "够", "当", "应", "该",
        "宜", "须", "需", "要", "必", "定", "然", "确", "实", "真",
        "诚", "信", "实", "在", "焉", "兮", "矣", "耶", "哉", "夫",
        "且", "乎", "也", "耳", "尔", "已", "矣", "焉", "哉", "夫",
        "且", "乎", "也", "耳", "尔", "已", "矣", "焉", "哉", "夫",
        "且", "乎", "也", "耳", "尔", "已", "矣", "焉", "哉", "夫"
      ],
      suffix: [
        "顾问", "专家", "达人", "精英", "领袖", "先驱", "大师", "智者", "思想家", "创造者",
        "学者", "教授", "博士", "硕士", "学士", "研究员", "工程师", "设计师", "建筑师", "规划师",
        "策划师", "咨询师", "分析师", "评估师", "审计师", "会计师", "律师", "法官", "检察官", "辩护人",
        "医师", "医生", "药师", "护士", "治疗师", "康复师", "营养师", "健康师", "保健师", "美容师",
        "美发师", "造型师", "形象师", "时尚师", "服装师", "珠宝师", "配饰师", "化妆师", "摄影师", "导演",
        "编剧", "制片人", "演员", "歌手", "舞者", "音乐家", "艺术家", "画家", "雕塑家", "陶艺家",
        "书法家", "诗人", "作家", "小说家", "散文家", "评论家", "批评家", "理论家", "哲学家", "思想家",
        "科学家", "物理学家", "化学家", "生物学家", "地质学家", "天文学家", "数学家", "统计学家", "计算机科学家", "信息学家",
        "经济学家", "社会学家", "心理学家", "人类学家", "考古学家", "历史学家", "政治学家", "法学家", "教育学家", "语言学家",
        "翻译家", "口译员", "笔译员", "编辑", "记者", "主持人", "播音员", "解说员", "评论员", "主播",
        "讲师", "教师", "导师", "教练", "指导员", "辅导员", "培训师", "讲师", "演讲者", "演说家",
        "口才家", "辩论家", "说服者", "宣传者", "推广者", "营销者", "销售员", "业务员", "客服", "顾问",
        "咨询师", "策划师", "企划师", "设计师", "美工", "程序员", "开发者", "工程师", "技术员", "维修师",
        "维护员", "管理员", "经理", "主管", "总监", "总裁", "董事", "执行官", "首席", "领导",
        "带头人", "开拓者", "创业者", "投资人", "理财师", "财务师", "金融师", "银行家", "保险师", "证券师",
        "基金经理", "投资顾问", "理财顾问", "财富管理师", "资产管理师", "财产规划师", "税务师", "报税员", "核算员", "出纳",
        "会计", "审计", "监察", "督导", "检查员", "质检员", "品控师", "标准化工程师", "认证师", "评估师",
        "鉴定师", "鉴赏家", "收藏家", "古董商", "拍卖师", "估价师", "评价师", "测评师", "测试员", "实验员",
        "研究员", "调查员", "观察员", "记录员", "统计员", "分析员", "规划师", "设计师", "建模师", "制图师",
        "绘图员", "制版师", "排版师", "印刷师", "装订师", "包装师", "产品经理", "项目经理", "工程总监", "技术总监"
      ]
    },
    english: {
      prefix: [
        "Pro", "Expert", "Smart", "Brilliant", "Tech", "Digital", "Logical", "Creative", "Strategic", "Innovative",
        "Advanced", "Analytical", "Certified", "Competent", "Comprehensive", "Conceptual", "Consulting", "Corporate", "Critical", "Decisive",
        "Dedicated", "Diligent", "Dynamic", "Educated", "Effective", "Efficient", "Eloquent", "Emerging", "Eminent", "Empirical",
        "Enterprising", "Enthusiastic", "Entrepreneurial", "Established", "Esteemed", "Ethical", "Exceptional", "Executive", "Exemplary", "Experienced",
        "Focused", "Formidable", "Forward", "Foundational", "Functional", "Fundamental", "Futuristic", "Global", "Groundbreaking", "Growth",
        "Guiding", "Harmonious", "Holistic", "Honorable", "Illuminating", "Imaginative", "Impactful", "Imperative", "Impressive", "Improving",
        "Incisive", "Inclusive", "Incredible", "Independent", "Influential", "Informative", "Ingenious", "Insightful", "Inspirational", "Instructive",
        "Integral", "Intellectual", "Intelligent", "Interdisciplinary", "International", "Intuitive", "Inventive", "Investigative", "Judicious", "Knowledgeable",
        "Leading", "Learned", "Legitimate", "Licensed", "Limitless", "Logical", "Loyal", "Lucrative", "Magnetic", "Mainstream",
        "Managerial", "Masterful", "Meaningful", "Measured", "Mechanical", "Meticulous", "Mindful", "Modernized", "Momentous", "Motivated",
        "Multifaceted", "Multilingual", "Multinational", "Multitalented", "Navigational", "Negotiating", "Networking", "Neutral", "Notable", "Noteworthy",
        "Nurturing", "Objective", "Observant", "Operational", "Opportunistic", "Optimal", "Optimistic", "Orchestrating", "Organic", "Organizational",
        "Original", "Outstanding", "Paramount", "Passionate", "Pathfinding", "Patient", "Perceptive", "Perfect", "Performing", "Persistent",
        "Personable", "Persuasive", "Philanthropic", "Philosophical", "Pioneering", "Pivotal", "Planned", "Positive", "Powerful", "Practical",
        "Pragmatic", "Precise", "Predictive", "Preeminent", "Premium", "Prepared", "Prescient", "Presentable", "Presidential", "Prestigious",
        "Principled", "Proactive", "Procedural", "Process", "Productive", "Professional", "Proficient", "Profound", "Progressive", "Prolific",
        "Prominent", "Promising", "Promotional", "Prospective", "Prosperous", "Protective", "Proven", "Prudent", "Punctual", "Purposeful",
        "Qualified", "Quality", "Quantitative", "Questioning", "Quick", "Quintessential", "Radical", "Rational", "Realistic", "Reasonable",
        "Receptive", "Recommended", "Reconciling", "Refined", "Reflective", "Reformative", "Refreshing", "Regenerative", "Regulatory", "Rehabilitative",
        "Reliable", "Remarkable", "Renowned", "Reputable", "Resilient", "Resolute", "Resourceful", "Respected", "Responsive", "Restorative"
      ],
      middle: [
        "Of", "The", "And", "With", "For", "In", "On", "At", "By", "To",
        "About", "Above", "Across", "After", "Against", "Along", "Amid", "Among", "Around", "As",
        "Before", "Behind", "Below", "Beneath", "Beside", "Between", "Beyond", "But", "Concerning", "Despite",
        "Down", "During", "Except", "For", "From", "Inside", "Into", "Like", "Near", "Of",
        "Off", "On", "Onto", "Out", "Outside", "Over", "Past", "Per", "Plus", "Since",
        "Than", "Through", "Throughout", "Till", "To", "Toward", "Towards", "Under", "Underneath", "Until",
        "Unto", "Up", "Upon", "Versus", "Via", "With", "Within", "Without", "Worth", "Yet",
        "So", "Such", "That", "Then", "Therefore", "Though", "Thus", "Unless", "Until", "When"
      ],
      suffix: [
        "Expert", "Advisor", "Specialist", "Professional", "Consultant", "Guru", "Master", "Leader", "Mentor", "Genius",
        "Achiever", "Advocate", "Analyst", "Architect", "Associate", "Authority", "Catalyst", "Champion", "Coach", "Collaborator",
        "Communicator", "Conductor", "Connector", "Contributor", "Coordinator", "Creator", "Designer", "Developer", "Director", "Educator",
        "Engineer", "Entrepreneur", "Evangelist", "Executive", "Explorer", "Facilitator", "Founder", "Guide", "Influencer", "Innovator",
        "Inspector", "Instructor", "Interpreter", "Investigator", "Investor", "Manager", "Mediator", "Navigator", "Negotiator", "Observer",
        "Officer", "Organizer", "Partner", "Pathfinder", "Performer", "Pioneer", "Planner", "Practitioner", "Presenter", "Principal",
        "Producer", "Professor", "Programmer", "Promoter", "Provider", "Publisher", "Researcher", "Scholar", "Scientist", "Strategist",
        "Supervisor", "Supporter", "Surveyor", "Teacher", "Technician", "Technologist", "Thinker", "Trainer", "Translator", "Treasurer",
        "Trustee", "Tutor", "Validator", "Veteran", "Visionary", "Writer", "Accountant", "Administrator", "Agent", "Ambassador",
        "Appraiser", "Arbitrator", "Assessor", "Assistant", "Auditor", "Banker", "Broker", "Builder", "Buyer", "Caretaker",
        "Carrier", "Cashier", "Chairperson", "Chancellor", "Chemist", "Chief", "Clerk", "Commissioner", "Comptroller", "Conductor",
        "Contractor", "Controller", "Counselor", "Curator", "Custodian", "Dealer", "Dean", "Delegate", "Demonstrator", "Deputy",
        "Dietitian", "Diplomat", "Dispatcher", "Distributor", "Doctor", "Economist", "Editor", "Electrician", "Emissary", "Employer",
        "Enforcer", "Estimator", "Examiner", "Executor", "Expeditor", "Fabricator", "Farmer", "Financier", "Firefighter", "Foreman",
        "Gardener", "Geologist", "Governor", "Grader", "Handler", "Healer", "Historian", "Host", "Housekeeper", "Illustrator",
        "Importer", "Inspector", "Installer", "Interviewer", "Inventor", "Investigator", "Judge", "Laborer", "Lawyer", "Lecturer",
        "Librarian", "Lieutenant", "Machinist", "Magistrate", "Maintainer", "Maker", "Manufacturer", "Marketer", "Mechanic", "Mediator",
        "Merchant", "Messenger", "Minister", "Monitor", "Musician", "Narrator", "Naturalist", "Navigator", "Negotiator", "Notary",
        "Nurse", "Nutritionist", "Operator", "Optician", "Orchestrator", "Organizer", "Owner", "Painter", "Paralegal", "Paramedic",
        "Parliamentarian", "Pathologist", "Patroller", "Patron", "Peddler", "Performer", "Pharmacist", "Photographer", "Physician", "Physicist"
      ]
    }
  },
  cute: {
    chinese: {
      prefix: [
        "甜心", "可爱", "萌萌", "软糯", "暖暖", "糖果", "奶油", "蜜糖", "小小", "粉粉",
        "软软", "甜甜", "萌宝", "乖乖", "呆呆", "萌萌", "糯糯", "暖暖", "甜蜜", "可可",
        "奶萌", "萌咩", "萌兔", "萌喵", "萌汪", "萌鸭", "萌鹅", "萌猪", "萌羊", "萌鸡",
        "奶茶", "布丁", "果冻", "棉花", "棒棒", "泡泡", "星星", "月月", "花花", "草草",
        "雨雨", "云云", "风风", "雪雪", "阳阳", "晴晴", "彩彩", "虹虹", "萌芽", "萌果",
        "萌花", "萌草", "萌树", "萌叶", "萌芊", "萌苗", "萌蕊", "萌蕾", "萌蓓", "萌蓉",
        "萌瑶", "萌璇", "萌玥", "萌月", "萌星", "萌辰", "萌宇", "萌天", "萌空", "萌云",
        "萌雨", "萌风", "萌雪", "萌霜", "萌露", "萌雾", "萌霞", "萌虹", "萌彩", "萌光",
        "萌晶", "萌莹", "萌琳", "萌珊", "萌瑚", "萌贝", "萌珠", "萌玉", "萌琪", "萌琦",
        "萌琴", "萌瑟", "萌瑷", "萌璐", "萌璋", "萌璇", "萌璃", "萌璨", "萌璎", "萌璇",
        "小兔", "小猫", "小狗", "小鸭", "小鹅", "小猪", "小羊", "小鸡", "小马", "小象",
        "小熊", "小鹿", "小狐", "小狼", "小虎", "小豹", "小龙", "小蛇", "小鱼", "小鸟",
        "小蝶", "小蜂", "小蚁", "小虫", "小蛙", "小龟", "小兔", "小猫", "小狗", "小鸭",
        "小糖", "小饼", "小糕", "小面", "小包", "小粥", "小汤", "小粉", "小米", "小麦",
        "小豆", "小菜", "小瓜", "小果", "小梨", "小桃", "小李", "小杏", "小枣", "小栗",
        "小莓", "小橙", "小柠", "小柚", "小橘", "小柑", "小柿", "小梅", "小莲", "小荷",
        "小菊", "小兰", "小蔷", "小茉", "小茶", "小薄", "小荷", "小莲", "小菊", "小兰",
        "小熊", "小猫", "小狗", "小兔", "小鸭", "小鹅", "小猪", "小羊", "小鸡", "小马",
        "小象", "小鹿", "小狐", "小狼", "小虎", "小豹", "小龙", "小蛇", "小鱼", "小鸟",
        "小蝶", "小蜂", "小蚁", "小虫", "小蛙", "小龟", "小星", "小月", "小日", "小云"
      ],
      middle: [
        "的", "与", "和", "是", "似", "若", "如", "般", "样", "般",
        "家", "宝", "贝", "儿", "酱", "糖", "心", "蛋", "豆", "包",
        "饼", "糕", "面", "汤", "粥", "米", "麦", "菜", "瓜", "果",
        "梨", "桃", "李", "杏", "枣", "栗", "莓", "橙", "柠", "柚",
        "橘", "柑", "柿", "梅", "莲", "荷", "菊", "兰", "蔷", "茉",
        "茶", "薄", "荷", "莲", "菊", "兰", "熊", "猫", "狗", "兔",
        "鸭", "鹅", "猪", "羊", "鸡", "马", "象", "鹿", "狐", "狼",
        "虎", "豹", "龙", "蛇", "鱼", "鸟", "蝶", "蜂", "蚁", "虫"
      ],
      suffix: [
        "宝贝", "公主", "王子", "天使", "精灵", "仙子", "宝宝", "娃娃", "小主", "小咪",
        "小可", "小萌", "小甜", "小乖", "小呆", "小软", "小糯", "小暖", "小蜜", "小糖",
        "小奶", "小布", "小果", "小棉", "小棒", "小泡", "小星", "小月", "小花", "小草",
        "小雨", "小云", "小风", "小雪", "小阳", "小晴", "小彩", "小虹", "小芽", "小果",
        "小花", "小草", "小树", "小叶", "小芊", "小苗", "小蕊", "小蕾", "小蓓", "小蓉",
        "小瑶", "小璇", "小玥", "小月", "小星", "小辰", "小宇", "小天", "小空", "小云",
        "小雨", "小风", "小雪", "小霜", "小露", "小雾", "小霞", "小虹", "小彩", "小光",
        "小晶", "小莹", "小琳", "小珊", "小瑚", "小贝", "小珠", "小玉", "小琪", "小琦",
        "小琴", "小瑟", "小瑷", "小璐", "小璋", "小璇", "小璃", "小璨", "小璎", "小璇",
        "小兔", "小猫", "小狗", "小鸭", "小鹅", "小猪", "小羊", "小鸡", "小马", "小象",
        "小熊", "小鹿", "小狐", "小狼", "小虎", "小豹", "小龙", "小蛇", "小鱼", "小鸟",
        "小蝶", "小蜂", "小蚁", "小虫", "小蛙", "小龟", "小兔", "小猫", "小狗", "小鸭",
        "小糖", "小饼", "小糕", "小面", "小包", "小粥", "小汤", "小粉", "小米", "小麦",
        "小豆", "小菜", "小瓜", "小果", "小梨", "小桃", "小李", "小杏", "小枣", "小栗",
        "小莓", "小橙", "小柠", "小柚", "小橘", "小柑", "小柿", "小梅", "小莲", "小荷",
        "小菊", "小兰", "小蔷", "小茉", "小茶", "小薄", "小荷", "小莲", "小菊", "小兰",
        "小熊", "小猫", "小狗", "小兔", "小鸭", "小鹅", "小猪", "小羊", "小鸡", "小马",
        "小象", "小鹿", "小狐", "小狼", "小虎", "小豹", "小龙", "小蛇", "小鱼", "小鸟",
        "小蝶", "小蜂", "小蚁", "小虫", "小蛙", "小龟", "小星", "小月", "小日", "小云",
        "宝宝", "贝贝", "囡囡", "娃娃", "仔仔", "妹妹", "弟弟", "童童", "萌萌", "甜甜"
      ]
    },
    english: {
      prefix: [
        "Cute", "Sweet", "Fluffy", "Tiny", "Little", "Cuddly", "Bubbly", "Cozy", "Fuzzy", "Lovely",
        "Adorable", "Precious", "Darling", "Sweety", "Cuddly", "Fluffy", "Fuzzy", "Puffy", "Snuggly", "Huggable",
        "Lovable", "Kissable", "Squeezable", "Pinchable", "Pattable", "Ticklish", "Giggly", "Smiley", "Cheerful", "Joyful",
        "Happy", "Merry", "Jolly", "Bouncy", "Bubbly", "Sparkly", "Shiny", "Glittery", "Twinkly", "Starry",
        "Moony", "Sunny", "Cloudy", "Rainy", "Snowy", "Windy", "Stormy", "Rainbow", "Colorful", "Bright",
        "Crystal", "Pearl", "Diamond", "Ruby", "Sapphire", "Emerald", "Topaz", "Amethyst", "Opal", "Garnet",
        "Kitty", "Puppy", "Bunny", "Ducky", "Piggy", "Lamby", "Chicky", "Pony", "Teddy", "Foxy",
        "Wolfy", "Tiger", "Panther", "Dragon", "Snake", "Fishy", "Birdy", "Butterfly", "Bee", "Ant",
        "Bug", "Froggy", "Turtle", "Candy", "Cookie", "Cake", "Bread", "Bun", "Porridge", "Soup",
        "Noodle", "Rice", "Wheat", "Bean", "Veggie", "Melon", "Fruit", "Pear", "Peach", "Plum",
        "Cherry", "Date", "Chestnut", "Berry", "Orange", "Lemon", "Grapefruit", "Tangerine", "Citrus", "Persimmon",
        "Plum", "Lotus", "Lily", "Chrysanthemum", "Orchid", "Rose", "Jasmine", "Tea", "Mint", "Lotus",
        "Lily", "Chrysanthemum", "Orchid", "Bear", "Cat", "Dog", "Rabbit", "Duck", "Goose", "Pig",
        "Sheep", "Chicken", "Horse", "Elephant", "Deer", "Fox", "Wolf", "Tiger", "Leopard", "Dragon",
        "Snake", "Fish", "Bird", "Butterfly", "Bee", "Ant", "Bug", "Frog", "Turtle", "Star",
        "Moon", "Sun", "Cloud", "Rain", "Snow", "Wind", "Storm", "Rainbow", "Color", "Light",
        "Crystal", "Pearl", "Diamond", "Ruby", "Sapphire", "Emerald", "Topaz", "Amethyst", "Opal", "Garnet",
        "Kitty", "Puppy", "Bunny", "Ducky", "Piggy", "Lamby", "Chicky", "Pony", "Teddy", "Foxy",
        "Wolfy", "Tiger", "Panther", "Dragon", "Snake", "Fishy", "Birdy", "Butterfly", "Bee", "Ant",
        "Bug", "Froggy", "Turtle", "Star", "Moon", "Sun", "Cloud", "Rain", "Snow", "Wind"
      ],
      middle: [
        "And", "With", "Like", "As", "Of", "In", "On", "By", "For", "To",
        "Little", "Baby", "Sweet", "Cute", "Lovely", "Tiny", "Mini", "Small", "Petite", "Wee",
        "Teeny", "Weeny", "Itty", "Bitty", "Dinky", "Dainty", "Darling", "Dear", "Precious", "Pretty",
        "Pretty", "Lovely", "Beautiful", "Charming", "Delightful", "Wonderful", "Amazing", "Fantastic", "Fabulous", "Marvelous",
        "Splendid", "Superb", "Excellent", "Perfect", "Ideal", "Supreme", "Ultimate", "Absolute", "Complete", "Total",
        "Full", "Whole", "Entire", "All", "Every", "Each", "Any", "Some", "Few", "Many",
        "Much", "More", "Most", "Least", "Less", "Fewer", "Several", "Various", "Different", "Diverse",
        "Distinct", "Unique", "Special", "Particular", "Specific", "Certain", "Sure", "Definite", "Fixed", "Set"
      ],
      suffix: [
        "Baby", "Princess", "Prince", "Angel", "Fairy", "Spirit", "Doll", "Darling", "Dear", "Love",
        "Heart", "Star", "Moon", "Sun", "Cloud", "Rain", "Snow", "Wind", "Storm", "Rainbow",
        "Color", "Light", "Crystal", "Pearl", "Diamond", "Ruby", "Sapphire", "Emerald", "Topaz", "Amethyst",
        "Opal", "Garnet", "Kitty", "Puppy", "Bunny", "Ducky", "Piggy", "Lamby", "Chicky", "Pony",
        "Teddy", "Foxy", "Wolfy", "Tiger", "Panther", "Dragon", "Snake", "Fishy", "Birdy", "Butterfly",
        "Bee", "Ant", "Bug", "Froggy", "Turtle", "Candy", "Cookie", "Cake", "Bread", "Bun",
        "Porridge", "Soup", "Noodle", "Rice", "Wheat", "Bean", "Veggie", "Melon", "Fruit", "Pear",
        "Peach", "Plum", "Cherry", "Date", "Chestnut", "Berry", "Orange", "Lemon", "Grapefruit", "Tangerine",
        "Citrus", "Persimmon", "Plum", "Lotus", "Lily", "Chrysanthemum", "Orchid", "Rose", "Jasmine", "Tea",
        "Mint", "Lotus", "Lily", "Chrysanthemum", "Orchid", "Bear", "Cat", "Dog", "Rabbit", "Duck",
        "Goose", "Pig", "Sheep", "Chicken", "Horse", "Elephant", "Deer", "Fox", "Wolf", "Tiger",
        "Leopard", "Dragon", "Snake", "Fish", "Bird", "Butterfly", "Bee", "Ant", "Bug", "Frog",
        "Turtle", "Star", "Moon", "Sun", "Cloud", "Rain", "Snow", "Wind", "Storm", "Rainbow",
        "Color", "Light", "Crystal", "Pearl", "Diamond", "Ruby", "Sapphire", "Emerald", "Topaz", "Amethyst",
        "Opal", "Garnet", "Kitty", "Puppy", "Bunny", "Ducky", "Piggy", "Lamby", "Chicky", "Pony",
        "Teddy", "Foxy", "Wolfy", "Tiger", "Panther", "Dragon", "Snake", "Fishy", "Birdy", "Butterfly",
        "Bee", "Ant", "Bug", "Froggy", "Turtle", "Star", "Moon", "Sun", "Cloud", "Rain",
        "Snow", "Wind", "Storm", "Rainbow", "Color", "Light", "Crystal", "Pearl", "Diamond", "Ruby",
        "Sapphire", "Emerald", "Topaz", "Amethyst", "Opal", "Garnet", "Baby", "Darling", "Dear", "Love",
        "Sweetheart", "Sweetie", "Honey", "Sugar", "Angel", "Fairy", "Spirit", "Doll", "Princess", "Prince"
      ]
    }
  },
  alternative: {
    chinese: {
      prefix: [
        "丗丗", "氺氺", "灬灬", "冖冖", "彡彡", "丶丶", "乀乀", "乁乁", "乛乛", "乚乚",
        "꧁༺", "༺༽", "ღ", "❦", "❧", "❀", "❁", "❃", "❈", "❉",
        "❋", "❆", "❅", "❄", "❃", "❂", "❁", "❀", "✿", "✾",
        "✽", "✼", "✻", "✺", "✹", "✸", "✷", "✶", "✵", "✴",
        "✳", "✲", "✱", "✰", "✯", "✮", "✭", "✬", "✫", "✪",
        "✩", "✧", "✦", "✥", "✤", "✣", "✢", "✡", "✠", "✟",
        "淼", "焱", "垚", "犇", "骉", "羴", "猋", "麤", "龘", "厵",
        "靐", "龗", "龖", "龕", "龔", "龓", "龒", "龑", "龐", "龏",
        "龎", "龍", "龌", "龋", "龊", "龉", "龈", "龇", "龆", "龅",
        "龄", "龃", "龂", "龁", "龀", "齾", "齽", "齼", "齻", "齺",
        "★·.", "▁▂▃▅", "◤◥", "◣◢", "▫▪", "□■", "△▲", "▽▼", "◇◆", "○●",
        "◐◑", "◒◓", "◔◕", "☉", "⊙", "⊕", "⊗", "◎", "☆★", "♠♣",
        "♥♦", "♤♧", "♡♢", "♂♀", "☄", "☊☋", "☌☍", "☎☏", "☐☑", "☒☓",
        "☔☕", "☖☗", "☘☙", "☚☛", "☜☝", "☞☟", "☠☡", "☢☣", "☤☥", "☦☧",
        "╭⌒╮", "╰⌒╯", "╭★╮", "╰★╯", "╭☆╮", "╰☆╯", "╭♥╮", "╰♥╯", "╭❀╮", "╰❀╯",
        "╭✿╮", "╰✿╯", "╭❁╮", "╰❁╯", "╭❃╮", "╰❃╯", "╭❋╮", "╰❋╯", "╭✾╮", "╰✾╯",
        "╭✽╮", "╰✽╯", "╭✼╮", "╰✼╯", "╭✻╮", "╰✻╯", "╭✺╮", "╰✺╯", "╭✹╮", "╰✹╯",
        "╭✸╮", "╰✸╯", "╭✷╮", "╰✷╯", "╭✶╮", "╰✶╯", "╭✵╮", "╰✵╯", "╭✴╮", "╰✴╯",
        "乡乡", "冘冘", "冫冫", "氵氵", "讠讠", "钅钅", "饣饣", "糹糹", "纟纟", "覀覀",
        "訁訁", "釒釒", "飠飠", "糸糸", "糹糹", "纟纟", "覀覀", "訁訁", "釒釒", "飠飠",
        "糸糸", "糹糹", "纟纟", "覀覀", "訁訁", "釒釒", "飠飠", "糸糸", "糹糹", "纟纟",
        "覀覀", "訁訁", "釒釒", "飠飠", "糸糸", "糹糹", "纟纟", "覀覀", "訁訁", "釒釒"
      ],
      middle: [
        "の", "と", "も", "を", "は", "が", "に", "へ", "で", "や",
        "づ", "ぢ", "ば", "び", "ぶ", "べ", "ぼ", "ぱ", "ぴ", "ぷ",
        "ぺ", "ぽ", "ゃ", "ゅ", "ょ", "っ", "ゎ", "ゐ", "ゑ", "ヮ",
        "ヰ", "ヱ", "ヵ", "ヶ", "ヽ", "ヾ", "ゝ", "ゞ", "〃", "仝",
        "々", "〆", "〇", "ー", "＝", "≠", "≡", "∞", "∴", "∵",
        "♂", "♀", "∈", "∋", "⊆", "⊇", "⊂", "⊃", "∪", "∩",
        "∧", "∨", "¬", "⇒", "⇔", "∀", "∃", "∠", "⊥", "∟",
        "⌒", "∂", "∇", "≪", "≫", "√", "∽", "∝", "∬", "∮",
        "∑", "∏", "∅", "∈", "∉", "∋", "∌", "⊆", "⊈", "⊊"
      ],
      suffix: [
        "灬灬", "冖冖", "彡彡", "丶丶", "乀乀", "乁乁", "乛乛", "乚乚", "丗丗", "氺氺",
        "༻꧂", "༺༽", "ღ", "❦", "❧", "❀", "❁", "❃", "❈", "❉",
        "❋", "❆", "❅", "❄", "❃", "❂", "❁", "❀", "✿", "✾",
        "✽", "✼", "✻", "✺", "✹", "✸", "✷", "✶", "✵", "✴",
        "✳", "✲", "✱", "✰", "✯", "✮", "✭", "✬", "✫", "✪",
        "✩", "✧", "✦", "✥", "✤", "✣", "✢", "✡", "✠", "✟",
        "淼", "焱", "垚", "犇", "骉", "羴", "猋", "麤", "龘", "厵",
        "靐", "龗", "龖", "龕", "龔", "龓", "龒", "龑", "龐", "龏",
        "龎", "龍", "龌", "龋", "龊", "龉", "龈", "龇", "龆", "龅",
        "龄", "龃", "龂", "龁", "龀", "齾", "齽", "齼", "齻", "齺",
        "★·.", "▁▂▃▅", "◤◥", "◣◢", "▫▪", "□■", "△▲", "▽▼", "◇◆", "○●",
        "◐◑", "◒◓", "◔◕", "☉", "⊙", "⊕", "⊗", "◎", "☆★", "♠♣",
        "♥♦", "♤♧", "♡♢", "♂♀", "☄", "☊☋", "☌☍", "☎☏", "☐☑", "☒☓",
        "☔☕", "☖☗", "☘☙", "☚☛", "☜☝", "☞☟", "☠☡", "☢☣", "☤☥", "☦☧",
        "╭⌒╮", "╰⌒╯", "╭★╮", "╰★╯", "╭☆╮", "╰☆╯", "╭♥╮", "╰♥╯", "╭❀╮", "╰❀╯",
        "╭✿╮", "╰✿╯", "╭❁╮", "╰❁╯", "╭❃╮", "╰❃╯", "╭❋╮", "╰❋╯", "╭✾╮", "╰✾╯",
        "╭✽╮", "╰✽╯", "╭✼╮", "╰✼╯", "╭✻╮", "╰✻╯", "╭✺╮", "╰✺╯", "╭✹╮", "╰✹╯",
        "╭✸╮", "╰✸╯", "╭✷╮", "╰✷╯", "╭✶╮", "╰✶╯", "╭✵╮", "╰✵╯", "╭✴╮", "╰✴╯",
        "乡乡", "冘冘", "冫冫", "氵氵", "讠讠", "钅钅", "饣饣", "糹糹", "纟纟", "覀覀",
        "訁訁", "釒釒", "飠飠", "糸糸", "糹糹", "纟纟", "覀覀", "訁訁", "釒釒", "飠飠",
        "糸糸", "糹糹", "纟纟", "覀覀", "訁訁", "釒釒", "飠飠", "糸糸", "糹糹", "纟纟",
        "覀覀", "訁訁", "釒釒", "飠飠", "糸糸", "糹糹", "纟纟", "覀覀", "訁訁", "釒釒"
      ]
    },
    special: [
      // 基础装饰
      (name: string) => `꧁༺${name}༻꧂`,
      (name: string) => `☆${name}☆`,
      (name: string) => `✦${name}✦`,
      (name: string) => `❥${name}❥`,
      (name: string) => `ღ${name}ღ`,
      // 花朵系列
      (name: string) => `❀${name}❀`,
      (name: string) => `✿${name}✿`,
      (name: string) => `❁${name}❁`,
      (name: string) => `❃${name}❃`,
      (name: string) => `❋${name}❋`,
      // 星星系列
      (name: string) => `★·.${name}.·★`,
      (name: string) => `☆⊱${name}⊰☆`,
      (name: string) => `✧${name}✧`,
      (name: string) => `✯${name}✯`,
      (name: string) => `✩${name}✩`,
      // 方框系列
      (name: string) => `【${name}】`,
      (name: string) => `『${name}』`,
      (name: string) => `「${name}」`,
      (name: string) => `〖${name}〗`,
      (name: string) => `《${name}》`,
      // 心形系列
      (name: string) => `♡${name}♡`,
      (name: string) => `❤${name}❤`,
      (name: string) => `♥${name}♥`,
      (name: string) => `❣${name}❣`,
      (name: string) => `♥⌒${name}⌒♥`,
      // 藏文系列
      (name: string) => `࿐${name}࿐`,
      (name: string) => `༺${name}༻`,
      (name: string) => `⊹${name}⊹`,
      (name: string) => `꧁${name}꧂`,
      (name: string) => `༽${name}༼`,
      // 框架系列
      (name: string) => `╭⌒${name}⌒╮`,
      (name: string) => `╰⌒${name}⌒╯`,
      (name: string) => `╭★${name}★╮`,
      (name: string) => `╰☆${name}☆╯`,
      (name: string) => `╭♥${name}♥╮`,
      // 雪花系列
      (name: string) => `❅${name}❅`,
      (name: string) => `❆${name}❆`,
      (name: string) => `❄${name}❄`,
      (name: string) => `❉${name}❉`,
      (name: string) => `❊${name}❊`,
      // 几何系列
      (name: string) => `◇${name}◇`,
      (name: string) => `◆${name}◆`,
      (name: string) => `□${name}□`,
      (name: string) => `■${name}■`,
      (name: string) => `△${name}△`,
      // 组合装饰
      (name: string) => `✿ღ${name}ღ✿`,
      (name: string) => `❀⊱${name}⊰❀`,
      (name: string) => `☆❀${name}❀☆`,
      (name: string) => `❦❧${name}❧❦`,
      (name: string) => `✧⊹${name}⊹✧`,
      // 特殊组合
      (name: string) => `꧁☆${name}☆꧂`,
      (name: string) => `༺❀${name}❀༻`,
      (name: string) => `✦ღ${name}ღ✦`,
      (name: string) => `❥⊱${name}⊰❥`,
      (name: string) => `☆⊹${name}⊹☆`
    ]
  }
};

export function NicknameGenerator() {
  const [nicknameStyle, setNicknameStyle] = useState<string>('gaming')
  const [nicknameLanguage, setNicknameLanguage] = useState<string>('chinese')
  const [nicknameLength, setNicknameLength] = useState<string>('2')
  const [nicknameCount, setNicknameCount] = useState<string>('5')
  const [generatedNicknames, setGeneratedNicknames] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const generateNickname = () => {
    setIsLoading(true);
    
    try {
      const style = nicknameWords[nicknameStyle as keyof typeof nicknameWords];
      const language = style[nicknameLanguage as keyof typeof style];
      
      const count = parseInt(nicknameCount) || 5;
      const limitedCount = Math.min(count, 2000);
      
      const length = parseInt(nicknameLength) || 2;
      
      let newNicknames: string[] = [];
      
      if (nicknameStyle === 'alternative') {
        for (let i = 0; i < limitedCount; i++) {
          let baseName = "";
          
          if (length === 2) {
            const prefixIndex = Math.floor(Math.random() * language.prefix.length);
            const suffixIndex = Math.floor(Math.random() * language.suffix.length);
            baseName = `${language.prefix[prefixIndex]}${language.suffix[suffixIndex]}`;
          } else if (length === 3) {
            const prefixIndex = Math.floor(Math.random() * language.prefix.length);
            const middleIndex = Math.floor(Math.random() * language.middle.length);
            const suffixIndex = Math.floor(Math.random() * language.suffix.length);
            baseName = `${language.prefix[prefixIndex]}${language.middle[middleIndex]}${language.suffix[suffixIndex]}`;
          } else if (length === 4) {
            const prefixIndex1 = Math.floor(Math.random() * language.prefix.length);
            const prefixIndex2 = Math.floor(Math.random() * language.prefix.length);
            const suffixIndex1 = Math.floor(Math.random() * language.suffix.length);
            const suffixIndex2 = Math.floor(Math.random() * language.suffix.length);
            baseName = `${language.prefix[prefixIndex1]}${language.prefix[prefixIndex2]}${language.suffix[suffixIndex1]}${language.suffix[suffixIndex2]}`;
          }
          
          if (nicknameStyle === 'alternative' && Math.random() > 0.5) {
            const specialIndex = Math.floor(Math.random() * nicknameWords.alternative.special.length);
            baseName = nicknameWords.alternative.special[specialIndex](baseName);
          }
          
          newNicknames.push(baseName);
        }
      } else {
        for (let i = 0; i < limitedCount; i++) {
          let nickname = "";
          
          if (length === 2) {
            const prefixIndex = Math.floor(Math.random() * language.prefix.length);
            const suffixIndex = Math.floor(Math.random() * language.suffix.length);
            nickname = `${language.prefix[prefixIndex]}${language.suffix[suffixIndex]}`;
          } else if (length === 3) {
            const prefixIndex = Math.floor(Math.random() * language.prefix.length);
            const middleIndex = Math.floor(Math.random() * language.middle.length);
            const suffixIndex = Math.floor(Math.random() * language.suffix.length);
            nickname = `${language.prefix[prefixIndex]}${language.middle[middleIndex]}${language.suffix[suffixIndex]}`;
          } else if (length === 4) {
            const prefixIndex1 = Math.floor(Math.random() * language.prefix.length);
            const prefixIndex2 = Math.floor(Math.random() * language.prefix.length);
            const suffixIndex1 = Math.floor(Math.random() * language.suffix.length);
            const suffixIndex2 = Math.floor(Math.random() * language.suffix.length);
            nickname = `${language.prefix[prefixIndex1]}${language.prefix[prefixIndex2]}${language.suffix[suffixIndex1]}${language.suffix[suffixIndex2]}`;
          }
          
          newNicknames.push(nickname);
        }
      }
      
      setGeneratedNicknames(newNicknames);
    } catch (error) {
      toast.error("生成昵称失败");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyNickname = (nickname: string) => {
    navigator.clipboard.writeText(nickname);
    toast.success("昵称已复制到剪贴板");
  };
  
  const copyAllNicknames = () => {
    if (generatedNicknames.length === 0) {
      toast.error("没有可复制的昵称");
      return;
    }
    
    const allNicknames = generatedNicknames.join('\n');
    navigator.clipboard.writeText(allNicknames);
    toast.success("所有昵称已复制到剪贴板");
  };
  
  const downloadNicknames = () => {
    if (generatedNicknames.length === 0) {
      toast.error("没有可下载的昵称");
      return;
    }
    
    const allNicknames = generatedNicknames.join('\n');
    const blob = new Blob([allNicknames], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `昵称列表_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    toast.success("昵称列表已下载");
  };

  const renderInputOptions = () => {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">昵称风格</label>
          <select 
            value={nicknameStyle}
            onChange={(e) => setNicknameStyle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="gaming">游戏风格</option>
            <option value="literary">文艺风格</option>
            <option value="professional">专业风格</option>
            <option value="cute">可爱风格</option>
            <option value="alternative">非主流风格</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">语言</label>
          <select 
            value={nicknameLanguage}
            onChange={(e) => setNicknameLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="chinese">中文</option>
            <option value="english">英文</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">昵称长度</label>
          <select 
            value={nicknameLength}
            onChange={(e) => setNicknameLength(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="2">两字昵称</option>
            <option value="3">三字昵称</option>
            <option value="4">四字昵称</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">生成数量 (最多2000个)</label>
          <input
            type="number"
            value={nicknameCount}
            onChange={(e) => setNicknameCount(e.target.value)}
            min="1"
            max="2000"
            placeholder="默认生成5个 (最多2000个)"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
        <Button 
          onClick={generateNickname}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        >
          {isLoading ? "生成中..." : "生成昵称"}
        </Button>
      </div>
    );
  };

  const renderGeneratedContent = () => {
    if (generatedNicknames.length > 0) {
      return (
        <div className="w-full flex flex-col h-full">
          <div className="overflow-y-auto flex-grow space-y-3 pr-2 mb-4">
            {generatedNicknames.map((nickname, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <span className="font-medium">{nickname}</span>
                <Button 
                  onClick={() => copyNickname(nickname)}
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  复制
                </Button>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-auto">
            <Button 
              onClick={generateNickname}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800"
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              重新生成
            </Button>
            
            <Button 
              onClick={copyAllNicknames}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              复制全部
            </Button>
            
            <Button 
              onClick={downloadNicknames}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              下载列表
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="text-center p-4 text-gray-500">
        <User className="w-16 h-16 mx-auto mb-2 opacity-20" />
        <p>点击"生成昵称"按钮开始创建独特的网名</p>
      </div>
    );
  };

  return {
    renderInputOptions,
    renderGeneratedContent
  };
} 