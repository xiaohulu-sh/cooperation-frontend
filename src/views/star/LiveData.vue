<template>
  <div>
    <div :class="c.dataBlock">
      <h2 :class="[c.imgTitle, s.title1]">直播数据分析</h2>
      <DataTimeRange :preset.sync="preset" :presetList="presetList" :day.sync="day" :dayList="dayList" />
      <template v-if="platform == 201">
        <DataBlock :req="dataReq1" :handler="handler1" :isEmpty="isEmpty1" style="min-height:300px">
          <template v-slot="{ data: { total, overview: { gift, giftDelta, tycoon, tycoonDelta, duration, durationDelta, viewer, viewerDelta, onlineMax, onlineMaxDelta }, chartLines, records, recordsTotal } }">
            <div :class="c.block1">
              <h3 :class="c.h3">
                <em> {{ range }} </em>共进行过<em> {{ total }} </em>场直播
              </h3>
              <ul :class="c.dataInfoList">
                <li>
                  礼物收入
                  <a-tooltip placement="bottom">
                    <template slot="title">周期内统计显示直播期间粉丝送给主播的礼物价值</template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                  <em>
                    {{ gift.n }}<span v-if="gift.unit">{{ gift.unit }}</span>
                  </em>
                  <div v-if="giftDelta.n" :class="c.subTxt">
                    {{ comparePrefix }}
                    <span :class="giftDelta.n < 0 ? c.down : c.up">{{ `${giftDelta.n > 0 ? '+' : ''}${giftDelta.n}` }}{{ giftDelta.unit }}</span>
                  </div>
                </li>
                <li>
                  送礼人数
                  <a-tooltip placement="bottom">
                    <template slot="title">周期内统计的粉丝送礼物给主播的人数</template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                  <em>
                    {{ tycoon.n }}<span v-if="tycoon.unit">{{ tycoon.unit }}</span>
                  </em>
                  <div v-if="tycoonDelta.n" :class="c.subTxt">
                    {{ comparePrefix }}
                    <span :class="tycoonDelta.n < 0 ? c.down : c.up">{{ `${tycoonDelta.n > 0 ? '+' : ''}${tycoonDelta.n}` }}{{ tycoonDelta.unit }}</span>
                  </div>
                </li>
                <li>
                  直播时长
                  <a-tooltip placement="bottom">
                    <template slot="title">周期内统计的主播直播的总时长</template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                  <em> {{ duration.n }}{{ duration.unit }}h </em>
                  <div v-if="durationDelta.n" :class="c.subTxt">
                    {{ comparePrefix }}
                    <span :class="durationDelta.n < 0 ? c.down : c.up">{{ `${durationDelta.n > 0 ? '+' : ''}${durationDelta.n}` }}{{ durationDelta.unit }}</span>
                  </div>
                </li>
                <li>
                  总观看数
                  <a-tooltip placement="bottom">
                    <template slot="title">周期内统计的主播直播总观看人数</template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                  <em>
                    {{ viewer.n }}<span v-if="viewer.unit">{{ viewer.unit }}</span>
                  </em>
                  <div v-if="viewerDelta.n" :class="c.subTxt">
                    {{ comparePrefix }}
                    <span :class="viewerDelta.n < 0 ? c.down : c.up">{{ `${viewerDelta.n > 0 ? '+' : ''}${viewerDelta.n}` }}{{ viewerDelta.unit }}</span>
                  </div>
                </li>
                <li>
                  峰值在线
                  <a-tooltip placement="bottom">
                    <template slot="title">周期内统计的主播的单场时段最高观看人数</template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                  <em>
                    {{ onlineMax.n }}<span v-if="onlineMax.unit">{{ onlineMax.unit }}</span>
                  </em>
                  <div v-if="onlineMaxDelta.n" :class="c.subTxt">
                    {{ comparePrefix }}
                    <span :class="onlineMaxDelta.n < 0 ? c.down : c.up">{{ `${onlineMaxDelta.n > 0 ? '+' : ''}${onlineMaxDelta.n}` }}{{ onlineMaxDelta.unit }}</span>
                  </div>
                </li>
              </ul>
            </div>
            <ul :class="c.dataTabs" style="padding: 30px 30px 0">
              <li v-for="{ label, value } in chartTypes1" :key="value" :class="{ [c.dataTabActive]: value === chartType1 }" @click="chartType1 = value">{{ label }}</li>
            </ul>
            <LazyBlock :class="c.block1" :data="chartLines" style="height:338px">
              <Chart :chartData="chartLines" style="height:308px"></Chart>
            </LazyBlock>
            <div :class="c.block1" style="position:relative">
              <h3 :class="c.h3">
                <em> {{ range }} </em>直播记录
              </h3>
              <div :class="c.rtTip" style="top:5px;right:30px">
                <a-tooltip placement="bottom">
                  <template slot="title">
                    <div>观看数：单场直播主播直播期间观看人数</div>
                    <div>峰值在线：单场直播主播直播期间最高观看人数</div>
                    <div>收到贡献值：单场直播主播收到粉丝礼物的金额</div>
                    <div>送礼人数：单场直播时间段粉丝给主播送礼的人数</div>
                    <div>销售额：单场直播时间段粉丝购买的商品的总金额</div>
                    <div>订单数：单场直播时间段粉丝购买的商品订单数量</div>
                  </template>
                  数据说明
                  <a-icon type="question-circle" />
                </a-tooltip>
              </div>
              <ul :class="s.list">
                <li v-for="{ live_id, live_img, is_shopping, is_live, title, start_time, end_time, live_airtime_time, total_viewer_sum, total_viewer_max, total_income, order_num, virtual_coin, tycoon_count_sum } in records" :key="live_id">
                  <div :class="s.avatar"><img :src="live_img" referrerpolicy="no-referrer" @error="onAvatarError" alt="头像" /></div>
                  <div>
                    <div :class="s.titleLine">
                      <span v-if="is_shopping" :class="[c.tagR1, s.tag]">带货直播</span>
                      <span v-if="is_live == 1" :class="[c.tagR3, s.tag]">直播中</span>
                      <span v-else :class="[c.tagR2, s.tag]">已结束</span>
                      <span :class="[c.ellispis1, s.itemTitle]">{{ title || '--' }}</span>
                    </div>
                    <div :class="c.splitInfo">
                      <span>开始时间：{{ start_time || '--' }}</span>
                      <span>结束时间：{{ is_live == 0 ? end_time || '--' : '至今' }}</span>
                      <span v-if="live_airtime_time">总直播时长 {{ live_airtime_time }}h</span>
                    </div>
                    <ul :class="s.data">
                      <li>
                        <span> {{ formatNumber(total_viewer_sum) }} </span>观看数
                      </li>
                      <li>
                        <span> {{ formatNumber(total_viewer_max) }} </span>峰值在线
                      </li>
                      <li v-if="total_income">
                        <span> {{ formatNumber(total_income) }} </span>销售额
                      </li>
                      <li v-if="order_num">
                        <span> {{ formatNumber(order_num) }} </span>订单数
                      </li>
                      <li>
                        <span> {{ formatNumber(virtual_coin) }} </span>收到贡献值
                      </li>
                      <li>
                        <span> {{ formatNumber(tycoon_count_sum) }} </span>送礼人数
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
              <a-pagination v-model="recordsPage" :total="recordsTotal" :pageSize="recordsPageSize" :hideOnSinglePage="true" style="text-align:center"></a-pagination>
            </div>
            <DataBlock :class="c.block1" :req="tycoonsReq" :showEmpty="false" :showErr="false">
              <template v-slot="{ data: { list } }">
                <h3 :class="c.h3">
                  <em> {{ range }} </em>送礼土豪
                </h3>
                <TycoonList v-if="list && list.length > 0" :list="list" :page.sync="tycoonsPage" :pageSize="tycoonsPageSize" :total="tycoonsTotal"></TycoonList>
                <a-empty v-else />
              </template>
            </DataBlock>
          </template>
          <template #empty>
            <div :class="c.noData">
              <img src="~@/assets/no-live.svg" />
              所选时段内未监测到直播数据
            </div>
          </template>
        </DataBlock>
      </template>
      <template v-else-if="platform == 202">
        <DataBlock :req="dataReq2" :handler="handler2" :isEmpty="isEmpty2" style="min-height:300px">
          <template v-slot="{ data: { overview: { gift, msg, sender, viewer, follow }, chartLines } }">
            <div :class="c.block1">
              <h3 :class="c.h3">
                <em> {{ range }} </em>共进行过<em> {{ recordsTotal2 || '--' }} </em>场直播
              </h3>
              <ul :class="c.dataInfoList">
                <li>
                  收到贡献值
                  <a-tooltip placement="bottom">
                    <template slot="title">周期内统计直播期间粉丝送礼的总金额</template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                  <em>
                    {{ gift.n }}<span v-if="gift.unit">{{ gift.unit }}</span>
                  </em>
                </li>
                <li>
                  弹幕数
                  <a-tooltip placement="bottom">
                    <template slot="title">周期内统计直播期间粉丝的总弹幕数量</template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                  <em>
                    {{ msg.n }}<span v-if="msg.unit">{{ msg.unit }}</span>
                  </em>
                </li>
                <li>
                  总送礼人数
                  <a-tooltip placement="bottom">
                    <template slot="title">周期内统计直播期间粉丝送礼的总人数</template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                  <em>
                    {{ sender.n }}<span v-if="sender.unit">{{ sender.unit }}</span>
                  </em>
                </li>
                <li>
                  人气峰值
                  <a-tooltip placement="bottom">
                    <template slot="title">周期内统计直播期间最多的在线人数</template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                  <em>
                    {{ viewer.n }}<span v-if="viewer.unit">{{ viewer.unit }}</span>
                  </em>
                </li>
                <li>
                  粉丝增量
                  <a-tooltip placement="bottom">
                    <template slot="title">周期内统计主播增长的粉丝数量</template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                  <em>
                    {{ follow.n }}<span v-if="follow.unit">{{ follow.unit }}</span>
                  </em>
                </li>
              </ul>
            </div>
            <div style="position:relative">
              <div :class="c.rtTip" style="top:20px;right:30px">
                <a-tooltip placement="bottom">
                  <template slot="title">
                    <div>人气峰值：周期内统计直播期间最多的在线人数</div>
                    <div>直播时长：周期内按天显示当天的直播时长</div>
                    <div>粉丝关注：周期内按天显示当天增长的粉丝关注</div>
                  </template>
                  数据说明
                  <a-icon type="question-circle" />
                </a-tooltip>
              </div>
              <ul :class="c.dataTabs" style="padding: 10px 30px 0">
                <li v-for="{ label, value } in chartTypes2" :key="value" :class="{ [c.dataTabActive]: value === chartType2 }" @click="chartType2 = value">{{ label }}</li>
              </ul>
              <LazyBlock :class="c.block1" :data="chartLines" style="height:338px">
                <Chart :chartData="chartLines" style="height:308px"></Chart>
              </LazyBlock>
            </div>
          </template>
          <template #empty>
            <div :class="c.noData">
              <img src="~@/assets/no-live.svg" />
              所选时段内未监测到直播数据
            </div>
          </template>
        </DataBlock>
        <DataBlock v-show="recordsTotal2 > 0" :class="c.block1" :req="recordsReq2" :handler="recordsHandler2" :showEmpty="false" :showErr="false">
          <template v-slot="{ data: { total, list } }">
            <h3 :class="c.h3">
              <em> {{ range }} </em>直播记录
            </h3>
            <div :class="c.rtTip" style="top:5px;right:30px">
              <a-tooltip placement="bottom">
                <template slot="title">
                  <div>峰值人气：主播或红人直播的单场最高观看人数</div>
                  <div>收到贡献值：主播或红人直播的单场收到礼物价值</div>
                  <div>送礼人数：主播或红人直播的单场送礼物人数</div>
                  <div>弹幕条数：主播或红人直播的单场弹幕的总数</div>
                  <div>弹幕人数：主播或红人直播的单场发送弹幕的人数</div>
                </template>
                数据说明
                <a-icon type="question-circle" />
              </a-tooltip>
            </div>
            <template v-if="list.length > 0">
              <ul :class="s.list">
                <li v-for="{ task_id, live_pic_url, live_status, title, live_start_time, live_end_time, airtime, max_hot, all_gift_price, charge_gift_sender, msg_count, msg_sender } in list" :key="task_id">
                  <div :class="s.avatar"><img :src="live_pic_url" referrerpolicy="no-referrer" @error="onAvatarError" alt="头像" /></div>
                  <div>
                    <div :class="s.titleLine">
                      <span v-if="live_status" :class="[c.tagR3, s.tag]">直播中</span>
                      <span v-else :class="[c.tagR2, s.tag]">已结束</span>
                      <span :class="[c.ellispis1, s.itemTitle]">{{ title || '--' }}</span>
                    </div>
                    <div :class="c.splitInfo">
                      <span>开始时间：{{ live_start_time || '--' }}</span>
                      <span>结束时间：{{ !live_status ? live_end_time || '--' : '至今' }}</span>
                      <span v-if="airtime">总直播时长 {{ airtime }}h</span>
                    </div>
                    <ul :class="s.data">
                      <li>
                        <span> {{ formatNumber(max_hot.maxPopularity) }} </span>峰值人气
                      </li>
                      <li>
                        <span> {{ formatNumber(all_gift_price) }} </span>收到贡献值
                      </li>
                      <li>
                        <span> {{ formatNumber(charge_gift_sender) }} </span>送礼人数
                      </li>
                      <li>
                        <span> {{ formatNumber(msg_count) }} </span>弹幕条数
                      </li>
                      <li>
                        <span> {{ formatNumber(msg_sender) }} </span>弹幕人数
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
              <a-pagination v-model="recordsPage" :total="total" :pageSize="recordsPageSize" :hideOnSinglePage="true" style="text-align:center"></a-pagination>
            </template>
            <a-empty v-else />
          </template>
        </DataBlock>
      </template>
    </div>
  </div>
