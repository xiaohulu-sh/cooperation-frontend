<template>
  <div>
    <div :class="[$common.dataBlock, $style.summary]">
      <ul :class="$style.summary1">
        <li><em>6080.10万</em>粉丝数</li>
        <li><em>0.06</em>成长指数</li>
        <li><em>2.29</em>人均送礼</li>
        <li><em>5.2h</em>日均开播时间</li>
        <li><em>14.71%</em>观众互动率</li>
        <li><em>2.6%</em>观众付费率</li>
      </ul>
      <ul :class="$style.summary2">
        <li><em>3900.02</em>小葫芦指数(月)</li>
        <li><em>0</em>主播段位</li>
        <li><em>第6名</em>全网排名</li>
        <li><em>第5名</em>分类排名</li>
      </ul>
      <ul :class="$style.summary3">
        <li><em>47.54万人</em>互动人数</li>
        <li><em>64.77万条</em>弹幕数量</li>
        <li><em>442.76万元</em>收到贡献值</li>
        <li><em>14.36万人</em>送礼人数</li>
      </ul>
    </div>
    <div :class="$common.dataBlock">
      <h2 :class="[$common.imgTitle, $style.title1]">直播数据分析</h2>
      <ul :class="[$common.dataTabs, $common.dataTab1]">
        <li v-for="{ value, label } in presetList" :key="value" :class="{ [$common.dataTabActive]: value === preset }" @click="onPresetClick(value)">{{ label }}</li>
        <a-dropdown>
          <li :class="{ [$common.dataTabActive]: day !== null }">{{ day || '按日期选择' }}</li>
          <a-menu slot="overlay" style="padding:10px 0">
            <a-menu-item v-for="{ value } in dayList" :key="value" :class="$style.dropdownItem" @click="onTimeSelect(value)">{{ value }}</a-menu-item>
          </a-menu>
        </a-dropdown>
      </ul>
      <div :class="$style.block">
        <h3 :class="$common.h3">
          <em> {{ range }} </em>共进行过<em> 4 </em>场直播
        </h3>
        <ul :class="$common.dataInfoList">
          <li>
            礼物收入<em>49.91<span>万</span></em>
            <div :class="$common.subTxt">比上周期<span :class="$common.up">+10.13万</span></div>
          </li>
          <li>
            送礼人数<em>5877</em>
            <div :class="$common.subTxt">比上周期<span :class="$common.up">+2513</span></div>
          </li>
          <li>
            直播时长<em>62.90h</em>
            <div :class="$common.subTxt">比上周期<span :class="$common.up">+28.90</span></div>
          </li>
          <li>
            总观看数<em>1.05<span>亿</span></em>
            <div :class="$common.subTxt">比上周期<span :class="$common.up">+4305.29万</span></div>
          </li>
          <li>
            峰值在线<em>13.40<span>万</span></em>
            <div :class="$common.subTxt">比上周期<span :class="$common.down">-2.79万</span></div>
          </li>
        </ul>
      </div>
      <div :class="$style.block">
        <h3 :class="$common.h3">
          <em> {{ range }} </em>共进行过<em> 4 </em>场直播
        </h3>
        <ul :class="$common.dataInfoList">
          <li>
            收到贡献值<em>362.39<span>万</span></em>
          </li>
          <li>
            弹幕数<em>232.12<span>万</span></em>
          </li>
          <li>
            总送礼人数<em>5.28<span>万</span></em>
          </li>
          <li>
            人气峰值<em>10<span>万</span></em>
          </li>
          <li>
            粉丝增量<em>326.10<span>万</span></em>
          </li>
        </ul>
      </div>
      <ul :class="$common.dataTabs" style="padding: 30px 30px 0">
        <li :class="$common.dataTabActive">礼物收入</li>
        <li>观看数</li>
      </ul>
      <LazyBlock :class="[$common.lazyBlock, $style.block]" :keyData="chartLines" style="height:338px">
        <Chart :chartData="chartLines" :loading="chartLinesLoading" style="height:308px"></Chart>
      </LazyBlock>
      <ul :class="$common.dataTabs" style="padding: 30px 30px 0">
        <li :class="$common.dataTabActive">人气峰值</li>
        <li>直播时长</li>
        <li>粉丝关注</li>
      </ul>
      <LazyBlock :class="[$common.lazyBlock, $style.block]" :keyData="chartLines" style="height:338px">
        <Chart :chartData="chartLines" :loading="chartLinesLoading" style="height:308px"></Chart>
      </LazyBlock>
      <div :class="$style.block">
        <h3 :class="$common.h3">
          <em> {{ range }} </em>直播记录
        </h3>
        <LiveList v-if="recordsTotal" :list="records" :page.sync="recordsPage" :pageSize="recordsPageSize" :total="recordsTotal"></LiveList>
        <a-empty v-else description="暂无数据" />
      </div>
      <div :class="$style.block">
        <h3 :class="$common.h3">
          <em> {{ range }} </em>送礼土豪
        </h3>
        <TycoonList v-if="tycoonsTotal" :list="tycoons" :page.sync="tycoonsPage" :pageSize="tycoonsPageSize" :total="tycoonsTotal"></TycoonList>
        <a-empty v-else description="暂无数据" />
      </div>
    </div>
  </div>
