<template>
    <div id="world">
        <div class="world-navigation">
            <div class="navigation-border">
                <div class="navigation selected2" id="forest-button" @click="changeActive(1,1)">森林</div>
            </div>
            <div class="navigation-border">
                <div class="navigation" id="cave-button" @click="changeActive(1,2)">洞穴</div>
            </div>
        </div>
        <div class="line"><div class="line-1"></div><div class="line-2"></div><div class="line-3"></div></div>
        <div class="world-navigation">
            <div class="navigation-border">
                <div class="navigation selected3" id="rule-button" @click="changeActive(2,1)">世界规则</div>
            </div>
            <div class="navigation-border">
                <div class="navigation" id="generate-button" @click="changeActive(2,2)">世界生成</div>
            </div>
        </div>
        <div class="line"><div class="line-1"></div><div class="line-2"></div><div class="line-3"></div></div>
        <div id="world-set-scorllContainer">
            <div class="world-set">
                <div v-for="(group, label) in groupedCards" :key="label" class="world-set">
                    <div class="label">{{ label }}</div>
                    <div v-for="card in group" :key="card.name" class="world-card">
                        <img class="card-icon" :src="'../../public/world/' + card.name + '.png'">
                        <div class="card-message">
                            <div class="card-title">{{ card.name }}</div>
                            <div class="card-value">
                                <select>
                                    <option v-for="(value, key) in card.options" :key="key">{{ key }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="submit-container">
            <div class="submit">保存</div>
        </div>
    </div>
</template>
<script>
import worldCard from './worldCard.vue';
export default {
    name:"world",
    components:{
        worldCard,
    },
    computed:{
        groupedCards() {
            let grouped = {};
            if(this.active_1 == 1 && this.active_2 == 1){
                grouped = {
                    全局: this.cards.slice(0, 13),
                    活动: this.cards.slice(13, 24),
                    冒险家: this.cards.slice(24, 35),
                    世界: this.cards.slice(35, 48),
                    资源再生: this.cards.slice(48, 60),
                    非自然传送门资源: this.cards.slice(60, 66),
                    生物: this.cards.slice(66, 80),
                    敌对生物: this.cards.slice(80, 97),
                    巨兽: this.cards.slice(97, 111),
                };
            }
            else if(this.active_1 == 1 && this.active_2 == 2){
                grouped = {
                    全局: this.cards.slice(111,112),
                    世界: this.cards.slice(112,124),
                    资源: this.cards.slice(124,150),
                    生物以及刷新点: this.cards.slice(150,162),
                    敌对生物以及刷新点: this.cards.slice(162,172),
                }
            }
            else if (this.active_1 ==2 && this.active_2 ==1){
                grouped = {
                    世界: this.cards.slice(172,178),
                    资源再生:this.cards.slice(178,183),
                    生物: this.cards.slice(183,194),
                    敌对生物: this.cards.slice(194,203),
                    巨兽: this.cards.slice(203,208),
                }
            }
            else{
                grouped = {
                    世界: this.cards.slice(208,217),
                    资源: this.cards.slice(217,233),
                    生物以及刷新点: this.cards.slice(233,238),
                    敌对生物以及刷新点: this.cards.slice(238,245),
                }
            }
            return grouped;
        },
    },
    data(){
        return{
            active_1:'1',
            active_2:'1',
            cards:[
                {name_en:'specialevent', name:'活动',value:'aoto',options:{'自动':'auto','不自动':'noauto'}},
                {name_en:'autumn', name:'秋',value:'',options:{'长':'longseason','极长':'verylongseason','随机':'random','短':'shortseason','极短':'veryshortseason','无':'noseason'}},
                {name_en:'winter', name:'冬',value:'',options:{'长':'longseason','极长':'verylongseason','随机':'random','短':'shortseason','极短':'veryshortseason','无':'noseason'}},
                {name_en:'spring', name:'春',value:'',options:{'长':'longseason','极长':'verylongseason','随机':'random','短':'shortseason','极短':'veryshortseason','无':'noseason'}},
                {name_en:'summer', name:'夏',value:'',options:{'长':'longseason','极长':'verylongseason','随机':'random','短':'shortseason','极短':'veryshortseason','无':'noseason'}},
                {name_en:'day', name:'昼夜选项',value:'',options:{'长 白天':'longday','长 黄昏':'longdusk','长 夜晚':'longnight','无 白天':'noday','无 黄昏':'nodusk','无 夜晚':'nonight','仅 白天':'onlyday','仅 黄昏':'onlydusk','仅 夜晚':'onlynight'}},
                {name_en:'spawnmode', name:'出生模式',value:'',options:{'':''}},
                {name_en:'ghostenabled', name:'冒险家死亡',value:'always',options:{'变鬼魂':'always','更换冒险家':'none'}},
                {name_en:'portalresurection', name:'在绚丽之门复活',value:'none',options:{'禁用':'none','启用':'always'}},
                {name_en:'ghostsanitydrain', name:'鬼魂理智值惩罚',value:'always',options:{'启用':'always','禁用':'none'}},
                {name_en:'resettime', name:'死亡重置倒计时',value:'',options:{'禁用':'none','慢':'slow','快':'fast','立刻':'always'}},
                {name_en:'beefaloheat', name:'皮弗娄牛交配频率',value:'',options:{'无':'never','很少':'rare','较多':'often','大量':'always'}},
                {name_en:'krampus', name:'坎普斯',value:'',options:{'':''}},

                {name_en:'crow_carnival', name:'盛夏鸦年华',value:'',options:{'总是':'enable'}},
                {name_en:'hallowed_nights', name:'万圣夜',value:'',options:{'总是':'enable'}},
                {name_en:'winters_feast', name:'冬季盛宴',value:'',options:{'总是':'enable'}},
                {name_en:'year_of_the_gobbler', name:'火鸡之年',value:'',options:{'总是':'enable'}},
                {name_en:'year_of_the_varg', name:'座狼之年',value:'',options:{'总是':'enable'}},
                {name_en:'year_of_the_carrat', name:'胡萝卜鼠之年',value:'',options:{'总是':'enable'}},
                {name_en:'year_of_the_pig', name:'猪王之年',value:'',options:{'总是':'enable'}},
                {name_en:'year_of_the_beefalo', name:'皮弗娄牛之年',value:'',options:{'总是':'enable'}},
                {name_en:'year_of_the_catcoon', name:'浣猫之年',value:'',options:{'总是':'enable'}},
                {name_en:'year_of_the_bunnyman', name:'兔人之年',value:'',options:{'总是':'enable'}},
                {name_en:'year_of_the_dragonfly', name:'龙蝇之年',value:'',options:{'总是':'enable'}},

                {name_en:'extrastartingitems', name:'额外起始资源',value:'default',options:{'第5天后':'5','第10天后':'default','第15天后':'15','第20天后':'20','总是':'0','从不':'none'}},
                {name_en:'seasonalstartingitems', name:'季节起始物品',value:'',options:{'':''}},
                {name_en:'spawnprotection', name:'防骚扰出生保护',value:'',options:{'自动检测':'default','无':'never','总是':'always'}},
                {name_en:'dropeverythingondespawn', name:'离开游戏后物品掉落',value:'',options:{'所有':'always'}},
                {name_en:'healthpenalty', name:'血量上限惩罚',value:'always',options:{'启用':'always'}},
                {name_en:'lessdamagetaken', name:'收到的伤害',value:'none',options:{'默认':'none','较多':'more'}},
                {name_en:'temperaturedamage', name:'温度伤害',value:'',options:{'默认':'default','非致命':'nonlethal'}},
                {name_en:'hunger', name:'饥饿伤害',value:'',options:{'默认':'default','非致命':'nonlethal'}},
                {name_en:'darkness', name:'黑暗伤害',value:'',options:{'默认':'default','非致命':'nonlethal'}},
                {name_en:'shadowcreatures', name:'理智怪兽',value:'',options:{'':''}},
                {name_en:'brightmarecreatures', name:'启蒙怪兽',value:'',options:{'':''}},

                {name_en:'hounds', name:'猎犬袭击',value:'',options:{'':''}},
                {name_en:'winterhounds', name:'冰猎犬群',value:'',options:{'':''}},
                {name_en:'summerhounds', name:'火猎犬群',value:'',options:{'':''}},
                {name_en:'petrification', name:'森林石化',value:'',options:{'无':'none'}},
                {name_en:'meteorshowers', name:'流星频率',value:'',options:{'':''}},
                {name_en:'hunt', name:'狩猎',value:'',options:{'':''}},
                {name_en:'rifts_enabled', name:'荒野裂隙开启',value:'',options:{'':''}},
                {name_en:'rifts_frequency', name:'荒野裂隙频率',value:'',options:{'':''}},
                {name_en:'alternatehunt', name:'追猎惊喜',value:'',options:{'':''}},
                {name_en:'wildfires', name:'野火',value:'',options:{'':''}},
                {name_en:'lightning', name:'闪电',value:'',options:{'':''}},
                {name_en:'weather', name:'雨',value:'',options:{'':''}},
                {name_en:'frograin', name:'青蛙雨',value:'',options:{'':''}},

                {name_en:'carrots_regrowth', name:'胡萝卜',value:'',options:{'':''}},
                {name_en:'cactus_regrowth', name:'仙人掌',value:'',options:{'':''}},
                {name_en:'basicresource_regrowth', name:'基础资源',value:'none',options:{'':''}},
                {name_en:'twiggytrees_regrowth', name:'多枝树',value:'',options:{'':''}},
                {name_en:'saltstack_regrowth', name:'盐堆',value:'',options:{'':''}},
                {name_en:'reeds_regrowth', name:'芦苇',value:'',options:{'':''}},
                {name_en:'palmconetree_regrowth', name:'棕榈松果树',value:'',options:{'':''}},
                {name_en:'moon_tree_regrowth', name:'月树',value:'',options:{'':''}},
                {name_en:'flowers_regrowth', name:'花',value:'',options:{'':''}},
                {name_en:'evergreen_regrowth', name:'常青树',value:'',options:{'':''}},
                {name_en:'deciduoustree_regrowth', name:'桦栗树',value:'',options:{'':''}},
                {name_en:'regrowth', name:'再生速度',value:'',options:{'':''}},

                {name_en:'gnarwail', name:'一角鲸',value:'',options:{'':''}},
                {name_en:'penguins', name:'企鸥',value:'',options:{'':''}},
                {name_en:'bunnymen_setting', name:'兔人',value:'',options:{'':''}},
                {name_en:'rabbits_setting', name:'兔子',value:'',options:{'':''}},
                {name_en:'catcoons', name:'兔人',value:'浣猫',options:{'':''}},
                {name_en:'perd', name:'火鸡',value:'',options:{'':''}},
                {name_en:'pigs_setting', name:'猪',value:'',options:{'':''}},
                {name_en:'grassgekkos', name:'草壁虎转化',value:'',options:{'':''}},
                {name_en:'bees_setting', name:'蜜蜂',value:'',options:{'':''}},
                {name_en:'butterfly', name:'蝴蝶',value:'',options:{'':''}},
                {name_en:'fishschools', name:'鱼群',value:'',options:{'':''}},
                {name_en:'birds', name:'鸟',value:'',options:{'':''}},
                {name_en:'moles_setting', name:'鼹鼠',value:'',options:{'':''}},
                {name_en:'wobsters', name:'龙虾',value:'',options:{'':''}},

                {name_en:'portal_spawnrate', name:'传送频率',value:'',options:{'':''}},
                {name_en:'lightcrab_portalrate', name:'发光蟹',value:'',options:{'':''}},
                {name_en:'palmcone_seed_portalrate', name:'棕榈松果树芽',value:'',options:{'':''}},
                {name_en:'powder_monkey_portalrate', name:'火药猴',value:'',options:{'':''}},
                {name_en:'monkeytail_portalrate', name:'猴尾草',value:'',options:{'':''}},
                {name_en:'bananabush_portalrate', name:'香蕉丛',value:'',options:{'':''}},

                {name_en:'bats_setting', name:'蝙蝠',value:'',options:{'':''}},
                {name_en:'spiders_setting', name:'蜘蛛',value:'',options:{'':''}},
                {name_en:'walrus_setting', name:'海象',value:'',options:{'':''}},
                {name_en:'pirateraids', name:'月亮码头海盗',value:'',options:{'':''}},
                {name_en:'mutated_hounds', name:'恐怖猎犬',value:'',options:{'':''}},
                {name_en:'wasps', name:'杀人蜂',value:'',options:{'':''}},
                {name_en:'penguins_moon', name:'月石企鸥',value:'',options:{'':''}},
                {name_en:'hound_mounds', name:'猎犬',value:'',options:{'':''}},
                {name_en:'moon_spider', name:'破碎蜘蛛',value:'',options:{'':''}},
                {name_en:'mosquitos', name:'蚊子',value:'',options:{'':''}},
                {name_en:'spider_warriors', name:'蜘蛛战士',value:'',options:{'':''}},
                {name_en:'frogs', name:'青蛙',value:'',options:{'':''}},
                {name_en:'merms', name:'鱼人',value:'',options:{'':''}},
                {name_en:'lureplants', name:'食人花',value:'',options:{'':''}},
                {name_en:'cookiecutters', name:'饼干切割机',value:'',options:{'':''}},
                {name_en:'squid', name:'鱿鱼',value:'',options:{'':''}},
                {name_en:'sharks', name:'鲨鱼',value:'',options:{'':''}},

                {name_en:'klaus', name:'克劳斯',value:'',options:{'':''}},
                {name_en:'crabking', name:'帝王蟹',value:'',options:{'':''}},
                {name_en:'eyeofterror', name:'恐怖之眼',value:'',options:{'':''}},
                {name_en:'fruitfly', name:'果蝇王',value:'',options:{'':''}},
                {name_en:'liefs', name:'树精守卫',value:'',options:{'':''}},
                {name_en:'deciduousmonster', name:'毒桦栗树',value:'',options:{'':''}},
                {name_en:'bearger', name:'熊獾',value:'',options:{'':''}},
                {name_en:'deerclops', name:'独眼巨鹿',value:'',options:{'':''}},
                {name_en:'antliontribute', name:'蚁狮贡品',value:'',options:{'':''}},
                {name_en:'beequeen', name:'蜂王',value:'',options:{'':''}},
                {name_en:'spiderqueen', name:'蜘蛛女王',value:'',options:{'':''}},
                {name_en:'malbatross', name:'邪天翁',value:'',options:{'':''}},
                {name_en:'goosemoose', name:'麋鹿鹅',value:'',options:{'':''}},
                {name_en:'dragonfly', name:'龙蝇',value:'',options:{'':''}},

                {name_en:'season_start', name:'起始季节',value:'default',options:{'秋':'default','冬':'winter','春':'spring','夏':'summer'}},

                {name_en:'task_set', name:'生物群落',value:'',options:{'':''}},
                {name_en:'start_location', name:'出生点',value:'',options:{'':''}},
                {name_en:'world_size', name:'世界大小',value:'',options:{'大':'default'}},
                {name_en:'branching', name:'分支',value:'',options:{'':''}},
                {name_en:'loop', name:'环形',value:'',options:{'':''}},
                {name_en:'roads', name:'道路',value:'',options:{'':''}},
                {name_en:'touchstone', name:'试金石',value:'',options:{'':''}},
                {name_en:'boons', name:'失败的冒险家',value:'',options:{'':''}},
                {name_en:'prefabswaps_start', name:'开始资源多样化',value:'',options:{'':''}},
                {name_en:'moon_fissure', name:'天体裂隙',value:'',options:{'':''}},
                {name_en:'terrariumchest', name:'盒中泰拉',value:'',options:{'':''}},
                {name_en:'stageplays', name:'舞台剧',value:'',options:{'':''}},

                {name_en:'cactus', name:'仙人掌',value:'',options:{'':''}},
                {name_en:'ocean_bullkelp', name:'公牛海带茎',value:'',options:{'':''}},
                {name_en:'marshbush', name:'尖刺灌木',value:'',options:{'':''}},
                {name_en:'rock', name:'巨石',value:'',options:{'':''}},
                {name_en:'moon_sapling', name:'月亮树苗',value:'',options:{'':''}},
                {name_en:'moon_rock', name:'月亮石',value:'',options:{'':''}},
                {name_en:'moon_tree', name:'月树',value:'',options:{'':''}},
                {name_en:'sapling', name:'树苗',value:'',options:{'':''}},
                {name_en:'trees', name:'所有树',value:'',options:{'':''}},
                {name_en:'palmconetree', name:'棕榈松果树',value:'',options:{'':''}},
                {name_en:'ponds', name:'池塘',value:'',options:{'':''}},
                {name_en:'meteorspawner', name:'流星区域',value:'',options:{'':''}},
                {name_en:'berrybush', name:'浆果丛',value:'',options:{'':''}},
                {name_en:'moon_bullkelp', name:'海岸公牛海带',value:'',options:{'':''}},
                {name_en:'moon_starfish', name:'海星',value:'',options:{'':''}},
                {name_en:'ocean_seastack', name:'海蚀柱',value:'',options:{'':''}},
                {name_en:'moon_hotspring', name:'温泉',value:'',options:{'':''}},
                {name_en:'flint', name:'燧石',value:'',options:{'':''}},
                {name_en:'moon_berrybush', name:'石果灌木丛',value:'',options:{'':''}},
                {name_en:'carrot', name:'胡萝卜',value:'',options:{'':''}},
                {name_en:'reeds', name:'芦苇',value:'',options:{'':''}},
                {name_en:'flowers', name:'花和邪恶花',value:'',options:{'':''}},
                {name_en:'grass', name:'草',value:'',options:{'':''}},
                {name_en:'mushroom', name:'蘑菇',value:'',options:{'':''}},
                {name_en:'rock_ice', name:'迷你冰川',value:'',options:{'':''}},
                {name_en:'tumbleweed', name:'风滚草',value:'',options:{'':''}},

                {name_en:'lightninggoat', name:'伏特羊',value:'',options:{'':''}},
                {name_en:'rabbits', name:'兔洞',value:'',options:{'':''}},
                {name_en:'moon_fruitdragon', name:'沙拉蝾螈',value:'',options:{'':''}},
                {name_en:'pigs', name:'猪屋',value:'',options:{'':''}},
                {name_en:'beefalo', name:'皮弗娄牛',value:'',options:{'':''}},
                {name_en:'buzzard', name:'秃鹫',value:'',options:{'':''}},
                {name_en:'catcoon', name:'空心树桩',value:'',options:{'':''}},
                {name_en:'moon_carrot', name:'胡萝卜鼠',value:'',options:{'':''}},
                {name_en:'bees', name:'蜜蜂蜂窝',value:'',options:{'':''}},
                {name_en:'ocean_shoal', name:'鱼群',value:'',options:{'':''}},
                {name_en:'moles', name:'鼹鼠丘',value:'',options:{'':''}},
                {name_en:'ocean_wobsterden', name:'龙虾窝',value:'',options:{'':''}},

                {name_en:'chess', name:'发条装置',value:'',options:{'':''}},
                {name_en:'angrybees', name:'杀人蜂蜂窝',value:'',options:{'':''}},
                {name_en:'ocean_waterplant', name:'海草',value:'ocean_default',options:{'':''}},
                {name_en:'walrus', name:'海象营地',value:'',options:{'':''}},
                {name_en:'merm', name:'漏雨的小屋',value:'',options:{'':''}},
                {name_en:'houndmound', name:'猎犬丘',value:'',options:{'':''}},
                {name_en:'moon_spiders', name:'破碎蜘蛛洞',value:'',options:{'':''}},
                {name_en:'spiders', name:'蜘蛛巢',value:'',options:{'':''}},
                {name_en:'tentacles', name:'触手',value:'',options:{'':''}},
                {name_en:'tallbirds', name:'高脚鸟',value:'',options:{'':''}},

                {name_en:'earthquakes', name:'地震',value:'',options:{'':''}},
                {name_en:'wormattacks', name:'洞穴蠕虫攻击',value:'',options:{'':''}},
                {name_en:'rifts_enabled_cave', name:'荒野裂隙开启',value:'',options:{'':''}},
                {name_en:'rifts_frequency_cave', name:'荒野裂隙频率',value:'',options:{'':''}},
                {name_en:'atriumgate', name:'远古大门',value:'',options:{'':''}},
                {name_en:'weather', name:'雨',value:'',options:{'':''}},

                {name_en:'regrowth', name:'再生速度',value:'',options:{'':''}},
                {name_en:'lightflier_flower_regrowth', name:'光虫花',value:'',options:{'':''}},
                {name_en:'mushtree_moon_regrowth', name:'月亮蘑菇树',value:'',options:{'':''}},
                {name_en:'flower_cave_regrowth', name:'荧光花',value:'',options:{'':''}},
                {name_en:'mushtree_regrowth', name:'蘑菇树',value:'',options:{'':''}},

                {name_en:'bunnymen_setting', name:'兔人',value:'',options:{'':''}},
                {name_en:'dustmoths', name:'尘蛾',value:'',options:{'':''}},
                {name_en:'pigs_setting', name:'猪',value:'',options:{'':''}},
                {name_en:'lightfliers', name:'球状光虫',value:'',options:{'':''}},
                {name_en:'rocky_setting', name:'石虾',value:'',options:{'':''}},
                {name_en:'monkey_setting', name:'穴居猴',value:'',options:{'':''}},
                {name_en:'grassgekkos', name:'草壁虎转化',value:'',options:{'':''}},
                {name_en:'slurtles_setting', name:'蛞蝓龟',value:'',options:{'':''}},
                {name_en:'snurtles', name:'蜗牛龟',value:'',options:{'':''}},
                {name_en:'mushgnome', name:'蘑菇地精',value:'',options:{'':''}},
                {name_en:'moles_setting', name:'鼹鼠',value:'',options:{'':''}},

                {name_en:'spider_spitter', name:'喷射蜘蛛',value:'',options:{'':''}},
                {name_en:'spider_hider', name:'洞穴蜘蛛',value:'',options:{'':''}},
                {name_en:'spider_dropper', name:'穴居悬蛛',value:'',options:{'':''}},
                {name_en:'spiders_setting', name:'蜘蛛',value:'',options:{'':''}},
                {name_en:'spider_warriors', name:'蜘蛛战士',value:'',options:{'':''}},
                {name_en:'bats_setting', name:'蝙蝠',value:'',options:{'':''}},
                {name_en:'nightmarecreatures', name:'遗迹梦魇',value:'',options:{'':''}},
                {name_en:'molebats', name:'裸鼹蝠',value:'',options:{'':''}},
                {name_en:'merms', name:'鱼人',value:'',options:{'':''}},

                {name_en:'daywalker', name:'噩梦猪人',value:'',options:{'':''}},
                {name_en:'fruitfly', name:'果蝇王',value:'',options:{'':''}},
                {name_en:'liefs', name:'树精守卫',value:'',options:{'':''}},
                {name_en:'toadstool', name:'毒菌蟾蜍',value:'',options:{'':''}},
                {name_en:'spiderqueen', name:'蜘蛛女王',value:'',options:{'':''}},

                {name_en:'task_set', name:'生物群落',value:'',options:{'':''}},
                {name_en:'start_location', name:'出生点',value:'',options:{'':''}},
                {name_en:'world_size', name:'世界大小',value:'',options:{'大':'default'}},
                {name_en:'branching', name:'分支',value:'',options:{'':''}},
                {name_en:'loop', name:'环形',value:'',options:{'':''}},
                {name_en:'touchstone', name:'试金石',value:'',options:{'':''}},
                {name_en:'boons', name:'失败的冒险家',value:'',options:{'':''}},
                {name_en:'cavelight', name:'洞穴光照',value:'',options:{'':''}},
                {name_en:'prefabswaps_start', name:'开始资源多样化',value:'',options:{'':''}},

                {name_en:'wormlights', name:'发光浆果',value:'',options:{'':''}},
                {name_en:'marshbush', name:'尖刺灌木',value:'',options:{'':''}},
                {name_en:'rock', name:'巨石',value:'',options:{'':''}},
                {name_en:'sapling', name:'树苗',value:'',options:{'':''}},
                {name_en:'trees', name:'所有树',value:'',options:{'':''}},
                {name_en:'cave_ponds', name:'池塘',value:'',options:{'':''}},
                {name_en:'fern', name:'洞穴蕨类',value:'',options:{'':''}},
                {name_en:'berrybush', name:'浆果丛',value:'',options:{'':''}},
                {name_en:'flint', name:'燧石',value:'',options:{'':''}},
                {name_en:'reeds', name:'芦苇',value:'',options:{'':''}},
                {name_en:'lichen', name:'苔藓',value:'',options:{'':''}},
                {name_en:'grass', name:'草',value:'',options:{'':''}},
                {name_en:'flower_cave', name:'荧光花',value:'',options:{'':''}},
                {name_en:'mushroom', name:'蘑菇',value:'',options:{'':''}},
                {name_en:'mushtree', name:'蘑菇树',value:'',options:{'':''}},
                {name_en:'banana', name:'香蕉',value:'',options:{'':''}},

                {name_en:'bunnymen', name:'兔屋',value:'',options:{'':''}},
                {name_en:'slurper', name:'啜食者',value:'',options:{'':''}},
                {name_en:'rocky', name:'石虾',value:'',options:{'':''}},
                {name_en:'monkey', name:'穴居猴桶',value:'',options:{'':''}},
                {name_en:'slurtles', name:'蛞蝓龟窝',value:'',options:{'':''}},

                {name_en:'chess', name:'发条装置',value:'',options:{'':''}},
                {name_en:'fissure', name:'梦魇裂隙',value:'',options:{'':''}},
                {name_en:'worms', name:'洞穴蠕虫',value:'',options:{'':''}},
                {name_en:'cave_spiders', name:'蛛网岩',value:'',options:{'':''}},
                {name_en:'spiders', name:'蜘蛛巢',value:'',options:{'':''}},
                {name_en:'bats', name:'蝙蝠',value:'',options:{'':''}},
                {name_en:'tentacles', name:'触手',value:'',options:{'':''}},

            ],
        }
    },
    methods:{
        changeActive(data,param){
            if(data==1){
                this.active_1 = param
                if(param==1){
                    document.getElementById('forest-button').classList.add('selected2')
                    document.getElementById('cave-button').classList.remove('selected2')
                }
                else{
                    document.getElementById('cave-button').classList.add('selected2')
                    document.getElementById('forest-button').classList.remove('selected2')
                }
            }
            else{
                this.active_2 = param
                if(param==1){
                    document.getElementById('rule-button').classList.add('selected3')
                    document.getElementById('generate-button').classList.remove('selected3')
                }
                else{
                    document.getElementById('generate-button').classList.add('selected3')
                    document.getElementById('rule-button').classList.remove('selected3')
                }
            }
        }
    },
    mounted(){

    }
}
</script>
<style scoped>
#world{
    height: 100%;
    width: 100%;
}
.world-navigation{
    width: calc(100% - 2vw);
    margin: 0 1vw;
    height: 4vh;
    display: flex;
    font-size: 2vh;
}
.navigation{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    background-image: url('../../public/navigation/导航背景1.png'); /* 背景图片路径 */
    background-size: 100% 90%;
    background-repeat: no-repeat;
    background-position: bottom;
    position: absolute;
    left: 0px;
    top: 0;
    z-index: 0;
    justify-content: center;
    color: rgb(200,200,150);
    cursor: pointer;
}
.navigation.selected2{
    background-image: url('../../public/navigation/导航背景2.png'); /* 背景图片路径 */
    color: black;
}
.navigation.selected2:hover {
    color: initial;
}
.navigation.selected3{
    background-image: url('../../public/navigation/导航背景2.png'); /* 背景图片路径 */
    color: black;
}
.navigation.selected3:hover {
    color: initial;
}
.navigation:hover{
    color: orange;
}
.navigation-border{
    height: 100%;
    width: 10vw;
    z-index: 100;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 1vw;
    position: relative;
}
.navigation-border:hover{
    background-image: url('../../public/navigation/导航背景装饰.png'); /* 背景图片路径 */
}
.world-set{
    width: calc(100%);
    /* height: 100%; */
    display: flex;
    flex-wrap: wrap;
    align-content: baseline;
    /* margin-right: 1vw; */
    gap: 0.5vw;
}
.line{
    height: 0.3vh;
    width: 100%;
}
.line-1{
    height: 0.1vh;
    width: 100%;
    background-color: rgb(140,130,120);
}
.line-2{
    height: 0.1vh;
    width: 100%;
    background-color: rgb(160,150,140);
}
.line-3{
    height: 0.1vh;
    width: 100%;
    background-color: rgb(180,170,160);
}
#world-set-scorllContainer{
    width: calc(100% );
    margin: 1vh 0vw;
    margin-bottom: 0vh;
    height: calc(100% - 10.2vh - 6vh - 0vh + 0.3vh);
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
}
/* #world-set-scorllContainer::-webkit-scrollbar{
    width: 1vw;
}
#world-set-scorllContainer::-webkit-scrollbar-track{
    background-image: url('../../image/tab/滑轨.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
}
#world-set-scorllContainer::-webkit-scrollbar-thumb{
    height: 1vh;
    background-image: url('../../image/navigation/滑轨按钮.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
}
#world-set-scorllContainer::-webkit-scrollbar-button:start{
    height: 1vh;
    background-image: url('../../image/navigation/滑轨按钮上.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
}
#world-set-scorllContainer::-webkit-scrollbar-button:end{
    height: 1vh;
    background-image: url('../../image/navigation/滑轨按钮下.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
} */
.label{
    width: calc(100% - 0.5vw);
    height: 6vh;
    background-color: rgb(40,30,20);
    color: white;
    font-size: 2.5vh;
    line-height: 2.5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1vh;
    justify-content: center;
}
.submit-container{
    height: 6vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: rgb(40,30,20); */
}
.submit{
    height: calc(5vh - 1.6vh);
    padding: 0.5vh 2vw;
    font-size: 2.5vh;
    font-weight: bold;
    background-color: rgb(228,196,118);
    margin: 0 auto;
    border-radius: 1vh;
    color: black;
    cursor: pointer;
    border: 0.3vh solid rgb(118,82,44);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5vw;
}
.submit:hover{
    background-color: rgb(242,222,155);
}
.world-card{
    display: flex;
    height: 7vh;
    width: calc(33.33% - 0.5vw);
    background-color: rgb(40,30,20);
    border-radius: 1vh;
}
.card-icon{
    height: 6vh;
    width: 6vh;
    margin: 0.5vh 0.5vw;
}
.card-message{
    height: 100%;
    width: calc(100% - 5vh - 1vw);
}
.card-title{
    font-size: 1.8vh;
    line-height: 3vh;
    height: 3vh;
    display: flex;
    justify-content: center;
    color: ghostwhite;
    align-items: center;
}
.card-value{
    font-size: 1.5vh;
    line-height: 3vh;
    height: 3vh;
    display: flex;
    justify-content: center;
    color: orange;
    align-items: center;
}
select{
    border: none;
    outline: none;
    height: 80%;
    /* width: 50%; */
    color: orange;
}
</style>