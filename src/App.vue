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
* {
  margin: 0;
  padding: 0;
  color: #2c3e50;
 
}

.secondary-color{
  color: rgba(0, 0, 0, 0.4);
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #C6C6C6;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #AAAAAA;
}
</style>
