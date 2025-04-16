const userModel = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const secretKey = process.env.SECRET_KEY;
const nodemailer = require("nodemailer");

  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const sendResetEmail = async (to, resetLink) => {
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Reset Your Password",
      html: `
        <p>Click the link to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    });
  };
  console.log("🔥 Controller file is being read");

const userController = {

  
    //Forget password
    forgetPassword: async (req, res) => {
      try {
        
        const { email } = req.body;
    
        const user = await userModel.findOne({ email });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const token = jwt.sign(
          { userId: user._id },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
    
        const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    
        await transporter.sendMail({
          from: `"Your App" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Reset Your Password",
          html: `
            <h3>Reset your password</h3>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link will expire in 1 hour.</p>
          `
        });
    
        return res.status(200).json({
          message: "Password reset link sent to your email.",
        });
    
      } catch (err) {
        console.error("❌ Error in forgetPassword:", err);
        return res.status(500).json({ message: "Server Error" });
      }
    },
    
  
    register: async (req,res) =>{
        try{
            const{name, email, profilePicture, password, role} = req.body;
            const existingUser = await userModel.findOne({email});
            if(existingUser){
                return res.status(409).json({message:"This email is already associated to another account!"});
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new userModel({
                name,
                email,
                profilePicture,
                password: hashedPassword,
                role
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
                expires: expiresIn,
                httpOnly: true,
                secure: true,
                sameSite : "none",
            })
            .status(200)
            .json({message: "Login Successful", user, "Token": token});
        }
        catch(error){
            console.log("Error logging in user",error);
            res.status(500).json({message: "Server Error"});

        }
    },
    getAllUsers: async (req, res) => {
        try {
          const users = await userModel.find();
          return res.status(200).json(users);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      },
      getUser: async (req, res) => {
        try {
          const user = await userModel.findById(req.params.id);
          return res.status(200).json(user);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      },
      updateAdminUser: async (req, res) => {
        try {
          const userId = req.params.Id;   //use authenticated user from middleware
      
          const updateFields = {};
      
          
          if (req.body.role) {
            updateFields.role = req.body.role;
          }
      
          const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updateFields,
            { new: true }
          );
      
          return res.status(200).json({
            user: updatedUser,
            message: "Profile updated successfully"
          });
        } catch (error) {
          console.error("Error updating user profile:", error);
          return res.status(500).json({ message: error.message });
        }
      },

      updateCurrentUser: async (req, res) => {
        try {
          const userId = req.user.userId;  // use authenticated user from middleware
      
          const updateFields = {};
      
            //Allow optional updates
          if (req.body.name) updateFields.name = req.body.name;
          if (req.body.email) updateFields.email = req.body.email;
          if (req.body.profilePicture) updateFields.profilePicture = req.body.profilePicture;
      
            //If password is being updated, hash it
          if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            updateFields.password = hashedPassword;
          }
    
          const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updateFields,
            { new: true }
          );
      
          return res.status(200).json({
            user: updatedUser,
            message: "Profile updated successfully"
          });
        } catch (error) {
          console.error("Error updating user profile:", error);
          return res.status(500).json({ message: error.message });
        }
      },
        // Change password
     
        //Delete a user

      deleteUser: async (req, res) => {
        try {
          const user = await userModel.findByIdAndDelete(req.params.id);
          return res.status(200).json({ user, msg: "User deleted successfully!" });
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      },
      getCurrentUser: async (req, res) => {
        try {
          const user = await userModel.findById(req.user.userId).select('-password');
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json({ message: "Server error" });
        }
      },
      
      
      
    };
    
    module.exports = userController;


 