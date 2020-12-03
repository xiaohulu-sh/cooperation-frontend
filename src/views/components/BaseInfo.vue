<template>
  <component :is="tagName" :class="s.container">
    <img :class="s.avatar" :src="info.avatar" referrerpolicy="no-referrer" @error="onAvatarError" />
    <div :class="s.txtInfo">
      <div :class="[s.r1, c[info.gender]]">
        <span :class="[c.ellipsis1, s.name]" :title="info.name">{{ info.name }}</span>
      </div>
      <div :class="s.r2">
        <span :class="s.tag">{{ info.plat }}</span>
        <span :class="s.location" :title="info.location">{{ info.location }}</span>
      </div>
    </div>
  </component>
</template>

<script>
export default {
  props: {
    info: Object,
    tagName: {
      type: String,
      default: 'div'
    }
  }
}
</script>

<style lang="less" module="s">
.container {
  display: flex;
  align-items: center;
}
.avatar {
  position: relative;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
}
.txtInfo {
  flex: 1;
}
.r1::after {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-left: 5px;
}
.r2 {
  margin-top: 5px;
}
.name {
  display: inline-block;
  max-width: 180px;
  font-weight: 600;
  color: #333;
  vertical-align: middle;
}
.tag {
  display: inline-block;
  background: #fff5e9;
  border-radius: 2px;
  border: 1px solid #ffc349;
  color: #ff7b00;
  padding: 0 4px;
  line-height: 18px;
}
.location {
  display: inline-block;
  vertical-align: middle;
  margin: -2px 0 0 5px;
  max-width: 168px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
