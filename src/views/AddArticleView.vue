<template>
  <div class="container">
    <div class="header">
      <h1 style="color: darkslategray">
        ADD
        <a style="color: #1fdda4">ARTICLE</a>
      </h1>
      <p style="margin-top: 15px">
        Fill in all the necessary contents to add article.
      </p>
    </div>
    <form
      @submit.prevent="saveArticle"
      style="padding-left: 10px; padding-right: 10px"
    >
      <div class="row">
        <div
          class="col in-container"
          style="
            margin-right: 10px;
            background-color: rgba(255, 246, 246, 0.945);
          "
        >
          <BaseInput
            v-model="article.title"
            type="text"
            label="Title"
            class="field"
          />
          <br />
          <BaseInput v-model="article.source" type="text" label="Source" />
          <br />
          <BaseTextArea
            v-model="article.content"
            type="text"
            label="Content"
            style="height: 200px"
          />
          <br />
          <BaseSelectID
            :options="tagsOption1"
            v-model="article.tags[0].id"
            label="Select a pet type tag"
          />
          <br />
          <BaseSelectID
            :options="tagsOption2"
            v-model="article.tags[1].id"
            label="Select a main catagory tag"
          />
          <br />
          <BaseSelectID
            :options="tagsOption3"
            v-model="article.tags[2].id"
            label="Select a other tag"
          />
          <br />
          <div class="row" style="margin-top: 10px">
            <button class="about-btn" type="submit">Submit</button>
          </div>
        </div>
        <div class="col in-container" style="margin-left: 10px">
          <label>THE IMAGE OF ARTICLE</label>
          <UploadImages class="UploadImages" @changed="handleImages" />
        </div>
      </div>
    </form>
    <div class="row" style="height: 25px"></div>
    <!-- <pre>{{ article }}</pre> -->
  </div>
</template>

<script>
import ArticleService from '@/services/ArticleService.js'
import UploadImages from 'vue-upload-drop-images'
import GStore from '@/store'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelectID from '@/components/BaseSelectID.vue'
import BaseTextArea from '@/components/BaseTextArea.vue'
export default {
  inject: ['GStore'],
  components: {
    UploadImages,
    BaseInput,
    BaseSelectID,
    BaseTextArea
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
      )
        .then((response) => {
          let imgUrls = response.map((r) => r.data)
          this.article.imgUrl = imgUrls[0]
          ArticleService.saveArticle(this.article).then((response) => {
            console.log(response)
            this.$router.push({
              name: 'ArticleDetailsView',
              params: { id: response.data.id }
            })
            this.GStore.flashMessage =
              'You are successfully add a new event for ' + response.data.title
            setTimeout(() => {
              this.GStore.flashMessage = ''
            }, 3000)
          })
        })
        .catch(() => {
          this.$router.push('NetworkError')
        })
    }
  },
  handleImages(files) {
    this.files = files
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
<style scoped>
.header {
  margin-top: 50px;
}
.in-container {
  border-radius: 5px;
  border: 1px lightgray solid;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px 40px 35px;
}
.UploadImages {
  max-height: 100px;
}
.about-btn {
  margin-top: 10px;
  color: white;
  background-color: #1fdda4;
  padding: 10px 50px;
  width: 100%;
  font-size: 18px;
  border: none;
  border-radius: 5px;
}
</style>
