<template>
  <!--Navigation Bar.-->
  <nav
    class="navbar navbar-expand-lg navbar-light justify-content-between"
    id="nav"
  >
    <router-link class="navbar-brand" to="/"
      ><img class="logo" src="./assets/pet-support-logo.png" alt=""
    /></router-link>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/">Diagnosis System</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/"
            >Vet Hospitals & Clinics Near You</router-link
          >
        </li>
      </ul>
      <form class="d-flex input-group w-auto" style="margin-left: 15px">
        <input
          type="search"
          class="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <span
          class="input-group-text border-0"
          id="search"
          style="background-color: white"
          ><font-awesome-icon icon="fa-solid fa-magnifying-glass" size="xs"
        /></span>
      </form>
    </div>
  </nav>
  <router-view />
  <FooterView />
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FooterView from '@/components/Footer.vue'
export default {
  components: { FontAwesomeIcon, FooterView }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
#app {
  font-family: 'Bahnschrift', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: darkslategray;
  margin: 0;
  padding: 0;
}

h1 {
  font-size: 60px;
  font-weight: 700;
  font-family: 'Righteous';
  letter-spacing: 2px;
  color: darkslategray;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

p {
  font-weight: 300;
  font-size: 18px;
}

#nav {
  margin-left: 30px;
  margin-right: 30px;
  font-size: 18px;
}

.logo {
  width: 400px;
  height: auto;
}

nav a.nav-link {
  font-weight: bold;
  color: #1bbf8c;
}

nav a.nav-link:hover {
  font-weight: bold;
  color: #1fdda4;
}
</style>
