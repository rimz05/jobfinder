import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Clerk user ID
    name: { type: String, default: '' },
    email: { type: String, required: true, unique: true },
    resume: { type: String, default: '' },
    image: { type: String, default: '' }
});

const User = mongoose.model('User', userSchema);

export default User;
