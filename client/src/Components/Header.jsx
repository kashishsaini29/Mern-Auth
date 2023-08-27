import React,{useContext} from 'react';
import {BiUserCircle} from 'react-icons/bi';
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from 'react-router-dom';

import { LoginContext } from './ContextProvider/Context';


function Header() {
        const history =useNavigate();
     const {logindata,setLoginData}=useContext(LoginContext);

      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

      const logoutuser = async()=>{
        let token=  localStorage.getItem("usersdatatoken");
        // console.log("logout",token);

        const res = await fetch("http://localhost:8080/logout",{
          method:"GET",
          headers:{
              "Content-Type": "application/json",
              "Authorization":token,
              Accept:"application/json",
          },
          // credentials:"include",
        });
       const data= await res.json();
       console.log(data);

       if(data.status === 201){
         console.log('use logout');
         localStorage.removeItem("usersdatatoken");
         setLoginData(false);
         history("/")
        }else{
         console.log('error');
       }

      }
      const goDash=()=>{
        history("/dash");
      }
    const goError=()=>{
      history("*");
    }
  return (
    <>
      <div className="flex  border-b shadow-md  p-5 items-center justify-between">
        <div className="text-3xl text-blue-950 font-semibold ml-10">
          KS Auth
        </div>
        <div className="mr-10">
          {/* <BiUserCircle /> */}
          {logindata.ValidUserOne ? (
            <Avatar style={{ background: "blue" }} onClick={handleClick}>
              {logindata.ValidUserOne.name[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar style={{ background: "blue" }} onClick={handleClick} />
          )}
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {logindata.ValidUserOne ? (
            <>
              <MenuItem onClick={()=>{
                goDash()
                handleClose()
                }}>Profile</MenuItem>
              <MenuItem onClick={()=>{
                logoutuser()
                handleClose()
                }}>Logout</MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                onClick={() => {
                  goError();
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
            </>
          )}
        </Menu>
      </div>
    </>
  );
}

export default Header