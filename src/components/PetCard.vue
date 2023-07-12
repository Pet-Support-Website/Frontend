<template>
  <router-link
    class="pet-link"
    :to="{ name: 'ArticleDetailsView', params: { id: article.id } }"
  >
    <div class="pet-card">
      <h4>{{ article.title }}</h4>
      <span>{{ article.source }}</span>
    </div>
  </router-link>
</template>

<script>
//import GStore from '@/store'
export default {
  name: 'PetCard',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.pet-card {
  padding: 20px;
  text-align: left;
  width: 300px;
  height: 150px;
  max-height: 150px;
  cursor: pointer;
  border: 1px solid rgb(175, 174, 174);
  border-radius: 5px;
  margin: 5px;
  vertical-align: top;
  display: inline-block;
}

h4 {
  font-weight: 600;
  font-size: 20px;
  font-family: 'Righteous';
  text-transform: uppercase;
}

span {
  font-weight: 400;
}
.pet-card:hover {
  background-color: rgba(243, 243, 243, 0.878);
}

.pet-link {
  color: darkslategray;
  text-decoration: none;
}
</style>
