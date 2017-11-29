<template>
  <i :class="'icon-' + name"></i>
</template>

<script>
  export default {
    props: {
      name: { type: String, required: true }
    }
  }
</script>

<style scoped>
  i {
    font-size: 1rem;
  }
</style>
