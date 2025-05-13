<script setup>
import { useBookstore } from "~/stores/bookshop";
import "../assets/css/app.css";

const bookStore = useBookstore();
const checkbox_id = 1;
const body = ref({});
const page = ref(bookStore.list.length / 2);
console.log("page ===", page.value);
console.log("bookStore.cart ===", bookStore.cart);

onMounted(async () => {
  try {
    await bookStore.loadData();
  } catch (error) {
    console.log("error", error);
  }
  console.log(bookStore.list);
});

const addToCart = async (body) => {
  await bookStore.addtoCart(body);
  console.log("bodyData ==", body);
  await bookStore.loadData();
};
</script>

<template>
  <nav class="flex justify-between bg-gray-800 h-15 items-center">
    <div class="w-full text-2xl ml-4 text-white">
      <h2>Books Shop</h2>
    </div>
    <div class="flex justify-center items-center text-white">
      <div class="mr-5 text-4xl">
        <Icon name="uil:cart"></Icon>
      </div>
      <div v-if="bookStore.cart.length > 0">
        <div class="relative">
          <span
            class="absolute text-gray-700 after:text-red-500 boder boder-white right-4 rounded-full bg-white w-6 h-6"
          >
          <p class="flex items-center justify-center font-semibold">
            {{ bookStore.cart.length}}
          </p>
          </span>
        </div>
      </div>
      <div class="mr-5">
        <NuxtImg
          class="h-12 w-15 rounded-full"
          src="https://scontent.fbkk28-1.fna.fbcdn.net/v/t39.30808-6/494911327_29326176227029600_7388823940851883379_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=krjegUzKxPYQ7kNvwHxE9kg&_nc_oc=AdnrtWUvSPgClCwLIitzT0uQkBqdGf7CGcU9ykDv6CHttmAvsV_81PuACPl2TWpAF4lMfDRbCL23wcHfBqttXHAM&_nc_zt=23&_nc_ht=scontent.fbkk28-1.fna&_nc_gid=M2XocJsbn9iVSuGFjXJYbw&oh=00_AfKuyUnmGoHLAlZUcrd0iBl9N7DNkHFUr6QqlzAnkbmAbg&oe=6827BA59"
        ></NuxtImg>
      </div>
    </div>
  </nav>
  <main class="flex">
    <div class="flex flex-col border w-80 pt-10 h-screen">
      <div v-for="category in bookStore.category">
        <div class="flex mt-2 mb-5 mx-3">
          <label class="flex items-center cursor-pointer relative">
            <input
              type="checkbox"
              class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
              id="check1"
            />

            <span
              class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
          <div class="text-white ml-5">
            {{ category }}
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4 pt-10 mx-2">
      <div v-for="data in bookStore.list">
        <div
          class="flex flex-col w-100 max-h-max ml-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="py-5 flex justify-center items-center">
            <NuxtImg
              :src="data.photolink"
              class="h-50 w-48 object-fill"
            ></NuxtImg>
          </div>
          <div class="p-5 flex flex-col items-center justify-center h-full">
            <h5
              class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ data.bookname }}
            </h5>
            <div
              class="flex justify-center items-center w-35 text-white my-2 text-m min-h-8 text-center rounded-full bg-pink-500"
            >
              {{ data.category }}
            </div>
            <p
              class="flex px-2 py-2 mb-3 font-normal text-center items-center text-white h-25"
            >
              {{ data.detail }}
            </p>
            <div
              class="flex justify-between w-full flex py-2 px-3 items-center"
            >
              <div
                class="flex justify-center rounded-full bg-blue-500 min-w-25 text-center text-white h-10 items-center cursor-pointer"
              >
                ${{ data.price }}
              </div>
              <button
                @click="addToCart(data)"
                class="flex justify-center rounded-full bg-yellow-500 min-w-25 text-center text-white h-10 items-center cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- <div className="navbar bg-base-100 shadow-sm">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl ">Book Shop</a>
    </div>
    <div className="flex gap-2">
      <div class="w-10 mr-2 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 4 0v1h-4Zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2Z"></path></svg>
      </div>
      <div className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <NuxtImg src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"></NuxtImg>
        </div>
      </div>
    </div>
  </div>
  <div className="container flex w-full px-2 py-3 mt-10 border">
    <div className="flex-col w-80 ">
      <div v-for="data in bookStore.category" className="form-control mb-5 ">
        <input
          type="checkbox"
          className="checkbox checkbox-primary checked:border-white ml-2"
          :value="data"
          name="checkbox"
          v-model="categoryList"
        />
        <span className="ml-5 text-white label-text">{{ data }}</span>
      </div>
      <button
        @click="resetFilter()"
        className="my-6 px-4 w-fit btn bg-transparent border-white border-2 text-white hover:bg-primary hover:border-white rounded-full"
      >
        Reset Filter
      </button>
    </div> -->
  <!-- <div className="grid grid-cols-4 gap-5 w-full">
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
                ฿{{data.price}}
              </div>
              <div className="badge badge-accent cursor-pointer text-m">
                Add to cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  <!-- </div>  -->
</template>
