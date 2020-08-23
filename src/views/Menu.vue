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

    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.state.classToActiveMenu = "text-white";
  },
};
</script>

<style scoped>
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

