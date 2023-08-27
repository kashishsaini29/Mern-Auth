const express =require('express');
const userdb = require('../models/userSchema');
const router=new express.Router();
const bcrypt = require('bcryptjs');
const authenticate= require('../middleware/authenticate')


// for user registration

router.post("/register", async(req,res)=>{
 
     const {name,email,password,cpassword} =req.body;

     if( !name || !email || !password || !cpassword){
        res.status(422).json({error: "fill all the details"})
     }

     try{
         
        const preuser= await userdb.findOne({email:email});

        if(preuser){
            res.status(422).json({error:" This Email is Already exist"});
        }else if(password !== cpassword){
            res.status(422).json({error:"Password and Confirm Password Not Match"});
        }else{
            const finalUser = new userdb({
                name,email,password,cpassword
            })

            //here  pasword hasing
            const storeData = await finalUser.save();
            // console.log(storeData);

            res.status(201).json({status:201,storeData});
        }
     }catch(error){
       res.status(422).json(error);
       console.log("catch block error")
     }

});



// user login

router.post("/login", async(req,res)=>{
    // console.log(req.body);

    const {email,password}=req.body;

    if(!email || !password){
        res.status(422).json({error:"fill all the details"});
    }
    try {
        const uservalid= await userdb.findOne({email:email});
        
        if(uservalid){
                const isMatch= await bcrypt.compare(password,uservalid.password);

                if(!isMatch){
                    res.status(422).json({error:"Invalid Details"});
                }else{
 
                    // token generate
                    const token = await uservalid.generateAuthtoken();
                    // console.log(token);

                    // cookie generate
                    res.cookie("usercookie",token,{
                        expires:new Date(Date.now()+90000),
                        httpOnly:true
                    });

                    const result ={
                        uservalid,
                        token
                    }
                    res.status(201).json({status:201,result});
                }
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("catch block error");
    }
});


// user valid

router.get("/validuser",authenticate,async(req,res)=>{
 try {
      const ValidUserOne= await userdb.findOne({_id:req.userId});
      res.status(201).json({status:201, ValidUserOne});
 } catch (error) {
    res.status(401).json({status:401,error});
 }
});

// user logout
router.get("/logout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens= req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });
        // res.clearCookie("usercookie",{path:"/"})

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});



module.exports = router;