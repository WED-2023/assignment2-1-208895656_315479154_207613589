<template>
    <div class="recipe-preview" :class="{ 'clicked': clickedRecipes.has(recipe.id) }">
      <div class="recipe-header">
        <h2>{{ recipe.title }}</h2>
        <h4>{{ recipe.family_chef }}</h4>
        <p>{{ recipe.cuisine }}</p>
      </div>
      <div class="recipe-summary">
        <p>{{ recipe.summary }}</p>
        <p><strong>Customary Time: </strong>{{ recipe.customaryTime }}</p>
      </div>
      <div class="recipe-dietary">
        <p>Vegetarian: {{ recipe.vegetarian ? 'Yes' : 'No' }}</p>
        <p>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}</p>
        <p>Gluten-Free: {{ recipe.glutenFree ? 'Yes' : 'No' }}</p>
      </div>
      <div class="recipe-ingredients">
        <h3>Ingredients:</h3>
        <ul>
          <li v-for="(ingredient, index) in recipe.extendedIngredients" :key="index">
            {{ ingredient.original }}
          </li>
        </ul>
      </div>
      <div class="recipe-details">
        <p>Ready in: {{ recipe.readyInMinutes }} minutes</p>
        <p>Servings: {{ recipe.servings }}</p>
      </div>
      <div class="recipe-instructions">
        <h3>Preparation:</h3>
        <img :src="recipe.preparation_image" alt="Preparation Image" class="recipe-image" v-if="image_load"/>
        <ol>
          <li v-for="step in recipe.analyzedInstructions[0].steps" :key="step.number">{{ step.step }}</li>
        </ol>
        <h3>Cooking:</h3>
        <img :src="recipe.cooking_image" alt="Cooking Image" class="recipe-image" v-if="image_load"/>
        <ol>
          <li v-for="step in recipe.analyzedInstructions[1].steps" :key="step.number">{{ step.step }}</li>
        </ol>
        <h3>Finishing:</h3>
        <img :src="recipe.finish_image" alt="Finish Image" class="recipe-image" v-if="image_load"/>
        <ol>
          <li v-for="step in recipe.analyzedInstructions[2].steps" :key="step.number">{{ step.step }}</li>
        </ol>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        image_load: true,
        clickedRecipes: new Set(),
      };
    },
    props: {
      recipe: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleClick() {
        this.clickedRecipes.add(this.recipe.id);
        localStorage.setItem('clickedRecipes', JSON.stringify([...this.clickedRecipes]));
      }
    },
    mounted() {
      const storedClicks = JSON.parse(localStorage.getItem('clickedRecipes') || "[]");
      this.clickedRecipes = new Set(storedClicks);
    }
  };
  </script>
  
  <style scoped>
  .recipe-preview {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    margin: 10px 0;
    text-decoration: none;
    color: inherit;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding: 20px;
    background-color: #fff;
  }
  
  .recipe-header {
    text-align: center;
  }
  
  .recipe-summary {
    margin: 20px 0;
  }
  
  .recipe-dietary,
  .recipe-details {
    margin: 10px 0;
  }
  
  .recipe-ingredients {
    margin: 20px 0;
  }
  
  .recipe-ingredients ul {
    list-style: none;
    padding: 0;
  }
  
  .recipe-ingredients li {
    background: #f1f1f1;
    padding: 5px;
    margin: 5px 0;
  }
  
  .recipe-instructions {
    margin: 20px 0;
  }
  
  .recipe-instructions h3 {
    margin: 10px 0;
  }
  
  .recipe-image {
    width: 100%;
    height: auto;
    display: block;
    margin: 10px 0;
  }
  
  .clicked {
    border-color: blue;
  }
  </style>
  