//-----------------------------Refrences-----------------------------------//
var register_User_btn = document.getElementById("register_User_btn");
var back_btn = document.getElementById("back_btn");


//functions

function redirect_to_register_user_page()
{
    location.href = "../RegisterUser.html";
}

function redirect_to_homepage()
{
    location.href='../index.html';
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

    const firebaseConfig = {
      apiKey: "AIzaSyCyt3pQ5xUwzRSa1k4yPwGuJiPTjEJsNoY",
      authDomain: "cbtplatform-d2cb9.firebaseapp.com",
      projectId: "cbtplatform-d2cb9",
      storageBucket: "cbtplatform-d2cb9.appspot.com",
      messagingSenderId: "1071199320623",
      appId: "1:1071199320623:web:ef64a8442f32f01d84e4da"
    };
  
    const app = initializeApp(firebaseConfig);
   
    import {getDatabase, ref, get, set, child, update,remove}  from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js" ; //importing the functions 

    const db = getDatabase(); //getting the database

if(Cookies.get("Logged_in") == undefined) //if got to this page without loggin in redirect to homepage
    redirect_to_homepage();
else
{
    const dbref = ref(db); //getting a refrence to the DB
    
    get(child(dbref,"Admins/"+ Cookies.get("user_id"))).then((snapshot)=>{
        if(snapshot.exists()) //if this record exists
            document.getElementById("logged_in_as").innerHTML = snapshot.val().Name; //assigning values
    })
    .catch((error)=>{
        alert("unsuccessful, error = " + error);
    });
}
            
//-------------Assignments----------------------//
register_User_btn.addEventListener('click',redirect_to_register_user_page);
back_btn.addEventListener('click',redirect_to_homepage);