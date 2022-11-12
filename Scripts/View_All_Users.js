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

var logout_button = document.getElementById("Logout_btn");
var current_edit_name = document.getElementById("current_edit_name");
var current_edit_password = document.getElementById("current_edit_password");
var user_type_checkbox_student = document.getElementById("input_as_Student");
var user_type_checkbox_Problem_Setter = document.getElementById("input_as_Problem_Setter");
var update_btn = document.getElementById("Update_btn");

//-------------------------------------------------------------------------------Functions-------------------------------------------------------------------

function refresh_page()
{
    location.href = "./View_All_Users.html";   
}

function edit_data(obj) //this function puts the data from the table to current edit input fields
{
    if(obj.sub_database == "Students")
        user_type_checkbox_student.checked = true;
    else if(obj.sub_database == "Problem_Setters")
        user_type_checkbox_Problem_Setter.checked = true;
        
    current_edit_name.value = obj.name_val;
    current_edit_password.value = obj.password;
    console.log(obj);
    update_btn.addEventListener('click',update_Data.bind(null,obj));
}

function delete_data(obj) //this function is called when a delete button is clicked (it deletes the entry from database and refreshes the page)
{
    remove(ref(db,obj.sub_database + "/" + obj.User_ID))
    .then(()=>{
        refresh_page();
    })
    .catch((error)=>{
        alert("unsuccessful , error " + error);
    });
}

function update_Data(obj)
{
    update(ref(db,obj.sub_database + "/" + obj.User_ID),{
        Name : current_edit_name.value,
        Password : current_edit_password.value ,
        User_ID : obj.User_ID
    })
    .then(()=>{
        refresh_page();
    })
    .catch((error)=>{
        alert("unsuccessful while  updating , error = " + error);
    })
}

function add_to_table(id,name,pass,uid) //function inserts data into table
{
    var table = document.getElementById(id);
    var row = table.insertRow(2); //inserting at the first index (since index 0 is heading)
    var name_cell = row.insertCell(0); //inserting at the 0th col (starting)
    var pass_cell = row.insertCell(1); //inserting at the 1th col 
    var uid_cell = row.insertCell(2); //inserting at the 2th col 
    var edit_cell = row.insertCell(3);  //inserting at the 3th col 
    var delete_cell = row.insertCell(4);  //inserting at the 4th col 
    name_cell.innerHTML = name; //setting data to the cell
    pass_cell.innerHTML = pass; //setting data to the password cell
    uid_cell.innerHTML = uid; //setting data to the user id cell

    var edit_btn_id = "edit," + id + "," + uid; //id for each edit button (using this format to make all id distinct)
    var delete_btn_id = "del," + id + "," + uid; //id for each delete button (using this format to make all id distinct)

    edit_cell.innerHTML = "<Button style = 'background-color: transparent;' id = " + edit_btn_id + " > <img src = './GUI_Resources/Edit_Icon.png'> </Button>";
    edit_cell.style = "width: 80px;";  
    delete_cell.innerHTML = "<Button style = 'background-color: transparent; ' id = " + delete_btn_id + " > <img src = './GUI_Resources/Delete_Icon.png'> </Button>";
    delete_cell.style = "width: 80px;";

    const row_object = {
        sub_database : (id == "Student_table") ? "Students" : "Problem_Setters" , //getting subdatabse from table id
        name_val : name,
        password : pass,
        User_ID : uid 
    }

    var th_edit_btn = document.getElementById(edit_btn_id);
    th_edit_btn.addEventListener('click',edit_data.bind(null,row_object));

    var th_delete_btn = document.getElementById(delete_btn_id);
    th_delete_btn.addEventListener('click',delete_data.bind(null,row_object));

}


function Fetch_data_from_database(to_database,table_id) //function that fetches all the data from the database passed 
{
   const dbref = ref(db);
   get(child(dbref,to_database)).then((snapshot)=>{
    if(snapshot.exists())
    {
        var obj = (snapshot.val()); //getting the object
        console.log(obj);
        var values = Object.values(obj); //getting the value array of the object (each item in the array is itself an object)
        console.log(values);
        for(var i=0;i<values.length;i++)
            add_to_table(table_id,values[i].Name,values[i].Password,values[i].User_ID);
    }
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