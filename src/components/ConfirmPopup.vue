<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <button
        class="popup-close"
        @click="TogglePopup()"
        @click.prevent="deleteArticle()"
      >
        Yes
      </button>
      <button class="popup-close" @click="TogglePopup()">No</button>
    </div>
  </div>
</template>

<script>
import ArticleService from '@/services/ArticleService'
export default {
  name: 'ConfirmPopup',
  props: ['TogglePopup', 'id', 'rounterindex'],
  methods: {
    deleteArticle() {
      let deleteID = { id: this.id }
      ArticleService.deleteArticle(deleteID).then(() => {
        this.$router.go(this.rounterindex)
      })
    }
  }
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  background: #fff;
  padding: 32px;
}

.popup-close {
  margin: 5px;
}
</style>
