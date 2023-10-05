


//START MENU
const X_ICON_BTN = document.querySelector(".x-icon-btn");
const O_ICON_BTN = document.querySelector(".o-icon-btn");

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

function init() {
    IndexMapInit();
    Fields.forEach(element => {
        element.childNodes = new Array();

        element.addEventListener("click", function clicked(element){
            let elementIndex = element.target.dataset.index;


            if(EmptyIndexes[elementIndex] == 0){
                element.target.insertAdjacentHTML("beforeend", playerIcon);
                EmptyIndexes[elementIndex] += 1;
                PlayerHasClicked();
            } 

            element.target.removeEventListener("click", clicked);
        });
    });
    
}
function AddPlayerIconToElement(element){
    element.insertAdjacentHTML
}

//GAME STATE END

EmptyIndexes.forEach(element =>{
    console.log(element);
})

//EASY AI

function PlayerHasClicked(){
    


    if(IsThereEmpty()){
            let RandomIndex = getRandomInt(8);
            do{
                RandomIndex = getRandomInt(8);
                console.log(RandomIndex);
            }
            while(EmptyIndexes[RandomIndex] != 0)
            EmptyIndexes[RandomIndex] += 1;
            Fields.forEach(element => {
                if(element.dataset.index == RandomIndex) {
                    element.insertAdjacentHTML("beforeend", AIIcon)
                }
            });

    }



    
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function IsThereEmpty(){

    if(EmptyIndexes[0] == 1
       && EmptyIndexes[1] == 1
       && EmptyIndexes[2] == 1
       && EmptyIndexes[3] == 1
       && EmptyIndexes[4] == 1
       && EmptyIndexes[5] == 1
       && EmptyIndexes[6] == 1
       && EmptyIndexes[7] == 1
       && EmptyIndexes[8] == 1
        ) return false

    return true;
}
