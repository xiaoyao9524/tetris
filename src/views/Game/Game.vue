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
import { ref, reactive } from "vue";
import{integer, nativeMath} from 'random-js'
// util
import {
  createGameStatus,
  createFallElement
} from './utils/gameUtils';

// type
import type {
  GameStatus
} from './types';
import type {
  GridPoint
} from './utils/grid/GridType';

import { FallGrid } from './utils/grid/GridType';


// 游戏状态
const gameStatus = ref<GameStatus>([]);

// 行数和列数
const rowCount = ref(20);
const colCount = ref(10);

// 下落间隔(ms)
const fallInterval = ref(1000);

gameStatus.value = createGameStatus(rowCount.value, colCount.value);


/*
const obj = reactive<{
  [key: number]: number;
}>({})
for (let i =0; i < 100; i++) {
  const num = integer(0, 5)(nativeMath);

  if (obj[num]) {
    obj[num]++
  } else {
    obj[num] = 1
  }
}

console.log('random: ', obj)
*/

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

  // 保存之前下落元素坐标
  const fallElBeforePoint = ref<GridPoint[]>([]);
  // 创建下落元素
  const fallEl = ref<FallGrid>(createFallElement());

  // 开始下落
  // const toNextLineTimer = ref<NodeJS.Timeout | null>(null)

  // 每次下落时触发
  const handlerFallMoment = () => {
    fallEl.value.toNextLine
  }

  handlerFallMoment();

  // toNextLineTimer.value = setTimeout(handlerFallMoment, fallInterval.value)
  
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
