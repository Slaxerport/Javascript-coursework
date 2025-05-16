let code = document.getElementById("code");
let isEverythingRight;
let finalParameters = new Array();
let finalValues = new Array();
let defaultValues = new Array();
let localStorage = window.localStorage;
let userLogin = localStorage.getItem("enteredLogin");
let users = JSON.parse(localStorage.getItem("users"));
let userIndex = users.findIndex((user)=>{return user.login == userLogin});
let currentAccount = users[userIndex];
let nextButton = document.getElementById("next-button");
let savedCode = currentAccount.savedCode;
let switcher = document.getElementById("level-switcher");
let openedLevels = currentAccount.openedLevels;
let level = currentAccount.level;
let description = document.getElementById("description");
let output = document.getElementById("output"); 
let changingObject;
let countOfChangingParameters;
let fish = document.createElement("div");
let editor = document.getElementById("editor");
let lockedCode = document.getElementsByClassName("locked-code")[0];
let fishMother = document.createElement("div");
fishMother.classList.add("fish-mother");
fishMother.innerHTML = `<img src = "../images/fish-mother.png">`;
let fishHouse = document.createElement("div");
fishHouse.innerHTML = `<img src = "../images/fish-house.png">`
fishHouse.classList.add("fish-house");
let extraLockedCode;
let label = document.getElementById("label");
let levelSwitcher = document.getElementById("level-switcher");

