<template>
  <div class="foo">
    im'Foo
    <input v-model="val" @change="handlerChange" type="text" />
    <button @click="handlerConfirm">确定</button>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue'
  const val = ref('hello')
  
  const emit = defineEmits<{
  (e: 'confirm', value: string): void;
  (e: 'change', value: string): void;
}>()

  const handlerChange = (e: Event) => {
    console.log('change: ', e);
    emit('change', val.value)
  }

  const handlerConfirm = () => {
    emit('confirm', val.value);
  }
</script>

<style>

</style>