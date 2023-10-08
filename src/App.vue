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
          <router-link class="nav-link" to="/diagnosis-system"
            >Diagnosis System</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/location-system"
            >Vet Hospitals & Clinics Near You</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login"
            ><button class="login-btn">Log in</button></router-link
          >
        </li>
      </ul>
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    </div>
  </nav>
  <hr />
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

.login-btn {
  color: white;
  background-color: #1fdda4;
  font-weight: bold;
  padding: 0px 30px;
  font-size: 18px;
  border: 1px solid #1fdda4;
  border-radius: 5px;
}

.login-btn:hover {
  background-color: #1bbf8c;
}

h1 {
  font-size: 60px;
  font-weight: 700;
  font-family: 'Righteous';
  letter-spacing: 2px;
  color: darkslategray;
}

hr {
  padding: 0px;
  margin: 0px;
  color: gray;
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
  color: #1fdda4;
}

nav a.nav-link:hover {
  font-weight: bold;
  color: #1bbf8c;
}
</style>
