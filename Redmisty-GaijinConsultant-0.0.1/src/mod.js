"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
// New trader settings
const baseJson = __importStar(require("../db/base.json"));
const traderHelpers_1 = require("./traderHelpers");
const fluentTraderAssortCreator_1 = require("./fluentTraderAssortCreator");
const Money_1 = require("C:/snapshot/project/obj/models/enums/Money");
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
// Test settings
const pkg = __importStar(require("../package.json"));
class ConsultantTrader {
    constructor() {
        this.mod = `${pkg.author}-${pkg.name}-${pkg.version}`; // Set name of mod so we can log it to console later
    }
    /**
     * Some work needs to be done prior to SPT code being loaded, registering the profile image + setting trader update time inside the trader config json
     * @param container Dependency container
     */
    preAkiLoad(container) {
        // Get a logger
        this.logger = container.resolve("WinstonLogger");
        this.logger.debug(`[${this.mod}] preAki Loading... `);
        // Get SPT code/data we need later
        const preAkiModLoader = container.resolve("PreAkiModLoader");
        const imageRouter = container.resolve("ImageRouter");
        const hashUtil = container.resolve("HashUtil");
        const configServer = container.resolve("ConfigServer");
        const traderConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        // Create helper class and use it to register our traders image/icon + set its stock refresh time
        this.traderHelper = new traderHelpers_1.TraderHelper();
        this.fluentTraderAssortHeper = new fluentTraderAssortCreator_1.FluentAssortConstructor(hashUtil, this.logger);
        this.traderHelper.registerProfileImage(baseJson, this.mod, preAkiModLoader, imageRouter, "consultant.png");
        this.traderHelper.setTraderUpdateTime(traderConfig, baseJson, 3600);
        // Add trader to trader enum
        Traders_1.Traders[baseJson._id] = baseJson._id;
        this.logger.debug(`[${this.mod}] preAki Loaded`);
    }
    /**
     * Majority of trader-related work occurs after the aki database has been loaded but prior to SPT code being run
     * @param container Dependency container
     */
    postDBLoad(container) {
        this.logger.debug(`[${this.mod}] postDb Loading... `);
        // Resolve SPT classes we'll use
        const databaseServer = container.resolve("DatabaseServer");
        const configServer = container.resolve("ConfigServer");
        const jsonUtil = container.resolve("JsonUtil");
        // Get a reference to the database tables
        const tables = databaseServer.getTables();
        // Add new trader to the trader dictionary in DatabaseServer - has no assorts (items) yet
        this.traderHelper.addTraderToDb(baseJson, tables, jsonUtil);
        // Addition - Weapon - Gaijin WW2 series weapons vanilla
        // Mosin 7.62x54R bolt-action rifle (Sniper)
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets['5c0c1f2b86f77455912eaefc']._items)
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 40000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin 7.62x54R bolt-action rifle (Infantry)
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets['5c0c1e7486f7744dba7a289b']._items)
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 35000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // PPSh-41 7.62x25 submachine gun
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets['5eb2963686f7742d3f5ab0f8']._items)
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 35000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Simonov SKS 7.62x39 carbine
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets['58dffce486f77409f40f8162']._items)
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 35000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // TT-33 7.62x25 TT pistol
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets['58414a2724597759b344da4d']._items)
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 8000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // TT-33 7.62x25 TT pistol (Golden)
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets['5b44abe986f774283e2e3512']._items)
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 50000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Addition - Module - Gaijin WW2 series weapons vanilla
        // Mosin Rifle 7.62x54R 5-round magazine
        this.fluentTraderAssortHeper.createSingleAssortItem('5ae0973a5acfc4001562206c')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 2000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle Kochetov mount 
        this.fluentTraderAssortHeper.createSingleAssortItem('5b3f7bf05acfc433000ecf6b')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 10000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle Bramit 7.62x54R sound suppressor 
        this.fluentTraderAssortHeper.createSingleAssortItem('5b86a0e586f7745b600ccb23')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 30000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle ProMag Archangel OPFOR PRS chassis
        this.fluentTraderAssortHeper.createSingleAssortItem('5bae13bad4351e00320204af')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 30000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle ProMag Archangel OPFOR 10-round magazine
        this.fluentTraderAssortHeper.createSingleAssortItem('5bae13ded4351e44f824bf38')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 5000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle AIM Sports Tri-Rail mount
        this.fluentTraderAssortHeper.createSingleAssortItem('5bbdb811d4351e45020113c7')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 8000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle AIM Sports Recoil Pad
        this.fluentTraderAssortHeper.createSingleAssortItem('5bbde409d4351e003562b036')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 10000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle AIM Sports MNG rail mount
        this.fluentTraderAssortHeper.createSingleAssortItem('5bc5a372d4351e44f824d17f')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 10000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle ATI Monte Carlo chassis 
        this.fluentTraderAssortHeper.createSingleAssortItem('5bbdb870d4351e00367fb67d')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 10000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle Tacfire Tanker Style 7.62x54R muzzle brake  
        this.fluentTraderAssortHeper.createSingleAssortItem('5bbdb83fd4351e44f824c44b')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 3000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle Tacfire pistol grip
        this.fluentTraderAssortHeper.createSingleAssortItem('5bbde41ed4351e003562b038')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 2000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle Texas Precision Products 7.62x54R muzzle brake
        this.fluentTraderAssortHeper.createSingleAssortItem('5bc5a351d4351e003477a414')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 2000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle Witt Machine 7.62x54R muzzle brake
        this.fluentTraderAssortHeper.createSingleAssortItem('5bc5a35cd4351e450201232f')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 2000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle Weapon Tuning 7.62x39 thread adapter
        this.fluentTraderAssortHeper.createSingleAssortItem('5cf67a1bd7f00c06585fb6f3')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 5000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle Kiba Arms 7.62x54R custom thread adapter
        this.fluentTraderAssortHeper.createSingleAssortItem('5cf79389d7f00c10941a0c4d')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 5000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle Tiger Rock 7.62x51 thread adapter
        this.fluentTraderAssortHeper.createSingleAssortItem('5cf79599d7f00c10875d9212')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 7000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Mosin Rifle Arbalet Patriot K+W rail mount
        this.fluentTraderAssortHeper.createSingleAssortItem('5d024f5cd7ad1a04a067e91a')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 7000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // PPSh-41 7.62x25 35-round magazine
        this.fluentTraderAssortHeper.createSingleAssortItem('5ea034eb5aad6446a939737b')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 2000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // PPSh-41 7.62x25 71-round drum magazine
        this.fluentTraderAssortHeper.createSingleAssortItem('5ea034f65aad6446a939737e')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 5000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // SKS TOZ wooden stock (56-A-231 Sb.5)
        this.fluentTraderAssortHeper.createSingleAssortItem('574dad8024597745964bf05c')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 10000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // SKS ProMag SKS-A5 20-round magazine
        this.fluentTraderAssortHeper.createSingleAssortItem('587df583245977373c4f1129')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 3000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // SKS ProMag AALVX 35-round magazine
        this.fluentTraderAssortHeper.createSingleAssortItem('5c5970672e221602b21d7855')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 5000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // SKS Leapers UTG SOCOM rail mount
        this.fluentTraderAssortHeper.createSingleAssortItem('593d1fa786f7746da62d61ac')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 6000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // SKS Hexagon 7.62x39 sound suppressor
        this.fluentTraderAssortHeper.createSingleAssortItem('593d490386f7745ee97a1555')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 10000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // SKS TAPCO Intrafuse chassis
        this.fluentTraderAssortHeper.createSingleAssortItem('5afd7ded5acfc40017541f5e')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 20000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // SKS TAPCO Intrafuse buffer tube
        this.fluentTraderAssortHeper.createSingleAssortItem('5afd7e095acfc40017541f61')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 2000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // SKS TAPCO Intrafuse kit SAW-Style pistol grip
        this.fluentTraderAssortHeper.createSingleAssortItem('5afd7e445acfc4001637e35a')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 2000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // SKS Weapon Tuning 7.62x39 thread adapter
        this.fluentTraderAssortHeper.createSingleAssortItem('5cf67cadd7f00c065a5abab7')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 4000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // SKS FAB Defense UAS chassis
        this.fluentTraderAssortHeper.createSingleAssortItem('5d0236dad7ad1a0940739d29')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 13000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // SKS/VZ-58 FAB Defense AG-58 pistol grip
        this.fluentTraderAssortHeper.createSingleAssortItem('5d023784d7ad1a049d4aa7f2')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 3000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // SKS KCI 75-round drum magazine
        this.fluentTraderAssortHeper.createSingleAssortItem('61695095d92c473c7702147a')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 8000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // TT 7.62x25 121mm homespun threaded barrel 
        this.fluentTraderAssortHeper.createSingleAssortItem('571a279b24597720b4066566')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 2000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // TT 7.62x25 116mm gilded barrel                            
        this.fluentTraderAssortHeper.createSingleAssortItem('5b3baf8f5acfc40dc5296692')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 2000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // TT 7.62x25 makeshift sound suppressor
        this.fluentTraderAssortHeper.createSingleAssortItem('571a28e524597720b4066567')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 4000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // TT 7.62x25 tt-105 8-round magazine
        this.fluentTraderAssortHeper.createSingleAssortItem('571a29dc2459771fb2755a6a')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 500)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Addition - ammo - Gaijin WW2 series weapons vanilla                
        // 7.62x54mm R SNB gzh ammo pack (30 pcs)
        this.fluentTraderAssortHeper.createSingleAssortItem('560d75f54bdc2da74d8b4573')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 1200)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x54mm R LPS gzh
        this.fluentTraderAssortHeper.createSingleAssortItem('5887431f2459777e1612938f')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 50)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x54mm R PS gzh
        this.fluentTraderAssortHeper.createSingleAssortItem('59e77a2386f7742ee578960a')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 50)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x54mm R T-46M gzh
        this.fluentTraderAssortHeper.createSingleAssortItem('5e023cf8186a883be655e54f')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 65)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x54mm R BT gzh            
        this.fluentTraderAssortHeper.createSingleAssortItem('5e023d34e8a400319a28ed44')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 65)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x54mm R BS gs 
        this.fluentTraderAssortHeper.createSingleAssortItem('5e023d48186a883be655e551')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 70)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x54mm R BS ammo pack (20 pcs)
        this.fluentTraderAssortHeper.createSingleAssortItem('648984b8d5b4df6140000a1a')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 1600)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x39mm PS gzh ammo pack (30 pcs)                    
        this.fluentTraderAssortHeper.createSingleAssortItem('5649ed104bdc2d3d1c8b458b')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 1600)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x39mm BP gzh
        this.fluentTraderAssortHeper.createSingleAssortItem('59e0d99486f7744a32234762')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 70)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x39mm T-45M1 gzh
        this.fluentTraderAssortHeper.createSingleAssortItem('59e4cf5286f7741778269d8a')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 60)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x39mm US gzh
        this.fluentTraderAssortHeper.createSingleAssortItem('59e4d24686f7741776641ac7')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 75)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x39mm HP
        this.fluentTraderAssortHeper.createSingleAssortItem('59e4d3d286f774176a36250a')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 75)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x39mm MAI AP ammo pack (30 pcs)
        this.fluentTraderAssortHeper.createSingleAssortItem('6489851fc827d4637f01791b')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 2000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x51mm M80
        this.fluentTraderAssortHeper.createSingleAssortItem('58dd3ad986f77403051cba8f')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 80)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x51mm M61
        this.fluentTraderAssortHeper.createSingleAssortItem('5a6086ea4f39f99cd479502f')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 85)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x51mm M62 Tracer
        this.fluentTraderAssortHeper.createSingleAssortItem('5a608bf24f39f98ffc77720e')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 85)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x51mm BCP FMJ 
        this.fluentTraderAssortHeper.createSingleAssortItem('5e023e53d4353e3302577c4c')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 85)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x51mm TCW SP
        this.fluentTraderAssortHeper.createSingleAssortItem('5e023e6e34d52a55c3304f71')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 100)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x51mm Ultra Nosler
        this.fluentTraderAssortHeper.createSingleAssortItem('5e023e88277cce2b522ff2b1')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 120)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x51mm M993 ammo pack (20 pcs)
        this.fluentTraderAssortHeper.createSingleAssortItem('648984e3f09d032aa9399d53')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 3000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x25mm TT AKBS
        this.fluentTraderAssortHeper.createSingleAssortItem('5735fdcd2459776445391d61')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 30)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x25mm TT FMJ43       
        this.fluentTraderAssortHeper.createSingleAssortItem('5735ff5c245977640e39ba7e')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 30)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x25mm TT LRN
        this.fluentTraderAssortHeper.createSingleAssortItem('573601b42459776410737435')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 40)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x25mm TT LRNPC
        this.fluentTraderAssortHeper.createSingleAssortItem('573602322459776445391df1')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 40)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x25mm TT P gl
        this.fluentTraderAssortHeper.createSingleAssortItem('5736026a245977644601dc61')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 40)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x25mm TT Pst gzh
        this.fluentTraderAssortHeper.createSingleAssortItem('573603562459776430731618')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 40)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // 7.62x25mm TT PT gzh                                               
        this.fluentTraderAssortHeper.createSingleAssortItem('573603c924597764442bd9cb')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 40)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Addition - grads - Gaijin WW2 series weapons vanilla
        // F-1 hand grenade
        this.fluentTraderAssortHeper.createSingleAssortItem('5710c24ad2720bc3458b45a3')
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 1000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add glock as money purchase
        // this.fluentTraderAssortHeper.createComplexAssortItem(this.traderHelper.createGlock())
        //.addUnlimitedStackCount()
        //.addMoneyCost(Money.ROUBLES, 20000)
        //.addBuyRestriction(3)
        //.addLoyaltyLevel(1)
        //.export(tables.traders[baseJson._id]);
        // Add mp133 preset as mayo barter
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets["584148f2245977598f1ad387"]._items)
            .addStackCount(200)
            .addBarterCost("5bc9b156d4351e00367fbce9", 1)
            .addBuyRestriction(3)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add some singular items to trader (items without sub-items e.g. milk/bandage)
        //this.traderHeper.addSingleItemsToTrader(tables, baseJson._id);
        // Add more complex items to trader (items with sub-items, e.g. guns)
        //this.traderHeper.addComplexItemsToTrader(tables, baseJson._id, jsonUtil);
        // Add trader to locale file, ensures trader text shows properly on screen
        // WARNING: adds the same text to ALL locales (e.g. chinese/french/english)
        this.traderHelper.addTraderToLocales(baseJson, tables, baseJson.name, "Consultant", baseJson.nickname, baseJson.location, "Military consultant for Gaijin T&PMC, always bring us with benefits from Seversk-13.");
        this.logger.debug(`[${this.mod}] postDb Loaded`);
    }
}
module.exports = { mod: new ConsultantTrader() };
