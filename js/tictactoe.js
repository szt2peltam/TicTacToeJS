


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
    ButtonValue == "O_ICON" ? Aimode = "hardAI" : Aimode = "easyAI";
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
let Aimode = "hardAI"
function init() {
    IndexMapInit();
    ClearGameMap();
    stepcount = 0;
    if(Aimode == "hardAI" ){
        EmptyIndexes[4] = 2;
        PlaceAtIndex(4);
    }
    Fields.forEach(element => {
        
        element.childNodes = new Array();
    
        element.addEventListener("click",  function clicked(element){
            elementIndex = element.target.dataset.index;
            if(EmptyIndexes[elementIndex] == 0){

                if(EmptyIndexes[elementIndex] == 0){
                    element.target.insertAdjacentHTML("beforeend", playerIcon);
                    EmptyIndexes[elementIndex] += 1;
                    stepcount++;
                    PlayerHasClicked(Aimode,stepcount,elementIndex);
                } 
                checkWinner();
                element.target.removeEventListener("click", clicked);
                
            }
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

function PlayerHasClicked(aimode,stepcount,lastPlacementIndex){
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


    }else{

        HardAI(lastPlacementIndex, stepcount)
    }


    


    
}


function PlacedInCorner(lastPlacementIndex){
    if(lastPlacementIndex == 0 || lastPlacementIndex == 2 || 
        lastPlacementIndex == 6 ||lastPlacementIndex == 8
        ) return true;

    return false;
}


function PlacedInSide(lastPlacementIndex){
    if(lastPlacementIndex ==  1 ||lastPlacementIndex == 3 ||lastPlacementIndex == 5 || lastPlacementIndex == 7) return true;
    return false;
}

let startType = "";
function HardAI(lastPlacementIndex,stepcount){

    if(stepcount == 1){
        if(lastPlacementIndex == 1){
            startType = "side1";
            PlaceAtIndex(0);
        }
        if(lastPlacementIndex == 3){
            startType = "side2";
            PlaceAtIndex(6);
        }
        if(lastPlacementIndex == 5){
            startType = "side3";
            PlaceAtIndex(8);
        }
        if(lastPlacementIndex == 7){
            startType = "side4";
            PlaceAtIndex(6);
        }
        if(lastPlacementIndex == 0){
            startType = "corner1";
            PlaceAtIndex(2);
        }
        if(lastPlacementIndex == 2){
            startType = "corner2";
            PlaceAtIndex(0);
        }
        if(lastPlacementIndex == 6){
            startType = "corner3";
            PlaceAtIndex(0);
        }
        if(lastPlacementIndex == 8){
            startType = "corner4";
            PlaceAtIndex(2);
        }
    }

    else if(stepcount == 2){
        if(startType == "side1"){
            if(EmptyIndexes[8] == 0) PlaceAtIndex(8);
            else{
                PlaceAtIndex(6)
            }
        }
        if(startType == "side2"){
            if(EmptyIndexes[2] == 0) PlaceAtIndex(2);
            else{
                PlaceAtIndex(8)
            }
        }
        if(startType == "side3"){
            if(EmptyIndexes[0] == 0) PlaceAtIndex(0);
            else{
                PlaceAtIndex(6)
            }
        }
        if(startType == "side4"){
            if(EmptyIndexes[2] == 0) PlaceAtIndex(2);
            else{
                PlaceAtIndex(0)
            }
        }
        if(startType == "corner1"){
            if(EmptyIndexes[6] == 0) PlaceAtIndex(6);
            else{
                PlaceAtIndex(3)
            }
        }
        if(startType == "corner2"){
            if(EmptyIndexes[8] == 0) PlaceAtIndex(8);
            else{
                PlaceAtIndex(5)
            }
        }
        if(startType == "corner3"){
            if(EmptyIndexes[8] == 0) PlaceAtIndex(8);
            else{
                PlaceAtIndex(7)
            }
        }
        if(startType == "corner4"){
            if(EmptyIndexes[6] == 0) PlaceAtIndex(6);
            else{
                PlaceAtIndex(7)
            }
        }
    }
    else if(stepcount == 3){
        if(startType == "side1"){
            if(EmptyIndexes[2] == 0) PlaceAtIndex(2);
            if(EmptyIndexes[3] == 0) PlaceAtIndex(3);
        }
        if(startType == "side2"){
            if(EmptyIndexes[7] == 0) PlaceAtIndex(7);
            if(EmptyIndexes[0] == 0) PlaceAtIndex(0);
        }
        if(startType == "side3"){
            if(EmptyIndexes[2] == 0) PlaceAtIndex(2);
            if(EmptyIndexes[7] == 0) PlaceAtIndex(7);
        }
        if(startType == "side4"){
            if(EmptyIndexes[3] == 0) PlaceAtIndex(3);
            if(EmptyIndexes[8] == 0) PlaceAtIndex(8);
        }
        if(startType == "corner1"){
            if(EmptyIndexes[5] == 0) PlaceAtIndex(5);
            else{
                PlaceRandom()
            }
        }
        if(startType == "corner2"){
            if(EmptyIndexes[3] == 0) PlaceAtIndex(3);
            else{
                PlaceRandom()
            }
        }
        if(startType == "corner3"){
            if(EmptyIndexes[1] == 0) PlaceAtIndex(1);
            else{
                PlaceRandom()
            }
        }
        if(startType == "corner4"){
            if(EmptyIndexes[1] == 0) PlaceAtIndex(1);
            else{
                PlaceRandom()
            }
        }

    }else{
        PlaceRandom()
    }


}


function PlaceAtIndex(index){
    EmptyIndexes[index] = 2;
    Fields.forEach(element => {
        if(element.dataset.index == index) {
            element.insertAdjacentHTML("beforeend", AIIcon)
        }
    });

}


function PlaceInOpposite(lastPlacementIndex){
    if(IsThereEmpty()){
            if(lastPlacementIndex == 1) PlaceAtIndex(7);
            if(lastPlacementIndex == 2) PlaceAtIndex(6);
            if(lastPlacementIndex == 3) PlaceAtIndex(5);
            if(lastPlacementIndex == 5) PlaceAtIndex(3);
            if(lastPlacementIndex == 6){
                if(EmptyIndexes[2] == 0)PlaceAtIndex(2);
                else{
                    PlaceRandom()
                }
            } 
            if(lastPlacementIndex == 7) PlaceAtIndex(1);
            if(lastPlacementIndex == 8){
                if(EmptyIndexes[2] == 0)PlaceAtIndex(2);
                else{
                    PlaceRandom()
                }
            } 

    }
}


function PlaceRandom(){
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
        else if(checkIfAIWon()){
            ShowEndMenu("AI")
        }else if(
            !IsThereEmpty()){
                ShowEndMenu("DRAW")
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

