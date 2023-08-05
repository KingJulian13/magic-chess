<template>
  <div class>
    <div class="game">
      <div class="game__actions">
        <button @click="addTornado(player2)">Add Tornado to inventory</button>
      </div>
      <PlayerInventory :player="player2" />

      <ChessBoard />
      <div class="game__actions">
        <button @click="addItem">Add Portal</button>
      </div>

      <PlayerInventory :player="player1" />
      <div class="game__actions">
        <button @click="addTornado(player1)">Add Tornado to inventory</button>
      </div>
    </div>
  </div>
</template>

<script>
import ChessBoard from './ChessBoard.vue'
import PlayerInventory from './PlayerInventory.vue'

import Board from '@/src/game/Board.js'
import { Tornado, Portal } from '@/src/game/items'
import Player from '@/src/game/player.js'

export default {
  name: 'ChessGame',
  components: {
    ChessBoard,
    PlayerInventory
  },
  data: () => ({
    player1: new Player('Fredmann'),
    player2: new Player('Mannfred')
  }),
  methods: {
    addItem() {
      const square1 = Board.getRandomEmptySquare()
      const redPortal = new Portal()
      Board.addItem(redPortal, square1)
      const square2 = Board.getRandomEmptySquare()
      const bluePortal = new Portal()
      bluePortal.setLinkedPortal(redPortal)
      redPortal.setLinkedPortal(bluePortal)
      Board.addItem(bluePortal, square2)
    },
    addTornado(player) {
      player.addItem(new Tornado())
    }
  }
}
</script>

<style scoped>
.game__actions {
  display: flex;
  gap: 8px;
  padding: 8px 0px;
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
