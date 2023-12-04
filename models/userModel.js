import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },  
    password: { type: String },    
    image: String,
    role: { type: String, default: "user" },
    provider:{type:String, default:"credentials"}
},{timestamps: true})

export default mongoose.models.User || mongoose.model("User", userSchema)


// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     email: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     }
//   },
//   { timestamps: true }
// );

// //If the User collection does not exist create a new one.
// export default mongoose.models.User || mongoose.model("User", userSchema);
