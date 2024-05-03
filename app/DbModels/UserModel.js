const { model, models, Schema } = require("mongoose");


const schema = new Schema({
  // public_id: "dzjrhk6z3cduqmmvgejp"  ​​  ​​
  // secure_url: "https://res.cloudinary.com/dyu6r9geu/image/upload/v1699944107/dzjrhk6z3cduqmmvgejp.png"
  // ,IP: { type: String }

  ID: { type: Number },
  id  : { type: String },
  title: { type: String },
  des: { type: String },
  rem: { type: String },
  picurl: { type: String },

}, { timestamps: true });

// export const FeedbackModel = models?.FeedbackModel || model('Feedback', schema, 'Feedback');
// export const UserModel = models?.User || model('Users', schema, 'Users');
// export const UserModel = models?.User || model('User', schema);
export const User = models?.User || model('User', schema);

// let  FeedbackModel
// try {
//   FeedbackModel = model('Feed')
// } catch (error) {
//   FeedbackModel = model('Feed', schema)
// }