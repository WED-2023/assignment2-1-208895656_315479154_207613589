<template>
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
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
              <div>{{ recipe.vegan ? 'Vegan: Yes' : 'Vegan: No' }}</div>
              <div>{{ recipe.vegetarian ? 'Vegetarian: Yes' : 'Vegetarian: No' }}</div>
              <div>{{ recipe.glutenFree ? 'Gluten-Free: Yes' : 'Gluten-Free: No' }}</div>
              <div>Servings: {{ recipe.servings }}</div>
            </div>
            Ingredients:
            <ul>
              <li v-for="(ingredient, index) in recipe.extendedIngredients" :key="index + '_' + ingredient.id">
                {{ ingredient.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <h3>Instructions:</h3>
            <div v-html="recipe.summary"></div> <!-- Render HTML directly from summary -->
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading recipe details...</p>
    </div>
  </div>
</template>


<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        // response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/" + this.$route.params.recipeId,
        //   {
        //     withCredentials: true
        //   }
        // );

        response = mockGetRecipeFullDetails(this.$route.params.recipeId);

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      } = response.data.recipe;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
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
}

ol li:before {
  content: counter(step-counter) ". ";
  font-weight: bold;
  color: #555;
}

ol li:last-child {
  border-bottom: none;
}

.instructions {
  color: #444;
  font-size: 14px;
}

/* Adding a subtle hover effect to ingredients and instructions for better interactivity */
li:hover {
  background-color: #f0f0f0;
}
</style>