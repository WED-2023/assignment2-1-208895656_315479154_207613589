<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview"
    :class="{ 'clicked': clicked }"
    @click="handleClick"
  >
    <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
        <li>gluten free - {{ recipe.glutenFree ? 'Yes' : 'No' }}</li>
        <li>
          Vegan/Vegetarian - 
          <span v-if="recipe.vegan">VG</span>
          <span v-else-if="recipe.vegetarian">VE</span>
          <span v-else>No</span>
        </li>
      </ul>
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
      this.clicked = true;
    }
  },
  destroyed() {
    // Reset the clicked state when the component is destroyed
    this.clicked = false;
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}

.recipe-preview.clicked {
  /* Add your styling for the clicked state here */
  background-color: rgb(172, 26, 26); /* Example change of background color */
}

/* Your existing styles remain unchanged */
</style>
