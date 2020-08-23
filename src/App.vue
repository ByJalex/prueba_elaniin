<template>
  <div id="app">
    <NavBar>
      <template #left>Foodies</template>
      <template #center>
        <router-link to="/acerca">Acerca de</router-link>
        <router-link to="/restaurantes">Restaurantes</router-link>
        <router-link to="/menu">Menú</router-link>
        <router-link to="/contactanos">Contáctanos</router-link>
      </template>
    </NavBar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
export default {
  components: {
    NavBar,
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
