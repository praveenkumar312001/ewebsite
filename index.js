const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname)); //to avoid sending static files using res.send file
const alert=require('alert');

mongoose.connect("mongodb+srv://mean_tutorial:praveen@cluster0.tnyvf9v.mongodb.net/project")

const postSchema={
    name:String,
    productid: String,
    category: String,
    price:Number,
    discount:Number,
    bonus:Number,
    billable:Number
    
} 




const photo_schema = {
    name:String,
    location: String,
    price: Number
}


const register_schema = {
    name:String,
    username: String,
    email: String,
    password: String 
}

const shoppingschema = {
    name: String,
    price: String
}


const login_schema = {
    username: String,
    password: String 
}

const photo_db = mongoose.model("cards",photo_schema)

const founder_db = mongoose.model("user_profiles",photo_schema)

const newPost=mongoose.model("eval2",postSchema)

const pcard1_db = mongoose.model("pcard1",photo_schema)

const pcard2_db = mongoose.model("pcard2",photo_schema)

const user_registration_details = mongoose.model("register_details",register_schema)

const user_login_details = mongoose.model("login_details",login_schema)

const shopping_details = mongoose.model("shopping_details",shoppingschema)

app.get("/",function(req,res){           
    res.sendFile(__dirname + '/index.html')
})

app.get("/account.html",function(req,res){           
    res.sendFile(__dirname + '/account.html')
})

app.get("/load",(req,res)=>{
    newPost.find( (err,data)=>{
        if(err){
            return res.status(500).send(err)
        }
        else{
            return res.status(200).send(data)
        }
    })
})

app.get("/load3img",(req,res)=>{
    photo_db.find( (err,data)=>{
        if(err){
            return res.status(500).send(err)
        }
        else{
            return res.status(200).send(data)
        }
    })
})


app.get("/loaduserprofile",(req,res)=>{
    founder_db.find( (err,data)=>{
        if(err){
            return res.status(500).send(err)
        }
        else{
            return res.status(200).send(data)
        }
    })
    photo_db.find( (err,data)=>{
        if(err){
            return res.status(500).send(err)
        }
        else{
            return res.status(200).send(data)
        }
    })
})


app.post("/reset",(req,res)=>{
    user_login_details.findOne({"username":req.body.username,"password": req.body.password},(err,data) =>{
    if (data != null) {
        user_login_details.updateOne(
          { "username":req.body.username,"password": req.body.password },
          {"password": req.body.newpassword },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/");
            }
          }
        );
     
    } else {
      res.redirect("/error.html");
    }
    
    });
    });



app.post("/login", function (req, res) {
    const user = user_login_details.find({
        "username": req.body.username,
        "password": req.body.password
    }, (err, data) => {
        if (err) {
            console.log(err);
            //return res.status(500).send(err)
        }
        else if (data.length) {
            console.log(data);
            res.redirect("/");
        }
        // else {
        //     alert("User details invalid");
        //     res.redirect("/account.html")
        // }
    });

})

app.get("/loadpcard1",(req,res)=>{
    pcard1_db.find( (err,data)=>{
        if(err){
            return res.status(500).send(err)
        }
        else{
            return res.status(200).send(data)
        }
    })
})


app.get("/loadpcard2",(req,res)=>{
    pcard2_db.find( (err,data)=>{
        if(err){
            return res.status(500).send(err)
        }
        else{
            return res.status(200).send(data)
        }
    })
})



app.post("/action",function(req,res){
    console.log(req.body)
    let newInsert=new newPost({                
        name:req.body.name,
        productid:req.body.productid,
        category:req.body.category,
        price:req.body.price,  
        discount:req.body.discount,  
        bonus:req.body.bonus,  
        billable:req.body.billable,          
    })
    console.log(newInsert)
    newInsert.save();
    res.redirect("/index.html");
})


app.post("/buy",function(req,res){
    console.log(req.body)
    let newInsert=new newPost({                
        name:req.body.name,
        price:req.body.price,       
    })
    console.log(newInsert)
    newInsert.save();
    res.redirect("/products.html");
})



app.post("/register",function(req,res){
    console.log(req.body)
    let newInsert=new user_registration_details({                
        name:req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password         
    })

    console.log(newInsert)
    newInsert.save();
    let newInsert1=new user_login_details({                
        username: req.body.username,
        password: req.body.password         
    })
    console.log(newInsert1)
    newInsert1.save();
    res.redirect("/products.html");
})

app.listen(3000,function(){
    console.log("server is running on 3000")
})