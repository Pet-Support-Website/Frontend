<template>
  <section>
    <div id="navigation">
      <NavigationBar />
    </div>
    <div id="welcome">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 style="color: darkslategray">
              WELCOME TO
              <h1 style="color: #1fdda4">PET SUPPORT</h1>
            </h1>
            <p style="margin-top: 15px">
              Pet Support is a web application that focuses on one of the
              Information Retrieval algorithms called Page Rank algorithm to
              support users that want to find reliable sources of general
              information about their pets quickly while also able to diagnose
              disease and illnesses based on observable symptoms to better
              understand their pet's condition.
            </p>
          </div>
          <div class="col"></div>
        </div>
      </div>
    </div>
    <div id="feature-showcase"></div>
    <div id="pet-types"></div>
  </section>
</template>

<script>
// @ is an alias to /src
import NavigationBar from '@/components/NavigationBar.vue'
import GStore from '@/store'

export default {
  inject: ['GStore'],
  name: 'HomeView',
  components: {
    NavigationBar
  },
  data() {
    return {
      articles: GStore.articles
    }
  }
}
</script>

<style scoped>
#welcome {
  margin-top: 50px;
}
</style>
