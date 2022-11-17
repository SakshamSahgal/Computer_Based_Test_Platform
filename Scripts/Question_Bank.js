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
var fetch_MCQs = document.getElementById("fetch_MCQs"); 
var Cur_Question_ID = document.getElementById("Cur_Question_ID");
//------------------------------------------------------------------------------- Functions -------------------------------------------------------------------


function display_question(id) //this function is called when 
{
    console.log(id);
    document.getElementById("my_name").innerHTML = Cookies.get("Name");
    Cur_Question_ID.innerHTML = (id.split(","))[1]; //putting the current Question ID to the Question Pallet
}

function add_to_table(id,Question_ID) //function inserts data into table
{
    var table = document.getElementById(id);
    var row = table.insertRow(2); //inserting at the 1
    var Question_ID_cell = row.insertCell(0); //inserting at the 0th col (starting)
    var display_col = row.insertCell(1); //inserting at the 0th col (starting)
    Question_ID_cell.innerHTML = Question_ID;

    var drop_down_btn_id = "dropdown," + Question_ID;

    display_col.innerHTML = "<Button style = 'background-color: transparent;' id = " + drop_down_btn_id + " > <img src='GUI_Resources/Right_Arrow.png'> </Button>";

    // const question_details = {
    //     sub_database : (id == "Student_table") ? "Students" : "Problem_Setters" , //getting subdatabse from table id
    //     name_val : name,
    //     password : pass,
    //     User_ID : uid 
    // }

    var th_display_btn = document.getElementById(drop_down_btn_id);
    th_display_btn.addEventListener('click',display_question.bind(null,drop_down_btn_id));


}

function Fetch_data_from_database(to_database,table_id) //function that fetches all the data from the database passed as JSON object
{
    console.log("loading");
   const dbref = ref(db);
   get(child(dbref,to_database)).then((snapshot)=>{
    if(snapshot.exists())
    {
        var obj = (snapshot.val()); //getting the object
        
        console.log(obj);
        var values = Object.values(obj); //getting the value array of the object (each item in the object is itself an object)
        console.log(values);
        console.log("loaded");
        for(var i=0;i<values.length;i++)
        {
          //  add_to_table(table_id,values[i].Name,values[i].Password,values[i].User_ID);
            console.log(values[i].Question_ID);
            add_to_table(table_id,values[i].Question_ID);
        }   
    }
   });
}




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

if(Cookies.get("Logged_in") == undefined) //if got to this page without logging in redirect to homepage
    redirect_to_homepage();
else
    assign_Profile();


logout_button.addEventListener('click',logout_user);
fetch_MCQs.addEventListener('click',Fetch_data_from_database.bind(null,"Question_Bank/MCQs","MCQ_Bank_table"));