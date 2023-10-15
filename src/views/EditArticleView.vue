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
      @submit.prevent="TogglePopup('buttonTrigger')"
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
          <label>THE IMAGE OF ARTICLE</label>
          <div style="margin-top: 5px">
            <img class="article-img" :src="article.imgUrl" />
          </div>
          <div>
            <p style="font-weight: bold; margin-top: 5px">
              <a v-for="tag in article.tags" :key="tag.id">
                #{{ tag.tagname }}
              </a>
            </p>
          </div>
          <div>
            <button class="about-btn" type="submit" @click="scrollToTop">
              Confirm Changes
            </button>
          </div>
        </div>
      </div>
    </form>
    <div class="row" style="height: 25px"></div>
    <!-- <pre>{{ article }}</pre> -->
    <EditPopup
      v-if="popupTriggers.buttonTrigger"
      :TogglePopup="() => TogglePopup('buttonTrigger')"
      :article="this.article"
    >
      <h1 style="font-size: 30px; color: rgb(255, 51, 51)">WARNING</h1>
      <p>Are you sure you want to delete "{{ this.article.title }}"?</p>
    </EditPopup>
  </div>
</template>

<script>
import { ref } from 'vue'
import ArticleService from '@/services/ArticleService.js'
import GStore from '@/store'
import BaseInput from '@/components/BaseInput.vue'
import BaseTextArea from '@/components/BaseTextArea.vue'
import EditPopup from '@/components/EditPopup.vue'
export default {
  inject: ['GStore'],
  props: ['id'],
  components: {
    BaseInput,
    BaseTextArea,
    EditPopup
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
            'You have successfully edit the article for ' + response.data.title
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
  },
  setup() {
    const popupTriggers = ref({
      buttonTrigger: false,
      timedTrigger: false
    })

    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }

    return {
      EditPopup,
      popupTriggers,
      TogglePopup
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
.article-img {
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 5px;
  object-fit: fill;
}
</style>
