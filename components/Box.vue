<template>
  <div class="box">
    <div class="box__title">
      <h2>{{ title }}</h2>
    </div>

    <div class="box__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: { type: String, required: true }
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 800px;
    border-radius: 5px;
    overflow: hidden;
  }

  .box__title {
    padding: 1.5rem 0 1.5rem 2.5rem;
    background-color: #00435E;

    > h2 {
      color: #FFFFFF;
      text-align: left;
      font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-weight: 300;
      font-size: 1.4rem;
    }
  }

  .box__content {
    padding: 1.5rem 2.5rem;
    background-color: #FFFFFF;
  }

  @media (max-width: 480px) {
    .box__title {
      padding: 1.5rem 0 1.5rem 1.5rem;
    }

    .box__content {
      padding: 1.5rem 1.5rem;
    }
  }
</style>
