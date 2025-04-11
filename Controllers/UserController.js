const userModel = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY;
const userController = {
    register: async (req,res) =>{
        try{
            const{email,password,name,phone,role,age} = req.body;
            const existingUser = await userModel.findOne({email});
            if(existingUser){
                return res.status(409).json({message:"This email is already associated to another account!"});
            }
            const hashedPassword = bcrypt.hash(password, 10);

            const newUser = new userModel({
                email,
                password: hashedPassword,
                name,
                phone,
                role,
                age
            });

            await newUser.save();
            res.status(201).json({ message: "User registered successfully" });
        }
        catch(error){
            console.error("Error registering user",error);
            res.status(500).json({ message: "Server Error"});
        }

    },
    login: async (req,res) =>{
        try{
            const {email,password} = req.body;
            const user = await userModel.findOne({email});
            if(!user){
                return res.status(404).json({message:"User not found!"});
            }
            const passwordMatch = await bcrypt.compare(password,user.password);
            if(!passwordMatch){
                return res.status(401).json({message:"Invalid password!"});
            }

            const currentDateTime = new Date();
            const expiresIn = new Date(+currentDateTime + 1800000);
            const token = jwt.sign(
                { user: { userId: user._id, role: user.role } },
                secretKey,
                {
                  expiresIn: 3 * 60 * 60,
                }
              );
            return res
            .cookie("token", token,{
                expres: expiresIn,
                httpOnly: true,
                secure: true,
                sameSite : "none",
            })
            .status(200)
            .json({message: "Login Successful", user})
        }
        catch(error){
            console.log("Error logging in user",error);
            res.status(500).json({message: "Server Error"});

        }
    }


 }