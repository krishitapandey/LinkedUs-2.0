import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import Job from "../models/jobSchema.js";
// //DB
// import DB from '../database/app'

// //schema
import Login from "../models/login.js";


//to get the info fill by user
router.post("/", (req, res) => {
  const { name, email, password, repassword } = req.body;
  console.log(1);

  //checking if user fill all the info
  if (!name || !email || !password || !repassword) {
    return res.status(422).json({ error: "Please fill all info" });
  }
  console.log(1);

  Login.findOne({ email: email })
    .then((userExist) => {
      //checks whether the user has already made an account or not

      //if yes this executes
      if (userExist) {
        return res.status(422).json({ error: "already existed" });
      }

      //or else this one

      const newUser = new Login({ name, email, password, repassword });
      console.log(newUser);

      newUser
        .save()
        .then(() => {
          res.status(201).json({ message: "user registered" });
        })
        .catch((err) => res.status(500).json({ error: "failewed" }));
    })
    .catch((err) => {
      console.log(err);
    });
});




export default router ;
