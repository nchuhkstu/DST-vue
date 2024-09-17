<template>
    <div id="world">
        <div class="world-top">
            <div class="world-navigation-container">
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
            </div>
            <div class="world-submit">
                <div class="submit" @click="postWorld">保存</div>
            </div>
        </div>
        <div id="world-set-scorllContainer">
            <div class="world-set">
                <div v-for="(group, label) in groupedCards" :key="label" class="world-set">
                    <div class="label">{{ label }}</div>
                    <div v-for="card in group" :key="card.name" class="world-card">
                        <img class="card-icon" :src="'/static/world/' + card.name + '.png'">
                        <div class="card-message">
                            <div class="isChanged-background" v-show="card.value != card.origin"></div>
                            <div class="card-message-container">
                                <div class="card-title">{{ card.name }}</div>
                                <div class="card-value">
                                    <select v-model="card.value">
                                        <option v-for="(value, key) in card.options" :key="value" :value="value">{{ key }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import worldCard from './worldCard.vue';
import { post } from '../api/worldRequest'
import {useClusterStore} from '../store/clusterStore'
import { useTipStore } from '../store/tipStore'
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
                    生物: this.cards.slice(66, 81),
                    敌对生物: this.cards.slice(81, 98),
                    巨兽: this.cards.slice(98, 114),
                };
            }
            else if(this.active_1 == 1 && this.active_2 == 2){
                grouped = {
                    全局: this.cards.slice(114,115),
                    世界: this.cards.slice(115,128),
                    资源: this.cards.slice(128,154),
                    生物以及刷新点: this.cards.slice(154,166),
                    敌对生物以及刷新点: this.cards.slice(166,176),
                }
            }
            else if (this.active_1 ==2 && this.active_2 ==1){
                grouped = {
                    世界: this.cards.slice(176,183),
                    资源再生:this.cards.slice(183,188),
                    生物: this.cards.slice(188,199),
                    敌对生物: this.cards.slice(199,208),
                    巨兽: this.cards.slice(208,213),
                }
            }
            else{
                grouped = {
                    世界: this.cards.slice(213,222),
                    资源: this.cards.slice(222,238),
                    生物以及刷新点: this.cards.slice(238,243),
                    敌对生物以及刷新点: this.cards.slice(243,250),
                }
            }
            return grouped;
        },
    },
    data(){
        return{
            clusterStore:useClusterStore(),
            tipStore:useTipStore(),
            active_1:'1',
            active_2:'1',
            cards:[
                {name_en:'specialevent', name:'活动',value:'default',options:{'自动':'default','无':'none'},changed:false,origin:'default'},
                {name_en:'autumn', name:'秋',value:'default',options:{'无':'noseason','极短':'veryshortseason','短':'shortseason','默认':'default','长':'longseason','极长':'verylongseason','随机':'random'},changed:false,origin:'default'},
                {name_en:'winter', name:'冬',value:'default',options:{'无':'noseason','极短':'veryshortseason','短':'shortseason','默认':'default','长':'longseason','极长':'verylongseason','随机':'random'},changed:false,origin:'default'},
                {name_en:'spring', name:'春',value:'default',options:{'无':'noseason','极短':'veryshortseason','短':'shortseason','默认':'default','长':'longseason','极长':'verylongseason','随机':'random'},changed:false,origin:'default'},
                {name_en:'summer', name:'夏',value:'default',options:{'无':'noseason','极短':'veryshortseason','短':'shortseason','默认':'default','长':'longseason','极长':'verylongseason','随机':'random'},changed:false,origin:'default'},
                {name_en:'day', name:'昼夜选项',value:'default',options:{'默认':'default','长 白天':'longday','长 黄昏':'longdusk','长 夜晚':'longnight','无 白天':'noday','无 黄昏':'nodusk','无 夜晚':'nonight','仅 白天':'onlyday','仅 黄昏':'onlydusk','仅 夜晚':'onlynight'},changed:false,origin:'default'},
                {name_en:'spawnmode', name:'出生模式',value:'fixed',options:{'绚丽之门':'fixed','随机':'scatter'},changed:false,origin:'fixed'},
                {name_en:'ghostenabledd', name:'冒险家死亡',value:'always',options:{'更换冒险家':'none','变鬼魂':'always'},changed:false,origin:'always'},
                {name_en:'portalresurection', name:'在绚丽之门复活',value:'none',options:{'禁用':'none','启用':'always'},changed:false,origin:'none'},
                {name_en:'ghostsanitydrain', name:'鬼魂理智值惩罚',value:'always',options:{'禁用':'none','启用':'always'},changed:false,origin:'always'},
                {name_en:'resettime', name:'死亡重置倒计时',value:'default',options:{'禁用':'none','慢':'slow','默认':'default','快':'fast','立刻':'always'},changed:false,origin:'default'},
                {name_en:'beefaloheat', name:'皮弗娄牛交配频率',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'krampus', name:'坎普斯',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},

                {name_en:'crow_carnival', name:'盛夏鸦年华',value:'default',options:{'默认':'default','总是':'enabled'},changed:false,origin:'default'},
                {name_en:'hallowed_nights', name:'万圣夜',value:'default',options:{'默认':'default','总是':'enabled'},changed:false,origin:'default'},
                {name_en:'winters_feast', name:'冬季盛宴',value:'default',options:{'默认':'default','总是':'enabled'},changed:false,origin:'default'},
                {name_en:'year_of_the_gobbler', name:'火鸡之年',value:'default',options:{'默认':'default','总是':'enabled'},changed:false,origin:'default'},
                {name_en:'year_of_the_varg', name:'座狼之年',value:'default',options:{'默认':'default','总是':'enabled'},changed:false,origin:'default'},
                {name_en:'year_of_the_carrat', name:'胡萝卜鼠之年',value:'default',options:{'默认':'default','总是':'enabled'},changed:false,origin:'default'},
                {name_en:'year_of_the_pig', name:'猪王之年',value:'default',options:{'默认':'default','总是':'enabled'},changed:false,origin:'default'},
                {name_en:'year_of_the_beefalo', name:'皮弗娄牛之年',value:'default',options:{'默认':'default','总是':'enabled'},changed:false,origin:'default'},
                {name_en:'year_of_the_catcoon', name:'浣猫之年',value:'default',options:{'默认':'default','总是':'enabled'},changed:false,origin:'default'},
                {name_en:'year_of_the_bunnyman', name:'兔人之年',value:'default',options:{'默认':'default','总是':'enabled'},changed:false,origin:'default'},
                {name_en:'year_of_the_dragonfly', name:'龙蝇之年',value:'default',options:{'默认':'default','总是':'enabled'},changed:false,origin:'default'},

                {name_en:'extrastartingitems', name:'额外起始资源',value:'default',options:{'第5天后':'5','第10天后':'default','第15天后':'15','第20天后':'20','总是':'0','从不':'none'},changed:false,origin:'default'},
                {name_en:'seasonalstartingitems', name:'季节起始物品',value:'default',options:{'无':'never','默认':'default'},changed:false,origin:'default'},
                {name_en:'spawnprotection', name:'防骚扰出生保护',value:'default',options:{'无':'never','自动检测':'default','总是':'always'},changed:false,origin:'default'},
                {name_en:'dropeverythingondespawn', name:'离开游戏后物品掉落',value:'default',options:{'默认':'default','所有':'always'},changed:false,origin:'default'},
                {name_en:'healthpenalty', name:'血量上限惩罚',value:'always',options:{'禁用':'none','启用':'always'},changed:false,origin:'always'},
                {name_en:'lessdamagetaken', name:'收到的伤害',value:'none',options:{'较少':'always','默认':'none','较多':'more'},changed:false,origin:'none'},
                {name_en:'temperaturedamage', name:'温度伤害',value:'default',options:{'非致命':'nonlethal','默认':'default'},changed:false,origin:'default'},
                {name_en:'hunger', name:'饥饿伤害',value:'default',options:{'非致命':'nonlethal','默认':'default'},changed:false,origin:'default'},
                {name_en:'darkness', name:'黑暗伤害',value:'default',options:{'非致命':'nonlethal','默认':'default'},changed:false,origin:'default'},
                {name_en:'shadowcreatures', name:'理智怪兽',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'brightmarecreatures', name:'启蒙怪兽',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},

                {name_en:'hounds', name:'猎犬袭击',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'winterhounds', name:'冰猎犬群',value:'default',options:{'无':'never','默认':'default'},changed:false,origin:'default'},
                {name_en:'summerhounds', name:'火猎犬群',value:'default',options:{'无':'never','默认':'default'},changed:false,origin:'default'},
                {name_en:'petrification', name:'森林石化',value:'default',options:{'无':'none','慢':'few','默认':'default','快':'many','大量':'max'},changed:false,origin:'default'},
                {name_en:'meteorshowers', name:'流星频率',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'hunt', name:'狩猎',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'rifts_enabledd', name:'荒野裂隙',value:'default',options:{'无':'never','自动检测':'default','总是':'always'},changed:false,origin:'default'},
                {name_en:'rifts_frequency', name:'荒野裂隙频率',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'alternatehunt', name:'追猎惊喜',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'wildfires', name:'野火',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'lightning', name:'闪电',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'weather', name:'雨',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'frograin', name:'青蛙雨',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},

                {name_en:'regrowth', name:'再生速度',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'cactus_regrowth', name:'仙人掌',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'basicresource_regrowth', name:'基础资源',value:'none',options:{'禁用':'none','启用':'always'},changed:false,origin:'none'},
                {name_en:'twiggytrees_regrowth', name:'多枝树',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'evergreen_regrowth', name:'常青树',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'moon_tree_regrowth', name:'月树',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'deciduoustree_regrowth', name:'桦栗树',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'palmconetree_regrowth', name:'棕榈松果树',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'saltstack_regrowth', name:'盐堆',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'carrots_regrowth', name:'胡萝卜',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'reeds_regrowth', name:'芦苇',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'flowers_regrowth', name:'花',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},

                {name_en:'portal_spawnrate', name:'传送频率',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'lightcrab_portalrate', name:'发光蟹',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'palmcone_seed_portalrate', name:'棕榈松果树芽',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'powder_monkey_portalrate', name:'火药猴',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'monkeytail_portalrate', name:'猴尾草',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'bananabush_portalrate', name:'香蕉丛',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},

                {name_en:'gnarwail', name:'一角鲸',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'penguins', name:'企鸥',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'bunnymen_setting', name:'兔人',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'rabbits_setting', name:'兔子',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'otters_setting', name:'水獭掠夺者',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'catcoons', name:'浣猫',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'perd', name:'火鸡',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'pigs_setting', name:'猪',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'grassgekkos', name:'草壁虎转化',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'bees_setting', name:'蜜蜂',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'butterfly', name:'蝴蝶',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'fishschools', name:'鱼群',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'birds', name:'鸟',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'moles_setting', name:'鼹鼠',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'wobsters', name:'龙虾',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},

                {name_en:'mutated_hounds', name:'恐怖猎犬',value:'default',options:{'无':'never','默认':'default'},changed:false,origin:'default'},
                {name_en:'pirateraids', name:'月亮码头海盗',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'penguins_moon', name:'月石企鸥',value:'default',options:{'无':'never','默认':'default'},changed:false,origin:'default'},
                {name_en:'wasps', name:'杀人蜂',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'walrus_setting', name:'海象',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'hound_mounds', name:'猎犬',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'moon_spider', name:'破碎蜘蛛',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'mosquitos', name:'蚊子',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'spiders_setting', name:'蜘蛛',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'spider_warriors', name:'蜘蛛战士',value:'default',options:{'无':'never','默认':'default'},changed:false,origin:'default'},
                {name_en:'bats_setting', name:'蝙蝠',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'frogs', name:'青蛙',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'lureplants', name:'食人花',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'cookiecutters', name:'饼干切割机',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'merms', name:'鱼人',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'squid', name:'鱿鱼',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'sharks', name:'鲨鱼',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},

                {name_en:'klaus', name:'克劳斯',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'sharkboi', name:'大霜鲨',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'crabking', name:'帝王蟹',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'eyeofterror', name:'恐怖之眼',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'daywalker2', name:'拾荒疯猪',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'fruitfly', name:'果蝇王',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'liefs', name:'树精守卫',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'deciduousmonster', name:'毒桦栗树',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'bearger', name:'熊獾',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'deerclops', name:'独眼巨鹿',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'antliontribute', name:'蚁狮贡品',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'beequeen', name:'蜂王',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'spiderqueen', name:'蜘蛛女王',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'malbatross', name:'邪天翁',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'goosemoose', name:'麋鹿鹅',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'dragonfly', name:'龙蝇',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},

                {name_en:'season_start', name:'起始季节',value:'default',options:{'秋':'default','冬':'winter','春':'spring','夏':'summer'},changed:false,origin:'default'},

                {name_en:'task_set', name:'生物群落',value:'default',options:{'联机版':'default','经典':'classic'},changed:false,origin:'default'},
                {name_en:'start_location', name:'出生点',value:'default',options:{'额外资源':'plus','黑暗':'darkness','默认':'default'},changed:false,origin:'default'},
                {name_en:'world_size', name:'世界大小',value:'default',options:{'小':'small','中':'medium','大':'default','巨大':'huge'},changed:false,origin:'default'},
                {name_en:'branching', name:'分支',value:'default',options:{'从不':'never','最少':'least','默认':'default','最多':'most','随机':'random'},changed:false,origin:'default'},
                {name_en:'loop', name:'环形',value:'default',options:{'从不':'never','默认':'default','总是':'always'},changed:false,origin:'default'},
                {name_en:'roads', name:'道路',value:'default',options:{'无':'never','默认':'default'},changed:false,origin:'default'},
                {name_en:'touchstone', name:'试金石',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'boons', name:'失败的冒险家',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'prefabswaps_start', name:'开始资源多样化',value:'default',options:{'经典':'classic','默认':'default','非常随机':'highly random'},changed:false,origin:'default'},
                {name_en:'', name:'垃圾场',value:'default',options:{'无':'never','默认':'default'},changed:false,origin:'default'},
                {name_en:'moon_fissure', name:'天体裂隙',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'terrariumchest', name:'盒中泰拉',value:'default',options:{'无':'never','默认':'default'},changed:false,origin:'default'},
                {name_en:'stageplays', name:'舞台剧',value:'default',options:{'无':'never','默认':'default'},changed:false,origin:'default'},

                {name_en:'cactus', name:'仙人掌',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'ocean_bullkelp', name:'公牛海带茎',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'marshbush', name:'尖刺灌木',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'rock', name:'巨石',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'moon_sapling', name:'月亮树苗',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'moon_rock', name:'月亮石',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'moon_tree', name:'月树',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'sapling', name:'树苗',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'trees', name:'所有树',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'palmconetree', name:'棕榈松果树',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'ponds', name:'池塘',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'meteorspawner', name:'流星区域',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'berrybush', name:'浆果丛',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'moon_bullkelp', name:'海岸公牛海带',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'moon_starfish', name:'海星',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'ocean_seastack', name:'海蚀柱',value:'ocean_default',options:{'默认':'ocean_default'},changed:false,origin:'ocean_default'},
                {name_en:'moon_hotspring', name:'温泉',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'flint', name:'燧石',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'moon_berrybush', name:'石果灌木丛',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'carrot', name:'胡萝卜',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'reeds', name:'芦苇',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'flowers', name:'花和邪恶花',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'grass', name:'草',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'mushroom', name:'蘑菇',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'rock_ice', name:'迷你冰川',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'tumbleweed', name:'风滚草',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},

                {name_en:'lightninggoat', name:'伏特羊',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'rabbits', name:'兔洞',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'moon_fruitdragon', name:'沙拉蝾螈',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'pigs', name:'猪屋',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'beefalo', name:'皮弗娄牛',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'buzzard', name:'秃鹫',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'catcoon', name:'空心树桩',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'moon_carrot', name:'胡萝卜鼠',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'bees', name:'蜜蜂蜂窝',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'ocean_shoal', name:'鱼群',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'moles', name:'鼹鼠丘',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'ocean_wobsterden', name:'龙虾窝',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},

                {name_en:'chess', name:'发条装置',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'angrybees', name:'杀人蜂蜂窝',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'ocean_waterplant', name:'海草',value:'ocean_default',options:{'默认':'ocean_default'},changed:false,origin:'ocean_default'},
                {name_en:'walrus', name:'海象营地',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'merm', name:'漏雨的小屋',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'houndmound', name:'猎犬丘',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'moon_spiders', name:'破碎蜘蛛洞',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'spiders', name:'蜘蛛巢',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'tentacles', name:'触手',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'tallbirds', name:'高脚鸟',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},

                {name_en:'earthquakes', name:'地震',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'wormattacks', name:'洞穴蠕虫攻击',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'rifts_enabledd_cave', name:'荒野裂隙',value:'default',options:{'无':'never','自动检测':'default','总是':'always'},changed:false,origin:'default'},
                {name_en:'rifts_frequency_cave', name:'荒野裂隙频率',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'atriumgate', name:'远古大门',value:'default',options:{'极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'acidrain_enabledd', name:'酸雨',value:'always',options:{'禁用':'none','启用':'always'},changed:false,origin:'always'},
                {name_en:'weather', name:'雨',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},

                {name_en:'regrowth', name:'再生速度',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'lightflier_flower_regrowth', name:'光虫花',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'mushtree_moon_regrowth', name:'月亮蘑菇树',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'flower_cave_regrowth', name:'荧光花',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'mushtree_regrowth', name:'蘑菇树',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},

                {name_en:'bunnymen_setting', name:'兔人',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'dustmoths', name:'尘蛾',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'pigs_setting', name:'猪',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'lightfliers', name:'球状光虫',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'rocky_setting', name:'石虾',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'monkey_setting', name:'穴居猴',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'grassgekkos', name:'草壁虎转化',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'mushgnome', name:'蘑菇地精',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'slurtles_setting', name:'蛞蝓龟',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'snurtles', name:'蜗牛龟',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'moles_setting', name:'鼹鼠',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},

                {name_en:'spider_spitter', name:'喷射蜘蛛',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'spider_hider', name:'洞穴蜘蛛',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'spider_dropper', name:'穴居悬蛛',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'spiders_setting', name:'蜘蛛',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'spider_warriors', name:'蜘蛛战士',value:'default',options:{'无':'never','默认':'default'},changed:false,origin:'default'},
                {name_en:'bats_setting', name:'蝙蝠',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'molebats', name:'裸鼹蝠',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'nightmarecreatures', name:'遗迹梦魇',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'merms', name:'鱼人',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},

                {name_en:'fruitfly', name:'果蝇王',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'liefs', name:'树精守卫',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'daywalker', name:'梦魇疯猪',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'toadstool', name:'毒菌蟾蜍',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},
                {name_en:'spiderqueen', name:'蜘蛛女王',value:'default',options:{'无':'never','很少':'rare','默认':'default','较多':'often','大量':'always'},changed:false,origin:'default'},

                {name_en:'task_set', name:'生物群落',value:'cave_default',options:{'地下':'cave_default'},changed:false,origin:'cave_default'},
                {name_en:'start_location', name:'出生点',value:'caves',options:{'洞穴':'caves'},changed:false,origin:'caves'},
                {name_en:'world_size', name:'世界大小',value:'default',options:{'小':'small','中':'medium','大':'default','巨大':'huge'},changed:false,origin:'default'},
                {name_en:'branching', name:'分支',value:'default',options:{'从不':'never','最少':'least','默认':'default','最多':'most','随机':'random'},changed:false,origin:'default'},
                {name_en:'loop', name:'环形',value:'default',options:{'从不':'never','默认':'default','总是':'always'},changed:false,origin:'default'},
                {name_en:'touchstone', name:'试金石',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'boons', name:'失败的冒险家',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'cavelight', name:'洞穴光照',value:'default',options:{'无':'never','极慢':'veryslow','慢':'slow','默认':'default','快':'fast','极快':'veryfast'},changed:false,origin:'default'},
                {name_en:'prefabswaps_start', name:'开始资源多样化',value:'default',options:{'经典':'classic','默认':'default','非常随机':'highly random'},changed:false,origin:'default'},

                {name_en:'wormlights', name:'发光浆果',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'marshbush', name:'尖刺灌木',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'rock', name:'巨石',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'sapling', name:'树苗',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'trees', name:'所有树',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'cave_ponds', name:'池塘',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'fern', name:'洞穴蕨类',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'berrybush', name:'浆果丛',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'flint', name:'燧石',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'reeds', name:'芦苇',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'lichen', name:'苔藓',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'grass', name:'草',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'flower_cave', name:'荧光花',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'mushroom', name:'蘑菇',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'mushtree', name:'蘑菇树',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'banana', name:'香蕉',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},

                {name_en:'bunnymen', name:'兔屋',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'slurper', name:'啜食者',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'rocky', name:'石虾',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'monkey', name:'穴居猴桶',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'slurtles', name:'蛞蝓龟窝',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},

                {name_en:'chess', name:'发条装置',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'fissure', name:'梦魇裂隙',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'worms', name:'洞穴蠕虫',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'cave_spiders', name:'蛛网岩',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'spiders', name:'蜘蛛巢',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'bats', name:'蝙蝠',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},
                {name_en:'tentacles', name:'触手',value:'default',options:{'无':'never','很少':'rare','较少':'uncommon','默认':'default','较多':'often','很多':'mostly','大量':'always','疯狂':'insane'},changed:false,origin:'default'},

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
        },
        postWorld(){
            let overrides1 = this.cards.slice(0, 176).map(card => ({
                [card.name_en]: card.value
            }));
            let overrides2 = this.cards.slice(176,250).map(card=>({
                [card.name_en]: card.value
            }))
            let setting = {"overrides1":overrides1,"overrides2":overrides2}
            post(this.clusterStore.clusters[this.clusterStore.index].cluster_name,{"setting":setting}).then(response=>{
                if(response.data.status=="ok"){
                    this.tipStore.showTip(response.data.message);
                }
            })
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
.world-top{
    height: 8.6vh;
    width:100%;
    display: flex;
}
.world-submit{
    height: 8.6vh;
    width: 15%;
    display: flex;
    align-items: end;
    justify-content: center;
}
.world-navigation-container{
    height: 8.6vh;
    width:85%;
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
    margin-top: 1vh;
    height: calc(100% - 9.6vh);
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
    height: 7vh;
    width: 7vh;
    /* margin: 0.5vh 0.5vw; */
}
.card-message{
    height: calc(100% - 1vh);
    width: calc(100% - 5vh - 1vw - 2vw);
    margin: 0.5vh 1vw;
    position: relative;
}
.isChanged-background{
    background-color: rgb(71,63,50);
    height: 100%;
    width: 100%;
    top: 0;
    position: absolute;
    z-index: 0;
}
.card-message-container{
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
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
    background-color: transparent;
    cursor: pointer;
}
</style>