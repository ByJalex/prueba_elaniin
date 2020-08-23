<template>
  <div class="menu container-app">
    <div class="container-landing-menu">
      <div class="content-header">
        <div class="text-header">
          <p :class="'bolder-text text text--folding ' + this.$store.state.classToActiveMenu">
            Cada sabor
            <span></span> es una nueva
            <span class="text-market">experiencia</span>
          </p>
        </div>
        <div class="img-container">
          <img class="object-scale-down" src="@/assets/img/hero_hamburger2.png" alt />
        </div>
      </div>
    </div>
    <div class="content-foodies">
      <div class="menu-items-filters">
        <input class="search-food" type="text" placeholder="Busca tu platillo favorito..." />
        <div class="show-categories">
          <button
            :class="['show-categories-button', selectFilters == false ? 'active-filter' : '']"
            @click="selectFilter(false)"
          >Todas</button>
          <button
            :class="['show-categories-button' , categorie.id == selectFilters ? 'active-filter' : '']"
            @click="selectFilter(categorie.id)"
            :key="categorie.id"
            v-for="categorie in categories"
          >{{categorie.name}}</button>
        </div>
      </div>
      <div class="show-menu-card">
        <div class="grid lg:grid-cols-4 sm:grid-cols-2 gap">
          <!--start card items--->
          <div :key="item.id" v-for="item in menu" class="max-w-sm rounded overflow-hidden shadow-lg mr-2 mb-5">
            <img
              class="w-full"
              :src="item.image"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold mb-2">{{item.name}}</div>
              <p
                class="text-gray-700 text-base"
              >{{item.description}}</p>
              <div>
              Price: {{item.price}}
              Categoria: {{item.category}}
            </div>
            </div>
            
          </div>
          <!--End card items--->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categories: [],
      selectFilters: false,
      menu: [],
    };
  },
  mounted() {
    this.$store.state.classToActiveMenu = "text-white";
    this.getCategories();
    this.getMenu();
  },
  methods: {
    getCategories: function () {
      axios.get("https://api.elaniin.dev/api/categories").then((response) => {
        this.categories = response.data.data;
      });
    },
    selectFilter: function (receiveParam) {
      this.selectFilters = receiveParam;
      console.log(receiveParam);
    },
    getMenu: function () {
      axios.get("https://api.elaniin.dev/api/menu?page=1").then((response) => {
        this.menu = response.data.data;
      });
    },
  },
};
</script>

<style scoped>
.show-menu-card {
  margin-left: 59px;
  margin-right: 59px;
}
.active-filter {
  background-size: 20px 8px !important;
}
.show-categories {
  margin-left: 43px;
}
.show-categories-button {
  margin-right: 40px;
  outline: none;
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 22px;
  /*Effects*/
  background: linear-gradient(to bottom, #ffd600 0%, #ffd600 100%);
  background-position: 0 50%;
  background-repeat: repeat-x;
  background-size: 4px 0px;
  transition: background-size 0.4s;
}

.show-categories-button:hover {
  background-size: 20px 8px;
}
.search-food {
  outline: none;
  background: #f8f8f8;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 63px;
  width: 467px;
}
.menu-items-filters {
  margin-left: 60px;
  margin-right: 60px;
  margin-top: 80px;
  margin-bottom: 96px;
  display: flex;
  align-items: center;
}
.container-landing-menu {
  height: 100vh;
  display: flex;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: local;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/josueayala27-49da6.appspot.com/o/bg-home-landing-menu.png?alt=media&token=41034ef1-4c7a-4bc1-b1c0-14a56ca93442");
}
</style>

