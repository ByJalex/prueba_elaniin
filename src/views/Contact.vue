<template>
  <div class="contacts"></div>
</template>

<script>
export default {
  mounted() {
    this.$store.state.classToActiveMenu = "text-black";
  },
};
</script>

<style>
.contacts {
  height: 60vh;
}
</style>