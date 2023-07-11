<template>
  <section>
    <div id="navigation">
      <NavigationBar />
    </div>
    <div id="layout">
      <div class="row d-flex justify-content-center" style="margin: 0">
        <div class="col-md-10">
          <h1>
            <a style="color: darkslategray; text-transform: uppercase">
              {{ articleFilter }}
              <a style="color: #1fdda4">CARE</a>
            </a>
          </h1>
          <p>
            Are you a dog parent? We're here to help you keep your pup happy and
            healthy. Read more for a wide range of dog health and behavior tips
            that will help you provide the best possible care for your canine
            companion.
          </p>
          <div>
            <PetCard
              v-for="filteredArticle in filteredArticles"
              :key="filteredArticle.id"
              :article="filteredArticle"
            ></PetCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import NavigationBar from '@/components/NavigationBar.vue'
import PetCard from '@/components/PetCard.vue'
//import ArticleService from '@/services/ArticleService.js'
import GStore from '@/store'

export default {
  name: 'CardLayoutView',
  inject: ['GStore'],
  props: {
    articleFilter: {
      type: String,
      required: true
    }
  },
  components: {
    NavigationBar,
    PetCard
  },
  data() {
    return {
      articles: GStore.articles,
      filter: this.articleFilter
    }
  },
  computed: {
    filteredArticles() {
      let articleArray = []
      this.articles.forEach((a) => {
        a.tags.forEach((t) => {
          console.log(this.filter)
          if (t.tagname == this.articleFilter) {
            articleArray.push(a)
          }
        })
      })
      return articleArray
    }
  }
  /* eslint-disable-next-line no-unused-vars */
  // beforeRouteEnter(routeTo, routeFrom, next) {
  //   ArticleService.getArticles()
  //     .then((response) => {
  //       next((comp) => {
  //         comp.articles = response.data
  //       })
  //     })
  //     .catch(() => {
  //       next({ name: 'NetworkError' })
  //     })
  // },
  // beforeRouteUpdate(routeTo, routeFrom, next) {
  //   ArticleService.getArticles()
  //     .then((response) => {
  //       this.articles = response.data
  //       next()
  //     })
  //     .catch(() => {
  //       next({ name: 'NetworkError' })
  //     })
  // }
}
</script>

<style scoped>
#layout {
  margin-top: 50px;
  margin-bottom: 70px;
  align-items: center;
}
</style>
