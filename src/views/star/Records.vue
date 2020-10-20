<template>
  <div :class="c.dataBlock">
    <h2 :class="[c.imgTitle, s.title1]">直播记录</h2>
    <div :class="c.block1">
      <ul :class="c.dataTabs" style="padding-top:30px">
        <li :class="c.dataTabActive">全部</li>
        <li>销售额最高</li>
        <li>订单数最多</li>
        <li>客单价最高</li>
        <li>观众数最多</li>
      </ul>
      <div v-for="(_, index) in [, ,]" :key="index">
        <h3 :class="c.h3">10月 (2)场</h3>
        <ul :class="s.list1">
          <li v-for="(_, index) in [, , ,]" :key="index" @click="goToDetail()">
            <div :class="[c.ellipsis1, s.t1]">直播惊喜价！免单抽奖！</div>
            <div :class="s.content">
              <div :class="s.info">
                <em>10-11 18:45</em>
                直播时长 6小时7分
              </div>
              <ul :class="s.dataList">
                <li>
                  <em>1881.46万</em>
                  销售额
                </li>
                <li>
                  <em>13.01万</em>
                  订单数
                </li>
                <li>
                  <em>45</em>
                  上架商品
                </li>
                <li>
                  <em>144.58</em>
                  客单价
                </li>
                <li>
                  <em>557.55万</em>
                  观看人数
                </li>
              </ul>
              <div :class="s.alert">本场直播存在数据异常</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToDetail() {
      const { platform, room } = this.$route.params
      this.$router.replace(`/star/${platform}/${room}/records/123`)
    }
  }
}
</script>

<style lang="less" module="s">
.title1 {
  width: 292px;
  height: 60px;
  background-image: url(../../assets/records-title1.png);
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
  .title1 {
    background-image: url(../../assets/records-title1@2x.png);
  }
}
.list1 {
  & > li {
    border: 1px solid #f2f3f7;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 10px;
    background: #f7f6ff;
    cursor: pointer;
    &:hover {
      background: #eeedfd;
    }
  }
  .t1 {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
    color: #736af2;
  }
  .content {
    display: flex;
    align-items: center;
  }
  .info {
    width: 154px;
    border-right: 1px solid #e3e4eb;
    color: #9391b7;
    em {
      display: block;
      color: #333;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .dataList {
    display: flex;
    width: 500px;
    padding-left: 10px;
    li {
      width: 25%;
      text-align: center;
      color: #9391b7;
      font-size: 12px;
    }
    em {
      display: block;
      font-size: 14px;
      font-weight: bold;
      color: #333;
    }
  }
  .alert {
    margin-left: 32px;
    padding-left: 16px;
    color: #ff5570;
    font-weight: bold;
    background: url(../../assets/alert.svg) no-repeat left center;
  }
}
</style>
