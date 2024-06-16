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

      <!-- Display meal counter with an icon -->
      <b-navbar-nav>
        <b-nav-item class="meal-counter">
          <router-link :to="{ name: 'meal' }">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnW-w8lH3R_fAVK-RkKMvmbefRFYG0isntsQ&s" alt="Plate Icon" class="meal-icon" />
            <span class="meal-count">{{ mealCount }}</span>
            <span class="meal-label">My Meal</span>
          </router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    
    <!-- Router View for Content -->
    <router-view />

    <!-- Create Recipe Modal Component -->
    <CreateRecipeModal :isVisible.sync="showCreateRecipeModal" />
  </div>
</template>

<script>
import CreateRecipeModal from './components/CreateRecipeModal.vue';
import { store } from './store.js';

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
  computed: {
    mealCount() {
      return store.mealCount;
    }
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
  provide() {
    return {
      store
    };
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

.meal-counter {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  position: relative; /* Ensure relative positioning for absolute child */
}

.meal-icon {
  width: 50px; /* Adjust icon size */
  height: auto;
  margin-right: 5px; /* Adjust margin between icon and counter */
}

.meal-count {
  position: absolute;
  top: 50%;
  left: 47%; /* Adjust left position as needed */
  transform: translate(-50%, -50%);
  font-weight: bold; /* Optionally adjust font properties */
  color: rgb(8, 8, 8); /* Optionally adjust text color */
  font-size: 14px; /* Optionally adjust font size */
  padding: 5px 10px; /* Optionally adjust padding */
  border-radius: 5px; /* Optionally add border radius */
}

.meal-label {
  position: absolute;
  top: calc(76% + 5px); /* Position directly under meal-count */
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px; /* Adjust label font size */
  color: #0e0101; /* Adjust label text color */
  white-space: nowrap; /* Prevent label from breaking into multiple lines */
}
</style>
