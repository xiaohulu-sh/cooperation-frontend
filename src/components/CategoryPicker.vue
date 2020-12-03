<template>
  <div>
    <radio-list :list="list" :value="value1" @input="onValue1Input"></radio-list>
    <!-- <div :class="s.search">
      <input type="text" placeholder="输入你查询的分类" />
      <button>搜索</button>
    </div>-->
    <radio-list :class="s.subList" :showAllBtn="false" :list="subList1" :value="value2" @input="onValue2Input" />
    <radio-list :class="s.subList" :showAllBtn="false" :list="subList2" :value="value3" @input="onValue3Input" />
  </div>
</template>

<script>
import RadioList from './RadioList'

export default {
  components: { RadioList },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      default: ''
    }
  },
  data() {
    return {
      value1: '',
      subList1: [],
      value2: '',
      subList2: [],
      value3: ''
    }
  },
  watch: {
    list() {
      this.value1 = ''
      this.subList1 = []
      this.value2 = ''
      this.subList2 = []
      this.value3 = ''
    }
  },
  methods: {
    onValue1Input(value, item) {
      this.value1 = value
      let subList1 = item.children || []
      if (subList1.length === 1 && subList1[0].value === value) {
        subList1 = []
      }
      if (subList1.length !== 0 && subList1[0].value !== value) {
        subList1.unshift({ value, label: '全部' })
      }
      this.subList1 = subList1
      const subItem = subList1[0]
      if (subItem) {
        this.value2 = subItem.value
        this.$emit('input', subItem.value, subItem)
      } else {
        this.value2 = ''
        this.$emit('input', value, item)
      }
      this.subList2 = []
      this.value3 = ''
    },
    onValue2Input(value, item) {
      this.value2 = value
      let subList2 = item.children || []
      if (subList2.length === 1 && subList2[0].value === value) {
        subList2 = []
      }
      if (subList2.length !== 0 && subList2[0].value !== value) {
        subList2.unshift({ value, label: '全部' })
      }
      this.subList2 = subList2
      const subItem = subList2[0]
      if (subItem) {
        this.value3 = subItem.value
        this.$emit('input', subItem.value, subItem)
      } else {
        this.value3 = ''
        this.$emit('input', value, item)
      }
    },
    onValue3Input(value, item) {
      this.value3 = value
      this.$emit('input', value, item)
    }
  }
}
</script>

<style lang="less" module="s">
/*
.search {
  display: inline-block;
  position: relative;
  input {
    width: 170px;
    height: 26px;
    padding: 0 50px 0 5px;
    border: 1px solid #e3e4eb;
    outline: none;
    transition: all 0.3s;
    &::placeholder {
      color: #aaa;
      font-size: 13px;
    }
    &:hover,
    &:focus {
      border-color: #736af2;
    }
  }
  button {
    position: absolute;
    right: 3px;
    top: 3px;
    width: 44px;
    height: 20px;
    line-height: 1;
    background: #736af2;
    color: #fff;
    border: 0;
    border-radius: 2px;
    transition: all 0.3s;
    &:hover,
    &:focus {
      box-shadow: 0 0 5px #736af2;
    }
  }
}
*/
.subList {
  display: block;
  margin-top: 10px;
}
</style>
