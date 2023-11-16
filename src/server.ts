import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import fileUpload from "express-fileupload";
import "dotenv/config";
import { RoutesAppStore } from "./store/shared/routes/store.routes";
import { postgreSQLConnection } from "./socialmedia/config/postgreSQL";
import { mongoDBConnection } from "./store/config/mongo";
import { RoutesAppSocialMedia } from "./socialmedia/shared/routes/socialmedia.routes";
import { storeOptions } from "./store/docs/storeSwaggerOptions";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { socialOptions } from "./socialmedia/docs/socialSwaggerOptions";

export class Server {
  private app = express();
  private port = process.env.PORT || 3000;
  private routerStore = new RoutesAppStore();
  private routerSocialMedia = new RoutesAppSocialMedia();

  constructor(){
    this.database();
    this.middlewares();
    this.listen();
    this.docs();
  }

  private database(){
    postgreSQLConnection.initialize();
    mongoDBConnection.connect();
  }

  private middlewares(){
    this.app.use(express.json());
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: "./uploads"
    }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use("/api/store", this.routerStore.routes());
    this.app.use("/api/social", this.routerSocialMedia.routes());
    
    this.app.use(cors({
      origin: "*",
      methods: "GET, POST, PUT, DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true
    }));
    
    this.app.use(
      session({
        secret: process.env.SECRET_KEY as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 30000000000000, 
          httpOnly: true
        },
      })
    );
  }

  private docs(){
    const specsSocial = swaggerJsDoc(socialOptions);
    this.app.use("/api/docs/social", swaggerUi.serve, swaggerUi.setup(specsSocial));
    const specsStore = swaggerJsDoc(storeOptions);
    this.app.use("/api/docs/store", swaggerUi.serve, swaggerUi.setup(specsStore));
  }

  private listen(){
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}