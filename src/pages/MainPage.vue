<template>
  <div class="main-page">
    <div class="background-overlay"></div>
    <h1 class="title">Everyday Cooking</h1>
    <div class="content-container">
      <div class="content-box recipe-list transparent-light-green">
        <RecipePreviewList :recipes="recipes" title="Random Recipes" class="center" :showButton="true" />
      </div>
      <div v-if="!$root.store.username" class="content-box login-form transparent-light-green">
        <LoginForm></LoginForm>
      </div>
      <div v-if="$root.store.username" class="content-box last-viewed-recipes transparent-light-green">
        <RecipePreviewList
          :recipes="recipes"
          title="Last Viewed Recipes"
          class="center"
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
  },
  data() {
    return {
      recipes: [
        // Populate this array with your recipes
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  position: relative;
  min-height: 100vh; /* Ensure the background covers the entire height */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/src/assets/background.png') no-repeat center center fixed;
  background-size: cover;
  opacity: 0.6; /* Adjust opacity to make the background transparent */
  z-index: -1; /* Ensure the background is behind the content */
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
  margin: 20px 0; /* Add some margin to the title */
}

.content-container {
  display: flex;
  justify-content: center; /* Center items horizontally */
  align-items: flex-start; /* Align items at the start vertically */
  width: 100%;
}

.content-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(144, 238, 144, 0.5); /* Light green with 50% transparency */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(32, 15, 15, 0.1);
  z-index: 1; /* Ensure these components are above the background */
  margin: 10px;
  width: 100%; /* Expand to full width */
  max-width: 450px; /* Adjust as needed */
  text-align: center; /* Center the text */
  flex-grow: 1; /* Ensure they stretch equally */
}

.login-form {
  align-self: flex-start;
}
</style>
