let enterButton = document.getElementById("enter");
let exitButton = document.getElementById("exit");
let enteredLogin = window.localStorage.getItem("enteredLogin");
let isEntered = window.localStorage.getItem("isEntered");
if(isEntered==null){
    window.localStorage.setItem("isEntered", "false");
    isEntered = "false";
} 
if(window.localStorage.getItem("users")==null) window.localStorage.setItem("users", JSON.stringify([]));
function redirect(){
    location.href = "logon.html";
}
function exit(){
    window.localStorage.setItem("isEntered", false);
    location.href = "logon.html";
}

function play(){
    if(isEntered=="false"){
        let lockedBackground = document.createElement('div');
        lockedBackground.classList.add("locked-background");
        document.getElementsByClassName("game")[0].insertAdjacentElement("afterend", lockedBackground);
        let popUp = document.createElement('div');
        popUp.classList.add("pop-up");
        popUp.innerHTML = `
        <p>Вход в аккаунт не осуществлён. <a href="logon.html" id = "sign-in">Войдите в аккаунт</a>.</p>
        <p id = "no-account">Нет аккаунта? <a>Зарегистрироваться</a></p>
        <button type = "button" id = "close-button" ><img src="../images/icons8-крестик-78.png" alt=""></button>
        `;
        lockedBackground.insertAdjacentElement("afterend", popUp)
        document.getElementById("close-button").onclick = () => {
            popUp.addEventListener("animationend", () => {popUp.style.visibility = "hidden";});
            lockedBackground.addEventListener("animationend", () => {lockedBackground.style.visibility = "hidden";});
            popUp.style.animation = ['closing 0.2s ease-in-out 0s 1 normal forwards running'];
            lockedBackground.style.animation = ['unlocking 0.2s ease-in-out 0s 1 normal forwards running'];
        };
        document.getElementById("no-account").onclick = function(){
            location.href = "registration.html";
        }
        popUp.style.animation = ['pop-up-animation 0.2s ease-in-out 0s 1 normal forwards running'];
        lockedBackground.style.animation = ['locking 0.2s ease-in-out 0s 1 normal forwards running'];
    }
    else{
        location.href = "../game/game.html";
    }
}

if(isEntered=="true"){
    let profile = document.createElement("div");
    profile.innerHTML = `${enteredLogin}`;
    profile.classList.add("profile");
    enterButton.insertAdjacentElement("afterend", profile);
    enterButton.remove();
}
else{
    exitButton.remove();
}
