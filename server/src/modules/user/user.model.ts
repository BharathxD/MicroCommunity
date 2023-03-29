import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import argon2 from "argon2";

@pre<User>("save", async function (this, next) {
  if (!this.isModified("password") || this.isNew) {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    return next();
  }
})
export class User {
  @prop({ required: true, type: String })
  public fname!: string;
  @prop({ required: true, type: String })
  public lname!: string;
  @prop({ required: true, type: String, unique: true })
  public email!: string;
  @prop({ required: true, type: String })
  public password!: string;
  @prop({ required: true, type: String })
  public picturePath!: string;
  @prop({ type: [String], default: [] })
  public connections?: Array<string>;
  @prop({ type: String })
  public location?: string;
  @prop({ type: String })
  public occupation?: string;
  @prop({ type: Number })
  public viewedProfile?: number;
  @prop({ type: Number })
  public impressions?: number;
  public async comparePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}

const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});

export default UserModel;
