<template>
  <div>
    <div ref="board" @click="onClickBoard" @mouseover="onHoverBoard" class="cg-board-wrap"></div>
  </div>
</template>

<script>
import Board from '@/src/game/Board.js'
export default {
  name: 'ChessBoard',
  mounted() {
    Board.init(this.$refs.board)
  },
  methods: {
    onClickBoard(e) {
      Board.handleClick(e)
    },
    onHoverBoard(e) {
      Board.handleHover(e)
    }
  }
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
