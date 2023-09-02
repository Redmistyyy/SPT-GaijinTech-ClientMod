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
class ExecutiveTrader {
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
        this.traderHelper.registerProfileImage(baseJson, this.mod, preAkiModLoader, imageRouter, "executive.png");
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
        // Custom Item addition
        // Addition - Gaijin personal computer service
        this.fluentTraderAssortHeper.createSingleAssortItem('5734779624597737e04bf329')
            .addStackCount(99)
            .addMoneyCost(Money_1.Money.ROUBLES, 5000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem('573477e124597737dd42e191')
            .addStackCount(99)
            .addMoneyCost(Money_1.Money.ROUBLES, 10000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem('57347baf24597738002c6178')
            .addStackCount(99)
            .addMoneyCost(Money_1.Money.ROUBLES, 6000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem('57347ca924597744596b4e71')
            .addStackCount(99)
            .addMoneyCost(Money_1.Money.ROUBLES, 30000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem('57347c2e24597744902c94a1')
            .addStackCount(99)
            .addMoneyCost(Money_1.Money.ROUBLES, 3000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem('590c392f86f77444754deb29')
            .addStackCount(99)
            .addMoneyCost(Money_1.Money.ROUBLES, 5000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem('5734781f24597737e04bf32a')
            .addStackCount(99)
            .addMoneyCost(Money_1.Money.ROUBLES, 2000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem('590a386e86f77429692b27ab')
            .addStackCount(99)
            .addMoneyCost(Money_1.Money.ROUBLES, 2000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem('59e36c6f86f774176c10a2a7')
            .addStackCount(99)
            .addMoneyCost(Money_1.Money.ROUBLES, 200)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Addition - Gaijin quest service
        this.fluentTraderAssortHeper.createSingleAssortItem('5d03794386f77420415576f5')
            .addStackCount(99)
            .addMoneyCost(Money_1.Money.ROUBLES, 200000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem('5d0379a886f77420407aa271')
            .addStackCount(99)
            .addMoneyCost(Money_1.Money.ROUBLES, 100000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add some singular items to trader (items without sub-items e.g. milk/bandage)
        //this.traderHeper.addSingleItemsToTrader(tables, baseJson._id);
        // Add more complex items to trader (items with sub-items, e.g. guns)
        //this.traderHeper.addComplexItemsToTrader(tables, baseJson._id, jsonUtil);
        // Add trader to locale file, ensures trader text shows properly on screen
        // WARNING: adds the same text to ALL locales (e.g. chinese/french/english)
        this.traderHelper.addTraderToLocales(baseJson, tables, baseJson.name, "Executive", baseJson.nickname, baseJson.location, "CEO of Gaijin T&PMC, now coming to Tarkov, seems have cooperation with TerraGroup, but nobody knows what's going on because he decided to provide supply to PMCs.");
        this.logger.debug(`[${this.mod}] postDb Loaded`);
    }
}
module.exports = { mod: new ExecutiveTrader() };
