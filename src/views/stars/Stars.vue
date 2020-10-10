<template>
  <main :class="$style.main">
    <SideNav></SideNav>
    <router-view :class="$style.content"></router-view>
  </main>
</template>

<script>
import SideNav from '@/components/SideNav'

export default {
  components: { SideNav }
}
</script>

<style src="@/styles/common.module.less" lang="less" module></style>
