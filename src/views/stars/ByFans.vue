<template>
  <div>
    <h2 :class="c.h2a"><i :class="[c.titleIcon, s.fans]"></i>按人群画像筛选红人</h2>
    <filters key="type" :fields="['platform', 'type', 'gender', 'broadcasted', 'area', 'grow', 'thumbs', 'purchase', 'occupation', 'loyalty', 'age', 'pop']"></filters>
  </div>
</template>

<script>
import Filters from './Filters'

export default {
  components: { Filters }
}
</script>

<style module="s">
.fans {
  background-image: url(../../assets/by-fans.svg);
}
</style>
