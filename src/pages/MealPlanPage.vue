<template>
    <div class="my-meal-container">
      <h1 class="meal-heading">My Meal</h1>
      <draggable v-model="recipes" class="recipe-list" :options="{ handle: '.handle' }">
        <div v-for="(recipe, index) in recipes" :key="recipe.id" class="recipe-card">
          <span class="handle">☰</span> <!-- Handle for dragging -->
          <RecipePreview :recipe="recipe" :progress_bar="true" :progress="recipe.progress" />
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
import { mockGetMyMealsRecipesPreview, removeFromMyMealsById } from '../services/recipes.js';
import RecipePreview from '../components/RecipePreview.vue';
import draggable from 'vuedraggable';
import { BButton } from 'bootstrap-vue';

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
      const response = await mockGetMyMealsRecipesPreview();
      this.recipes = response.data.recipes.map(recipe => ({
        ...recipe,
        clicked: false,
        progress: 0
      }));
    },
    goToPreparation(recipeID) {
      // need to add a function that adding the recipe to the Meal list
      
      this.$router.push({ name: 'preperation', params: { recipeId: recipeID } });
    },
    async removeRecipe(recipeId) {
      const response = await removeFromMyMealsById(recipeId);
      if (response.success) {
        this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
      }
    },
    makeRecipe(recipeId) {
      // Functionality for making a recipe
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
  max-height: 590px;
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

  