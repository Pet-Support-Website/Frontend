<template>
  <div>
    <h1>Create an article</h1>
    <form @submit.prevent="saveArticle">
      <BaseInput
        v-model="article.title"
        type="text"
        label="Title"
        class="field"
      />
      <BaseInput v-model="article.source" type="text" label="Source" />

      <BaseInput v-model="article.content" type="text" label="Content" />

      <BaseSelect
        :options="tagsOption1"
        v-model="article.tags[0]"
        label="Select a pet type tag"
      />
      <BaseSelect
        :options="tagsOption2"
        v-model="article.tags[1]"
        label="Select a main catagory tag"
      />
      <BaseSelect
        :options="tagsOption3"
        v-model="article.tags[2]"
        label="Select a other tag"
      />
      <h3>The image of the Article</h3>
      <UploadImages @changed="handleImages" />

      <button type="submit">Submit</button>
    </form>

    <pre>{{ article }}</pre>
  </div>
</template>

<script>
import ArticleService from '@/services/ArticleService.js'
import UploadImages from 'vue-upload-drop-images'
import GStore from '@/store'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
export default {
  inject: ['GStore'],
  components: {
    UploadImages,
    BaseInput,
    BaseSelect
  },
  data() {
    return {
      article: {
        title: '',
        source: '',
        content: '',
        tags: [],
        imgUrl: []
      },
      files: [],
      tagsOption1: [
        'dog',
        'cat',
        'fish',
        'bird',
        'rabbit',
        'rodents',
        'reptile'
      ],
      tagsOption2: [
        'general',
        'health',
        'behavior issues',
        'diseases',
        'headline'
      ]
    }
  },
  methods: {
    saveArticle() {
      Promise.all(
        this.files.map((file) => {
          return ArticleService.uploadFile(file)
        })
      ).then((response) => {
        this.article.imageUrls = response.map((r) => r.data)
        ArticleService.saveArticle(this.article)
          .then((response) => {
            console.log(response)
            this.$router.push({
              name: 'ArticleDetails',
              params: { id: response.data.id }
            })
            this.GStore.flashMessage =
              'You are successfully add a new article for ' +
              response.data.title
            setTimeout(() => {
              this.GStore.flashMessage = ''
            }, 3000)
          })
          .catch(() => {
            this.$router.push('NetworkError')
          })
      })
    },
    handleImages(files) {
      this.files = files
    }
  },
  computed: {
    tagsOption3() {
      let tag = []
      GStore.tags.forEach((t) => {
        if (
          !this.tagsOption1.includes(t.tagname) &&
          !this.tagsOption2.includes(t.tagname)
        ) {
          tag.push(t.tagname)
        }
      })
      return tag
    }
  }
}
</script>
<style scoped></style>
