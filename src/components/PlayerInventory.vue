<template>
  <div class="player-inventory">
    <p>Players Inventory</p>
    <div class="player-inventory__items">
      <div v-for="item in player.items" :key="item.id">
        <PlayerItem :item="item" @select="onSelect" :selected="isSelected(item)" />
      </div>
    </div>
  </div>
</template>

<script>
import Player from '@/src/game/player.js'
import PlayerItem from './PlayerItem.vue'

export default {
  name: 'PlayerInventory',
  components: { PlayerItem },
  props: {
    player: {
      type: Player,
      required: true
    }
  },
  computed: {},
  methods: {
    onSelect(item) {
      this.player.selectItem(item)
    },
    isSelected(item) {
      return this.player.selectedItem === item
    }
  }
}
</script>

<style scoped>
.player-inventory__items {
  display: flex;
  gap: 8px;
  border: 1px solid grey;
  padding: 4px;
}

.player-inventory {
  padding: 8px 0px;
}
</style>
