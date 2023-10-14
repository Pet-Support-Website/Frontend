<template>
  <section>
    <div class="header" id="layout">
      <div class="row d-flex justify-content-center" style="margin: 0">
        <div class="col-md-10">
          <h1 style="text-transform: uppercase; color: darkslategray">
            VIEW ALL
            <a style="color: #1fdda4"> ARTICLES</a>
          </h1>
          <PetCard
            v-for="article in articles"
            :key="article.id"
            :article="article"
          ></PetCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PetCard from '@/components/PetCard.vue'
import GStore from '@/store'
export default {
  name: 'AllArticlesView',
  inject: ['GStore'],
  components: {
    PetCard
  },
  data() {
    return {
      articles: GStore.articles
    }
  }
}
</script>

<style scoped>
.header {
  margin-top: 50px;
}
</style>
