
//------------------------------------------------------- Firebase Setup --------------------------------------------------------------------------------
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
   
    import {getDatabase, ref, get}  from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js" ; //importing the functions 

    const db = getDatabase(); //getting the database


//------------------------------------------------------------------- Refrences -------------------------------------------------------------------
    var login_as_Admin = document.getElementById("login_as_Admin"); 
    var login_as_Student = document.getElementById("login_as_Student");
    var login_as_Problem_Setter = document.getElementById("login_as_Problem_Setter");
    var input_uid = document.getElementById("input_uid");
    var input_pass = document.getElementById("input_pass");
    var login_button = document.getElementById("login_button");

//-------------------------------------------------------------------- Functions ---------------------------------------------------------------

    function Login() //this funcition is called when user tries to log-in 
    {
        console.group("Login Details");
        console.log("Login as Details - " + login_as_Admin.checked + " " + login_as_Student.checked + " " + login_as_Problem_Setter.checked );
        console.log("user id = " + input_uid.value);
        console.log("pass = " + input_pass.value);
        console.groupEnd("Login Details");

        if(login_as_Admin.checked) //if login as admin is checked
        {
            if(input_uid.value != "" && input_pass.value != "") //if input fields are not empty
            {
                get(ref(db,"Admins/" + input_uid.value))
                .then((snapshot)=>{
                    if(snapshot.exists() && snapshot.val().Password == input_pass.value) //if this record exists and user id and password matches
                    {
                        Cookies.set("Logged_in","yes"); //storing session cookies
                        Cookies.set("user_id",input_uid.value); //storing session cookies
                        Cookies.set("Name",(snapshot.val().Name)); //storing session cookies for fast retrival of username
                        console.log("Logged in");
                        location.href = "./Admin_Portal.html";
                    }
                    else
                        alert("Wrong UserID/Password");
                })
                .catch((error)=>{
                    alert("unsuccessful, error = " + error);
                });
            }
            else
                alert("Please Enter Values");
        }
        else if(login_as_Problem_Setter.checked)
        {
            if(input_uid.value != "" && input_pass.value != "") //if input fields are not empty
            {
                get(ref(db,"Problem_Setters/" + input_uid.value))
                .then((snapshot)=>{
                    if(snapshot.exists() && snapshot.val().Password == input_pass.value) //if this record exists and user id and password matches
                    {
                        Cookies.set("Logged_in","yes"); //storing session cookies
                        Cookies.set("user_id",input_uid.value); //storing session cookies
                        Cookies.set("Name",(snapshot.val().Name)); //storing session cookies for fast retrival of username
                        console.log("Logged in");
                        location.href = "./Problem_Setter_Portal.html";
                    }
                    else
                        alert("Wrong UserID/Password");
                })
                .catch((error)=>{
                    alert("unsuccessful, error = " + error);
                });
            }
            else
                alert("Please Enter Values");
        }
    }

    //----------------------------------------------------------------------Assignments------------------------------------------------------------//
     login_button.addEventListener('click',Login);