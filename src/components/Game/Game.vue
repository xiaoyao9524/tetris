<template>
  <div class="game-page">
    <div class="main-game">
      <div class="game-container">
        <div class="game-row" v-for="(row, index) in gameStatus" :key="index">
          <div
            :class="{
              'game-grid': true,
              'fall-done': gameStatus[index][gIndex] === 1,
              'fall-in': gameStatus[index][gIndex] === 2,
            }"
            v-for="(grid, gIndex) in row"
            :key="gIndex"
          ></div>
        </div>
      </div>

      <div class="game-info">
        <div class="info-item">
          <p class="label">分数</p>
          <p class="value">20</p>
        </div>

        <div class="info-item">
          <p class="label">下一个</p>
          <div class="next-fall">
            <GridPreview :grid="nextFallEl" />
          </div>
        </div>

        <div>
          <!-- <button @click="lookGameStatus">查看游戏状态</button> -->
          <button @click="handlerFallMoment">下落一行</button>
        </div>
      </div>
    </div>

    <div class="operation-container">
      <div class="operation-item" @click="handlerToLeft">
        <span class="icon-font">&#xe84b;</span>
      </div>
      <div class="operation-item" @click="handlerRotate">
        <span class="icon-font">&#xe7e7;</span>
      </div>
      <div class="operation-item">
        <span class="icon-font" @click="handlerToRight">&#xe84a;</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// util
import { createGameStatus, createFallElement } from "./utils/gameUtils";

// type
import type { GameStatus, GridStatus } from "./types";
import type { GridPoint } from "./utils/grid/GridType";

// game-util
import { FallGrid } from "./utils/grid/GridType";

// component
import GridPreview from "./components/GridPreview.vue";

const testDown = ref(true);

// 游戏状态
// const gameStatus = ref<GameStatus>([]);
const gameStatus = ref<GameStatus>([
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]);

// 行数和列数
const rowCount = ref(20);
const colCount = ref(10);

// 下落间隔(ms)
const fallInterval = ref(600);

// 初始化游戏状态
// gameStatus.value = createGameStatus(rowCount.value, colCount.value);

const lookGameStatus = () => {
  console.log("gameStatus: ", gameStatus.value);
  console.log(gameStatus.value.map((i) => i.length));
};

// 创建下落元素(此次创建就不用检查是否创建成功了，必定会成功)
const fallEl = ref<FallGrid>(createFallElement());

// 预览下一个元素
const nextFallEl = ref<FallGrid>(createFallElement());

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

// 检查是否有消除的行
const checkRowClear = () => {
  // console.clear();
  // console.log("检查是否有消除的行: ");
  let mapStr = ``;

  for (const row of gameStatus.value) {
    mapStr += row.join(" ") + "\n";
  }
  console.log(mapStr);

  let clearRowCount = 0;

  for (let i = 0; i < gameStatus.value.length; i++) {
    const row = gameStatus.value[i];

    if (!row.includes(0)) {
      gameStatus.value.splice(i, 1);

      const newRow: GridStatus[] = [];

      newRow.length = colCount.value;
      newRow.fill(0);
      gameStatus.value.unshift(newRow);

      clearRowCount++;
    }
  }

  console.log(`此次共消除了${clearRowCount}行`);
};

// 每次下落时触发
const handlerFallMoment = () => {
  const toNextLineResult = fallEl.value.toNextLine(gameStatus.value);

  if (!toNextLineResult) {
    /** 无法再下落 */
    // console.log("此行已落到底");
    // fallElBeforePoint.value = [];
    handlerFallDone();

    // 检查是否有可以消除的行
    checkRowClear();

    // 生成下一个下落元素
    // fallEl.value = createFallElement();
    fallEl.value = nextFallEl.value;
    const isCreateSuccess = fallEl.value.checkCreateSuccess(gameStatus.value);
    // console.log("是否生成成功：", isCreateSuccess);

    if (isCreateSuccess) {
      renderFallEl();
      nextFallEl.value = createFallElement();
      // 执行下一次
      if (!testDown.value) {
        setTimeout(handlerFallMoment, fallInterval.value);
      }
    } else {
      console.log("游戏结束！");
    }
  } else {
    /** 可以下落 */

    // 清除上一次位置
    clearFallEl();

    // 保存位置
    fallElBeforePoint.value = toNextLineResult;

    // 显示最新的位置
    renderFallEl();

    // 执行下一次
    if (!testDown.value) {
      setTimeout(handlerFallMoment, fallInterval.value);
    }
  }
};

// 开始下落
if (!testDown.value) {
  setTimeout(handlerFallMoment, fallInterval.value);
}

// 旋转
const handlerRotate = () => {
  const rotateResult = fallEl.value.rotate(gameStatus.value);

  if (!rotateResult) {
    return;
  }

  clearFallEl();

  fallElBeforePoint.value = rotateResult;

  renderFallEl();
};

// 向左
const handlerToLeft = () => {
  const moveResult = fallEl.value.toLeft(gameStatus.value);

  console.log("向左移动结果：", moveResult);

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
  const moveResult = fallEl.value.toRight(gameStatus.value);

  if (!moveResult) {
    return;
  }

  clearFallEl();

  fallElBeforePoint.value = moveResult;
  // console.log("此次（向右）移动结果：", fallElBeforePoint.value);

  // 显示最新的位置
  renderFallEl();
};
</script>

<style scoped lang="scss">
.game-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;

  .main-game {
    flex: 0 0 auto;
    display: flex;
    padding: 5px;
    width: 100vw;
    box-sizing: border-box;

    .game-container {
      flex: 0 0 auto;
      margin-right: 5px;
      border: 2px solid #000;
      border-bottom: none;
      .game-row {
        display: flex;
        height: 30px;
        box-sizing: border-box;

        .game-grid {
          flex: 0 0 auto;
          width: 30px;
          height: 30px;
          font-size: 12px;
          /* border: 1px solid #000; */
          /* border-left: 1px solid #000; */
          border-right: 2px solid #000;
          border-bottom: 2px solid #000;
          box-sizing: border-box;
          /* &:nth-of-type(1) { */
          /* border-left: none; */
          /* } */
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

    .game-info {
      flex: 1;
      .info-item {
        margin-bottom: 10px;
        .label,
        .value {
          text-align: center;
        }
      }
    }
  }

  .operation-container {
    flex: 1;
    display: flex;

    .operation-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-font {
        font-size: 36px;
      }
    }
  }
}
</style>
