import { getModelForClass, prop } from "@typegoose/typegoose";

export class User {
  @prop({ required: true, type: String, min: 2, max: 50 })
  public fname!: string;
  @prop({ required: true, type: String, min: 2, max: 50 })
  public lname!: string;
  @prop({ required: true, type: String, max: 50 })
  public email!: string;
  @prop({ required: true, type: String, min: 6 })
  public password!: string;
  @prop({ required: true, type: String, default: "" })
  public picturePath!: string;
  @prop({ type: Array<User>, default: [] })
  public connections!: Array<User>;
  @prop({ type: String })
  public location!: string;
  @prop({ type: String })
  public occupation!: string;
  @prop({ type: Number })
  public viewedProfile!: number;
  @prop({ type: Number })
  public impressions!: number;
}

const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});

export default UserModel;
