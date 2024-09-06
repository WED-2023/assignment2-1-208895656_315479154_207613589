<template>
  <div class="main-page">
    <div class="background-overlay"></div>
    <h1 class="title">Everyday Cooking</h1>
    <div class="content-container">
      <!-- Random Recipes for All Users -->
      <div class="content-box recipe-list transparent-light-green">
        <RecipePreviewList :recipes="randomRecipes" title="Random Recipes" class="center" :showButton="true" />
      </div>

      <!-- Show login form if the user is not logged in -->
      <div v-if="!user_id" class="content-box login-form">
        <LoginForm></LoginForm>
      </div>

      <!-- Show last viewed recipes if the user is logged in -->
      <div v-if="user_id" class="content-box last-viewed-recipes">
        <RecipePreviewList
          :recipes="lastViewedRecipes"
          title="Last Viewed Recipes"
          class="center"
        ></RecipePreviewList>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginForm from "../components/LoginForm";
import { getRandomRecipes } from "../services/recipes";
import { getMyLastWatchedRecipes, meal_plan_count } from "../services/user";
import { store } from "../store.js"; // Ensure store is properly imported

export default {
  components: {
    RecipePreviewList,
    LoginForm
  },
  data() {
    return {
      randomRecipes: [],  // To store random recipes
      lastViewedRecipes: [], // To store last viewed recipes
    };
  },
  mounted() {
    this.fetchRandomRecipes();

    if (this.user_id) {
      this.fetchLastViewedRecipes();
      this.fetchMealCount(); // Fetch the meal plan count if user is logged in
    }
  },
  computed: {
    user_id(){
      console.log("store.user_id != 0", store.user_id != 0)
      return store.user_id != 0
    }
  },
  methods: {
    async fetchRandomRecipes() {
      try {
        const response = await getRandomRecipes();  
        this.randomRecipes = response.data;  // Set the random recipes
      } catch (error) {
        console.error("Error fetching random recipes:", error);
      }
    },
    async fetchLastViewedRecipes() {
      try {
        const response = await getMyLastWatchedRecipes();  // Assuming this is your API call for last viewed recipes
        this.lastViewedRecipes = response.data;  // Set the last viewed recipes
      } catch (error) {
        console.error("Error fetching last viewed recipes:", error);
      }
    },
    async fetchMealCount() {
      try {
        const count = await meal_plan_count(); // Fetch meal count from the server
        store.setMealCount(count); // Update store with the fetched meal count
      } catch (error) {
        console.error('Error fetching meal count:', error);
        store.setMealCount(0); // Default to 0 if there's an error
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main-page {
  position: relative;
  min-height: 100vh; /* Ensure the background covers the entire height */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/src/assets/background.png') no-repeat center center fixed;
  background-size: cover;
  opacity: 0.6; /* Adjust opacity to make the background transparent */
  z-index: -1; /* Ensure the background is behind the content */
}

.header-image {
  width: 100%; /* Make the image responsive */
  max-height: 300px; /* Limiting the height of the image */
  object-fit: cover; /* Ensure the aspect ratio is maintained without distorting the image */
  margin-bottom: 20px; /* Space between the image and the title */
}

.title {
  font-family: 'Arial', sans-serif; /* Example font */
  font-size: 36px; /* Large font size for visibility */
  color: #333; /* Dark grey color for the text */
  text-shadow: 2px 2px 8px rgba(0,0,0,0.5); /* Soft shadow for a dramatic effect */
  margin: 20px 0; /* Add some margin to the title */
}

.content-container {
  display: flex;
  justify-content: center; /* Center items horizontally */
  align-items: flex-start; /* Align items at the start vertically */
  width: 100%;
}

.content-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: hsl(215, 100%, 97%, 0.7); 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(32, 15, 15, 0.1);
  z-index: 1; /* Ensure these components are above the background */
  margin: 10px;
  width: 100%; /* Expand to full width */
  max-width: 400px; /* Adjust as needed */
  text-align: center; /* Center the text */
  flex-grow: 1; /* Ensure they stretch equally */
}

.login-form {
  align-self: flex-start;
}
</style>
