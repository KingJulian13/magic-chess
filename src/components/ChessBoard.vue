<template>
  <div class="blue merida">
    <div ref="board" class="cg-board-wrap"></div>
  </div>
</template>

<script>
import { init } from '@/src/game/index.js'

export default {
  name: 'ChessBoard',
  mounted() {
    init(this.$refs.board)
  },
}
</script>



<style scoped>
.cg-board-wrap {
  width: min(60vh, 60vh);
  height: min(60vh, 60vh);
}

cg-board {
  background-color: #bfcfdd;
}
</style>
