const state = {
  server_domain: "http://localhost:3000",
  // server_domain: "http://132.72.65.211/",
};

import { reactive } from 'vue';

export const store = reactive({
  mealCount: 0, // Initial meal count
  username:"",
  user_id: 0,

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

  set_user_id(user_id){
    this.user_id = user_id
  },

  set_username(user_name){
    this.username = user_name
  },
  reset(){
    this.username = ""
    this.user_id = 0
    this.mealCount = 0
  },

  // Set the meal count to a specific value
  setMealCount(count) {
    this.mealCount = count;
  },

  // Reset the meal count to zero
  resetMealCount() {
    this.mealCount = 0;
  },
  async fetchMealCount() {
    try {
      const count = await meal_plan_count(); // Fetch the meal plan count from the server
      this.mealCount = count;
    } catch (error) {
      console.error('Error fetching meal count:', error);
      this.mealCount = 0; // Set to 0 if there's an error or user is not logged in
    }
  }
});