window.onbeforeunload = save;
function save(link = null){
    if(code.value != undefined){
        savedCode[level] = code.value;
    }
    currentAccount.savedCode = savedCode;
    currentAccount.openedLevels = openedLevels;
    currentAccount.level = level;
    users[userIndex] = currentAccount;
    localStorage.setItem("users", JSON.stringify(users));
    if(link){
        window.location.href = link;
    }
}
function nextLevel(event){
    if (level > 11) return;
    savedCode[level] = code.value;
    level++;
    if(level!=1){
        if(openedLevels[level-1]) switcher.children[level-2].style["border"] = "1px solid rgb(224, 155, 25)";
        else switcher.children[level-2].style["border"] = "1px solid rgb(134, 133, 131)";
        switcher.children[level-1].style["border"] = "1px solid rgb(255, 255, 255)";
        if(savedCode[level]!=undefined) code.value = savedCode[level];
        else code.value = "";
        selectCurrentLevel();
    }
}
function prevLevel(){
    savedCode[level] = code.value;
    if (level > 1) level--;
    if(openedLevels[level+1]) switcher.children[level].style["border"] = "1px solid rgb(224, 155, 25)";
    else switcher.children[level].style["border"] = "1px solid rgb(134, 133, 131)";
    switcher.children[level-1].style["border"] = "1px solid rgb(255, 255, 255)";
    if(savedCode[level]!=undefined) code.value = savedCode[level];
    else code.value = "";
    selectCurrentLevel();
}
function tableLevel(event){
    savedCode[level] = code.value;
    if(openedLevels[level]) switcher.children[level-1].style["border"] = "1px solid rgb(224, 155, 25)";
    else switcher.children[level-1].style["border"] = "1px solid rgb(134, 133, 131)";
    level = parseInt(event.target.innerText);
    switcher.children[level-1].style["border"] = "1px solid rgb(255, 255, 255)";
    if(savedCode[level]!=undefined) code.value = savedCode[level];
    else code.value = "";
    selectCurrentLevel();
}
function levelLocking(){
    for(i = 1; i<=12; i++){
        if(openedLevels[i] == true){
            switcher.children[i-1].style["background-color"] = "rgb(224, 155, 25)";
            switcher.children[i-1].style["border"] = "1px solid rgb(224, 155, 25)";
            switcher.children[i-1].classList.add("opened-level");
        }
        else{
            switcher.children[i-1].style["background-color"] = "rgb(134, 133, 131)";
            switcher.children[i-1].style["border"] = "1px solid rgb(134, 133, 131)";
            switcher.children[i-1].classList.remove("opened-level");
        }
    }
}
function selectCurrentLevel(){
    for(let i = 0; editor.children[i]!=undefined; i++){
        if(!editor.children[i].hasAttribute("data-do-not-delete")){
            editor.children[i].remove();
            i--;
        }
    }
    if(savedCode[level]!=undefined) code.value = savedCode[level];
    document.getElementsByClassName("fst-locked-code-child")[0].innerText = ".fish {"
    fishMother.remove();
    fishMother.style = ``;
    output.innerHTML = ``; 
    output.style = "";
    if(extraLockedCode) extraLockedCode.remove();
    output.classList.add("output"); 
    fish.style = ``;
    fish.setAttribute("id", "fish");
    fish.innerHTML = `<img src = "../images/fish.png">`;
    fishHouse.style = ``;
    nextButton.setAttribute("onclick", null);
    switch(level){
        case 1:
            output.insertAdjacentElement("beforeend", fish);
            changingObject = fish;
            countOfChangingParameters = 2;
            description.innerHTML = `При верстке страниц часто приходится изменять позицию элементов. Одним из подходящих инструментов для этого являются свойства <span class = "select">left</span>, <span class = "select">right</span>, <span class = "select">top</span>, <span class = "select">bottom</span>. В качестве значения можно использовать проценты(%) или пиксели(px). Переместите рыбку в центр(на самом деле не совсем в центр, но к этому мы вернёмся позже) используя модификаторы <span class = "select">left</span> и <span class="select">top</span>, при этом укажите значение в процентах.`;
            finalParameters = ["left", "top"];
            finalValues = ["50%", "50%"];
            defaultValues = ["0%", "0%"];
            break;
        case 2:
            output.insertAdjacentElement("beforeend", fish);
            changingObject = fish;
            countOfChangingParameters = 2;
            description.innerHTML = `Как уже было сказано, значение можно указывать и в px. Переместите рыбку на <span class = "select-size">100px</span> влево и <span class = "select-size">50px</span> вниз, используя модификаторы <span class = "select">left</span> и <span class="select">top</span>, при этом укажите значение в пикселях(<b>px</b>).`;
            finalParameters = ["left", "top"];
            finalValues = ["100px", "50px"];
            defaultValues = ["0%", "0%"];  
            break;  
        case 3:
            fish.style.position = "relative";
            output.insertAdjacentElement("beforeend", fish);
            changingObject = fish;
            countOfChangingParameters = 2;
            description.innerHTML = `Данным свойствам можно также присваивать отрицательные значение, которые будут изменять направление движения, устанавливаемое модификатором, на противоположное. То есть, записи <span class = "select-code">left: 10%</span> будет эквивалентна запись <span class = "select-code">right: -90%</span>. Выполните предыдущее задание с использованием модификаторов <span class="select">right</span> и <span class="select">bottom</span>.`;
            finalParameters = ["right", "bottom"];
            finalValues = ["-50%", "-50%"];
            defaultValues = ["0%", "0%"];
            break;
        case 4:
            addLockedCode(`<p>left: 50%;</p>
            <p>top: 50%;</p>`);
            fish.style = `left: 50%;
                          top: 50%;`
            editor.insertAdjacentElement("afterbegin", lockedCode);
            output.insertAdjacentElement("beforeend", fish);
            changingObject = fish;
            countOfChangingParameters = 1;
            description.innerHTML = `Рассмотрим свойство <span class = "select">position</span>. Данное свойство определяет тип позиционирования и может принимать несколько значений. Самое простое из них - <b>static</b>(с англ. <i>статический</i>). Оно присваивается каждому элементу по умолчанию и такой элемент ещё называют не позиционированным. На него не будут действовать свойства положения, такие как <span class = "select">left</span>, <span class = "select">right</span>, <span class = "select">top</span>, <span class = "select">bottom</span>. Задайте элементу свойство <span class = "select">position</span> как <b>static</b>, чтобы свойства <span class = "select">left</span> и <span class = "select">top</span> перестали действовать.`;
            finalParameters = ["position"];
            finalValues = ["static"];
            defaultValues = ["absolute"];
            break;
        case 5:
            addLockedCode(`<p>top: 100px;</p>
            `);
            fish.style.top = "100px";
            editor.insertAdjacentElement("afterbegin", lockedCode);
            output.insertAdjacentElement("afterbegin", fishMother);
            output.insertAdjacentElement("beforeend", fish);
            changingObject = fish;
            countOfChangingParameters = 1;
            description.innerHTML = `Следующее возможное значение свойства <span class = "select">position</span> - <b>relative</b>(с англ. <i>относительный</i>). При нём элемент будет позиционироваться относительно того места, где бы он находился при <span class = "select-code">position: static</span>. Рассмотрим на примере: сейчас рыбка находится на расстоянии <span class = "select-size">100px</span> от верхнего края поля. При относительном позиционировании отступ будет отсчитываться от рыбы-мамы. Убедитесь в этом сами!`;
            finalParameters = ["position"];
            finalValues = ["relative"];
            defaultValues = ["absolute"];
            break;
        case 6:
            addLockedCode(`<p>top: 100px;</p>
            `);
            fish.style = `position: absolute;
                          top: 100px;`
            editor.insertAdjacentElement("afterbegin", lockedCode);
            output.insertAdjacentElement("afterbegin", fishMother);
            output.insertAdjacentElement("beforeend", fish);
            changingObject = fish;
            countOfChangingParameters = 1;
            description.innerHTML = `Тот же самый пример, только теперь установим <span class = "select">position</span>: <b>absolute</b>(с англ. <i>абсолютный</i>). Элемент будет отпозиционирован относительно ближайшего позиционированного(свойство <span class = "select">position</span> не <b>static</b>) родительского элемента, то есть рыбы-мамы.`;
            finalParameters = ["position"];
            finalValues = ["absolute"];
            defaultValues = ["relative"];
            break;
        case 7:
            fish.style.position = "absolute";
            output.style['overflow'] = "auto";
            output.style['height'] = "2000px";
            editor.insertAdjacentElement("afterbegin", lockedCode);
            output.insertAdjacentElement("beforeend", fish);
            changingObject = fish;
            countOfChangingParameters = 1;
            description.innerHTML = `Ещё одно возможное значение <span class = "select">position</span> - <b>fixed</b>(с англ. <i>фиксированный</i>). Элемент убирается из основного потока документа. То есть перестаёт влиять на положение окружающих элементов и на размер родителя. Можно представить себе, что элемент уходит на слой выше и перестаёт взаимодействовать со всеми элементами, кроме своих потомков.
            Элемент позиционируется относительно окна браузера, за исключением случаев, если один из родителей имеет значения свойств <b>transform</b>, <b>perspective</b> или <b>filter</b>, отличные от <span class = "select-size">none</span>. В этом случае блок становится опорным, и позиционирование будет производиться уже относительно него, а не окна браузера. Вы можете сами убедиться в этом, пролестнув страницу вниз.`;
            finalParameters = ["position"];
            finalValues = ["fixed"];
            defaultValues = ["absolute"];
            break;
        case 8:
            output.style['overflow'] = "auto";
            output.style['height'] = "2000px";
            fishHouse.style = `position: absolute;
                               top: 0;
                               left: 0;`

            output.insertAdjacentElement("afterbegin", fishHouse);
            output.insertAdjacentElement("afterbegin", fish);
            changingObject = fish;
            countOfChangingParameters = 2;
            description.innerHTML = `Переместите рыбку на <span class = "select-size">200px</span> влево от дома, учитывая, что при <span class = "select-code">position: static</span> она находиться в нём.`;
            finalParameters = ["position", "left"];
            finalValues = ["relative", "200px"];
            defaultValues = ["absolute", "0px"];
            break;
        case 9:
            addLockedCode(`<p>.fish-house {</p>
                <p>left: 50%;</p>
                <p>top: 50%;</p>
                <p>transform: translate(-50%, -50%);</p>
                <p>}</p>

`, "beforebegin");
            // fishHouse.style.left = "50%";
            // fishHouse.style.top = "50%";
            // fishHouse.style.transform = "translate(-50%, -50%)"
            fishHouse.style =  `left: 50%;
                                top: 50%;
                                transform: translate(-50%, -50%);`
            output.insertAdjacentElement("afterbegin", fishHouse);
            output.insertAdjacentElement("beforeend", fish);
            changingObject = fish;
            countOfChangingParameters = 3;
            description.innerHTML = `Пришло время познакомиться со свойством <span class = "select">transform</span>. С помощью него к элементу применяется трансформация. В отличие от свойств-направлений, данное свойство не затрагивает другие элементы и при его применении затрачивается меньше ресурсов, т.к браузеру не нужно перестраивать макет страницы. Одним из его значений может быть функция <b>translate</b>. Она принимает два аргумента: смещение по оси X и по оси Y. Если они одинаковые, достаточно передать его один раз. При указании значения в процентах они будет отсчитываться от ширины(для оси X, первого аргумента) и от высоты(для оси Y, второго аргумента) объекта. Отрицательные значения будут изменять направление на противоположное. Процентные значения будут отсчитываться от ширины и высоты объекта для осей X и Y соответственно. Задавая значения свойств <span class = "select">left</span> и <span class = "select">top</span> <span class = "select-size">50%</span> мы не перемещали рыбку точно в центр. Мы делали это с её верхним левым углом. Теперь же, можем сделать это с её центром при помощи <span class = "select-code">transform: translate()</span> Верните рыбку домой, переместив в центр экрана.`;            
            finalParameters = ["left", "top", "transform"];
            finalValues = ["50%", "50%", "translate(-50%, -50%)"];
            defaultValues = ["translate(0px)"];
            break;
        case 10:
            output.insertAdjacentElement("beforeend", fish);
            extraLockedCode = document.createElement("div");
            extraLockedCode.classList.add("locked-code");
            extraLockedCode.innerHTML = `<p>top: 50%;</p>`;
            fish.style.top = "50%";
            document.getElementsByClassName("locked-code")[0].insertAdjacentElement("afterend", extraLockedCode);
            changingObject = fish;
            countOfChangingParameters = 1;
            description.innerHTML = `Вращение объектов осуществляется по определённой оси. Функция <b>rotate()</b> вращает объект по оси Z. Если попытаться представить это, то данная ось "выходит" из экрана устройства перпендикулярно плоскости этого экрана. Осуществите поворот рыбки на <span class = "select-size">90 градусов</span>, чтобы она была напрвлена к дому. `;            
            output.insertAdjacentElement("afterbegin", fishHouse);
            finalParameters = ["transform"];
            finalValues = ["rotate(90deg)"];
            defaultValues = ["rotate(0)"];
            break;
        case 11:
            document.getElementsByClassName("fst-locked-code-child")[0].innerText = ".fish-house {";
            output.insertAdjacentElement("beforeend", fish);
            extraLockedCode = document.createElement("div");
            extraLockedCode.classList.add("locked-code");
            extraLockedCode.innerHTML = `<p>top: 50%;</p>`;
            document.getElementsByClassName("locked-code")[0].insertAdjacentElement("afterend", extraLockedCode);
            fish.style.top = "50%";
            changingObject = fishHouse;
            countOfChangingParameters = 1;
            description.innerHTML = `Следующая функция, задающаяся свойству transform и которую стоит рассмотреть, &#8211; <b>scale()</b>. Данное свойство отвечает за масштабирование объекта. Значения X и Y — это положительные числа, либо 0. Если в функцию передать 0, то элемент не будет виден. Единица соответствует нормальному масштабу. Числа от 0 до 1 — это уменьшенный масштаб. Числа больше единицы — увеличенный масштаб. Например, чтобы визуально увеличить элемент в 2 раза, нужно написать <span class = "select-code">transform: scale(2)</span>. Уменьшите дом в 2 раза. `;            
            output.insertAdjacentElement("afterbegin", fishHouse);
            finalParameters = ["transform"];
            finalValues = ["scale(0.5)"];
            defaultValues = ["scale(1)"];
            break;
        case 12:
            fishHouse.insertAdjacentElement("beforeend", fish);
            extraLockedCode = document.createElement("div");
            extraLockedCode.classList.add("locked-code");
            changingObject = fish;
            countOfChangingParameters = 2;
            description.innerHTML = `Переместите рыбку на <span class = "select-size">150px</span> вниз от дома, учитывая то, что он - её родительский элемент с позицией, отличной от <b>static</b>.`;            
            output.insertAdjacentElement("afterbegin", fishHouse);
            finalParameters = ["top", "position"];
            finalValues = ["150px", "absolute"];
            defaultValues = ["0px", "relative"];
            break;
        case 13:
            fishHouse.insertAdjacentElement("beforeend", fish);
            changingObject = fish;
            countOfChangingParameters = 2;
            description.innerHTML = `Переместите рыбку на <span class = "select-size">150px</span> вниз от дома, учитывая то, что он - её родительский элемент с позицией, отличной от <b>static</b>.`;            
            output.insertAdjacentElement("afterbegin", fishHouse);
            finalParameters = ["top", "position"];
            finalValues = ["150px", "absolute"];
            defaultValues = ["0px", "relative"];
            break;
    }
    document.getElementById("level-status").innerText = "".concat("Уровень ", level, " из 20") 
    checkWhatIsWritten();   
}

