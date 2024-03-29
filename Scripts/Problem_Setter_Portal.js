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

//------------------------------------------------------------------------------- Refrences -------------------------------------------------------------------
var logout_button = document.getElementById("Logout_btn");
var Add_Question_btn = document.getElementById("Add_Question");
var Question_Bank_btn = document.getElementById("Question_bank_btn");
var create_test_btn = document.getElementById("Create_test_btn");
//------------------------------------------------------------------------------- Functions -------------------------------------------------------------------


function redirect_to_homepage() //function locates back to Admin_Portal
{
    location.href = "./index.html";
}

function logout_user()
{
    Cookies.remove("Logged_in");
    Cookies.remove("user_id");
    Cookies.remove("Name");
    redirect_to_homepage();
}

function assign_Profile() //this function assigns the profile div it's data for username
{
    document.getElementById("logged_in_as").innerHTML = Cookies.get("Name"); //assigning values
}

function redirect_to_Add_question()
{
    location.href = "./Add_Question.html";
}

function redirect_to_Question_Bank()
{
    location.href = "./Question_Bank.html";
}

function redirect_to_create_test_page()
{
    location.href = "./Create_Test.html";
}

if(Cookies.get("Logged_in") == undefined) //if got to this page without logging in redirect to homepage
    redirect_to_homepage();
else
{
    assign_Profile();
}


logout_button.addEventListener('click',logout_user);
Add_Question_btn.addEventListener('click',redirect_to_Add_question);
Question_Bank_btn.addEventListener('click',redirect_to_Question_Bank);
create_test_btn.addEventListener('click',redirect_to_create_test_page);