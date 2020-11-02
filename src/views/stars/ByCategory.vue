<template>
  <div>
    <h2 :class="c.h2a"><i :class="[c.titleIcon, s.category]"></i>按带货品类筛选红人</h2>
    <filters key="category" :fields="['platform', 'category', 'gender', 'broadcasted', 'thumbs', 'area', 'pop']"></filters>
  </div>
</template>

<script>
import Filters from './Filters'

export default {
  components: { Filters }
}
</script>

<style module="s">
.category {
  background-image: url(~@/assets/by-category.svg);
}
</style>
