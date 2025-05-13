import { useNuxtApp } from "nuxt/app";
import { defineStore } from "pinia";

const baseURL = 'https://api.gameliveball.com/items'


export const useBookstore = defineStore('bookshop', {
    state: () => ({
        list: [],
        category: ['All','Programming','Cooking','Art','Finance'],
        cart: []
    }),
    actions: {
        async loadData(){
            try {
                const {$axios} = useNuxtApp()
                const response = await $axios.get(`${baseURL}`)
                this.list = response.data.data
                console.log('load todo completed');

                // console.log('response.data.data ===', response.data.data)
            }catch (error) {
                console.log('error', error);
            }
            
        },
        async addtoCart(bodyData) {

            const Data = {
                id: bodyData.id,
                photolink: bodyData.photolink,
                bookname: bodyData.bookname,
                detail: bodyData.detail,
                category: bodyData.category
            }
            this.cart.push(Data)
        }
    }
})