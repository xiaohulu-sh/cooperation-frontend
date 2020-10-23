<template>
  <component :is="tagName" style="display:flex">
    <div :class="[s.avatar, c.male, s.gender]">
      <img src="https://xhlcdn.xiaohulu.com/avatar/202/188888880" referrerpolicy="no-referrer" @error="onAvatarError" />
    </div>
    <div :class="s.txtInfo">
      <div :class="s.r1">
        <span :class="[c.tag1, s.tag]">快手</span>
        <span :class="[c.ellipsis1, s.name]">一条小团团OvO</span>
        <span :class="[c.tag3, s.tag]">新动传媒</span>
      </div>
      <div :class="s.r2">
        <span :class="[c.tag2, s.tag]">旅行</span>
        <span :class="[c.tag2, s.tag]">美食</span>
        <span :class="[c.tag2, s.tag]">科技数码</span>
      </div>
    </div>
  </component>
</template>

<script>
export default {
  props: {
    tagName: {
      type: String,
      default: 'div'
    }
  }
}
</script>

<style lang="less" module="s">
.avatar {
  position: relative;
  width: 56px;
  height: 56px;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.gender::after {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
}
.txtInfo {
  flex: 1;
}
.r1 {
  display: flex;
  align-items: center;
}
.r2 {
  margin-top: 10px;
}
.name {
  max-width: 148px;
  font-weight: 600;
  color: #333;
  margin-right: 10px;
}
.tag {
  margin-right: 10px;
}
</style>
