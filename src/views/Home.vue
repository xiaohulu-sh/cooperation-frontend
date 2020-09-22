<template>
  <div>
    <chart :chartData="map1" style="width:500px;height:400px;"></chart>
  </div>
</template>

<script>
import { registerMap, createChinaMap1 } from '@/utils/charts/map'

export default {
  data() {
    return {
      map1: null
    }
  },
  async created() {
    await registerMap(this.echarts)
    this.map1 = createChinaMap1([
      { value: 65, name: '河北' },
      { value: 40, name: '山东' },
      { value: 34, name: '辽宁' },
      { value: 28, name: '天津' },
      { value: 24, name: '吉林' },
      { value: 21, name: '陕西' },
      { value: 21, name: '黑龙江' },
      { value: 20, name: '山西' },
      { value: 19, name: '北京' },
      { value: 16, name: '云南' },
      { value: 16, name: '广东' },
      { value: 13, name: '江苏' },
      { value: 12, name: '河南' },
      { value: 9, name: '甘肃' },
      { value: 8, name: '安徽' },
      { value: 8, name: '浙江' },
      { value: 7, name: '澳门' },
      { value: 6, name: '上海' },
      { value: 6, name: '内蒙古' },
      { value: 6, name: '福建' },
      { value: 5, name: '新疆' },
      { value: 4, name: '四川' },
      { value: 4, name: '广西' },
      { value: 4, name: '湖北' },
      { value: 3, name: '宁夏' },
      { value: 3, name: '海南' },
      { value: 3, name: '贵州' },
      { value: 3, name: '香港' },
      { value: 2, name: '江西' },
      { value: 2, name: '湖南' },
      { value: 2, name: '西藏' },
      { value: 2, name: '重庆' },
      { value: 1, name: '台湾' }
    ])
  }
}
</script>
