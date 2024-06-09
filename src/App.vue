<template>
  <div id="app">
    <b-navbar type="light" variant="light">
      <b-navbar-nav class="mr-auto">
        <b-nav-item href="#"><router-link :to="{ name: 'main' }">Vue Recipes</router-link></b-nav-item>
        <b-nav-item href="#"><router-link :to="{ name: 'search' }">Search</router-link></b-nav-item>
        <b-nav-item href="#">About</b-nav-item> <!-- Adjust the href or remove it as needed -->
      </b-navbar-nav>

      <b-navbar-nav>
        <template v-if="!$root.store.username">
          <b-nav-item href="#"><router-link :to="{ name: 'register' }">Register</router-link></b-nav-item>
          <b-nav-item href="#"><router-link :to="{ name: 'login' }">Login</router-link></b-nav-item>
        </template>
        <template v-else>
          <b-nav-item-dropdown right v-b-toggle.dropdown-1>
            {{ $root.store.username }}: Logout
            <b-dropdown id="dropdown-1" text="User" variant="success">
              <b-dropdown-item href="#">My favorite recipes</b-dropdown-item>
              <b-dropdown-item href="#">My recipes</b-dropdown-item>
              <b-dropdown-item href="#">My family recipes</b-dropdown-item>
            </b-dropdown>
          </b-nav-item-dropdown>
          <b-button @click="Logout" variant="danger">Logout</b-button>
        </template>
      </b-navbar-nav>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
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

#nav {
  padding: 30px;
}

.b-navbar-nav {
  display: flex;
  align-items: center;
}

.b-nav-item, .b-button {
  margin-right: 10px;
}
</style>
