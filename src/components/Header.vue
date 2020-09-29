<template>
  <header :class="$style.header">
    <h1 :class="$style.h1">
      <router-link to="/"><img :class="$style.logo" src="../assets/logo.svg" alt="京东智联云"/></router-link>
      <span :class="$style.title">智慧直播营销服务平台</span>
    </h1>
    <a-dropdown>
      <div :class="$style.user">
        <img :class="$style.avatar" src="https://via.placeholder.com/120/00ff00/ffffff?text=avatar" />
        <span :class="$style.nickname">拉尔夫</span>
        <a-icon :class="$style.arrow" type="down" />
      </div>
      <a-menu :class="$style.menu" slot="overlay">
        <a-menu-item>
          <a href="javascript:;">退出登录</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </header>
</template>

<style lang="less" module>
header {
  display: flex;
  align-items: center;
  width: 1200px;
  height: 60px;
  margin: 0 auto;
  padding: 0 30px;
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
  display: inline-block;
  cursor: pointer;
}
.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  vertical-align: middle;
  margin: 0 5px 0 0;
}
.nickname {
  color: #736af2;
}
.arrow {
  font-size: 12px;
  vertical-align: middle;
  margin: -2px 0 0 5px;
}
.menu {
  text-align: center;
}
</style>
