// src/services/recipes.js

import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import FamilyRecipes from "../assets/mocks/FamilyRecipes.json";
import MyMeals from "../assets/mocks/MyMeals.json";


export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  for(let i = 0; i < amount; i++){
    recipes.push(recipe_preview[i]);
  }

  return { data: { recipes: recipes } };
}

export function mockGetRecipesPreviewSortByLikes(amount = 1) {
  let recipes_not_sorted = [];
  for(let i = 0; i < amount; i++){
    recipes_not_sorted.push(recipe_preview[i]);
  }

  // Sort by aggregateLikes in descending order
  const recipes_sorted_by_likes = recipes_not_sorted.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
  
  return { data: { recipes: recipes_sorted_by_likes } };
}

export function mockGetRecipesPreviewSortByTime(amount = 1) {
  let recipes_not_sorted = [];
  for(let i = 0; i < amount; i++){
    recipes_not_sorted.push(recipe_preview[i]);
  }

  // Sort by readyInMinutes in ascending order
  const recipes_sorted_by_time = recipes_not_sorted.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  
  return { data: { recipes: recipes_sorted_by_time } };
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


export function mockGetMyMealsRecipesPreview() {
  let recipes = [];
  for(let i = 0; i < MyMeals.length; i++){
    recipes.push(MyMeals[i]);
  }

  return { data: { recipes: recipes } };
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

export function mockGetFamilyRecipeFullDetails(recipeId) {
  console.log("FamilyRecipes loaded:", FamilyRecipes);  // Check what's loaded
  const id = Number(recipeId);
  console.log("Looking for ID:", id);

  const recipeIndex = FamilyRecipes.findIndex(recipe => {
    console.log("Comparing:", recipe.id, id);
    return recipe.id === id;
  });

  console.log("Found index:", recipeIndex);  // Check the index found

  if (recipeIndex !== -1) {
    const recipeDetails = FamilyRecipes[recipeIndex];
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

export function fetchRecipesByIds(ids) {
  let recipes = ids.map(id => recipe_preview.find(recipe => recipe.id === id)).filter(recipe => recipe !== undefined);
  return { data: { recipes: recipes } };
}

export async function mockGetRecipesByQueryAndFilters({ searchQuery, resultsCount, selectedFilters, selectedDiet, selectedCuisine, sortOption }) {
  // Mock data to simulate a real API response
  const mockRecipes = [
    {
      id: 1,
      title: 'Pancakes',
      image: 'https://example.com/pancakes.jpg',
      summary: 'Delicious and fluffy pancakes.',
      analyzedInstructions: [
        {
          name: 'Preparation',
          steps: [{ number: 1, step: 'Mix ingredients.' }, { number: 2, step: 'Cook on a skillet.' }]
        }
      ]
    },
    {
      id: 2,
      title: 'Spaghetti Bolognese',
      image: 'https://example.com/spaghetti.jpg',
      summary: 'Hearty and savory spaghetti bolognese.',
      analyzedInstructions: [
        {
          name: 'Preparation',
          steps: [{ number: 1, step: 'Cook spaghetti.' }, { number: 2, step: 'Prepare the sauce.' }]
        }
      ]
    },
    // Add more mock recipes as needed
  ];

  // Simulate filtering and sorting
  const filteredRecipes = mockRecipes.filter(recipe => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()));
  return {
    data: {
      recipes: filteredRecipes.slice(0, resultsCount)
    }
  };
}

  

export function mockGetFamilyRecipesPreview() {
  let recipes = [];
  for(let i = 0; i < 1; i++){
    recipes.push(FamilyRecipes[i]);
  }

  return { data: { recipes: recipes } };
}

export function removeFromMyMealsById(recipeId) {
  const index = MyMeals.findIndex(recipe => recipe.id === recipeId);
  if (index !== -1) {
    MyMeals.splice(index, 1); // Remove 1 item at the found index
    // Optionally, you can save the updated MyMeals array back to storage or perform any other operations needed
    return { success: true };
  } else {
    return { success: false, error: 'Recipe not found in MyMeals' };
  }
}