<template>
  <div>
    <div :class="c.dataBlock" style="min-height:300px">
      <h2 :class="[c.imgTitle, s.title1]">互动数据-视频作品评论分析</h2>
      <div :class="s.container1">
        <div style="width:447px;margin-right:24px">
          <h3 :class="c.h3">关键词分析<small>近7天评论</small></h3>
          <LazyBlock :data="chartWords" style="height:396px;margin-top:-20px">
            <Chart :chartData="chartWords" :loading="chartWordsLoading" style="height:396px"></Chart>
          </LazyBlock>
        </div>
        <div :class="s.block" style="padding-bottom:10px">
          <h3 :class="c.h3">评论详情</h3>
          <div :class="s.search">
            <input type="text" />
            <button>搜索</button>
          </div>
          <ul :class="s.commentList">
            <li><span :class="[c.ellipsis1, s.comment]">帅起来谁都比不了[灵光一闪][灵光一闪][灵光一闪][灵光一闪],帅起来谁都比不了[灵光一闪][灵光一闪][灵光一闪][灵光一闪]</span><span :class="s.time">2019-09-11</span></li>
            <li><span :class="[c.ellipsis1, s.comment]">惠子，姐姐我好喜欢你啊</span><span :class="s.time">2019-09-11</span></li>
            <li><span :class="[c.ellipsis1, s.comment]">帅起来谁都比不了[灵光一闪][灵光一闪][灵光一闪][灵光一闪],帅起来谁都比不了[灵光一闪][灵光一闪][灵光一闪][灵光一闪]</span><span :class="s.time">2019-09-11</span></li>
            <li><span :class="[c.ellipsis1, s.comment]">惠子，姐姐我好喜欢你啊</span><span :class="s.time">2019-09-11</span></li>
            <li><span :class="[c.ellipsis1, s.comment]">帅起来谁都比不了[灵光一闪][灵光一闪][灵光一闪][灵光一闪],帅起来谁都比不了[灵光一闪][灵光一闪][灵光一闪][灵光一闪]</span><span :class="s.time">2019-09-11</span></li>
            <li><span :class="[c.ellipsis1, s.comment]">惠子，姐姐我好喜欢你啊</span><span :class="s.time">2019-09-11</span></li>
            <li><span :class="[c.ellipsis1, s.comment]">帅起来谁都比不了[灵光一闪][灵光一闪][灵光一闪][灵光一闪],帅起来谁都比不了[灵光一闪][灵光一闪][灵光一闪][灵光一闪]</span><span :class="s.time">2019-09-11</span></li>
            <li><span :class="[c.ellipsis1, s.comment]">惠子，姐姐我好喜欢你啊</span><span :class="s.time">2019-09-11</span></li>
            <li><span :class="[c.ellipsis1, s.comment]">帅起来谁都比不了[灵光一闪][灵光一闪][灵光一闪][灵光一闪],帅起来谁都比不了[灵光一闪][灵光一闪][灵光一闪][灵光一闪]</span><span :class="s.time">2019-09-11</span></li>
            <li><span :class="[c.ellipsis1, s.comment]">惠子，姐姐我好喜欢你啊</span><span :class="s.time">2019-09-11</span></li>
          </ul>
          <a-pagination size="small" :total="50" :show-total="total => `共 ${total} 条`" show-quick-jumper :hideOnSinglePage="true" style="margin-top:20px" />
          <!-- <a-empty :image="noDataImage" style="padding:60px 0" /> -->
          <!-- <a-spin :class="c.posCenter" /> -->
        </div>
      </div>
      <!-- <a-empty :image="noDataImage" style="padding:50px 0 80px" /> -->
      <!-- <a-spin :class="c.posCenter" /> -->
    </div>
    <div :class="c.dataBlock">
      <h2 :class="[c.imgTitle, s.title2]">互动数据-直播弹幕分析</h2>
      <DataTimeRange :preset.sync="preset" :presetList="presetList" :day.sync="day" :dayList="dayList" style="padding-left:130px" />
      <!-- <div :class="c.noData">
        <img src="~@/assets/no-danmu.svg" />
        所选时段内未进行过直播，无弹幕数据可供分析
      </div> -->
      <ul :class="c.dataInfoList" style="margin-top:20px">
        <li>
          弹幕条数<em>49.91<span>万</span></em>
          <div :class="c.subTxt" v-if="preset">{{ comparePrefix }}<span :class="c.up">+10.13万</span></div>
        </li>
        <li>
          发送弹幕总人数<em>5877</em>
          <div :class="c.subTxt" v-if="preset">{{ comparePrefix }}<span :class="c.up">+2513</span></div>
        </li>
      </ul>
      <ul :class="c.dataTabs" style="padding: 30px 30px 0">
        <li :class="c.dataTabActive">弹幕条数</li>
        <li>弹幕人数</li>
      </ul>
      <LazyBlock :class="c.block1" :data="chartLines" style="height:338px">
        <Chart :chartData="chartLines" :loading="chartLinesLoading" style="height:308px"></Chart>
      </LazyBlock>
      <div :class="s.container1">
        <div style="width:457px">
          <h3 :class="c.h3">
            <em>{{ range }}</em> 单位观众发送弹幕数量占比
          </h3>
          <LazyBlock :data="chartPie" style="height:470px;margin-top:-20px">
            <Chart :chartData="chartPie" :loading="chartPieLoading" style="height:470px"></Chart>
          </LazyBlock>
        </div>
        <div :class="s.block">
          <h3 :class="c.h3">
            <em>{{ range }}</em> 观众弹幕排行
          </h3>
          <div :class="c.th">
            <div :class="s.colOrder">排序</div>
            <div :class="s.colName">昵称</div>
            <div :class="s.colAmount">弹幕数量</div>
          </div>
          <ul :class="[c.tbList, s.rank1]">
            <li v-for="(item, index) in danmuRank" :key="index">
              <div :class="[c.colOrder, s.colOrder]">
                <span v-if="index < 3" :class="c[`no${index + 1}`]">{{ index + 1 }}</span>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div :class="[c.ellipsis1, s.colName]">菲利普达文西</div>
              <div :class="s.colAmount">
                <em>9.35<span>万</span></em>
              </div>
            </li>
          </ul>
          <!-- <a-empty :image="noDataImage" style="padding:120px 0" /> -->
        </div>
      </div>
      <div :class="c.block1">
        <h3 :class="c.h3">近期弹幕热词</h3>
        <HotWords :words="hotWords" />
        <!-- <a-empty :image="noDataImage" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { createWordCloud1 } from '@/utils/charts/word-cloud'
