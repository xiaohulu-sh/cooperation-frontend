<template>
  <div>
    <h2 :class="c.h2b">我的订单</h2>
    <div :class="c.th1">
      <div :class="s.col1">订单生成时间</div>
      <div :class="s.col2">订单编号</div>
      <div :class="s.col3">已选红人数</div>
      <div :class="s.col4">红人头像</div>
      <div :class="s.col5">状态</div>
      <div :class="s.col6">操作</div>
    </div>
    <ul :class="[c.tbList1, s.list1]">
      <li v-for="(_, index) in new Array(5)" :key="index">
        <div :class="s.col1">2020-09-08 14:12</div>
        <div :class="s.col2">20200908141255486</div>
        <div :class="s.col3">10</div>
        <div :class="s.col4">
          <img :class="s.avatar1" src="https://xhlcdn.xiaohulu.com/avatar/202/188888880" referrerpolicy="no-referrer" @error="onAvatarError" style="z-index:3" />
          <img :class="s.avatar1" src="https://xhlcdn.xiaohulu.com/avatar/202/188888880" referrerpolicy="no-referrer" @error="onAvatarError" style="z-index:2" />
          <img :class="s.avatar1" src="https://xhlcdn.xiaohulu.com/avatar/202/188888880" referrerpolicy="no-referrer" @error="onAvatarError" style="z-index:1" />
        </div>
        <div :class="s.col5">待确认</div>
        <div :class="s.col6"><router-link to="/my/order/123">查看详情</router-link></div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" module="s">
.avatar1 {
  position: relative;
  width: 56px;
  height: 56px;
  border: 1px solid #f8f8f8;
  border-radius: 50%;
  margin-right: -10px;
}
.col1 {
  width: 160px;
  padding-left: 25px;
}
.col2 {
  width: 180px;
  padding-left: 30px;
}
.col3,
.col5 {
  width: 100px;
  text-align: center;
}
.col4 {
  flex: 1;
  padding-left: 30px;
}
.col6 {
  width: 120px;
  text-align: center;
}
.list1 {
  font-weight: 600;
  color: #666;
  li {
    padding: 10px 0;
  }
  .col3 {
    font-size: 16px;
    color: #333;
  }
}
</style>
