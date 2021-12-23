<template>
  <div class="game">
    <div class="container">
      <div
        class="game-row"
        v-for="(row, index) in gameStatus"
        :key="index"
      >
        <div
          class="game-grid"
          v-for="(grid, gIndex) in row"
          :key="gIndex"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  GameStatus
} from './types';
import { ref } from "vue";

import {
  createGameStatus
} from './utils/gameUtils';
// 游戏状态
const gameStatus = ref<GameStatus>([]);

// 行数和列数
const rowCount = ref(20);
const colCount = ref(10);

gameStatus.value = createGameStatus(rowCount.value, colCount.value);

/**
 * 当前下落的格子：
 *    类型1 
 *        **
 *        **
 *    类型2
 *        **
 *         **
 *    类型3
 *         **
 *        **
 *    类型4
 *        ****
 *    类型5
 *         *
 *        ***
 */
</script>

<style scoped lang="scss">
.game {
  .container {
    margin: 50px auto;
    width: 300px;
    height: 600px;
    border: 2px solid #000;

    .game-row {
      display: flex;
      height: 30px;
      .game-grid {
        flex: 0 0 auto;
        width: 30px;
        font-size: 12px;
      }
    }
  }
}
</style>
