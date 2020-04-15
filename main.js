// ==UserScript==
// @name        Checkboxes - Opencast
// @namespace   Violentmonkey Scripts
// @match       https://oc-presentation.ltcc.tuwien.ac.at/*
// @grant       none
// @version     1.2
// @author      edrunkorange
// @description 10.4.2020, 16:45:16 Adds Checkboxes for Videos on Opencast TU Wien
// ==/UserScript==


if(window.location.search.search('id') == 1){ // is it lonelyVideo?
  
  
  let id = window.location.search.substring(4);
  
  let LonelyVideo = setInterval(function () { // Initialliziring boxes

  if(document.querySelector("#fullscreen_video_wrapper")){
    console.log("you opened viedo!")

    var para = document.createElement("p");
       
    var x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
  

  
    if(localStorage.getItem(id))
      x.checked = true;
  
      para.appendChild(x);
       
      document.querySelector('#engage_basic_description').appendChild(para); 
      clearInterval(LonelyVideo)
  }

  }, 500);
  
  

  let checkking = setInterval(function lookingIftrue() { //function for checking if the box checked or not checking every 0.5s and saving/deleting from LocalStorage
    
  if(document.querySelector('input[type="checkbox"]') !== null && document.querySelector("#fullscreen_video_wrapper")){
    console.log("checking boxes")

    if(document.querySelector('input[type="checkbox"]').checked == true && localStorage.getItem(id) == null){
      console.log("checked: " + id)
      localStorage.setItem(id, "TRUE")
      
    }
    if(document.querySelector('input[type="checkbox"]').checked == false && localStorage.getItem(id) !== null){
    localStorage.removeItem(id)
    console.log("removed: " + id)
    }
  }

  }, 500);
  
}
else {  // This part is a menu of videos
  
let loaded = false;
let allVideos = 0;
var checkExist = setInterval(creatingboxes, 100); // check every 100ms
  
function creatingboxes() {
  console.log("creating boxing...")
  
   if (document.querySelector(".col-xs-12.col-sm-6.col-md-4.col-lg-4") !== null){
     if(true)
    {
      allVideos = document.querySelector('.container-fluid').children.length; // saving amount of video on the screen

      console.log("Exists!");
      
      let node = document.querySelector("#main-container");
      let list = node.childNodes;
      loaded = true;

      list.forEach( 
     function(currentValue, currentIndex, listObj) {
       
       if(document.querySelector('#main-container').childNodes[currentIndex].childNodes[1] == null){
    
      let id = currentValue.parentNode.children[currentIndex].children[0].id;
      var para = document.createElement("p");
       
      var x = document.createElement("INPUT");
      x.setAttribute("type", "checkbox");
      x.setAttribute("id", id);

      if(localStorage.getItem(id) !== null)
      x.checked = true;
      para.appendChild(x);
       
      
      // var element = document.querySelector(".activity.lti.modtype_lti ");
      currentValue.appendChild(para);  
      clearInterval(checkExist);
      }
      })   
     }
  }
 
}

let triedtofindvideos = 0;
let checkboxs = setInterval(function lookingIftrue() { // checking if the box is checked or not, so adding/removing from LocalStorage runs every 0.5s
  if (loaded){
    if (document.querySelector(".col-xs-12.col-sm-6.col-md-4.col-lg-4") !== null) {
  
      let node = document.querySelector("#main-container");
      let list = node.childNodes;
      
      let all = document.querySelectorAll('input[type="checkbox"]');
      all.forEach((button) => {
	       if(button.checked && localStorage.getItem(button.id) == null){
           console.log(button.id)
           localStorage.setItem(button.id, true);
         }
        else if(localStorage.getItem(button.id) !== null && button.checked == false){
          console.log("unchecked: " + button.id)
          localStorage.removeItem(button.id);
        }
      });
     
   
     let amOfViedeos = document.querySelector('.container-fluid').children.length;
      if(allVideos <  amOfViedeos){ // checking if it scrolled down and more videos appears
        console.log("THERE ARE MORE VIDEOS") 
        creatingboxes();
      }
    }
  }
  else{
      console.log("not loaded yet")
      triedtofindvideos++;
      // if(triedtofindvideos > 20){ // too many request
      //    clearTimeout(checkboxs)
      //    clearTimeout(checkExist)
      //    }
      }
                            
}, 500);
}
