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
  for(let i = 0; i < amount; i++){
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
    const recipeExists = recipe_preview.some(recipe => recipe.id === recipeId);
    if (recipeExists) {
      return {
        status: 200,
        data: { recipe: recipe_full_view }
      };
    } else {
      return {
        status: 404, // Or any other appropriate error status
        error: 'Recipe not found'
      };
    }
  }