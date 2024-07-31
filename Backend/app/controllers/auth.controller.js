const { encrypt } = require('../help/help');
const { validateRegister, validateLogin } = require('../help/validator')
const db = require('../models/index')
const User = db.User
const { SequelizeUniqueConstraintError } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
    const { error, value } = validateRegister(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    try {
        let obj = req.body;
        obj.password = bcrypt.hashSync(obj.password, 10); //Secure storage password with 10 salt rounds
        await User.create(obj);
        res.status(200).send({ message: "User registered!" });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError' && err.errors[0].path === 'username') {
            return res.status(409).send({ message: "Username already exists" });
        }
        console.log(err);//Helps for debug
        res.status(500).send({ message: "Error occurred" });
    }
}

exports.login = async (req,res)=>{
    const {error, value} = validateLogin(req.body)
    if(error){
        return res.status(400).send(error)
    }
    try{
        const user = await User.findOne({where:{username:req.body.username}})
        if(!user){
            return res.status(409).send({message:"Wrong username or password!"}) //Do not show if there is a user with the name or not
                                                                                //so there cannot be a brute-force attack with known username
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(409).send({message:"Wrong username or password!"})
        }
        const payload ={
            id:encrypt(user.user_id) //Encrypt the user_id with encryption_key,shouldn't be known!
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET.toString(),{expiresIn:Math.floor(Date.now() / 1000) + (60 * 60)}) //Valid for 1 hour
        const response = {
            message:"Success",
            accessToken:accessToken
        }
        res.status(200).send(response) //Returns user's valid token after login
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Error occurred"})
    }

}

