<template>
  <div class="container">
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

      <b-form-group label="Number of results:">
        <b-form-select v-model="resultsCount" :options="resultsOptions"></b-form-select>
      </b-form-group>

      <b-form-group label="Filter by:">
        <div class="d-flex justify-content-between align-items-center">
          <b-form-checkbox-group v-model="selectedFilters" :options="filterOptions" stacked></b-form-checkbox-group>
          <div class="ml-3">
            <b-form-group>
              <b-form-select v-model="sortOption" :options="sortOptions" placeholder="Please choose a sorting method"></b-form-select>
            </b-form-group>
          </div>
        </div>
      </b-form-group>

      <b-alert variant="danger" :show="showAlert" dismissible>
        Please enter a search query and choose a sorting method.
      </b-alert>
    </b-form>
  </div>
</template>

<script>
import { BForm, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BButton, BFormSelect, BFormCheckboxGroup, BAlert } from 'bootstrap-vue';

export default {
  components: {
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
        { value: 'Vegan', text: 'Vegan' },
        { value: 'Vegetarian', text: 'Vegetarian' },
        { value: 'Gluten-Free', text: 'Gluten-Free' },
        { value: 'Less than hour', text: 'Less than hour' },
        { value: 'Spicy', text: 'Spicy' },
        { value: 'Italian', text: 'Italian' }
      ],
      sortOption: null,
      sortOptions: [
        { value: null, text: 'Please choose a sorting method' },
        { value: 'likes', text: 'Likes' },
        { value: 'preparation_time', text: 'Preparation time' }
      ],
      showAlert: false
    };
  },
  methods: {
    onSubmit() {
      if (!this.searchQuery || !this.sortOption) {
        this.showAlert = true;
      } else {
        this.showAlert = false;
        // Handle the search logic here
        console.log('Search Query:', this.searchQuery);
        console.log('Results Count:', this.resultsCount);
        console.log('Selected Filters:', this.selectedFilters);
        console.log('Sort Option:', this.sortOption);
      }
    }
  }
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.title {
  text-align: center;
  margin-bottom: 20px;
}
.ml-3 {
  margin-left: 1rem;
}
</style>
