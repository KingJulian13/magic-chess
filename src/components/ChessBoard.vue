<template>
  <div class="blue merida">
    <div ref="board" class="cg-board-wrap"></div>
    <button @click="onUndo">undo</button>
    <button @click="addSpell">spell</button>
  </div>
</template>

<script>
import { init, undo, addSpell } from '@/src/game/index.js'
export default {
  name: 'ChessBoard',
  mounted() {
    init(this.$refs.board)
  },
  methods: {
    onUndo() {
      undo()
    },
    addSpell() {
      addSpell("a2", "fireball")
    }
  }
}
</script>



<style>
.cg-board-wrap {
  width: min(90vh, 90vw);
  height: min(90vh, 90vw);
}

cg-board {
  background-color: #bfcfdd;
}
</style>
