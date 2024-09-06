<template>
  <div class="my-meal-container">
    <h1 class="meal-heading">My Meal</h1>
    <b-button variant="danger" @click="clearAllRecipes">Clear All Recipes</b-button> <!-- Clear All Recipes Button -->
    <draggable
      v-model="recipes"
      class="recipe-list"
      v-bind="{ handle: '.handle' }"
      @update="onOrderChange"
    >
      <div v-for="(recipe, index) in recipes" :key="recipe.id || index" class="recipe-card">
        <span class="handle">☰</span>
        <RecipePreview :recipe="recipe" />
        <div class="progress-bar">
          <div class="progress" :style="{ width: calculateProgress(recipe) }"></div>
        </div>
        <div class="button-container">
          <b-button variant="primary" @click="goToPreparation(recipe.id)">Make this recipe</b-button>
          <b-button variant="danger" @click="removeRecipe(recipe.id)">Remove</b-button>
        </div>
        <span class="order-number">{{ index + 1 }}</span>
      </div>
    </draggable>
  </div>
</template>

<script>
import { getMyMealPlan, removeFromMealPlan, meal_plan_count, change_meal_order, clearMealPlan } from '../services/user.js';
import RecipePreview from '../components/RecipePreview.vue';
import draggable from 'vuedraggable';
import { BButton } from 'bootstrap-vue';
import { store } from "../store.js";

export default {
  name: 'MyMeal',
  components: {
    RecipePreview,
    draggable,
    BButton
  },
  data() {
    return {
      recipes: []
    };
  },
  methods: {
    async fetchRecipes() {
      try {
        const response = await getMyMealPlan();
        if (response && response.data && response.data.recipes) {
          this.recipes = response.data.recipes.map(recipe => ({
            ...recipe,
            clicked: false,
            progress: this.calculateProgress(recipe)
          }));
        } else {
          console.error("No recipes found in response.");
        }
        await this.fetchMealCount(); // Fetch and set meal count after fetching recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },
    goToPreparation(recipeID) {
      this.$router.push({ name: 'preperation', params: { recipeId: recipeID } });
    },
    async removeRecipe(recipeId) {
      try {
        const response = await removeFromMealPlan(recipeId);
        if (response.status === 200) {
          this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
          store.decrementMealCount(); // Decrease the meal count after removal
        } else {
          console.error("Failed to remove recipe:", response.message);
        }
      } catch (error) {
        console.error("Error removing recipe:", error);
      }
    },
    async clearAllRecipes() {
      try {
        const response = await clearMealPlan(); // API call to clear all recipes
        if (response.status === 200) {
          this.recipes = []; // Clear the local recipes array
          store.resetMealCount(); // Reset meal count after clearing
          alert('All recipes have been cleared from your meal plan.');
        } else {
          console.error("Failed to clear all recipes:", response.message);
        }
      } catch (error) {
        console.error("Error clearing all recipes:", error);
      }
    },
    async fetchMealCount() {
      try {
        const count = await meal_plan_count(); // Call the API to get meal count
        store.setMealCount(count); // Update the store with the correct meal count
      } catch (error) {
        console.error('Error fetching meal count:', error);
      }
    },
    onOrderChange() {
      console.log('Order changed:', this.recipes);
      change_meal_order(this.recipes.map(recipe => recipe.id));
    },
    calculateProgress(recipe) {
      const completed = JSON.parse(sessionStorage.getItem(`completedSteps_${recipe.id}`));
      const totalSteps = parseInt(sessionStorage.getItem(`totalSteps_${recipe.id}`)) || 0;

      if (!completed || totalSteps === 0) return "0%";

      const completedSteps = completed.filter(step => step).length;
      return `${Math.round((completedSteps / totalSteps) * 100)}%`;
    }
  },
  mounted() {
    this.fetchRecipes();
  }
};
</script>

<style scoped>
.my-meal-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.recipe-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  min-height: 550px;
  max-height: 630px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  flex-grow: 1;
}

.handle {
  cursor: grab;
  margin-bottom: 10px;
  font-size: 20px;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  margin: 10px 0;
}

.progress {
  height: 100%;
  background-color: #007bff;
  border-radius: 5px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}

.button-container > * {
  flex: 1;
  margin: 0 5px;
}

.order-number {
  margin-top: 10px;
  font-size: 20px;
}

.meal-heading {
  text-align: center;
}
</style>
