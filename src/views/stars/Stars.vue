<template>
  <main :class="$common.main1">
    <SideNav></SideNav>
    <router-view :class="$common.content"></router-view>
    <FixedNav></FixedNav>
  </main>
</template>

<script>
import SideNav from '@/components/SideNav'

export default {
  components: { SideNav }
}
</script>
