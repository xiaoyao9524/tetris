<template>
  <div class="grid-preview">
    
    <div class="grid-container">
      <div 
        class="grid-row"
        v-for="(row, rowIndex) in gridStatus"
        :key="rowIndex"
      >
        <div 
          class="grid-col"
          v-for="(col, colIndex) in row"
          :key="colIndex"
          :class="{
            'fill': col === 1
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FallGrid } from '../utils/grid/GridType';

interface Props {
  grid: FallGrid
}

const props = defineProps<Props>();

const gridStatus = ref<number[][]>(props.grid.getPreview())

</script>

<style scoped lang="scss">
.grid-preview {
  display: flex;
  justify-content: center;
  .grid-container {
    flex: 0 0 auto;
    .grid-row {
      display: flex;
      border-top: 1px solid #000;
      border-left: 1px solid #000;
      &:nth-last-of-type(1) {
        border-bottom: 1px solid #000;
      }
      .grid-col {
        flex: 0 0 auto;
        width: 16px;
        height: 16px;
        border-right: 1px solid #000;
        /* border-bottom: 1px solid #000; */
        &.fill {
          background: #409eff;
        }
      }
    }
  }
}
</style>
