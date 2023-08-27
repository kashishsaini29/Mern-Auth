import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";

const Login = () => {
    const [passShow,setPassShow] =useState(false);
    const [inpval,setInpval]=useState({
        email:"",
        password:""
    });

    const history = useNavigate();

    const setval=(e)=>{
        const {name,value}=e.target;
        setInpval(()=>{
            return{
                ...inpval,
                [name]:value
            }
        })
    }
    const loginUser= async(e)=>{
      e.preventDefault();
      const {email,password}=inpval;
      
      if(email===""){
        alert("please enter your email");
      }else if(!email.includes("@")){
        alert("enter valid email");
      }else if(password ===""){
        alert("enter password");
      }else if(password.length <6){
        alert("password length must be 6 char")
      }else{ 
        console.log("User Login succesfully done")
        const data=await fetch("http://localhost:8080/login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            email,password
          }),
        });

        const res= await data.json();
        console.log(res);

        if(res.status === 201){
          localStorage.setItem("usersdatatoken",res.result.token);
          history('/dash');
          setInpval({...inpval,email:"",password:""})
        }
        else{
          alert("User not found ")
          console.log(res.error)
        }
      }


    }
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="border-2 shadow-lg rounded-md px-10 ">
        <div className="text-2xl flex flex-col p-4 justify-center items-center border-b-2 shadow-md ">
          <h1 className="text-blue-950 text-4xl font-semibold mb-2">
            Welcome Back, Log In
          </h1>
          <p className="text-2xl text-gray-500 font-semibold">
            Hi,we are you glad you are back. Please login
          </p>
        </div>
        <form className=" p-4 py-10">
          <div className="mb-4">
            <lable htmlFor="email" className="block text-xl font-medium mb-2">
              Email
            </lable>
            <input
              type="email"
              id="email"
              name="email"
              value={inpval.email}
              onChange={setval}
              placeholder="Enter Your Mail Address"
              className="border-2 bg-slate-100 w-full h-10 rounded-md border-b"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-xl font-medium mb-2">
              Password
            </label>
            <div className="flex">
              <input
                type={!passShow ? "password" : "text"}
                id="password"
                name="password"
                value={inpval.password}
                onChange={setval}
                placeholder="Enter your Password"
                className="border-2 bg-slate-100 w-5/6 h-10 rounded-md border-b"
              />
              <div
                className="w-1/6 justify-center items-center flex bg-blue-200 font-medium rounded-md"
                onClick={() => setPassShow(!passShow)}
              >
                {!passShow ? "Show" : "Hide"}
              </div>
            </div>
          </div>
          <button
            className="bg-blue-950 text-white  mt-4 rounded-md w-full py-3 text-2xl"
            onClick={loginUser}
          >
            Login
          </button>
          <div className="w-full flex justify-center mt-4">
          <p className="text-gray-500 text-lg font-medium ">
            Don't have an Account? <NavLink to="/register"> <span className="underline">Sign Up</span></NavLink>
          </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
