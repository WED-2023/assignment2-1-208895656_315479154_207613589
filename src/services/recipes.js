// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  for(let i = 0; i < amount; i++){
    recipes.push(recipe_preview[i]);
  }

  return { data: { recipes: recipes } };
}

export function mockGetOtherRecipes(amount = 1) {
  let recipes = [];
  for(let i = 0; i < recipe_preview.length; i++){
    recipes.push(recipe_preview[i]);
  }
    // Fisher-Yates Shuffle Algorithm
    for (let i = recipes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [recipes[i], recipes[j]] = [recipes[j], recipes[i]];
    }
  
    return { data: { recipes: recipes.slice(0, amount) } };
}

// export function mockGetRecipeFullDetails(recipeId) {
//     return { 
//       data: { recipe: recipe_full_view }
//      } ;
//   }
  
export function mockGetRecipeFullDetails(recipeId) {
  // Convert recipeId to Number if it's stored as a Number in your data
  const id = Number(recipeId);  
  const recipeIndex = recipe_preview.findIndex(recipe => recipe.id === id);

  if (recipeIndex !== -1) {
    // Assuming recipe_full_view is an array with the same index alignment as recipe_preview
    const recipeDetails = recipe_full_view[recipeIndex];
    return {
      status: 200,
      data: { recipe: recipeDetails }
    };
  } else {
    return {
      status: 404,
      error: 'Recipe not found'
    };
  }
}
