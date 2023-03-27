import { prop, getModelForClass } from "@typegoose/typegoose";

export class Post {
  @prop({ required: true })
  public userId!: string;
  @prop({ required: true, type: String })
  public fname!: string;
  @prop({ required: true, type: String })
  public lname!: string;
  @prop({ type: String })
  public location!: string;
  @prop({ type: String })
  public description!: string;
  @prop({ type: String })
  public picturePath!: string;
  @prop({ type: String })
  public userPicturePath!: string;
  @prop({ type: Map })
  public likes!: Map<string, boolean>;
  @prop({ type: Array<String>, default: [] })
  public comments!: Array<string>;
}

const PostModel = getModelForClass(Post, {
  schemaOptions: { timestamps: true },
});

export default PostModel;
