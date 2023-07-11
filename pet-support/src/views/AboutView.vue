<template>
  <section>
    <div id="navigation">
      <NavigationBar />
    </div>
    <div class="about">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>
              <a style="color: darkslategray">
                ABOUT
                <a style="color: #1fdda4">US</a>
              </a>
            </h1>
            <p style="margin-top: 15px">
              This part of the article will introduce the team members, our
              roles, aims & objectives and how the website briefly came to be.
            </p>
          </div>
          <div class="col"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import NavigationBar from '@/components/NavigationBar.vue'

export default {
  name: 'AboutView',
  components: {
    NavigationBar
  }
}
</script>

<style scoped>
.about {
  margin-top: 50px;
  margin-bottom: 70px;
}
</style>
