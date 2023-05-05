import React from "react";
import "../CSS files/JobPosting.css";
import AdminNavbar from "../Components/AdminNavbar";
import axios from "axios";

export default function JobPosting() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [image, setImage] = React.useState(null);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("salary", salary);
    formData.append("date", date);
    formData.append("image", image);
    try {
      console.log("hell");
      const res = await axios.post(
        "http://localhost:3800/api/jobs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("hell");
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };
  return (
    <div>
      <AdminNavbar />
      <div
        className="Job-post"
        style={{
          paddingTop: "10%",
          height: "75vh",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Post A Job
        </h1>
        <form action="none">
          <input
            type="text"
            placeholder="Enter Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Job Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              height: "10rem",
            }}
          />
          <input
            type="date"
            placeholder="Enter Job Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            name="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit" onClick={handleSubmit}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
