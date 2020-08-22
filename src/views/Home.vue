<template>
  <div class="home">
    <div class="container-landing">
      <div class="content-header">
        <div class="text-header">
          <p class="bolder-text text text--folding" data-scroll="out">
            Un nuevo
            <span></span> sabor esta en
            <span class="text-market">la ciudad</span>
          </p>
          <p
            class="secondary-color txt-desc"
          >Estamos a punto de descubrir un mundo lleno de sabores y de emociones inigualables.</p>
          <p class="text-arrow txt-arrow-header">
            Encuentranos
            <i class="bx bx-right-arrow-alt"></i>
          </p>
        </div>
        <div class="img-container">
          <img class="object-scale-down" src="@/assets/img/hero_hamburger2.png" alt />
        </div>
      </div>
    </div>
    <div class="about-foodie">
      <div class="img-text-container">
        <img class="object-none img-about" src="@/assets/img/aGZeHyx-jfo.png" alt />
        <div class="up-text">
          <p class="text-white">
            LA COMIDA
            <span></span> ES
          </p>
          <p class="color-primary">NUESTRO ARTE</p>
          <div class="degradado"></div>
        </div>
      </div>
      <div class="text-about-foodie">
        <p class="title-foodie">¿Quién es Foodies?</p>
        <p
          class="secondary-color txt-desc-foo"
        >Elit irure ad nulla id elit laborum nostrud mollit irure. Velit reprehenderit sunt nulla enim aliquip duis tempor est culpa fugiat consequat culpa consectetur Lorem. Reprehenderit dolore culpa irure eiusmod minim occaecat et id minim ullamco.</p>
        <p class="text-arrow txt-desc-arrow">
          Contáctanos
          <i class="bx bx-right-arrow-alt"></i>
        </p>
      </div>
    </div>
    <div class="maps-foodie">
      <div class="search-locations">
        <p class="maps-title">Estamos para ti</p>
        <div class="choose-type">
          <div
            @click="methodChange('delivery')"
            :class="['delivery-type' , activeTypeDelivery == 'delivery' ? 'active' : '']"
          >Para llevar</div>
          <div
            @click="methodChange('takeaway')"
            :class="['delivery-type' , activeTypeDelivery == 'takeaway' ? 'active' : '']"
          >Domicilio</div>
        </div>
        <div class="input-search">
          <i class="bx bx-search bx-sm"></i>
          <input
            v-model="place"
            @input="debounceSearch"
            placeholder="Buscar nombre o dirección"
            class="i-search"
            type="text"
          />
        </div>
        <div class="show-places-content">
          <div class="loader" v-if="load">
            <i class="bx bx-loader-alt bx-md bx-spin"></i>
          </div>
          <div v-for="places in placesD" :key="places.id" class="place-item">
            <p class="title-place-item">{{places.name}}</p>
            <p
              class="desc-place-item"
            >Abierto de {{places.opening_time}} m.d. - {{places.closing_time}} p.m.</p>
            <p class="desc-place-item">{{places.address}}</p>
          </div>
          <div class="not-found" v-if="placesD == ''">
            <img class="object-contain" src="@/assets/img/VXpIXK2.png" alt />
            <div class="container-text-not-found">
              <p class="text-notfound">¡No hemos encontrado</p>
              <p class="text-notfound">lo que buscas!</p>
            </div>
          </div>
        </div>
      </div>
      <div class="show-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1938.2003222667895!2d-89.1705833920489!3d13.694167803560502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f633732c00f521d%3A0xd09faf9d97263c19!2sColonia%20Amatepec%2C%20San%20Salvador!5e0!3m2!1ses-419!2ssv!4v1598130791555!5m2!1ses-419!2ssv"
          width="800"
          height="600"
          frameborder="0"
          style="border:0;"
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      load: false,
      place: "",
      activeTypeDelivery: "delivery",
      placesD: [],
      deliveryType: [
        { id: 1, type: "Para llevar", enc: "delivery" },
        { id: 2, type: "Domicilio", enc: "takeaway" },
      ],
    };
  },
  mounted() {
    this.getPlaces();
  },
  methods: {
    debounceSearch(event) {
      this.load = true;
      this.placesD = [];
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.load = false;
        this.getPlaces();
      }, 1500);
    },
    getPlaces: function () {
      axios
        .get(
          "https://api.elaniin.dev/api/locations?type=" +
            this.activeTypeDelivery +
            "&query=" +
            this.place
        )
        .then((response) => {
          this.placesD = response.data.data;
        });
    },
    methodChange: function (param) {
      this.activeTypeDelivery = param;
      console.log(param);
      this.place = "";
      this.placesD = [];
    },
  },
};
</script>

