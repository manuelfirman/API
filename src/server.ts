import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import fileUpload from "express-fileupload";
import "dotenv/config";
import { RoutesApp } from "./store/shared/routes/index.routes";
import { postgreSQLConnection } from "./socialmedia/config/postgreSQL";
import { mongoDBConnection } from "./store/config/mongo";

export class Server {
  private app = express();
  private port = process.env.PORT || 3000;
  private router = new RoutesApp();

  constructor(){
    this.database();
    this.middlewares();
    this.listen();
  }

  private database(){
    postgreSQLConnection.initialize();
    mongoDBConnection.connect();
  }

  private middlewares(){
    this.app.use(express.json());
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: './uploads'
    }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use("/api", this.router.routes());
    
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

  private listen(){
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    })
  }
}