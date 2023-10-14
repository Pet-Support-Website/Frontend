<template>
  <section>
    <div id="navigation">
      <NavigationBar />
    </div>
    <div id="Details">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1 style="text-transform: uppercase">{{ article.title }}</h1>
          </div>
          <div
            style="margin-bottom: 15px"
            v-if="$store.state.loggedIn === true"
          >
            <button
              class="admin-button"
              style="width: 40px; margin-right: 5px"
              @click.prevent="TogglePopup('buttonTrigger')"
            >
              -
            </button>
            <button class="edit-button">Edit</button>
          </div>
        </div>
        <p style="font-weight: bold">{{ article.source }}</p>
        <div>
          <p style="font-weight: bold">
            <a v-for="tag in article.tags" :key="tag.id">
              <router-link
                :to="{
                  name: 'CardLayoutByTagView',
                  params: { tagname: tag.tagname }
                }"
                >#{{ tag.tagname }}</router-link
              >
            </a>
          </p>
        </div>
        <p v-html="formattedText"></p>
        <div>
          <img class="article-img" :src="article.imgUrl" />
        </div>
      </div>
    </div>
    <ConfirmPopup
      v-if="popupTriggers.buttonTrigger"
      :TogglePopup="() => TogglePopup('buttonTrigger')"
      :id="this.article.id"
      :rounterindex="-1"
    >
      <h1 style="font-size: 30px; color: rgb(255, 51, 51)">WARNING</h1>
      <p>Are you sure you want to delete "{{ this.article.title }}"?</p>
    </ConfirmPopup>
  </section>
</template>

<script>
import GStore from '@/store'
import { ref } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'
import ConfirmPopup from '@/components/ConfirmPopup.vue'
export default {
  props: ['id'],
  components: {
    NavigationBar,
    ConfirmPopup
  },
  data() {
    return {
      article: GStore.article
    }
  },
  computed: {
    formattedText() {
      return this.article.content.replace(/%&07%/g, '<br>') // Replace &#10; with <br> tags
    }
  },
  setup() {
    const popupTriggers = ref({
      buttonTrigger: false,
      timedTrigger: false
    })

    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }

    return {
      ConfirmPopup,
      popupTriggers,
      TogglePopup
    }
  }
}
</script>

<style scoped>
span {
  font-weight: 500;
  line-height: 3;
  color: darkslategray;
}
.admin-button {
  border: 1px solid rgb(251, 75, 75);
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: rgb(255, 100, 100);
  color: white;
  font-size: 18px;
}
.admin-button:hover {
  background-color: rgb(255, 51, 51);
}
.edit-button {
  border: 1px solid #1bbf8c;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #1fdda4;
  color: white;
  font-size: 18px;
}
.edit-button:hover {
  background-color: #1bbf8c;
}
.article-img {
  margin-top: 20px;
  width: 100%;
  border-radius: 5px;
  height: auto;
}

#Details {
  margin-top: 50px;
  margin-bottom: 70px;
}

a {
  margin-right: 10px;
  color: #1fdda4;
}

a:hover {
  color: #1bbf8c;
}
</style>
