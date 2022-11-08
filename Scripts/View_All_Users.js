//---------------------------------------------------------------------Firebase setup-------------------------------------------------------------------------------


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
//-------------------------------------------------------------------------------Refrences-------------------------------------------------------------------

var student_table = document.getElementById("Student_table");
var Problem_Setter_table = document.getElementById("Problem_Setter_table");
var logout_button = document.getElementById("Logout_btn");

//-------------------------------------------------------------------------------Functions-------------------------------------------------------------------

function add_to_table(id,name,pass,uid) //function inserts data into table
{
    var table = document.getElementById(id);
    var row = table.insertRow(2); //inserting at the first index (since index 0 is heading)
    var name_cell = row.insertCell(0); //inserting at the 0th col (starting)
    var pass_cell = row.insertCell(1); //inserting at the 0th col (starting)
    var uid_cell = row.insertCell(2); //inserting at the 0th col (starting)
    name_cell.innerHTML = name;
    pass_cell.innerHTML = pass;
    uid_cell.innerHTML = uid;
}


function Fetch_data_from_database(to_database,table_id) //function that fetches all the data from the database passed 
{
   const dbref = ref(db);
   get(child(dbref,to_database)).then((snapshot)=>{

    var obj = (snapshot.val()); //getting the object
    console.log(obj);
    var values = Object.values(obj); //getting the value array of the object (each item in the array is itself an object)
    console.log(values);
    for(var i=0;i<values.length;i++)
        add_to_table(table_id,values[i].Name,values[i].Password,values[i].User_ID);
    
   });
}

function logout_user()
{
    Cookies.remove("Logged_in");
    Cookies.remove("user_id");
    Cookies.remove("Name");
    redirect_to_homepage();
}

function redirect_to_homepage() //function locates back to Admin_Portal
{
    location.href = "./index.html";
}

function assign_Profile() //this function assigns the profile div it's data for username
{
    document.getElementById("logged_in_as").innerHTML = Cookies.get("Name"); //assigning values
}

if(Cookies.get("Logged_in") == undefined) //if got to this page without logging in redirect to homepage
    redirect_to_homepage();
else
{
    assign_Profile();
    Fetch_data_from_database('Problem_Setters',"Problem_Setter_table");
    Fetch_data_from_database('Students',"Student_table");
}

 //-------------Assignments----------------------//
 logout_button.addEventListener('click',logout_user);