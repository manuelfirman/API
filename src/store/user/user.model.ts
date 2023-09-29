import { BaseSchema } from "store/shared/models/baseSchema";
import { IUser } from "./user.interface";
import mongoose from "mongoose";

export class UserSchema extends BaseSchema<IUser> {
  constructor() {
    super();

    this.schema.add({
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: { 
        type: String, 
        required: true 
      },
      role: {
        type: String,
        required: true,
        default: "USER",
        enum: ["ADMIN", "USER", "SELLER"],
      },
      image: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
    });
  }
}

export const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", new UserSchema().schema);