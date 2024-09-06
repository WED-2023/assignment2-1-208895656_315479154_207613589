<template>
  <div class="container">
    <h1 class="title"></h1>
    <div class="recipe-container">
      <div class="recipe-preview-wrapper" v-for="recipe in recipes" :key="recipe.title">
      <RecipePreview :recipe="recipe" my_recipe="true"/>
    </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
import {getMyRecipes} from "../services/user.js";
export default {
  components: {
    RecipePreview
  },
  methods: {
  async updateRecipes() {
    try {
      // const response = await mockGetMyFavoriteRecipesPreview();
      const response = await getMyRecipes();
      console.log("response.data get my recipes :", response.data.recipes)
      this.recipes = response.data.recipes.map(recipe => ({
        ...recipe,
        clicked: false
      }));
      // console.log("this.recipes", this.recipes)
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
  background-image: url('/src/assets/my_recipes.webp');
  background-size: cover; 
  background-position: center; 
  padding: 50px 0;
  min-height: 100vh; /* Ensure the container covers the full height of the viewport */
  display: flex;
  flex-direction: column;
}

.title {
  font-family: 'Arial', sans-serif;
  font-size: 36px;
  color: #fff; 
  text-shadow: 2px 2px 8px rgba(0,0,0,0.5); 
  margin-bottom: 20px; /* Existing margin */
}

.recipe-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; 
  width: 100%;
  max-width: 1200px; 
  margin-top: 100px; /* Adds space above the recipes */
}

.recipe-preview-wrapper {
  flex: 1 1 calc(33.333% - 20px); /* Three items per row with spacing */
  max-width: calc(33.333% - 20px);
  box-sizing: border-box;
  padding: 10px;
}
</style>
