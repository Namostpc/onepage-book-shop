<script setup>
const {$axios} = useNuxtApp()
const baseURL = 'https://api.gameliveball.com/items'

const getList = ref([])



onMounted(async () =>{
    const response = await $axios.get(`${baseURL}`)
    getList.value = response.data.data
    console.log(getList.value);
    
})

</script>


<template>
    {{ getList }}
</template>