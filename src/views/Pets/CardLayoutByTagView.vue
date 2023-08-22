<template>
  <section>
    <div id="navigation">
      <NavigationBar />
    </div>
    <div id="layout">
      <div class="row d-flex justify-content-center" style="margin: 0">
        <div class="col-md-10">
          <h1 style="text-transform: uppercase; color: #1fdda4">
            <a style="color: darkslategray">TAG </a>{{ tagname }}
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
// @ is an alias to /src
import NavigationBar from '@/components/NavigationBar.vue'
import PetCard from '@/components/PetCard.vue'
import GStore from '@/store'

export default {
  name: 'CardLayoutByTagView',
  inject: ['GStore'],
  props: {
    tagname: {
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
      articles: GStore.searchArticles,
      filter: this.tagname
    }
  }
  // computed: {
  //   filteredArticles() {
  //     let articleArray = []
  //     this.articles.forEach((a) => {
  //       a.tags.forEach((t) => {
  //         console.log(this.filter)
  //         if (t.tagname == this.tagname) {
  //           articleArray.push(a)
  //         }
  //       })
  //     })
  //     console.log(articleArray)
  //     return articleArray
  //   }
  // }
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
