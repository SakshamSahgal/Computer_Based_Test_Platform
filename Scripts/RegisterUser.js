// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyt3pQ5xUwzRSa1k4yPwGuJiPTjEJsNoY",
  authDomain: "cbtplatform-d2cb9.firebaseapp.com",
  projectId: "cbtplatform-d2cb9",
  storageBucket: "cbtplatform-d2cb9.appspot.com",
  messagingSenderId: "1071199320623",
  appId: "1:1071199320623:web:ef64a8442f32f01d84e4da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import {getDatabase, ref, get, set, child, update,remove} 
      from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js" ; //importing the functions 
    const db = getDatabase(); //getting the database

//-----------------------------Refrences-----------------------------------//
var as_student = document.getElementById("input_as_Student");
var as_problem_setter = document.getElementById("input_as_Problem_Setter");
var input_user_id = document.getElementById("input_user_id");
var input_name = document.getElementById("input_name");
var input_password = document.getElementById("input_password");
var Register_btn = document.getElementById("Register_btn");
var logout_button = document.getElementById("Logout_btn");
//--------------------------------------------------------------------------//

function InsertData() //function inserts data to Database
{
    if(input_user_id.value != "" && input_name.value != "" && input_password.value != "") //if valid input
    {
        var store_into_database = (as_student.checked == true) ? "Students/" : "Problem_Setters/"; //checking which database to insert into
        set(ref(db,store_into_database + input_user_id.value),{
            User_ID : input_user_id.value,
            Name : input_name.value,
            Password : input_password.value
        })
        .then(()=>{
            alert("data stored successfully");
            //reset values
            as_student.checked = true;
            input_user_id.value = ""; 
            input_name.value = "";
            input_password.value = "";
        })
        .catch((error)=>{
            alert("unsuccessful, error = " + error);
        });
    }
    else
        alert("Please Fill data");
}

function redirect_to_homepage() //function locates back to Admin_Portal
{
    location.href = "./index.html";
}

function assign_Profile()
{
    document.getElementById("logged_in_as").innerHTML = Cookies.get("Name"); //assigning values
}

if(Cookies.get("Logged_in") == undefined) //if got to this page without logging in redirect to homepage
    redirect_to_homepage();
else
{
    assign_Profile();
}

function logout_user()
{
    Cookies.remove("Logged_in");
    Cookies.remove("user_id");
    Cookies.remove("Name");
    redirect_to_homepage();
}


 //-------------Assignments----------------------//
 Register_btn.addEventListener('click',InsertData); 
 logout_button.addEventListener('click',logout_user);