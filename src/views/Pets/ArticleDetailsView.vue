<template>
  <section>
    <div id="navigation">
      <NavigationBar />
    </div>
    <div id="Details">
      <div class="container">
        <h1 style="text-transform: uppercase">{{ article.title }}</h1>
        <p style="font-weight: bold">{{ article.source }}</p>
        <div>
          <p style="font-weight: bold">
            <a v-for="tag in article.tags" :key="tag.id">
              <router-link
                :to="{
                  name: 'CardLayoutByTagView',
                  params: { tagname: tag.tagname }
                }"
                >#{{ tag.tagname }}</router-link
              >
            </a>
          </p>
        </div>
        <p v-html="formattedText"></p>
        <div>
          <img class="article-img" :src="article.imgUrl" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GStore from '@/store'
import NavigationBar from '@/components/NavigationBar.vue'
export default {
  props: ['id'],
  components: {
    NavigationBar
  },
  data() {
    return {
      article: GStore.article
    }
  },
  computed: {
    formattedText() {
      return this.article.content.replace(/%&07%/g, '<br>') // Replace &#10; with <br> tags
    }
  }
}
</script>

<style scoped>
span {
  font-weight: 500;
  line-height: 3;
  color: darkslategray;
}

.article-img {
  margin-top: 20px;
  width: 100%;
  border-radius: 5px;
  height: auto;
}

#Details {
  margin-top: 50px;
  margin-bottom: 70px;
}

a {
  margin-right: 10px;
  color: #1fdda4;
}

a:hover {
  color: #1bbf8c;
}
</style>
