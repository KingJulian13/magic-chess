<template>
  <div>
    <button :class="{ selected }" @click="onClick">{{ item.type }}</button>
  </div>
</template>

<script>
export default {
  name: 'PlayerItem',
  props: {
    item: {
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit('select', this.item)
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: #bfcfdd;
}
</style>