//-----------------------------Refrences-----------------------------------//
var register_User_btn = document.getElementById("register_User_btn");
var logout_button = document.getElementById("Logout_btn");

//functions

function redirect_to_register_user_page()
{
    location.href = "./RegisterUser.html";
}

function redirect_to_homepage() // (called when user is not logged in and tries to access via direct link)
{
    location.href='./index.html';
}

function assign_Profile()
{
    document.getElementById("logged_in_as").innerHTML = Cookies.get("Name"); //assigning values
}

if(Cookies.get("Logged_in") == undefined) //if got to this page without loggin in redirect to homepage
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
register_User_btn.addEventListener('click',redirect_to_register_user_page); 
logout_button.addEventListener('click',logout_user);