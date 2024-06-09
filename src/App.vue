<template>
  <div id="app">
    <div id="nav">

    <b-navbar type="light" variant="light">
    <b-navbar-nav>
      <b-nav-item href="#"><router-link :to="{ name: 'main' }">Vue Recipes</router-link></b-nav-item>
      <b-nav-item href="#"><router-link :to="{ name: 'search' }">Search</router-link></b-nav-item>
      <b-nav-item href="#">About</b-nav-item> <!-- need to route to a page with A marketing brief about the development team and the project with links to the previous exercises -->

      <span v-if="!$root.store.username">
        Guest:
        <b-nav-item href="#"><router-link :to="{ name: 'register' }">Register</router-link></b-nav-item>
        <b-nav-item href="#"><router-link :to="{ name: 'login' }">Login</router-link></b-nav-item>
      </span>
      <span v-else>
        {{ $root.store.username }}: <button @click="Logout">Logout</button>
        <b-nav-item-dropdown text="User" right>
        <b-dropdown-item href="#">My favorite recipes</b-dropdown-item>
        <b-dropdown-item href="#">my recipes</b-dropdown-item>
        <b-dropdown-item href="#">my family recipes</b-dropdown-item>
      </b-nav-item-dropdown>
      </span>
      <!-- Navbar dropdowns -->

      
    </b-navbar-nav>
  </b-navbar>
  </div>
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
@import "@/scss/form-style.scss";

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

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
