<template>
  <div class="navibar-right">
    <el-button size="small" icon="Refresh" circle @click="refresh"></el-button>
    <el-button
      size="small"
      icon="FullScreen"
      circle
      @click="fullScreen"
    ></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img
      :src="userStore.avatar"
      style="width: 24px; height: 24px; margin: 0px 15px"
    />
    <el-dropdown style="margin-right: 10px">
      {{ userStore.username }}
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting.ts'
import useUserStore from '@/store/modules/user.ts'
import { useRouter, useRoute } from 'vue-router'
let LayoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
const refresh = () => {
  LayoutSettingStore.refresh = !LayoutSettingStore.refresh
}
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = async () => {
  await userStore.userLogout()
  await $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style scoped lang="scss"></style>
