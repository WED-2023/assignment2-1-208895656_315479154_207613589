const state = {
  server_domain: "http://localhost:3000",
  // server_domain: "http://132.72.65.211/",
};

import { reactive } from 'vue';

// Load initial values from sessionStorage if available
const savedUserId = sessionStorage.getItem('user_id');
const savedUsername = sessionStorage.getItem('username');

export const store = reactive({
  mealCount: 0, // Initial meal count
  username: savedUsername || "",  // Load from sessionStorage or default to empty
  user_id: savedUserId ? Number(savedUserId) : 0,  // Load from sessionStorage or default to 0

  // Increment the meal count
  incrementMealCount() {
    this.mealCount++;
  },

  // Decrement the meal count
  decrementMealCount() {
    if (this.mealCount > 0) {
      this.mealCount--;
    }
  },

  // Set user_id and persist it to sessionStorage
  set_user_id(user_id) {
    this.user_id = user_id;
    if (user_id) {
      sessionStorage.setItem('user_id', user_id); // Save to sessionStorage
    } else {
      sessionStorage.removeItem('user_id'); // Remove from sessionStorage if logging out
    }
  },

  // Set username and persist it to sessionStorage
  set_username(username) {
    this.username = username;
    if (username) {
      sessionStorage.setItem('username', username); // Save to sessionStorage
    } else {
      sessionStorage.removeItem('username'); // Remove from sessionStorage if logging out
    }
  },

  // Reset state on logout and clear sessionStorage
  reset() {
    this.username = "";
    this.user_id = 0;
    this.mealCount = 0;
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_id');
  },

  // Set the meal count to a specific value
  setMealCount(count) {
    this.mealCount = count;
  },

  // Reset the meal count to zero
  resetMealCount() {
    this.mealCount = 0;
  },

  // Fetch meal count from the server
  async fetchMealCount() {
    try {
      const count = await meal_plan_count(); // Assuming this is an API call to get meal count
      this.mealCount = count;
    } catch (error) {
      console.error('Error fetching meal count:', error);
      this.mealCount = 0; // Set to 0 if there's an error or user is not logged in
    }
  }
});
