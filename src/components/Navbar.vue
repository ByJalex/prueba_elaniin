<template>
  <div class="nav">
    <transition name="slide-fade">
      <div class="menu-drawer" v-if="showDrawerMenu">
        <div class="title">
          <div @click="showDrawerMenu = !showDrawerMenu">
            <router-link to="/">
              <slot name="left"></slot>
            </router-link>
          </div>

          <i @click="showDrawerMenu = !showDrawerMenu" class="bx bx-x bx-sm"></i>
        </div>
        <div @click="showDrawerMenu = !showDrawerMenu" class="items-drawer">
          <slot name="center"></slot>
        </div>
      </div>
    </transition>
    <div class="left-content-nav">
      <router-link :class="this.$store.state.classToActiveMenu" to="/">
        <slot name="left"></slot>
      </router-link>
    </div>
    <div :class="'center-content-nav ' + this.$store.state.classToActiveMenu ">
      <slot name="center"></slot>
    </div>
    <div class="menu">
      <i
        @click="showDrawerMenu = !showDrawerMenu"
        :class="'bx bx-menu bx-sm ' + this.$store.state.classToActiveMenu"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      showDrawerMenu: false,
    };
  },
};
</script>

<style scoped>
.items-drawer {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 30px;
  color: #000000;
  margin-bottom: 121px;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-500px);
  /*opacity: 0;*/
}
.menu-drawer .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Druk Text Wide;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  line-height: 27px;
  color: #000000;
  margin-top: 47px;
}
.menu-drawer {
  z-index: 100;
  position: absolute;
  background-color: white;
  width: 100%;
  border-radius: 0px 0px 30px 30px;
  padding-left: 16px;
  padding-right: 21px;
}
a {
  text-decoration: none;
}

.menu {
  position: absolute;
  right: 0;
  cursor: pointer;
}

.nav {
  position: absolute;
  width: 100%;
  z-index: 100;
  display: flex;
}

.left-content-nav {
  margin-left: 101px;
  margin-top: 57px;
  font-family: "Druk Text Wide";
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  line-height: 27px;
  color: #000000;
}
.center-content-nav {
  margin-top: 60px;
  margin-left: 86px;
  top: 3px;
}

.center-content-nav a {
  margin-right: 39px;
  /*Estilos hover*/
  background: linear-gradient(to bottom, #ffd600 0%, #ffd600 100%);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 4px 0px;
  transition: background-size 0.4s;
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
}
.center-content-nav a:hover {
  background-size: 4px 50px;
}

.center-content-nav .router-link-active {
  background-size: 4px 6px;
}
/*Dispositivo de escritorio*/
@media screen and (min-width: 768px) {
  .menu {
    display: none;
  }
}
/*Dispositivo mediano*/
@media screen and (min-width: 640px) and (max-width: 768px) {
  .center-content-nav {
    display: none;
  }
  .left-content-nav {
    margin-left: 40px;
    margin-top: 30px;
  }
  .menu {
    margin-top: 30px;
    margin-right: 40px;
  }
}
/*Dispositivo de telefono*/
@media screen and (max-width: 640px) {
  .center-content-nav {
    display: none;
  }
  .left-content-nav {
    margin-left: 16px;
    margin-top: 47px;
  }
  .menu {
    margin-top: 47px;
    margin-right: 16px;
  }
}
</style>