document.addEventListener("click", function(event){
    if(levelSwitcher.style["visibility"] == "visible" && !event.target.classList.contains("level") && !event.target.classList.contains("no-closing")){
        levelSwitcher.style["visibility"] = "hidden";
    }
})



levelLocking();

switcher.children[level-1].style["border"] = "1px solid rgb(255, 255, 255)";
selectCurrentLevel();


function changeVisibility(){
    let switcher = document.getElementById("level-switcher");
    switcher.style["visibility"] == "hidden" ? switcher.style["visibility"] = "visible" : switcher.style["visibility"] = "hidden";
}

function checkWhatIsWritten(){
    
    let fcode = code.value.replaceAll(/\s*(?=:)|(?<=:)\s*|\s*(?=;)|\r|(?<=;)\s*/gm, ''); 
    rightParameters = 0;
    let index;
    for(let i = 0; i<countOfChangingParameters; i++){
        index = fcode.indexOf(finalParameters[i]+":"+finalValues[i]+';');
        if(index != -1 && (fcode[index-1] == ';' || index==0)){
            changingObject.style.setProperty(finalParameters[i], finalValues[i]);
            rightParameters++;
        }
        else{
            changingObject.style.setProperty(finalParameters[i], defaultValues[i]);
        }
    }
    
    if(rightParameters == countOfChangingParameters){
        openedLevels[level] = true;
        if(level < 12){
            nextButton.style["background-color"] = "rgb(17, 168, 3)";
            nextButton.onclick = nextLevel;
        }   
    }
    else{
        openedLevels[level] = false;
        nextButton.style["background-color"] = "rgb(132, 126, 126)";
    }
    levelLocking();
    switcher.children[level-1].style["border"] = "1px solid rgb(255, 255, 255)";
}

function addLockedCode(code, place = null){
    extraLockedCode = document.createElement("div");
    extraLockedCode.classList.add("locked-code");
    extraLockedCode.innerHTML = code;
    if(place){
        lockedCode.insertAdjacentElement(place, extraLockedCode);
    }
    else{
        lockedCode.insertAdjacentElement("afterend", extraLockedCode);
    }
}