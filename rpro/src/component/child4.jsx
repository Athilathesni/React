// import React, { Component } from "react";
// export class child4 extends Component{
//     render(){
//         return(
//             <div>
//                 CHILD4
//             </div>
//         )
//     }
// }

// export default child4




//cpass//

import React, { useState } from "react";
import "./Changepass.css";

const ChangePass = () => {
  const [formData, setFormData] = useState({
    pwd: "",
    cpwd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Password changed successfully:", formData.newPassword);
    // Add logic for API integration
  };

  return (
    <div className="change-pass-container">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Password:</label>
          <input  type="password"  name="pwd" value={formData.newPassword} onChange={handleChange} required placeholder="Enter new password"/>
        </div>
        <div className="form-group">
          <label>Confirm New Password:</label>
          <input  type="password"  name="cpwd"  value={formData.confirmPassword}onChange={handleChange}  required  placeholder="Confirm new password"  />
        </div>
        <button type="submit" className="btn-change-password">  Change Password </button>
      </form>
    </div>
  );
};

export default ChangePass;

//HomePage//

import React, { useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const HomePage=({setUser})=>{
    const navigate=useNavigate()
    const getUser=async () => {
        const token=localStorage.getItem('token')
        if(!token){
            navigate('/login')
        }
        else{
            try {
                const res=await axios.get('http://localhost:3005/api/getuser', {headers: {'Authorization': Bearer ${token}}})
                console.log(res);
                
                if (res.status==200) {
                    setUser(res.data.name)
                }
                else{
                    navigate('/login')
                }
            } catch (error) {
                console.log(error)
                location.reload()
                navigate('/login')
            }
        }
    }
    useEffect(()=>{
        getUser()
    },[])
    return(
        <>
        <div><h1>HomePage</h1></div>
        </>
    )
}

export default HomePage

//Login//

import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const res=await axios.post("http://localhost:3005/api/login",formData)
      console.log(res.data)
      // console.log(res.data.token)
      
      if(res.status==201){
        localStorage.setItem('token',res.data.token)
        alert("successfully logined!")
        navigate('/')
      }else{
        alert(res.data.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back!</h1>
          <p>Please log in to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
        <div className="form-footer">
          <Link to={"/#"} className="forgot-password-link">
            Forgot Password?
          </Link>
          <span className="separator">|</span>
          <Link to={"/verify"} className="signup-link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login

//NAVBAR//

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Nav.css"

const Nav = ({user}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const navigate = useNavigate()

  const toggleDropdown = (event) => {
    event.stopPropagation()
    setIsDropdownVisible((prevState) => !prevState)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownVisible(false)
      }
    }

    window.addEventListener("click", handleOutsideClick)
    return () => {
      window.removeEventListener("click", handleOutsideClick)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    alert("Logout Successfully")
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <div className="right-section">
        {/* <button className="login-button">
          <a href="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </a>
        </button> */}
        <span className="username">{user}</span>
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropbtn">
            ▼
          </button>
          {isDropdownVisible && (
            <div className="dropdown-content">
              <a href="/profile">Profile</a>
              <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav

//REGISTER//

import React, { useEffect, useState } from "react"
import "./Register.css"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: localStorage.getItem('email') || "",
    pwd: "",
    cpwd: "",
  })
  formData.email=localStorage.getItem('email')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      const res=await axios.post("http://localhost:3005/api/adduser",formData)
      console.log(res)
      if(res.status==201){
        alert(res.data.msg)
        localStorage.removeItem('email')
        navigate('/login')
      }else{
        alert(res.data.msg)
      }
    } catch (error) {
      
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Create an Account</h1>
          <p>Fill in the details below to get started</p>
        </div>
        <form onSubmit={handleSubmit} method="post">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="pwd"
              value={formData.pwd}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="cpwd"
              value={formData.cpwd}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register

//EMAIL//

import React, { useState } from "react"
import "./Verify.css"
import axios from 'axios'

const Verify = () => {
  const [email, setEmail] = useState("")

  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  const handleSubmit =async (e) => {
    e.preventDefault()
    try {
      console.log(email)
      const res=await axios.post("http://localhost:3005/api/verify",{email})
      console.log(res)
      if (res.status==200) {
        alert(res.data.msg)
        localStorage.setItem('email', email)
      }else{
        // alert("email already exist")
        alert(res.data.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="verify-container">
      <h1>Email Verification</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address:</label>
          <input  type="email"  name="email"  value={email}  onChange={handleChange}  required  placeholder="Enter your email" />
        </div>
        <button type="submit" className="btn-verify">  Verify </button>
      </form>
    </div>
  )
}

export default Verify

//APP.JSX//

import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ChangePass from "./components/Changepass"
import Verify from "./components/Verify"
import Register from "./components/Register"
import Login from "./components/Login"
import HomePage from "./components/Homepage"
import Nav from "./components/Nav"
import Profile from "./components/Profile"
import { useState } from "react"

function App() {
  const [user, setUser] = useState("")
  return (
    <>
      <BrowserRouter>
        {user&& <Nav user={user}/>}
        <Routes>
          <Route path="/" element={<HomePage setUser={setUser}/>}></Route>
          <Route path="/changepass" element={<ChangePass />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App

//SERVERSIDE//

//middle//
// Auth.js

import pkg from 'jsonwebtoken'
const {verify}=pkg
export default async function Auth(req,res,next) {
    try{
        const key=req.headers.authorization;
        if(!key)
            return res.status(403).send("unautharized access")
        const token=key.split(" ")[1];
        console.log(token);
        const auth=await  verify(token,process.env.JWT_KEY)
        console.log(auth);
        req.user=auth;
        next()
    }catch(error){
    res.status(500).send(error)
    }        
}

//model//
//user.js//

import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String },  
    email: { type: String },
    pass: { type: String },
    otp:{type:Number},
});


export default mongoose.model.user||mongoose.model('user',userSchema)

//app.js//

import express from "express";
import Router from "./router.js";
import connection from "./connection.js"
import path from 'path';
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app=  express()  
app.use(cors())
app.use(express.json({limit:"50mb"}));
app.use('/api', Router);


connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(server started at http://localhost:${process.env.PORT});
    });
}).catch((error) => {
    console.log(error);
});

//requestHandler//

import userSchema from "./model/user.model.js"
import nodemailer from 'nodemailer'

import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const { sign } = pkg

const transporter = nodemailer.createTransport({
    service:"gmail",
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // secure: false, // true for port 465, false for other ports
    auth: {
      user: "farzinparakkal135@gmail.com",
      pass: "bpmi whpr zwkz wfdq",
    },
  })

export async function addUser(req, res) {
    // console.log(req.body);
    const { username, email, pwd, cpwd } = req.body
    const user = await userSchema.findOne({ email })
    if (!user) {
        if (!(username && email && pwd && cpwd))
            return res.status(500).send({ msg: "fields are empty" })
        if (pwd != cpwd)
            return res.status(500).send({ msg: "pass not match" })
        bcrypt.hash(pwd, 10).then((hpwd) => {
            userSchema.create({ username, email, pass: hpwd })
            res.status(201).send({ msg: "Successfull" })
        }).catch((error) => {
            console.log(error)
        })
    }else{
        res.status(500).send({msg:"email already used "})
    }
}

export async function login(req, res) {
    // console.log(req.body);
    const { email, pass } = req.body
    if (!(email && pass))
        return res.status(500).send({ msg: "fields are empty" })
    const user = await userSchema.findOne({ email })
    if (!user)
        return res.status(500).send({ msg: "email donot exist" })
    const success = await bcrypt.compare(pass, user.pass)
    // console.log(success);
    if (success !== true)
        return res.status(500).send({ msg: "email or password not exist" })
    const token = await sign({ UserID: user._id }, process.env.JWT_KEY, { expiresIn: "10s" })
    // console.log(token)
    res.status(201).send({ token })
}



export async function verifyEmail(req,res) {
    const {email}=req.body
    // console.log(email);
    if (!(email))  {
        return res.status(500).send({msg:"fields are empty"})
    }
    const user= await userSchema.findOne({email})        
    if (!(user)) {
        const info = await transporter.sendMail({
            from: 'farzinparakkal135@gmail.com',
            to: email,
            subject: "verify",
            text: "VERIFY! your email",
            html: `
    <div class=" page" style="width: 500px; height: 300px; display: flex; 
    align-items: center; justify-content: center; flex-direction: column;
     background-color: gainsboro;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; ">
        <h2>Email verification</h2>
        <p>Click This Button to verify its you</p>
        <a href="http://localhost:5173/register"><button style="padding: 5px 15px; border: none; border-radius: 4px; 
        background-color: white;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        font-size: 18px; color: red; font-style: italic;" >Verify</button></a>
    </div>`,
        })
        console.log("Message sent: %s", info.messageId)
        res.status(200).send({msg:"Verificaton email sented"})
    }else{
        return res.status(500).send({msg:"email exist"})
    }
}

export async function getUser(req, res) {
    const usr=await userSchema.findOne({_id:req.user.UserID})
    console.log(usr);
    
    res.status(200).send({name:usr.username}); 
}

//Router//

import { Router } from "express";
import Auth from './authentication/auth.js';

import * as rh from './requestHandler.js'

const router=Router();
router.route('/adduser').post(rh.addUser)
router.route('/login').post(rh.login)
router.route('/verify').post(rh.verifyEmail)
router.route('/getuser').get(Auth,rh.getUser)

export default router.