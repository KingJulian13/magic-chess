<template>
  <div class="player-inventory">
    <p>Players Inventory</p>

    <TransitionGroup name="inventory" tag="div" class="player-inventory__items">
      <div v-for="item in items" :key="item.id">
        <PlayerItem class="h-full" :item="item" @select="onSelect" :selected="isSelected(item)" />
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import Player from '@/src/game/Players.js'
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
  computed: {
    items() {
      return this.player.items
    }
  },
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
  padding: 4px;
  height: 411px;
}

.player-inventory {
  padding: 8px 0px;
}

.inventory-enter-active,
.inventory-leave-active {
  transition: all 0.5s ease;
}

.inventory-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.inventory-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
</style>
