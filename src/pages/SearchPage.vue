<template>
  <div class="container">
    <div class="sidebar">
      <b-form-group label="Number of results:">
        <b-form-select v-model="resultsCount" :options="resultsOptions"></b-form-select>
      </b-form-group>

      <b-form-group label="Intolerances:" class="mt-4">
        <b-form-select v-model="selectedFilters" :options="filterOptions" multiple></b-form-select>
      </b-form-group>

      <b-form-group label="Diets:" class="mt-4">
        <b-form-select v-model="selectedDiet" :options="dietOptions" multiple></b-form-select>
      </b-form-group>

      <b-form-group label="Cuisines:" class="mt-4">
        <b-form-select v-model="selectedCuisine" :options="cuisineOptions" multiple></b-form-select>
      </b-form-group>

      <b-form-group label="Sort by:" class="mt-4">
        <b-form-select v-model="sortOption" :options="sortOptions"></b-form-select>
      </b-form-group>
    </div>

    <div class="content">
      <h1 class="title">Search Page</h1>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Search for a recipe/food:">
          <b-input-group>
            <b-form-input v-model="searchQuery" placeholder="Search for a recipe/food."></b-form-input>
            <b-input-group-append>
              <b-button type="submit" variant="primary">Search</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-alert variant="danger" :show="showAlert" dismissible>
          Please enter a search query and choose a sorting method.
        </b-alert>
      </b-form>

      <!-- RecipePreviewList Component to display search results -->
      <RecipePreviewList v-if="showResults" :title="'Search Results'" :recipes="recipes" />
    </div>
  </div>
</template>

<script>
import { BForm, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BButton, BFormSelect, BAlert } from 'bootstrap-vue';
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
        { value: 'null', text: 'None' },
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
        { value: 'null', text: 'None' },
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
      selectedDiet: [],
      selectedCuisine: [],
      sortOption: null,
      sortOptions: [
        { value: null, text: 'choose a sorting method' },
        { value: 'likes', text: 'Likes' },
        { value: 'preparation_time', text: 'Preparation time' }
      ],
      showAlert: false,
      showResults: false,  // New data property to control the display of RecipePreviewList
      recipes: []  // Array to hold the recipe data
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
    async onSubmit() { // Mocking fetching recipe data according to the given filters and query
      if (!this.searchQuery || !this.sortOption) {
        this.showAlert = true;
        this.showResults = false;
      } else {
        this.showAlert = false;
        try {
          const response = await this.fetchRecipes();
          this.recipes = response.data.recipes; // Assuming response contains a list of recipe objects
          this.showResults = true;  // Set showResults to true after a successful search
        } catch (error) {
          console.error("Failed to fetch recipes:", error);
          this.showResults = false;  // Set showResults to false if there is an error
        }
      }
    },
    async fetchRecipes() {
      const searchQuery = this.searchQuery;
      const resultsCount = this.resultsCount;
      const selectedFilters = this.selectedFilters;
      const selectedDiet = this.selectedDiet.join(','); // Convert array to comma-separated string
      const selectedCuisine = this.selectedCuisine.join(','); // Convert array to comma-separated string
      const sortOption = this.sortOption;

      // Mock fetching data for demonstration. Replace with actual API call.
      const response = await mockGetRecipesByQueryAndFilters({ searchQuery, resultsCount, selectedFilters, selectedDiet, selectedCuisine, sortOption });
      return response;
    },
    loadLastSearch() {
      const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
      if (lastSearch) {
        this.searchQuery = lastSearch.searchQuery;
        this.resultsCount = lastSearch.resultsCount;
        this.selectedFilters = lastSearch.selectedFilters;
        this.selectedDiet = lastSearch.selectedDiet;
        this.selectedCuisine = lastSearch.selectedCuisine;
        this.sortOption = lastSearch.sortOption;
        this.onSubmit(); // Automatically perform the search
      }
    },
    saveSearch() {
      const searchDetails = {
        searchQuery: this.searchQuery,
        resultsCount: this.resultsCount,
        selectedFilters: this.selectedFilters,
        selectedDiet: this.selectedDiet,
        selectedCuisine: this.selectedCuisine,
        sortOption: this.sortOption
      };
      localStorage.setItem('lastSearch', JSON.stringify(searchDetails));
    }
  },
  watch: {
    showResults(newVal) {
      if (newVal) {
        this.saveSearch();
      }
    }
  },
  mounted() {
    this.loadLastSearch();
  }
};
</script>

<style>
.container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.sidebar {
  width: 25%;
  padding-right: 20px;
}

.content {
  width: 75%;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
