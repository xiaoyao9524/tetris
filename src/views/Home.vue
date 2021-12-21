<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed } from "vue";
import MyList from "@/components/List.vue";
import Foo from '@/components/Foo.vue';
import Bar from '@/components/Bar.vue';
import Baz from '@/components/Baz.vue';

const router = useRouter();

const count = ref(0);

const RenderComponent = computed(() => {
  const c = count.value % 3;
  switch (c) {
    case 0:
      return Foo;
    case 1:
      return Bar;
    default:
      return Baz;
  }
})

const startGame = () => {
  router.push('/game')
}
</script>

<template>
  <div class="home">
    <MyList />
    <button
      type="button"
      @click="count++"
    >count is: {{ count }}</button>
    <component :is="RenderComponent" />

    <button @click="startGame">开始游戏</button>
  </div>
</template>

<style scoped>
</style>
