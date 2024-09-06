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
                    <input type="checkbox" :checked="completedSteps[getCheckboxIndex(index, stepIndex)]"
                      @change="toggleStep(index, stepIndex)"
                    />
                    <span>{{ step.step }}</span>
                  </li>
                </ol>
              </div>
              <div class="progress">
                Progress: {{ calculateProgress() }}%
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
import { mockGetRecipeFullDetails, GetRecipeFullView } from "../services/recipes.js"; 
import { getMyRecipe } from "../services/user.js";

export default {
  data() {
    return {
      recipe: null,
      servingsMultiplier: 1,
      completedSteps: [],
      totalSteps: 0,
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
    async fetchRecipeDetails() {
      try {
        let response;
        if (this.$route.params.family) {
          response = await mockGetRecipeFullDetails(this.$route.params.recipeId);
        } else if (this.$route.params.my_recipe) {
          response = await getMyRecipe(this.$route.params.title);
          this.recipe = response.data.recipe[0];
          return;
        } else {
          response = await GetRecipeFullView(this.$route.params.recipeId);
          this.recipe = response.data;
        }

        if (response.status !== 200) {
          this.$router.replace("/NotFound");
          return;
        }

        // Initialize the total steps and restore checkbox state from sessionStorage
        this.totalSteps = this.recipe.analyzedInstructions.reduce((acc, group) => acc + group.steps.length, 0);
        this.completedSteps = this.getSavedCheckboxState(this.recipe.id, this.totalSteps);

      } catch (error) {
        console.error("Error fetching recipe details:", error);
        this.$router.replace("/NotFound");
      }
    },
    toggleStep(sectionIndex, stepIndex) {
      const index = this.getCheckboxIndex(sectionIndex, stepIndex);
      this.completedSteps[index] = !this.completedSteps[index];
      this.saveCheckboxState();
    },
    saveCheckboxState() {
      sessionStorage.setItem(`completedSteps_${this.recipe.id}`, JSON.stringify(this.completedSteps));
      sessionStorage.setItem(`totalSteps_${this.recipe.id}`, this.completedSteps.length.toString());
    },
    getSavedCheckboxState(recipeId, stepsCount) {
      const completed = sessionStorage.getItem(`completedSteps_${recipeId}`);
      const totalSteps = parseInt(sessionStorage.getItem(`totalSteps_${recipeId}`)) || stepsCount;
      this.totalSteps = totalSteps;

      if (completed) {
        const parsedCompleted = JSON.parse(completed);
        return Array.isArray(parsedCompleted) ? parsedCompleted : new Array(totalSteps).fill(false);
      } else {
        return new Array(totalSteps).fill(false);
      }
    },
    getCheckboxIndex(sectionIndex, stepIndex) {
      const stepsBefore = this.recipe.analyzedInstructions.slice(0, sectionIndex).reduce((acc, section) => acc + section.steps.length, 0);
      return stepsBefore + stepIndex;
    },
    calculateProgress() {
      const completedCount = this.completedSteps.filter(step => step).length;
      return Math.round((completedCount / this.totalSteps) * 100);
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

.progress {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}
</style>
