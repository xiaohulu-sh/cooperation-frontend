<template>
  <div :class="[c.content, s.content]">
    <h2 :class="c.h2b">基础信息</h2>
    <div :class="s.user">
      <img :class="s.avatar" src="~@/assets/user.svg" referrerpolicy="no-referrer" @error="onAvatarError" />
      <div>
        <div :class="s.name">{{ name }}</div>
        <span :class="s.tag1">京东智联云版</span>
      </div>
    </div>
    <div :class="s.version">软件系统版本：{{ version }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      version: process.env.VUE_APP_VERSION || 'v0.0.1'
    }
  },
  computed: mapState('user', ['name'])
}
</script>

<style lang="less" module="s">
.content {
  position: relative;
  min-height: 456px;
}
.user {
  display: flex;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border: 1px solid #f2f3f4;
  border-radius: 50%;
  margin-right: 10px;
}
.name {
  color: #333;
  font-size: 16px;
  font-weight: bold;
}
.tag1 {
  display: inline-block;
  padding: 0 5px;
  background: #d5d2fb;
  border-radius: 2px;
  color: #736af2;
  font-size: 12px;
}
.version {
  position: absolute;
  right: 30px;
  top: 40px;
  font-size: 12px;
  color: #333;
}
</style>
