// src/services/user.js
import axios from 'axios';

export function mockAddFavorite(recipeId) {
  return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
}

export function mockAddUserRecipe(recipeDetails) {
  return { status: 200, response: { data: { message: "The Recipe successfully added to My Recipes", success: true}} };
}

export async function GetMyFavoriteRecipesPreview(){
  try{
    const user_id = sessionStorage.getItem('user_id');
    const response = await axios.get('https://daniftgalkitchen.cs.bgu.ac.il/users/favorites', {
      headers: { 'x-user-id': user_id }
    });
    console.log("response.data: ", response.data);
    return {status:200, data: response.data };
  } catch (error) {
    console.error('Error fetching favorite recipes', error);
    throw error;
  }
}

export async function isFavoriteRecipe(recipeId){
  try{
    const user_id = sessionStorage.getItem('user_id');
    const response = await axios.get('https://daniftgalkitchen.cs.bgu.ac.il/users/is_favorite', {
      params: { recipeId: recipeId },
      headers: { 'x-user-id': user_id }
    });
    console.log("response.data: ", response.data, recipeId);
    return response.data;
  } catch (error) {
    console.error('Error checking favorite recipe', error);
    throw error;
  }
}

export async function addToFavorites(recipeId){
  try{
    const user_id = sessionStorage.getItem('user_id');
    console.log("like pressed!")
    const response = await axios.post('https://daniftgalkitchen.cs.bgu.ac.il/users/favorites', {
      recipeId: recipeId
    }, {
      headers: { 'x-user-id': user_id }
    });
    console.log("response.data", response.data)
    return {status:200, data: response.data };
  } catch (error) {
    console.error('Error adding to favorites', error);
    throw error;
  }
}

export async function removeFromFavorites(recipeId){
  try{
    const user_id = sessionStorage.getItem('user_id');
    const response = await axios.delete('https://daniftgalkitchen.cs.bgu.ac.il/users/favorites', {
      data: { recipeId: recipeId },
      headers: { 'x-user-id': user_id }
    });
    return {status:200, data: response.data };
  } catch (error) {
    console.error('Error removing from favorites', error);
    throw error;
  }
}

export async function isWatchedRecipe(recipeId){
  try{
    const user_id = sessionStorage.getItem('user_id');
    const response = await axios.get('https://daniftgalkitchen.cs.bgu.ac.il/users/is_watched', {
      params: { recipeId: recipeId },
      headers: { 'x-user-id': user_id }
    });
    return response.data;
  } catch (error) {
    console.error('Error checking watched recipe', error);
    throw error;
  }
}

export async function addToWatched(recipeId){
  try{
    const user_id = sessionStorage.getItem('user_id');
    const response = await axios.post('https://daniftgalkitchen.cs.bgu.ac.il/users/viewd_recipes', {
      recipeId: recipeId
    }, {
      headers: { 'x-user-id': user_id }
    });
    return {status:200, data: response.data };
  } catch (error) {
    console.error('Error adding to watched recipes', error);
    throw error;
  }
}

export async function getMyMealPlan() {
  const user_id = sessionStorage.getItem('user_id');
  if (!user_id) {
    console.warn("No user ID found in session storage. Skipping request.");
    return { status: 401, data: [] };
  }

  try {
    const response = await axios.get('https://daniftgalkitchen.cs.bgu.ac.il/users/meal_plan', {
      headers: { 'x-user-id': user_id }
    });
    let recipes = response.data;
    return { status: 200, data: { recipes } };
  } catch (error) {
    console.error('Error fetching meal plan', error);
    throw error;
  }
}

export async function addToMealPlan(recipeId){
  try{
    const user_id = sessionStorage.getItem('user_id');
    const response = await axios.post('https://daniftgalkitchen.cs.bgu.ac.il/users/meal_plan', {
      recipeId: recipeId
    }, {
      headers: { 'x-user-id': user_id }
    });
    return {status:200, data: response.data };
  } catch (error) {
    console.error('Error adding to meal plan', error);
    throw error;
  }
}

export async function removeFromMealPlan(recipeId){
  try{
    const user_id = sessionStorage.getItem('user_id');
    const response = await axios.delete('https://daniftgalkitchen.cs.bgu.ac.il/users/meal_plan', {
      data: { recipeId: recipeId },
      headers: { 'x-user-id': user_id }
    });
    return {status:200};
  } catch (error) {
    console.error('Error removing from meal plan', error);
    throw error;
  }
}

