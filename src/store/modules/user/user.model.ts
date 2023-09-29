import { BaseSchema } from "../../shared/models/baseSchema";
import { IUser } from "./user.interface";
import mongoose from "mongoose";

export class UserSchema extends BaseSchema<IUser> {
  constructor() {
    super();

    this.schema.add({
      username: {
        type: String,
        required: true,
        unique: true,
        min: 4,
        max: 120,
        lowercase: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
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
      verified: {
        type: Boolean,
        default: false,
      },
      code: {
        type: String,
      },
      image: [
        {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      ],
    });
  }
}

export const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", new UserSchema().schema);