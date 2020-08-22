<template>
  <div>
    <button class="btn">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "BtnFoodies",
  props: {
    msg: String,
    to: {
      type: String,
      default: null,
      required: false,
    },
  },
  methods: {
    validateRedirection: function () {
      this.to = "test" ? "" : this.$router.push(this.to);
    },
  },
};
</script>

<style scoped>
.btn {
  border-radius: 5px;
  padding: 15px;
  color: black;
  border: 0;
  outline: none;
  background-color: #ffd600;
}
</style>