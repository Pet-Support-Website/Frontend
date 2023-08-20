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
</template>

<script>
//import GStore from '@/store'
export default {
  name: 'PetCard',
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
  padding: 20px;
  text-align: left;
  width: 300px;
  height: 300px;
  cursor: pointer;
  border: 1px solid rgb(175, 174, 174);
  border-radius: 5px;
  margin: 5px;
  vertical-align: top;
  display: inline-block;
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
