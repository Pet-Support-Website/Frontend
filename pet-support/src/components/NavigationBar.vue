<template>
  <hr />
  <nav class="navbar navbar-expand-lg navbar-light justify-content-between">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav m-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">DOGS</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/">CATS</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/">FISH</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/">BIRDS</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/">RABBITS</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/">RODENTS</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/">REPTILES</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <hr />
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style scoped>
nav {
  text-align: center;
  padding: 5px;
}

hr {
  padding: 0px;
  margin: 0px;
  color: gray;
}

nav a.router-link-exact-active {
  margin-left: 5px;
  margin-right: 5px;
  font-weight: 300;
  color: darkslategray;
}

nav a.router-link-exact-active:hover {
  margin-left: 5px;
  margin-right: 5px;
  font-weight: 400;
  color: darkslategray;
}
</style>
