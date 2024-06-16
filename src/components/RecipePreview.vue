<template>
  <div class="recipe-preview" :class="{ 'clicked': clickedRecipes.has(recipe.id) }">
    <!-- Like Button Container -->
    <div class="like-button-container" @click.stop="toggleLike(recipe.id)">
      <button :class="{'liked': likedRecipes.has(recipe.id)}" class="like-button">
        {{ likedRecipes.has(recipe.id) ? '♥ Unlike' : '♥ Like' }}
      </button>
    </div>
    <!-- Router Link for Navigation -->
    <router-link @click.native="handleClick" :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="link-area">
      <div class="recipe-body">
        <img :src="recipe.image" alt="Recipe Image" class="recipe-image" @error="image_load = false"/>
      </div>
      <div class="recipe-footer">
        <h3 :title="recipe.title" class="recipe-title">{{ recipe.title }}</h3>
        <ul class="recipe-overview">
          <li>{{ recipe.readyInMinutes }} minutes</li>
          <li>{{ recipe.aggregateLikes }} likes</li>
          <br>
          <li>{{ recipe.summary }}</li>
          <br><br><br>
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
  </div>
</template>

<script>
import { BProgress } from 'bootstrap-vue';
import { integer } from 'vuelidate/lib/validators';

export default {
  components: {
    BProgress
  },
  data() {
    return {
      image_load: true,
      clickedRecipes: new Set(),
      likedRecipes: new Set(),
      animate: true // Animation for the progress bar
    };
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
    progress_value:{
      type: integer,
      default: 50
    }
  },
  methods: {
    toggleLike(id) {
      mockAddFavorite(id)
      this.likedRecipes.has(id) ? this.likedRecipes.delete(id) : this.likedRecipes.add(id);
      localStorage.setItem('likedRecipes', JSON.stringify([...this.likedRecipes]));
      this.$forceUpdate();  // Ensuring reactivity is maintained
    },
    handleClick() {
      this.clickedRecipes.add(this.recipe.id);
      localStorage.setItem('clickedRecipes', JSON.stringify([...this.clickedRecipes]));
    }
  },
  mounted() {
    const storedLikes = JSON.parse(localStorage.getItem('likedRecipes') || "[]");
    this.likedRecipes = new Set(storedLikes);
    
    const storedClicks = JSON.parse(localStorage.getItem('clickedRecipes') || "[]");
    this.clickedRecipes = new Set(storedClicks);
  }
};
</script>

<style scoped>
.recipe-preview {
  display: block;
  width: 300px;
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
}

.recipe-preview:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.recipe-body {
  width: 100%;
  height: auto;
}

.like-button-container {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.recipe-image {
  width: 100%;
  height: auto;
  display: block;
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

.recipe-footer {
  padding: 10px;
  background-color: #f9f9f9;
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
  margin-top: 10px;
}

.icon {
  width: 40px;
  height: 40px;
  margin-left: 5px;
  margin-bottom: 15px;
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
</style>
