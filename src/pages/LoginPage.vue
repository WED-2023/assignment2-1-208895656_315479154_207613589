<template>
  <div id="login-page">
    <!-- Food Emoji Animation -->
    <div id="emoji-container">
      <div v-for="(emoji, index) in foodEmojis" :key="index" class="floating-emoji" :style="emoji.style">
        {{ emoji.symbol }}
      </div>
    </div>

    <!-- Login Form -->
    <div class="container">
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
          style="width:100px;display:block;"
          class="mx-auto w-100"
        >Login</b-button>
        <div class="mt-2">
          Do not have an account yet?
          <router-link to="register"> Register in here</router-link>
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
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { Login } from "../services/auth.js";
import { store } from "../store.js";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      },
      foodEmojis: [
        { symbol: "🍎", style: { left: '10%' } },
        { symbol: "🍕", style: { left: '20%' } },
        { symbol: "🍔", style: { left: '30%' } },
        { symbol: "🍇", style: { left: '40%' } },
        { symbol: "🍉", style: { left: '50%' } },
        { symbol: "🥑", style: { left: '60%' } },
        { symbol: "🍓", style: { left: '70%' } },
        { symbol: "🍒", style: { left: '80%' } },
        { symbol: "🍍", style: { left: '90%' } },
        { symbol: "🍩", style: { left: '15%' } }
      ]
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await Login(this.form.username, this.form.password);
        this.$router.push("/");
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    }
  }
};
</script>

<style scoped>
#login-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

#emoji-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
}

.floating-emoji {
  position: absolute;
  bottom: 0;
  font-size: 40px; /* Emoji size */
  animation: floatUp linear infinite;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) scale(0.8);
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-300px) scale(1.2);
    opacity: 0;
  }
}

/* Customize each emoji's animation timing and delay */
.floating-emoji:nth-child(1) {
  animation-duration: 5s;
  animation-delay: 0.5s;
}

.floating-emoji:nth-child(2) {
  animation-duration: 6s;
  animation-delay: 1.5s;
}

.floating-emoji:nth-child(3) {
  animation-duration: 7s;
  animation-delay: 0.3s;
}

.floating-emoji:nth-child(4) {
  animation-duration: 5.5s;
  animation-delay: 1s;
}

.floating-emoji:nth-child(5) {
  animation-duration: 6.5s;
  animation-delay: 0.8s;
}

.floating-emoji:nth-child(6) {
  animation-duration: 4.8s;
  animation-delay: 0.5s;
}

.floating-emoji:nth-child(7) {
  animation-duration: 7.2s;
  animation-delay: 1.2s;
}

.floating-emoji:nth-child(8) {
  animation-duration: 5.9s;
  animation-delay: 0.4s;
}

.floating-emoji:nth-child(9) {
  animation-duration: 6.3s;
  animation-delay: 1.8s;
}

.floating-emoji:nth-child(10) {
  animation-duration: 5.2s;
  animation-delay: 1.3s;
}

.container {
  position: relative;
  z-index: 1;
  background-color: rgba(56, 211, 211, 0.8);
  max-width: 400px;
  padding: 20px;
  margin: 100px auto;
  border-radius: 8px;
}

.title {
  text-align: center;
  color: rgb(0, 0, 0);
}
</style>
