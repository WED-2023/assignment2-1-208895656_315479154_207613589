<template>
  <div class="search-page">
    <div class="background-overlay"></div>
    <header class="header">
      <h1 class="search-title">Search among <span class="highlight">all</span> our recipes</h1>
      <p class="search-subtitle">Find the best recipes for any occasion</p>
    </header>

    <div class="search-bar-container">
      <b-form @submit.prevent="onSubmit" inline class="search-bar-form">
        <b-input-group class="search-bar">
          <b-form-input v-model="searchQuery" placeholder="Enter your search"></b-form-input>
          <b-input-group-append>
            <b-button type="submit" variant="primary">Search</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form>
    </div>

    <div class="category-buttons">
      <b-button variant="outline-secondary" class="category-button" @click="setCategory('Vegetarian')">Vegetarian</b-button>
      <b-button variant="outline-secondary" class="category-button" @click="setCategory('Family')">Family</b-button>
      <b-button variant="outline-secondary" class="category-button" @click="setCategory('Gluten free')">Gluten free</b-button>
      <b-button variant="outline-secondary" class="category-button" @click="setCategory('Other')">Other</b-button>
    </div>

    <div class="filters-container">
      <b-form-group label="Number of results:" class="filter-item">
        <b-form-select v-model="resultsCount" :options="resultsOptions"></b-form-select>
      </b-form-group>

      <b-form-group label="Sort by:" class="filter-item">
        <b-form-select v-model="sortOption" :options="sortOptions"></b-form-select>
      </b-form-group>

      <b-form-group label="Diets:" class="filter-item">
        <b-form-select v-model="selectedDiet" :options="dietOptions" multiple></b-form-select>
      </b-form-group>

      <b-form-group label="Cuisines:" class="filter-item">
        <b-form-select v-model="selectedCuisine" :options="cuisineOptions" multiple></b-form-select>
      </b-form-group>

      <b-form-group label="Intolerances:" class="filter-item">
        <b-form-checkbox-group v-model="selectedFilters" :options="filterOptions" stacked></b-form-checkbox-group>
      </b-form-group>
    </div>

    <div class="search-results">
      <RecipePreviewList v-if="showResults" :title="'Search Results'" :recipeIds="recipeIds" :amountToFetch="resultsCount" :sortOption="sortOption" />
    </div>

    <b-alert variant="danger" :show="showAlert" dismissible>
      Please enter a search query and choose a sorting method.
    </b-alert>
  </div>
</template>

<script>
import { BForm, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BButton, BFormSelect, BFormCheckboxGroup, BAlert } from 'bootstrap-vue';
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetRecipesByQueryAndFilters } from '../services/recipes.js'; // Import your service functions

