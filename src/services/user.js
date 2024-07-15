// src/services/user.js
import axios from 'axios';
// import recipe_full_view from "../assets/mocks/recipe_full_view.json";
// import recipe_preview from "../assets/mocks/recipe_preview.json";


  export function mockAddFavorite(recipeId) {
    return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
  }
  
  export function mockAddUserRecipe(recipeDetails) {
    return { status: 200, response: { data: { message: "The Recipe successfully added to My Recipes", success: true}} };

  }

  export async function GetMyFavoriteRecipesPreview(){
    try{
    const response = await axios.get('http://localhost:80/users/favorites');
    console.log("response.data: ", response.data)
    return {status:200, data: response.data };
    } catch (error) {
    console.error('Error register', error);
    throw error;
    }
  }
  
  export async function isFavoriteRecipe(recipeId){
    try{
      const response = await axios.get('http://localhost:80/users/is_favorite', {
        params: {
          recipeId: recipeId
        }
      });
      // console.log("response.data: ", response.data, recipeId)
      return response.data;
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  }
  
  
  export async function addToFavorites(recipeId){
    try{
      const response = await axios.post('http://localhost:80/users/favorites', {
        recipeId: recipeId
      });
      return {status:200, data: response.data };
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  }
  
  
  export async function removeFromFavorites(recipeId){
    try{
      const response = await axios.delete('http://localhost:80/users/favorites', {
        data: {
          recipeId: recipeId
        }
      });
      return {status:200, data: response.data };
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  
  }


  export async function isWatchedRecipe(recipeId){
    try{
      const response = await axios.get('http://localhost:80/users/is_watched', {
        params: {
          recipeId: recipeId
        }
      });
      // console.log("is watched: ", response.data, recipeId)
      return response.data;
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  }


  export async function addToWatched(recipeId){
    try{
      const response = await axios.post('http://localhost:80/users/viewd_recipes', {
        recipeId: recipeId
      });
      return {status:200, data: response.data };
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  }


  export async function getMyMealPlan(){
    try{
      const response = await axios.get('http://localhost:80/users/meal_plan');
      let recipes = response.data;
      return {status:200, data: { recipes } };
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  }
  
  
  
  export async function addToMealPlan(recipeId){
    try{
      const response = await axios.post('http://localhost:80/users/meal_plan', {
        recipeId: recipeId
      });
      return {status:200, data: response.data };
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  }
  
  
  
  export async function removeFromMealPlan(recipeId){
    try{
      const response = await axios.delete('http://localhost:80/users/meal_plan', {
        data: {
          recipeId: recipeId
        }
      });
      return {status:200};
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  
  }


  export async function meal_plan_count(){
    try{
      const response = await axios.get('http://localhost:80/users/meal_plan_count');
      console.log("meal_plan_count: ", response.data.count)
      return response.data.count;
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  }
  
  export async function change_meal_order(recipesId){
    try{
      console.log("change_meal_order", recipesId);
      const response = await axios.put('http://localhost:80/users/meal_plan', {
        recipesId: recipesId
      });
      return {status: response.status};
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  }  


  export async function addToLastWatched(recipeId){
    try{
      const response = await axios.post('http://localhost:80/users/last_watch', {
        recipeId: recipeId
      });
      return {status:200, data: response.data };
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  }
  
  
  export async function getMyLastWatchedRecipes(){
    try{
      const response = await axios.get('http://localhost:80/users/last_watch');
      let recipes = response.data;
      console.log("recipes: ", response.data)
      return {status:200, data: { recipes } };
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  }


  export async function create_my_recipe(recipeDetails){
    try{
      console.log("create_my_recipe", recipeDetails);
      await axios.post('http://localhost:80/users/my_recipes', {
        title: recipeDetails.title,
        analyzedInstructions: [{name:"", steps:recipeDetails.analyzedInstructions}],
        extendedIngredients: recipeDetails.extendedIngredients,
        image: recipeDetails.image,
        vegetarian: recipeDetails.vegetarian,
        vegan: recipeDetails.vegan,
        glutenFree: recipeDetails.glutenFree,
        readyInMinutes: recipeDetails.readyInMinutes,
        servings: recipeDetails.servings
      });
      await axios.get('http://localhost:80/users/alive');
      return {status:200};
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  }
  

  export async function getMyRecipes(){
    try{
      const response = await axios.get('http://localhost:80/users/my_recipes');
      let recipes = response.data;
      // console.log("getMyRecipes response data: ", response.data)
      return {status:200, data: { recipes } };
    } catch (error) {
      console.error('Error register', error);
      throw error;
    }
  }


  export async function getMyRecipe(title) {
    try {
      console.log("getMyRecipe title: ", title);
      const response = await axios.get('http://localhost:80/users/my_recipe', {
        params: {
          title: title
        }
      });
      // console.log("getMyRecipe response ", response);
      let recipe = response.data;
      // console.log("getMyRecipe response data: ", response.data);
      return { status: 200, data: { recipe } };
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  }
  
  