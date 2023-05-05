import React from "react";
import Applicants from "./Applicants";
import AdminNavbar from "../Components/AdminNavbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function JobApplication() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3800/api/applicants")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <AdminNavbar />
      <h1 style={{ textAlign: "center" }}>Job Applications</h1>
      <div
        style={{
         
        }}
      >
        {data.map((applicant) => {
          return (
            <Applicants
              key={applicant._id}
              name={applicant.name}
              Experience={applicant.experience}
              Skills={applicant.skills}
              Education={applicant.education}
              email={applicant.email}
            />
          );
        })}
      </div>
    </div>
  );
}
