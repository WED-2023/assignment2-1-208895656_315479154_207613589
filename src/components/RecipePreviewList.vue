<template>
  <b-container fluid>
    <b-row>
      <!-- Title and Button on the same row in a flex container -->
      <b-col cols="12">
        <div class="title-button-container">
          <h3>
            {{ title }}:
            <slot></slot>
          </h3>
          <b-button @click="shuffleRecipes" variant="info">Shuffle Recipes</b-button> <!-- Shuffle button -->
        </div>
      </b-col>
    </b-row>
    <b-row>
      <!-- Recipes in their own row -->
      <b-col v-for="r in recipes" :key="r.id" @click="toggleRecipeClicked(r)">
        <RecipePreview class="recipePreview" :recipe="r" :isClicked="r.clicked" />
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import RecipePreview from "./RecipePreview.vue";
import { fetchRecipesByIds, mockGetOtherRecipes, mockGetRecipesPreview } from "../services/recipes.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipeIds: {  // Optional prop for recipe IDs
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  watch: {
    recipeIds: {
      immediate: true,
      handler(newIds) {
        if (newIds.length) {
          this.updateRecipes(newIds);
        } else {
          this.updateRecipes();
        }
      }
    }
  },
  methods: {
    async updateRecipes(ids = null) {
      if (ids) {
        try {
          const amountToFetch = 3; // Default fetch 3 new recipes
          const response = await mockGetRecipesPreview(amountToFetch);
          this.recipes = response.data.recipes.map(recipe => ({
            ...recipe,
            clicked: false  // Initialize the clicked property
          }));
        } catch (error) {
          console.error("Failed to fetch recipes:", error);
        }
      } else {
        try {
          const amountToFetch = 3; // Default fetch 3 new recipes
          const response = await mockGetRecipesPreview(amountToFetch);
          this.recipes = response.data.recipes.map(recipe => ({
            ...recipe,
            clicked: false  // Initialize the clicked property
          }));
        } catch (error) {
          console.error("Failed to fetch recipes:", error);
        }
      }
    },
    async shuffleRecipes() {
      try {
        const amountToFetch = 3; // Fetch 3 new recipes
        const response = await mockGetOtherRecipes(amountToFetch);
        this.recipes = response.data.recipes.map(recipe => ({
          ...recipe,
          clicked: false  // Reset the clicked property when shuffling
        }));
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    },
    toggleRecipeClicked(recipe) {
      recipe.clicked = !recipe.clicked; // Toggle the clicked state
    }
  }
};
</script>



<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.title-button-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Aligns items to the left */
}

h3 {
  margin-bottom: 0; /* Removes the bottom margin to reduce the space between the title and the button */
}

.b-button {
  margin-top: 10px; /* Adds some space above the button */
}

.recipePreview {
  text-align: left; /* Ensures text inside the recipe preview is aligned left */
  border: 1px solid transparent; /* Default border, invisible */
  transition: border-color 0.3s ease; /* Smooth transition for border color change */
}

.recipePreview[isClicked="true"] {
  border-color: blue; /* Blue border when clicked */
}
</style>

