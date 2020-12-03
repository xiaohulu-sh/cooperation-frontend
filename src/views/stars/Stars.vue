<template>
  <main :class="c.main1">
    <SideNav></SideNav>
    <router-view :class="c.content1"></router-view>
    <FixedNav></FixedNav>
  </main>
</template>
