<template>
  <div :class="c.dataBlock">
    <h2 :class="[c.imgTitle, s.title1]">直播数据分析</h2>
    <DataTimeRange :preset.sync="preset" :presetList="presetList" :day.sync="day" :dayList="dayList" />
    <div :class="c.block1">
      <DataBlock :req="overviewReq" :handler="handler1" :isEmpty="isEmpty" style="min-height:300px">
        <template v-slot="{ data: { overview: { goods, goodsDelta, orders, ordersDelta, income, incomeDelta }, chartLines } }">
          <h3 :class="c.h3">
            <em> {{ range }} </em>数据概况
          </h3>
          <div :class="[c.tShop, s.t1]">带货数据</div>
          <ul :class="c.dataPlainList">
            <li>
              总销售额
              <em>
                {{ income.n }}<span v-if="income.unit">{{ income.unit }}</span>
              </em>
              <div v-if="incomeDelta.n" :class="c.subTxt">
                {{ comparePrefix }}
                <span :class="incomeDelta.n < 0 ? c.down : c.up">{{ `${incomeDelta.n > 0 ? '+' : ''}${incomeDelta.n}` }}{{ incomeDelta.unit }}</span>
              </div>
            </li>
            <li>
              总订单数
              <em>
                {{ orders.n }}<span v-if="orders.unit">{{ orders.unit }}</span>
              </em>
              <div v-if="ordersDelta.n" :class="c.subTxt">
                {{ comparePrefix }}
                <span :class="ordersDelta.n < 0 ? c.down : c.up">{{ `${ordersDelta.n > 0 ? '+' : ''}${ordersDelta.n}` }}{{ ordersDelta.unit }}</span>
              </div>
            </li>
            <li>
              总商品数
              <em>
                {{ goods.n }}<span v-if="goods.unit">{{ goods.unit }}</span>
              </em>
              <div v-if="goodsDelta.n" :class="c.subTxt">
                {{ comparePrefix }}
                <span :class="goodsDelta.n < 0 ? c.down : c.up">{{ `${goodsDelta.n > 0 ? '+' : ''}${goodsDelta.n}` }}{{ goodsDelta.unit }}</span>
              </div>
            </li>
          </ul>
          <h3 :class="c.h3">数据趋势</h3>
          <ul :class="c.dataTabs">
            <li v-for="{ label, value } in chartTypes1" :key="value" :class="{ [c.dataTabActive]: value === chartType1 }" @click="chartType1 = value">{{ label }}</li>
          </ul>
          <LazyBlock :class="c.block1" :data="chartLines" style="height:338px">
            <Chart :chartData="chartLines" style="height:308px"></Chart>
          </LazyBlock>
          <DataBlock :req="goodsListReq" :showEmpty="false" :showErr="false">
            <template v-slot="{ data: { data, total } }">
              <h3 :class="c.h3">
                <em>{{ range }}</em>
                总共上架了<em>{{ total }}款</em>商品
              </h3>
              <div style="margin-bottom:20px"><label :class="s.label1">商品价格：</label><RadioList :list="priceFilters" v-model="priceFilter"></RadioList></div>
              <div v-if="total > 0" :class="c.itemList1">
                <div :class="c.th">
                  <div :class="c.col1">商品名称</div>
                  <div :class="c.col2">商品来源</div>
                  <div :class="c.colVal">售价</div>
                  <div :class="c.colVal">销量</div>
                  <div :class="c.colVal">销售额</div>
                </div>
                <ul :class="c.tbList">
                  <li v-for="{ goods_id, goods_image, title, source_name, min_price, sales_number_add, sales_price_add } in data" :key="goods_id">
                    <div :class="[c.col1, c.ellipsis1]"><img :src="goods_image" referrerpolicy="no-referrer" />{{ title }}</div>
                    <div :class="c.col2">{{ source_name }}</div>
                    <div :class="c.colVal">￥{{ formatNumber(min_price) }}</div>
                    <div :class="c.colVal">{{ formatNumber(sales_number_add) }}</div>
                    <div :class="c.colVal">{{ formatNumber(sales_price_add) }}</div>
                  </li>
                </ul>
              </div>
              <a-empty v-else />
              <a-pagination :class="c.pagin1" v-model="goodsPage" :total="total" :pageSize="10" :hideOnSinglePage="true"></a-pagination>
            </template>
          </DataBlock>
        </template>
      </DataBlock>
    </div>
  </div>
</template>

<script>
import { createLine1 } from '@/utils/charts/line'
import useDataTimeRange from './data-time-range'
import DataTimeRange from './data-time-range/DataTimeRange'
import { parseNumberUnit, formatNumber } from '@/utils/utils'

export default {
  components: { DataTimeRange },
  props: ['platform', 'room'],
  data() {
    return {
      ...useDataTimeRange.data(),
      chartType1: 'income',
      chartTypes1: [
        { label: '销售额', value: 'income' },
        { label: '订单量', value: 'orders' }
      ],
      priceFilters: [
        { value: '0-50', label: '<50元' },
        { value: '50-100', label: '50元-100元' },
        { value: '100-500', label: '100元-500元' },
        { value: '500-0', label: '>500元' }
      ],
      priceFilter: '',
      goodsPage: 1,
      goodsPageSize: 10
    }
  },
  computed: {
    ...useDataTimeRange.computed,
    overviewReq() {
      return {
        url: 'v1_front_anchor/shopOverview',
        params: { platform: this.platform, roomid: this.room, time_type: this.timeType, time: this.time }
      }
    },
    goodsListReq() {
      return {
        url: 'v1_front_anchor/goodsList',
        params: {
          platform: this.platform,
          roomid: this.room,
          time_type: this.timeType,
          time: this.time,
          price: this.priceFilter || undefined,
          page: this.goodsPage,
          limit: this.goodsPageSize
        }
      }
    }
  },
  watch: {
    range() {
      this.goodsPage = 1
    },
    priceFilter() {
      this.goodsPage = 1
    }
  },
  methods: {
    formatNumber,
    handler1(data) {
      if (!data) return null
      const { goods_num, order_num, total_income, compare_goods_num, compare_order_num, compare_total_income } = data.overview_data || {}
      const { sales_number = [], sales_price = [] } = data.data_detail || {}
      return {
        overview: {
          goods: parseNumberUnit(goods_num),
          goodsDelta: parseNumberUnit(compare_goods_num),
          orders: parseNumberUnit(order_num),
          ordersDelta: parseNumberUnit(compare_order_num),
          income: parseNumberUnit(total_income),
          incomeDelta: parseNumberUnit(compare_total_income)
        },
        chartLines: createLine1(
          ({ income: sales_price, orders: sales_number }[this.chartType1] || [])
            .filter(item => item)
            .map(({ time, value }) => [time, value])
            .sort((a, b) => (a > b ? 1 : -1))
        )
      }
    },
    isEmpty(data) {
      return (
        data &&
        ['goods', 'orders', 'income'].every(key => {
          const parsed = data.overview[key]
          return !parsed.n && !parsed.unit
        })
      )
    }
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
.t1 {
  margin: 30px 0 10px;
}
.label1 {
  color: #333;
  font-weight: bold;
}
</style>
