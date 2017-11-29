<template>
  <div class="form-btn" :class="{ 'form-btn--block': block }">
    <button :disabled="disabled" :class="{ disabled: disabled }">
      <slot></slot>
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      disabled: { type: Boolean, default: false },
      block: { type: Boolean, default: false }
    }
  }
</script>

<style lang="scss" scoped>
  .form-btn {
    display: inline-block;

    > button {
      display: inline-flex;
      align-items: center;
      width: 100%;
      padding: 0.5rem 1rem;
      outline: 0;
      background-color: #139FCA;
      border-radius: 20px;
      border: 0;
      color: #FFFFFF;
      font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        background-color: #0C8FB7;
      }

      &.disabled {
        background-color: #DDDDDD;
        color: #AAAAAA;
      }

      > i {
        margin-right: 0.4rem;
      }
    }
  }

  .form-btn--block {
    width: 100%;
  }
</style>
