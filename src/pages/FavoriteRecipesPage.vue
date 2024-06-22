<template>
    <div class="container">
      <h1 class="title">My Favorite Recipes</h1>
      <div class="recipe-container">
        <RecipePreviewList :recipes="recipes" title="Favorite Recipes" class="center" :showButton="false" />
      </div>
    </div>
  </template>
  
  <script>
  import RecipePreviewList from "../components/RecipePreviewList";
  
  export default {
    components: {
      RecipePreviewList
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
    // max-height: 1200px;
    text-align: center; /* Center everything in the container */
    background-image: url('/src/assets/my_favorites_recipes.webp'); /* Add your background image here */
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
    max-width: 400px; /* Limit the width of the recipe container */
    // max-height: 1200px;
    width: 100%; /* Ensure it takes full width up to the max-width */
    background-color: rgba(255, 255, 255, 0.8); /* Slightly transparent white background */
    padding: 20px; /* Padding inside the recipe container */
    border-radius: 15px; /* Rounded corners for the container */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  }
  </style>
  