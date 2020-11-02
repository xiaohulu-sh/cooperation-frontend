<template>
  <div :class="c.dataBlock">
    <h2 :class="[c.imgTitle, s.title1]">直播数据分析</h2>
    <ul :class="[c.dataTabs, c.dataTab1]">
      <li :class="c.dataTabActive">最近一场</li>
      <li>近30日</li>
      <li>近90日</li>
    </ul>
    <div :class="s.tip">
      <em>下一场直播 2020-10-21 20:00</em>
      <span :class="c.ellipsis1">直播预告文案，直播预告文案，直播预告文案，直播预告文案</span>
    </div>
    <div :class="c.block1">
      <h3 :class="c.h3">数据概况</h3>
      <div :class="s.txt1">最近的直播时间为<em>2020-10-19 12:04</em>，最近的<em>30</em>天内共进行过<em>4</em>场带货直播</div>
      <div :class="[c.tShop, s.t1]">带货数据</div>
      <ul :class="c.dataPlainList">
        <li>
          总销售额<em>8.34<span>亿</span></em>
          <div :class="c.subTxt">场均3209.2万</div>
        </li>
        <li>
          总订单数<em>402.80<span>万</span></em>
          <div :class="c.subTxt">场均15.5万</div>
        </li>
        <li>
          上架商品数<em>1259</em>
          <div :class="c.subTxt">场均48.4万</div>
        </li>
        <li>
          商品客单价<em>215.2<span>元</span></em>
        </li>
      </ul>
      <div :class="[c.tPeople, s.t1]">观众数据</div>
      <ul :class="c.dataPlainList1">
        <li>
          场均观看数<em>712.7<span>万</span></em>
        </li>
        <li>
          5分钟段平均观众数<em>23.3<span>万</span></em>
        </li>
        <li>5分钟段观众留存率<em>27.3%</em></li>
        <li>直播人气最旺时段<em>20:00-20:59</em></li>
      </ul>
      <div :class="[c.tMoney, s.t1]">坑位费</div>
      <ul :class="c.dataPlainList2">
        <li>
          专场直播价格(小时)
          <a-popover>
            <em style="cursor:pointer">50000~80000<i :class="c.arrow1"/></em>
            <template #content>
              <div>专场直播价格(小时): 50000~80000</div>
            </template>
          </a-popover>
        </li>
        <li>
          单位坑价格
          <a-popover>
            <em style="cursor:pointer">50000~80000<i :class="c.arrow1"/></em>
            <template #content>
              <div>单位坑价格: 50000~80000</div>
            </template>
          </a-popover>
        </li>
        <li>此价格是否含税<em>不含税</em></li>
        <li :class="c.qr">
          <a-popover>
            <div style="cursor:pointer">联系Ta带货<img src="~@/assets/qr.svg" width="24" height="24" alt="二维码" /></div>
            <template #content>
              <img src="~@/assets/contact.png" width="180" height="180" alt="二维码" />
            </template>
          </a-popover>
        </li>
      </ul>
      <h3 :class="c.h3">数据趋势</h3>
      <ul :class="c.dataTabs">
        <li :class="c.dataTabActive">销售额</li>
        <li>订单量</li>
        <li>累计观看数</li>
      </ul>
      <LazyBlock :data="chartLines" style="height:338px">
        <Chart :chartData="chartLines" :loading="chartLinesLoading" style="height:308px"></Chart>
      </LazyBlock>
      <h3 :class="c.h3"><em>近30日</em>总共上架了<em>113款</em>商品</h3>
      <div style="margin-bottom:20px"><label :class="s.label1">商品价格：</label><RadioList :list="priceFilters" v-model="priceFilter"></RadioList></div>
      <div :class="c.itemList1">
        <div :class="c.th">
          <div :class="c.col1">商品名称</div>
          <div :class="c.col2">商品来源</div>
          <div :class="c.colVal">价格(元)</div>
          <div :class="c.colVal">销量</div>
          <div :class="c.colVal">销售额(元)</div>
        </div>
        <ul :class="c.tbList">
          <li v-for="(item, index) in goodsList" :key="index">
            <div :class="[c.col1, c.ellipsis1]"><img src="https://sf6-ttcdn-tos.pstatp.com/img/temai/f6bb14e63a3da88d61d8cfc7b8a1297ewww844-844~tplv-resize:200:0.jpg" referrerpolicy="no-referrer" />老罗推荐【转转严选】苹果货源机iPhone11 128G国行准新机</div>
            <div :class="c.col2">某电商平台</div>
            <div :class="c.colVal">6790.5</div>
            <div :class="c.colVal">1252.3万</div>
            <div :class="c.colVal">8502.8万</div>
          </li>
        </ul>
      </div>
      <a-pagination v-model="goodsPage" :total="goodsTotal" :pageSize="10" :hideOnSinglePage="true" style="text-align:center;margin-top:20px"></a-pagination>
    </div>
  </div>
</template>

<script>
import { createLine1 } from '@/utils/charts/line'

export default {
  data() {
    return {
      chartLines: null,
      chartLinesLoading: false,
      priceFilters: [
        { value: 1, label: '<50元' },
        { value: 2, label: '50元-100元' },
        { value: 3, label: '100元-500元' },
        { value: 4, label: '>500元' }
      ],
      priceFilter: '',
      goodsList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      goodsPage: 1,
      goodsTotal: 120
    }
  },
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
.title1 {
  width: 292px;
  height: 60px;
  background-image: url(~@/assets/com-title1.png);
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
  .title1 {
    background-image: url(~@/assets/com-title1@2x.png);
  }
}
.tip {
  position: absolute;
  right: 20px;
  top: 10px;
  width: 230px;
  height: 52px;
  padding: 4px 0 0 8px;
  background: url(~@/assets/tip-bg.svg) no-repeat 0 0 / contain;
  em {
    display: block;
    background: url(~@/assets/broadcast.svg) no-repeat left center;
    padding-left: 16px;
    font-weight: bold;
    color: #736af2;
    height: 20px;
  }
  span {
    display: block;
    padding-left: 16px;
    padding-right: 6px;
    font-size: 12px;
    color: #8c98c6;
  }
}
.txt1 {
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
  em {
    color: #736af2;
    font-weight: bold;
    margin: 0 4px;
  }
}
.t1 {
  margin: 30px 0 10px;
}
.label1 {
  color: #333;
  font-weight: bold;
}
</style>
