<template>
  <div>
    <div :class="c.dataBlock">
      <h2 :class="[c.imgTitle, s.title1]">作品数据概览</h2>
      <DataBlock :req="summaryReq" :handler="summaryHandler" style="min-height:0">
        <template v-slot="{ data: { fans, likes, videos, aComments, aLikes, aShares } }">
          <ul :class="c.dataList" style="padding:10px 30px 0;">
            <li>
              <em>
                {{ fans.n || '--' }}
                <span v-if="fans.unit">{{ fans.unit }}</span>
              </em>
              总粉丝数
              <a-tooltip placement="bottom">
                <template slot="title">主播或红人在该平台的总粉丝数量</template>
                <a-icon type="question-circle" />
              </a-tooltip>
            </li>
            <li>
              <em>
                {{ likes.n || '--' }}
                <span v-if="likes.unit">{{ likes.unit }}</span>
              </em>
              总获赞数
              <a-tooltip placement="bottom">
                <template slot="title">主播或红人在该平台的总共获得点赞数</template>
                <a-icon type="question-circle" />
              </a-tooltip>
            </li>
            <li>
              <em>
                {{ videos.n || '--' }}
                <span v-if="videos.unit">{{ videos.unit }}</span>
              </em>
              作品数
              <a-tooltip placement="bottom">
                <template slot="title">主播或红人在该平台发的所有作品的数量</template>
                <a-icon type="question-circle" />
              </a-tooltip>
            </li>
            <li>
              <em>
                {{ aComments.n || '--' }}
                <span v-if="aComments.unit">{{ aComments.unit }}</span>
              </em>
              作品平均评论
              <a-tooltip placement="bottom">
                <template slot="title">作品平均评论=总评论数/总作品数量</template>
                <a-icon type="question-circle" />
              </a-tooltip>
            </li>
            <li>
              <em>
                {{ aLikes.n || '--' }}
                <span v-if="aLikes.unit">{{ aLikes.unit }}</span>
              </em>
              作品平均获赞
              <a-tooltip placement="bottom">
                <template slot="title">作品平均获赞=总获赞数/总作品数量</template>
                <a-icon type="question-circle" />
              </a-tooltip>
            </li>
            <li>
              <em>
                {{ aShares.n || '--' }}
                <span v-if="aShares.unit">{{ aShares.unit }}</span>
              </em>
              作品平均分享
              <a-tooltip placement="bottom">
                <template slot="title">作品平均分享=总分享数/总作品数量</template>
                <a-icon type="question-circle" />
              </a-tooltip>
            </li>
          </ul>
        </template>
      </DataBlock>
    </div>
    <DataBlock :class="c.dataBlock" :req="trendReq" :handler="trendHandler" :showErr="false" :showEmpty="false">
      <template v-slot="{ data: { chart } }">
        <h2 :class="[c.imgTitle, s.title2]">趋势表现</h2>
        <div :class="c.rtTip">
          <a-tooltip placement="bottom">
            <template slot="title">
              <div>点赞数：周期内按天显示当天的点赞数</div>
              <div>粉丝数：周期内按天显示当天的粉丝数</div>
              <div>评论数：周期内按天显示当天的评论数</div>
            </template>
            数据说明
            <a-icon type="question-circle" />
          </a-tooltip>
        </div>
        <ul :class="[c.dataTabs, c.dataTab1]">
          <li v-for="{ label, value } in trendRanges" :key="value" :class="{ [c.dataTabActive]: value === trendRange }" @click="trendRange = value">{{ label }}</li>
        </ul>
        <ul :class="c.dataTabs" style="padding:30px 30px 0">
          <li v-for="{ label, value } in trendTypes" :key="value" :class="{ [c.dataTabActive]: value === trendType }" @click="trendType = value">{{ label }}</li>
        </ul>
        <LazyBlock :data="chart" style="height:338px;padding:0 30px 30px">
          <Chart :chartData="chart" style="height:308px"></Chart>
        </LazyBlock>
      </template>
    </DataBlock>
    <DataBlock :class="c.dataBlock" :req="frequencyReq" :handler="frequencyHandler" :showErr="false" :showEmpty="false">
      <template v-slot="{ data: { chart } }">
        <h2 :class="[c.imgTitle, s.title3]">作品发布频率</h2>
        <div :class="c.rtTip">
          <a-tooltip placement="bottom">
            <template slot="title">作品发布频率</template>
            数据说明
            <a-icon type="question-circle" />
          </a-tooltip>
        </div>
        <!-- <div :class="s.titleText">xxx个/周</div> -->
        <LazyBlock :data="chart" style="height:310px;padding-bottom:30px">
          <Chart :chartData="chart" style="height:280px"></Chart>
        </LazyBlock>
      </template>
    </DataBlock>
    <div :class="c.dataBlock" style="min-height:200px">
      <h2 :class="[c.imgTitle, s.title4]">作品列表</h2>
      <div :class="c.rtTip">
        <a-tooltip placement="bottom">
          <template slot="title">周期内显示主播或红人发布的视频/点赞数量/评论以及发布时间</template>
          数据说明
          <a-icon type="question-circle" />
        </a-tooltip>
      </div>
      <DataBlock :req="videoListReq" :handler="videoListHandler">
        <template v-slot="{ data: list }">
          <ul :class="s.videoList">
            <li v-for="({ video_screen_pic, video_desc, video_digg_count, video_comment_count, video_create_time, video_url }, index) in list" :key="index">
              <a :href="video_url" target="_blank" rel="noreferrer">
                <div :class="s.videoCover"><img :src="video_screen_pic" referrerpolicy="no-referrer" /></div>
                <div :class="s.videoContent">
                  <div :class="[c.ellipsis1, s.videoTitle]">{{ video_desc }}</div>
                  <div :class="s.videoData">
                    <span :class="s.like">{{ formatNumber(video_digg_count) }}</span>
                    <span :class="s.comment">{{ formatNumber(video_comment_count) }}</span>
                  </div>
                  <div :class="s.videoInfo">发布时间：{{ video_create_time }}</div>
                </div>
              </a>
            </li>
          </ul>
        </template>
      </DataBlock>
    </div>
  </div>
