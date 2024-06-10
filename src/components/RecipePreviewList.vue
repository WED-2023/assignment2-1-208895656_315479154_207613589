<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-button @click="shuffleRecipes" variant="info">Shuffle Recipes</b-button> <!-- Shuffle button -->
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetOtherRecipes, mockGetRecipesPreview } from "../services/recipes.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
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
  methods: {
    async updateRecipes() {
      try {
        const amountToFetch = 3; // Fetch 3 new recipes
        const response = await mockGetRecipesPreview(amountToFetch);
        this.recipes = response.data.recipes;
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    },
    async shuffleRecipes() {
    try {
        const amountToFetch = 3; // Fetch 3 new recipes
        const response = await mockGetOtherRecipes(amountToFetch);
        this.recipes = response.data.recipes;
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
      
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
