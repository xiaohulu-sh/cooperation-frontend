<template>
  <div>
    <h2><i :class="[$common.titleIcon, $style.type]"></i>按创作类型筛选红人</h2>
    <filters key="type" :fields="['platform', 'type', 'area', 'frequency', 'broadcasted', 'grow', 'gender', 'thumbs', 'age', 'pop']"></filters>
    <star-list></star-list>
  </div>
</template>

<script>
import Filters from './Filters'
import StarList from './StarList'

export default {
  components: { Filters, StarList }
}
</script>

<style module>
.type {
  background-image: url(../../assets/by-type.svg);
}
</style>
