const mongoose = require("mongoose");
const { Schema } = mongoose;
// sub-document
const RecipientSchema = require("./Recipient");

const surverySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // this is how we create a sub-document in mongoose. Create a model in another file, call it in the main model,
  // and have the other model as the sub of the main model
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  // #1 this is how we make relations between collections. With the code below we are saying that every time this Schema
  // gets stored in the database, we assign a ID to this user, and that's the id of the user associated
  // #2 the underscore is a convention to express relationship
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surverySchema);
