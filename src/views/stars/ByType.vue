<template>
  <div>
    <h2 :class="c.h2a"><i :class="[c.titleIcon, s.type]"></i>按创作类型筛选红人</h2>
    <filters key="type" :fields="['platform', 'type', 'area', 'gender', 'age', 'pop']" @update:selected="updateSelected"></filters>
    <StarList :req="listReq" />
  </div>
</template>

<script>
import Filters from './Filters'
import StarList from './StarList'

export default {
  components: { Filters, StarList },
  data() {
    return {
      selected: null
    }
  },
  computed: {
    listReq() {
      const { platform, type, province, city, gender, age, pop } = this.selected || {}
      return {
        url: '/v1_front_search/anchorListByType',
        params: {
          plat_type: platform,
          cate_type: type,
          province: province ? encodeURIComponent(province) : undefined,
          region: city ? encodeURIComponent(city) : undefined,
          gender,
          fans_age: age && age.join(','),
          fansnum: pop && [pop[0] || 0, pop[1] || 0].join('-')
        }
      }
    }
  },
  methods: {
    updateSelected(selected) {
      this.selected = selected
    }
  }
}
</script>

<style module="s">
.type {
  background-image: url(~@/assets/by-type.svg);
}
</style>