</template>

<script>
import { createLine1 } from '@/utils/charts/line'
import LiveList from './LiveList'
import TycoonList from './TycoonList'

export default {
  components: { LiveList, TycoonList },
  data() {
    return {
      preset: 3,
      presetList: [
        { value: 1, label: '今日' },
        { value: 2, label: '昨日' },
        { value: 3, label: '近7天' },
        { value: 4, label: '近30天' }
      ],
      day: null,
      dayList: [
        { id: 0, value: '2020-10-13', start: '2020-10-13', end: '2020-10-13' },
        { id: 1, value: '2020-10-12', start: '2020-10-12', end: '2020-10-12' },
        { id: 2, value: '2020-10-11', start: '2020-10-11', end: '2020-10-11' },
        { id: 3, value: '2020-10-10', start: '2020-10-10', end: '2020-10-10' },
        { id: 4, value: '2020-10-09', start: '2020-10-09', end: '2020-10-09' },
        { id: 5, value: '2020-10-08', start: '2020-10-08', end: '2020-10-08' },
        { id: 6, value: '2020-10-07', start: '2020-10-07', end: '2020-10-07' },
        { id: 7, value: '2020-10-06', start: '2020-10-06', end: '2020-10-06' }
      ],
      chartLines: null,
      chartLinesLoading: false,
      records: [{}, {}, {}, {}, {}],
      recordsPage: 1,
      recordsPageSize: 5,
      recordsTotal: 100,
      tycoons: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      tycoonsPage: 1,
      tycoonsPageSize: 10,
      tycoonsTotal: 100
    }
  },
  computed: {
    range() {
      if (this.preset) {
        return this.presetList.find(({ value }) => value === this.preset)?.label || ''
      }
      if (this.day) return this.day
      return ''
    }
  },
  methods: {
    onPresetClick(value) {
      this.preset = value
      this.day = null
    },
    onTimeSelect(value) {
      this.preset = null
      this.day = value
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

<style lang="less" module>
.title1 {
  width: 292px;
  height: 60px;
  background-image: url(../../assets/live-title1.png);
}
.summary1 {
  background: url(../../assets/live-t1.png) no-repeat left top/380px 39px;
  width: 405px;
  padding-right: 25px;
  li {
    width: 33.33%;
  }
  em {
    color: #736af2;
  }
}
.summary2 {
  background: url(../../assets/live-t2.png) no-repeat 25px top/238px 39px;
  width: 288px;
  padding-left: 25px;
  padding-right: 25px;
  li {
    width: 50%;
  }
  em {
    color: #ff7b00;
  }
}
.summary3 {
  background: url(../../assets/live-t3.png) no-repeat 25px top/238px 39px;
  width: 263px;
  padding-left: 25px;
  li {
    width: 50%;
  }
  em {
    color: #ff5e66;
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
  .title1 {
    background-image: url(../../assets/live-title1@2x.png);
  }
  .summary1 {
    background-image: url(../../assets/live-t1@2x.png);
  }
  .summary2 {
    background-image: url(../../assets/live-t2@2x.png);
  }
  .summary3 {
    background-image: url(../../assets/live-t3@2x.png);
  }
}
.summary {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  text-align: center;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
    padding-top: 39px;
    &::after {
      content: '';
      width: 1px;
      height: 150px;
      background: #f3f6f8;
      position: absolute;
      right: 0;
      top: 8px;
    }
  }
  .summary3::after {
    content: none;
  }
  li {
    margin-top: 20px;
    color: #999;
  }
  em {
    display: block;
    font-weight: bold;
    font-size: 18px;
  }
}
.dropdownItem {
  line-height: 40px;
  text-align: center;
  padding: 0;
}
.block {
  padding: 0 30px 30px;
}
</style>
