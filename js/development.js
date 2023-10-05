

let isDevelopment = true; // Set to true to skip start screen

let Startmenu = document.querySelector(".Start-Menu");

isDevelopment ? Startmenu.style.visibility = "hidden" : "";
if(isDevelopment){
    document.querySelector(".Game-Menu").classList.remove("not-visible");
     init() 
}