</template>

<script>
import { createLine1 } from '@/utils/charts/line'
import TycoonList from './TycoonList'
import useDataTimeRange from './data-time-range'
import DataTimeRange from './data-time-range/DataTimeRange'
import { parseNumberUnit, formatNumber } from '@/utils/utils'

export default {
  components: { DataTimeRange, TycoonList },
  props: ['platform', 'room'],
  data() {
    return {
      ...useDataTimeRange.data(),
      chartType1: 'income',
      chartTypes1: [
        { label: '礼物收入', value: 'income' },
        { label: '观看数', value: 'views' }
      ],
      chartType2: 'viewer',
      chartTypes2: [
        { label: '人气峰值', value: 'viewer' },
        { label: '直播时长', value: 'duration' },
        { label: '粉丝关注', value: 'follow' }
      ],
      recordsTotal2: 0,
      recordsPage: 1,
      recordsPageSize: 5,
      tycoonsPage: 1,
      tycoonsPageSize: 10,
      tycoonsTotal: 100
    }
  },
  computed: {
    ...useDataTimeRange.computed,
    dataReq1() {
      return {
        url: 'v1_front_anchor/overview',
        params: {
          platform: this.platform,
          roomid: this.room,
          time_type: this.timeType,
          time: this.time,
          page: this.recordsPage,
          limit: this.recordsPageSize
        }
      }
    },
    tycoonsReq() {
      return {
        url: 'v1_front_anchor/tycoonList',
        params: {
          platform: this.platform,
          roomid: this.room,
          time_type: this.timeType,
          time: this.time,
          page: this.tycoonsPage,
          limit: this.tycoonsPageSize
        }
      }
    },
    dataReq2() {
      return {
        url: 'v1_front_anchor/anchorLiveComprehensiveData',
        params: {
          platform: this.platform,
          roomid: this.room,
          time_type: this.timeType,
          time: this.time
        }
      }
    },
    recordsReq2() {
      return {
        url: 'v1_front_anchor/anchorLiveRecord',
        params: {
          platform: this.platform,
          roomid: this.room,
          time_type: this.timeType,
          time: this.time,
          page: this.recordsPage,
          limit: this.recordsPageSize
        }
      }
    }
  },
  watch: {
    range() {
      this.recordsPage = 1
      this.tycoonsPage = 1
    }
  },
  methods: {
    formatNumber,
    handler1(data) {
      if (!data) return null
      const { virtual_coin, compare_virtual_coin, tycoon_count_sum, compare_tycoon_count_sum, live_airtime_time, compare_live_airtime_time, total_viewer_sum, compare_total_viewer_sum, total_viewer_max, compare_total_viewer_max } = data.overview_data || {}
      const { online_viewer = [], virtual_coin: incomes = [] } = data.data_detail || {}
      return {
        total: data.live_total || '--',
        overview: {
          gift: parseNumberUnit(virtual_coin),
          giftDelta: parseNumberUnit(compare_virtual_coin),
          tycoon: parseNumberUnit(tycoon_count_sum),
          tycoonDelta: parseNumberUnit(compare_tycoon_count_sum),
          duration: parseNumberUnit(live_airtime_time),
          durationDelta: parseNumberUnit(compare_live_airtime_time),
          viewer: parseNumberUnit(total_viewer_sum),
          viewerDelta: parseNumberUnit(compare_total_viewer_sum),
          onlineMax: parseNumberUnit(total_viewer_max),
          onlineMaxDelta: parseNumberUnit(compare_total_viewer_max)
        },
        chartLines: createLine1(
          ({ income: incomes, views: online_viewer }[this.chartType1] || [])
            .filter(item => item)
            .map(({ time, value }) => [time, value])
            .sort((a, b) => (a[0] > b[0] ? 1 : -1))
        ),
        records: data.live_record || [],
        recordsTotal: data.live_total || 0
      }
    },
    isEmpty1(data) {
      return data && data.recordsTotal === 0
    },
    handler2(data) {
      if (!data) return null
      const { all_gift_price, msg_count, charge_gift_sender, maxViewCount, new_followNumber, line: { max_view, airtime, follow } = {} } = data
      return {
        empty: !all_gift_price && !msg_count && !charge_gift_sender && !maxViewCount && !new_followNumber,
        overview: {
          gift: parseNumberUnit(all_gift_price),
          msg: parseNumberUnit(msg_count),
          sender: parseNumberUnit(charge_gift_sender),
          viewer: parseNumberUnit(maxViewCount),
          follow: parseNumberUnit(new_followNumber)
        },
        chartLines: createLine1(
          ({ viewer: max_view, duration: airtime, follow }[this.chartType2] || [])
            .filter(item => item)
            .map(({ time, value }) => [time, value])
            .sort((a, b) => (a[0] > b[0] ? 1 : -1))
        )
      }
    },
    isEmpty2(data) {
      return data && data.empty === true
    },
    recordsHandler2(data) {
      if (!data) return null
      this.recordsTotal2 = data.total
      return data
    }
  }
}
</script>

<style lang="less" module="s">
.title1 {
  width: 292px;
  height: 60px;
  background-image: url(~@/assets/live-title1.png);
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
  .title1 {
    background-image: url(~@/assets/live-title1@2x.png);
  }
}
.list > li {
  display: flex;
  padding: 20px;
  border: 1px solid #f3f6f8;
  border-radius: 4px;
  box-shadow: 0px 1px 5px 0px rgba(153, 153, 153, 0.1);
  margin-bottom: 20px;
}
.avatar {
  width: 90px;
  height: 90px;
  overflow: hidden;
  margin-right: 35px;
  img {
    width: 100%;
    border-radius: 4px;
  }
}
.titleLine {
  display: flex;
  align-items: center;
}
.itemTitle {
  font-size: 18px;
  font-weight: 500;
  max-width: 450px;
  color: #333;
}
.tag {
  width: 76px;
}
.data {
  display: flex;
  color: #666;
  margin-top: 14px;
  li {
    margin-right: 50px;
    span {
      display: block;
      font-size: 18px;
      color: #333;
      font-weight: bold;
    }
  }
}
</style>
