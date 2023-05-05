import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS files/Register.css";
import axios from "axios";
import Navigation_Bar from "../Components/Navigation_Bar";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrePassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (password !== repassword) {
      alert("password and repassword do not match");
      return;
    }

    const requestData = {
      name,
      email,
      password,
      repassword
    };

    try {
      console.log("error")
      const response = await axios.post("http://localhost:3800/api/Register", requestData);
      console.log(response.data);
      alert("success");
      navigate("/login");
    } catch (e) {
      console.log(e);
      alert("failed");
    }
  };

  
         



  return (
    <div>
      <div className="layout">
        <Navigation_Bar
        name="Login"
        />
        <div className="Register_page">
          <h1>Sign Up</h1>
          <form onSubmit={submit}>
            <div className="input">
              <input type="text"  name= "name" placeholder="Full Name"
              value={name}onChange={(e) => setName(e.target.value)}
              ></input>
              <input type="email"  name= "email" placeholder=" Email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="input">
              <input type="password" name= "password" placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)}></input>
              
              <input type="password" name= "repassword" placeholder="Password"
              value={repassword} onChange={(e) => setrePassword(e.target.value)}></input>
            </div>
            <button type="submit" >Sign Up</button>
          </form >
        </div>
      </div>
    </div>
  );
}
//The onChange event in React detects when the value of an input element changes. 