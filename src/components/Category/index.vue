<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select
            v-model="categoryStore.c1Id"
            @change="handleSelect"
            :disabled="scene == 1 ? true : false"
          >
            <el-option
              v-for="(C1, index) in categoryStore.c1Arr"
              :key="C1.id"
              :label="C1.name"
              :value="C1.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="categoryStore.c2Id"
            @change="handleSelect2"
            :disabled="scene == 1 ? true : false"
          >
            <el-option
              v-for="(C2, index) in categoryStore.c2Arr"
              :key="C2.id"
              :label="C2.name"
              :value="C2.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select
            v-model="categoryStore.c3Id"
            :disabled="scene == 1 ? true : false"
          >
            <el-option
              v-for="(C3, index) in categoryStore.c3Arr"
              :key="C3.id"
              :label="C3.name"
              :value="C3.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CategoryStore from '@/store/modules/category.ts'
let categoryStore = CategoryStore()
onMounted(async () => {
  getC1()
})
const getC1 = () => {
  categoryStore.getC1()
}
const handleSelect = () => {
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  categoryStore.getC2()
}
const handleSelect2 = () => {
  categoryStore.c3Id = ''
  categoryStore.getC3()
}
defineProps(['scene'])
</script>

<style scoped></style>
