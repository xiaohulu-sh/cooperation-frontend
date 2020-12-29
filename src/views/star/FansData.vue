<template>
  <div :class="c.dataBlock">
    <template v-if="hasOverview">
      <h2 id="overview" data-anchor="数据概览" :class="[c.imgTitle, s.title1]">粉丝数据概览</h2>
      <div :class="c.rtTip">
        <a-tooltip placement="bottom">
          <template slot="title">您可以看到他的粉丝性别比例，年龄分层，活跃时间段以及粉丝占比最高的地区</template>
          数据说明
          <a-icon type="question-circle" />
        </a-tooltip>
      </div>
      <ul :class="s.txtList">
        <li v-if="overview.gender1 && overview.gender2">
          Ta的粉丝中，<em>{{ overview.gender1 }}</em> 居多，占 <em>{{ overview.gender2 }}</em>
        </li>
        <li v-if="overview.age1 && overview.age2">
          关注他的人里，有 <em>{{ overview.age1 }}%</em> 的人<em>{{ overview.age2 }}</em>
        </li>
        <li v-if="overview.activity1 && overview.activity2">
          Ta的粉丝在 <em>{{ overview.activity1 }}、{{ overview.activity2 }} 最活跃</em>
        </li>
        <li v-if="overview.area1 && overview.area2">
          来自 <em>{{ overview.area1 }}</em> 的粉丝最多，占比 <em>{{ overview.area2 }}</em>
        </li>
      </ul>
    </template>
    <h2 id="portrait" data-anchor="粉丝画像" :class="[c.imgTitle, s.title2]">粉丝画像</h2>
    <div :class="s.block1">
      <div>
        <h3 :class="c.h3">
          性别分布
          <a-tooltip placement="bottom">
            <template slot="title">您可以通过饼状图了解红人粉丝男女占比</template>
            <a-icon type="question-circle" :class="s.tipIcon" />
          </a-tooltip>
        </h3>
        <DataBlock :class="s.b1" :req="genderReq" :handler="genderHandler" :lazyRender="true">
          <template v-slot="{ data }">
            <Chart :class="s.chart1" :chartData="data"></Chart>
          </template>
        </DataBlock>
      </div>
      <div>
        <h3 :class="c.h3">
          星座分布
          <a-tooltip placement="bottom">
            <template slot="title">您可以通过饼状图了解红人粉丝星座占比</template>
            <a-icon type="question-circle" :class="s.tipIcon" />
          </a-tooltip>
        </h3>
        <DataBlock :class="s.b1" :req="constellReq" :handler="constellHandler" :lazyRender="true">
          <template v-slot="{ data }">
            <Chart :class="s.chart1" :chartData="data"></Chart>
          </template>
        </DataBlock>
      </div>
      <div>
        <h3 :class="c.h3">
          粉丝活跃时间分布 — 按天
          <a-tooltip placement="bottom">
            <template slot="title">您可以通过柱状图按天了解到粉丝最活跃的时间段</template>
            <a-icon type="question-circle" :class="s.tipIcon" />
          </a-tooltip>
        </h3>
        <DataBlock :class="s.b1" :req="dayReq" :handler="dayHandler" :lazyRender="true">
          <template v-slot="{ data }">
            <Chart :class="s.chart1" :chartData="data"></Chart>
          </template>
        </DataBlock>
      </div>
      <div>
        <h3 :class="c.h3">
          粉丝活跃时间分布 — 按周
          <a-tooltip placement="bottom">
            <template slot="title">您可以通过柱状图按周了解到粉丝最活跃的时间段</template>
            <a-icon type="question-circle" :class="s.tipIcon" />
          </a-tooltip>
        </h3>
        <DataBlock :class="s.b1" :req="weekReq" :handler="weekHandler" :lazyRender="true">
          <template v-slot="{ data }">
            <Chart :class="s.chart1" :chartData="data"></Chart>
          </template>
        </DataBlock>
      </div>
      <div>
        <h3 :class="c.h3">
          年龄分布
          <a-tooltip placement="bottom">
            <template slot="title">您可以通过柱状图了解到粉丝的年龄分层</template>
            <a-icon type="question-circle" :class="s.tipIcon" />
          </a-tooltip>
        </h3>
        <DataBlock :class="s.b1" :req="ageReq" :handler="ageHandler" :lazyRender="true">
          <template v-slot="{ data }">
            <Chart :class="s.chart1" :chartData="data"></Chart>
          </template>
        </DataBlock>
      </div>
      <div>
        <h3 :class="c.h3">
          地域分布
          <a-tooltip placement="bottom">
            <template slot="title">您可以通过地图了解到红人粉丝的地域分布和占比</template>
            <a-icon type="question-circle" :class="s.tipIcon" />
          </a-tooltip>
        </h3>
        <DataBlock :class="[s.b1, s.mapBlock]" :req="areaReq" :handler="areaHandler" :lazyRender="true">
          <template v-slot="{ data: { chart, list } }">
            <Chart :class="s.chart1" :chartData="chart"></Chart>
            <ul v-if="list">
              <li v-for="{ name, percent } in list" :key="name">{{ name }}{{ percent }}</li>
            </ul>
          </template>
        </DataBlock>
      </div>
    </div>
    <div v-if="portraits1.length" :class="s.t1">购买红人商品的粉丝画像（京东）</div>
    <DataBlock v-show="portraits1.length" :class="s.block1" :req="portraits1Req" :handler="portraits1Handler" :showEmpty="false" :showErr="false">
      <template v-slot="{ data }">
        <div v-for="{ name, chart } in data" :key="name">
          <h3 :class="c.h3">{{ name }}</h3>
          <LazyBlock :class="s.b1" :data="chart">
            <Chart :class="s.chart1" :chartData="chart"></Chart>
          </LazyBlock>
        </div>
      </template>
    </DataBlock>
  </div>
