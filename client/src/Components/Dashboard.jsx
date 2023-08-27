import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Dashboard = () => {
  const [data, setData] = useState(false);
  const history = useNavigate();
  const { logindata, setLoginData } = useContext(LoginContext);
  //   console.log(logindata.ValidUserOne.email);
  // console.log(logindata.ValidUserOne.email)

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
      history("*");
    } else {
      console.log("user Verify");
      setLoginData(data);
      history("/dash");
    }
  };

  
  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 1000);
  }, []);

  return (
    <>
      {data ? (
        <div className="flex flex-col items-center">
          <img
            src="./man.jpg"
            style={{ width: "200px", marginTop: 20 }}
            alt=""
          />
          <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Dashboard;
