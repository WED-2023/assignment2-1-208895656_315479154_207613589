<template>
  <div class="recipe-preview" @click="handleClick">
    <!-- Like Button Container -->
    <div class="like-button-container" v-if="!my_recipe && !family && user_id">
      <button :class="{'liked': isLiked}" class="like-button" @click.stop="toggleLike(recipe.id)">
        {{ isLiked ? '♥ Unlike' : '♥ Like' }}
      </button>
    </div>
    <div class="recipe-body">
      <img :src="recipe.image" alt="Recipe Image" class="recipe-image" @error="image_load = false"/>
    </div>
    <div class="recipe-footer">
      <h3 :title="recipe.title" class="recipe-title">{{ recipe.title }}</h3>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li v-if="!my_recipe">{{ recipe.aggregateLikes || 0 }} likes</li>
        <li v-if="my_recipe">{{ recipe.servings }} servings</li>
        <li v-if="family && !my_recipe">Customary time: {{ recipe.customaryTime }}</li>
        <li v-if="family && !my_recipe">Family Chef: {{ recipe.family_chef }}</li>
      </ul>
      <!-- Recipe Icons -->
      <div class="recipe-icons">
        <img v-show="recipe.glutenFree" src="https://spoonacular.com/application/frontend/images/badges/gluten-free.svg" alt="Gluten-Free" class="icon"/>
        <img v-show="recipe.vegan" src="https://spoonacular.com/application/frontend/images/badges/vegan.svg" alt="Vegan" class="icon"/>
        <img v-show="recipe.vegetarian" src="https://spoonacular.com/application/frontend/images/badges/vegetarian.svg" alt="Vegetarian" class="icon"/>
        <div v-show="isClicked" class="visited-icon">👁️</div>
      </div>
    </div>
    <!-- Progress Bar Container -->
    <div v-if="progress_bar" class="progress-bar-container">
      <b-progress :value="progress_value" variant="success" striped :animated="animate"></b-progress>
    </div>
    <!-- Clickable Overlay -->
    <div class="clickable-overlay" v-if="!isClicked"></div>
  </div>
</template>

<script>
import { BProgress } from 'bootstrap-vue';
import { integer } from 'vuelidate/lib/validators';
import { isFavoriteRecipe, addToFavorites, removeFromFavorites, isWatchedRecipe, addToWatched, addToLastWatched, addToMealPlan } from '../services/user.js';
import { store } from '../store.js'; // Import store to update meal count

export default {
  components: {
    BProgress
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    progress_bar: {
      type: Boolean, 
      default: false
    },
    family: {
      type: Boolean, 
      default: false
    },
    my_recipe: {
      type: Boolean, 
      default: false
    },
    progress_value: {
      type: integer,
      default: 0
    }
  },
  data() {
    return {
      image_load: true,
      isLiked: false,
      isClicked: false,
      animate: true
    };
  },
  computed: {
    user_id() {
      return sessionStorage.getItem('user_id'); // Get user_id from sessionStorage
    }
  },
  methods: {
    async toggleLike(id) {
      try {
        if (this.isLiked) {
          await removeFromFavorites(id);
        } else {
          await addToFavorites(id);
        }
        this.isLiked = !this.isLiked; // Update local isLiked state
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    },
    async handleClick() {
      try {
        if (this.my_recipe) {
          this.$router.push({ name: 'recipe', params: { title: this.recipe.title, family: this.family ? true : undefined, my_recipe: this.my_recipe ? true : undefined }});
        } else {
          this.$router.push({ name: 'recipe', params: { recipeId: this.recipe.id, title: this.recipe.title, family: this.family ? true : undefined, my_recipe: this.my_recipe ? true : undefined }});
          await this.addToWatchedRecipes(this.recipe.id);
          this.isClicked = true;
        }
      } catch (error) {
        console.error('Error handling click:', error);
      }
    },
    async addRecipeToMealPlan(recipeId) {
      try {
        const response = await addToMealPlan(recipeId);
        if (response.status === 200) {
          store.incrementMealCount();  // Increment the meal count immediately
          alert('Recipe added to your meal plan!');
        } else {
          console.error('Failed to add recipe to meal plan:', response.message);
        }
      } catch (error) {
        console.error('Error adding recipe to meal plan:', error);
      }
    },
    async checkIfLiked(id) {
      if (!this.user_id) return;
      try {
        const response = await isFavoriteRecipe(id);
        this.isLiked = response;
      } catch (error) {
        console.error('Error checking liked status:', error);
        this.isLiked = false;
      }
    },
    async checkIfClicked(id) {
      if (!this.user_id) return;
      try {
        const response = await isWatchedRecipe(id);
        this.isClicked = response;
      } catch (error) {
        console.error('Error checking clicked status:', error);
        this.isClicked = false;
      }
    },
    async addToWatchedRecipes(id) {
      try {
        await addToWatched(id);
        await addToLastWatched(id);
        this.isClicked = true; // Update local isClicked state after both operations complete successfully
      } catch (error) {
        console.error('Error adding to watched:', error);
      }
    }
  },
  created() {
    this.checkIfLiked(this.recipe.id);
    this.checkIfClicked(this.recipe.id);
  },
  watch: {
    recipe: {
      handler(newRecipe) {
        this.checkIfLiked(newRecipe.id);
        this.checkIfClicked(newRecipe.id);
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: block;
  width: 300px;  /* Fixed width for the card */
  height: 450px; /* Fixed height for the card */
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin: 10px;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: hsla(214, 44%, 74%, 0.9);
  cursor: pointer;
}

.recipe-preview:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.recipe-body {
  width: 100%;
  height: 200px; /* Fixed height for the image container */
  overflow: hidden;
  position: relative;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: absolute;
  top: 10px;
  left: 0;
}

.recipe-footer {
  padding: 10px;
}

.recipe-title {
  margin: 5px 0;
  font-size: 18px;
}

.recipe-overview {
  list-style: none;
  padding: 0;
  margin: 5px 0;
  font-size: 16px;
  color: #000000;
}

.recipe-icons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.icon {
  width: 40px;
  height: 40px;
  margin-left: 5px;
}

.visited-icon {
  font-size: 24px;
  margin-left: 10px;
  color: #4CAF50;
}

.like-button-container {
  position: absolute;
  bottom: 20px;
  left: 15px;
  z-index: 2;
}

.like-button {
  background-color: #24ca0e;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 11px;
  cursor: pointer;
  border-radius: 5px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.like-button:hover {
  background-color: #1e9d06;
  transform: scale(1.05);
}

.like-button.liked {
  background-color: #e0245e;
}

.like-button.liked:hover {
  background-color: #c21d47;
}

.progress-bar-container {
  margin-top: 10px;
}

.clickable-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.1);
  z-index: 1;
}
</style>
