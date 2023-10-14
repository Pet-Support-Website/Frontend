<template>
  <label v-if="label">{{ label }}</label>
  <textarea
    class="field"
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="placeholder"
    @input="inputHandler($event)"
  />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    optional: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    inputHandler(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  },
  computed: {
    placeholder() {
      if (this.optional) {
        return this.label + '(optional)'
      } else {
        return this.label
      }
    }
  }
}
</script>

<style scoped>
.field {
  height: 35px;
  border-radius: 5px;
  border: 1px rgb(175, 174, 174) solid;
}

label {
  text-transform: uppercase;
}
</style>
