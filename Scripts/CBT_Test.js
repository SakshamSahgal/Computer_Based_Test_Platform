//--------------------------------------------------------------------- Firebase setup -------------------------------------------------------------------------------

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

//------------------------------------------------------------------- Refrences -------------------------------------------------------------------
var logout_button = document.getElementById("Logout_btn"); //Getting refrence to Logout button
var confirmation_overlay = document.getElementById("Overlay"); //getting refrence to overlay object
var confirmation_overlay_no_btn = document.getElementById("confirmation_ans_no"); //getting refrence to confirmation overlay no ans button
var confirmation_overlay_yes_btn = document.getElementById("confirmation_ans_yes"); //getting refrence to confirmation overlay yes ans button
//-------------------------------------------------------------------- Functions ----------------------------------------------------

function redirect_to_homepage() //function locates back to Admin_Portal
{
    location.href = "./index.html";
}

function assign_Profile() //this function assigns the profile div it's data for username
{
    document.getElementById("logged_in_as").innerHTML = Cookies.get("Name"); //assigning values
}


function logout_user() //function is called when logout button is clicked
{
    Cookies.remove("Logged_in");
    Cookies.remove("user_id");
    Cookies.remove("Name");
    redirect_to_homepage();
}

if(Cookies.get("Logged_in") == undefined) //if got to this page without logging in redirect to homepage
    redirect_to_homepage();
else
    assign_Profile();



function back_to_student_portal() //this function is called when user presses No on start test confirmation portal
{
    Cookies.remove("Current_test_id");
    location.href = "./Student_Portal.html";
}

function proceed_test() //this function is called when user presses yes on start test confirmation portal
{
    console.log(Cookies.get("Current_test_id"));
    confirmation_overlay.hidden = true;
}
logout_button.addEventListener('click',logout_user);
confirmation_overlay_no_btn.addEventListener('click',back_to_student_portal);
confirmation_overlay_yes_btn.addEventListener('click',proceed_test);
