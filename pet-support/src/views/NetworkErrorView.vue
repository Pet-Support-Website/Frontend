<template>
  <div class="networkError">
    <h1>
      <a style="color: darkslategray">
        NETWORK
        <a style="color: #1fdda4">ERROR</a>
      </a>
    </h1>
    <h3>
      It looks like you're experiencing some network issues, please take a
      breath and
      <a href="#" @click="$router.go(-1)">click here</a> to try again.
    </h3>
  </div>
</template>

<style scoped>
.networkError {
  margin-top: 30px;
}
</style>
