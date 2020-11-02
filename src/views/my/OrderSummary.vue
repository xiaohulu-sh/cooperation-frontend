<template>
  <div :class="c.main">
    <div :class="s.title1">
      <h2>投放总结报告<small>订单时间：2020-09-18</small></h2>
    </div>
    <div :class="s.content">
      <div style="display:flex">
        <div :class="s.info1">
          <div :class="s.t1">本次您一共投放<em>3</em>名红人</div>
          <div :class="s.txt1">品牌影响力增加 <em>152.22万</em></div>
        </div>
        <div :class="s.info1">
          <div :class="s.t1">总带货商品数<em>15</em>件</div>
          <div :class="s.txt1">商品销售额 <em>15.6万</em></div>
        </div>
        <div :class="s.txt1" style="margin-top:36px">商品总销量 <em>2560</em></div>
      </div>
      <h3 :class="s.h3">红人销售额TOP3</h3>
      <ol :class="s.ol">
        <li v-for="(_, index) in new Array(3)" :key="index" :class="c[`no${index + 1}`]">
          <img :class="s.avatar1" src="https://xhlcdn.xiaohulu.com/avatar/202/188888880" referrerpolicy="no-referrer" @error="onAvatarError" />
          <div :class="s.itemTxt">
            <div :class="c.ellipsis1">金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕金咕咕</div>
            <em>45.5%销售贡献</em>
          </div>
        </li>
      </ol>
      <h3 :class="s.h3">商品销售额TOP3</h3>
      <ol :class="s.ol">
        <li v-for="(_, index) in new Array(3)" :key="index" :class="c[`no${index + 1}`]">
          <img :class="s.avatar" src="https://sf6-ttcdn-tos.pstatp.com/img/temai/f6bb14e63a3da88d61d8cfc7b8a1297ewww844-844~tplv-resize:200:0.jpg" referrerpolicy="no-referrer" />
          <div :class="s.itemTxt">2020秋季新款卡其色收腰中长款风衣女MOISSAC/摩萨克女装</div>
        </li>
      </ol>
      <h3 :class="s.h3a">商品曝光次数：<em>1226万次</em></h3>
      <ul :class="s.starList">
        <li v-for="(_, index) in new Array(5)" :key="index">
          <div :class="s.bg" :style="`background-image:url(https://xhlcdn.xiaohulu.com/avatar/202/188888880)`">
            <div :class="s.name">
              <span :class="[c.tag1, s.tag1]">快手</span>
              <span :class="[c.male, s.male]">狂鸟丶楚河-90327</span>
            </div>
            <div :class="s.tags">
              <span :class="[c.tag2, s.tag2]">科技数码</span>
              <span :class="[c.tag2, s.tag2]">旅行</span>
              <span :class="[c.tag2, s.tag2]">美食</span>
              <span :class="[c.tag4, s.tag2]">短视频带货</span>
            </div>
          </div>
          <div :class="s.highlight"><em>45.5%</em>销售贡献</div>
          <ul :class="s.dataList1">
            <li>总粉丝数<em>562万</em></li>
            <li>带货商品数<em>12</em></li>
            <li>曝光次数<em>1732万</em></li>
            <li>总销量<em>1523</em></li>
            <li>总销售额<em>152万</em></li>
            <li>带货时长<em>2.5小时</em></li>
          </ul>
        </li>
      </ul>
      <h3 :class="s.h3a" style="margin-bottom:30px">商品销售概况</h3>
      <div :class="c.itemList1">
        <div :class="c.th">
          <div :class="c.col1">商品名称</div>
          <div :class="c.col2">商品来源</div>
          <div :class="c.colVal">价格(元)</div>
          <div :class="c.colVal">销量</div>
          <div :class="c.colVal">销售额(元)</div>
          <div :class="c.colLink1">详情</div>
        </div>
        <ul :class="c.tbList">
          <li v-for="(item, index) in new Array(10)" :key="index">
            <div :class="[c.col1, c.ellipsis1]"><img src="https://sf6-ttcdn-tos.pstatp.com/img/temai/f6bb14e63a3da88d61d8cfc7b8a1297ewww844-844~tplv-resize:200:0.jpg" referrerpolicy="no-referrer" />老罗推荐【转转严选】苹果货源机iPhone11 128G国行准新机</div>
            <div :class="c.col2">某电商平台</div>
            <div :class="c.colVal">6790.5</div>
            <div :class="c.colVal">1252.3万</div>
            <div :class="c.colVal">8502.8万</div>
            <div :class="c.colLink1"><router-link to="/goods/123/data">详情 &gt;</router-link></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="less" module="s">
.title1 {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 1200px;
  height: 133px;
  overflow: hidden;
  border-radius: 4px 4px 0 0;
  background-size: contain;
  background-image: url(~@/assets/particle.jpg);
  &::before,
  &::after {
    content: '';
    width: 33px;
    height: 64px;
    background: url(~@/assets/surround.svg) no-repeat left top/contain;
  }
  &::before {
    margin-right: 25px;
  }
  &::after {
    margin-left: 25px;
    transform: rotateY(180deg);
  }
  h2 {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
  }
  small {
    display: block;
    font-weight: normal;
    font-size: 14px;
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
  .title1 {
    background-image: url(~@/assets/particle@2x.jpg);
  }
}
.content {
  padding: 40px 45px;
  background: #fff;
}
.t1 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
.txt1 {
  margin-top: 12px;
  color: #666;
  font-size: 16px;
  em {
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    vertical-align: middle;
    margin-top: -4px;
  }
}
.info1 {
  width: 400px;
  border-left: 3px solid #736af2;
  padding-left: 10px;
}
.h3 {
  border-left: 3px solid #736af2;
  padding-left: 10px;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin: 40px 0 10px;
  color: #333;
  em {
    font-size: 20px;
    line-height: 28px;
  }
}
.h3a {
  composes: h3;
  line-height: 28px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -10px;
    border-bottom: 1px solid #e3e4eb;
  }
}
.avatar {
  width: 40px;
  height: 40px;
}
.avatar1 {
  composes: avatar;
  border-radius: 50%;
}
.ol {
  display: flex;
  align-items: center;
  color: #666;
  line-height: 20px;
  li {
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    background-repeat: no-repeat;
    background-position: 0 center;
    padding-left: 22px;
    margin-left: 10px;
    &:nth-child(1) {
      width: 32%;
    }
    &:nth-child(2) {
      width: 35%;
    }
    &:nth-child(3) {
      width: 32%;
    }
  }
}
.itemTxt {
  flex: 1;
  overflow: hidden;
  padding: 0 10px;
  em {
    color: #333;
    font-weight: 600;
  }
}
.starList {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px 0 15px;
  & > li {
    position: relative;
    width: 340px;
    height: 406px;
    border: 1px solid #d9d9d9;
    margin: 30px 30px 0 0;
    padding-top: 200px;
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
    top: 80px;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  }
}
.tag1 {
  margin-right: 5px;
}
.tag2 {
  margin-left: 10px;
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
.highlight {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #736af2;
  color: #fff;
  padding: 7px;
  margin: 20px 20px 0;
  em {
    font-size: 20px;
    font-weight: 600;
    margin-top: -2px;
  }
}
.dataList1 {
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
  li {
    margin-top: 18px;
    &:nth-child(3n + 1) {
      width: 36%;
    }
    &:nth-child(3n + 2) {
      width: 39%;
    }
    &:nth-child(3n + 3) {
      width: 25%;
    }
  }
  em {
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
}
</style>
