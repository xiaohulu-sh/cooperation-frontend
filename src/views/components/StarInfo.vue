<template>
  <component :is="tagName" style="display:flex">
    <div :class="[s.avatar, c[info.gender], s.gender]">
      <img :src="info.avatar" referrerpolicy="no-referrer" @error="onAvatarError" />
    </div>
    <div :class="s.txtInfo">
      <div :class="s.r1">
        <span :class="[c.tag1, s.tag]">{{ info.plat }}</span>
        <span :class="[c.ellipsis1, s.name]" :title="info.name">{{ info.name }}</span>
        <span v-if="info.guild" :class="[c.tag3, s.tag]">{{ info.guild }}</span>
      </div>
      <div :class="s.r2">
        <span v-for="tag in info.tags" :key="tag" :class="[c.tag2, s.tag]">{{ tag }}</span>
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
