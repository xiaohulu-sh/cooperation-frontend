<template>
  <main :class="c.main1">
    <SideNav></SideNav>
    <router-view :class="c.content"></router-view>
    <FixedNav></FixedNav>
  </main>
</template>

<script>
import SideNav from '@/components/SideNav'

export default {
  components: { SideNav }
}
</script>
