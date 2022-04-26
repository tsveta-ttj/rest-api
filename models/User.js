const { model, Schema, Types: { ObjectId } } = require('mongoose');
const userSchema = new Schema({
    email: { type: String, required: [true, 'Email is required'] },
    username : { type: String, required: [true, 'Username is required'] },
    hashedPassword: { type: String, required: [true, 'Password is required']  },
    products:{type: [ObjectId], ref: 'Item', default: []},
    
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 1
    }
});

const User = model('User', userSchema);

module.exports = User;