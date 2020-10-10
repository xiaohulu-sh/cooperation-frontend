<template>
  <div>
    <h2><i :class="$style.iconFans"></i>按人群画像筛选红人</h2>
    <filters key="type" :fields="['platform', 'type', 'gender', 'broadcasted', 'area', 'grow', 'thumbs', 'purchase', 'occupation', 'loyalty', 'age', 'pop']"></filters>
  </div>
</template>

<script>
import Filters from './Filters'

export default {
  components: { Filters }
}
</script>

<style src="@/styles/common.module.less" lang="less" module></style>
