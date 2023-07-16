<template>
  <section>
    <div id="navigation">
      <NavigationBar />
    </div>
    <div id="layout">
      <div class="row d-flex justify-content-center" style="margin: 0">
        <div class="col-md-10">
          <h1 style="text-transform: uppercase">
            GENERAL
            <a style="color: #1fdda4">{{ articleFilter }} CARE</a>
          </h1>
          <p style="margin-left: 5px">
            <span v-for="article in articles" :key="article.id">
              <span v-if="article.id === 1">
                {{ article.content }}
              </span>
            </span>
          </p>
          <div v-for="allTag in allTags" :key="allTag.id">
            <h4 style="text-transform: uppercase">{{ allTag }}</h4>
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
      articleArray.shift()
      return articleArray
    },
    allTags() {
      let tagArray = []
      let uniqArray = []
      this.articles.forEach((a) => {
        a.tags.forEach((t) => {
          tagArray.push(t.tagname)
        })
      })
      uniqArray = [...new Set(tagArray)]
      uniqArray.shift()
      uniqArray.shift()
      console.log(uniqArray)
      return uniqArray
    }
  }
}
</script>

<style scoped>
#layout {
  margin-top: 50px;
  margin-bottom: 70px;
  align-items: center;
}

h4 {
  font-family: 'Righteous';
  font-weight: 600;
  margin-top: 10px;
  margin-left: 5px;
  color: #1bbf8c;
}
</style>
