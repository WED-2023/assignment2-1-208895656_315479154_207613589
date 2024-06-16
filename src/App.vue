<template>
  <div id="app">
    <b-navbar type="light" variant="light">
      <b-navbar-nav class="mr-auto">
        <b-nav-item><router-link :to="{ name: 'main' }">Vue Recipes</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'search' }">Search</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'about' }">About</router-link></b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <template v-if="!$root.store.username">
          <b-nav-text>hello guest</b-nav-text>
          <b-nav-item><router-link :to="{ name: 'register' }">Register</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'login' }">Login</router-link></b-nav-item>
        </template>
        <template v-else>
          <b-nav-text id="nav-text">hello {{ $root.store.username }}</b-nav-text>
          <b-nav-item @click="showCreateRecipeModal = true">
            <b-button variant="success">Create a Recipe</b-button>
          </b-nav-item>
          <b-nav-item>
            <b-dropdown right variant="success">
              <template #button-content>
                <span>User</span>
                <b-icon icon="chevron-down" />
              </template>
              <b-dropdown-item><router-link :to="{ name: 'favorites' }">My favorite recipes</router-link></b-dropdown-item>
              <b-dropdown-item><router-link :to="{ name: 'my-recipes' }">My recipes</router-link></b-dropdown-item>
              <b-dropdown-item><router-link :to="{ name: 'family-recipes' }">My family recipes</router-link></b-dropdown-item>
            </b-dropdown>
          </b-nav-item>
          <b-nav-item>
            <b-button @click="Logout" variant="danger">Logout</b-button>
          </b-nav-item>
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
  name: 'App',
  components: {
    CreateRecipeModal,
  },
  data() {
    return {
      showCreateRecipeModal: false,
    };
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast('Logout', 'User logged out successfully', 'success');
      this.$router.push('/').catch(() => {
        this.$forceUpdate();
      });
    },
  },
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

.b-nav-item,
.b-button {
  margin-right: 15px; // Standard margin to the right for nav items and buttons
}

.nav-text {
  margin-right: 20px; // Margin for the "hello" text
}

.b-dropdown {
  margin-right: 15px; // Consistent margin for the dropdown
}

.b-navbar {
  padding-left: 20px; // Reduced padding on the left if you want elements to shift leftwards
}

.b-dropdown .dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #28a745 !important; // Ensure it has the same background color
  border-color: #28a745 !important; // Ensure it has the same border color
  color: #fff !important; // Ensure the text color is white
  padding: 0.375rem 0.75rem; // Same padding as the other buttons
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}

.b-dropdown .dropdown-toggle b-icon {
  margin-left: 5px; // Small margin to the left of the arrow
}
</style>
