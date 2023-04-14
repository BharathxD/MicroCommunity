import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";
import { User } from "../user/user.model";

@modelOptions({
  schemaOptions: { collection: "Post" },
  options: { allowMixed: 0 },
})
export class Post {
  @prop({ required: true, ref: () => User })
  public userId!: string;
  @prop({ required: true, type: String })
  public fname!: string;
  @prop({ required: true, type: String })
  public lname!: string;
  @prop({ type: String })
  public location?: string;
  @prop({ type: String })
  public description?: string;
  @prop({ type: String })
  public picturePath?: string;
  @prop({ type: String })
  public userPicturePath?: string;
  @prop({ type: Map<String, Boolean> })
  public likes!: Map<string, boolean>;
  @prop({ type: [String], default: [] })
  public comments?: Array<string>;
}

const PostModel = getModelForClass(Post, {
  schemaOptions: { timestamps: true },
});

export default PostModel;
