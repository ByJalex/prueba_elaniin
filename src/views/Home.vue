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
            <button class="btn">Enviar comentarios</button>
          </div>
        </div>
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
    this.getScroll();
    //Default coords
    this.getMap(0, 13.7427126, -89.210404);
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
      this.idReceive = "";
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
.form-text textarea {
  height: 142px;
}
.form-text {
  margin-left: 25px;
  margin-right: 25px;
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 10px;
}
.form-text input,
textarea {
  outline: none;
  color: #595959;
  padding-top: 14px;
  padding-left: 20px;
  padding-bottom: 14px;
  padding-right: 20px;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #000000;
  transition: all 0.25s ease;
}
.form-text input:focus + label {
  transition: all 0.25s ease;
  color: #ffc700;
}

.form-text textarea:focus + label {
  transition: all 0.25s ease;
  color: #ffc700;
}
.form-text textarea:focus {
  color: #ffc700;
  border: 1px solid #ffc700;
}
.form-text input:focus {
  color: #ffc700;
  border: 1px solid #ffc700;
}
.contact-form .left-form {
  width: 40%;
  display: flex;
  flex-direction: column;
}
.contact-form .right-form {
  width: 60%;
  display: flex;
  flex-direction: column;
}
.contact {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
}

.title-contact {
  font-family: Druk Text Wide;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 36px;
  text-align: center;
  color: #ffffff;
}
.desc-contact {
  margin-left: auto;
  margin-right: auto;
  margin-top: 17px;
  width: 698px;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 33px;
  text-align: center;
  color: #ffffff;
}
.contact-form {
  margin-top: 40px;
  display: flex;
  width: 922px;
}
.btn {
  margin-top: 17px;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 20px;
  padding-right: 20px;
  background: #ffd600;
  border-radius: 4px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-right: 0px;
  line-height: 22px;
  margin-right: 25px;
}
.buttons {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 932px) {
  .contact-form {
    width: auto;
  }
}

@media screen and (min-width: 640px) and (max-width: 768px) {
  .contact-form {
    flex-direction: column;
    margin-right: 67px;
    margin-left: 27px;
  }
  .form-text {
    width: 100%;
    margin-right: 80px;
  }
  .contact-form .left-form {
    width: 100%;
  }

  .contact-form .right-form {
    width: 100%;
  }
  .title-contact {
    font-size: 36px;
    line-height: 36px;
  }
  .desc-contact {
    font-size: 24px;
    width: 554px;
  }

  .btn {
    margin-right: auto;
    margin-left: auto;
  }
  .buttons {
    align-items: center;
    justify-content: center;
    margin-top: 21px;
  }
  .contact-form {
    margin-top: 42px;
  }
  .title-contact {
    width: auto;
  }
}

@media screen and (max-width: 640px) {
  .title-contact {
    margin-top: 73px;
  }
  .desc-contact {
    font-size: 18px;
    line-height: 25px;
    width: 343px;
  }
  .contact-form {
    flex-direction: column;
    margin-right: 36px;
  }
  .contact-form .left-form {
    padding-left: 0px;
  }
  .form-text {
    width: 100%;
    margin-right: 10px;
  }
  .contact-form .left-form {
    width: 100%;
  }

  .contact-form .right-form {
    width: 100%;
  }
  .btn {
    margin-right: auto;
    margin-left: auto;
  }
  .buttons {
    align-items: center;
    justify-content: center;
    margin-top: 11px;
  }
  .contact-form {
    margin-top: 42px;
  }
  .title-contact {
    width: auto;
    font-size: 35px;
    line-height: 35px;
  }
}
</style>
