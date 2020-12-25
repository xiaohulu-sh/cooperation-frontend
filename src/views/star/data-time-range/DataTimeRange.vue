<template>
  <ul :class="[c.dataTabs, c.dataTab1]">
    <li v-for="{ value, label } in presetList" :key="value" :class="{ [c.dataTabActive]: value === preset }" @click="onPresetClick(value)">{{ label }}</li>
    <a-dropdown v-if="dayList.length > 0">
      <li :class="{ [c.dataTabActive]: day !== null }">{{ day || '按日期选择' }}</li>
      <a-menu slot="overlay" style="padding:10px 0">
        <a-menu-item v-for="{ value } in dayList" :key="value" :class="s.dropdownItem" @click="onTimeSelect(value)">{{ value }}</a-menu-item>
      </a-menu>
    </a-dropdown>
  </ul>
</template>

<script>
export default {
  props: {
    preset: [Number, String],
    presetList: Array,
    day: String,
    dayList: Array
  },
  methods: {
    onPresetClick(value) {
      this.$emit('update:preset', value)
      this.$emit('update:day', null)
    },
    onTimeSelect(value) {
      this.$emit('update:preset', null)
      this.$emit('update:day', value)
    }
  }
}
</script>

<style module="s">
.dropdownItem {
  line-height: 40px;
  text-align: center;
  padding: 0;
}
</style>
