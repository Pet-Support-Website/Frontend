<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <div style="text-align: right">
        <button
          class="popup-confirm"
          @click="TogglePopup()"
          @click.prevent="deleteArticle()"
        >
          Yes
        </button>
        <button class="popup-close" @click="TogglePopup()">No</button>
      </div>
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
  border: 1px solid lightgray;
  border-radius: 5px;
  background: #fff;
  padding: 32px;
}

.popup-close {
  margin: 5px;
  border: 2px solid #1fdda4;
  border-radius: 5px;
  background-color: #1fdda4;
  color: white;
  padding: 5px 20px;
}
.popup-close:hover {
  border: 2px solid #1bbf8c;
  background-color: #1bbf8c;
}
.popup-confirm {
  margin: 5px;
  border: 2px solid #1fdda4;
  background-color: white;
  color: #1bbf8c;
  border-radius: 5px;
  padding: 5px 20px;
}
.popup-confirm:hover {
  background-color: #eafbf6;
}
</style>
