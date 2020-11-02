<template>
  <div>
    <div :class="[c.dataBlock, s.summary]">
      <ul :class="s.summary1">
        <li><em>6080.10万</em>粉丝数</li>
        <li><em>0.06</em>成长指数</li>
        <li><em>2.29</em>人均送礼</li>
        <li><em>5.2h</em>日均开播时间</li>
        <li><em>14.71%</em>观众互动率</li>
        <li><em>2.6%</em>观众付费率</li>
      </ul>
      <ul :class="s.summary2">
        <li><em>3900.02</em>小葫芦指数(月)</li>
        <li><em>0</em>主播段位</li>
        <li><em>第6名</em>全网排名</li>
        <li><em>第5名</em>分类排名</li>
      </ul>
      <ul :class="s.summary3">
        <li><em>47.54万人</em>互动人数</li>
        <li><em>64.77万条</em>弹幕数量</li>
        <li><em>442.76万元</em>收到贡献值</li>
        <li><em>14.36万人</em>送礼人数</li>
      </ul>
    </div>
    <div :class="c.dataBlock">
      <h2 :class="[c.imgTitle, s.title1]">直播数据分析</h2>
      <DataTimeRange :preset.sync="preset" :presetList="presetList" :day.sync="day" :dayList="dayList" />
      <div :class="c.block1">
        <h3 :class="c.h3">
          <em> {{ range }} </em>共进行过<em> 4 </em>场直播
        </h3>
        <ul :class="c.dataInfoList">
          <li>
            礼物收入<em>49.91<span>万</span></em>
            <div :class="c.subTxt">比上周期<span :class="c.up">+10.13万</span></div>
          </li>
          <li>
            送礼人数<em>5877</em>
            <div :class="c.subTxt">比上周期<span :class="c.up">+2513</span></div>
          </li>
          <li>
            直播时长<em>62.90h</em>
            <div :class="c.subTxt">比上周期<span :class="c.up">+28.90</span></div>
          </li>
          <li>
            总观看数<em>1.05<span>亿</span></em>
            <div :class="c.subTxt">比上周期<span :class="c.up">+4305.29万</span></div>
          </li>
          <li>
            峰值在线<em>13.40<span>万</span></em>
            <div :class="c.subTxt">比上周期<span :class="c.down">-2.79万</span></div>
          </li>
        </ul>
      </div>
      <div :class="c.block1">
        <h3 :class="c.h3">
          <em> {{ range }} </em>共进行过<em> 4 </em>场直播
        </h3>
        <ul :class="c.dataInfoList">
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
      <ul :class="c.dataTabs" style="padding: 30px 30px 0">
        <li :class="c.dataTabActive">礼物收入</li>
        <li>观看数</li>
      </ul>
      <LazyBlock :class="c.block1" :data="chartLines" style="height:338px">
        <Chart :chartData="chartLines" :loading="chartLinesLoading" style="height:308px"></Chart>
      </LazyBlock>
      <ul :class="c.dataTabs" style="padding: 30px 30px 0">
        <li :class="c.dataTabActive">人气峰值</li>
        <li>直播时长</li>
        <li>粉丝关注</li>
      </ul>
      <LazyBlock :class="c.block1" :data="chartLines" style="height:338px">
        <Chart :chartData="chartLines" :loading="chartLinesLoading" style="height:308px"></Chart>
      </LazyBlock>
      <div :class="c.block1">
        <h3 :class="c.h3">
          <em> {{ range }} </em>直播记录
        </h3>
        <LiveList v-if="recordsTotal" :list="records" :page.sync="recordsPage" :pageSize="recordsPageSize" :total="recordsTotal"></LiveList>
        <a-empty v-else />
      </div>
      <div :class="c.block1">
        <h3 :class="c.h3">
          <em> {{ range }} </em>送礼土豪
        </h3>
        <TycoonList v-if="tycoonsTotal" :list="tycoons" :page.sync="tycoonsPage" :pageSize="tycoonsPageSize" :total="tycoonsTotal"></TycoonList>
        <a-empty v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { createLine1 } from '@/utils/charts/line'
import LiveList from './LiveList'
import TycoonList from './TycoonList'
import useDataTimeRange from './data-time-range'
import DataTimeRange from './data-time-range/DataTimeRange'

export default {
  components: { DataTimeRange, LiveList, TycoonList },
  data() {
    return {
      ...useDataTimeRange.data(),
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
    ...useDataTimeRange.computed
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
  background-image: url(~@/assets/live-title1.png);
}
.summary1 {
  background: url(~@/assets/live-t1.png) no-repeat left top/380px 39px;
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
  background: url(~@/assets/live-t2.png) no-repeat 25px top/238px 39px;
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
  background: url(~@/assets/live-t3.png) no-repeat 25px top/238px 39px;
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
    background-image: url(~@/assets/live-title1@2x.png);
  }
  .summary1 {
    background-image: url(~@/assets/live-t1@2x.png);
  }
  .summary2 {
    background-image: url(~@/assets/live-t2@2x.png);
  }
  .summary3 {
    background-image: url(~@/assets/live-t3@2x.png);
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
</style>
