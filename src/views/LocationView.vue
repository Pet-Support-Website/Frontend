<template>
  <div class="container">
    <div class="header">
      <h1 style="color: darkslategray">
        NEARBY VET
        <a style="color: #1fdda4">CLINICS & HOSPITALS</a>
      </h1>
      <p style="margin-top: 15px">
        An explanation on what is the location system and how it works.
      </p>
    </div>
    <div class="location-container">
      <div class="row">
        <div class="col">
          <form
            class="input-container"
            @submit.prevent="findCloseByButtonPressed"
          >
            <div class="input-box">
              <input
                type="text"
                placeholder="Enter your address"
                v-model="coordinates"
              />
              <a class="dot circle link icon" @click="locatorButtonPressed"
                >[o]
              </a>
            </div>
            <div class="field">
              <select v-model="radius">
                <option value="5">5 KM</option>
                <option value="10">10 KM</option>
                <option value="15">15 KM</option>
                <option value="20">20 KM</option>
              </select>
            </div>
            <input class="about-btn" type="submit" value="Search" />
          </form>
          <div class="display-location">
            <div style="max-height: 500px; max-width: 70%; overflow: scroll">
              <div class="item" v-for="place in places" :key="place.id">
                <div class="content">
                  <div class="header">{{ place.name }}</div>
                  <div class="meta">{{ place.vicinity }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col" id="googleMap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Loader } from '@googlemaps/js-api-loader'
export default {
  data() {
    return {
      lat: 0,
      lng: 0,
      type: 'veterinary_care',
      radius: '',
      places: [],
      loader: new Loader({
        apiKey: 'AIzaSyBbNPnU2s5Wd-scaUryLMjtNihlCt6Qz40'
      })
    }
  },
  computed: {
    coordinates() {
      return `${this.lat}, ${this.lng}`
    }
  },
  methods: {
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude
          this.lng = position.coords.longitude
          console.log(this.lat + ' , ' + this.lng)
        },
        (error) => {
          console.log(error)
        }
      )
    },
    findCloseByButtonPressed() {
      const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBbNPnU2s5Wd-scaUryLMjtNihlCt6Qz40&location=${
        this.lat
      },${this.lng}&type=${this.type}&radius=${this.radius * 1000}&v=weekly`
      axios
        .get(URL)
        .then((response) => {
          console.log(response.data)
          this.places = response.data.results
          this.addLocationsToGoogleMaps()
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    addLocationsToGoogleMaps() {
      this.loader.load().then((google) => {
        var map = new google.maps.Map(document.getElementById('googleMap'), {
          zoom: 15,
          center: google.maps.LatLng(this.lat, this.lng),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        })
        var infowindow = new google.maps.InfoWindow()
        this.places.forEach((place) => {
          const lat = place.geometry.location.lat
          const lng = place.geometry.location.lng
          let marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map
          })
          google.maps.event.addListener(marker, 'click', () => {
            infowindow.setContent(
              `<div class="ui header">${place.name}</div><p>${place.vicinity}</p>`
            )
            infowindow.open(map, marker)
          })
        })
      })
    }
  }
}
</script>

<style scoped>
.header {
  margin-top: 50px;
}
</style>
