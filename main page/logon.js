let login = document.getElementById("login");
let password = document.getElementById("password");
let localStorage = window.localStorage;
let enterButton = document.getElementById("enter");
let passwordVisibility = document.getElementById("visibility");
let passwordInput = document.getElementById("password");

if(!localStorage.getItem("users")){
    localStorage.setItem("users", JSON.stringify([]));
}
let users = JSON.parse(localStorage.getItem("users"));

addEventListener("keydown", (event)=>{
    if(event.key == "Enter") enter();
})

function enter(){
    if(users.findIndex((user)=>{return login.value==user.login;})==-1){
        if(login.nextElementSibling.getAttribute("class")!="wrong"){
            let incorrectLoginWarning = document.createElement("p");
            incorrectLoginWarning.classList.add("wrong");    
            incorrectLoginWarning.innerHTML = "Неверный логин";
            login.insertAdjacentElement("afterend", incorrectLoginWarning);
        }
    }
    else if(login.nextElementSibling.getAttribute("class")=="wrong"){
        login.nextElementSibling.remove();
    }

    if(users.findIndex((user)=>{return login.value==user.login;})!=-1 && users[users.findIndex((user)=>{return login.value==user.login;})].password!=password.value){
        if(password.nextElementSibling.getAttribute("class")!="wrong"){
            let incorrectPasswordWarning = document.createElement("p");
            incorrectPasswordWarning.classList.add("wrong");    
            incorrectPasswordWarning.innerHTML = "Неверный пароль";
            password.insertAdjacentElement("afterend", incorrectPasswordWarning);
        }
    }
    else if(password.nextElementSibling.getAttribute("class")=="wrong"){
        password.nextElementSibling.remove();
    }
    if(!(document.getElementsByClassName("wrong").length)){
        localStorage.setItem("enteredLogin", users[users.findIndex((user)=>{return login.value==user.login;})].login)
        localStorage.setItem("isEntered", true);
        location.href = "main-page.html";
    }
}
function changePasswordVisibility(){
    if(passwordVisibility.hasAttribute("data-visibile")){
        passwordVisibility.removeAttribute("data-visibile");
        passwordVisibility.children[0].src = "../images/hide.png";
        password.setAttribute("type", "password");
    }
    else{
        passwordVisibility.setAttribute("data-visibile", "");
        passwordVisibility.children[0].src = "../images/eye.png";
        password.setAttribute("type", "text");
    }
}

