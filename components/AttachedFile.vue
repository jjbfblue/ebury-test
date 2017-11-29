<template>
  <div class="attached-file">
    <img
      class="attached-file__img"
      :src="src"
      :alt="name"
      @click="removeFile(index)"
      v-if="isImage"
    />

    <div class="attached-file__no-img" v-else>
      <span>No Image</span>
    </div>

    <div class="attached-file__remove">
      <div @click="clickRemove()">
        <icon name="trash" />
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from '~/components/Icon.vue'

  export default {
    components: {
      Icon
    },

    props: {
      name: { type: String, required: true },
      src: { type: String, required: true }
    },

    computed: {
      isImage () {
        const extension = this.name.substr(this.name.lastIndexOf('.') + 1)
        return ['jpg', 'png', 'gif'].indexOf(extension) !== -1
      }
    },

    methods: {
      clickRemove () {
        this.$emit('click-remove')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .attached-file {
    overflow: hidden;
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0.5rem;
    border-radius: 5px;
    background-color: #EEEEEE;

    &:hover {
      cursor: pointer;

      .attached-file__remove {
        display: flex;
        color: #FFFFFF;
      }
    }
  }

  .attached-file__img {
    width: 100%;
    height: 100%;
  }

  .attached-file__no-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 0.8rem;
  }

  .attached-file__remove {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: #AAAAAA;
    }
  }
</style>
