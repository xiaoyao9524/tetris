<template>
  <div class="game">
    <div class="container">
      <div
        class="game-row"
        v-for="(row, index) in gameStatus"
        :key="index"
      >
        <div
          :class="{
            'game-grid': true,
            'fall-done': gameStatus[index][gIndex] === 1,
            'fall-in': gameStatus[index][gIndex] === 2
          }"
          v-for="(grid, gIndex) in row"
          :key="gIndex"
        ></div>
      </div>
    </div>
    <div>
      <button @click="handlerFallMoment">下落一行</button>
      <button @click="handlerToLeft">向左</button>
      <button @click="handlerToRight">向右</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { integer, nativeMath } from "random-js";
// util
import { createGameStatus, createFallElement } from "./utils/gameUtils";

// type
import type { GameStatus } from "./types";
import type { GridPoint } from "./utils/grid/GridType";

import { FallGrid } from "./utils/grid/GridType";
import { log } from "console";

// 游戏状态
const gameStatus = ref<GameStatus>([]);

// 行数和列数
const rowCount = ref(20);
const colCount = ref(10);

// 下落间隔(ms)
const fallInterval = ref(400);

// 初始化游戏状态
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

// 创建下落元素
const fallEl = ref<FallGrid>(createFallElement());

// 保存之前下落元素坐标
const fallElBeforePoint = ref<GridPoint[]>(fallEl.value.getCurrentPosition());

// 清除上一次下落元素
const clearFallEl = () => {
  for (const point of fallElBeforePoint.value) {
    const { x, y } = point;
    gameStatus.value[y][x] = 0;
  }
};

// 渲染下落元素
const renderFallEl = () => {
  const fallPosition = fallEl.value.getCurrentPosition();

  for (const point of fallPosition) {
    const { x, y } = point;
    gameStatus.value[y][x] = 2;
  }

  fallElBeforePoint.value = fallPosition;
};

renderFallEl();

// 下落元素已经到底
const handlerFallDone = () => {
  // 将上次下落元素最后位置状态置为1
  for (const point of fallElBeforePoint.value) {
    const { x, y } = point;
    gameStatus.value[y][x] = 1;
  }

  fallElBeforePoint.value = [];
};

// 每次下落时触发
const handlerFallMoment = () => {
  const toNextLineResult = fallEl.value.toNextLine(gameStatus.value);

  if (!toNextLineResult) {
    /** 无法再下落 */
    console.log("此行已落到底");
    // fallElBeforePoint.value = [];
    handlerFallDone();

    // 生成下一个下落元素
    fallEl.value = createFallElement();
    renderFallEl();
    // 执行下一次
    setTimeout(handlerFallMoment, fallInterval.value);
  } else {
    /** 可以下落 */

    // 清除上一次位置
    clearFallEl();

    // 保存位置
    fallElBeforePoint.value = toNextLineResult;
    console.log("此次下落结果：", fallElBeforePoint.value);

    // 显示最新的位置
    renderFallEl();

    // 执行下一次
    setTimeout(handlerFallMoment, fallInterval.value);
  }
};

// 开始下落
setTimeout(handlerFallMoment, fallInterval.value);

// 向左
const handlerToLeft = () => {
  const moveResult = fallEl.value.toLeft(gameStatus.value);

  console.log('向左移动结果：', moveResult)

  if (!moveResult) {
    return;
  }

  clearFallEl();

  fallElBeforePoint.value = moveResult;
  // console.log("此次（向左）移动结果：", fallElBeforePoint.value);

  // 显示最新的位置
  renderFallEl();
};

// 向右
const handlerToRight = () => {
  fallEl.value.toRight(gameStatus.value);
};
</script>

<style scoped lang="scss">
.game {
  width: 100vw;
  height: 100vh;
  .container {
    margin: auto;
    width: 300px;
    height: 600px;
    border: 2px solid #000;

    .game-row {
      display: flex;
      height: 30px;
      box-sizing: border-box;
      border-bottom: 2px solid #000;
      &:nth-last-of-type(1) {
        border-bottom: none;
      }
      .game-grid {
        flex: 0 0 auto;
        width: 30px;
        font-size: 12px;
        /* border: 1px solid #000; */
        /* border-left: 1px solid #000; */
        border-right: 2px solid #000;
        box-sizing: border-box;
        &:nth-of-type(1) {
          /* border-left: none; */
        }
        &:nth-last-of-type(1) {
          border-right: none;
        }
      }

      .fall-done {
        background: rgba(19, 206, 102, 0.8);
      }

      .fall-in {
        background: #409eff;
      }
    }
  }
}
</style>
