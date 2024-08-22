<template>
    <div id="world">
        <div class="world-navigation">
            <div class="navigation-border">
                <div class="navigation selected2" id="forest-button" @click="changeWorld('forest')">森林</div>
            </div>
            <div class="navigation-border">
                <div class="navigation" id="cave-button" @click="changeWorld('cave')">洞穴</div>
            </div>
        </div>
        <div class="line"><div class="line-1"></div><div class="line-2"></div><div class="line-3"></div></div>
        <div class="world-navigation">
            <div class="navigation-border">
                <div class="navigation selected3" id="rule-button" @click="changeRule('rule')">世界规则</div>
            </div>
            <div class="navigation-border">
                <div class="navigation" id="generate-button" @click="changeRule('generate')">世界生成</div>
            </div>
        </div>
        <div class="line"><div class="line-1"></div><div class="line-2"></div><div class="line-3"></div></div>
        <div id="world-set-scorllContainer">
            <div id="world-set">
                <template v-for="(category, label) in data" :key="label">
                    <div class="label">{{ label }}</div>
                    <template v-for="(object, key) in category" :key="key">
                        <worldCard :title="key" :value="object.value" :display="object.display" class="worldCard" :world="world"></worldCard>
                    </template>
                </template>
            </div>
        </div>
        <div class="submit-container">
            <div class="submit">保存</div>
        </div>
    </div>
