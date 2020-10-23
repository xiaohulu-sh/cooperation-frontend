<template>
  <main :class="[c.main, c.dataBlock]" style="padding:30px">
    <h2 :class="s.h2">商品详情概览</h2>
    <div style="display:flex">
      <div :class="c.goodsImg">
        <div><img src="https://sf6-ttcdn-tos.pstatp.com/img/temai/f6bb14e63a3da88d61d8cfc7b8a1297ewww844-844~tplv-resize:200:0.jpg" referrerpolicy="no-referrer" /></div>
        <span>京东</span>
      </div>
      <div :class="c.goodsInfo">
        <div :class="[c.ellipsis2, c.goodsTitle]">maje2019春夏新款女装 腰带条纹衬衫长款连衣裙E19RAJI</div>
        <div :class="c.goodsSub">售价：<em>￥17.00</em><a :class="c.link" href="javascript:">商品链接</a></div>
      </div>
      <ul :class="s.dataList">
        <li>全网销量<em>1100</em></li>
        <li>直播销量<em>1100</em></li>
        <li>商品PV<em>1100</em></li>
        <li>商品UV<em>1100</em></li>
        <li>下单数<em>1100</em></li>
        <li>总金额<em>150025</em></li>
        <li>支付人数<em>43</em></li>
      </ul>
    </div>
    <h3 :class="c.h3" style="margin-top:60px">商品趋势<small style="font-size:12px">分析商品近30天的数据趋势</small></h3>
    <div style="padding:0 10px 20px">
      <a-radio-group :value="1" size="small">
        <a-radio-button :value="1">总量</a-radio-button>
        <a-radio-button :value="2">增量</a-radio-button>
      </a-radio-group>
      <a-radio-group :value="7" size="small" style="margin-left:40px">
        <a-radio-button :value="7">近7天</a-radio-button>
        <a-radio-button :value="30">近30天</a-radio-button>
      </a-radio-group>
      <LazyBlock :data="chartLine" style="height:308px;margin-top:10px">
        <Chart :chartData="chartLine" style="height:308px"></Chart>
      </LazyBlock>
    </div>
  </main>
</template>

<script>
import { createLine1 } from '@/utils/charts/line'

export default {
  data() {
    return {
      dataset: [
        { show: 0, date: '2020-10-07' },
        { show: 474000, date: '2020-10-08' },
        { show: 0, date: '2020-10-09' },
        { show: 59000, date: '2020-10-10' },
        { show: 27000, date: '2020-10-11' },
        { show: 71000, date: '2020-10-12' },
        { show: 0, date: '2020-10-13' }
      ].map(({ date, show }) => [date, show])
    }
  },
  computed: {
    chartLine() {
      return createLine1(this.dataset)
    }
  }
}
</script>

<style lang="less" module="s">
.h2 {
  font-size: 24px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 32px;
  margin-bottom: 20px;
}
.dataList {
  display: flex;
  color: #999;
  margin-left: 20px;
  li {
    margin: 0 20px;
    white-space: nowrap;
  }
  em {
    display: block;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
  }
}
</style>
