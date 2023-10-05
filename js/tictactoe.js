


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




function init() {
    Fields.forEach(element => {
        element.childNodes = new Array();
        element.addEventListener("click", function clicked(element){
            element.target.insertAdjacentHTML("beforeend", playerIcon);
            element.target.removeEventListener("click", clicked)
        });
    });
    
}
function AddPlayerIconToElement(element){
    element.insertAdjacentHTML
}