export default {
  components: {
    RecipePreviewList,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BButton,
    BFormSelect,
    BFormCheckboxGroup,
    BAlert
  },
  data() {
    return {
      searchQuery: '',
      resultsCount: 5,
      resultsOptions: [
        { value: 5, text: '5' },
        { value: 10, text: '10' },
        { value: 15, text: '15' }
      ],
      selectedFilters: [],
      filterOptions: [
        { value: 'Dairy', text: 'Dairy' },
        { value: 'Egg', text: 'Egg' },
        { value: 'Gluten', text: 'Gluten' },
        { value: 'Grain', text: 'Grain' },
        { value: 'Peanut', text: 'Peanut' },
        { value: 'Seafood', text: 'Seafood' },
        { value: 'Shellfish', text: 'Shellfish' },
        { value: 'Soy', text: 'Soy' },
        { value: 'Sulfite', text: 'Sulfite' },
        { value: 'Sesame', text: 'Sesame' },
        { value: 'Tree Nut', text: 'Tree Nut' },
        { value: 'Wheat', text: 'Wheat' }
      ],
      dietOptions: [
        { value: null, text: 'None' },
        { value: 'Gluten Free', text: 'Gluten Free' },
        { value: 'Ketogenic', text: 'Ketogenic' },
        { value: 'Vegetarian', text: 'Vegetarian' },
        { value: 'Lacto-Vegetarian', text: 'Lacto-Vegetarian' },
        { value: 'Ovo-Vegetarian', text: 'Ovo-Vegetarian' },
        { value: 'Vegan', text: 'Vegan' },
        { value: 'Pescetarian', text: 'Pescetarian' },
        { value: 'Paleo', text: 'Paleo' },
        { value: 'Primal', text: 'Primal' },
        { value: 'Low FODMAP', text: 'Low FODMAP' },
        { value: 'Whole30', text: 'Whole30' }
      ],
      cuisineOptions: [
        { value: null, text: 'None' },
        { value: 'African', text: 'African' },
        { value: 'Asian', text: 'Asian' },
        { value: 'American', text: 'American' },
        { value: 'British', text: 'British' },
        { value: 'Cajun', text: 'Cajun' },
        { value: 'Caribbean', text: 'Caribbean' },
        { value: 'Chinese', text: 'Chinese' },
        { value: 'Eastern European', text: 'Eastern European' },
        { value: 'European', text: 'European' },
        { value: 'French', text: 'French' },
        { value: 'German', text: 'German' },
        { value: 'Greek', text: 'Greek' },
        { value: 'Indian', text: 'Indian' },
        { value: 'Irish', text: 'Irish' },
        { value: 'Italian', text: 'Italian' },
        { value: 'Japanese', text: 'Japanese' },
        { value: 'Jewish', text: 'Jewish' },
        { value: 'Korean', text: 'Korean' },
        { value: 'Latin American', text: 'Latin American' },
        { value: 'Mediterranean', text: 'Mediterranean' },
        { value: 'Mexican', text: 'Mexican' },
        { value: 'Middle Eastern', text: 'Middle Eastern' },
        { value: 'Nordic', text: 'Nordic' },
        { value: 'Southern', text: 'Southern' },
        { value: 'Spanish', text: 'Spanish' },
        { value: 'Thai', text: 'Thai' },
        { value: 'Vietnamese', text: 'Vietnamese' }
      ],
      selectedDiet: null,
      selectedCuisine: null,
      sortOption: null,
      sortOptions: [
        { value: null, text: 'Choose a sorting method' },
        { value: 'likes', text: 'Likes' },
        { value: 'preparation_time', text: 'Preparation time' }
      ],
      showAlert: false,
      showResults: false,  // New data property to control the display of RecipePreviewList
      recipeIds: []  // Array to hold the recipe IDs
    };
  },
  watch: {
    sortOption(newVal) {
      if (this.showResults) {
        this.onSubmit(); // Fetch results again if the user changes the sort option
      }
    }
  },
  methods: {
    setCategory(category) {
      this.searchQuery = category;
      this.onSubmit();
    },
    async onSubmit() {
      if (!this.searchQuery || !this.sortOption) {
        this.showAlert = true;
        this.showResults = false;
      } else {
        this.showAlert = false;
        this.showResults = true;
        try {
          const response = await this.fetchRecipes();
          this.recipeIds = response.data.recipes.map(recipe => recipe.id);
          this.showResults = true;
        } catch (error) {
          console.error("Failed to fetch recipes:", error);
          this.showResults = false;
        }
      }
    },
    async fetchRecipes() {
      const searchQuery = this.searchQuery;
      const resultsCount = this.resultsCount;
      const selectedFilters = this.selectedFilters;
      const selectedDiet = this.selectedDiet;
      const selectedCuisine = this.selectedCuisine;
      const sortOption = this.sortOption;

      // Mock fetching data for demonstration. Replace with actual API call.
      const response = await mockGetRecipesByQueryAndFilters({ searchQuery, resultsCount, selectedFilters, selectedDiet, selectedCuisine, sortOption });
      return response;
    }
  }
};
</script>

<style scoped>
.search-page {
  text-align: center;
  padding: 20px;
  color: white;
  position: relative;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/src/assets/search_background.png') no-repeat center center fixed;
  background-size: cover;
  opacity: 0.6;
  z-index: -1;
}

.header {
  margin-bottom: 20px;
}

.search-title {
  font-size: 3em;
  font-weight: bold;
}

.highlight {
  background-color: #ffc107;
  padding: 0 10px;
}

.search-subtitle {
  margin-bottom: 20px;
}

.search-bar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar-form {
  width: 50%;
}

.search-bar {
  width: 100%; /* Ensure the search bar takes full width within its container */
}

.category-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.category-button {
  margin: 0 10px;
  background-color: white;
  color: #ff7f50;
  border-color: white;
}

.category-button:hover {
  background-color: #ffc107;
  color: white;
}

.filters-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-item {
  width: 200px;
}

.search-results {
  margin-top: 20px;
}
</style>
