const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container"); 

const grantAccessConatiner = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

// initially variables needed
 let oldTab=  userTab // by default application usereweather pe open hogi
 const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
 currentTab.classList.add("current-tab");


 function switchTab(clickedTab){
    if(newTab!= currentTab){
        oldTab.classList.remove("current-tab");
        oldTab = clickedTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
         userInfoContainer.classList.remove("active");
         grantAccessContainer.classList.remove("active");
         searchForm.classList.add("active");
        }
        else {
         // main pehle search wale tab par tha, ab your weather tsb visible krna hai
         searchForm.classList.remove("active");
         userInfoContainer.classList.remove("active");
         // ab main your weather tab mein aa gya hu to weather bhi display krna padega, so check local storage first
         // for coordinates if we haved save them there.
         getfromSessionStorage();
        }
    }
 }

 userTab.addEventListener("click", () => {
    // pass clicked tab as input parameter
    switchTab(userTab);
 });

 searchTab.addEventListener("click", () => {
    // pass clicked tab as input parameter
    switchTab(searchTab);
 });

 // check if coordinates are already present in session storage
 function getfromSessionsStorage(){
   const localCoordinates = sessionStorage.getItem("user-coordinates");
   if(!localCoordinates){
      // agar local coordinates nhi mile 
      grantAccessConatiner.classList.add("active");
   }
   else{
      const coordinates = JSON.parse(localCoordinates);
      fetchUserWeatherInfo(coordinates);
   }

 }

 async function fetchUserWeatherInfo(coordinates){
   const{lat,lon} = coordinates;
   // make grantconatiner invisible
   grantAccessConatiner.classList.remove("active");
   // make loader visible
   loadingScreen.classList.add("active");

   // API CALL
   try {
      const res = await fetch(
         'https://api.openweathermap.org/data/2.5/weather?lat=$(lon)&appid=${API_KEY}&units=metric'
      );
      const data = await response.json();
      loadingScreen.classList.remove("active");
      userInfoContainer.classList.add("active");
      renderWeatherInfo(data);
   }
   catch(err){
      loadingScreen

   }
 }
