import { AppInterface } from "./core/interfaces/app.interface";

process.env["NODE_CONFIG_DIR"] = __dirname + "/core/configs";

import compression from "compression";
import cookieParser from "cookie-parser";
import config from "config";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { connect, set } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as path from "path";
import * as fs from "fs";
import i18nMiddleware from "i18next-express-middleware";
import { default as i18n } from "i18next";
import Backend from "i18next-node-fs-backend";
import { LanguageDetector } from "i18next-express-middleware";
import { dbConnection } from "./core/databases/database.config";
import errorMiddleware from "./core/middlewares/error.middleware";
import { logger, stream } from "./core/utils/logger";
import contentNegotiationMiddleware from "./modules/common/middlewares/content.negotiation.middleware";
import corsMiddleware from "./modules/common/middlewares/cors.middleware";
import userAgent from "express-useragent";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import authMiddleware from "@/modules/auth/middlewares/auth.middleware";
import profileUploadRoute from "@/modules/common/upload-routes/profile.upload.routes";

class App implements AppInterface {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(schema: string, resolver: object) {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.env = process.env.NODE_ENV || "development";
    this.initializeI18n();
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.initGraphql(schema, resolver);

  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`====  typescript express.js  graphql  kick starter ====`);
      logger.info(`===== by yasin palizban ===== `);
      logger.info(`https://github.com/yasinpalizban`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);

    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private connectToDatabase(): void {
    if (this.env !== "production") {
      set("debug", true);
    }

    connect(dbConnection.url, dbConnection.options);

  }

  private initializeMiddlewares(): void {

    this.app.use(morgan(config.get("log.format"), { stream }));
    this.app.use(corsMiddleware);
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(userAgent.express());
    this.app.use("/public", express.static(path.join(__dirname, "public")));
    this.app.use(authMiddleware);
    this.app.use(contentNegotiationMiddleware);
    this.app.use(profileUploadRoute);

  }


  private initializeSwagger(): void {
    const options = {
      swaggerDefinition: {
        info: {
          title: "Graphql API",
          version: "1.0.0",
          description: "Example docs"
        }
      },
      apis: ["swagger.yaml"]
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }


  private initializeI18n(): void {

    i18n
      .use(Backend)
      .use(LanguageDetector)
      .init({
        lng: "en",
        whitelist: ["en", "fa"],
        fallbackLng: "en",
        // have a common namespace used around the full app
        ns: ["translation"],
        debug: false,
        backend: {
          loadPath: path.join(__dirname + "/locales/{{lng}}/{{ns}}.json")
          // jsonIndent: 2
        },
        preload: ["en", "fa"]
      });
    this.app.use(i18nMiddleware.handle(i18n));

  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private initGraphql(schema: string, resolver: object): void {

    try {
      this.app.use(
        "/graphql",
        graphqlHTTP({
          schema: buildSchema(schema),
          rootValue: resolver,
          graphiql: true,
          customFormatErrorFn: (error) => ({
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split("\n") : [],
            path: error.path
          })

          //  customFormatErrorFn(err) {
          // if (!err.originalError) {
          //   return err;
          // }
          //
          // // @ts-ignore
          // const data = err.originalError.data;
          // const message = err.message || "An error occurred.";
          // // @ts-ignore
          // const code = err.originalError.status || 500;
          //
          // return { message: message, status: code, data: data };


          //  }
        })
      );
    } catch (e) {
      console.log(e);
    }

  }

}

export default App;
