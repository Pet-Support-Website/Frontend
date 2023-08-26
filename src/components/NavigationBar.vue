<template>
  <nav class="navbar navbar-expand-lg navbar-light justify-content-between">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav m-auto">
        <li class="nav-item">
          <router-link
            class="nav-link sub-nav"
            :to="{
              name: 'CardLayoutView',
              params: { articleFilter: 'dog', title: 'General Fish Care' }
            }"
            >DOGS</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link sub-nav"
            :to="{
              name: 'CardLayoutView',
              params: { articleFilter: 'cat', title: 'General Fish Care' }
            }"
            >CATS</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link sub-nav"
            :to="{
              name: 'CardLayoutView',
              params: { articleFilter: 'fish', title: 'General Fish Care' }
            }"
            >FISH</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link sub-nav"
            :to="{
              name: 'CardLayoutView',
              params: { articleFilter: 'bird', title: 'General Bird Care' }
            }"
            >BIRDS</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link sub-nav"
            :to="{
              name: 'CardLayoutView',
              params: { articleFilter: 'rabbit', title: 'General Rabbit Care' }
            }"
            >RABBITS</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link sub-nav"
            :to="{
              name: 'CardLayoutView',
              params: {
                articleFilter: 'rodents',
                title: 'General Rodents Care'
              }
            }"
            >RODENTS</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link sub-nav"
            :to="{
              name: 'CardLayoutView',
              params: {
                articleFilter: 'reptile',
                title: 'General Reptile Care'
              }
            }"
            >REPTILES</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link sub-nav" to="/about" id="about-us"
            >ABOUT US</router-link
          >
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
  font-size: 16px;
  padding: 5px;
}

hr {
  padding: 0px;
  margin: 0px;
  color: gray;
}

nav a.sub-nav {
  margin-left: 5px;
  margin-right: 5px;
  font-weight: 300;
  color: darkslategray;
}

nav a.sub-nav:hover {
  font-weight: 400;
  color: darkslategray;
}

#about-us {
  color: #1fdda4;
  font-weight: 500;
}

#about-us:hover {
  color: #1bbf8c;
  font-weight: 500;
}
</style>
