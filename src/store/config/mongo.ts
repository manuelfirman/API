import mongoose from "mongoose";

export class MongoDBConnection {
  private DB_URI: string;
  private connection: mongoose.Connection | null;

  constructor(){
    this.DB_URI = process.env.MONGODB_URI as string;
    this.connection = null;
  }

  async connect(): Promise<void> {
    await mongoose.connect(this.DB_URI)
      .then((db) => {
        this.connection = db.connection;
        console.log("MongoDB Database connected");
      })
      .catch((error) => console.log(error));
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.close()
        .then(() => console.log("MongoDB Database disconnected"))
        .catch((error) => console.log(error));
    }
  }
}

export const mongoDBConnection = new MongoDBConnection();