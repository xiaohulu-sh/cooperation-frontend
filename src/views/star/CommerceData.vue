<template>
  <div :class="c.dataBlock">
    <h2 :class="[c.imgTitle, s.title1]">直播数据分析</h2>
    <DataTimeRange :preset.sync="preset" :presetList="presetList" :day.sync="day" :dayList="dayList" />
    <div :class="c.block1">
      <DataBlock :req="overviewReq" :handler="overviewHandler" :isEmpty="isOverviewEmpty" style="min-height:300px">
        <template v-slot="{ data: { overview: { goods, goodsDelta, orders, ordersDelta, income, incomeDelta }, chartLines } }">
          <h3 id="overview" data-anchor="数据概况" :class="c.h3">
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
          <h3 id="categories" data-anchor="品类统计" :class="c.h3" style="margin-top:40px"><em>近30天</em> 带货品类统计</h3>
          <DataBlock :req="recent30Req" :handler="recent30Handler" :isEmpty="isRecent30Empty" style="min-height:356px">
            <template v-slot="{ data: { categories, brands, sources } }">
              <div :class="s.flex1">
                <div>
                  <h4>直播间热销品类</h4>
                  <LazyBlock :data="mixed1" style="height:328px">
                    <Chart :chartData="mixed1" style="height:328px"></Chart>
                  </LazyBlock>
                </div>
                <div>
                  <h4>上架商品所属品牌分布</h4>
                  <LazyBlock :data="hBar1" style="height:328px">
                    <Chart :chartData="hBar1" style="height:328px"></Chart>
                  </LazyBlock>
                </div>
              </div>
              <h3 id="goods" data-anchor="商品统计" :class="c.h3">
                <em>近30天</em> 总共上架了<em>{{ goodsTotal }}款</em>商品
              </h3>
              <div style="margin-bottom:25px">
                <div :class="s.filterRow"><label :class="s.label1">商品品类：</label><RadioList :class="s.radioList" :list="categories" v-model="categFilter" /></div>
                <ViewMore :class="s.filterRow" :maxHeight="54"><label :class="s.label1">商品品牌：</label><RadioList :class="s.radioList" :list="brands" v-model="brandFilter"/></ViewMore>
                <div :class="s.filterRow"><label :class="s.label1">商品价格：</label><RadioList :class="s.radioList" :list="priceFilters" v-model="priceFilter" /></div>
                <div :class="s.filterRow"><label :class="s.label1">商品来源：</label><RadioList :class="s.radioList" :list="sources" v-model="sourceFilter" /></div>
              </div>
              <DataBlock :req="goodsListReq" :handler="goodsHandler" :showEmpty="false" :showErr="false" :loadingMask="true">
                <template v-slot="{ data: { list, total } }">
                  <div v-if="total > 0" :class="c.itemList1">
                    <div :class="c.th">
                      <div :class="c.col1">商品名称</div>
                      <div :class="c.col2">商品来源</div>
                      <div :class="c.colVal">售价</div>
                      <div :class="c.colVal">销量</div>
                      <div :class="c.colVal">销售额</div>
                    </div>
                    <ul :class="c.tbList">
                      <li v-for="({ cover, title, platform_label, min_price, dyScene_sales_number, price_add }, index) in list" :key="index">
                        <div :class="[c.col1, c.ellipsis1]"><img :src="cover || defaultImage" referrerpolicy="no-referrer" @error="onImageError" />{{ title }}</div>
                        <div :class="c.col2">{{ platform_label }}</div>
                        <div :class="c.colVal">￥{{ formatNumber(min_price / 100) }}</div>
                        <div :class="c.colVal">{{ formatNumber(dyScene_sales_number) }}</div>
                        <div :class="c.colVal">{{ formatNumber(price_add / 100) }}</div>
                      </li>
                    </ul>
                  </div>
                  <a-empty :image="noDataImage" v-else />
                  <a-pagination :class="c.pagin1" v-model="goodsPage" :total="total" :pageSize="10" :hideOnSinglePage="true"></a-pagination>
                </template>
              </DataBlock>
            </template>
          </DataBlock>
          <h3 id="trends" data-anchor="数据趋势" :class="c.h3">
            <em>{{ range }}</em> 数据趋势
          </h3>
          <ul :class="c.dataTabs">
            <li v-for="{ label, value } in chartTypes1" :key="value" :class="{ [c.dataTabActive]: value === chartType1 }" @click="chartType1 = value">{{ label }}</li>
          </ul>
          <LazyBlock :class="c.block1" :data="chartLines" style="height:338px">
            <Chart :chartData="chartLines" style="height:308px"></Chart>
          </LazyBlock>
        </template>
        <template #empty>
          <div :class="c.noData">
            <img src="~@/assets/no-goods.svg" />
            所选时段内未监测到带货直播
          </div>
        </template>
      </DataBlock>
    </div>
  </div>
</template>

<script>
import { createLine1 } from '@/utils/charts/line'
import { createMixed1, createHBarChart1 } from '@/utils/charts/mixed'
import useDataTimeRange from './data-time-range'
import DataTimeRange from './data-time-range/DataTimeRange'
import { parseNumberUnit, formatNumber } from '@/utils/utils'
import ViewMore from '@/components/ViewMore'

