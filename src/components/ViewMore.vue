<template>
  <component :is="tag" :class="{ [s.container]: true, [s.collapsed]: collapsed }" :style="{ maxHeight: collapsed ? maxHeight + 'px' : null }">
    <slot></slot>
    <button v-if="showMoreBtn" :class="s.moreBtn" @click="collapsed = !collapsed">{{ collapsed ? '更多' : '收起' }}</button>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    maxHeight: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      collapsed: true,
      showMoreBtn: false
    }
  },
  mounted() {
    if (this.$el.scrollHeight > this.$el.offsetHeight) {
      this.showMoreBtn = true
    }
  }
}
</script>

<style lang="less" module="s">
.container {
  position: relative;
  padding-right: 50px;
}
.moreBtn {
  position: absolute;
  right: 0;
  bottom: 4px;
  height: 24px;
  font-size: 12px;
  border: 1px solid #e9ebf1;
  border-radius: 2px;
  background: #fff;
  transition: all 0.3s;
  &::after {
    content: '';
    display: inline-block;
    vertical-align: middle;
    margin: -2px 0 0 2px;
    width: 0;
    height: 0;
    border: 0;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: 6px solid #e6e7eb;
    transition: all 0.3s;
  }
  &:hover,
  &:focus {
    border-color: #a399ff;
    color: #736af2;
    &::after {
      border-bottom-color: #a399ff;
    }
  }
}
.collapsed {
  overflow: hidden;
  .moreBtn {
    &::after {
      margin-top: -1px;
      border: 0;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      border-top: 6px solid #d5d6da;
    }
    &:hover,
    &:focus {
      &::after {
        border-top-color: #a399ff;
      }
    }
  }
}
</style>
