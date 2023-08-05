<template>
  <div class="navibar">
    <div class="navibar-left">
      <Breadcrumb />
    </div>
    <div class="navibar-left">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/layout/navbar/Breadcrumb.vue'
import Setting from '@/layout/navbar/Setting.vue'
</script>
<script lang="ts">
export default {
  name: 'Navbar',
}
</script>

<style lang="scss" scoped>
.navibar {
  width: 100%;
  height: 100%;
  display: flex;
  background: white;
  justify-content: space-between;
  background-image: linear-gradient(
    to right,
    rgb(232, 223, 223),
    rgb(201, 178, 178),
    rgb(197, 165, 165)
  );
  .navibar-left {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
  .navibar-right {
    display: flex;
    align-items: center;
  }
}
</style>
