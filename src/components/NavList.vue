<template>
  <ul :class="$style.list">
    <li v-for="{ key, text, svg } in list" :key="key" :class="{ [$style.item]: true, [$style.active]: key === active }" @click="onClick(key)"><i :class="$style.icon" v-html="svg"></i>{{ text }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array,
    active: String
  },
  methods: {
    onClick(key) {
      this.$emit('itemClick', key)
    }
  }
}
</script>

<style lang="less" module>
.list {
  width: 160px;
  font-size: 16px;
  background: #fff;
  padding: 11px 0 0;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}
.item {
  position: relative;
  height: 36px;
  line-height: 36px;
  padding-left: 13px;
  margin-bottom: 11px;
  transition: all 0.3s;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-left: 3px solid #736af2;
    transform: scaleY(0);
    opacity: 0;
    transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  &:hover {
    color: #736af2;
  }
}
.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  overflow: hidden;
  vertical-align: middle;
  margin: -4px 10px 0 0;
  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.active {
  font-weight: bold;
  color: #736af2;
  background: #f7f6ff;
  cursor: default;
  &::after {
    transform: scaleY(1);
    opacity: 1;
    transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
</style>
