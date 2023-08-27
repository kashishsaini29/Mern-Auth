import { useState,useEffect,useContext } from 'react'

import Header from './Components/Header';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import {Routes,Route,useNavigate} from 'react-router-dom';
import Error from './Components/Error';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { LoginContext } from './Components/ContextProvider/Context';



function App() {
  const [count, setCount] = useState(0);
  const [data,setData]=useState(false);

  const {logindata,setLoginData}=useContext(LoginContext);
  const history= useNavigate();

    const DashboardValid = async () => {
      let token = localStorage.getItem("usersdatatoken");
      //  console.log(token);
      const res = await fetch("http://localhost:8080/validuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();

      if (data.status == 401 || !data) {
        history("/");
      } else {
        console.log("user Verify");
        setLoginData(data);
        history("/dash");
      }
    };

    useEffect(() => {
      setTimeout(()=>{
        DashboardValid();
         setData(true)
      },1000);
    },[]);

  return (
    <>
      {data ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      ) : (
        <Box sx={{ display: "flex", justifyContent:"center", alignItems:"center", height:"100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default App
