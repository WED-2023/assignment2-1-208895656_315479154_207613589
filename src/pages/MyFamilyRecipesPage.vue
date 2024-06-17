<template>
  <div class="container">
    <h1 class="title">My Family Recipes</h1>
    <div class="recipe-container">
      <div class="recipe-preview-wrapper" v-for="recipe in recipes" :key="recipe.id">
        <RecipePreview :recipe="recipe" :family="true" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
import { mockGetFamilyRecipesPreview } from "../services/recipes.js";

export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      recipes: [] // Populate this array with your recipes
    };
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await mockGetFamilyRecipesPreview();
        this.recipes = response.data.recipes.map(recipe => ({
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
  }
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center; /* Center everything in the container */
  background-image: url('/src/assets/myFamilyRecipes.webp'); /* Add your background image here */
  background-size: cover; /* Ensure the background image covers the entire container */
  background-position: center; /* Center the background image */
  padding: 50px 0; /* Add padding for spacing */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-family: 'Arial', sans-serif; /* Example font */
  font-size: 36px; /* Large font size for visibility */
  color: #fff; /* White color for the text */
  text-shadow: 2px 2px 8px rgba(0,0,0,0.5); /* Soft shadow for a dramatic effect */
  margin-bottom: 20px; /* Space between the title and the recipe list */
}

.recipe-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center the rows */
  gap: 20px; /* Space between recipe previews */
  width: 100%;
  max-width: 1200px; /* Adjust as needed */
}

.recipe-preview-wrapper {
  flex: 1 1 calc(33.333% - 20px); /* Three items per row with spacing */
  max-width: calc(33.333% - 20px);
  box-sizing: border-box;
  padding: 10px;
}
</style>
