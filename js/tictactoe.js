


//START MENU
const X_ICON_BTN = document.querySelector(".x-icon-btn");
const O_ICON_BTN = document.querySelector(".o-icon-btn");
const STARTMENU = document.querySelector(".Start-Menu");
const GAMEMENU = document.querySelector(".Game-Menu")
X_ICON_BTN.addEventListener("click", (e) => ChoosePlayerIcon(e.target.dataset.btnvalue) );
O_ICON_BTN.addEventListener("click", (e) => ChoosePlayerIcon(e.target.dataset.btnvalue) );
const X_ICON = `<ion-icon name="close-outline" class="x-icon"></ion-icon>`;
const O_ICON = `<ion-icon name="ellipse-outline" class="o-icon"></ion-icon>`;

let playerIcon = X_ICON;
let AIIcon = O_ICON;
function ChoosePlayerIcon(ButtonValue){
    ButtonValue == "X_ICON" ? playerIcon = X_ICON : playerIcon = O_ICON;
    ButtonValue == "X_ICON" ? AIIcon = O_ICON : AIIcon = X_ICON;
    HideStartMenu();
    ShowGameMenu();
}

function HideStartMenu(){
    STARTMENU.classList.add("not-visible");
}
function ShowStartMenu() {
    STARTMENU.classList.remove("not-visible");
    GAMEMENU.classList.add("not-visible");
    ENDMENU.classList.add("not-visible");



}
function ShowGameMenu(){
    GAMEMENU.classList.remove("not-visible");
    init();

}
//START MENU END



//GAME STATE
const Fields = document.querySelectorAll(".game-field");
let EmptyIndexes = new Map()
EmptyIndexes['0'] = 0;
EmptyIndexes['1'] = 0;
EmptyIndexes['2'] = 0;
EmptyIndexes['3'] = 0;
EmptyIndexes['4'] = 0;
EmptyIndexes['5'] = 0;
EmptyIndexes['6'] = 0;
EmptyIndexes['7'] = 0;
EmptyIndexes['8'] = 0;
let stepcount = 0;
function IndexMapInit(){
    EmptyIndexes['0'] = 0;
    EmptyIndexes['1'] = 0;
    EmptyIndexes['2'] = 0;
    EmptyIndexes['3'] = 0;
    EmptyIndexes['4'] = 0;
    EmptyIndexes['5'] = 0;
    EmptyIndexes['6'] = 0;
    EmptyIndexes['7'] = 0;
    EmptyIndexes['8'] = 0;

}
let elementIndex;
function init() {
    IndexMapInit();
    ClearGameMap();
    Fields.forEach(element => {
        element.childNodes = new Array();

        element.addEventListener("click", function clicked(element){
            elementIndex = element.target.dataset.index;


            if(EmptyIndexes[elementIndex] == 0){
                element.target.insertAdjacentHTML("beforeend", playerIcon);
                EmptyIndexes[elementIndex] += 1;
                stepcount++;
                PlayerHasClicked("hardAI");
            } 
            checkWinner();
            element.target.removeEventListener("click", clicked);
        });
    });
    
}

function ClearGameMap() {
    Fields.forEach(element => {
        console.log(element.childNodes);
        element.replaceChildren();
    });
}

//GAME STATE END

function PlayerHasClicked(aimode){
    
    if(aimode == "easyAI"){

        if(IsThereEmpty()){
                let RandomIndex;
                do{
                    RandomIndex = getRandomInt(9);
                }
                while(EmptyIndexes[RandomIndex] != 0)
                EmptyIndexes[RandomIndex] += 2;
                Fields.forEach(element => {
                    if(element.dataset.index == RandomIndex) {
                        element.insertAdjacentHTML("beforeend", AIIcon)
                    }
                });
    
        }

    }
    else if(aimode == "hardAI"){

        if(EmptyIndexes[4] == 1 && stepcount == 1){
            PlaceInRandomCorner()
        }
        else{
            PlaceInOpposite(elementIndex)
        }

    }



    
}



function PlaceInRandomCorner() {
    let corners = [0,2,6,8]

    let rndIndex = getRandomInt(3);
    EmptyIndexes[rndIndex] += 2;
    Fields.forEach(element => {
        if(element.dataset.index == corners[rndIndex]) {
            element.insertAdjacentHTML("beforeend", AIIcon)
        }
    });

}

function PlaceInOpposite(RandomIndexx){
    if(IsThereEmpty()){
        if(RandomIndexx == 0){
            PlaceAtIndex(8)
        }
        else if(RandomIndexx == 1){
            PlaceAtIndex(7)
        }
        else if(RandomIndexx == 2){
            PlaceAtIndex(6)
        }
        else if(RandomIndexx == 3){
            PlaceAtIndex(5)
        }
        else if(RandomIndexx == 5){
            PlaceAtIndex(3)
        }
        else if(RandomIndexx == 6){
            PlaceAtIndex(2)
        }
        else if(RandomIndexx == 7){
            PlaceAtIndex(1)
        }
        else if(RandomIndexx == 8){
            PlaceAtIndex(0)
        }

    }
}

function PlaceAtIndex(index){
    if(EmptyIndexes[index] == 0){

        EmptyIndexes[index] += 2
        Fields.forEach(element => {
            if(element.dataset.index == index) {
                element.insertAdjacentHTML("beforeend", AIIcon)
            }
        });
    }

}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function IsThereEmpty(){

    if(EmptyIndexes[0] != 0
       && EmptyIndexes[1] != 0
       && EmptyIndexes[2] != 0
       && EmptyIndexes[3] != 0
       && EmptyIndexes[4] != 0
       && EmptyIndexes[5] != 0
       && EmptyIndexes[6] != 0
       && EmptyIndexes[7] != 0
       && EmptyIndexes[8] != 0
        ) return false

    return true;
}
//EASY AI END

// WIN
function checkWinner(){
    if(checkIfPlayerWon()){
        ShowEndMenu("Player")
    }
    if(checkIfAIWon()){
        ShowEndMenu("AI")
    }
}

function checkIfPlayerWon(){
    return horizontal(1) || vertical(1) || diagonal(1);
}
function checkIfAIWon(){
    return horizontal(2) || vertical(2) || diagonal(2);

}

function horizontal(number) {
    let iterator=0;
    //Horizontal
    for (let index = 0; index < 3; index++) {
        if(EmptyIndexes[iterator] == number && EmptyIndexes[iterator+1] == number && EmptyIndexes[iterator+2] == number)return true;
        iterator += 3;        
    }
    return false;
}
function vertical(number) {
            //vertical
            let iterator = 0;
            for (let index = 0; index < 3; index++) {
                if(EmptyIndexes[iterator] == number && EmptyIndexes[iterator + 3] == number && EmptyIndexes[iterator +6] == number)return true;
                iterator += 1;
            }
            return false
}
function diagonal(number) {
    if(EmptyIndexes[0] == number && EmptyIndexes[4] == number && EmptyIndexes[8] == number)return true;
    if(EmptyIndexes[2] == number && EmptyIndexes[4] == number && EmptyIndexes[6] == number)return true;

    return false;
}

//WIN END

//END MENU

const ENDMENU = document.querySelector(".End-Menu");

function ShowEndMenu(WINNERDATA) {
    GAMEMENU.classList.add("not-visible");
    ENDMENU.classList.remove("not-visible");
    document.querySelector(".Winner").innerText = WINNERDATA
}

