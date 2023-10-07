<template>
  <section>
    <div id="navigation">
      <NavigationBar />
    </div>
    <div id="welcome">
      <div class="container">
        <div class="row">
          <div class="col" style="padding-bottom: 15vh">
            <h1 style="color: darkslategray">
              WELCOME TO
              <h1 style="color: #1fdda4">PET SUPPORT</h1>
            </h1>
            <p style="margin-top: 15px">
              Pet Support is a web application that focuses on one of the
              Information Retrieval algorithms called Page Rank algorithm to
              support users that want to find reliable sources of general
              information about their pets quickly, while also able to diagnose
              disease and illnesses based on observable symptoms to better
              understand their pet's condition.
            </p>
            <router-link to="/about"
              ><button class="about-btn">More about us</button></router-link
            >
            <button
              class="git-btn"
              onclick="window.location.href='https://github.com/Pet-Support-Website/Frontend';"
            >
              View GitHub
            </button>
          </div>
          <div class="col">
            <img class="image" src="@/assets/infographic1.png" alt="" />
          </div>
        </div>
        <div>
          <div class="row" id="feature-showcase">
            <h1 style="font-size: 50px">FEATURES</h1>
            <p>Presented with 3 main features:</p>
          </div>
          <div class="row" style="text-align: center; margin-top: 20px">
            <div class="col" id="box">
              <img
                class="feature-image"
                src="@/assets/general-info-system.png"
                alt=""
              />
              <p>General Information System</p>
            </div>
            <div class="col" id="box">
              <img
                class="feature-image"
                src="@/assets/diagnosis-system.png"
                alt=""
              />
              <p>Diagnosis & First Aid System</p>
            </div>
            <div class="col" id="box">
              <img
                class="feature-image"
                src="@/assets/clinic-system.png"
                alt=""
              />
              <p>Nearby Vet Hospitals & Clinics System</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  margin-top: 15vh;
  padding-bottom: 70px;
}

#feature-showcase {
  margin-top: 70px;
  text-align: center;
  align-items: center;
}

.git-btn {
  margin-top: 10px;
  color: darkslategray;
  background-color: lightgray;
  padding: 10px 55px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  margin-left: 20px;
}

.git-btn:hover {
  background-color: rgb(200, 200, 200);
}

.about-btn {
  margin-top: 10px;
  color: white;
  background-color: #1fdda4;
  padding: 10px 50px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
}

.about-btn:hover {
  background-color: #1bbf8c;
}

#box {
  border: 1px solid lightgray;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  padding-top: 30px;
  margin: 15px;
}

.feature-image {
  height: 35vh;
  margin-bottom: 10px;
  width: auto;
}
.image {
  margin-left: 50px;
  margin-top: 30px;
  height: 35vh;
  width: auto;
}
</style>