</template>

<script>
import { createLine1 } from '@/utils/charts/line'
import { createCalendar1 } from '@/utils/charts/calendar'
import { formatNumber, parseNumberUnit } from '@/utils/utils'

export default {
  props: ['platform', 'room'],
  data() {
    return {
      trendType: 3,
      trendTypes: [
        { label: '点赞数', value: 3 },
        { label: '粉丝数', value: 2 },
        { label: '评论数', value: 1 }
      ],
      trendRange: 7,
      trendRanges: [
        { label: '近7天', value: 7 },
        { label: '近30天', value: 30 }
      ]
    }
  },
  computed: {
    summaryReq() {
      return {
        url: 'v1_front_anchor/videoDataSummary',
        params: {
          platform: this.platform,
          roomid: this.room
        }
      }
    },
    trendReq() {
      return {
        url: 'v1_front_anchor/dataTrendLine',
        params: {
          platform: this.platform,
          roomid: this.room,
          type: this.trendType,
          day: this.trendRange
        }
      }
    },
    frequencyReq() {
      return {
        url: 'v1_front_anchor/videoIssueFrequency',
        params: {
          platform: this.platform,
          roomid: this.room
        }
      }
    },
    videoListReq() {
      return {
        url: 'v1_front_anchor/videoList',
        params: {
          platform: this.platform,
          roomid: this.room,
          type: 1,
          limit: 10
        }
      }
    }
  },
  methods: {
    formatNumber,
    summaryHandler(data) {
      const { fans_num, favorited_num, video_num, avg_comment_count, avg_favorited_num, avg_share_count } = data || {}
      return {
        fans: parseNumberUnit(fans_num),
        likes: parseNumberUnit(favorited_num),
        videos: parseNumberUnit(video_num),
        aComments: parseNumberUnit(avg_comment_count),
        aLikes: parseNumberUnit(avg_favorited_num),
        aShares: parseNumberUnit(avg_share_count)
      }
    },
    trendHandler(data) {
      if (!data) return { chart: null }
      return { chart: createLine1((data.list || []).map(({ date, count }) => [date, count]).sort((a, b) => (a[0] > b[0] ? 1 : -1))) }
    },
    frequencyHandler(data) {
      if (!data) return { chart: null }
      return { chart: createCalendar1((data.list || []).map(({ date, count }) => [date, count])) }
    },
    videoListHandler(data) {
      return data?.list || []
    }
  }
}
</script>

<style lang="less" module="s">
.title1 {
  width: 292px;
  height: 49px;
  background-image: url(~@/assets/video-title1.png);
}
.title2 {
  width: 292px;
  height: 59px;
  background-image: url(~@/assets/video-title2.png);
}
.title3 {
  width: 292px;
  height: 49px;
  background-image: url(~@/assets/video-title3.png);
}
.title4 {
  width: 292px;
  height: 49px;
  background-image: url(~@/assets/video-title4.png);
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
  .title1 {
    background-image: url(~@/assets/video-title1@2x.png);
  }
  .title2 {
    background-image: url(~@/assets/video-title2@2x.png);
  }
  .title3 {
    background-image: url(~@/assets/video-title3@2x.png);
  }
  .title4 {
    background-image: url(~@/assets/video-title4@2x.png);
  }
}
.titleText {
  position: absolute;
  left: 212px;
  top: 15px;
  color: #736af2;
}
.videoList {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px 40px 40px;
  li {
    width: 164px;
    margin: 30px 30px 0 0;
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    }
  }
}
.videoCover {
  position: relative;
  height: 291px;
  overflow: hidden;
  background: #000;
  img {
    width: 100%;
    height: auto;
  }
  &::after {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    left: 50%;
    top: 50%;
    margin: -25px 0 0 -25px;
    background: url(~@/assets/play.svg) no-repeat 0 0 / contain;
  }
}
.videoContent {
  padding: 10px;
  color: #333;
}
.videoTitle {
  margin-bottom: 8px;
}
.videoData {
  display: flex;
  justify-content: space-between;
}
.like,
.comment {
  &::before {
    content: '';
    display: inline-block;
    width: 11px;
    height: 10px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
    margin: -2px 4px 0 0;
  }
}
.like::before {
  background-image: url(~@/assets/heart.svg);
}
.comment::before {
  background-image: url(~@/assets/comment.svg);
}
.videoInfo {
  font-size: 12px;
  color: #999;
  margin-top: 7px;
}
</style>
