<template>
  <div :class="[c.dataBlock, s.container]">
    <h2 :class="c.detailTitle"><router-link :class="c.backBtn" :to="backPath"></router-link>带货直播详情</h2>
    <div :class="s.info">
      <img :class="s.avatar" src="https://xhlcdn.xiaohulu.com/avatar/202/188888880" referrerpolicy="no-referrer" @error="onAvatarError" alt="头像" />
      <div>
        <div :class="s.name">各位宝宝晚上好</div>
        <div :class="c.splitInfo">
          <span>开始时间：2020-10-06 19:53:18</span>
          <span>结束时间：2020-10-07 00:03:15</span>
          <span>总直播时长 3小时15分</span>
        </div>
        <div style="margin-top:10px">
          <span :class="c.tag1">带货直播</span>
          <span :class="c.tag2">已结束</span>
          <span :class="c.tag3">直播中</span>
        </div>
      </div>
    </div>
    <ul :class="c.dataList" style="margin:36px -30px 0">
      <li>
        <em>6113.90<span>万</span></em>
        总销售额
      </li>
      <li>
        <em>3667.88<span>万</span></em>
        订单数
      </li>
      <li>
        <em>37</em>
        商品客单价
      </li>
      <li>
        <em>3.10<span>万</span></em>
        峰值在线
      </li>
      <li>
        <em>99.13<span>万</span></em>
        收到贡献值
      </li>
      <li>
        <em>1203</em>
        粉丝增量
      </li>
    </ul>
    <h3 :class="c.h3">数据趋势</h3>
    <ul :class="c.dataTabs">
      <li :class="c.dataTabActive">销售额</li>
      <li>订单数</li>
      <li>在线数</li>
    </ul>
    <LazyBlock :data="chartLines" style="height:338px">
      <Chart :chartData="chartLines" :loading="chartLinesLoading" style="height:308px"></Chart>
    </LazyBlock>
    <h3 :class="c.h3">总共上架了 <em>111</em> 款商品</h3>
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
        <li v-for="(item, index) in goodsList" :key="index">
          <div :class="[c.col1, c.ellipsis1]"><img src="https://sf6-ttcdn-tos.pstatp.com/img/temai/f6bb14e63a3da88d61d8cfc7b8a1297ewww844-844~tplv-resize:200:0.jpg" referrerpolicy="no-referrer" />老罗推荐【转转严选】苹果货源机iPhone11 128G国行准新机</div>
          <div :class="c.col2">某电商平台</div>
          <div :class="c.colVal">6790.5</div>
          <div :class="c.colVal">1252.3万</div>
          <div :class="c.colVal">8502.8万</div>
          <div :class="c.colLink1"><a href="javascript:">查看购买详情 &gt;</a></div>
        </li>
      </ul>
    </div>
    <a-pagination v-model="goodsPage" :total="goodsTotal" :pageSize="10" :hideOnSinglePage="true" style="text-align:center;margin-top:20px"></a-pagination>
  </div>
</template>

<script>
import { onAvatarError } from '@/utils/utils'
import { createLine1 } from '@/utils/charts/line'

export default {
  data() {
    return {
      chartLines: null,
      chartLinesLoading: false,
      goodsList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      goodsPage: 1,
      goodsTotal: 120
    }
  },
  computed: {
    backPath() {
      const { platform, room } = this.$route.params
      return `/star/${platform}/${room}/records`
    }
  },
  methods: { onAvatarError },
  mounted() {
    this.chartLinesLoading = true
    setTimeout(() => {
      const data = [
        { show: 0, date: '2020-10-07' },
        { show: 474000, date: '2020-10-08' },
        { show: 0, date: '2020-10-09' },
        { show: 59000, date: '2020-10-10' },
        { show: 27000, date: '2020-10-11' },
        { show: 71000, date: '2020-10-12' },
        { show: 0, date: '2020-10-13' }
      ]
      this.chartLines = createLine1(data.map(({ date, show }) => [date, show]))
      this.chartLinesLoading = false
    }, 2000)
  }
}
</script>

<style lang="less" module="s">
.container {
  padding: 30px;
}
.info {
  display: flex;
  margin-top: 30px;
}
.avatar {
  width: 90px;
  height: 90px;
  border-radius: 4px;
  margin-right: 20px;
}
.name {
  color: #333;
  font-size: 18px;
  font-weight: 500;
}
</style>
