<template>
  <div class="container">
    <img src="https://www.allrecipes.com/thmb/HbxLYVBbKsMhk2NHrXjoHYwedjw=/1900x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/4540851_Buffalo-Chicken-Mac-and-Cheese-3x1-2d466cf4f8574bc69614b58ac490774a.jpg" alt="Buffalo Chicken Mac and Cheese" class="header-image">
    <h1 class="title">Everyday Cooking</h1>
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
.container {
  text-align: center; /* Center everything in the container */
  background-color: #a3b64f;

}

.header-image {
  width: 100%; /* Make the image responsive */
  max-height: 300px; /* Limiting the height of the image */
  object-fit: cover; /* Ensure the aspect ratio is maintained without distorting the image */
  margin-bottom: 20px; /* Space between the image and the title */
}

.title {
  font-family: 'Arial', sans-serif; /* Example font */
  font-size: 36px; /* Large font size for visibility */
  color: #333; /* Dark grey color for the text */
  text-shadow: 2px 2px 8px rgba(0,0,0,0.5); /* Soft shadow for a dramatic effect */
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
}

.login-form, .recipe-list {
  grid-row: 1;
}

.login-form {
  grid-column: 2;
  max-width: 400px;
  margin: auto;
  box-shadow: 0 4px 8px rgba(32, 15, 15, 0.1);
  background-color: #771616; /* Set background color to white */
  border-radius: 50px;
}

.recipe-list {
  grid-column: 1;
}

.grid-container
{
  background-color: #d8e27c;
}


.last-viewed-recipes {
  grid-column: 2;
  grid-row: 2;
}
</style>

