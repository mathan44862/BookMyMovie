const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/BookMyMovie");

const Theaters = mongoose.model('Threates', new mongoose.Schema({
    _id : String,
    name : String,
    location : String
}));
const Screens = mongoose.model('Screens', new mongoose.Schema({
    _id : String,
    theatre_id : String,
    movie_name : String,
    screenno:String,
    noofseats:String
}));
const Shows = mongoose.model('Shows', new mongoose.Schema({
    _id : String,
    theatre_id : String,
    movie_name : String,
    screen_id : String,
    show_time : String,
    show_no : String
}));
const User = mongoose.model('Users', new mongoose.Schema({
    email: String,
    password:String
}));
const BookTickets = mongoose.model('Tickets', new mongoose.Schema({
  email: String,
  seat:Number,
  screen_id : String ,
  selectedShow:String
}));

app.get("/",cors(),(req,res)=>{
  res.send("Hi")
})  
 app.get("/theaters",async(req,res)=>{
    const Theater =  await Theaters.find();
    res.json({data:Theater});
})

app.post("/screens",async(req,res)=>{
    const  {theater_id} = req.body;
    const Screen =  await Screens.find({theater_id:theater_id});
    console.log(Screen);
    res.json({data:Screen});
})
app.post("/signin",async(req,res)=>{
    const {email,password} = req.body;
    console.log(email);
    try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.json({ Status:"sucesss" });
    } else {
      res.json({ error: 'Account not found' });
    }
  } catch (error) {
    res.json(error);
  }
})
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const leave = new User({
        email:email,
        password:password
    });
    const result1 = await leave.save();
    res.json({status:"success"});
});

app.post("/booktickets", async (req, res) => {
  console.log(req.body);
  const {seatno,email ,screen_id , selectedShow}= req.body;
  
  for (const seatNo of seatno) {
    const leave = new BookTickets({
      email:email,
      seat:seatNo,
      screen_id : screen_id , 
      selectedShow:selectedShow
    });
    const result1 = await leave.save();
  }
  res.json({status:"success"});
});

app.post("/tickets", async (req, res) => {
  const {showno,screen_id}= req.body;
  console.log(req.body);
  const Tickets =  await BookTickets.find({screen_id ,selectedShow: showno});
  console.log("Tickets");
  console.log(Tickets);
  res.json({data:Tickets});
});
app.listen(5000, () => {
  console.log(`Server listening at http://localhost:5000`);
}); 
