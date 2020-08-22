<template>
  <div class="home">
    <div class="container-landing">
      <div class="content-header">
        <div class="text-header">
          <p class="bolder-text">
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
          <p class="text-white">LA COMIDA <span></span> ES</p>
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
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>

<style>
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
  height: 100vh;
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
}
</style>