export async function meal_plan_count() {
  const user_id = sessionStorage.getItem('user_id');
  if (!user_id) {
    // console.warn("No user ID found in session storage. Skipping request.");
    return { status: 401, count: 0 };
  }

  try {
    const response = await axios.get('https://daniftgalkitchen.cs.bgu.ac.il/users/meal_plan_count', {
      headers: { 'x-user-id': user_id }
    });
    return response.data.count;
  } catch (error) {
    console.error('Error fetching meal plan count', error);
    throw error;
  }
}
export async function change_meal_order(recipesId){
  try{
    const user_id = sessionStorage.getItem('user_id');
    console.log("change_meal_order", recipesId);
    const response = await axios.put('https://daniftgalkitchen.cs.bgu.ac.il/users/meal_plan', {
      recipesId: recipesId
    }, {
      headers: { 'x-user-id': user_id }
    });
    return {status: response.status};
  } catch (error) {
    console.error('Error changing meal order', error);
    throw error;
  }
}

export async function addToLastWatched(recipeId){
  try{
    const user_id = sessionStorage.getItem('user_id');
    const response = await axios.post('https://daniftgalkitchen.cs.bgu.ac.il/users/last_watch', {
      recipeId: recipeId
    }, {
      headers: { 'x-user-id': user_id }
    });
    return {status:200, data: response.data };
  } catch (error) {
    console.error('Error adding to last watched', error);
    throw error;
  }
}

export async function getMyLastWatchedRecipes(){
  try{
    const user_id = sessionStorage.getItem('user_id');
    console.log("im in user.js in getmylastwatchedrecipes userid = ", user_id)
    const response = await axios.get('https://daniftgalkitchen.cs.bgu.ac.il/users/last_watch', {
      headers: { 'x-user-id': user_id }
    });
    let recipes = response.data;
    console.log("recipes: ", response.data);
    return {status:200, data: { recipes } };
  } catch (error) {
    console.error('Error fetching last watched recipes', error);
    throw error;
  }
}

export async function create_my_recipe(recipeDetails){
  try{
    const user_id = sessionStorage.getItem('user_id');
    console.log("create_my_recipe", recipeDetails);
    await axios.post('https://daniftgalkitchen.cs.bgu.ac.il/users/my_recipes', {
      title: recipeDetails.title,
      analyzedInstructions: [{name:"", steps:recipeDetails.analyzedInstructions}],
      extendedIngredients: recipeDetails.extendedIngredients,
      image: recipeDetails.image,
      vegetarian: recipeDetails.vegetarian,
      vegan: recipeDetails.vegan,
      glutenFree: recipeDetails.glutenFree,
      readyInMinutes: recipeDetails.readyInMinutes,
      servings: recipeDetails.servings
    }, {
      headers: { 'x-user-id': user_id }
    });
    await axios.get('https://daniftgalkitchen.cs.bgu.ac.il/users/alive', {
      headers: { 'x-user-id': user_id }
    });
    return {status:200};
  } catch (error) {
    console.error('Error creating recipe', error);
    throw error;
  }
}

export async function getMyRecipes(){
  try{
    const user_id = sessionStorage.getItem('user_id');
    const response = await axios.get('https://daniftgalkitchen.cs.bgu.ac.il/users/my_recipes', {
      headers: { 'x-user-id': user_id }
    });
    let recipes = response.data;
    return {status:200, data: { recipes } };
  } catch (error) {
    console.error('Error fetching my recipes', error);
    throw error;
  }
}

export async function getMyRecipe(title) {
  try {
    const user_id = sessionStorage.getItem('user_id');
    console.log("getMyRecipe title: ", title);
    const response = await axios.get('https://daniftgalkitchen.cs.bgu.ac.il/users/my_recipe', {
      params: { title: title },
      headers: { 'x-user-id': user_id }
    });
    let recipe = response.data;
    return { status: 200, data: { recipe } };
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
}
  export async function logged_in(params) {
    
  }

  export async function clearMealPlan() {
    const user_id = sessionStorage.getItem('user_id');
    if (!user_id) {
      console.warn("No user ID found in session storage. Skipping request.");
      return { status: 401, data: [] };
    }
  
    try {
      const response = await axios.delete('https://daniftgalkitchen.cs.bgu.ac.il/users/meal_plan', {
        headers: { 'x-user-id': user_id }
      });
      return { status: 200, data: response.data };
    } catch (error) {
      console.error('Error clearing meal plan', error);
      throw error;
    }
  }
  
  