import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'; 

const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    
    const [inpval,setInpval]=useState({
        name:"",
        email:"",
        password:"",
        cpassword:""
    });
    
    // console.log(inpval);
    const setval=(e)=>{
       const {name,value}=e.target;
       
       setInpval(()=>{
            return{
                ...inpval,
                [name]:value
            }
       })
    }

    const addUserData= async(e)=>{
        e.preventDefault();
        const {name,email,password,cpassword}=inpval;

        if(name ===""){
            alert("please enter your name");
        }else if(email ===""){
            alert("please enter your email");
        }else if(!email.includes("@")){
            alert("enter valid email");
        }else if(password ===""){
            alert("enter your password");
        }else if(password.length <6){
            alert("password must be 6 char");
        }else if(cpassword ===""){
            alert("enter Confirm password");
        }else if(cpassword.length <6){
            alert("Confirm password must be 6 char");
        }else if(password !== cpassword){
            alert("password and confirm password not match")
        }else{
            // console.log("User registration succesfully done")
            const data = await fetch("http://localhost:8080/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                password,
                cpassword,
              }),
            });

            const res= await data.json();
            // console.log(res);
            if(res.status ==201){
              alert("user registration done");
              setInpval({
                ...inpval,
                name:"",email:"",password:"",cpassword:""
              })
            }

        }
    }


  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="border-2 shadow-lg rounded-md px-10 ">
        <div className="text-2xl flex flex-col p-4 justify-center items-center border-b-2 shadow-md ">
          <h1 className="text-blue-950  text-4xl font-semibold mb-2 ">
            Sign Up
          </h1>
          <p>Hi,we are you glad you are back. Please login</p>
        </div>
        <form className="p-4 py-10">
          <div className=" mb-4">
            <lable htmlFor="name" className="block text-xl font-medium mb-2">
              Name
            </lable>
            <input
              type="text"
              id="name"
              name="name"
              value={inpval.name}
              placeholder="Enter Your Name"
              className="border-2 bg-slate-100 w-full h-10 rounded-md border-b"
              onChange={setval}
            />
          </div>
          <div className="mb-4">
            <lable htmlFor="email" className="block text-xl font-medium mb-2">
              Email
            </lable>
            <input
              type="email"
              id="email"
              name="email"
              value={inpval.email}
              placeholder="Enter Your Mail Address"
              className="border-2 bg-slate-100 w-full h-10 rounded-md border-b"
              onChange={setval}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-xl font-medium mb-2"
            >
              Password
            </label>
            <div className="flex">
              <input
                type={!passShow ? "password" : "text"}
                id="password"
                name="password"
                value={inpval.password}
                placeholder="Enter your Password"
                className="border-2 bg-slate-100 w-5/6 h-10 rounded-md border-b"
                onChange={setval}
              />
              <div
                className=" w-1/6 justify-center items-center flex bg-blue-200 font-medium rounded-md"
                onClick={() => setPassShow(!passShow)}
              >
                {!passShow ? "Show" : "Hide"}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="cpassword"
              className="block text-xl font-medium mb-2"
            >
              Confirm Password
            </label>
            <div className="flex">
              <input
                type={!cpassShow ? "password" : "text"}
                id="cpassword"
                name="cpassword"
                value={inpval.cpassword}
                placeholder="Confirm Password"
                className="border-2 bg-slate-100 w-5/6 h-10 rounded-md border-b"
                onChange={setval}
              />
              <div
                className=" w-1/6 justify-center items-center flex bg-blue-200 font-medium rounded-md"
                onClick={() => setCPassShow(!cpassShow)}
              >
                {!cpassShow ? "Show" : "Hide"}
              </div>
            </div>
          </div>
          <button
            className="bg-blue-950 text-white  mt-4 rounded-md w-full py-3 text-2xl"
            onClick={addUserData}
          >
            Sign Up
          </button>
          <div className="w-full flex justify-center mt-4">
            <p className="text-gray-500 text-lg font-medium ">
              Don't have an Account?
              <NavLink to="/">
                <span className="underline">Login</span>
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register