<style>

.container-text-not-found {
  margin-top: 23px;
  text-align: center;
}
.text-notfound {
  color: #000000;
}
.not-found {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  font-family: Syne;
  align-items: center;
  flex-direction: column;
}
.loader {
  text-align: center;
  margin-top: 40px;
}
.show-map {
  display: flex;
  align-items: center;
  width: 50%;
}
.search-locations {
  width: 50%;
}
.title-place-item {
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
}
.place-item {
  border: 1px solid #000000;
  border-radius: 4px;
  margin-right: 22px;
  margin-bottom: 10px;
  padding-top: 15px;
  padding-left: 22px;
  padding-bottom: 14px;
  cursor: pointer;
}
.show-places-content {
  padding-left: 102px;
  width: 100%;
  margin-top: 15px;
}
.active {
  background-color: #000000;
  color: white !important;
}

.input-search {
  padding-top: 12px;
  position: relative;
  border: 1px solid #c4c4c4;
  padding-bottom: 13px;
}
.input-search i {
  position: absolute;
  left: 105px;
}
.i-search {
  outline: none;
  width: 100%;
  padding-left: 150px;
}
.delivery-type {
  width: 50%;
  text-align: center;
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 30px;
  padding-top: 17px;
  padding-bottom: 17px;
  cursor: pointer;
  color: #000000;
}

.choose-type {
  border: 1px solid #c4c4c4;
  margin-top: 32px;
  width: 100%;
  display: flex;
}
.maps-foodie {
  margin-top: 80px;
  height: 100vh;
  display: flex;
}
.maps-title {
  text-align: center;
  font-family: Druk Text Wide;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 40px;
  color: #000000;
}
.degradado {
  position: absolute;
  background-color: red;
}
.text--folding [data-scroll="out"] .char {
  -webkit-transform: rotateX(90deg);
  transform: rotateX(90deg);
  -webkit-transform-origin: bottom;
  transform-origin: bottom;
}
.color-primary {
  color: #ffd600;
}
.img-text-container {
  position: relative;
  display: flex;
  align-items: center;
}
.up-text {
  position: absolute;
  font-weight: bold;
  right: 40px;
  bottom: 61px;
  margin-bottom: 61px;
  font-family: Druk Text Wide;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 50px;
  text-align: right;
}
.txt-desc-arrow {
  margin-top: 54px;
}
.txt-arrow-header {
  margin-top: 46px;
}
.txt-desc-foo {
  margin-top: 27px;
}
.text-about-foodie {
  margin: 56px;
}
.title-foodie {
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  /* identical to box height */
  color: #000000;
}
.img-about {
  height: 100vh;
}

