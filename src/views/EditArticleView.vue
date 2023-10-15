<template>
  <div class="container">
    <div class="header">
      <h1 style="color: darkslategray">
        EDIT {{}}
        <a style="color: #1fdda4">ARTICLE</a>
      </h1>
      <p style="margin-top: 15px">
        <!-- Fill in all the necessary contents to add article. -->
      </p>
    </div>
    <form
      @submit.prevent="updateArticle"
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
          <div style="margin-top: 10px">
            <button class="about-btn" type="submit" @click="scrollToTop">
              Submit
            </button>
          </div>
          <div>
            <p style="font-weight: bold">
              <a v-for="tag in article.tags" :key="tag.id">
                #{{ tag.tagname }}
              </a>
            </p>
          </div>
        </div>
        <div class="col in-container" style="margin-left: 10px">
          <label>THE IMAGE OF ARTICLE</label>
          <div>
            <img class="article-img" :src="article.imgUrl" />
          </div>
        </div>
      </div>
    </form>
    <div class="row" style="height: 25px"></div>
    <pre>{{ article }}</pre>
  </div>
</template>

<script>
import ArticleService from '@/services/ArticleService.js'
import GStore from '@/store'
import BaseInput from '@/components/BaseInput.vue'
import BaseTextArea from '@/components/BaseTextArea.vue'
export default {
  inject: ['GStore'],
  props: ['id'],
  components: {
    BaseInput,
    BaseTextArea
  },
  data() {
    return {
      article: GStore.article
    }
  },
  methods: {
    updateArticle() {
      ArticleService.updateArticle(this.article)
        .then((response) => {
          console.log(response)
          this.$router.push({
            name: 'ArticleDetailsView',
            params: { id: response.data.id }
          })
          this.GStore.flashMessage =
            'You are successfully edit the article for ' + response.data.title
          setTimeout(() => {
            this.GStore.flashMessage = ''
          }, 3000)
        })
        .catch(() => {
          this.$router.push('NetworkError')
        })
    },
    scrollToTop() {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
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
