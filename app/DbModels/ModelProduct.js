// const { model, models, Schema } = require("mongoose");
import mongoose, { model, models, Schema } from 'mongoose'

mongoose.pluralize(null)
// const schema = mongoose.Schema;

const schema = new Schema({
  // "ID" int(11) NOT NULL,
  // "Title" varchar(50) NOT NULL,
  // "Des" varchar(50) NOT NULL,
  // "Rem" varchar(50) NOT NULL,
  // "PicURL" varchar(50) NOT NULL,
  // "Unit" varchar(10) NOT NULL,
  // "PPrice" decimal(10,2) NOT NULL,
  // "SPrice" decimal(10,2) NOT NULL,
  // "PBal" int(11) NOT NULL,
  // "CBal" int(11) NOT NULL

 ID:{type: Number} ,
 Title:{type: String} ,
 Cat:{type: String} ,
 Desc:{type: String} ,
 Rem:{type: String} ,
 PicURL:{type: String} ,
 Unit:{type: String} ,
 PPrice:{type: Number },
 SPrice:{type: Number },
 PBal:{type: Number },
 CBal:{type: Number },

})

// // var M = mongoose.model('RecOfItemModel', schema, ActualDatabaseCollectionOrTableName);
// const Items = mongoose.model('ModelItem', schema, 'Items');
// export default Items;

// export const User = models?.User || model('User', schema);
const ModelProduct = models?.ModelProduct || model('ModelProduct', schema, 'Products');
export default  ModelProduct