import { createLine1 } from '@/utils/charts/line'
import { createPie1 } from '@/utils/charts/pie'
import HotWords from '@/components/HotWords'
import useDataTimeRange from './data-time-range'
import DataTimeRange from './data-time-range/DataTimeRange'

export default {
  components: { HotWords, DataTimeRange },
  data() {
    return {
      chartWords: null,
      chartWordsLoading: false,
      ...useDataTimeRange.data(),
      chartLines: null,
      chartLinesLoading: false,
      chartPie: null,
      chartPieLoading: false,
      danmuRank: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      hotWords: [
        { count: 1943, sender_count: 786, content: '白没钱' },
        { count: 630, sender_count: 414, content: '姜鹏兄弟想你了' },
        { count: 481, sender_count: 355, content: '姜鹏' },
        { count: 438, sender_count: 305, content: '白的' },
        { count: 413, sender_count: 318, content: '没了' },
        { count: 399, sender_count: 251, content: '喜欢你' },
        { count: 370, sender_count: 207, content: '没钱' },
        { count: 339, sender_count: 335, content: '呆若木鸡' },
        { count: 282, sender_count: 223, content: '瑜大公子' },
        { count: 280, sender_count: 257, content: '将心比心' },
        { count: 270, sender_count: 261, content: '横七竖八' },
        { count: 259, sender_count: 234, content: '将门虎子' },
        { count: 255, sender_count: 146, content: '连姜鹏' },
        { count: 253, sender_count: 147, content: '连鹏哥' },
        { count: 237, sender_count: 236, content: '持之以恒' },
        { count: 236, sender_count: 193, content: '没有' },
        { count: 225, sender_count: 112, content: '挂了' },
        { count: 185, sender_count: 22, content: '蹲男朋友' },
        { count: 158, sender_count: 147, content: '知道' },
        { count: 158, sender_count: 158, content: '容光焕发' }
      ].map(item => ({ text: item.content }))
    }
  },
  computed: { ...useDataTimeRange.computed },
  mounted() {
    this.chartWordsLoading = true
    setTimeout(() => {
      const data = {
        text: '惠子',
        words: [
          { name: '一下', value: 154 },
          { name: '一个', value: 502 },
          { name: '一样', value: 128 },
          { name: '不会', value: 86 },
          { name: '不是', value: 368 },
          { name: '不能', value: 93 },
          { name: '不要', value: 180 },
          { name: '为什么', value: 197 },
          { name: '人生', value: 102 },
          { name: '什么', value: 340 },
          { name: '以为', value: 96 },
          { name: '你们', value: 187 },
          { name: '偷拍', value: 82 },
          { name: '关注', value: 174 },
          { name: '去污粉', value: 84 },
          { name: '可以', value: 183 },
          { name: '可爱', value: 177 },
          { name: '吃饭', value: 116 },
          { name: '后面', value: 200 },
          { name: '吹风机', value: 90 },
          { name: '哈哈', value: 86 },
          { name: '哈哈哈', value: 129 },
          { name: '哪里', value: 85 },
          { name: '喜欢', value: 409 },
          { name: '回来', value: 88 },
          { name: '外面', value: 275 },
          { name: '多少', value: 96 },
          { name: '天亮', value: 143 },
          { name: '天秤', value: 146 },
          { name: '天秤座', value: 260 },
          { name: '奸笑', value: 122 },
          { name: '好像', value: 170 },
          { name: '好看', value: 333 },
          { name: '姐姐', value: 234 },
          { name: '安琪拉', value: 135 },
          { name: '室友', value: 118 },
          { name: '害羞', value: 156 },
          { name: '小姐姐', value: 207 },
          { name: '就是', value: 371 },
          { name: '已经', value: 111 },
          { name: '应该', value: 97 },
          { name: '建议', value: 150 },
          { name: '开始', value: 81 },
          { name: '怎么', value: 281 },
          { name: '惠子', value: 1170 },
          { name: '感觉', value: 177 },
          { name: '我们', value: 204 },
          { name: '所以', value: 90 },
          { name: '手机', value: 285 },
          { name: '抱抱', value: 81 },
          { name: '时候', value: 129 },
          { name: '是不是', value: 138 },
          { name: '最强', value: 94 },
          { name: '有人', value: 104 },
          { name: '有毒', value: 120 },
          { name: '有点', value: 102 },
          { name: '机智', value: 100 },
          { name: '橙子', value: 92 },
          { name: '段位', value: 147 },
          { name: '比基尼', value: 261 },
          { name: '永恒', value: 124 },
          { name: '没有', value: 278 },
          { name: '注意', value: 123 },
          { name: '流泪', value: 217 },
          { name: '漂亮', value: 193 },
          { name: '灵光', value: 396 },
          { name: '特效', value: 123 },
          { name: '王者', value: 405 },
          { name: '现在', value: 160 },
          { name: '直播', value: 145 },
          { name: '看到', value: 296 },
          { name: '看见', value: 109 },
          { name: '看过', value: 91 },
          { name: '真的', value: 168 },
          { name: '知道', value: 336 },
          { name: '第三', value: 156 },
          { name: '粉丝', value: 286 },
          { name: '老婆', value: 180 },
          { name: '自己', value: 138 },
          { name: '荣耀', value: 160 },
          { name: '衣服', value: 443 },
          { name: '西安', value: 86 },
          { name: '见到', value: 119 },
          { name: '视角', value: 319 },
          { name: '视频', value: 342 },
          { name: '评论', value: 90 },
          { name: '跳舞', value: 86 },
          { name: '身材', value: 118 },
          { name: '过来', value: 97 },
          { name: '还是', value: 216 },
          { name: '还有', value: 110 },
          { name: '这个', value: 536 },
          { name: '这么', value: 197 },
          { name: '这样', value: 124 },
          { name: '这里', value: 143 },
          { name: '那个', value: 339 },
          { name: '那么', value: 120 },
          { name: '钻石', value: 187 },
          { name: '青铜', value: 135 },
          { name: '黄金', value: 84 }
        ]
      }
      this.chartWords = createWordCloud1(data.words)
      this.chartWordsLoading = false
    }, 2000)

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

    const danmuNums = { msg_bt_2_5: 97176, msg_bt_6_10: 17451, msg_bt_11_20: 6854, msg_greater_20: 3889, msg_send_one: 171484 }
    this.chartPie = createPie1(
      [
        {
          value: danmuNums.msg_send_one,
          name: '1次'
        },
        {
          value: danmuNums.msg_bt_2_5,
          name: '2-5次'
        },
        {
          value: danmuNums.msg_bt_6_10,
          name: '6-10次'
        },
        {
          value: danmuNums.msg_bt_11_20,
          name: '11-20次'
        },
        {
          value: danmuNums.msg_greater_20,
          name: '20次以上'
        }
      ],
      { unit: '人', color: ['#5C89FF', '#7C6AF2', '#C95FF2', '#FF6383', '#FF9F40'] }
    )
  }
}
</script>

