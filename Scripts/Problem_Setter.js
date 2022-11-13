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
var Question_desc = document.getElementById("ques_desc");
var Mcq_opt_1 = document.getElementById("mcq_option1_value");
var Mcq_opt_2 = document.getElementById("mcq_option2_value");
var Mcq_opt_3 = document.getElementById("mcq_option3_value");
var Mcq_opt_4 = document.getElementById("mcq_option4_value");
var Submit_Question_btn = document.getElementById("Submit_Question");
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


function Submit_Question()
{
    console.log(Question_desc.value);
    console.log(Mcq_opt_1.value);
    console.log(Mcq_opt_2.value);
    console.log(Mcq_opt_3.value);
    console.log(Mcq_opt_4.value);
    console.log("unique id = " + Date.now());
    
    var to_database = "Question_Bank/MCQs/"; 
    var Question_ID = Date.now();
    
    if(Question_desc.value != "" && Mcq_opt_1.value != "" && Mcq_opt_2.value != "" && Mcq_opt_3.value != "" && Mcq_opt_4.value != "")
    {
        var path_directory = to_database + Question_ID;

        var Question = {
            Description : Question_desc.value,
            Option1 : Mcq_opt_1.value ,
            Option2 : Mcq_opt_2.value ,
            Option3 : Mcq_opt_3.value ,
            Option4 : Mcq_opt_4.value 
        }

        set(ref( db , path_directory ), Question )
        .then(()=>{
            alert("data stored successfully");
        })
        .catch((error)=>{
            alert("unsuccessful, error = " + error);
        });
    }
    else
        alert("Cant leave Fields empty");

}

if(Cookies.get("Logged_in") == undefined) //if got to this page without logging in redirect to homepage
    redirect_to_homepage();
else
{
    assign_Profile();
}

logout_button.addEventListener('click',logout_user);
Submit_Question_btn.addEventListener('click',Submit_Question);