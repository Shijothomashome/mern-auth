// user model
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
},{
    timestamps: true
});

//  it's a pre-save hook, which means it will run before saving a document to the database.
userSchema.pre('save', async function (next){
    if (!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


// This is actually we are attaching functions to the schema
// checking password match during login, so here we are creating a function which returns true or false
userSchema.methods.matchPassword = async function (enterdPassword){
    return await bcrypt.compare(enterdPassword, this.password)
}

const User = mongoose.model('User', userSchema)
export default User;