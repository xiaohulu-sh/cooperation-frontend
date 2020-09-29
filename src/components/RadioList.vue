<template>
  <ul v-if="dataList.length > 0" class="radio-list">
    <li v-for="item in dataList" :key="String(item.value)" :class="{ 'radio-active': isEqual(value, item.value) }" @click="itemClick(item)">
      {{ item.label }}
    </li>
  </ul>
</template>

<script>
import isEqual from 'lodash/isEqual'

export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      default: ''
    },
    showAllBtn: {
      type: Boolean,
      default: true
    },
    allValue: {
      default: ''
    }
  },
  computed: {
    dataList() {
      if (this.showAllBtn) {
        return [{ label: '全部', value: this.allValue }, ...this.list]
      }
      return this.list
    }
  },
  methods: {
    isEqual,
    itemClick(item) {
      this.$emit('input', item.value, item)
    }
  }
}
</script>

<style lang="less" scoped>
.radio-list {
  display: inline-block;
  font-size: 14px;
  line-height: 22px;

  li {
    display: inline-block;
    padding: 0 6px;
    margin: 0 10px 5px 0;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      color: #736af2;
    }

    &.radio-active {
      background: #736af2;
      border-radius: 2px;
      color: #fff;
      cursor: default;
    }
  }
}
</style>
