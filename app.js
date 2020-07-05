//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");

const homeStartingContent = "Just another intuitive and fast blog coded using Bootstrap V5, NodeJS, ExpressJs and EJS";
const aboutContent = "Just another coder in the block, trying to route,eat,await and stack things up. Developer pun intended";
const contactContent = "Get in touch with me at";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


let posts=[]


app.get("/",function(req,res){
  res.render("home", {
    Homecontent:homeStartingContent,
    posts:posts
  });
   


});


app.get("/about",function(req,res){
  res.render("about",{Aboutcontent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{Contactcontent:contactContent});
});



app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose",function(req,res){

var post={
title:req.body.posttitle,
content:req.body.postbody
};
posts.push(post);
res.redirect("/");

 
})

app.get("/posts/:postname", function(req,res){
 const reqtitle=_.lowerCase(req.params.postname);
    posts.forEach(function(post){
       var storedtitle=_.lowerCase(post.title);
      
       if(storedtitle===reqtitle){
         res.render("post",({posttitle:post.title, postcontent:post.content}));
       }
     

     })

});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
