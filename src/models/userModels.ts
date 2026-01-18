import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  profile_pic : {
     type : String,
     default : "https://example.com/"
  },

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  is_verified: {
    type: Boolean,
    default: false
  },

  is_admin: {
    type: Boolean,
    default: false
  },

  forgot_password_token: String,
  forgot_password_token_expiry: Date,
  verify_token: String,
  verify_token_expiry: Date
}, {timestamps : true});

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;