</template>

<script>
import { createPie1, createPie2 } from '@/utils/charts/pie'
import { createBar1 } from '@/utils/charts/bar'
import { registerMap, createChinaMap1 } from '@/utils/charts/map'

export default {
  props: ['platform', 'room'],
  data() {
    return {
      overview: {
        gender1: '',
        gender2: '',
        age1: '',
        age2: '',
        activity1: '',
        activity2: '',
        area1: '',
        area2: ''
      },
      areaReq: null,
      portraits1: []
    }
  },
  computed: {
    hasOverview() {
      const { gender1, gender2, age1, age2, activity1, activity2, area1, area2 } = this.overview
      return (gender1 && gender2) || (age1 && age2) || (activity1 && activity2) || (area1 && area2)
    },
    genderReq() {
      return this.getChartReq(1)
    },
    constellReq() {
      return this.getChartReq(2)
    },
    dayReq() {
      return this.getChartReq(3)
    },
    weekReq() {
      return this.getChartReq(4)
    },
    ageReq() {
      return this.getChartReq(5)
    },
    portraits1Req() {
      return {
        url: 'v1_front_anchor/fansPortrayal',
        params: {
          platform: this.platform,
          roomid: this.room
        }
      }
    }
  },
  methods: {
    getChartReq(type) {
      return {
        url: 'v1_front_anchor/fansAnalysis',
        params: {
          platform: this.platform,
          roomid: this.room,
          type
        }
      }
    },
    genderHandler(data) {
      if (!data) {
        this.overview.gender1 = this.overview.gender2 = ''
        return null
      }
      const { boy_count, girl_count } = data
      let maxVal
      if (boy_count >= girl_count) {
        this.overview.gender1 = '男性'
        maxVal = boy_count
      } else {
        this.overview.gender1 = '女性'
        maxVal = girl_count
      }
      this.overview.gender2 = ((maxVal / (boy_count + girl_count)) * 100).toFixed(2) + '%'
      return createPie1(
        [
          { value: boy_count, name: '男性用户' },
          { value: girl_count, name: '女性用户' }
        ],
        { showDataType: 'scale', unit: '人', color: ['#5c89ff', '#FF7486', '#736AF2'], size: 'sm' }
      )
    },
    constellHandler(data) {
      if (!data) return null
      return createPie2(
        Object.keys(data)
          .filter(name => data[name])
          .map(name => ({ name, value: data[name] })),
        { legend: false, showDataType: 'scale', unit: '人' }
      )
    },
    dayHandler(data) {
      if (!data) {
        this.overview.activity2 = ''
        return null
      }
      const keys = Object.keys(data)
      this.overview.activity2 = keys
        .map(name => [name + '点', data[name]])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name]) => name)
        .join('、')
      return createBar1(
        keys.map(name => [name + '时', data[name]]),
        { unit: '%' }
      )
    },
    weekHandler(data) {
      if (!data) {
        this.overview.activity1 = ''
        return null
      }
      const keys = Object.keys(data)
      const values = Object.values(data)
      this.overview.activity1 = keys[values.indexOf(Math.max(...values))]
      const names = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      return createBar1(
        keys.sort((a, b) => names.indexOf(a) - names.indexOf(b)).map(name => [name, data[name]]),
        { interval: 0, unit: '%' }
      )
    },
    ageHandler(data) {
      if (!data) {
        this.overview.age1 = this.overview.age2 = ''
        return null
      }
      const keys = Object.keys(data)
      const values = Object.values(data)
      const maxVal = Math.max(...values)
      this.overview.age1 = maxVal
      this.overview.age2 = keys[values.indexOf(maxVal)]
      return createBar1(
        keys.map(name => [name, data[name]]),
        { interval: 0, unit: '%' }
      )
    },
    areaHandler(data) {
      if (!data) {
        this.overview.area1 = this.overview.area2 = ''
        return {
          chart: null,
          list: []
        }
      }
      const keys = Object.keys(data)
      const values = Object.values(data).map(item => item.count)
      const index = values.indexOf(Math.max(...values))
      this.overview.area1 = keys[index]
      this.overview.area2 = data[keys[index]].percent
      return {
        chart: createChinaMap1(keys.map(name => ({ name, value: data[name].count }))),
        list: keys.slice(0, 10).map(name => ({ name, percent: data[name].percent }))
      }
    },
    portraits1Handler(resData) {
      if (!resData) {
        this.portraits1 = []
        return resData
      }
      return (this.portraits1 = resData
        .map(({ instruction, info }) => {
          let list
          try {
            list = JSON.parse(info)
            // eslint-disable-next-line no-empty
          } catch (err) {}
          if (!list) return null
          return { name: instruction, list }
        })
        .filter(item => item)
        .map(({ name, list }) => ({
          name,
          chart: createPie2(
            list.map(({ instruction, percent }) => ({ name: instruction, value: Number(percent) })).filter(({ value }) => value),
            { legend: false, showDataType: 'scale' }
          )
        })))
    }
  },
  async mounted() {
    await registerMap(this.echarts)
    this.areaReq = this.getChartReq(6)
  }
}
</script>

