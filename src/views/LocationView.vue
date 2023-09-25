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
    <div class="row" style="margin-bottom: 50px">
      <div class="col-5 input-container">
        <form @submit.prevent="findCloseByButtonPressed">
          <div class="input-box">
            <a>COORDINATES</a>
            <div style="width: 100%">
              <input
                style="
                  width: 91%;
                  height: 35px;
                  border-radius: 5px;
                  border: 1px rgb(175, 174, 174) solid;
                "
                type="text"
                placeholder="Enter your address"
                v-model="coordinates"
              />
              <button class="locate-btn" @click="locatorButtonPressed">
                <img src="../assets/pin_drop_FILL0_wght400_GRAD0_opsz24.svg" />
              </button>
            </div>
            <br />
          </div>
          <a>DISTANCE</a>
          <div class="field" style="width: 100%">
            <select
              v-model="radius"
              style="
                width: 100%;
                height: 35px;
                border-radius: 5px;
                border: 1px rgb(175, 174, 174) solid;
              "
            >
              <option value="1">1 KM</option>
              <option value="3">3 KM</option>
              <option value="5">5 KM</option>
              <option value="10">10 KM</option>
            </select>
          </div>
          <br />
          <input class="about-btn" type="submit" value="Search" />
        </form>
        <div>
          <div
            class="display-location"
            style="max-height: 500px; margin-top: 20px; overflow: scroll"
          >
            <div class="item" v-for="place in places" :key="place.id">
              <div class="content">
                <h4 class="heading">{{ place.name }}</h4>
                <p class="meta">{{ place.vicinity }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col in-container" id="googleMap"></div>
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
      this.loader.load().then(async (google) => {
        const { Map } = await google.maps.importLibrary('maps')
        const { InfoWindow } = await google.maps.importLibrary('maps')
        const { Marker } = await google.maps.importLibrary('marker')
        const { AdvancedMarkerElement } = await google.maps.importLibrary(
          'marker'
        )
        const { PinElement } = await google.maps.importLibrary('marker')
        const glyphImg = document.createElement('img')
        glyphImg.src =
          'https://firebasestorage.googleapis.com/v0/b/pet-support-photos.appspot.com/o/home_FILL1_wght400_GRAD0_opsz24.svg?alt=media&token=7ed6ce50-384c-4996-9e34-8ae7b5b83a16'
        const pinBackground = new PinElement({
          background: '#40E0D0',
          glyph: glyphImg
        })
        var map = new Map(document.getElementById('googleMap'), {
          zoom: 15,
          center: new google.maps.LatLng(this.lat, this.lng),
          mapTypeId: 'roadmap',
          mapId: 'DEMO_MAP_ID'
        })
        const homeMarker = new AdvancedMarkerElement({
          position: new google.maps.LatLng(this.lat, this.lng),
          map: map,
          content: pinBackground.element
        })
        console.log(homeMarker)
        var infowindow = new InfoWindow()
        this.places.forEach((place) => {
          const lat = place.geometry.location.lat
          const lng = place.geometry.location.lng
          let marker = new Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map
          })
          google.maps.event.addListener(marker, 'click', () => {
            infowindow.setContent(
              `<div style="font-weight: bold">${place.name}</div><p>${place.vicinity}</p>`
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

.input-container {
  border-radius: 5px;
  border: 1px lightgray solid;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 246, 246, 0.945);
  padding: 20px 40px 35px;
  margin-right: 12px;
  margin-left: 10px;
}

.in-container {
  border-radius: 5px;
  border: 1px lightgray solid;
  display: flex;
  min-height: 700px;
  flex-direction: column;
  padding: 20px 40px 35px;
  background-image: url('../assets/clinic-system.png');
  background-size: 40rem;
  background-repeat: no-repeat;
  background-position: center;
}

.about-btn {
  margin-top: 10px;
  color: white;
  background-color: #1fdda4;
  padding: 10px 50px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 100%;
}
.locate-btn {
  color: white;
  background-color: #1fdda4;
  align-items: center;
  height: 35px;
  margin-left: 5px;
  border: none;
  border-radius: 5px;
}
.locate-btn:hover {
  background-color: #1bbf8c;
}
.about-btn:hover {
  background-color: #1bbf8c;
}

.display-location {
  border: 1px lightgray solid;
  border-radius: 5px;
}

.content {
  border: 1px lightgray solid;
  border-radius: 5px;
  padding: 10px;
  background-color: white;
}

.heading {
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
}
.meta {
  font-size: 16px;
  padding-top: 0;
}
</style>
