<template>
  <div :class="s.sortBtns">
    <button v-for="item in list" :key="item.value" :class="{ [s.btnActive]: item.value === sortKey }" @click="onBtnClick(item)">
      {{ item.label }}
      <a-icon type="caret-up" :class="{ [s.sortActive]: item.value === sortKey && sortValue === asc }" @click="onSortClick(item, asc)" />
      <a-icon type="caret-down" :class="{ [s.sortActive]: item.value === sortKey && sortValue === desc }" @click="onSortClick(item, desc)" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    asc: {
      type: [String, Number],
      default: 1
    },
    desc: {
      type: [String, Number],
      default: 2
    },
    sortKey: [String, Number],
    sortValue: [String, Number]
  },
  methods: {
    onBtnClick({ value }) {
      if (this._sortClicked) {
        this._sortClicked = false
        return
      }
      let sortValue
      if (this.sortKey === value) {
        sortValue = this.sortValue === this.desc ? this.asc : this.desc
      } else {
        sortValue = this.desc
      }
      this.$emit('update:sortKey', value)
      this.$emit('update:sortValue', sortValue)
    },
    onSortClick({ value }, sortValue) {
      this.$emit('update:sortKey', value)
      this.$emit('update:sortValue', sortValue)
      this._sortClicked = true
    }
  }
}
</script>

<style lang="less" module="s">
.sortBtns {
  display: inline-block;
  button {
    position: relative;
    height: 28px;
    padding: 0 25px 0 15px;
    background-color: #e9ebf1;
    border: 1px solid #e3e4eb;
    color: #333;
    transition: all 0.3s;
    &:first-child {
      border-radius: 2px 0 0 2px;
    }
    &:last-child {
      border-radius: 0 2px 2px 0;
    }
    &:not(:first-child) {
      margin-left: -1px;
    }
    &:hover {
      background-color: #e9ebf1;
      border-color: #e3e4eb;
      color: #736af2;
    }
  }
  :global {
    .anticon {
      position: absolute;
      right: 10px;
      color: #fff;
      transition: all 0.3s;
      &:hover {
        color: #736af2;
      }
    }
    .anticon-caret-up {
      top: 2px;
    }
    .anticon-caret-down {
      bottom: 2px;
    }
  }
  .btnActive {
    z-index: 1;
    &,
    &:hover {
      background-color: #736af2;
      border-color: #736af2;
      color: #fff;
    }
    :global {
      .anticon {
        color: #9d97f6;
        &:hover {
          color: #fff;
        }
      }
    }
    .sortActive {
      color: #fff;
    }
  }
}
</style>
