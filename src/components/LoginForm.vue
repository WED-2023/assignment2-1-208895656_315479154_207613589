<template>
  <div class="login-form-container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        class="w-100"
      >Login</b-button>
      
      <div class="mt-2 text-center">
        Do not have an account yet?
        <router-link to="register"> Register here</router-link>
      </div>
    </b-form>
    
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mockLogin } from "../services/auth.js";

export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: { required },
      password: { required }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const success = true; // Modify this to test the error handling
        const response = await mockLogin(this.form.username, this.form.password, success);

        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;

      this.Login();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form-container {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px; /* Match the max-width of content-box in MainPage.vue */
}

.b-form-group {
  width: 80%; /* Adjust width as needed */
  margin: 0 auto 20px auto;
}

.b-button {
  width: 80%; /* Adjust width as needed */
  margin: 0 auto;
}
</style>
