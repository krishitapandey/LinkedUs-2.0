import express from "express";
import fs from "fs";
import multer from "multer";
const router = express.Router();
import Job from "../models/jobSchema.js";





// getting all jobs
router.get("/", (req, res) => {
  Job.find()
    .then((jobs) => res.json(jobs))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Define image variable
  
  const Storage=multer.diskStorage({
    destination: "upload",
    filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
  });

const upload = multer({
  storage: Storage,
  limits: { fileSize: 1024 * 1024 * 2 }, // Add limits for file size, if needed
  fileFilter: (req, file, callback) => {
    // Add fileFilter function to filter allowed file types, if needed
    if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
      callback(null, true);
    } else {
      console.log("Only jpg and png files are supported");
      callback(null, false);
    }
  },
}).single("image"); // Update field name to match client-side form or request

// posting a job

router.post("/", upload,(req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const salary = req.body.salary;
  const date = req.body.date;
  const image = req.file ? req.file.filename : null;

  if (!req.file) {
    return res.status(400).json({ message: "No file received" })};
  console.log("hello in");
  const newJob = new Job({
    title,
    description,
    salary,
    date,
    image: {
      data: req.file.filename,
      contentType: "image/png",
    },
  });
  console.log("hello iin");

  newJob
    .save()
    .then(() => res.json("Job posting added!"))
    .catch((err) => res.status(400).json("Error: " + err));
   
});

export default router;
