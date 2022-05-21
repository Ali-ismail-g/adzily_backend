const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String , required:true},
    email: {type:String , required:true,match: [emailRegex, "Please enter a valid email address"],},
    password:{type:String , required:true},
    todos: [{type: mongoose.Schema.Types.ObjectId, ref:'Todo'}]
});
UserSchema.pre('save', function(next)  {
    let user = this;
    bcrypt.hash(user.password, 10, function(error, hash) {
      if (error) {
        return next(error);
      } else {
        user.password = hash;
        next();
      }
    });
  });

module.exports = mongoose.model("User", UserSchema);