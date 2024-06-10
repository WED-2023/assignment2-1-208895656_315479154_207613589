<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="grid-container">
      <div class="recipe-list">
        <RecipePreviewList title="Random Recipes" class="center" />
      </div>
      <div v-if="!$root.store.username" class="login-form">
        <LoginForm></LoginForm>
      </div>
      <div v-if="$root.store.username" class="last-viewed-recipes">
        <RecipePreviewList
          title="Last Viewed Recipes"
          class="center"
          disabled
        ></RecipePreviewList>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginForm from "../components/LoginForm";

export default {
  components: {
    RecipePreviewList,
    LoginForm
  }
};
</script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 3fr 3fr;
  column-gap: 40px;
}

.login-form {
  grid-row: 1;
  grid-column: 2;
  // padding: 1px;
  max-width: 400px;
  margin: auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background: #fff;
  border-radius: 15px;

}

.recipe-list{
  grid-column: 1;
  grid-row: 2;
}
.last-viewed-recipes {
  grid-column: 2;
  grid-row: 2;
}

</style>