.about-foodie {
  display: flex;
  align-items: center;
  background-size: cover;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/josueayala27-49da6.appspot.com/o/line-about.png?alt=media&token=8aedfe3d-5946-4d0e-bb93-e5dd350cd3dd");
}
.about-foodie div {
  width: 100%;
}
.text-arrow {
  display: flex;
  align-items: center;
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;

  color: #000000;
}
.text-arrow i {
  color: #000000;
}
.txt-desc {
  margin-top: 21px;
  font-size: 18px;
  line-height: 25px;
}
.secondary-color {
  color: rgba(0, 0, 0, 0.4);
}
.text-header {
  display: flex;
  flex-direction: column;
}
.bolder-text {
  color: #000;
  font-family: Druk Text Wide;
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  line-height: 60px;
}
.text-market {
  color: #000000;
  margin-right: 39px;
  /*Estilos hover*/
  background: linear-gradient(to bottom, #ffd600 0%, #ffd600 100%);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 4px 57px;
}
.img-container {
  width: 367px;
  height: 346.26px;
}

.container-landing {
  height: 100vh;
  display: flex;
  align-items: center;
  background-size: cover;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/josueayala27-49da6.appspot.com/o/bg-home-landing.png?alt=media&token=3c89b20f-4940-44d4-82d5-cea42803be78");
}
.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 102px;
  margin-right: 102px;
}

.content-header div {
  width: 100%;
  display: flex;
  justify-content: center;
}

@media screen and (min-width: 768px) {
  .img-media {
  }
}
/*Dispositivo mediano*/
@media screen and (min-width: 640px) and (max-width: 768px) {
  .bolder-text {
    font-size: 40px;
    line-height: 40px;
  }
  .img-media {
    width: 312.93px;
    height: 246px;
  }
  .about-foodie {
    display: flex;
    flex-direction: column;
  }
  .img-about {
    height: auto;
  }
  .text-about-foodie {
    padding-left: 53px;
    padding-right: 53px;
  }
  .up-text {
    right: 53px;
    bottom: 30px;
    margin-bottom: 30px;
  }
  .text-about-foodie {
    margin-top: 60px;
  }
  .about-foodie {
    background-position: 1px 1000px;
    background-size: cover;
  }
  .maps-foodie {
    display: flex;
    flex-direction: column;
  }
  .search-locations {
    width: 100%;
  }
  .show-places-content {
    padding-left: 53px;
    padding-right: 63px;
  }
  .show-map {
    width: 100%;
  }
  .maps-title {
    font-size: 35px;
    line-height: 35px;
    text-align: left;
    margin-left: 53px;
    margin-right: 274px;
  }
  .maps-foodie {
    margin-top: 220px;
  }
}
/*Dispositivo de telefono*/
@media screen and (max-width: 640px) {
  .bolder-text {
    font-size: 35px;
    line-height: 35px;
  }
  .content-header {
    display: flex;
    flex-direction: column-reverse;
    margin-left: 20px;
    margin-right: 20px;
  }
  .img-media {
    width: 312.93px;
    height: 246px;
  }
  .about-foodie {
    display: flex;
    flex-direction: column;
  }
  .img-about {
    height: auto;
  }
  .text-about-foodie {
    padding-left: 16px;
    padding-right: 16px;
  }
  .up-text {
    font-size: 25px;
    line-height: 25px;
    right: 53px;
    bottom: 30px;
    margin-bottom: 30px;
  }
  .txt-desc-arrow {
    margin-top: 27px;
  }
  .maps-foodie {
    display: flex;
    flex-direction: column;
  }
  .search-locations {
    width: 100%;
  }
  .show-places-content {
    padding-left: 53px;
    padding-right: 63px;
  }
  .show-map {
    width: 100%;
  }
  .input-search i {
    position: absolute;
    left: 19px;
  }
  .i-search {
    outline: none;
    width: 100%;
    padding-left: 50px;
  }
  .show-places-content {
    padding-left: 16px;
    padding-right: 16px;
    margin-right: 32px;
  }
  .title-place-item {
    font-size: 18px;
    line-height: 22px;
  }
  .place-item {
    margin-right: 2px;
  }
  .desc-place-item {
    font-size: 14px;
    line-height: 19px;
    color: #000000;
  }
  .maps-title {
    font-size: 35px;
    line-height: 35px;
    text-align: left;
    margin-left: 16px;
    margin-right: 64px;
  }
  .about-foodie {
    margin-top: 52px;
  }
  .content-header {
    margin-top: 111px;
  }
}
</style>
