import { useNuxtApp } from "nuxt/app";
import { defineStore } from "pinia";

const baseURL = "https://api.gameliveball.com/items";

export const useBookstore = defineStore("bookshop", {
  state: () => ({
    list: [],
    category: ["All", "Programming", "Cooking", "Art", "Finance"],
    cart: [],
    selectedAmout: 0
  }),
  actions: {
    async loadData() {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.get(`${baseURL}`);
        this.list = response.data.data;
        console.log("load todo completed");

        // console.log('response.data.data ===', response.data.data)
      } catch (error) {
        console.log("error", error);
      }
    },
    async addtoCart(bodyData) {
      const data = {
        id: bodyData.id,
        photolink: bodyData.photolink,
        bookname: bodyData.bookname,
        detail: bodyData.detail,
        category: bodyData.category,
        price: bodyData.price,
        quality: 1,
      };

      const existingItem = this.cart.findIndex((item) => item.id === data.id)

      if (existingItem > -1){
        this.cart[existingItem].quality++
        this.selectedAmout++
      }else {
        this.cart.push(data);
        this.selectedAmout++
      }

      
    },
  },
});
