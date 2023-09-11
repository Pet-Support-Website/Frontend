<template>
  <label v-if="label">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="placeholder"
    @input="inputHandler($event)"
    class="field"
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
