import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connect from "./config/DB.js";
import jobRoute from "./Routes/jobRoute.js";
import ApplicantRoute from "./Routes/FormRoute.js";
import loginRoute from "./Routes/loginRoute.js";
import RegisterRoute from "./Routes/RegisterRoute.js";

const app = express();
const port = 3800;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the job portal");
});

connect();

app.use("/api/jobs", jobRoute);
app.use("/api/applicants", ApplicantRoute);
app.use("/Login", loginRoute);
app.use("/api/Register", RegisterRoute);
app.use("/Jobposting", jobRoute);