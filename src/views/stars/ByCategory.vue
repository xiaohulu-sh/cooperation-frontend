<template>
  <div>
    <h2><i :class="$style.iconCategory"></i>按带货品类筛选红人</h2>
    <filters key="category" :fields="['platform', 'category', 'gender', 'broadcasted', 'thumbs', 'area', 'pop']"></filters>
  </div>
</template>

<script>
import Filters from './Filters.vue'

export default {
  components: { Filters }
}
</script>

<style src="@/styles/common.module.less" lang="less" module></style>
