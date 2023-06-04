import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel