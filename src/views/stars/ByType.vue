<template>
  <div>
    <h2><i :class="$style.iconType"></i>按创作类型筛选红人</h2>
    <filters key="type" :fields="['platform', 'type', 'area', 'frequency', 'broadcasted', 'grow', 'gender', 'thumbs', 'age', 'pop']"></filters>
  </div>
</template>

<script>
import Filters from './Filters.vue'

export default {
  components: { Filters }
}
</script>

<style src="@/styles/common.module.less" lang="less" module></style>
