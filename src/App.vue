<template>
  <div id="app">
    <NavBar>
      <template #left>Foodies</template>
      <template #center>
        <router-link class="menu-d" to="/about">Acerca de</router-link>
        <router-link class="menu-d" to="/restaurants">Restaurantes</router-link>
        <router-link class="menu-d" to="/menu">Menú</router-link>
        <router-link class="menu-d" to="/contact">Contáctanos</router-link>
      </template>
    </NavBar>
    <router-view />
    <div>
      <FooterPag/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
import FooterPag from "@/components/FooterPag.vue";
export default {
  components: {
    NavBar,
    FooterPag,
  },
  methods: {
    changeColorMenu: function () {
      console.log(this.$store.state.classToActiveMenu);
      this.$store.state.classToActiveMenu = "text-white";
    },
  },
};
</script>
<style>
@font-face {
  font-family: "Druk Text Wide";
  src: url("./assets/Webfonts/DrukTextWide-Bold.ttf");
}

@font-face {
  font-family: "Syne";
  src: url("./assets/Webfonts/Syne-Bold.woff");
}
</style>
