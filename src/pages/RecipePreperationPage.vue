<template>
  <div class="page-background">
    <div class="container">
      <div v-if="recipe">
        <div class="recipe-header mt-3 mb-4">
          <h1>{{ recipe.title }}</h1>
          <img :src="recipe.image" class="center" />
        </div>
        <div class="recipe-body">
          <div class="wrapper">
            <div class="wrapped">
              <div class="mb-3">
                <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
                <div v-if="!this.$route.params.my_recipe">Likes: {{ recipe.aggregateLikes }} likes</div>
                <div>{{ recipe.vegan ? 'Vegan: Yes' : 'Vegan: No' }}</div>
                <div>{{ recipe.vegetarian ? 'Vegetarian: Yes' : 'Vegetarian: No' }}</div>
                <div>{{ recipe.glutenFree ? 'Gluten-Free: Yes' : 'Gluten-Free: No' }}</div>
                <div>
                  Servings: {{ updatedServings }}
                  <select v-model="servingsMultiplier">
                    <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                  </select>
                  (multiplier)
                </div>
              </div>
              Ingredients:
              <ul>
                <li v-for="(ingredient, index) in updatedIngredients" :key="index + '_' + ingredient.id">
                  {{ (ingredient.amount).toFixed(2) }} {{ ingredient.unit }} {{ ingredient.name }}
                </li>
              </ul>
            </div>
            <div class="wrapped">
              <h3>Instructions:</h3>
              <div v-for="(instructionGroup, index) in recipe.analyzedInstructions" :key="index">
                <h4>{{ instructionGroup.name }}</h4>
                <ol>
                  <li v-for="(step, stepIndex) in instructionGroup.steps" :key="stepIndex">
                    <input type="checkbox" />
                    <span>{{ step.step }}</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading recipe details...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { required, integer } from '@vuelidate/validators';
import { mockGetRecipeFullDetails, mockGetFamilyRecipeFullDetails, GetRecipeFullView } from "../services/recipes.js";
import { store } from "../store.js"; // Import the store
import {getMyRecipe} from "../services/user.js"

export default {
  data() {
    return {
      recipe: null,
      servingsMultiplier: 1
    };
  },
  props: {
    family: {
      type: Boolean,
      default: false
    },
    temp_servings: {
      type: Number,
      default: null
    }
  },
  computed: {
    updatedServings() {
      return this.recipe ? this.recipe.servings * this.servingsMultiplier : 1;
    },
    updatedIngredients() {
      return this.recipe ? this.recipe.extendedIngredients.map((ingredient) => ({
        ...ingredient,
        amount: ingredient.amount * this.servingsMultiplier
      })) : [];
    }
  },
  methods: {
    goToPreparation() {
      // store.incrementMealCount();
      this.$router.push({ name: 'preparation', params: { recipeId: this.$route.params.recipeId, family: this.$route.params.family } });
    },
    addToMeal() {
      // store.incrementMealCount();
    },
    async fetchRecipeDetails() {
      try {
        let response;
        console.log(this.$route.params.family)
        if (this.$route.params.family) {
          response = await mockGetFamilyRecipeFullDetails(this.$route.params.recipeId);
        }else if(this.$route.params.my_recipe){
          response = await getMyRecipe(this.$route.params.title);
          console.log('getMyRecipe response recipe preperation page',response.data.recipe[0])
          this.recipe = response.data.recipe[0];
          return;
        } else {
          response = await GetRecipeFullView(this.$route.params.recipeId);
          this.recipe = response.data;
          // response = await mockGetRecipeFullDetails(this.$route.params.recipeId);
          // this.recipe = response.data.recipe;
        }
        console.log(response)
        if (response.status !== 200) {
          this.$router.replace("/NotFound");
          return;
        }

        
        console.log(this.recipe);
      } catch (error) {
        console.error(error);
        this.$router.replace("/NotFound");
      }
    }
  },
  created() {
    this.fetchRecipeDetails();
  }
};
</script>

<style scoped>
.page-background {
  background-image: url('@/assets/preparation_background.webp');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.recipe-header {
  text-align: center;
  margin-bottom: 20px;
}

.recipe-header h1 {
  color: #333;
  font-size: 24px;
}

.center {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 10px auto;
  border-radius: 4px;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.wrapped {
  flex: 1 1 300px; /* Each block takes at least 300px space */
  margin-right: 20px;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.wrapped:last-child {
  margin-right: 0; /* Remove margin for the last item */
}

.mb-3 {
  margin-bottom: 16px;
  color: #666;
  font-size: 16px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

li:last-child {
  border-bottom: none;
}

ol {
  counter-reset: step-counter;
  list-style-type: none;
  padding: 0;
}

ol li {
  counter-increment: step-counter;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}

ol li:before {
  content: counter(step-counter) ". ";
  font-weight: bold;
  color: #555;
  margin-right: 8px;
}

ol li:last-child {
  border-bottom: none;
}

.instructions {
  color: #444;
  font-size: 14px;
}

.instructions .completed {
  text-decoration: line-through;
}

/* Adding a subtle hover effect to ingredients and instructions for better interactivity */
li:hover {
  background-color: #f0f0f0;
}

button {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

input[type='checkbox'] {
  margin-right: 10px;
}
</style>
