let login = document.getElementById("login");
let password = document.getElementById("password");
let localStorage = window.localStorage;
let registrationButton = document.getElementById("registration");
let users = JSON.parse(localStorage.getItem("users"));
let invalidLoginWarning = document.createElement("p");
let invalidPasswordWarning = document.createElement("p");
let regex;
invalidLoginWarning.classList.add("wrong");
invalidPasswordWarning.classList.add("wrong");
let passwordVisibility = document.getElementById("visibility");
let passwordInput = document.getElementById("password");

addEventListener("keydown", (event)=>{
    if(event.key == "Enter") check();
})

function check(){
    regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/);
    if(users.findIndex((user) => {return user.login == login.value;})!=-1){
        invalidLoginWarning.innerHTML = "Пользователь с таким именем уже существует";
        login.insertAdjacentElement("afterend", invalidLoginWarning);
        return false;
    }
    else if(login.nextElementSibling.getAttribute("class")=="wrong"){
        invalidLoginWarning.remove();
    }
    if(!regex.test(password.value)){
        invalidPasswordWarning.innerHTML = "Пароль должен содержать от 8 до 20 символов, среди которых обязательно должны быть цифры, заглавные и строчные буквы";
        password.insertAdjacentElement("afterend", invalidPasswordWarning);
        return false;
    }
    else if(password.nextElementSibling.getAttribute("class")=="wrong"){
        invalidPasswordWarning.remove();
    }
    return true;
}
function registration(){
    if(check()){
        let newUser = {
            login: login.value,
            password: password.value,
            savedCode: new Array(20).fill(undefined),
            openedLevels: new Array(20).fill(false),
            level: 1,
        }
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        location.href = "logon.html";
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
