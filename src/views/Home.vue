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
        <div class="content-carrousel">
          <div
            :key="testimonial.id"
            class="content-comments"
            v-for="(testimonial, index) in testimonials"
            v-show="(pag - 1) * num_results <= index  && pag * num_results > index"
          >
            <p class="title-testimonial">{{ testimonial.title }}</p>
            <div class="content-test-description">
              <p class="testimonial-description">{{testimonial.desc}}</p>
            </div>
          </div>
          <!-- Controles -->
          <p class="controls-carrousel">
            <span>
              <i
                :class="[pag != 1 ? 'color-active' : 'color-inactive']"
                @click.prevent="pag == 1 ? '' : pag -= 1"
                class="bx bxs-chevron-left bx-sm"
              ></i>
            </span>
            <span class="numbers-item-carrousel">{{pag}}/{{testimonials.length}}</span>
            <span>
              <i
                :class="[pag * num_results / testimonials.length < 1 ? 'color-active' : 'color-inactive']"
                @click.prevent="pag == testimonials.length ? '' : pag += 1"
                class="bx bxs-chevron-right bx-sm"
              ></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="contact">
      <div>
        <p class="title-contact">Cuentanos tu experiencia</p>
        <p
          class="desc-contact"
        >Don't miss out on our great offers & Receive deals from all our top restaurants via e-mail.</p>
        <div class="contact-form">
          <div class="left-form">
            <div class="form-text">
              <input v-model="sendExperience.name" placeholder="John Doe" id="name" type="text" />
              <label class="text-white" for="name">Nombre y Apellido</label>
            </div>
            <div class="form-text">
              <input
                v-model="sendExperience.email"
                placeholder="j.doe@correo.com"
                id="email"
                type="email"
              />
              <label class="text-white" for="email">Correo electrónico</label>
            </div>
          </div>
          <div class="right-form">
            <div class="form-text">
              <textarea v-model="sendExperience.message" name id="message" cols="30" rows="3"></textarea>
              <label for="massage" class="text-white">Mensaje</label>
            </div>
          </div>
        </div>
        <div class="buttons">
          <div>
            <button @click="sendContact" class="btn">Enviar comentarios</button>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <FooterPag></FooterPag>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
import FooterPag from "@/components/FooterPag.vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
    FooterPag
  },
  data() {
    return {
      sendExperience: {
        name: "",
        email: "",
        message: "",
      },
      idReceive: 0,
      load: false,
      place: "",
      activeTypeDelivery: "delivery",
      placesD: [],
      deliveryType: [
        { id: 1, type: "Para llevar", enc: "delivery" },
        { id: 2, type: "Domicilio", enc: "takeaway" },
      ],
      num_results: 1,
      pag: 1,
      testimonials: [
        {
          id: 1,
          title: "El mejor lugar para degustar en familia y amigos!",
          desc:
            "Es el mejor lugar al que he venido con mi familia, la comida es rica, sirven rápido y te atienden de la mejor manera.",
        },
        {
          id: 2,
          title: "El mejor lugar para degustar en familia y amigos! 2",
          desc:
            "Es el mejor lugar al que he venido con mi familia, la comida es rica, sirven rápido y te atienden de la mejor manera. 2",
        },
      ],
    };
  },
  mounted() {
    this.$store.state.classToActiveMenu = "text-black";
    this.getPlaces();
    //Default coords
    this.getMap(0, 13.7427126, -89.210404);
  },
  methods: {
    //Form data
    toFormData: function (obj) {
      var form_data = new FormData();
      for (var key in obj) {
        form_data.append(key, obj[key]);
      }
      return form_data;
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
      this.idReceive = "";
      this.load = true;
      this.placesD = [];
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.load = false;
        this.getPlaces();
      }, 1500);
    },
    sendContact: function () {
      var formData = this.toFormData(this.sendExperience);
      this.sendExperience.name == "" ||
      this.sendExperience.email == "" ||
      this.sendExperience.message == ""
        ? alert("Campos vacios")
        : axios
            .post("https://api.elaniin.dev/api/contact", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              console.log("Se enviaron los datos");
            });
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
      this.getPlaces();
    },
    loadInformation: function (idReceive, latitude, longitude) {
      this.idReceive = idReceive;
      this.getMap(latitude, longitude);
    },
  },
};
</script>

<style>
</style>
