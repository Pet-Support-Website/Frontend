<template>
  <section>
    <div id="navigation">
      <NavigationBar />
    </div>
    <div id="Details">
      <div class="container">
        <h1 style="text-transform: uppercase">{{ article.title }}</h1>
        <span>{{ article.source }}</span>
        <p v-html="formattedText"></p>
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
      return this.article.content.replace(/\n/g, '<br>') // Replace &#10; with <br> tags
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

#Details {
  margin-top: 50px;
}
</style>
