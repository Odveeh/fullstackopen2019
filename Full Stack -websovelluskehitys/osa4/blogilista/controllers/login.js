const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const loginRouteri = require('express').Router()
const User = require('../models/user')


loginRouteri.post('/', async(req, res, next) => {

    console.log("login routeri post req for login");

    console.log("post requestbody login router: ", req.body);

    try{
        
        const saltROunds = 10;
        const pwHASH = await bcryptjs.hash(req.body.password, saltROunds);

        console.log("pwhash:", pwHASH);


        const user = new User({
            username: req.body.username,
            name: req.body.name,
            passwordHashi: pwHASH
        })

        const savedUser = await user.save();
        console.log("uusi käyttäjä lisätty!");

    res.json(savedUser)

    } catch (exception){
        console.log("käyttäjän lisääminen ei onnistunut", exception)
        next(exception)
    }

})



loginRouteri.get('/', async(req, res, next) => {

    console.log("loginrouteri get request for users");
    const users = await User.find({});

    console.log("käyttäjät: ", users);

    res.json(users);



})


module.exports = loginRouteri;


