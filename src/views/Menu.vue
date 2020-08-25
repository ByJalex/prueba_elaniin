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
      <transition name="slide-fade">
        <div v-if="showFilterMenu" class="phone-menu">
          <div class="header-menu-filter">
            <p class="title-filter">Filtros</p>
            <i @click="showFilterMenu =! showFilterMenu" class="bx bx-x"></i>
          </div>
          <div class="categories-phone">
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
      </transition>
      <div class="menu-items-filters">
        <div class="input-search-menu">
          <i
            :class="[loadMenu ? 'search-icon bx bx-loader-alt bx-sm bx-spin' : 'search-icon bx bx-search bx-sm', ]"
          ></i>
          <input
            @input="debounceSearch"
            v-model="searchMenu"
            class="search-food"
            type="text"
            placeholder="Busca tu platillo favorito..."
          />
        </div>
        <i @click="showFilterMenu =! showFilterMenu" class="bx bx-slider bx-sm bx-rotate-90"></i>
        <!--<i class="load-icon bx bx-loader-alt bx-sm bx-spin"></i>-->
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
          <div
            :key="item.id"
            v-for="item in menu"
            class="max-w-sm rounded overflow-hidden mr-2 mb-5"
          >
            <img class="img-card object-cover" :src="item.image" alt="Sunset in the mountains" />
            <div class="px-6 py-4 hover:shadow-xl">
              <div class="font-bold mb-2">{{item.name}}</div>
              <p class="text-black">{{item.description}}</p>
              <div class="footer-card">
                <div class>
                  <span class="text-category">{{item.category}}</span>
                </div>
                <div>
                  <span class="text-price">${{item.price}}</span>
                </div>
              </div>
            </div>
          </div>
          <!--End card items--->
        </div>
        <div v-if="notFound" class="menu-not-found">
          <img class="object-contain" src="@/assets/img/menunotfound.png" alt />
          <p class="not-fonud-title">¡Platillo no encontrado!</p>
          <p
            class="desc-not-found"
          >Te invitamos a que verifiques si el nombre esta bien escrito o prueba buscando un nuevo platillo.</p>
        </div>
      </div>
      <div v-show="!notFound" class="pagination">
        <button
          v-show="pageDefault != 1"
          @click="pageDefault <= 1 ? '' : getPagination(pageDefault-1)"
          class="control-pagination"
        >Anterior</button>
        <div>
          <button
            :class="['btn-pagination', index+1 == pageDefault ? 'active-btn-pag' : '']"
            @click="getPagination(index+1)"
            :key="index"
            v-for="(item, index) in numbersPagination"
          >{{index+1}}</button>
        </div>
        <button
          v-show="pageDefault != numbersPagination"
          @click="pageDefault >= numbersPagination ? '' : getPagination(pageDefault+1)"
          class="control-pagination"
        >Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Menu",
  data() {
    return {
      loadMenu: false,
      categories: [],
      selectFilters: false,
      menu: [],
      pagination: [],
      pageDefault: 1,
      numbersPagination: 0,
      searchMenu: "",
      notFound: false,
      showFilterMenu: false,
    };
  },
  mounted() {
    this.$store.state.classToActiveMenu = "text-white";
    this.getCategories();
    this.getMenu();
  },
  methods: {
    debounceSearch(event) {
      this.loadMenu = true;
      this.pageDefault = 1;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.loadMenu = false;
        this.getMenu();
      }, 1500);
    },
    getCategories: function () {
      axios.get("https://api.elaniin.dev/api/categories").then((response) => {
        this.categories = response.data.data;
      });
    },
    selectFilter: function (receiveParam) {
      this.searchMenu = "";
      this.selectFilters = receiveParam;
      this.getMenu();
    },
    getPagination: function (goToPage) {
      this.getMenu(goToPage);
      this.pageDefault = goToPage;
    },
    getMenu: function (pagination = 1) {
      let filter = "";
      this.selectFilters
        ? ((filter = "&category=" + this.selectFilters), (this.pageDefault = 1))
        : (filter = "");
      let completQuery = "";
      this.searchMenu == ""
        ? (completQuery =
            "https://api.elaniin.dev/api/menu?page=" + pagination + filter)
        : ((completQuery =
            "https://api.elaniin.dev/api/menu?query=" +
            this.searchMenu +
            "&page=" +
            pagination),
          (this.selectFilters = false));
      axios.get(completQuery).then((response) => {
        response.data.meta.to == null
          ? (this.notFound = true)
          : (this.notFound = false);
        console.log(response.data.meta.to);
        this.menu = response.data.data;
        this.pagination = response.data;
        this.numbersPagination = Math.ceil(
          this.pagination.meta.total / this.pagination.meta.per_page
        );
      });
    },
  },
};
</script>

<style>

</style>

