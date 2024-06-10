<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview"
    :class="{ 'clicked': clicked }"
    @click="handleClick"
  >
    <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" alt="Recipe Image" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <h3 :title="recipe.title" class="recipe-title">{{ recipe.title }}</h3>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
      </ul>
      <div class="recipe-icons">
        <img v-if="recipe.glutenFree" src="https://spoonacular.com/application/frontend/images/badges/gluten-free.svg" alt="Gluten-Free" class="icon"/>
        <img v-if="recipe.vegan" src="https://spoonacular.com/application/frontend/images/badges/vegan.svg" alt="Vegan" class="icon"/>
        <img v-if="recipe.vegetarian" src="https://spoonacular.com/application/frontend/images/badges/vegetarian.svg" alt="Vegetarian" class="icon"/>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  data() {
    return {
      image_load: true,
      clicked: false
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
      this.clicked = !this.clicked;
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: block;
  width: 300px; /* Fixed width for uniform card size */
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin: 10px;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden; /* Ensures nothing spills out of the card */
  border-radius: 8px; /* Rounded corners for better aesthetics */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-preview:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.recipe-body {
  width: 100%;
  height: auto;
}

.recipe-image {
  width: 100%;
  height: auto;
  display: block;
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
  width: 40px; /* Uniform size for all icons */
  height: 40px;
  margin-left: 5px;
  margin-bottom: 15px;
}
</style>
