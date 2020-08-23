<template>
  <div class="home container-app">
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
      <div class="text-about-foodie" id="section-2">
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
          <i class="search-icon bx bx-search bx-sm"></i>
          <input
            v-model="place"
            @input="debounceSearch"
            placeholder="Buscar nombre o dirección"
            class="i-search"
            type="text"
          />
          <i v-if="load" class="load-icon bx bx-loader-alt bx-sm bx-spin"></i>
        </div>
        <div class="show-places-content">
          <div
            @click="loadInformation(places.id, places.latitude, places.longitude)"
            v-for="places in placesD"
            :key="places.id"
            :class="['place-item' , places.id == idReceive ? 'selected-component-place' : '']"
          >
            <p class="title-place-item">{{places.name}}</p>
            <p
              class="desc-place-item"
            >Abierto de {{places.opening_time}} m.d. - {{places.closing_time}} p.m.</p>
            <p class="desc-place-item">{{places.address}}</p>
          </div>
        </div>
      </div>
      <div id="map"></div>
    </div>
    <div class="testimonials">
      <img
        class="object-contain img-testimonials"
        src="@/assets/img/testimonials_bg_ketchup.png"
        alt
      />
      <div class="testimonials-containter">
        <ul class="list-group">
          <li
            :key="user.id"
            class="list-group-item text-center"
            v-for="(user, index) in users"
            v-show="(pag - 1) * num_results <= index  && pag * num_results > index"
          >{{ user.name }} - {{ user.email }}</li>
        </ul>
        <!-- Controles -->
        <p><b>Current: {{pag}}</b></p>
        <nav aria-label="Page navigation" class="text-center">
          <ul class="pagination text-center">
            <li>
              <a href="#" aria-label="Previous" v-show="pag != 1" @click.prevent="pag -= 1">
                <span aria-hidden="true">Anterior</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Next"
                v-show="pag * num_results / users.length < 1"
                @click.prevent="pag += 1"
              >
                <span aria-hidden="true">Siguiente</span>
              </a>
            </li>
          </ul>
        </nav>
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
      idReceive: 0,
      load: false,
      place: "",
      activeTypeDelivery: "delivery",
      placesD: [],
      deliveryType: [
        { id: 1, type: "Para llevar", enc: "delivery" },
        { id: 2, type: "Domicilio", enc: "takeaway" },
      ],
      num_results: 3,
      pag: 1,
      users: [
        {
          id: 1,
          name: "Leanne Graham",
          email: "Sincere@april.biz",
        },
        {
          id: 2,
          name: "Ervin Howell",
          email: "Shanna@melissa.tv",
        },
        {
          id: 2,
          name: "Ervin Howell",
          email: "Shanna@melissa.tv",
        },
        {
          id: 2,
          name: "Ervin Howell",
          email: "Shanna@melissa.tv",
        },
        {
          id: 2,
          name: "Ervin Howell",
          email: "Shanna@melissa.tv",
        },
      ],
    };
  },
  mounted() {
    this.getPlaces();
    this.getScroll();
  },
  methods: {
    getScroll: function () {
      window.document.body.onscroll = () => {
        let animation = document.getElementById("section-2");
        let positionObj = animation.getBoundingClientRect().top;
        let heightScreen = window.innerHeight / 2;
        positionObj < heightScreen ? animation.classList.add("transition") : "";
      };
    },
    getMap: function (getLat, getLng) {
      var coord = { lat: parseFloat(getLat), lng: parseFloat(getLng) };
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: coord,
      });
      var marker = new google.maps.Marker({
        position: coord,
        map: map,
      });
    },
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
    methodChange: function (deliveryType) {
      this.activeTypeDelivery = deliveryType;
      this.place = "";
      this.placesD = [];
    },
    loadInformation: function (idReceive, latitude, longitude) {
      this.idReceive = idReceive;
      this.getMap(latitude, longitude);
    },
  },
};
</script>

<style>
.testimonials {
  height: 100vh;
  background-size: cover;
  background-position: 0 70%;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/josueayala27-49da6.appspot.com/o/testimonials.png?alt=media&token=e73639bd-06fc-445d-ad34-a7c7314f6677");
}

.testimonials-containter {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.img-testimonials {
  max-width: 90rem;
  right: 0;
  position: absolute;
}
</style>
