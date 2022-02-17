<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted } from "vue";
import { useStore } from 'vuex';
import { key } from '@/store';

const store = useStore(key);

const localHighScore = localStorage.getItem('high-score');

store.commit('game/setHighScore', localHighScore ? Number(localHighScore) : 0);

// 阻止IOS橡皮筋效果
onMounted(() => {
  document.body.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
    },
    { passive: false }
  ); // passive 参数不能省略，用来兼容ios和android
});
</script>

<template>
  <router-view />
</template>

<style></style>
