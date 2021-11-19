<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';

const store = useStore(key);

const count = computed(() => store.state.count.count);
const increment = () => store.commit('count/increment');
</script>

<template>
  <div class="about">
    <h3>关于我</h3>
    <p>count: {{count}}<button @click="increment">+</button></p>
  </div>
</template>

<style scoped>

</style>