function hashToItemList(hash) {
  return Object.keys(hash)
    .map(key => {
      const n = hash[key]
      return { value: key, label: `${key}(${n})`, n }
    })
    .sort(({ value: aKey, n: aVal }, { value: bKey, n: bVal }) => {
      if (aKey === '其他') {
        return 1
      } else if (bKey === '其他') {
        return -1
      } else {
        return bVal - aVal
      }
    })
}

export default {
  components: { DataTimeRange, ViewMore },
  props: ['platform', 'room'],
  data() {
    return {
      ...useDataTimeRange.data(),
      presetList: [{ value: 'recent_30', label: '近30天' }],
      dayList: [],
      categDataset: null,
      brandDataset: null,
      goodsTotal: null,
      categFilter: '',
      brandFilter: '',
      priceFilters: [
        { value: '0-50', label: '<50元' },
        { value: '50-100', label: '50元-100元' },
        { value: '100-500', label: '100元-500元' },
        { value: '500-0', label: '>500元' }
      ],
      priceFilter: '',
      sourceFilter: '',
      goodsPage: 1,
      goodsPageSize: 10,
      chartType1: 'income',
      chartTypes1: [
        { label: '销售额', value: 'income' },
        { label: '订单量', value: 'orders' }
      ]
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
    recent30Req() {
      return {
        url: 'v1_front_anchor/goodsRecent30BrandInfo',
        params: {
          platform: this.platform,
          roomid: this.room
        }
      }
    },
    goodsListReq() {
      return {
        url: 'v1_front_anchor/goodsListRecent30',
        params: {
          platform: this.platform,
          roomid: this.room,
          price: this.priceFilter || undefined,
          brand_name: this.brandFilter ? encodeURIComponent(this.brandFilter) : undefined,
          tag_name: this.categFilter ? encodeURIComponent(this.categFilter) : undefined,
          plat_label: this.sourceFilter ? encodeURIComponent(this.sourceFilter) : undefined,
          page: this.goodsPage,
          limit: this.goodsPageSize
        }
      }
    },
    mixed1() {
      return createMixed1(
        this.categDataset,
        [
          { x: '品类', y: '销售额' },
          { x: '品类', y: '订单数' }
        ],
        {
          getType: i => (i > 0 ? 'line' : 'bar'),
          units: [
            { unit: 10000, fixed: 2 },
            { unit: 10000, fixed: 2 }
          ],
          tooltipValFormatter: value => value + '万',
          grid: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 0,
            containLabel: true
          }
        }
      )
    },
    hBar1() {
      return createHBarChart1(this.brandDataset, { x: '商品款数', y: '品牌' })
    }
  },
  watch: {
    categFilter() {
      this.goodsPage = 1
    },
    brandFilter() {
      this.goodsPage = 1
    },
    priceFilter() {
      this.goodsPage = 1
    },
    sourceFilter() {
      this.goodsPage = 1
    }
  },
  methods: {
    formatNumber,
    overviewHandler(data) {
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
    isOverviewEmpty(data) {
      return (
        data &&
        ['goods', 'orders', 'income'].every(key => {
          const parsed = data.overview[key]
          return !parsed.n && !parsed.unit
        })
      )
    },
    recent30Handler(data) {
      if (!data || data.status === 'waitting') return null
      const { tags_statistics, tags_rank, brand_rank, platform_label_rank } = data

      const categDataset = Object.keys(tags_statistics)
        .filter(key => key !== '其他')
        .sort((a, b) => tags_statistics[b].price_add - tags_statistics[a].price_add)
        .slice(0, 10)
        .map(key => [key, tags_statistics[key].price_add / 100, tags_statistics[key].order_num])
      categDataset.unshift(['品类', '销售额', '订单数'])
      this.categDataset = categDataset

      const brands = hashToItemList(brand_rank)
      const brandDataset = brands
        .slice(0, 11)
        .filter(({ value }) => value !== '其他')
        .slice(0, 10)
        .map(({ value, n }) => [value, n])
      brandDataset.unshift(['品牌', '商品款数'])
      this.brandDataset = brandDataset

      return {
        categories: hashToItemList(tags_rank),
        brands,
        sources: hashToItemList(platform_label_rank)
      }
    },
    isRecent30Empty(data, resData) {
      return (
        resData &&
        (resData.status === 'waitting' ||
          ['tags_statistics', 'tags_rank', 'brand_rank', 'platform_label_rank'].every(key => {
            const value = resData[key]
            return !value || value.length === 0
          }))
      )
    },
    goodsHandler(resData, req) {
      if (!this.goodsTotal) {
        const { price, brand_name, tag_name, plat_label } = req?.params || {}
        if (price === undefined && brand_name === undefined && tag_name === undefined && plat_label === undefined) {
          const total = resData?.total
          if (total) this.goodsTotal = total
        }
      }
      return {
        list: resData?.data || [],
        total: resData?.total || 0
      }
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
.flex1 {
  display: flex;
  margin-bottom: 40px;
  & > div {
    flex: 1;
    &:not(:first-child) {
      margin-left: 30px;
    }
  }
}
.filterRow {
  margin-bottom: 12px;
}
.radioList {
  display: inline;
}
</style>
