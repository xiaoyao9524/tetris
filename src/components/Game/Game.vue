<template>
  <div class="game-page" @touchstart="handlerTouchStart" @touchend="handlerTouchEnd">
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
          <p class="label">历史高分</p>
          <p class="value">{{ highScore }}</p>
        </div>

        <div class="info-item">
          <p class="label">分数</p>
          <p class="value">{{ score }}</p>
        </div>

        <div class="info-item">
          <p class="label">下一个</p>
          <div class="next-fall">
            <GridPreview :grid="nextFallEl" />
          </div>
        </div>

        <!-- <div>
          <button @click="reStart">重新开始</button>
        </div> -->

        <div>
          <!-- <button @click="lookGameStatus">查看游戏状态</button> -->
          <button v-if="testDown" @click="handlerFallMoment">下落一行</button>
        </div>
      </div>
    </div>

    <div class="operation-container" v-if="false">
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

    <div class="game-over-container" v-show="isGameOver">
      <div class="content">
        <h3 class="title">游戏结束</h3>
        <p class="score-info">
          {{ score > highScore ? "新纪录" : "本次得分" }}: {{ score }}
        </p>

        <div class="restart-btn" @click="reStart">再来一局</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, reactive, onMounted, onBeforeUnmount, computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
// util
import { createGameStatus, createFallElement } from "./utils/gameUtils";

// type
import type { GameStatus, GridStatus } from "./types";
import type { GridPoint } from "./utils/grid/GridType";

// game-util
import { FallGrid } from "./utils/grid/GridType";

// component
import GridPreview from "./components/GridPreview.vue";

const emit = defineEmits<{
  (e: "scoreChange", value: number): void;
}>();

const store = useStore(key);

const highScore = computed(() => store.state.game.highScore);

const score = ref(0);

const isGameOver = ref(false);

// 测试下落逻辑
const testDown = ref(false);

// 游戏状态
const gameStatus = ref<GameStatus>([]);

/*
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
*/

// 行数和列数
const rowCount = ref(20);
const colCount = ref(10);

// 下落间隔(ms)
const fallInterval = ref(400);

// 初始化游戏状态
gameStatus.value = createGameStatus(rowCount.value, colCount.value);

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

const reStart = () => {
  if (score.value > highScore.value) {
    store.commit('game/setHighScore', score.value);
  }
  score.value = 0;
  gameStatus.value = createGameStatus(rowCount.value, colCount.value);

  fallEl.value = createFallElement();
  fallElBeforePoint.value = fallEl.value.getCurrentPosition();
  nextFallEl.value = createFallElement();

  isGameOver.value = false;

  renderFallEl();

  // 开始下落
  if (!testDown.value) {
    setTimeout(handlerFallMoment, fallInterval.value);
  }
};

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
  // 消除的行数
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
  
  const newScore = score.value + (clearRowCount === 4 ? 50 : clearRowCount * 10);

  score.value = newScore;

  emit("scoreChange", newScore);
};

const handlerGameOver = () => {
  isGameOver.value = true;
};

// 每次下落时触发
const handlerFallMoment = () => {
  const toNextLineResult = fallEl.value.toNextLine(gameStatus.value);

  if (!toNextLineResult) {
    /** 无法再下落 */
    handlerFallDone();

    // 检查是否有可以消除的行
    checkRowClear();

    // 生成下一个下落元素
    fallEl.value = nextFallEl.value;
    const isCreateSuccess = fallEl.value.checkCreateSuccess(gameStatus.value);

    if (isCreateSuccess) {
      renderFallEl();
      nextFallEl.value = createFallElement();
      // 执行下一次
      if (!testDown.value) {
        setTimeout(handlerFallMoment, fallInterval.value);
      }
    } else {
      // 游戏结束
      handlerGameOver();
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

  if (!moveResult) {
    return;
  }

  clearFallEl();

  fallElBeforePoint.value = moveResult;

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

  // 显示最新的位置
  renderFallEl();
};

// 向下
const handlerToBottom = () => {
  const { points } = fallEl.value.toBottom(gameStatus.value);

  clearFallEl();

  fallElBeforePoint.value = points;

  // 显示最新的位置
  renderFallEl();
};

// 手势操作
const isTouch = ref(false);

const touchPoint = reactive({
  clientX: 0,
  clientY: 0,
});

const handlerTouchStart = (e: TouchEvent) => {
  isTouch.value = true;

  const { touches } = e;

  if (!touches.length) {
    return;
  }

  const touche = touches[0];

  const { clientX, clientY } = touche;

  touchPoint.clientX = clientX;
  touchPoint.clientY = clientY;
};

const handlerTouchEnd = (e: TouchEvent) => {
  isTouch.value = false;

  const { changedTouches } = e;

  if (!changedTouches.length) {
    return;
  }

  const touche = changedTouches[0];

  const { clientX, clientY } = touche;

  const horizonMoveDistance = clientX - touchPoint.clientX;
  const verticalMoveDistance = clientY - touchPoint.clientY;

  const isHorizonMove = Math.abs(horizonMoveDistance) > Math.abs(verticalMoveDistance);

  if (isHorizonMove) {
    if (Math.abs(horizonMoveDistance) < 30) {
      return;
    }
    horizonMoveDistance < 0 ? handlerToLeft() : handlerToRight();
  } else {
    if (Math.abs(verticalMoveDistance) < 30) {
      return;
    }
    verticalMoveDistance < 0 ? handlerRotate() : handlerToBottom();
  }
};

// 键盘操作
/**
  ArrowUp
  ArrowDown
  ArrowLeft
  ArrowRight
*/

const keyDownHandler = (e: KeyboardEvent) => {
  switch (e.key) {
    case "ArrowUp":
      handlerRotate();
      break;
    case "ArrowLeft":
      handlerToLeft();
      break;
    case "ArrowRight":
      handlerToRight();
      break;
    case "ArrowDown":
      handlerToBottom();
  }
};

onMounted(() => {
  document.addEventListener("keydown", keyDownHandler);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyDownHandler);
});
</script>

<style scoped lang="scss">
.game-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  height: 100vh;

  .main-game {
    margin: 0 auto;
    flex: 0 0 auto;
    display: flex;
    padding: 5px;
    /* padding: 0 0 0 5px; */
    width: 100vw;
    max-width: 375px;
    box-sizing: border-box;

    .game-container {
      flex: 0 0 auto;
      /* margin-right: 5px; */
      border: 1px solid #000;
      border-bottom: none;
      .game-row {
        display: flex;
        height: 26px;
        box-sizing: border-box;

        .game-grid {
          flex: 0 0 auto;
          width: 26px;
          height: 26px;
          font-size: 12px;
          /* border: 1px solid #000; */
          /* border-left: 1px solid #000; */
          border-right: 1px solid #000;
          border-bottom: 1px solid #000;
          box-sizing: border-box;
          &:nth-of-type(1) {
            border-left: none;
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

  .game-over-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);

    .content {
      text-align: center;
      width: 300px;
      height: 280px;
      background: #fff;

      .title {
        font-size: 32px;
      }

      .score-info {
        font-size: 18px;
      }

      .restart-btn {
        margin-top: 56px;
        font-size: 24px;
      }
    }
  }
}
</style>
