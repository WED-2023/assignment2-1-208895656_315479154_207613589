<template>
  <div class="register-page">
    <div class="container">
      <h1 class="title">Register</h1>
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <b-form-group
          id="input-group-username"
          label-cols-sm="3"
          label="Username:"
          label-for="username"
        >
          <b-form-input
            id="username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.username.required">
            Username is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.username.length">
            Username length should be between 3-8 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.username.alpha">
            Username must contain only letters
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-firstname"
          label-cols-sm="3"
          label="First Name:"
          label-for="firstName"
        >
          <b-form-input
            id="firstName"
            v-model="$v.form.firstName.$model"
            type="text"
            :state="validateState('firstName')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstName.required">
            First Name is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.firstName.alpha">
            First Name must contain only letters
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-lastname"
          label-cols-sm="3"
          label="Last Name:"
          label-for="lastName"
        >
          <b-form-input
            id="lastName"
            v-model="$v.form.lastName.$model"
            type="text"
            :state="validateState('lastName')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastName.required">
            Last Name is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.lastName.alpha">
            Last Name must contain only letters
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-country"
          label-cols-sm="3"
          label="Country:"
          label-for="country"
        >
          <b-form-select
            id="country"
            v-model="$v.form.country.$model"
            :options="countries"
            :state="validateState('country')"
          ></b-form-select>
          <b-form-invalid-feedback>
            Country is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-password"
          label-cols-sm="3"
          label="Password:"
          label-for="password"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.password.required">
            Password is required
          </b-form-invalid-feedback>
          <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
            Your password should be <strong>strong</strong>. <br />
            For that, your password should be also:
          </b-form-text>
          <b-form-invalid-feedback
            v-if="$v.form.password.required && !$v.form.password.length"
          >
            Password must be between 5 and 10 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-if="!$v.form.password.containsSpecialCharacter"
          >
            Password must contain at least one special character
          </b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-if="!$v.form.password.containsNumber"
          >
            Password must contain at least one number
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-confirmedPassword"
          label-cols-sm="3"
          label="Confirm Password:"
          label-for="confirmedPassword"
        >
          <b-form-input
            id="confirmedPassword"
            type="password"
            v-model="$v.form.confirmedPassword.$model"
            :state="validateState('confirmedPassword')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
            Password confirmation is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form.confirmedPassword.sameAsPassword"
          >
            The confirmed password is not equal to the original password
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-email"
          label-cols-sm="3"
          label="Email:"
          label-for="email"
        >
          <b-form-input
            id="email"
            v-model="$v.form.email.$model"
            type="email"
            :state="validateState('email')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">
            Email is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.email.email">
            Must be a valid email
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button
          type="submit"
          variant="primary"
          style="width:250px;"
          class="ml-5 w-75"
        >Register</b-button>
        <div class="mt-2">
          You have an account already?
          <router-link to="login"> Log in here</router-link>
        </div>
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Register failed: {{ form.submitError }}
      </b-alert>
    </div>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";
import { register } from "../services/auth.js";
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }]
    };
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(8),
        alpha
      },
      firstName: {
        required,
        alpha
      },
      lastName: {
        required,
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(10),
        containsNumber: (value) => /\d/.test(value),
        containsSpecialCharacter: (value) =>
          /[!@#$%^&*(),.?":{}|<>]/.test(value)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        email
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }

        const userDetails = {
          username: this.form.username,
          password: this.form.password,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          country: this.form.country
        };
        console.log("userDetails", userDetails);

        const response = await register(userDetails);

        this.$router.push("/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; /* Prevent scrolling */
}

.register-page {
  height: 100vh;
  background-image: 
    url('@/assets/register_background.webp'), /* Background on the left */
    url('@/assets/register_background.webp'), /* Background on the right */
    linear-gradient(to right, transparent 33.33%, white 33.33%, white 66.66%, transparent 66.66%); /* Gradient for spacing */
  background-size: 
    33.33% 100%, /* Stretch the left image to cover full height */
    33.33% 100%, /* Stretch the right image to cover full height */
    100% 100%; /* Ensure the gradient also covers the full height */
  background-repeat: 
    no-repeat, /* No repeat for the left image */
    no-repeat, /* No repeat for the right image */
    no-repeat; /* No repeat for the gradient */
  background-position: 
    left top, /* Position the first image on the left */
    right top, /* Position the second image on the right */
    center; /* Center the gradient */
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center; /* Center the container vertically */
}

.container {
  width: 33.33%; /* Container takes the middle third */
  padding: 20px;
  background-color: #ffffff; /* Solid white background */
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}
</style>
