<template>
  <div id="navigation">
    <NavigationBar />
  </div>
  <div class="networkError">
    <div class="container">
      <h1>
        <a style="color: darkslategray">
          NETWORK
          <a style="color: #1fdda4">ERROR</a>
        </a>
      </h1>
      <p>
        It looks like you're experiencing some network issues, please take a
        breath and
        <a href="#" @click="$router.go(-1)">click here</a> to try again.
      </p>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'

export default {
  name: 'NetworkError',
  components: {
    NavigationBar
  }
}
</script>

<style scoped>
.networkError {
  margin-top: 50px;
}
</style>
