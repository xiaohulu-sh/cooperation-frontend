<template>
  <router-link to="/star/201/4195355415549012" :class="s.item">
    <div :class="s.bg" :style="`background-image:url(${item.avatar})`">
      <span :class="s.area">内蒙古 克什克腾旗</span>
      <div :class="s.name">
        <span :class="[c.tag1, s.tag1]">快手</span>
        <span :class="[c[item.gender], s[item.gender]]">狂鸟丶楚河-90327</span>
      </div>
      <div :class="s.tags">
        <span :class="[c.tag2, s.tag2]">科技数码</span>
        <span :class="[c.tag2, s.tag2]">旅行</span>
        <span :class="[c.tag2, s.tag2]">美食</span>
        <span :class="[c.tag3, s.tag3]">新动传媒</span>
      </div>
    </div>
    <div :class="[c.ellipsis1, s.intro1]">男女粉丝比例：男粉居多，26-32岁粉丝居多</div>
    <div :class="[c.ellipsis2, s.intro2]">
      Redmi 10X 高性能处理器，性能比肩旗舰配置，带来流畅游戏体验，直播间购机享专属钜惠福利，性能比肩旗舰配置，带来流畅游戏体验，直播间购机享专属钜惠福利
    </div>
    <div :class="s.data">
      <div :class="s.dataCol">总粉丝数<br /><strong>172万</strong><span>30天涨粉64万</span></div>
      <div :class="s.dataCol">总点赞数<br /><strong>172万</strong><span>作品137个</span></div>
      <div :class="s.dataCol">星途报价<br /><strong>172万美元</strong><span>1-20s报价</span></div>
    </div>
    <div :class="s.btnWrap">
      <a-button @click.prevent="onAddClick"><i :class="c.plus"></i>添加红人</a-button>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    onAddClick() {
      // eslint-disable-next-line no-console
      console.log('add')
    }
  }
}
</script>

<style lang="less" module="s">
.item {
  display: inline-block;
  position: relative;
  width: 300px;
  height: 446px;
  border: 1px solid #d9d9d9;
  margin: 0 30px 30px 0;
  padding-top: 200px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: rgba(0, 0, 0, 0.65);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  }
}
.bg {
  position: absolute;
  left: -1px;
  right: -1px;
  top: -1px;
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 40px;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  }
}
.area {
  position: absolute;
  left: 10px;
  top: 10px;
  height: 20px;
  line-height: 20px;
  padding: 0 7px;
  background: rgba(0, 0, 0, 0.62);
  border-radius: 10px;
  font-size: 12px;
  color: #fff;
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 12px;
    background: url(~@/assets/location.svg) no-repeat 0 0 / contain;
    vertical-align: middle;
    margin: -2px 4px 0 0;
  }
}
.tag1 {
  margin-right: 5px;
}
.tag2 {
  margin-left: 10px;
}
.tag3 {
  float: right;
  margin-right: 10px;
}
.name {
  position: absolute;
  left: 0;
  top: 130px;
  padding: 0 10px;
  color: #fff;
  .male::after,
  .female::after {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin: -2px 0 0 4px;
  }
}
.tags {
  position: absolute;
  top: 162px;
  left: 0;
  right: 0;
}
.intro1 {
  font-size: 12px;
  margin: 10px;
}
.intro2 {
  font-size: 12px;
  color: #999;
  margin: 10px;
}
.data {
  display: flex;
  margin: 20px 0 25px;
  white-space: nowrap;
}
.dataCol {
  flex: 1 1 100px;
  padding: 0 10px;
  strong {
    display: block;
    font-size: 16px;
    line-height: 22px;
    color: #736af2;
  }
  span {
    font-size: 12px;
    color: #999;
  }
}
.btnWrap {
  text-align: center;
}
</style>
