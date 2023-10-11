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

      <BaseSelectID
        :options="tagsOption1"
        v-model="article.tags[0].id"
        label="Select a pet type tag"
      />
      <BaseSelectID
        :options="tagsOption2"
        v-model="article.tags[1].id"
        label="Select a main catagory tag"
      />
      <BaseSelectID
        :options="tagsOption3"
        v-model="article.tags[2].id"
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
import BaseSelectID from '@/components/BaseSelectID.vue'
export default {
  inject: ['GStore'],
  components: {
    UploadImages,
    BaseInput,
    BaseSelectID
  },
  data() {
    return {
      article: {
        title: '',
        source: '',
        content: '',
        tags: [{ id: '' }, { id: '' }, { id: '' }],
        imgUrl: ''
      },
      files: [],
      tagsOption1: [
        { id: 1, tagname: 'dog' },
        { id: 24, tagname: 'cat' },
        { id: 33, tagname: 'fish' },
        { id: 28, tagname: 'bird' },
        { id: 37, tagname: 'rabbit' },
        { id: 38, tagname: 'rodents' },
        { id: 29, tagname: 'reptile' }
      ],
      tagsOption2: [
        { id: 4, tagname: 'general' },
        { id: 5, tagname: 'health' },
        { id: 15, tagname: 'behavior issues' },
        { id: 23, tagname: 'diseases' },
        { id: 2, tagname: 'headline' }
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
        let imgUrls = response.map((r) => r.data)
        this.article.imgUrl = imgUrls[0]
        ArticleService.saveArticle(this.article).then((response) => {
          console.log(response)
          this.$router
            .push({
              name: 'ArticleDetailsView',
              params: { id: response.data.id }
            })
            .catch(() => {
              this.$router.push('NetworkError')
            })
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
      let tagname = []
      this.tagsOption1.forEach((t) => {
        tagname.push(t.tagname)
      })
      this.tagsOption2.forEach((t) => {
        tagname.push(t.tagname)
      })
      GStore.tags.forEach((t) => {
        if (!tagname.includes(t.tagname)) {
          tag.push(t)
        }
      })
      return tag
    }
  }
}
</script>
<style scoped></style>
