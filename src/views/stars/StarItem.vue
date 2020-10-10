<template>
  <div :class="$style.starItem">
    <div :class="$style.starBg" :style="`background-image:url(${item.avatar})`">
      <span :class="$style.starArea">内蒙古 克什克腾旗</span>
      <div :class="$style.starName">
        <span :class="$style.tag1">快手</span>
        <span :class="$style[item.gender]">狂鸟丶楚河-90327</span>
      </div>
      <div :class="$style.starTags">
        <span :class="$style.tag2">科技数码</span>
        <span :class="$style.tag2">旅行</span>
        <span :class="$style.tag2">美食</span>
        <span :class="$style.tag3">新动传媒</span>
      </div>
    </div>
    <div :class="$style.starIntro1">男女粉丝比例：男粉居多，26-32岁粉丝居多</div>
    <div :class="$style.starIntro2">
      Redmi 10X 高性能处理器，性能比肩旗舰配置，带来流畅游戏体验，直播间购机享专属钜惠福利，性能比肩旗舰配置，带来流畅游戏体验，直播间购机享专属钜惠福利
    </div>
    <div :class="$style.starData">
      <div :class="$style.starDataCol">总粉丝数<br /><strong>172万</strong><span>30天涨粉64万</span></div>
      <div :class="$style.starDataCol">总点赞数<br /><strong>172万</strong><span>作品137个</span></div>
      <div :class="$style.starDataCol">星途报价<br /><strong>172万美元</strong><span>1-20s报价</span></div>
    </div>
    <div :class="$style.starBtnWrap">
      <a-button><i :class="$style.plus"></i>添加红人</a-button>
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

<style src="@/styles/common.module.less" lang="less" module></style>
