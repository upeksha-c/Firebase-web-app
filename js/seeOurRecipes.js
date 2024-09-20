//import {app} from './app.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js';
import { getDatabase, ref, get, child } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyBzyF9u1Q6LKHidkc5PjgWNg9E8lWkDLao",
  authDomain: "my-recipe-app-oamk.firebaseapp.com",
  projectId: "my-recipe-app-oamk",
  storageBucket: "my-recipe-app-oamk.appspot.com",
  messagingSenderId: "52075609846",
  appId: "1:52075609846:web:0dec773534886ab6b7f6d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const recipeList = ref(getDatabase());

let recipeArray = [];

get(child(recipeList, '/recipes')).then((snapshot) => {
  if (snapshot.exists()) {
    recipeArray = snapshot.val();
    console.log(recipeArray);

    // Iterate over the keys of recipeArray
    let newArray = Object.keys(recipeArray).map(key => {
        let recipe = recipeArray[key];
        let firstEntry = Object.values(recipe)[0];  // Get the first (and likely only) entry for each recipe
        return firstEntry;  // Return the recipe details
      });

    console.log(newArray);

    for(let i=0; i<newArray.length; i++){
        let activeStatus = false;
        if(i==0){
            activeStatus = true;
        }
        let recipeForCassarol = createCassarolItem(newArray[i].name,newArray[i].ingredients,newArray[i].procedure,activeStatus);
        casssarol.appendChild(recipeForCassarol);
    }
    
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


const casssarol = document.querySelector(".carousel-inner");


function createCassarolItem(name,ingredients,method,isActive){
    let cassarolItem = document.createElement('div');
    cassarolItem.className = isActive ? "carousel-item active": "carousel-item";

    let heading1Box = document.createElement('div');
    heading1Box.className = "recipe-header";
    cassarolItem.appendChild(heading1Box);

    let heading1 = document.createElement('h1');
    heading1.innerHTML = name;
    heading1Box.appendChild(heading1);

    let cassarolItemBox = document.createElement('div');
    cassarolItemBox.className = "cassarol-box";
    cassarolItem.appendChild(cassarolItemBox);

    let imageBox = document.createElement('div');
    imageBox.className = "img-box";
    cassarolItemBox.appendChild(imageBox);

    let image = document.createElement('img');
    image.className = "d-block w-100";
    image.src = "./assets/img/img1.jpg"
    imageBox.appendChild(image);

    let description = document.createElement('div');
    description.className = "description-box";
    cassarolItemBox.appendChild(description);

    let heading2 = document.createElement('h3');
    heading2.innerHTML = "Ingredients"
    description.appendChild(heading2);

    let para1 = document.createElement('p');
    para1.innerHTML = ingredients
    description.appendChild(para1);

    let heading3 = document.createElement('h3');
    heading3.innerHTML = "Method"
    description.appendChild(heading3);

    let para2 = document.createElement('p');
    para2.innerHTML = method
    description.appendChild(para2);

    return cassarolItem;

}





