<template>
  <ul v-if="dataList.length > 0" :class="s.list">
    <li v-for="item in dataList" :key="String(item.value)" :class="{ [s.active]: (value.length === 0 && item.value === allValue) || value.includes(item.value) }" @click="itemClick(item)">
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
      type: Array,
      default() {
        return []
      }
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
      if (item.value === this.allValue) {
        this.$emit('input', [], item)
        return
      }
      const value = [...this.value]
      const index = value.indexOf(item.value)
      if (index === -1) {
        value.push(item.value)
      } else {
        value.splice(index, 1)
      }
      this.$emit('input', value, item)
    }
  }
}
</script>

<style lang="less" module="s">
.list {
  display: inline-block;
  font-size: 14px;
  line-height: 22px;

  li {
    display: inline-block;
    padding: 0 6px;
    margin: 0 5px 5px 0;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      color: #736af2;
    }

    &.active {
      background: #736af2;
      border-radius: 2px;
      color: #fff;
    }
  }
}
</style>
