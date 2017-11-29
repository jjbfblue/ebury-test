<template>
  <div class="form-field">
    <input
      v-if="lines === 1"
      :class="{ 'form-field__invalid': error }"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :value="value"
      @input="updateValue($event.target.value)"
    />

    <textarea
      v-if="lines > 1"
      :class="{ 'form-field__invalid': error }"
      :name="name"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :rows="lines"
      :value="value"
      @input="updateValue($event.target.value)"
    ></textarea>

    <div class="form-field__error" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      type: { type: String, default: 'text' },
      name: { type: String, required: true },
      placeholder: { type: String, required: true },
      maxlength: { type: Number },
      value: { type: String, default: '' },
      error: { type: String, default: null },
      lines: { type: Number, default: 1 }
    },

    methods: {
      updateValue (value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-field {
    width: 100%;
    margin-bottom: 1rem;

    input,
    textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #DDDDDD;
      border-radius: 5px;
      outline: 0;
      line-height: 1.5rem;
      font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 1rem;

      &:focus {
        border-color: #139FCA;
      }

      &::placeholder {
        color: #CCCCCC;
      }

      &.form-field__invalid {
        border-color: #D32C2C;
      }
    }

    textarea {
      resize: none;
    }
  }

  .form-field__error {
    color: #999999;
    font-size: 0.9rem;
  }
</style>
