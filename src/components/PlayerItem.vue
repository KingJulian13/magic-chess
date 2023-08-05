<template>
  <div
    @click="onClick"
    :class="{ selected: selected }"
    class="player-item bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
  >
    <img class="h-32 object-cover" :src="item.image" alt="Sunset in the mountains" />
    <div class="p-4">
      <div class="mb-8">
        <p class="text-sm text-gray-600 flex items-center" v-if="item.isPrivate">
          <svg
            class="fill-current text-gray-500 w-3 h-3 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
            />
          </svg>
          Wird verdeckt gespielt
        </p>
        <div class="text-gray-900 font-bold text-xl mb-2">
          {{ item.name }}
        </div>
        <p class="text-gray-700 text-base">
          {{ item.description }}
        </p>
      </div>
      <div class="flex items-center">
        <p class="text-sm text-gray-900 mt-2 leading-none">{{ item.effect }}</p>
      </div>
    </div>
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

.player-item {
  cursor: pointer;
  width: 200px;
}
</style>
