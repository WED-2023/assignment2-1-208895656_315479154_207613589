<template>
  <b-container fluid class="main-page">
    <b-row>
      <!-- Title and Button on the same row in a flex container -->
      <b-col cols="12">
        <div class="title-button-container">
          <h3>
            {{ title }}:
            <slot></slot>
          </h3>
        </div>
      </b-col>
    </b-row>
    <b-row class="justify-content-center align-items-center">
      <!-- Recipes in their own row -->
      <b-col v-for="r in recipes" :key="r.id" class="d-flex justify-content-center align-items-center">
        <component 
          :is="recipeComponent" 
          :class="{
            'recipePreview': !useFamilyRecipePreview, 
            'familyRecipePreview': useFamilyRecipePreview,
            'transparent-light-green': true
          }"
          :recipe="r" 
          :isClicked="r.clicked" 
          @click.native.stop="toggleRecipeClicked(r)" 
        />
      </b-col>
    </b-row>
    <!-- Shuffle button, conditionally rendered in its own row -->
    <b-row class="justify-content-center">
      <b-button v-if="showButton" @click="shuffleRecipes" variant="info">Shuffle Recipes</b-button>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import FamilyRecipePreview from "./FamilyRecipePreview.vue"; 
import { mockGetOtherRecipes, mockGetRecipesPreview, mockGetRecipesPreviewSortByLikes, mockGetRecipesPreviewSortByTime, mockGetFamilyRecipesPreview, getRandomRecipes } from "../services/recipes.js";
import{getMyLastWatchedRecipes} from "../services/user.js";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
    FamilyRecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true
    },
    showButton: {
      type: Boolean,
      default: false
    },
    amountToFetch: {
      type: Number,
      default: 3
    },
    useFamilyRecipePreview: {
      type: Boolean,
      default: false
    },
    sortOption: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  computed: {
    recipeComponent() {
      return this.useFamilyRecipePreview ? 'FamilyRecipePreview' : 'RecipePreview';
    }
  },
  mounted() {
    this.updateRecipes();
  },
  watch: {
    amountToFetch: 'updateRecipes',
    sortOption: 'updateRecipes'
  },
  methods: {
    async updateRecipes() {
      try {
        let response;
        if (this.useFamilyRecipePreview) {
          response = await mockGetFamilyRecipesPreview();
        } else if (this.sortOption === 'likes') {
          response = await mockGetRecipesPreviewSortByLikes(this.amountToFetch);
        } else if (this.sortOption === 'preparation_time') {
          response = await mockGetRecipesPreviewSortByTime(this.amountToFetch);
        } else if (this.title === 'Random Recipes') {
          response = await getRandomRecipes(this.amountToFetch);
          // response = await mockGetRecipesPreview(this.amountToFetch);
        } else{  
          response = await getMyLastWatchedRecipes(this.amountToFetch);
          // response = await mockGetRecipesPreview(this.amountToFetch);
        }
        this.recipes = response.data.recipes.map(recipe => ({
          ...recipe,
          clicked: false
        }));
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    },
    async shuffleRecipes() {
      try {
        const response = await getRandomRecipes(this.amountToFetch);
        console.log("before shuffle")
        // response = await mockGetOtherRecipes(this.amountToFetch);
        
        this.recipes = response.data.recipes.map(recipe => ({
          ...recipe,
          clicked: false
        }));
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    },
    toggleRecipeClicked(recipe) {
      recipe.clicked = !recipe.clicked;
    }
  }
};
</script>

<style lang="scss" scoped>
.main-page {
  // background-color: white;
  background-repeat: repeat;
  background-size: 100px 100px; /* Adjust the size as needed */
  min-height: 100vh; /* Ensure the background covers the entire height */
}

.container {
  min-height: 400px;
}

.title-button-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  text-align: center; /* Center text */
}

h3 {
  margin-bottom: 0;
}

.recipePreview,
.familyRecipePreview {
  text-align: left;
  border: 1px solid transparent;
  transition: border-color 0.3s ease;
  height: 500px; /* Adjust height as needed */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  overflow: hidden; /* Ensure overflow content is hidden */
  padding: 15px; /* Add padding to ensure content is not touching the edges */
  margin-bottom: 15px; /* Add margin to separate cards */
  background-color: #a0b9dacc; 
}

.familyRecipePreview {
  height: 800px; /* Adjust height as needed */
}

.recipePreview[isClicked="true"],
.familyRecipePreview[isClicked="true"] {
  border-color: blue;
}

.b-button {
  margin-left: 20px;
}
</style>