<style lang="less" module="s">
.title1 {
  width: 292px;
  height: 48px;
  background-image: url(~@/assets/fans-title1.png);
}
.title2 {
  width: 292px;
  height: 48px;
  background-image: url(~@/assets/fans-title2.png);
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
  .title1 {
    background-image: url(~@/assets/fans-title1@2x.png);
  }
  .title2 {
    background-image: url(~@/assets/fans-title1@2x.png);
  }
}
.txtList {
  display: flex;
  flex-wrap: wrap;
  margin: 5px 60px 40px;
  color: #333;
  font-weight: 500;
  li {
    width: 50%;
    border-left: 3px solid #736af2;
    padding: 2px 10px;
    margin: 24px 0 0;
  }
  em {
    color: #736af2;
  }
}
div.block1 {
  display: flex;
  flex-wrap: wrap;
  padding: 0 30px 30px;
  min-height: 200px;
  & > div {
    width: 50%;
    padding: 0 10px;
  }
  h3 {
    margin-bottom: 0;
  }
}
.b1,
.chart1 {
  height: 280px;
}
.b1 {
  margin-bottom: 30px;
}
.mapBlock {
  display: flex;
  align-items: center;
  .chart1 {
    width: 360px;
  }
  ul {
    color: #666;
  }
}
.t1 {
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0 10px 30px;
}
.tipIcon {
  font-size: 14px;
  color: #999;
  vertical-align: middle;
  margin-top: -2px;
}
</style>
