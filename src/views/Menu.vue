<template>
  <div class="bg">
    <figure class="container_svg media_img">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#FFD600"
          fill-opacity="1"
          d="M0,128L48,112C96,96,192,64,288,42.7C384,21,480,11,576,10.7C672,11,768,21,864,64C960,107,1056,181,1152,213.3C1248,245,1344,235,1392,229.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>
    </figure>
    <div class="flex flex-wrap">
      <div class="w-full sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/2">
        <div class="text-menu-landing flex flex-wrap mt-20">
          Cada sabor
          <span></span> es una nueva
          <span></span> experiencia
        </div>
      </div>
      <div class="w-full sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/2 img-landing">
        <img src="@/assets/img/hero_hamburger.png" alt />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  height: 100vh;
  background-color: white;
}
.container_svg {
  position: relative;
}
.img-landing {
  position: relative;
}
.text-menu-landing {
  font-family: "Druk Text Wide";
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  line-height: 60px;
  color: #000000;
}

@media screen and (min-width: 800px) {
}
/*Dispositivo mediano*/
@media screen and (min-width: 640px) and (max-width: 800px) {
  .text-menu-landing {
    font-size: 40px;
    line-height: 40px;
  }
}
/*Dispositivo de telefono*/
@media screen and (max-width: 640px) {
  .text-menu-landing {
    font-size: 35px;
    line-height: 35px;
  }
}
</style>

