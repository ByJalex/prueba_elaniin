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
          <div
            :key="item.id"
            v-for="item in menu"
            class="max-w-sm rounded overflow-hidden mr-2 mb-5"
          >
            <img class="img-card" :src="item.image" alt="Sunset in the mountains" />
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
      </div>
      <div class="pagination">
        <button
          @click="pageDefault <= 1 ? '' : getPagination(pageDefault-1)"
          class="control-pagination"
        >Anterior</button>
        <button
          :class="['btn-pagination', index+1 == pageDefault ? 'active-btn-pag' : '']"
          @click="getPagination(index+1)"
          :key="index"
          v-for="(item, index) in numbersPagination"
        >{{index+1}}</button>
        <button
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
  data() {
    return {
      categories: [],
      selectFilters: false,
      menu: [],
      pagination: [],
      pageDefault: 1,
      numbersPagination: 0,
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
    },
    getPagination: function (goToPage) {
      console.log(goToPage);
      this.getMenu(goToPage);
      this.pageDefault = goToPage;
    },
    getMenu: function (pagination = 1) {
      axios
        .get("https://api.elaniin.dev/api/menu?page=" + pagination)
        .then((response) => {
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
.active-btn-pag {
  background: #000000;
  color: #ffd600;
  font-weight: bold;
}
.btn-pagination {
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
}
</style>

