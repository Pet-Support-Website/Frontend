<template>
  <router-link
    class="pet-link"
    @click="scrollToTop"
    :to="{
      name: 'ArticleDetailsView',
      params: { id: article.id, title: article.title }
    }"
  >
    <div class="pet-card">
      <div style="height: 40px" v-if="$store.state.loggedIn != true"></div>
      <div style="text-align: right" v-if="$store.state.loggedIn === true">
        <button
          style="width: 40px"
          class="admin-button"
          @click.prevent="TogglePopup('buttonTrigger')"
        >
          -
        </button>
      </div>
      <div v-if="article.imgUrl !== ''">
        <img class="article-img" :src="article.imgUrl" />
      </div>
      <div v-else>
        <img class="article-img" src="@/assets/empty-img.png" alt="" />
      </div>
      <h4>{{ article.title }}</h4>
      <span>{{ article.source }}</span>
    </div>
  </router-link>
  <ConfirmPopupVue
    v-if="popupTriggers.buttonTrigger"
    :TogglePopup="() => TogglePopup('buttonTrigger')"
    :id="this.article.id"
    :rounterindex="0"
    :title="this.article.title"
  >
    <h1 style="font-size: 30px; color: rgb(255, 51, 51)">WARNING</h1>
    <p>Are you sure you want to delete "{{ this.article.title }}"?</p>
  </ConfirmPopupVue>
</template>

<script>
import { ref } from 'vue'
import ConfirmPopupVue from './ConfirmPopup.vue'

export default {
  name: 'PetCard',
  components: {
    ConfirmPopupVue
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
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
      ConfirmPopupVue,
      popupTriggers,
      TogglePopup
    }
  }
}
</script>

<style scoped>
.article-img {
  margin-bottom: 20px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid lightgray;
  height: 150px;
  max-height: 150px;
}

.pet-card {
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
  width: 300px;
  height: 300px;
  cursor: pointer;
  border: 1px solid rgb(175, 174, 174);
  border-radius: 5px;
  margin: 3px;
  vertical-align: top;
  display: inline-block;
}
.admin-button {
  border: 1px solid rgb(255, 100, 100);
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: rgb(255, 100, 100);
  color: white;
}
.admin-button:hover {
  background-color: rgb(255, 51, 51);
}

h4 {
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
}

span {
  font-weight: 400;
}
.pet-card:hover {
  background-color: rgba(243, 243, 243, 0.878);
}

.pet-link {
  color: darkslategray;
  text-decoration: none;
}
</style>
