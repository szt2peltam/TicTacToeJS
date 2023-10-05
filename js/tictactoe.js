


//START MENU
const X_ICON_BTN = document.querySelector(".x-icon-btn");
const O_ICON_BTN = document.querySelector(".o-icon-btn");

X_ICON_BTN.addEventListener("click", (e) => ChoosePlayerIcon(e.target.dataset.btnvalue) );
O_ICON_BTN.addEventListener("click", (e) => ChoosePlayerIcon(e.target.dataset.btnvalue) );
const X_ICON = `<ion-icon name="close-outline" class="x-icon"></ion-icon>`;
const O_ICON = `<ion-icon name="ellipse-outline" class="o-icon"></ion-icon>`;

let playerIcon = X_ICON;

function ChoosePlayerIcon(ButtonValue){
    ButtonValue == "X_ICON" ? playerIcon = X_ICON : playerIcon = O_ICON;
    HideStartMenu();
    ShowGameMenu();
}

function HideStartMenu(){
    document.querySelector(".Start-Menu").classList.add("not-visible");
}
function ShowGameMenu(){
    document.querySelector(".Game-Menu").classList.remove("not-visible");
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
EmptyIndexes['9'] = 0;

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
    EmptyIndexes['9'] = 0;

}

function init() {
    IndexMapInit();
    Fields.forEach(element => {
        element.childNodes = new Array();

        element.addEventListener("click", function clicked(element){
            let elementIndex = element.target.dataset.index;


            if(EmptyIndexes[elementIndex] == 0){
                element.target.insertAdjacentHTML("beforeend", playerIcon);
                EmptyIndexes[elementIndex] += 1;
            } 


            element.target.removeEventListener("click", clicked);
        });
    });
    
}
function AddPlayerIconToElement(element){
    element.insertAdjacentHTML
}

//GAME STATE END


//EASY AI




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


