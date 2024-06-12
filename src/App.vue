<template>
  <div id="app">
    <b-navbar type="light" variant="light">
      <b-navbar-nav class="mr-auto">
        <b-nav-item href="#"><router-link :to="{ name: 'main' }">Vue Recipes</router-link></b-nav-item>
        <b-nav-item href="#"><router-link :to="{ name: 'search' }">Search</router-link></b-nav-item>
        <b-nav-item href="#"><router-link :to="{ name: 'about' }">About</router-link></b-nav-item>
      </b-navbar-nav>
      
      <b-navbar-nav>
        <template v-if="!$root.store.username">
          <b-nav-text>hello guest</b-nav-text>
          <b-nav-item href="#"><router-link :to="{ name: 'register' }">Register</router-link></b-nav-item>
          <b-nav-item href="#"><router-link :to="{ name: 'login' }">Login</router-link></b-nav-item>
        </template>
        <template v-else>
          <b-nav-text id="nav-text">hello {{ $root.store.username }}</b-nav-text>
          <b-nav-item @click="showCreateRecipeModal = true">create a recipe</b-nav-item>
          <b-dropdown id="dropdown-1" text="User" variant="success">
            <b-dropdown-item href="#">My favorite recipes</b-dropdown-item>
            <b-dropdown-item href="#">My recipes</b-dropdown-item>
            <b-dropdown-item href="#">My family recipes</b-dropdown-item>
          </b-dropdown>
          <b-button @click="Logout" variant="danger">Logout</b-button>
        </template>
      </b-navbar-nav>
    </b-navbar>
    <router-view />
    
    <CreateRecipeModal :isVisible.sync="showCreateRecipeModal" />
  </div>
</template>

<script>
import CreateRecipeModal from './components/CreateRecipeModal.vue';

export default {
  name: "App",
  components: {
    CreateRecipeModal
  },
  data() {
    return {
      showCreateRecipeModal: false
    };
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

.b-navbar-nav {
  display: flex;
  align-items: center;
}

.b-nav-item, .b-button {
  margin-right: 35px; // Standard margin to the right for nav items and buttons
}

.nav-text {
  margin-right: 250px; // Increased margin to separate "hello" text more from the dropdown
}

.b-dropdown {
  margin-right: 100px; // Consistent margin for the dropdown
}

.b-button {
  margin-right: 50px; // Removes margin to the right of the Logout button
}

.b-navbar {
  padding-left: 20px; // Reduced padding on the left if you want elements to shift leftwards
}
</style>
