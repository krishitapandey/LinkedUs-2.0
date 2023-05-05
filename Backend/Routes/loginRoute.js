import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import Job from "../models/jobSchema.js";
// //DB
import DB from '../config/DB.js'

// //schema
import Login from "../models/login.js";



//login checking

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("password and email must be filled");
    }
    const userLogin = await Login.findOne({ email: email });
    if (!userLogin) {
      console.log("Please fill correct information");
    } else {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        console.log("Please fill correct information");
      } else {
        const token = await userLogin.generateAuthToken();
        res.status(200).json({ token: token }); // Include the token in the response
        }
    }
  } catch (err) {
    console.log(err);
  }
});

export default router ;
