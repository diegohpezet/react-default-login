const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator'),
    bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true },
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: {type: String, required: true },
    profilePicture: {type: String}
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.pre('save', { document: true, query: false }, function(next) {
    if(!this.isModified('password')) {
 	   return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = function(plaintext,  callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model('User', UserSchema);