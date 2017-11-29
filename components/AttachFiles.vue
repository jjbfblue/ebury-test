<template>
  <div class="attach-files">
    <input
      class="attach-files__files"
      type="file"
      id="files"
      name="files[]"
      multiple
      ref="explorer"
      @change="addFile($event.target.files)"
    />

    <div class="attach-files__list" v-if="files.length > 0">
      <h2 class="attach-files__list__title">
        Attached Files
      </h2>

      <div class="attach-files__list__content">
        <attached-file
          v-for="(file, index) in files"
          :key="index"
          :name="file.name"
          :src="file.data"
          @click-remove="removeFile(index)"
        />
      </div>
    </div>

    <button type="button" class="attach-files__btn" @click="openExplorer()">
      <icon name="paperclip" />
    </button>
  </div>
</template>

<script>
  import Icon from '~/components/Icon.vue'
  import AttachedFile from '~/components/AttachedFile.vue'

  export default {
    components: {
      Icon,
      AttachedFile
    },

    props: {
      files: { type: Array, default: [] }
    },

    methods: {
      openExplorer () {
        const explorer = this.$refs.explorer
        explorer.value = ''
        explorer.click()
      },

      addFile (files) {
        if (files.length > 0) {
          Array.from(files).forEach((file, index) => {
            let reader = new FileReader()

            reader.onload = (e) => {
              this.$emit('change', [ ...this.files, {
                name: files[index].name,
                data: e.target.result
              }])
            }

            reader.readAsDataURL(file)
          })
        }
      },

      removeFile (index) {
        const files = [...this.files]
        files.splice(index, 1)
        this.$emit('change', files)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .attach-files__files {
    visibility: hidden;
  }

  .attach-files__list {
    .attach-files__list__title {
      color: #333333;
      font-size: 1rem;
    }

    .attach-files__list__content {
      display: flex;
      flex-wrap: wrap;
      margin: -0.5rem;
      padding: 1rem 0;
    }
  }

  .attach-files__btn {
    display: block;
    width: 40px;
    height: 40px;
    outline: 0;
    background-color: #F8F8F8;
    border-radius: 20px;
    border: 1px solid #CCCCCC;
    color: #AAAAAA;
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 1rem;
    cursor: pointer;

    > i {
      font-size: 1.3rem;
    }
  }
</style>
