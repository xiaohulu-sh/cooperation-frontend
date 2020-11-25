<template>
  <div :class="s.extraList">
    <span>总粉丝数 {{ formatNumber(info.fans, { empty: '--' }) }}</span>
    <span>30天增粉 {{ formatNumber(info.newFans, { empty: '--' }) }}</span>
    <span>总点赞数 {{ formatNumber(info.likes, { empty: '--' }) }}</span>
    <span>总作品数 {{ formatNumber(info.videos, { empty: '--' }) }}</span>
  </div>
</template>

<script>
import { formatNumber } from '@/utils/utils'
export default {
  props: {
    info: Object
  },
  methods: {
    formatNumber
  }
}
</script>

<style lang="less" module="s">
.extraList {
  width: 100%;
  border-top: 1px solid #e3e4eb;
  padding: 14px 20px 15px;
  span {
    margin-right: 30px;
  }
}
</style>
