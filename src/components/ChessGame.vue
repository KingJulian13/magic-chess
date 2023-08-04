<template>
  <div class>
    <div class="game">
      <div class="game__actions">
        <button @click="addTornado(player2)">Add Tornado to inventory</button>
      </div>
      <PlayerInventory :player="player2" />

      <ChessBoard @click="onClickBoard" />
      <div class="game__actions">
        <button @click="addSpell">Add Portal</button>
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
import { chess, addSpell, onClickOnBoard } from '@/src/game/index.js'
import { getRandomEmptySquare } from '@/src/game/util.js'
import Portal from '@/src/game/spells/Portal.js'
import Tornado from '@/src/game/spells/Tornado.js'
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
    addSpell() {
      const square1 = getRandomEmptySquare(chess)
      const redPortal = new Portal()
      addSpell(redPortal, square1)
      const square2 = getRandomEmptySquare(chess)
      const bluePortal = new Portal()
      bluePortal.setLinkedPortal(redPortal)
      redPortal.setLinkedPortal(bluePortal)
      addSpell(bluePortal, square2)
    },
    addTornado(player) {
      player.addItem(new Tornado())
    },
    onClickBoard(e) {
      console.log(1)
      onClickOnBoard(this.player1, e)
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
