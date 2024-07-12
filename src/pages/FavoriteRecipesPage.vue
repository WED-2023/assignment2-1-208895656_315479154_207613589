<template>
    <div class="container">
      <h1 class="title">My Favorite Recipes</h1>
      <div class="recipe-container">
        <div class="recipe-preview-wrapper" v-for="recipe in recipes" :key="recipe.id">
        <RecipePreview :recipe="recipe"/>
      </div>
      </div>
    </div>
  </template>
  
  <script>
  import RecipePreviewList from "../components/RecipePreviewList";
  import RecipePreview from "../components/RecipePreview";
  import { mockGetMyFavoriteRecipesPreview, GetMyFavoriteRecipesPreview } from "../services/recipes.js";
  export default {
    components: {
      RecipePreview
    },
    methods: {
    async updateRecipes() {
      try {
        // const response = await mockGetMyFavoriteRecipesPreview();
        const response = await GetMyFavoriteRecipesPreview();
        console.log("response.data.... :", response.data)
        this.recipes = response.data.map(recipe => ({
          ...recipe,
          clicked: false
        }));
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    }
  },
  mounted() {
    this.updateRecipes(); // Fetch recipes when the component is mounted
  },
    data() {
      return {
        recipes: [] // Populate this array with your recipes
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
.container {
  text-align: center;
  background-image: url('/src/assets/my_favorites_recipes.webp');
  background-size: cover; 
  background-position: center; 
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-family: 'Arial', sans-serif;
  font-size: 36px;
  color: #fff; 
  text-shadow: 2px 2px 8px rgba(0,0,0,0.5); 
  margin-bottom: 20px; 
}

.recipe-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; 
  width: 100%;
  max-width: 1200px; 
}

.recipe-preview-wrapper {
  flex: 1 1 calc(33.333% - 20px); /* Three items per row with spacing */
  max-width: calc(33.333% - 20px);
  box-sizing: border-box;
  padding: 10px;
}
  </style>
  