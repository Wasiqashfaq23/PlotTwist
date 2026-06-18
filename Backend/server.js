const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
const {ConnectToDB}=require("./Config/db")

app.use(cors());    
app.use(express.urlencoded({extended:true}));
app.use(express.json());

ConnectToDB(process.env.MONGO_URI)

const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});