<template>
  <div class="game">
    <div class="container">
      
    </div>
  </div>
</template>

<script setup lang="ts">
type GridStatus = 0 | 1;

type GameRow = GridStatus[];

type GameStatus = GameRow[];

import { ref } from 'vue'

const gameStatus = ref<GameStatus>([]);

const rowCount = ref(20);
const colCount = ref(10);

for (let i = 0; i < rowCount.value; i++) {
  const row: GameRow = [];
  for (let j = 0; j < colCount.value; j++) {
    row.push(0);
  }
  gameStatus.value.push(row);
}

console.log(gameStatus.value);

</script>

<style scoped lang="scss">
.game {

}
</style>
