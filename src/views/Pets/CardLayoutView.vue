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
            <span v-for="article in filteredArticles" :key="article.id">
              <span v-for="tag in article.tags" :key="tag.id">
                <span v-if="tag.tagname === 'headline'">
                  {{ article.content }}
                </span>
              </span>
            </span>
          </p>
          <div v-for="tag in displayTags" :key="tag.id">
            <h4 style="text-transform: uppercase">{{ tag }}</h4>
            <div
              class="display-block"
              v-for="filteredArticle in filteredArticles"
              :key="filteredArticle.id"
            >
              <div v-for="tags in filteredArticle.tags" :key="tags.id">
                <div v-if="tags.tagname === tag">
                  <PetCard :article="filteredArticle"></PetCard>
                </div>
              </div>
            </div>
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
      filter: this.articleFilter,
      displayTags: ['general', 'health', 'behavior issues', 'diseases']
    }
  },
  computed: {
    filteredArticles() {
      let articleArray = []
      this.articles.forEach((a) => {
        a.tags.forEach((t) => {
          if (t.tagname == this.articleFilter) {
            articleArray.push(a)
          }
        })
      })
      return articleArray
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

.display-block {
  display: inline-block;
}

h4 {
  font-family: 'Righteous';
  font-weight: 600;
  margin-top: 10px;
  margin-left: 5px;
  color: #1bbf8c;
}
</style>
