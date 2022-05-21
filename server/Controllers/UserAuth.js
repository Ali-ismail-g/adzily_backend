const User = require("../Models/User")
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
//register a new user
exports.signup = async (req, res) => {
  const { body: { name,email,password },} = req;
  if (!email) {
     return res.status(422).send({ message: "Missing email." });
  }
  try{
      const existingUser = await User.findOne({ email }).exec();
      if (existingUser) {
         return res.status(409).send({ 
               message: "Email is already in use."
         });
       }
       
      const user = await new User({
         _id: new mongoose.Types.ObjectId,
         email:email,
         name:name,
         password:password
      }).save()
      return res.status(201).send({
        message: `User with ${email} has Successfully registered`
      });
  } catch(err){
      console.log(err)
      return res.status(500).send(err);
  }
}

  //signin an existing user
  exports.signin = async (req, res) => {
    const { email, password } = req.body;
    User.findOne({
      email: req.body.email,
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user) {
          return res.status(404).send({ message: "User Not Found" });
        }
        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "invalid password",
          });
        }
        let token = jwt.sign({ id: user.id }, process.env.secretOrPrivateKey, {
          expiresIn: 172800, //8 hours
        });
        //send the  token and user data to the client
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: token,
        });
      });
  };
  