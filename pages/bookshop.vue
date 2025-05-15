<script setup>
import { useBookstore } from "~/stores/bookshop";
import "../assets/css/app.css";

const bookStore = useBookstore();
const checkbox_id = 1;
const page = ref(bookStore.list.length / 2);
const countProduct = ref(0);
const isOpen = ref(false);
const selectedBook = ref([]);
const selectedCategory = ref({})
console.log('selectedCategory ==', selectedCategory.value);

console.log("page ===", page.value);
console.log("selectedBook.cart ===", selectedBook.value);

const filterCategoryList = computed(() => {
  return bookStore.list.filter((list) => list.category === selectedCategory.value);
});
console.log('filterCategoryList ===', filterCategoryList.value);


// {
//     "id": 1,
//     "photolink": "https://picsum.photos/id/101/200/300",
//     "bookname": "The Art of Coding",
//     "detail": "A comprehensive guide to mastering programming languages.",
//     "category": "Programming",
//     "price": 150,
//     "quality": 0
// },
// {
//     "id": 2,
//     "photolink": "https://picsum.photos/id/102/200/300",
//     "bookname": "Mastering Python",
//     "detail": "Learn Python from basics to advanced concepts.",
//     "category": "Programming",
//     "price": 200,
//     "quality": 0
// }

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
  selectedBook.value = bookStore.cart;
  console.log('selectedBook.value ==', selectedBook.value);
  
  await bookStore.loadData();
};

const shoppingCart = async () => {
  isOpen.value = true;
};

const closeCart = async () => {
  isOpen.value = false;
};

const payCart = async () => {
  isOpen.value = false;
  bookStore.cart = []
}

const removeProduct = async (id) => {
  await bookStore.removeProduct(id)
  await bookStore.loadData();
}

const onChangeCategory = async (newCategory) => {
  if (newCategory === 'All') {
    selectedCategory.value = {}
  }else {
    selectedCategory.value = (newCategory)

  }

  
  console.log('selectedCategory.value ===', selectedCategory.value);
  
}
</script>

<template>
  <nav
    class="flex justify-between w-full bg-gray-800 h-15 items-center z-40"
  >
    <div class="w-full text-2xl ml-4 text-white">
      <h2>Books Shop</h2>
    </div>
    <div class="flex justify-center items-center text-white">
      <button
        data-modal-target="cart-modal"
        data-modal-toggle="cart-modal"
        type="button"
        class="mr-5 text-4xl cursor-pointer"
        @click="shoppingCart()"
      >
        <Icon name="uil:cart"></Icon>
      </button>
      <div>
        <div v-if="isOpen">
          <div
            aria-hidden="true"
            class="fixed left-0 top-0 bg-black/75 w-screen h-screen flex justify-center items-center z-50"
          >
            <div
              class="relative p-4 w-full max-w-200 max-h-screen h-screen"
            >
              <div
                class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 h-full max-h-400"
              >
                <div class="flex items-center justify-between p-4">
                  <h3
                    class="text-xl font-semibold text-gray-900 dark:text-white"
                  >
                    Shoping Cart
                  </h3>
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    @click="closeCart()"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div class="p-4 h-full max-h-200 overflow-y-auto">
                  <div>
                    <div class="flow-root">
                      <ul role="list" class="-my-6 divide-y divide-gray-200">
                        <li
                          v-for="product in selectedBook"
                          :key="product.id"
                          class="flex py-6"
                        >
                          <div
                            class="size-36 shrink-0 overflow-hidden rounded-md border border-gray-200"
                          >
                            <NuxtImg
                              :src="product.photolink"
                              class="size-full object-cover"
                            />
                          </div>

                          <div class="ml-4 flex flex-1 flex-col">
                            <div>
                              <div
                                class="flex justify-between text-base font-medium text-white text-xl"
                              >
                                <h3>
                                  {{ product.bookname }}
                                </h3>
                                <div
                                  class="flex text-center items-center border border-red-700 w-20 h-10 rounded-full bg-green-500"
                                >
                                  <p class="ml-4">฿{{ product.price }}</p>
                                </div>
                              </div>
                            </div>
                            <div
                              class="flex flex-1 items-end justify-between text-sm"
                            >
                              <p class="text-white text-xl">
                                Qty x {{ product.quality }}
                              </p>

                              <div class="flex">
                                <button
                                  @click="removeProduct(product.id)"
                                  type="button"
                                  class="font-medium text-3xl text-red-500 cursor-pointer"
                                >
                                  <Icon name="icomoon-free:bin"></Icon>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between p-4 mt-10">
                  <h1 class="text-2xl font-extrabold">
                    Subtotal
                  </h1>
                  <h1 class="text-2xl font-extrabold">
                    ฿{{ bookStore.summaryPriceCart }}
                  </h1>
                </div>
                <!-- Modal footer -->
                <div
                  class="flex flex-col items-center overflow-hidden p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
                >
                  <button
                    @click="payCart()"
                    type="button"
                    class="text-white mt-5 text-xl bg-blue-700 w-full max-h-max hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Check out
                  </button>
                  <button
                    @click="closeCart()"
                    type="button"
                    class="text-white mt-5 text-xl bg-blue-700 w-full max-h-max hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Continue shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedBook.length > 0">
        <div class="relative z-0">
          <span
            class="absolute text-gray-700 after:text-red-500 right-4 rounded-full bg-white w-6 h-6"
          >
            <p class="flex items-center justify-center font-semibold">
              {{ bookStore.selectedAmout }}
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
  <main>
    <div class="flex z-30">
      <div class="flex flex-col w-80 pt-10 h-screen  lg:flex flex-col">
        <div v-for="category in bookStore.category">
          <div class="flex mt-2 mb-5 mx-3">
            <label class="flex items-center cursor-pointer relative">
              <input
                type="checkbox"
                :checked="category === 'All'"
                @change="onChangeCategory(category)"
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
      <div class="flex flex-wrap p-10 mx-2 justify-center items-center ">
        <div v-for="data in filterCategoryList" v-if="selectedCategory.length > 0">
          <div
            class="flex flex-col w-100 mb-5 mx-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
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
                  ฿{{ data.price }}
                </div>
                <button
                  @click="addToCart(data)"
                  :click="(data.quality += 1)"
                  class="flex justify-center rounded-full bg-yellow-500 min-w-25 text-center text-white h-10 items-center cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else v-for="data in bookStore.list">
          <div
            class="flex flex-col w-100 mb-5 mx-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
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
                  ฿{{ data.price }}
                </div>
                <button
                  @click="addToCart(data)"
                  :click="(data.quality += 1)"
                  class="flex justify-center rounded-full bg-yellow-500 min-w-25 text-center text-white h-10 items-center cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
