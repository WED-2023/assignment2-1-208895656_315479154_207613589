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
        <b-form-select v-model="resultsCount" :options="resultsOptions" class="form-control-white"></b-form-select>
      </b-form-group>

      <b-form-group label="Sort by:" class="filter-item">
        <b-form-select v-model="sortOption" :options="sortOptions" class="form-control-white"></b-form-select>
      </b-form-group>

      <b-form-group label="Diets:" class="filter-item">
        <b-dropdown id="diet-dropdown" text="Select Diets" class="m-2 custom-dropdown" right>
          <template #button-content>
            Select Diets
          </template>
          <b-dropdown-form class="dropdown-form">
            <b-form-checkbox-group v-model="selectedDiets" :options="dietOptions" />
          </b-dropdown-form>
        </b-dropdown>
      </b-form-group>

      <b-form-group label="Cuisines:" class="filter-item">
        <b-dropdown id="cuisine-dropdown" text="Select Cuisines" class="m-2 custom-dropdown" right>
          <template #button-content>
            Select Cuisines
          </template>
          <b-dropdown-form class="dropdown-form">
            <b-form-checkbox-group v-model="selectedCuisines" :options="cuisineOptions" />
          </b-dropdown-form>
        </b-dropdown>
      </b-form-group>

      <b-form-group label="Intolerances:" class="filter-item">
        <b-dropdown id="intolerance-dropdown" text="Select Intolerances" class="m-2 custom-dropdown" right>
          <template #button-content>
            Select Intolerances
          </template>
          <b-dropdown-form class="dropdown-form">
            <b-form-checkbox-group v-model="selectedFilters" :options="filterOptions" />
          </b-dropdown-form>
        </b-dropdown>
      </b-form-group>
    </div>

    <div class="search-results">
      <div class="recipe-list">
        <div v-for="recipe in recipes" :key="recipe.id">
          <RecipePreview :recipe="recipe" />
        </div>
      </div>
    </div>

    <b-alert variant="danger" :show="showAlert" dismissible>
      Please enter a search query.
    </b-alert>
  </div>
</template>

<script>
import { BForm, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BButton, BFormSelect, BFormCheckboxGroup, BAlert, BDropdown, BDropdownForm } from 'bootstrap-vue';
import RecipePreview from "../components/RecipePreview.vue";
import { mockGetRecipesPreviewSortByLikes, mockGetRecipesPreviewSortByTime } from '../services/recipes.js'; // Import your service functions

export default {
  components: {
    RecipePreview,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BButton,
    BFormSelect,
    BFormCheckboxGroup,
    BAlert,
    BDropdown,
    BDropdownForm
  },
  data() {
    return {
      recipes: [],
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
      selectedDiets: [],
      selectedCuisines: [],
      sortOption: 'likes',
      sortOptions: [
        { value: 'likes', text: 'Likes' },
        { value: 'preparation_time', text: 'Preparation time' }
      ],
      showAlert: false,
      showResults: false,
      recipeIds: []
    };
  },
  watch: {
    resultsCount() {
      if (this.showResults) {
        this.onSubmit();
      }
    },
    sortOption() {
      if (this.showResults) {
        this.onSubmit();
      }
    }
  },
  methods: {
    setCategory(category) {
      this.searchQuery = category;
      // this.onSubmit();
    },
    async onSubmit() {
      console.log("Submit Triggered");
      console.log("Results Count:", this.resultsCount);
      console.log("Sort Option:", this.sortOption);
      
      if (!this.searchQuery || !this.sortOption) {
        this.showAlert = true;
        this.showResults = false;
      } else {
        this.showAlert = false;
        this.showResults = true;
        try {
          const response = await this.fetchRecipes();
          this.recipes = response.data.recipes;
          this.showResults = true;
          console.log("Recipes Fetched:", this.recipes);
        } catch (error) {
          console.error("Failed to fetch recipes:", error);
          this.showResults = false;
        }
      }
    },
    async fetchRecipes() {
      console.log("Fetching recipes with parameters:", {
        searchQuery: this.searchQuery,
        resultsCount: this.resultsCount,
        selectedFilters: this.selectedFilters,
        selectedDiets: this.selectedDiets,
        selectedCuisines: this.selectedCuisines,
        sortOption: this.sortOption
      });

      let response;

      if (this.sortOption === 'likes') {
        response = await mockGetRecipesPreviewSortByLikes(this.resultsCount);
      } else if (this.sortOption === 'preparation_time') {
        response = await mockGetRecipesPreviewSortByTime(this.resultsCount);
      }

      console.log("Mock Response:", response);

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
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-item {
  color: black;
  width: auto;
  flex: 1;
}

.form-control-white {
  background-color: white !important;
  color: #495057 !important;
  border-color: #ced4da !important;
}

.dropdown-form {
  max-height: 200px; /* Adjust this value as needed */
  overflow-y: auto;
}

.custom-dropdown .dropdown-toggle {
  background-color: white !important;
  color: #495057 !important;
  border-color: #ced4da !important;
  width: 100%; /* Ensure the dropdown button takes the full width of its container */
  text-align: left; /* Align the text to the left for better readability */
}

.b-dropdown .dropdown-menu {
  width: 100% !important;
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 auto;
  max-width: 1200px;
}

.recipe-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  flex-grow: 1;
}

.search-results {
  margin-top: 20px;
}
</style>
