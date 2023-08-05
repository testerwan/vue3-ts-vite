<template>
  <div class="navibar-left">
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
      >
        <div>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span style="margin: 0px 2px">{{ item.meta.title }}</span>
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting.ts'
import { useRoute } from 'vue-router'
let LayoutSettingStore = useLayoutSettingStore()
let $route = useRoute()
const changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}
const handle = () => {}
</script>

<style scoped lang="scss"></style>
