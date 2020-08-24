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
    <div class="footer">
      <FooterPag></FooterPag>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FooterPag from "@/components/FooterPag.vue";
export default {
  name: "Menu",
  components: {
    FooterPag,
  },
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
.desc-not-found {
  margin-top: 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #000000;
}
.not-fonud-title {
  margin-top: 22px;
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #121212;
}
.menu-not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.pagination {
  margin-top: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination div {
  display: flex;
}
.active-btn-pag {
  background: #000000;
  color: #ffd600;
  font-weight: bold;
}
.btn-pagination {
  outline: none !important;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 18px;
  padding-right: 18px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 8px;
  margin-right: 5px;
  margin-left: 5px;
}
.control-pagination {
  outline: none !important;
  background: #fff1bf;
  border-radius: 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-right: 30px;
}
.text-price {
  font-family: Druk Text Wide;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  color: #000000;
  background: #ffd600;
  border-radius: 8px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 10px;
  padding-left: 10px;
}
.text-category {
  color: #78909c;
}
.footer-card {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}
.img-card {
  width: 330px;
  height: 287px;
}
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
  outline: none !important;
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
.input-search-menu {
  position: relative;
}
.input-search-menu i {
  position: absolute;
  left: 18px;
  top: 15px;
  color: #000000;
}
.menu-items-filters {
  position: relative;
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

@media screen and (min-width: 640px) and (max-width: 768px) {
  .menu-items-filters {
    flex-direction: column;
  }
  .show-categories-button {
    font-size: 17.5px;
    line-height: 22px;
  }
  .show-categories {
    margin-top: 44px;
    margin-left: 43px;
  }
  .menu-items-filters {
    margin-top: 30px;
    width: 100%;
    margin-left: 0px;
  }
  .pagination {
    margin-top: 64px;
  }
  .menu-items-filters .search-icon {
  }
}

@media screen and (max-width: 640px) {
  .menu-items-filters {
    flex-direction: column;
  }
  .show-categories-button {
    font-size: 17.5px;
    line-height: 22px;
  }
  .show-categories {
    margin-top: 44px;
    margin-left: 43px;
  }
  .menu-items-filters {
    margin-top: 30px;
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
  .search-food {
    width: 295px;
    margin-right: 0px;
  }
  .show-categories {
    display: none;
  }
  .show-categories-button {
    background-size: auto 8px !important;
  }
  .pagination {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .control-pagination {
    margin-top: 15px;
    margin-bottom: 15px;
    width: 132px;
  }
  .show-menu-card {
    margin-left: 22px;
    margin-right: 11px;
  }
}
</style>

