<template>
  <div class="recipe-preview" :class="{ 'clicked': clickedRecipes.has(recipe.id) }">
    <!-- Like Button Container -->
    <div class="like-button-container" @click.stop="toggleLike(recipe.id)">
      <button :class="{'liked': isLiked}" class="like-button">
        {{ isLiked ? '♥ Unlike' : '♥ Like' }}
      </button>
    </div>
    <!-- Router Link for Navigation -->
    <router-link @click.native="handleClick" :to="{ name: 'recipe', params: { recipeId: recipe.id, family: family ? true : undefined } }" class="link-area">
      <div class="recipe-body">
        <img :src="recipe.image" alt="Recipe Image" class="recipe-image" @error="image_load = false"/>
      </div>
      <div class="recipe-footer">
        <h3 :title="recipe.title" class="recipe-title">{{ recipe.title }}</h3>
        <ul class="recipe-overview">
          <li>{{ recipe.readyInMinutes }} minutes</li>
          <li>{{ recipe.aggregateLikes }} likes</li>
          <li v-if="family">Customary time: {{ recipe.customaryTime }}</li>
          <li v-if="family">Family Chef: {{ recipe.family_chef }}</li>
        </ul>
        <div class="recipe-icons">
          <img v-if="recipe.glutenFree" src="https://spoonacular.com/application/frontend/images/badges/gluten-free.svg" alt="Gluten-Free" class="icon"/>
          <img v-if="recipe.vegan" src="https://spoonacular.com/application/frontend/images/badges/vegan.svg" alt="Vegan" class="icon"/>
          <img v-if="recipe.vegetarian" src="https://spoonacular.com/application/frontend/images/badges/vegetarian.svg" alt="Vegetarian" class="icon"/>
        </div>
      </div>
    </router-link>
    <!-- Progress Bar Container -->
    <div v-if="progress_bar" class="progress-bar-container">
      <b-progress :value="progress_value" variant="success" striped :animated="animate"></b-progress>
    </div>
    <!-- Visited Icon -->
    <div v-if="isClicked" class="visited-icon">
      ✅
    </div>
  </div>
</template>

<script>
import { BProgress } from 'bootstrap-vue';
import { integer } from 'vuelidate/lib/validators';
import { isFavoriteRecipe, addToFavorites, removeFromFavorites } from '../services/recipes.js';

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
    progress_value: {
      type: integer,
      default: 0
    }
  },
  data() {
    return {
      image_load: true,
      clickedRecipes: new Set(),
      isLiked: false, // Track whether the recipe is liked
      animate: true, // Animation for the progress bar
      isClicked: false
  
    };
  },
  methods: {
    async toggleLike(id) {
      try {
        // console.log('Is liked:', id);
        if (this.isLiked) {
          console.log('Removing from favorites');
          await removeFromFavorites(id);
        } else {
          console.log('Adding to favorites');
          await addToFavorites(id);
        }
        this.isLiked = !this.isLiked; // Update local isLiked state
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    },
    handleClick() {
      this.clickedRecipes.add(this.recipe.id);
      // Optionally, save clicked recipes to localStorage if needed
      // localStorage.setItem('clickedRecipes', JSON.stringify([...this.clickedRecipes]));
    },
    async checkIfLiked(id) {
      try {
        const response = await isFavoriteRecipe(id);
        this.isLiked = response; // Set isLiked based on the server response
      } catch (error) {
        console.error('Error checking liked status:', error);
        this.isLiked = false; // Default to false if there's an error
      }
    }
  },
  async mounted() {
    await this.checkIfLiked(this.recipe.id); // Check if the recipe is liked when the component is mounted
  },
  watch: {
    recipe: {
      handler(newRecipe) {
        this.checkIfLiked(newRecipe.id); // Check if the recipe is liked when the recipe prop changes
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
  max-height: 400px; /* Fixed height for the card */
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin: 10px;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-family: 'safary';
  background-color: rgba(144, 238, 144, 0.5); /* Light green with 50% transparency */
}

.recipe-preview:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.recipe-body {
  width: 100%;
  height: 200px; /* Fixed height for the image container */
  overflow: hidden;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* This ensures the image covers the container */
  display: block;
}

.recipe-footer {
  padding: 10px;
  background-color: #f9f9f9;
  height: 250px; /* Fixed height for the footer to maintain card height consistency */
}

.recipe-title {
  margin: 5px 0;
  font-size: 18px;
}

.recipe-overview {
  list-style: none;
  padding: 0;
  margin: 5px 0;
  font-size: 14px;
}

.recipe-icons {
  display: flex;
  justify-content: flex-end;
  /* margin-top: 70px; */
  /* bottom: 20px; */
}

.icon {
  width: 40px;
  height: 40px;
  margin-left: 5px;
}

.like-button-container {
  position: absolute;
  bottom: 20px;
  left: 15px;
}

.like-button {
  background-color: #24ca0e; /* Green background for 'Like' */
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 11px;
  cursor: pointer;
  border-radius: 5px;
  position: absolute;
  bottom: 10px;
  left: 10px; /* Position to bottom-left */
}

.liked {
  background-color: #ff4444; /* Red background for liked state */
}

.progress-bar-container {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}

.progress-bar {
  width: 100%;
}

.visited-icon {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 24px;
  color: #28a745;
}
</style>
