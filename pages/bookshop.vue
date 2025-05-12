<script setup>
import Navbar from "~/components/Navbar.vue";
import { useBookstore } from "~/stores/bookshop";

const bookStore = useBookstore();
const categoryList = ref([]);
onMounted(async () => {
  await bookStore.loadData();
  console.log("bookStore ==", bookStore.list);
});

const resetFilter = () => {
  categoryList.value = [];
};
</script>

<template>
  <Navbar />
  <div className="container flex justify-center w-full px-2 py-3 mt-10">
    <div className="flex-col w-80">
      <div v-for="data in bookStore.category" className="form-control mt-5">
        <input
          type="checkbox"
          className="checkbox checkbox-primary checked:border-white"
          :value="data"
          v-model="categoryList"
        />
        <span classNameNae="ml-5 text-white label-text ">{{ data }}</span>
      </div>
      <button
        @click="resetFilter()"
        className="my-6 px-4 w-fit btn bg-transparent border-white border-2 text-white hover:bg-primary hover:border-white rounded-full"
      >
        Reset Filter
      </button>
    </div>
    <div className="grid grid-cols-4 gap-5 w-full">
      <div v-for="data in bookStore.list">
        <div className="card bg-base-80 w-80 shadow-sm">
          <figure>
            <NuxtImg :src="data.photolink"></NuxtImg>
          </figure>
          <div className="card-body">
            <h2 className="card-title flex-col">
              {{ data.bookname }}
              <div className="badge badge-secondary">{{ data.category }}</div>
            </h2>
            <p className="mt-3 px-2 py-2 w-full h-20">
              {{ data.detail }}
            </p>
            <div className="card-actions justify-between text-center mr-2">
              <div className="badge badge-primary cursor-pointer text-m">
                {{data.price}}
              </div>
              <div className="badge badge-accent cursor-pointer text-m">
                Add to cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
