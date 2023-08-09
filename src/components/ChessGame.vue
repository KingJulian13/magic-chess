<template>
  <div class>
    <div class="game">
      <div class="game__actions">
        <Btn @click="addTornado(player2)">Add Tornado to inv</Btn>
        <Btn @click="addPortal(player2)">Add Portal to inv</Btn>
        <Btn @click="addHiddenPortal(player2)">Add Hidden Portal to inv</Btn>
      </div>
      <PlayerInventory :player="player2" />

      <ChessBoard />
      <div class="game__actions">
        <Btn @click="addItem">Add Portal</Btn>
      </div>

      <PlayerInventory :player="player1" />
      <div class="game__actions">
        <Btn @click="addTornado(player1)">Add Tornado to inv</Btn>
        <Btn @click="addPortal(player1)">Add Portal to inv</Btn>
        <Btn @click="addHiddenPortal(player1)">Add Hidden Portal to inv</Btn>
      </div>
    </div>
  </div>
</template>

<script>
import ChessBoard from './ChessBoard.vue'
import PlayerInventory from './PlayerInventory.vue'
import Btn from './base/Btn.vue'

import Board from '@/src/game/Board.js'
import { Tornado, Portal, HiddenPortal } from '@/src/game/items'
import { player1, player2 } from '@/src/game/Players.js'

export default {
  name: 'ChessGame',
  components: {
    ChessBoard,
    PlayerInventory,
    Btn
  },
  data() {
    return {
      player1,
      player2
    }
  },
  methods: {
    addItem() {
      const square1 = Board.getRandomEmptySquare()
      const portal = new Portal()
      Board.addItem(portal, square1)
    },
    addTornado(player) {
      player.addItem(new Tornado())
    },
    addPortal(player) {
      player.addItem(new Portal())
    },
    addHiddenPortal(player) {
      player.addItem(new HiddenPortal())
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
