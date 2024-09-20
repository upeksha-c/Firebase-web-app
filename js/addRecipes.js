//import {app} from './app.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js';
import { getDatabase, ref, set, push } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js';

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

const saveButton = document.querySelector(".recipe-button");

function writeFormdata(recipename,ingredients,method){
    const recipe = ref(database,"recipes/"+ recipename);
    const newRecipe = push(recipe);
    set(newRecipe, {
        name:recipename,
        ingredients:ingredients,
        procedure:method
    }).then(() => {
        console.log('Data written successfully!');
        // Clear the form after successful submission
        document.getElementById('recipeForm').reset();  // Reset the form
        
      }).catch((error) => {
        console.error('Error writing data:', error);
      });
}

saveButton.addEventListener('click',function(event){
    event.preventDefault();
    console.log("hello")
    

    let recipeNameElement = document.querySelector('#recipeName');
    let ingredientsElement = document.querySelector('#ingredients');
    let methodElement = document.querySelector('#procedure');

    let recipeName = recipeNameElement.value;
    let ingredients = ingredientsElement.value;
    let method = methodElement.value;

    
    writeFormdata(recipeName,ingredients,method);
});
