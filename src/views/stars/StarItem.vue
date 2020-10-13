<template>
  <div :class="$style.item">
    <div :class="$style.bg" :style="`background-image:url(${item.avatar})`">
      <span :class="$style.area">内蒙古 克什克腾旗</span>
      <div :class="$style.name">
        <span :class="$style.tag1">快手</span>
        <span :class="[$common[item.gender], $style[item.gender]]">狂鸟丶楚河-90327</span>
      </div>
      <div :class="$style.tags">
        <span :class="$style.tag2">科技数码</span>
        <span :class="$style.tag2">旅行</span>
        <span :class="$style.tag2">美食</span>
        <span :class="$style.tag3">新动传媒</span>
      </div>
    </div>
    <div :class="[$common.ellipsis1, $style.intro1]">男女粉丝比例：男粉居多，26-32岁粉丝居多</div>
    <div :class="[$common.ellipsis2, $style.intro2]">
      Redmi 10X 高性能处理器，性能比肩旗舰配置，带来流畅游戏体验，直播间购机享专属钜惠福利，性能比肩旗舰配置，带来流畅游戏体验，直播间购机享专属钜惠福利
    </div>
    <div :class="$style.data">
      <div :class="$style.dataCol">总粉丝数<br /><strong>172万</strong><span>30天涨粉64万</span></div>
      <div :class="$style.dataCol">总点赞数<br /><strong>172万</strong><span>作品137个</span></div>
      <div :class="$style.dataCol">星途报价<br /><strong>172万美元</strong><span>1-20s报价</span></div>
    </div>
    <div :class="$style.btnWrap">
      <a-button><i :class="$common.plus"></i>添加红人</a-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
}
</script>

<style lang="less" module>
.item {
  display: inline-block;
  position: relative;
  width: 300px;
  height: 446px;
  border: 1px solid #d9d9d9;
  margin: 0 30px 30px 0;
  padding-top: 200px;
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
    background: url(../../assets/location.svg) no-repeat 0 0 / contain;
    vertical-align: middle;
    margin: -2px 4px 0 0;
  }
}
.tag {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  padding: 0 3px;
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;
  font-size: 12px;
}
.tag1 {
  composes: tag;
  color: #fa541c;
  background: #fff2e8;
  border-color: #ffbb96;
  margin-right: 5px;
}
.tag2 {
  composes: tag;
  color: #1890ff;
  background: #e6f7ff;
  border-color: #91d5ff;
  margin-left: 10px;
}
.tag3 {
  composes: tag;
  color: #722ed1;
  background: #f9f0ff;
  border-color: #d3adf7;
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
