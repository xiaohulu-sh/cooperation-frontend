<template>
  <main :class="c.main1">
    <SideNav></SideNav>
    <div :class="[c.block, s.content]">
      <div :class="s.banner">连接红人与商家 <small>为行业品牌主创造价值</small></div>
      <h2 :class="s.h2">联系我们 <small>CONTACT US</small></h2>
      <div :class="s.cards">
        <div :class="s.card1">
          <h3>/ 红人智选业务</h3>
          <div>如果您有红人投放的相关需求，或者相关问题欢迎洽谈。</div>
          <ul :class="s.txtList">
            <li>联系电话：021-22456584</li>
            <li>联系微信：xxx</li>
            <li>联系邮箱：xxx@xiaohulu.com</li>
          </ul>
        </div>
        <div :class="s.card2">
          <h3>/ 行业解决方案</h3>
          <div>如果您有单一行业的解决方案采购需求，或者相关问题欢迎洽谈。</div>
          <ul :class="s.txtList">
            <li>联系电话：021-22456584</li>
            <li>联系微信：xxx</li>
            <li>联系邮箱：xxx@xiaohulu.com</li>
          </ul>
        </div>
      </div>
    </div>
    <FixedNav></FixedNav>
  </main>
</template>

<style lang="less" module="s">
.content {
  width: 1020px;
  margin-left: 20px;
  color: #000;
}
.banner {
  width: 1020px;
  height: 160px;
  overflow: hidden;
  color: transparent;
  text-indent: -100%;
  background: url(../assets/banner1.jpg) no-repeat left top/cover;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
  .banner {
    background-image: url(../assets/banner1@2x.jpg);
  }
}
.h2 {
  font-size: 24px;
  font-weight: 600;
  margin: 50px 30px 20px;
  small {
    font-size: 18px;
    font-weight: normal;
  }
}
.cards {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}
.card {
  width: 467px;
  height: 237px;
  padding: 40px 40px 0 154px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin: 10px;
  background-repeat: no-repeat;
  background-position: -10px -2px;
  background-size: 144px 245px;
  font-size: 16px;
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
}
.card1 {
  composes: card;
  background-image: url(../assets/contact1.svg);
}
.card2 {
  composes: card;
  background-image: url(../assets/contact2.svg);
}
.txtList {
  font-size: 12px;
  margin-top: 20px;
}
</style>
