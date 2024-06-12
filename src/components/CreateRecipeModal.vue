<template>
    <b-modal v-model="isVisible" title="Create a Recipe" @ok="handleSubmit" @hidden="handleHidden">
      <b-form>
        <b-alert v-if="showAlert" variant="danger" dismissible @dismissed="showAlert = false">
          You should fill all the details and add at least one ingredient.
        </b-alert>
        <b-form-group label="Title" :state="validateField(newRecipe.title)">
          <b-form-input v-model="newRecipe.title" required></b-form-input>
          <b-form-invalid-feedback>Title is required.</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Image URL" :state="validateField(newRecipe.image)">
          <b-form-input v-model="newRecipe.image" required></b-form-input>
          <b-form-invalid-feedback>Image URL is required.</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Instructions" :state="validateField(newRecipe.instructions)">
          <b-form-textarea v-model="newRecipe.instructions" rows="4" required></b-form-textarea>
          <b-form-invalid-feedback>Instructions are required.</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Ready in Minutes" :state="validateField(newRecipe.readyInMinutes)">
          <b-form-input type="number" v-model="newRecipe.readyInMinutes" @input="validateNumberInput('readyInMinutes', 10, 300)" required></b-form-input>
          <b-form-invalid-feedback>Ready in minutes must be between 10 and 300.</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Servings" :state="validateField(newRecipe.servings)">
          <b-form-input type="number" v-model="newRecipe.servings" @input="validateNumberInput('servings', 1, 20)" required></b-form-input>
          <b-form-invalid-feedback>Servings must be between 1 and 20.</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Dietary Preferences">
          <b-form-checkbox v-model="newRecipe.glutenFree">Gluten-Free</b-form-checkbox>
          <b-form-checkbox v-model="newRecipe.vegan">Vegan</b-form-checkbox>
          <b-form-checkbox v-model="newRecipe.vegetarian">Vegetarian</b-form-checkbox>
        </b-form-group>
        <b-form-group label="Ingredients" :state="validateField(newRecipe.ingredients.length > 0)">
          <div v-for="(ingredient, index) in newRecipe.ingredients" :key="index" class="mb-2">
            <b-input-group>
              <b-form-input v-model="ingredient.name" placeholder="Name" required></b-form-input>
              <b-form-select v-model="ingredient.amount" aria-label="Amount" :options="amountOptions" required></b-form-select>
              <b-form-input type="number" v-model="ingredient.ingredientId" @input="validateNumberInput('ingredients[' + index + '].ingredientId', 1, 99999)" placeholder="ID" required></b-form-input>
              <b-button @click="removeIngredient(index)" variant="danger">Remove</b-button>
            </b-input-group>
          </div>
          <b-button @click="addIngredient" variant="success">Add Ingredient</b-button>
          <b-form-invalid-feedback v-if="!newRecipe.ingredients.length">At least one ingredient is required.</b-form-invalid-feedback>
        </b-form-group>
      </b-form>
    </b-modal>
  </template>
  
  <script>
  import { BForm, BFormGroup, BFormInput, BInputGroup, BButton, BFormSelect, BFormCheckbox, BAlert, BModal, BFormTextarea, BFormInvalidFeedback } from 'bootstrap-vue';
  
  export default {
    name: "CreateRecipeModal",
    components: {
      BForm,
      BFormGroup,
      BFormInput,
      BInputGroup,
      BButton,
      BFormSelect,
      BFormCheckbox,
      BAlert,
      BModal,
      BFormTextarea,
      BFormInvalidFeedback
    },
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        showAlert: false,
        newRecipe: {
          title: '',
          image: '',
          instructions: '',
          readyInMinutes: 10,
          servings: 1,
          likes: 0,
          glutenFree: false,
          vegan: false,
          vegetarian: false,
          ingredients: []
        },
        amountOptions: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' },
          { value: 6, text: '6' },
          { value: 7, text: '7' },
          { value: 8, text: '8' },
          { value: 9, text: '9' },
          { value: 10, text: '10' }
        ]
      };
    },
    methods: {
      validateField(field) {
        return field ? true : false;
      },
      addIngredient() {
        this.newRecipe.ingredients.push({ name: '', amount: 1, ingredientId: 1 });
      },
      removeIngredient(index) {
        this.newRecipe.ingredients.splice(index, 1);
      },
      validateNumberInput(field, min, max) {
        if (this.newRecipe[field] < min) this.newRecipe[field] = min;
        if (this.newRecipe[field] > max) this.newRecipe[field] = max;
      },
      handleSubmit(bvModalEvt) {
        let alertMessage = "";
  
        if (!this.newRecipe.title) alertMessage += "Title, ";
        if (!this.newRecipe.image) alertMessage += "Image URL, ";
        if (!this.newRecipe.instructions) alertMessage += "Instructions, ";
        if (this.newRecipe.readyInMinutes < 10 || this.newRecipe.readyInMinutes > 300) alertMessage += "Ready in Minutes, ";
        if (this.newRecipe.servings < 1 || this.newRecipe.servings > 20) alertMessage += "Servings, ";
        if (this.newRecipe.ingredients.length === 0 || !this.newRecipe.ingredients.every(ingredient => ingredient.name && ingredient.amount && ingredient.ingredientId >= 1 && ingredient.ingredientId <= 99999)) {
          alertMessage += "Ingredients, ";
        }
  
        if (alertMessage.length > 0) {
          alertMessage = alertMessage.slice(0, -2); // Remove the trailing comma and space
          alert("The following fields are invalid: " + alertMessage);
          this.showAlert = true;
          bvModalEvt.preventDefault();
        } else {
          // Handle the creation of the recipe with the newRecipe data
          console.log('Recipe created:', this.newRecipe);
          this.$emit('update:isVisible', false);
          this.resetForm();
        }
      },
      handleHidden() {
        this.$emit('update:isVisible', false);
      },
      resetForm() {
        this.showAlert = false;
        this.newRecipe = {
          title: '',
          image: '',
          instructions: '',
          readyInMinutes: 10,
          servings: 1,
          likes: 0,
          glutenFree: false,
          vegan: false,
          vegetarian: false,
          ingredients: []
        };
      }
    }
  };
  </script>
  