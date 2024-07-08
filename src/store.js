const state = {

    // server_domain: "http://localhost:3000",

    server_domain: "http://daniftgalkitchen.cs.bgu.ac.il/",
    
    
};
import { reactive } from 'vue';

export const store = reactive({
  mealCount: 0,
  incrementMealCount() {
    this.mealCount++;
  }
});