</template>
<script>
import worldCard from './worldCard.vue';
// import { getWorld,getWorld2 } from '../api/server';
export default {
    name:"world",
    components:{
        worldCard,
    },
    computed:{
        data(){
            if(this.world=='forest'){
                if(this.rule=='rule'){
                    return this.forest_rule;
                }
                return this.forest_generate
            }
            else{
                if(this.rule=='rule'){
                    return this.cave_rule;
                }
                return this.cave_generate;
            }
        },
    },
    data(){
        return{
            world:'forest',
            rule:'rule',
            forest_rule:{
                全局:{活动:{value:"",display:"自动"},秋:{value:"",display:"默认"},冬:{value:"",display:"默认"},春:{value:"",display:"默认"},夏:{value:"",display:"默认"},昼夜选项:{value:"",display:"默认"},出生模式:{value:"",display:"绚丽之门"},冒险家死亡:{value:"",display:"变鬼魂"},在绚丽之门复活:{value:"",display:"禁用"},鬼魂理智值惩罚:{value:"",display:"启用"},死亡重置倒计时:{value:"",display:"默认"},皮弗娄牛交配频率:{value:"",display:"默认"},坎普斯:{value:"",display:"默认"},},
                活动:{盛夏鸦年华:{value:"",display:"默认"},万圣夜:{value:"",display:"默认"},冬季盛宴:{value:"",display:"默认"},火鸡之年:{value:"",display:"默认"},座狼之年:{value:"",display:"默认"},猪王之年:{value:"",display:"默认"},胡萝卜鼠之年:{value:"",display:"默认"},皮弗娄牛之年:{value:"",display:"默认"},浣猫之年:{value:"",display:"默认"},兔人之年:{value:"",display:"默认"},龙蝇之年:{value:"",display:"默认"},},
                冒险家:{额外起始资源:{value:"",display:"第10天后"},季节起始物品:{value:"",display:"默认"},防骚扰出生保护:{value:"",display:"自动检测"},离开游戏后物品掉落:{value:"",display:"默认"},血量上限惩罚:{value:"",display:"默认"},收到的伤害:{value:"",display:"默认"},温度伤害:{value:"",display:"默认"},饥饿伤害:{value:"",display:"默认"},黑暗伤害:{value:"",display:"默认"},理智怪兽:{value:"",display:"默认"},启蒙怪兽:{value:"",display:"默认"},},
                世界:{猎犬袭击:{value:"",display:"默认"},冰猎犬群:{value:"",display:"默认"},火猎犬群:{value:"",display:"默认"},森林石化:{value:"",display:"默认"},流星频率:{value:"",display:"默认"},狩猎:{value:"",display:"默认"},荒野裂隙开启:{value:"",display:"默认"},荒野裂隙频率:{value:"",display:"默认"},追猎惊喜:{value:"",display:"默认"},野火:{value:"",display:"默认"},闪电:{value:"",display:"默认"},雨:{value:"",display:"默认"},青蛙雨:{value:"",display:"默认"},},
                资源再生:{再生速度:{value:"",display:"默认"},仙人掌:{value:"",display:"默认"},基础资源:{value:"",display:"默认"},多枝树:{value:"",display:"默认"},常青树:{value:"",display:"默认"},月树:{value:"",display:"默认"},桦栗树:{value:"",display:"默认"},棕榈松果树:{value:"",display:"默认"},盐堆:{value:"",display:"默认"},胡萝卜:{value:"",display:"默认"},芦苇:{value:"",display:"默认"},花:{value:"",display:"默认"},},
                非自然传送门资源:{传送频率:{value:"",display:"默认"},发光蟹:{value:"",display:"默认"},棕榈松果树芽:{value:"",display:"默认"},火药猴:{value:"",display:"默认"},猴尾草:{value:"",display:"默认"},香蕉丛:{value:"",display:"默认"},},
                生物:{一角鲸:{value:"",display:"默认"},企鸥:{value:"",display:"默认"},兔人:{value:"",display:"默认"},兔子:{value:"",display:"默认"},浣猫:{value:"",display:"默认"},火鸡:{value:"",display:"默认"},猪:{value:"",display:"默认"},草壁虎转化:{value:"",display:"默认"},蜜蜂:{value:"",display:"默认"},蝴蝶:{value:"",display:"默认"},鱼群:{value:"",display:"默认"},鸟:{value:"",display:"默认"},鼹鼠:{value:"",display:"默认"},龙虾:{value:"",display:"默认"},},
                敌对生物:{恐怖猎犬:{value:"",display:"默认"},月亮码头海盗:{value:"",display:"默认"},月石企鸥:{value:"",display:"默认"},杀人蜂:{value:"",display:"默认"},海象:{value:"",display:"默认"},猎犬:{value:"",display:"默认"},破碎蜘蛛:{value:"",display:"默认"},蚊子:{value:"",display:"默认"},蜘蛛:{value:"",display:"默认"},蜘蛛战士:{value:"",display:"默认"},蝙蝠:{value:"",display:"默认"},青蛙:{value:"",display:"默认"},食人花:{value:"",display:"默认"},饼干切割机:{value:"",display:"默认"},鱼人:{value:"",display:"默认"},鱿鱼:{value:"",display:"默认"},鲨鱼:{value:"",display:"默认"},},
                巨兽:{克劳斯:{value:"",display:"默认"},帝王蟹:{value:"",display:"默认"},恐怖之眼:{value:"",display:"默认"},果蝇王:{value:"",display:"默认"},树精守卫:{value:"",display:"默认"},毒桦栗树:{value:"",display:"默认"},熊獾:{value:"",display:"默认"},独眼巨鹿:{value:"",display:"默认"},蚁狮贡品:{value:"",display:"默认"},蜂王:{value:"",display:"默认"},蜘蛛女王:{value:"",display:"默认"},邪天翁:{value:"",display:"默认"},麋鹿鹅:{value:"",display:"默认"},龙蝇:{value:"",display:"默认"},}
            },
            forest_generate:{
                全局:{起始季节:{value:"",display:"秋"}},
                世界:{生物群落:{value:"",display:"联机版"},出生点:{value:"",display:"默认"},世界大小:{value:"",display:"中"},分支:{value:"",display:"默认"},环形:{value:"",display:"默认"},道路:{value:"",display:"默认"},试金石:{value:"",display:"默认"},失败的冒险家:{value:"",display:"默认"},开始资源多样化:"经典",天体裂隙:{value:"",display:"默认"},盒中泰拉:{value:"",display:"默认"},舞台剧:{value:"",display:"默认"}},
                资源:{仙人掌:{value:"",display:"默认"},公牛海带茎:{value:"",display:"默认"},尖刺灌木:{value:"",display:"默认"},巨石:{value:"",display:"默认"},月亮树苗:{value:"",display:"默认"},月亮石:{value:"",display:"默认"},月树:{value:"",display:"默认"},树苗:{value:"",display:"默认"},所有树:{value:"",display:"默认"},棕榈松果树:{value:"",display:"默认"},池塘:{value:"",display:"默认"},流星区域:{value:"",display:"默认"},浆果丛:{value:"",display:"默认"},海岸公牛海带:{value:"",display:"默认"},海星:{value:"",display:"默认"},海蚀柱:{value:"",display:"默认"},温泉:{value:"",display:"默认"},燧石:{value:"",display:"默认"},石果灌木丛:{value:"",display:"默认"},胡萝卜:{value:"",display:"默认"},芦苇:{value:"",display:"默认"},花和邪恶花:{value:"",display:"默认"},草:{value:"",display:"默认"},蘑菇:{value:"",display:"默认"},迷你冰川:{value:"",display:"默认"},风滚草:{value:"",display:"默认"},},
                生物以及刷新点:{伏特羊:{value:"",display:"默认"},兔洞:{value:"",display:"默认"},沙拉蝾螈:{value:"",display:"默认"},猪屋:{value:"",display:"默认"},皮弗娄牛:{value:"",display:"默认"},秃鹫:{value:"",display:"默认"},空心树桩:{value:"",display:"默认"},胡萝卜鼠:{value:"",display:"默认"},蜜蜂蜂窝:{value:"",display:"默认"},鱼群:{value:"",display:"默认"},鼹鼠丘:{value:"",display:"默认"},龙虾窝:{value:"",display:"默认"}},
                敌对生物以及刷新点:{发条装置:{value:"",display:"默认"},杀人蜂蜂窝:{value:"",display:"默认"},海草:{value:"",display:"默认"},海象营地:{value:"",display:"默认"},漏雨的小屋:{value:"",display:"默认"},猎犬丘:{value:"",display:"默认"},破碎蜘蛛洞:{value:"",display:"默认"},蜘蛛巢:{value:"",display:"默认"},触手:{value:"",display:"默认"},高脚鸟:{value:"",display:"默认"}},
            },
            cave_rule:{
                世界:{地震:{value:"",display:"默认"},洞穴蠕虫攻击:{value:"",display:"默认"},荒野裂隙开启:{value:"",display:"默认"},荒野裂隙频率:{value:"",display:"默认"},远古大门:{value:"",display:"默认"},雨:{value:"",display:"默认"}},
                资源再生:{再生速度:{value:"",display:"默认"},光虫花:{value:"",display:"默认"},月亮蘑菇树:{value:"",display:"默认"},荧光花:{value:"",display:"默认"},蘑菇树:{value:"",display:"默认"}},
                生物:{兔人:{value:"",display:"默认"},尘蛾:{value:"",display:"默认"},猪:{value:"",display:"默认"},球状光虫:{value:"",display:"默认"},石虾:{value:"",display:"默认"},穴居猴:{value:"",display:"默认"},草壁虎转化:{value:"",display:"默认"},蘑菇地精:{value:"",display:"默认"},蛞蝓龟:{value:"",display:"默认"},蜗牛龟:{value:"",display:"默认"},鼹鼠:{value:"",display:"默认"}},
                敌对生物:{喷射蜘蛛:{value:"",display:"默认"},洞穴蜘蛛:{value:"",display:"默认"},穴居悬蛛:{value:"",display:"默认"},蜘蛛:{value:"",display:"默认"},蜘蛛战士:{value:"",display:"默认"},蝙蝠:{value:"",display:"默认"},裸鼹蝠:{value:"",display:"默认"},遗迹梦魇:{value:"",display:"默认"},鱼人:{value:"",display:"默认"}},
                巨兽:{噩梦猪人:{value:"",display:"默认"},果蝇王:{value:"",display:"默认"},树精守卫:{value:"",display:"默认"},毒菌蟾蜍:{value:"",display:"默认"},蜘蛛女王:{value:"",display:"默认"}},
            },
            cave_generate:{
                世界:{生物群落:"地下",出生点:"洞穴",世界大小:{value:"",display:"默认"},分支:{value:"",display:"默认"},环形:{value:"",display:"默认"},试金石:{value:"",display:"默认"},失败的冒险家:{value:"",display:"默认"},洞穴光照:{value:"",display:"默认"},开始资源多样化:{value:"",display:"默认"}},
                资源:{发光浆果:{value:"",display:"默认"},尖刺灌木:{value:"",display:"默认"},巨石:{value:"",display:"默认"},树苗:{value:"",display:"默认"},所有树:{value:"",display:"默认"},池塘:{value:"",display:"默认"},洞穴蕨类:{value:"",display:"默认"},浆果丛:{value:"",display:"默认"},燧石:{value:"",display:"默认"},芦苇:{value:"",display:"默认"},苔藓:{value:"",display:"默认"},草:{value:"",display:"默认"},荧光花:{value:"",display:"默认"},蘑菇:{value:"",display:"默认"},蘑菇树:{value:"",display:"默认"},香蕉:{value:"",display:"默认"}},
                生物以及刷新点:{兔屋:{value:"",display:"默认"},啜食者:{value:"",display:"默认"},石虾:{value:"",display:"默认"},穴居猴桶:{value:"",display:"默认"},蛞蝓龟窝:{value:"",display:"默认"}},
                敌对生物以及刷新点:{发条装置:{value:"",display:"默认"},梦魇裂隙:{value:"",display:"默认"},洞穴蠕虫:{value:"",display:"默认"},蛛网岩:{value:"",display:"默认"},蜘蛛巢:{value:"",display:"默认"},蝙蝠:{value:"",display:"默认"},触手:{value:"",display:"默认"}},
            }
        }
    },
    methods:{
        changeWorld(name){
            this.world = name;
            document.querySelectorAll('.navigation').forEach(element=>{
                element.classList.remove('selected2');
            })
            document.getElementById(name+'-button').classList.add('selected2');
        },
        changeRule(name){
            this.rule = name;
            document.querySelectorAll('.navigation').forEach(element=>{
                element.classList.remove('selected3');
            })
            document.getElementById(name+'-button').classList.add('selected3');
        },
        handleGetWorld(){
            getWorld().then(response=>{
                let data=response.data;
                this.forest_rule.全局.活动.value=data.specialevent;
                this.forest_rule.全局.秋.value=data.autumn;
                this.forest_rule.全局.冬.value=data.winter;
                this.forest_rule.全局.春.value=data.spring,
                this.forest_rule.全局.夏.value=data.summer;
                this.forest_rule.全局.昼夜选项.value=data.day;
                this.forest_rule.全局.出生模式.value=data.spawnmode;
                this.forest_rule.全局.冒险家死亡.value=data.ghostenabled;
                this.forest_rule.全局.冒险家死亡.display=data.ghostenabled === 'always' ? '变鬼魂' : '更换冒险家';
                this.forest_rule.全局.在绚丽之门复活.value=data.portalresurection;
                this.forest_rule.全局.在绚丽之门复活.display=data.portalresurection === 'always' ? '启用' : '禁用';
                this.forest_rule.全局.鬼魂理智值惩罚.value=data.ghostsanitydrain;
                this.forest_rule.全局.死亡重置倒计时.value=data.resettime;
                this.forest_rule.全局.皮弗娄牛交配频率.value=data.beefaloheat;
                this.forest_rule.全局.坎普斯.value=data.krampus;

                this.forest_rule.生物.一角鲸.value=data.gnarwail;
                this.forest_rule.生物.企鸥.value=data.penguins;
                this.forest_rule.生物.兔人.value=data.bunnymen_setting;
                this.forest_rule.生物.兔子.value=data.rabbits_setting;
                this.forest_rule.生物.浣猫.value=data.catcoons;
                this.forest_rule.生物.火鸡.value=data.perd;
                this.forest_rule.生物.猪.value=data.pigs_setting;
                this.forest_rule.生物.草壁虎转化.value=data.grassgekkos;
                this.forest_rule.生物.蜜蜂.value=data.bees_setting;
                this.forest_rule.生物.蝴蝶.value=data.butterfly;
                this.forest_rule.生物.鱼群.value=data.fishschools;
                this.forest_rule.生物.鸟.value=data.birds;
                this.forest_rule.生物.鼹鼠.value=data.moles_setting;
                this.forest_rule.生物.龙虾.value=data.wobsters;

                this.forest_rule.活动.盛夏鸦年华.value=data.crow_carnival;
                this.forest_rule.活动.万圣夜.value=data.hallowed_nights;
                this.forest_rule.活动.冬季盛宴.value=data.winters_feast;
                this.forest_rule.活动.火鸡之年.value=data.year_of_the_gobbler;
                this.forest_rule.活动.座狼之年.value=data.year_of_the_varg;
                this.forest_rule.活动.胡萝卜鼠之年.value=data.year_of_the_carrat;
                this.forest_rule.活动.猪王之年.value=data.year_of_the_pig;
                this.forest_rule.活动.皮弗娄牛之年.value=data.year_of_the_beefalo;
                this.forest_rule.活动.浣猫之年.value=data.year_of_the_catcoon;
                this.forest_rule.活动.兔人之年.value=data.year_of_the_bunnyman;
                this.forest_rule.活动.龙蝇之年.value=data.year_of_the_dragonfly;
                this.forest_rule.冒险家.额外起始资源.value=data.extrastartingitems;
                if(data.extrastartingitems=='default')
                    this.forest_rule.冒险家.额外起始资源.display='第10天后';
                else if(data.extrastartingitems=='5')
                    this.forest_rule.冒险家.额外起始资源.display='第5天后';
                else if(data.extrastartingitems=='15')
                    this.forest_rule.冒险家.额外起始资源.display='第15天后';
                else if(data.extrastartingitems=='20')
                    this.forest_rule.冒险家.额外起始资源.display='第20天后';
                else if(data.extrastartingitems=='0')
                    this.forest_rule.冒险家.额外起始资源.display='总是';
                else
                    this.forest_rule.冒险家.额外起始资源.display='从不';
                this.forest_rule.冒险家.季节起始物品.value=data.seasonalstartingitems;
                this.forest_rule.冒险家.防骚扰出生保护.value=data.spawnprotection;
                if(data.spawnprotection=='default')
                    this.forest_rule.冒险家.防骚扰出生保护.display='自动检测';
                else if(data.spawnprotection=='never')
                    this.forest_rule.冒险家.防骚扰出生保护.display='无';
                else if(data.spawnprotection=='always')
                    this.forest_rule.冒险家.防骚扰出生保护.display='总是';

                this.forest_rule.冒险家.离开游戏后物品掉落.value=data.dropeverythingondespawn;
                this.forest_rule.冒险家.离开游戏后物品掉落.display=data.dropeverythingondespawn === 'always' ? '所有' : '默认';
                this.forest_rule.冒险家.血量上限惩罚.value=data.healthpenalty;
                this.forest_rule.冒险家.血量上限惩罚.display=data.healthpenalty === 'always' ? '启用' : '禁用';
                this.forest_rule.冒险家.收到的伤害.value=data.lessdamagetaken;
                if(data.lessdamagetaken=='more')
                    this.forest_rule.冒险家.收到的伤害.display='较多';
                else if(data.lessdamagetaken=='none')
                    this.forest_rule.冒险家.收到的伤害.display='默认';
                else
                    this.forest_rule.冒险家.收到的伤害.display='较少';
                this.forest_rule.冒险家.温度伤害.value=data.temperaturedamage;
                this.forest_rule.冒险家.温度伤害.display=data.temperaturedamage === 'nonlethal' ? '非致命' : '默认';
                this.forest_rule.冒险家.饥饿伤害.value=data.hunger;
                this.forest_rule.冒险家.饥饿伤害.display=data.hunger === 'nonlethal' ? '非致命' : '默认';
                this.forest_rule.冒险家.黑暗伤害.value=data.darkness;
                this.forest_rule.冒险家.黑暗伤害.display=data.darkness === 'nonlethal' ? '非致命' : '默认';
                this.forest_rule.冒险家.理智怪兽.value=data.shadowcreatures;
                this.forest_rule.冒险家.启蒙怪兽.value=data.brightmarecreatures;

                this.forest_rule.世界.猎犬袭击.value=data.hounds;
                this.forest_rule.世界.冰猎犬群.value=data.winterhounds;
                this.forest_rule.世界.火猎犬群.value=data.summerhounds;
                this.forest_rule.世界.森林石化.value=data.petrification;
                this.forest_rule.世界.森林石化.display=data.petrification === 'none' ? '无' : data.petrification;
                this.forest_rule.世界.流星频率.value=data.meteorshowers;
                this.forest_rule.世界.狩猎.value=data.hunt;
                this.forest_rule.世界.荒野裂隙开启.value=data.rifts_enabled;
                this.forest_rule.世界.荒野裂隙频率.value=data.rifts_frequency;
                this.forest_rule.世界.追猎惊喜.value=data.alternatehunt;
                this.forest_rule.世界.野火.value=data.wildfires;
                this.forest_rule.世界.闪电.value=data.lightning;
                this.forest_rule.世界.雨.value=data.weather;
                this.forest_rule.世界.青蛙雨.value=data.frograin;

                this.forest_rule.资源再生.胡萝卜.value=data.carrots_regrowth;
                this.forest_rule.资源再生.仙人掌.value=data.cactus_regrowth;
                this.forest_rule.资源再生.基础资源.value=data.basicresource_regrowth;
                this.forest_rule.资源再生.多枝树.value=data.twiggytrees_regrowth;
                this.forest_rule.资源再生.盐堆.value=data.saltstack_regrowth;
                this.forest_rule.资源再生.芦苇.value=data.reeds_regrowth;
                this.forest_rule.资源再生.棕榈松果树.value=data.palmconetree_regrowth;
                this.forest_rule.资源再生.月树.value=data.moon_tree_regrowth;
                this.forest_rule.资源再生.花.value=data.flowers_regrowth;
                this.forest_rule.资源再生.常青树.value=data.evergreen_regrowth;
                this.forest_rule.资源再生.桦栗树.value=data.deciduoustree_regrowth;
                this.forest_rule.资源再生.再生速度.value=data.regrowth;

                this.forest_rule.非自然传送门资源.传送频率.value=data.portal_spawnrate;
                this.forest_rule.非自然传送门资源.发光蟹.value=data.lightcrab_portalrate;
                this.forest_rule.非自然传送门资源.棕榈松果树芽.value=data.palmcone_seed_portalrate;
                this.forest_rule.非自然传送门资源.火药猴.value=data.powder_monkey_portalrate;
                this.forest_rule.非自然传送门资源.猴尾草.value=data.monkeytail_portalrate;
                this.forest_rule.非自然传送门资源.香蕉丛.value=data.bananabush_portalrate;

                this.forest_rule.敌对生物.蝙蝠.value=data.bats_setting;
                this.forest_rule.敌对生物.蜘蛛.value=data.spiders_setting;
                this.forest_rule.敌对生物.海象.value=data.walrus_setting;
                this.forest_rule.敌对生物.月亮码头海盗.value=data.pirateraids;
                this.forest_rule.敌对生物.恐怖猎犬.value=data.mutated_hounds;
                this.forest_rule.敌对生物.杀人蜂.value=data.wasps;
                this.forest_rule.敌对生物.月石企鸥.value=data.penguins_moon;
                this.forest_rule.敌对生物.猎犬.value=data.hound_mounds;
                this.forest_rule.敌对生物.破碎蜘蛛.value=data.moon_spider;
                this.forest_rule.敌对生物.蚊子.value=data.mosquitos;
                this.forest_rule.敌对生物.蜘蛛战士.value=data.spider_warriors;
                this.forest_rule.敌对生物.青蛙.value=data.frogs;
                this.forest_rule.敌对生物.鱼人.value=data.merms;
                this.forest_rule.敌对生物.食人花.value=data.lureplants;
                this.forest_rule.敌对生物.饼干切割机.value=data.cookiecutters;
                this.forest_rule.敌对生物.鱿鱼.value=data.squid;
                this.forest_rule.敌对生物.鲨鱼.value=data.sharks;

                this.forest_rule.巨兽.克劳斯.value=data.klaus;
                this.forest_rule.巨兽.帝王蟹.value=data.crabking;
                this.forest_rule.巨兽.恐怖之眼.value=data.eyeofterror;
                this.forest_rule.巨兽.果蝇王.value=data.fruitfly;
                this.forest_rule.巨兽.树精守卫.value=data.liefs;
                this.forest_rule.巨兽.毒桦栗树.value=data.deciduousmonster;
                this.forest_rule.巨兽.熊獾.value=data.bearger;
                this.forest_rule.巨兽.独眼巨鹿.value=data.deerclops;
                this.forest_rule.巨兽.蚁狮贡品.value=data.antliontribute;
                this.forest_rule.巨兽.蜂王.value=data.beequeen;
                this.forest_rule.巨兽.蜘蛛女王.value=data.spiderqueen;
                this.forest_rule.巨兽.邪天翁.value=data.malbatross;
                this.forest_rule.巨兽.麋鹿鹅.value=data.goosemoose;
                this.forest_rule.巨兽.龙蝇.value=data.dragonfly;
                this.forest_generate.全局.起始季节.value=data.season_start;
                if(data.season_start=='default')
                    this.forest_generate.全局.起始季节.display='秋';
                else if(data.season_start=='winter')
                    this.forest_generate.全局.起始季节.display='冬';
                else if(data.season_start=='spring')
                    this.forest_generate.全局.起始季节.display='春';
                else
                    this.forest_generate.全局.起始季节.display='夏';

                this.forest_generate.世界.生物群落.value=data.task_set;
                this.forest_generate.世界.出生点.value=data.start_location;
                this.forest_generate.世界.世界大小.value=data.world_size;
                this.forest_generate.世界.世界大小.display=data.world_size === 'default' ? '大' : data.world_size;
                this.forest_generate.世界.分支.value=data.branching;
                this.forest_generate.世界.环形.value=data.loop;
                this.forest_generate.世界.道路.value=data.roads;
                this.forest_generate.世界.试金石.value=data.touchstone;
                this.forest_generate.世界.失败的冒险家.value=data.boons;
                this.forest_generate.世界.开始资源多样化.value=data.prefabswaps_start;
                this.forest_generate.世界.天体裂隙.value=data.moon_fissure;
                this.forest_generate.世界.盒中泰拉.value=data.terrariumchest
                this.forest_generate.世界.舞台剧.value=data.stageplays;

                this.forest_generate.资源.仙人掌.value=data.cactus;
                this.forest_generate.资源.公牛海带茎.value=data.ocean_bullkelp;
                this.forest_generate.资源.尖刺灌木.value=data.marshbush;
                this.forest_generate.资源.巨石.value=data.rock;
                this.forest_generate.资源.月亮树苗.value=data.moon_sapling;
                this.forest_generate.资源.月亮石.value=data.moon_rock;
                this.forest_generate.资源.月树.value=data.moon_tree;
                this.forest_generate.资源.树苗.value=data.sapling;
                this.forest_generate.资源.所有树.value=data.trees;
                this.forest_generate.资源.棕榈松果树.value=data.palmconetree;
                this.forest_generate.资源.池塘.value=data.ponds;
                this.forest_generate.资源.流星区域.value=data.meteorspawner;
                this.forest_generate.资源.浆果丛.value=data.berrybush;
                this.forest_generate.资源.海岸公牛海带.value=data.moon_bullkelp;
                this.forest_generate.资源.海星.value=data.moon_starfish;
                this.forest_generate.资源.海蚀柱.value=data.ocean_seastack;
                this.forest_generate.资源.温泉.value=data.moon_hotspring;
                this.forest_generate.资源.燧石.value=data.flint;
                this.forest_generate.资源.石果灌木丛.value=data.moon_berrybush;
                this.forest_generate.资源.胡萝卜.value=data.carrot;
                this.forest_generate.资源.芦苇.value=data.reeds;
                this.forest_generate.资源.花和邪恶花.value=data.flowers;
                this.forest_generate.资源.草.value=data.grass;
                this.forest_generate.资源.蘑菇.value=data.mushroom;
                this.forest_generate.资源.迷你冰川.value=data.rock_ice;
                this.forest_generate.资源.风滚草.value=data.tumbleweed;

                this.forest_generate.生物以及刷新点.伏特羊.value=data.lightninggoat;
                this.forest_generate.生物以及刷新点.兔洞.value=data.rabbits;
                this.forest_generate.生物以及刷新点.沙拉蝾螈.value=data.moon_fruitdragon;
                this.forest_generate.生物以及刷新点.猪屋.value=data.pigs;
                this.forest_generate.生物以及刷新点.皮弗娄牛.value=data.beefalo;
                this.forest_generate.生物以及刷新点.秃鹫.value=data.buzzard;
                this.forest_generate.生物以及刷新点.空心树桩.value=data.catcoon;
                this.forest_generate.生物以及刷新点.胡萝卜鼠.value=data.moon_carrot;
                this.forest_generate.生物以及刷新点.蜜蜂蜂窝.value=data.bees;
                this.forest_generate.生物以及刷新点.鱼群.value=data.ocean_shoal;
                this.forest_generate.生物以及刷新点.鼹鼠丘.value=data.moles;
                this.forest_generate.生物以及刷新点.龙虾窝.value=data.ocean_wobsterden;

                this.forest_generate.敌对生物以及刷新点.发条装置.value=data.chess;
                this.forest_generate.敌对生物以及刷新点.杀人蜂蜂窝.value=data.angrybees;
                this.forest_generate.敌对生物以及刷新点.海草.value=data.ocean_waterplant;
                this.forest_generate.敌对生物以及刷新点.海象营地.value=data.walrus;
                this.forest_generate.敌对生物以及刷新点.漏雨的小屋.value=data.merm;
                this.forest_generate.敌对生物以及刷新点.猎犬丘.value=data.houndmound;
                this.forest_generate.敌对生物以及刷新点.破碎蜘蛛洞.value=data.moon_spiders;
                this.forest_generate.敌对生物以及刷新点.蜘蛛巢.value=data.spiders;
                this.forest_generate.敌对生物以及刷新点.触手.value=data.tentacles;
                this.forest_generate.敌对生物以及刷新点.高脚鸟.value=data.tallbirds;
            })
        },
        handleGetWorld2(){
            getWorld2().then(response=>{
                let data=response.data;

                this.cave_rule.世界.地震.value=data.earthquakes;
                this.cave_rule.世界.洞穴蠕虫攻击.value=data.wormattacks;
                this.cave_rule.世界.荒野裂隙开启.value=data.rifts_enabled_cave;
                this.cave_rule.世界.荒野裂隙频率.value=data.rifts_frequency_cave;
                this.cave_rule.世界.远古大门.value=data.atriumgate;
                this.cave_rule.世界.雨.value=data.weather;

                this.cave_rule.资源再生.再生速度.value=data.regrowth;
                this.cave_rule.资源再生.光虫花.value=data.lightflier_flower_regrowth;
                this.cave_rule.资源再生.月亮蘑菇树.value=data.mushtree_moon_regrowth;
                this.cave_rule.资源再生.荧光花.value=data.flower_cave_regrowth;
                this.cave_rule.资源再生.蘑菇树.value=data.mushtree_regrowth;

                this.cave_rule.生物.兔人.value=data.bunnymen_setting;
                this.cave_rule.生物.尘蛾.value=data.dustmoths;
                this.cave_rule.生物.猪.value=data.pigs_setting;
                this.cave_rule.生物.球状光虫.value=data.lightfliers;
                this.cave_rule.生物.石虾.value=data.rocky_setting;
                this.cave_rule.生物.穴居猴.value=data.monkey_setting;
                this.cave_rule.生物.草壁虎转化.value=data.grassgekkos;
                this.cave_rule.生物.蛞蝓龟.value=data.slurtles_setting;
                this.cave_rule.生物.蜗牛龟.value=data.snurtles;
                this.cave_rule.生物.蘑菇地精.value=data.mushgnome;
                this.cave_rule.生物.鼹鼠.value=data.moles_setting;

                this.cave_rule.敌对生物.喷射蜘蛛.value=data.spider_spitter;
                this.cave_rule.敌对生物.洞穴蜘蛛.value=data.spider_hider;
                this.cave_rule.敌对生物.穴居悬蛛.value=data.spider_dropper;
                this.cave_rule.敌对生物.蜘蛛.value=data.spiders_setting;
                this.cave_rule.敌对生物.蜘蛛战士.value=data.spider_warriors;
                this.cave_rule.敌对生物.蝙蝠.value=data.bats_setting;
                this.cave_rule.敌对生物.遗迹梦魇.value=data.nightmarecreatures;
                this.cave_rule.敌对生物.裸鼹蝠.value=data.molebats;
                this.cave_rule.敌对生物.鱼人.value=data.merms;

                this.cave_rule.巨兽.噩梦猪人.value=data.daywalker;
                this.cave_rule.巨兽.果蝇王.value=data.fruitfly;
                this.cave_rule.巨兽.树精守卫.value=data.liefs;
                this.cave_rule.巨兽.毒菌蟾蜍.value=data.toadstool;
                this.cave_rule.巨兽.蜘蛛女王.value=data.spiderqueen;

                this.cave_generate.世界.生物群落.value=data.task_set;
                this.cave_generate.世界.出生点.value=data.start_location;
                this.cave_generate.世界.世界大小.value=data.world_size;
                this.cave_generate.世界.分支.value=data.branching;
                this.cave_generate.世界.环形.value=data.loop;
                this.cave_generate.世界.试金石.value=data.touchstone;
                this.cave_generate.世界.失败的冒险家.value=data.boons;
                this.cave_generate.世界.洞穴光照.value=data.cavelight;
                this.cave_generate.世界.开始资源多样化.value=data.prefabswaps_start;

                this.cave_generate.资源.发光浆果.value=data.wormlights;
                this.cave_generate.资源.尖刺灌木.value=data.marshbush;
                this.cave_generate.资源.巨石.value=data.rock;
                this.cave_generate.资源.树苗.value=data.sapling;
                this.cave_generate.资源.所有树.value=data.trees;
                this.cave_generate.资源.池塘.value=data.cave_ponds;
                this.cave_generate.资源.洞穴蕨类.value=data.fern;
                this.cave_generate.资源.浆果丛.value=data.berrybush;
                this.cave_generate.资源.燧石.value=data.flint;
                this.cave_generate.资源.芦苇.value=data.reeds;
                this.cave_generate.资源.苔藓.value=data.lichen;
                this.cave_generate.资源.草.value=data.grass;
                this.cave_generate.资源.荧光花.value=data.flower_cave;
                this.cave_generate.资源.蘑菇.value=data.mushroom;
                this.cave_generate.资源.蘑菇树.value=data.mushtree;
                this.cave_generate.资源.香蕉.value=data.banana;
                
                this.cave_generate.生物以及刷新点.兔屋.value=data.bunnymen;
                this.cave_generate.生物以及刷新点.啜食者.value=data.slurper;
                this.cave_generate.生物以及刷新点.石虾.value=data.rocky;
                this.cave_generate.生物以及刷新点.穴居猴桶.value=data.monkey;
                this.cave_generate.生物以及刷新点.蛞蝓龟窝.value=data.slurtles;

                this.cave_generate.敌对生物以及刷新点.发条装置.value=data.chess;
                this.cave_generate.敌对生物以及刷新点.梦魇裂隙.value=data.fissure;
                this.cave_generate.敌对生物以及刷新点.洞穴蠕虫.value=data.worms;
                this.cave_generate.敌对生物以及刷新点.蛛网岩.value=data.cave_spiders;
                this.cave_generate.敌对生物以及刷新点.蜘蛛巢.value=data.spiders;
                this.cave_generate.敌对生物以及刷新点.蝙蝠.value=data.bats;
                this.cave_generate.敌对生物以及刷新点.触手.value=data.tentacles;
            })
        }
    },
    mounted(){
        // this.handleGetWorld();
        // this.handleGetWorld2();
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
#world-set{
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
.worldCard{
    flex-basis: calc(33.33% - 0.5vw);
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
</style>