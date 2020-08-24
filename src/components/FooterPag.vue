<template>
  <div class="footer">
    <div class="header-footer">
      <div class="logo-footer">Foodies</div>
      <div class="img-footer">
        <img class="object-contain" src="@/assets/img/google_Play.png" alt />
        <img class="object-contain" src="@/assets/img/app_store.png" alt />
      </div>
    </div>
    <div class="separator"></div>
    <div class="uris">
      <p class="uri-item">Conoce nuestras sucursales</p>
      <p class="uri-item">Acerca de</p>
      <p class="uri-item">Conoce nuestras sucursales</p>
      <p class="uri-item">¿Qué hablan de nosotros?</p>
      <p class="uri-item">Contáctanos</p>
      <p class="uri-item"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterPag",
};
</script>

<style scoped>
.separator {
  margin-top: 27px;
  border: 1px solid #ffc700;
}
.footer {
  margin-top: 69px;
  margin-bottom: 48px;
  margin-left: 148px;
  margin-right: 116px;
}
.uris {
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.uris p {
  margin-right: 40px;
  color: rgba(0, 0, 0, 0.4);
}
.img-footer {
  display: flex;
  justify-content: space-between;
}
.img-footer img {
}
.logo-footer {
  font-family: Druk Text Wide;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 27px;
  color: #7b7b7b;
}
.header-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (min-width: 640px) and (max-width: 768px) {
  .uris > .uri-item {
    flex: 23%;
    margin-top: 15px;
  }
  .footer {
    margin-left: 37px;
    margin-right: 37px;
  }
  .uris {
    margin-top: 27px;
  }
  .separator {
    margin-top: 18px;
  }
}

@media screen and (max-width: 640px) {
  .header-footer {
    flex-direction: column;
  }
  .uris {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-left: 50px;
  }
  .uris p {
    margin-top: 18px;
  }
  .footer {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .separator {
    width: 343px;
    margin-left: auto;
    margin-right: auto;
  }
  .img-footer img {
    width: 116px;
  }
}
</style>