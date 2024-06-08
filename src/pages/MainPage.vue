<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div v-if="!$root.store.username" class="login-button">
      <router-link to="/login" tag="button">You need to Login to view this</router-link>
    </div>

    <div class="row">
      <div class="col-md-6">
        <RecipePreviewList title="Random Recipes" class="RandomRecipes center" />
      </div>
      <div class="col-md-6">
        <RecipePreviewList
          title="Last Viewed Recipes"
          :class="{
            RandomRecipes: true,
            blur: !$root.store.username,
            center: true
          }"
          disabled
        ></RecipePreviewList>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}

.blur {
  -webkit-filter: blur(5px);
  /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.login-button {
  margin-left: 610px; /* Adjust margin as needed */
}
</style>
