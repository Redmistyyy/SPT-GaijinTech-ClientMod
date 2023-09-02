import { DependencyContainer } from "tsyringe";

// SPT types
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";

// New trader settings
import * as baseJson from "../db/base.json";
import { TraderHelper } from "./traderHelpers";
import { FluentAssortConstructor } from "./fluentTraderAssortCreator";
import { Money } from "@spt-aki/models/enums/Money";
import { Traders } from "@spt-aki/models/enums/Traders";
import { HashUtil } from "@spt-aki/utils/HashUtil";

// Test settings
import * as pkg from "../package.json";

class ExecutiveTrader implements IPreAkiLoadMod, IPostDBLoadMod
{
    private mod: string
    private logger: ILogger
    private traderHelper: TraderHelper
    private fluentTraderAssortHeper: FluentAssortConstructor

    constructor() {
        this.mod = `${pkg.author}-${pkg.name}-${pkg.version}`; // Set name of mod so we can log it to console later
    }

    /**
     * Some work needs to be done prior to SPT code being loaded, registering the profile image + setting trader update time inside the trader config json
     * @param container Dependency container
     */
    public preAkiLoad(container: DependencyContainer): void
    {
        // Get a logger
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.logger.debug(`[${this.mod}] preAki Loading... `);

        // Get SPT code/data we need later
        const preAkiModLoader: PreAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        const imageRouter: ImageRouter = container.resolve<ImageRouter>("ImageRouter");
        const hashUtil: HashUtil = container.resolve<HashUtil>("HashUtil");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const traderConfig: ITraderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);

        // Create helper class and use it to register our traders image/icon + set its stock refresh time
        this.traderHelper = new TraderHelper();
        this.fluentTraderAssortHeper = new FluentAssortConstructor(hashUtil, this.logger);
        this.traderHelper.registerProfileImage(baseJson, this.mod, preAkiModLoader, imageRouter, "executive.png");
        this.traderHelper.setTraderUpdateTime(traderConfig, baseJson, 3600);

        // Add trader to trader enum
        Traders[baseJson._id] = baseJson._id;

        this.logger.debug(`[${this.mod}] preAki Loaded`);
    }
    
    /**
     * Majority of trader-related work occurs after the aki database has been loaded but prior to SPT code being run
     * @param container Dependency container
     */
    public postDBLoad(container: DependencyContainer): void
    {
        this.logger.debug(`[${this.mod}] postDb Loading... `);

        // Resolve SPT classes we'll use
        const databaseServer: DatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const configServer: ConfigServer = container.resolve<ConfigServer>("ConfigServer");
        const jsonUtil: JsonUtil = container.resolve<JsonUtil>("JsonUtil");

        // Get a reference to the database tables
        const tables = databaseServer.getTables();

        // Add new trader to the trader dictionary in DatabaseServer - has no assorts (items) yet
        this.traderHelper.addTraderToDb(baseJson, tables, jsonUtil);

        // Custom Item addition
        
        // Addition - Gaijin personal computer service
        this.fluentTraderAssortHeper.createSingleAssortItem('5734779624597737e04bf329')
                                    .addStackCount(99)
                                    .addMoneyCost(Money.ROUBLES, 5000)
                                    .addLoyaltyLevel(1)
                                    .export(tables.traders[baseJson._id]);

        this.fluentTraderAssortHeper.createSingleAssortItem('573477e124597737dd42e191')
                                    .addStackCount(99)
                                    .addMoneyCost(Money.ROUBLES, 10000)
                                    .addLoyaltyLevel(1)
                                    .export(tables.traders[baseJson._id]);

        this.fluentTraderAssortHeper.createSingleAssortItem('57347baf24597738002c6178')
                                    .addStackCount(99)
                                    .addMoneyCost(Money.ROUBLES, 6000)
                                    .addLoyaltyLevel(1)
                                    .export(tables.traders[baseJson._id]);
        
        this.fluentTraderAssortHeper.createSingleAssortItem('57347ca924597744596b4e71')
                                    .addStackCount(99)
                                    .addMoneyCost(Money.ROUBLES, 30000)
                                    .addLoyaltyLevel(1)
                                    .export(tables.traders[baseJson._id]);

        this.fluentTraderAssortHeper.createSingleAssortItem('57347c2e24597744902c94a1')
                                    .addStackCount(99)
                                    .addMoneyCost(Money.ROUBLES, 3000)
                                    .addLoyaltyLevel(1)
                                    .export(tables.traders[baseJson._id]);

        this.fluentTraderAssortHeper.createSingleAssortItem('590c392f86f77444754deb29')
                                    .addStackCount(99)
                                    .addMoneyCost(Money.ROUBLES, 5000)
                                    .addLoyaltyLevel(1)
                                    .export(tables.traders[baseJson._id]);

        this.fluentTraderAssortHeper.createSingleAssortItem('5734781f24597737e04bf32a')
                                    .addStackCount(99)
                                    .addMoneyCost(Money.ROUBLES, 2000)
                                    .addLoyaltyLevel(1)
                                    .export(tables.traders[baseJson._id]);

        this.fluentTraderAssortHeper.createSingleAssortItem('590a386e86f77429692b27ab')
                                    .addStackCount(99)
                                    .addMoneyCost(Money.ROUBLES, 2000)
                                    .addLoyaltyLevel(1)
                                    .export(tables.traders[baseJson._id]);        

        this.fluentTraderAssortHeper.createSingleAssortItem('59e36c6f86f774176c10a2a7')
                                    .addStackCount(99)
                                    .addMoneyCost(Money.ROUBLES, 200)
                                    .addLoyaltyLevel(1)
                                    .export(tables.traders[baseJson._id]);  
        
        // Addition - Gaijin quest service
        this.fluentTraderAssortHeper.createSingleAssortItem('5d03794386f77420415576f5')
                                    .addStackCount(99)
                                    .addMoneyCost(Money.ROUBLES, 200000)
                                    .addLoyaltyLevel(1)
                                    .export(tables.traders[baseJson._id]);  

        this.fluentTraderAssortHeper.createSingleAssortItem('5d0379a886f77420407aa271')
                                    .addStackCount(99)
                                    .addMoneyCost(Money.ROUBLES, 100000)
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

module.exports = { mod: new ExecutiveTrader() }