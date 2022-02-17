<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from 'vuex';
import { key } from '@/store';
// import MyList from "@/components/List.vue";
// import Foo from "@/components/Foo.vue";
// import Bar from "@/components/Bar.vue";
// import Baz from "@/components/Baz.vue";

const router = useRouter();

const store = useStore(key);

// const count = ref(0);

// const RenderComponent = computed(() => {
//   const c = count.value % 3;
//   switch (c) {
//     case 0:
//       return Foo;
//     case 1:
//       return Bar;
//     default:
//       return Baz;
//   }
// })

// const localHighScore = localStorage.getItem('height-score');

// const highScore = ref(localHighScore || 0);
const highScore = computed(() => store.state.game.highScore);

const startGame = () => {
  router.push("/play");
};

// const handlerChange = (val: string) => {
//   console.log("change触发：", val);
// };

// const handlerConfirm = (val: string) => {
//   console.log("confirm触发：", val);
// };
</script>

<template>
  <div class="home">
    <div class="menu-container">
      <h3 class="title">俄罗斯方块</h3>

      <p class="hight-score">历史最高：{{highScore}}</p>

      <div class="btn-item" @click="startGame">开始游戏</div>
    </div>

    <!-- <MyList />
    <button
      type="button"
      @click="count++"
    >count is: {{ count }}</button> -->
    <!-- <component :is="RenderComponent" /> -->

    <!-- <Foo @change="handlerChange" @confirm="handlerConfirm" /> -->
  </div>
</template>

<style scoped lang="scss">
.home {
  margin-top: 80px;
  /* display: flex;
  align-items: center;
  height: 100vh; */
  .menu-container {
    /* flex: 1; */
    .title {
      margin: 0 0 20px 0;
      text-align: center;
      font-size: 28px;
    }
    .hight-score {
      text-align: center;
      font-size: 14px;
    }

    .btn-item {
      margin-top: 200px;
      text-align: center;
      font-size: 24px;
    }
  }
}
</style>
