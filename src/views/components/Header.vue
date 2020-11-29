<template>
  <header :class="s.header">
    <h1 :class="s.h1">
      <router-link to="/"><img :class="s.logo" src="~@/assets/logo.svg" alt="京东智联云"/></router-link>
      <span :class="s.title">智慧直播营销服务平台</span>
    </h1>
    <a-dropdown placement="bottomRight">
      <div :class="s.user">
        <img :class="s.avatar" src="~@/assets/user.svg" referrerpolicy="no-referrer" @error="onAvatarError" />
        <div>
          <div :class="s.nickname">{{ name || '未知用户名' }}</div>
          <div v-if="brands.length > 0" :class="s.d1">
            <span :class="s.tag1">{{ brandName }}</span>
            <span :class="s.arrow" />
          </div>
        </div>
      </div>
      <div :class="s.menu" slot="overlay">
        <template v-if="brands.length > 0">
          <div :class="s.t1">品牌切换</div>
          <ul :class="s.list1">
            <li v-for="{ id, name, isCurrent } in brands" :key="id" :class="{ [s.checked]: isCurrent }" @click="onSelect({ id, isCurrent })">{{ name }}</li>
          </ul>
        </template>
        <div :class="s.ft1">
          <a :class="s.logoutBtn" href="javascript:;" @click="onLogout">退出登录</a>
        </div>
      </div>
    </a-dropdown>
  </header>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { asyncHelper } from '@/utils/utils'
import { request } from '@/utils/http'

export default {
  computed: { ...mapState('user', ['name', 'brands']), ...mapGetters('user', ['brandName']) },
  methods: {
    ...mapActions('user', ['logout', 'fetchInfo']),
    async onSelect({ id, isCurrent }) {
      if (isCurrent) return
      const data = await asyncHelper(
        request({
          url: 'v1_front_user/setCurrentBrand',
          method: 'POST',
          body: JSON.stringify({
            externalid: id
          })
        })
      )
      if (data === false) return
      this.fetchInfo()
      this.$message.success('品牌切换成功')
    },
    onLogout() {
      this.$confirm({
        title: '退出登录确认',
        content: '确定要退出登录吗？',
        onOk: () => {
          this.logout()
        }
      })
    }
  }
}
</script>

<style lang="less" module="s">
header {
  display: flex;
  align-items: center;
  width: 1200px;
  height: 60px;
  margin: 0 auto;
  padding: 0 0 0 30px;
  background: #fff;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}
.h1 {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: normal;
  margin: 0;
  color: #333;
}
.logo {
  width: 123px;
  height: 20px;
  vertical-align: middle;
  margin-top: -4px;
}
.title {
  display: inline-block;
  border-left: 1px solid #e3e4eb;
  margin-left: 25px;
  padding: 10px 0 10px 23px;
}
.user {
  display: inline-flex;
  align-items: center;
  padding-right: 30px;
  cursor: pointer;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  margin: 0 8px 0 0;
}
.nickname {
  color: #333;
  font-weight: bold;
  margin-bottom: 2px;
}
.d1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tag1 {
  display: inline-block;
  height: 16px;
  line-height: 16px;
  padding: 0 4px;
  background: #d5d2fb;
  border-radius: 2px;
  font-size: 12px;
  color: #736af2;
}
.arrow {
  display: inline-block;
  width: 14px;
  height: 9px;
  overflow: hidden;
  background: url(~@/assets/arrow-down.svg) no-repeat 0 0 / contain;
  margin-left: 12px;
}
.menu {
  background: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.t1 {
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
  font-size: 12px;
  color: #999;
  text-align: left;
}
.list1 {
  border-color: #f4f3fe;
  border-style: solid;
  border-width: 1px 0;
  max-width: 240px;
  max-height: 400px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: #e3e4eb;
  }
  &::-webkit-scrollbar-thumb:vertical {
    height: 3px;
    background-color: #736af2;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:horizontal {
    width: 3px;
    background-color: #736af2;
    border-radius: 3px;
  }
  li {
    position: relative;
    padding: 9px 10px;
    color: #333;
    font-size: 12px;
    line-height: 18px;
    box-shadow: 0px 1px 0px 0px #f4f3fe;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background: #f3f0ff;
    }
    &.checked {
      padding-right: 36px;
      cursor: default;
      &::after {
        content: '';
        position: absolute;
        right: 6px;
        top: 50%;
        margin-top: -12px;
        width: 24px;
        height: 24px;
        background: url(~@/assets/tick.svg) no-repeat 0 0 / contain;
      }
    }
  }
}
.ft1 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
</style>
