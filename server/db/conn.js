const mongoose = require("mongoose");

const DB =
  "mongodb+srv://kashish:XzcUAwEzBg1CGuBD@cluster1.yvjxsw4.mongodb.net/Authusers?retryWrites=true&w=majority";


mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log("Database Connected")).catch((error)=>{
    console.log(error);
});