<style lang="less" module="s">
.title1 {
  width: 341px;
  height: 48px;
  background-image: url(~@/assets/danmu-title1.png);
}
.title2 {
  width: 297px;
  height: 60px;
  background-image: url(~@/assets/danmu-title2.png);
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
  .title1 {
    background-image: url(~@/assets/danmu-title1@2x.png);
  }
  .title2 {
    background-image: url(~@/assets/danmu-title2@2x.png);
  }
}
.container1 {
  position: relative;
  display: flex;
  padding: 0 30px 30px;
}
.block {
  flex: 1;
  position: relative;
}
.search {
  position: relative;
  width: 257px;
  input {
    width: 100%;
    height: 30px;
    padding-left: 10px;
    padding-right: 74px;
    border-radius: 2px;
    border: 1px solid #e3e4eb;
    color: #736af2;
    font-weight: 600;
    outline: none;
    transition: all 0.3s;
    &:hover,
    &:focus {
      border-color: #a399ff;
    }
  }
  button {
    position: absolute;
    right: 3px;
    top: 3px;
    width: 61px;
    height: 24px;
    background: #736af2;
    border: 0;
    border-radius: 2px;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    transition: all 0.3s;
    &:hover,
    &:focus {
      background-color: #a399ff;
    }
  }
}
.commentList {
  color: #333;
  margin-top: 20px;
  li {
    display: flex;
    margin-top: 16px;
  }
  .comment {
    flex: 1;
    width: 0;
  }
  .time {
    flex-basis: 82px;
    font-size: 12px;
    color: #999;
    text-align: right;
  }
}
.colOrder {
  width: 48px;
  text-align: center;
}
.colName {
  flex: 1;
  width: 0;
  padding-left: 20px;
}
.colAmount {
  width: 110px;
  padding-right: 20px;
  text-align: right;
}
.rank1 {
  color: #333;
  li {
    min-height: 60px;
  }
  em {
    color: #ee7a30;
  }
}
</style>
