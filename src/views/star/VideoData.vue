<template>
  <div>
    <div :class="c.dataBlock">
      <h2 :class="[c.imgTitle, s.title1]">作品数据概览</h2>
      <ul :class="s.list1">
        <li>
          <em>6113.90<span>万</span></em>
          总粉丝数
        </li>
        <li>
          <em>3667.88<span>万</span></em>
          总获赞数
        </li>
        <li>
          <em>37</em>
          作品数
        </li>
        <li>
          <em>30.10<span>万</span></em>
          作品平均评论
        </li>
        <li>
          <em>99.13<span>万</span></em>
          作品平均获赞
        </li>
        <li>
          <em>11.14<span>万</span></em>
          作品平均分享
        </li>
      </ul>
    </div>
    <div :class="c.dataBlock">
      <h2 :class="[c.imgTitle, s.title2]">趋势表现</h2>
      <ul :class="[c.dataTabs, c.dataTab1]">
        <li :class="c.dataTabActive">近7天</li>
        <li>近30天</li>
      </ul>
      <ul :class="c.dataTabs" style="padding: 30px 30px 0">
        <li :class="c.dataTabActive">点赞数</li>
        <li>粉丝数</li>
        <li>评论数</li>
      </ul>
      <LazyBlock :class="c.lazyBlock" :data="chartLines" style="height:338px;padding:0 30px 30px">
        <Chart :chartData="chartLines" :loading="chartLinesLoading" style="height:308px"></Chart>
      </LazyBlock>
    </div>
    <div :class="c.dataBlock">
      <h2 :class="[c.imgTitle, s.title3]">作品发布频率</h2>
      <div v-if="numAverage" :class="s.titleText">{{ numAverage }}个/周</div>
      <LazyBlock :class="c.lazyBlock" :data="chartCalendar" style="height:310px;padding-bottom:30px">
        <Chart :chartData="chartCalendar" :loading="chartCalendarLoading" style="height:280px"></Chart>
      </LazyBlock>
    </div>
    <div :class="c.dataBlock">
      <h2 :class="[c.imgTitle, s.title4]">作品列表</h2>
      <ul v-if="videoList && videoList.length > 0" :class="s.videoList">
        <li v-for="({ video_screen_pic, video_desc, video_digg_count, video_comment_count, video_create_time, video_url }, index) in videoList" :key="index">
          <a :href="video_url" target="_blank" rel="noreferrer">
            <div :class="s.videoCover"><img :src="video_screen_pic" referrerpolicy="no-referrer" /></div>
            <div :class="s.videoContent">
              <div :class="[c.ellipsis1, s.videoTitle]">{{ video_desc }}</div>
              <div :class="s.videoData">
                <span :class="s.digg">{{ formatNumber(video_digg_count) }}</span>
                <span :class="s.comment">{{ formatNumber(video_comment_count) }}</span>
              </div>
              <div :class="s.videoInfo">发布时间：{{ video_create_time }}</div>
            </div>
          </a>
        </li>
      </ul>
      <a-empty v-else-if="videoList && videoList.length === 0" style="padding: 40px 0 50px" />
      <a-spin v-if="videoListLoading" :class="c.posCenter" />
    </div>
  </div>
</template>

<script>
import { createLine1 } from '@/utils/charts/line'
import { createCalendar1 } from '@/utils/charts/calendar'
import { formatNumber } from '@/utils/utils'

export default {
  data() {
    return {
      chartLines: null,
      chartLinesLoading: false,
      numAverage: 0,
      chartCalendar: null,
      chartCalendarLoading: false,
      videoList: null,
      videoListLoading: false
    }
  },
  methods: { formatNumber },
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

    this.chartCalendarLoading = true
    setTimeout(() => {
      const { data, average } = {
        data: [
          { count: 1, date: '2020-10-13' },
          { count: 1, date: '2020-10-12' },
          { count: 1, date: '2020-10-11' },
          { count: 2, date: '2020-10-02' },
          { count: 1, date: '2020-10-01' },
          { count: 1, date: '2020-09-30' },
          { count: 1, date: '2020-09-24' },
          { count: 1, date: '2020-08-28' },
          { count: 1, date: '2020-08-27' },
          { count: 5, date: '2020-08-18' },
          { count: 3, date: '2020-08-17' },
          { count: 3, date: '2020-08-16' },
          { count: 1, date: '2020-08-15' },
          { count: 1, date: '2020-08-14' },
          { count: 1, date: '2020-08-10' },
          { count: 1, date: '2020-07-18' },
          { count: 1, date: '2020-07-17' },
          { count: 1, date: '2020-06-21' },
          { count: 3, date: '2020-06-20' },
          { count: 1, date: '2020-06-11' },
          { count: 1, date: '2020-06-09' },
          { count: 1, date: '2020-04-08' },
          { count: 1, date: '2020-04-05' },
          { count: 1, date: '2020-04-03' },
          { count: 1, date: '2020-04-01' },
          { count: 1, date: '2020-03-14' },
          { count: 1, date: '2020-03-07' },
          { count: 1, date: '2020-03-06' },
          { count: 1, date: '2020-03-02' },
          { count: 1, date: '2020-03-01' },
          { count: 1, date: '2020-02-27' },
          { count: 1, date: '2020-02-24' },
          { count: 2, date: '2020-02-22' },
          { count: 1, date: '2020-02-17' },
          { count: 2, date: '2020-02-15' },
          { count: 4, date: '2020-01-08' },
          { count: 1, date: '2020-01-05' },
          { count: 1, date: '2020-01-01' }
        ],
        average: 0.9
      }
      this.numAverage = average
      if (data) {
        this.chartCalendar = createCalendar1(data.map(({ date, count }) => [date, count]))
      }
      this.chartCalendarLoading = false
    }, 3000)

    this.videoListLoading = true
    setTimeout(() => {
      this.videoList = [
        {
          video_digg_count: 60000,
          video_share_count: 0,
          video_comment_count: 9554,
          video_view_count: 4848000,
          video_desc: '\u4e09\u751f\u4e09\u4e16\u5341\u91cc\u6843\u82b1\n\u6211\u4eec\u572810\u670818\u65e5\u8f9b\u5df4\u76f4\u64ad\u95f4\u4e0e\u60a8\u6709\u7ea6\n\n\u54c8\u54c8\u54c8\u4e0d\u65ad\u66f4\u65b0\u54e6',
          video_url: 'https://live.kuaishou.com/u/3xxcgtnm2bj65kq/3xuc2ch77tghtpq',
          video_create_time: '2020-10-13',
          video_screen_pic: 'https://tx2.a.yximgs.com/upic/2020/10/13/20/BMjAyMDEwMTMyMDExMTVfMTg4ODg4ODgwXzM3NjQzNDA3NzIyXzFfMw==_B7b1a223d56d673608cd97b9dae246446.jpg?clientCacheKey=3xuc2ch77tghtpq.jpg&di=6e2b326c&bp=13414'
        },
        {
          video_digg_count: 262000,
          video_share_count: 0,
          video_comment_count: 33000,
          video_view_count: 17762000,
          video_desc:
            '2020\u7c89\u4e1d\u72c2\u6b22\u591c\n818\u81ea\u5df1\u7684\u8282\u65e5\n\u8bb0\u5f97\u6765\u770b\u8f9b\u5df4\u4e3a\u60a8\u51c6\u5907\u7684\u6bcf\u4e00\u4e2a\u7cbe\u5f69\u7684\u77ac\u95f4\n\u505a\u4e00\u4ef6\u4e8b\u5c31\u50cf\u4e00\u4ef6\u4e8b\n\u627f\u8bfa\u4e00\u4ef6\u4e8b \u5c31\u5b8c\u6210\u4e00\u4ef6\u4e8b\n\u9762\u5bf9\u66fe\u7ecf\u7684\u4ed6 \u6240\u6709\u7528\u6237\n\u6df1\u77e5 \u4f60\u4eec\u662f\u6211\u4ece\u5546\u6700\u5927\u7684\u8d22\u5bcc\n\n\u6bcf\u5e74\u4e00\u5ea6 \u671f\u5f85\u966a\u4f60\u4eec\u76f4\u5230\u8001\u53bb\n\u5982\u679c\u6709\u5929\u6211\u4e0d\u518d\u6709\u8fd9\u4efd\u80fd\u529b \n\u6211\u4f1a\u4eb2\u81ea\u4e0a\u53f0 \u5e0c\u671b\u5230\u65f6\u5019\u7684\u4f60\u4e0d\u8981\u5acc\u5f03\n\u76f8\u4fe1\u76f8\u4fe1\u7684\u529b\u91cf',
          video_url: 'https://live.kuaishou.com/u/3xxcgtnm2bj65kq/3x49vgqwacvmpz9',
          video_create_time: '2020-10-12',
          video_screen_pic: 'https://tx2.a.yximgs.com/upic/2020/10/12/19/BMjAyMDEwMTIxOTU3MDFfMTg4ODg4ODgwXzM3NTk3OTkxNDg4XzFfMw==_B72522b1a95b917ee5859cf17a3c86cb9.jpg?clientCacheKey=3x49vgqwacvmpz9.jpg&di=6e2b326c&bp=13414'
        },
        {
          video_digg_count: 274000,
          video_share_count: 0,
          video_comment_count: 18000,
          video_view_count: 24068000,
          video_desc:
            '18\u53f7\u76f8\u7ea6\u76f4\u64ad\u95f4\n\u8fd9\u662f\u4e00\u573a\u53ea\u5c5e\u4e8e\u4f60\u7684\u6f14\u5531\u4f1a\n\u5168\u7a0b\u65e0\u5c3f\u70b9  \u4e0d\u5356\u8d27 \n\n\u8fd9\u662f\u6211\u7684\u4e00\u4efd\u627f\u8bfa \u5bf9\u4e8e\u66fe\u7ecf\u7684\u4ed6\n818\u5ef6\u8fdf\u52301018  \u8fdf\u5230\u7684\u627f\u8bfa\n\n\u611f\u8c22\u66fe\u7ecf\u7684\u4ed6 \u611f\u6069\u6240\u6709\u7528\u6237\u8d50\u4e88\u5149\u73af\n\u53ea\u8981\u6211\u8fd8\u5728 \u6bcf\u5e74\u90fd\u4f1a\u7ee7\u7eed\n\u8fd8\u6b20\u4f60\u4eec\u4e00\u573a\u9e1f\u5de2 \u4eca\u5e74\u662f\u5728\u7279\u6b8a\n\u671b\u8c05\u89e3\n\u6765\u5427\u6b23\u8d4f\u4eca\u5e74\u6765\u4e4b\u4e0d\u6613\u7684\u4e00\u573a\u5b9e\u529b\u6f14\u5531\u4f1a',
          video_url: 'https://live.kuaishou.com/u/3xxcgtnm2bj65kq/3xpdypmtnm2d8z9',
          video_create_time: '2020-10-11',
          video_screen_pic: 'https://tx2.a.yximgs.com/upic/2020/10/11/18/BMjAyMDEwMTExODAxMzBfMTg4ODg4ODgwXzM3NTQ1MDc4NDY2XzFfMw==_B12456f6060eeab00b833621cec068ec2.jpg?clientCacheKey=3xpdypmtnm2d8z9.jpg&di=6e2b326c&bp=13414'
        },
        {
          video_digg_count: 47000,
          video_share_count: 0,
          video_comment_count: 7231,
          video_view_count: 2073000,
          video_desc:
            '2020\u76ae\u8349\u8282 \u5468\u516d\u516d\u70b9\n\u4f60\u51c6\u5907\u597d\u4e86\u4e48\n\u505a\u5230\u4e86\u5386\u5e74\u6765\u6ca1\u6709\u7684\u4ef7\u683c\n\n\u66fe\u7ecf\u4f60\u820d\u4e0d\u5f97  \u73b0\u5728\u8ba9\u4f60\u820d\u4e0d\u5f97\u4e0d\u4e70\n\u51c6\u5907\u597d\u624b\u901f \u51c6\u5907\u597d\u94b1\u5305 \u68c0\u67e5\u597d\u8def\u7531\u5668 \u4e00\u573a\u60ca\u8273\u7684\u76ae\u8349\u76db\u5178\n\n\u611f\u8c22\u66fe\u7ecf\u7684\u4ed6 \u611f\u8c22\u6240\u6709\u7528\u6237\n\n\u62fc\u5c3d\u5168\u529b \u505a\u597d\u81ea\u5df1',
          video_url: 'https://live.kuaishou.com/u/3xxcgtnm2bj65kq/3xamkevvi5j9it6',
          video_create_time: '2020-10-02',
          video_screen_pic: 'https://tx2.a.yximgs.com/upic/2020/10/02/21/BMjAyMDEwMDIyMTEyMzZfMTg4ODg4ODgwXzM3MDI2MzM4MjM4XzFfMw==_B0ba588a33fc3eab0ef96b95df474b9f7.jpg?di=6e2b3b03&bp=13414'
        },
        {
          video_digg_count: 247000,
          video_share_count: 0,
          video_comment_count: 25000,
          video_view_count: 18943000,
          video_desc:
            '\u5468\u516d6\u70b9  \u51c6\u5907\u597d\u94b1\u5305 \u51c6\u5907\u597d\u7f51\u7edc\n\u62fc\u597d\u624b\u901f  \u8d85\u7ea7\u6027\u4ef7\u6bd4\u6765\u4e86\n\u6311\u6218\u5386\u5e74\u4ee5\u6765\u6781\u81f4\u6027\u4ef7\u6bd4\n\u66fe\u7ecf\u4f60\u820d\u4e0d\u5f97\u7684  \u4eca\u5929\u8ba9\u4f60\u820d\u4e0d\u5f97\u4e0d\u4e70\n\n\u5468\u516d\u76f4\u64ad\u95f4\u4e0d\u89c1\u4e0d\u6563 \n\n\u611f\u8c22\u66fe\u4eca\u7684\u4ed6 \u611f\u6069\u6240\u6709\u7528\u6237\n\u62fc\u5c3d\u5168\u529b \u505a\u597d\u81ea\u5df1',
          video_url: 'https://live.kuaishou.com/u/3xxcgtnm2bj65kq/3xsyxsicihazk9s',
          video_create_time: '2020-10-02',
          video_screen_pic: 'https://tx2.a.yximgs.com/upic/2020/10/02/06/BMjAyMDEwMDIwNjU4MjBfMTg4ODg4ODgwXzM2OTY4NjQxOTU0XzFfMw==_B4d786a1e25c02ab3ee418818870ae747.jpg?di=6e2b3b03&bp=13414'
        },
        {
          video_digg_count: 500000,
          video_share_count: 0,
          video_comment_count: 58000,
          video_view_count: 13640000,
          video_desc: '\u7956\u56fd \u5b89\u5eb7 \uff01',
          video_url: 'https://live.kuaishou.com/u/3xxcgtnm2bj65kq/3xtudwwpxt2rv7u',
          video_create_time: '2020-10-01',
          video_screen_pic: 'https://tx2.a.yximgs.com/upic/2020/10/01/21/BMjAyMDEwMDEyMTE3NDRfMTg4ODg4ODgwXzM2OTUxNjk0NDgxXzFfMw==_B665912f09627d578c66048257893b4e3.jpg?clientCacheKey=3xtudwwpxt2rv7u.jpg&di=6e2b326c&bp=13414'
        },
        {
          video_digg_count: 541000,
          video_share_count: 0,
          video_comment_count: 65000,
          video_view_count: 47386000,
          video_desc:
            '10\u67083\u53f7\u665a\u4e0a\u516d\u70b9\n\u5927\u578b\u76ae\u8349\u8282  \u6311\u6218\u5386\u5e74\u6765\u5168\u7f51\u6781\u81f4\u6027\u4ef7\u6bd4\n\n\u8fd9\u662f\u4e00\u6b21\u4ef7\u683c\u7684\u6311\u6218 \u8fd9\u662f\u4e00\u6b21\u54c1\u8d28\u7684\u5960\u5b9a \u6211\u4eec\u51c6\u5907\u4e86\u516d\u4e2a\u6708 \u4f60\u53ea\u9700\u8981\u51c6\u5907\u597d\u624b\u901f  \n\u4ee5\u524d\u7684\u4f60\u820d\u4e0d\u5f97\u8d2d\u4e70 \u73b0\u5728\u7684\u4f60\u820d\u4e0d\u5f97\u4e0d\u4e70\n\u9009\u62e9\u6211 \u90a3\u5929\u4e3a\u4f60\u8282\u7701\u6bcf\u4e00\u5206\n\n\u611f\u8c22\u66fe\u4eca\u7684\u4ed6 \u611f\u6069\u6240\u6709\u7528\u6237\n\u6211\u4eec3\u53f7\u665a\u4e0a\u89c1',
          video_url: 'https://live.kuaishou.com/u/3xxcgtnm2bj65kq/3xugts6bhz9snjw',
          video_create_time: '2020-09-30',
          video_screen_pic: 'https://tx2.a.yximgs.com/upic/2020/09/30/20/BMjAyMDA5MzAyMDA5MzFfMTg4ODg4ODgwXzM2ODU2MDE1MTgyXzFfMw==_Bd5a70cd1ee7f0e0aded3b9b35294477b.jpg?di=6e2b3b03&bp=13414'
        },
        {
          video_digg_count: 290000,
          video_share_count: 0,
          video_comment_count: 29000,
          video_view_count: 22350000,
          video_desc:
            '9\u670827\u65e518\u70b9\uff0c\u9501\u5b9a#\u8f9b\u6709\u5fd7\u76f4\u64ad\u95f4#\uff0c\u770b\u201c\u4f5f\u201d\u201c\u8f9b\u201d\u534f\u529b\u5e26\u4f60Fun\u8d2d\u8054\u5408\u5229\u534e\u4e13\u573a\uff01\u8d85\u591a\u798f\u5229\uff0c\u8d85\u591a\u4f18\u60e0\u7b49\u4f60\u6765\u62a2\uff0c\u54b1\u4eec\u4e0d\u89c1\u4e0d\u6563\uff5e',
          video_url: 'https://live.kuaishou.com/u/3xxcgtnm2bj65kq/3x8tu2ucmzmtrni',
          video_create_time: '2020-09-24',
          video_screen_pic: 'https://tx2.a.yximgs.com/upic/2020/09/24/20/BMjAyMDA5MjQyMDUyMzFfMTg4ODg4ODgwXzM2NTU5MTQ1ODkxXzFfMw==_B45e924882321be71d59a836ab6c280f3.jpg?clientCacheKey=3x8tu2ucmzmtrni.jpg&di=6e2b326c&bp=13414'
        },
        {
          video_digg_count: 328000,
          video_share_count: 0,
          video_comment_count: 48000,
          video_view_count: 15367000,
          video_desc:
            '\u8d85\u7ea7\u7535\u5668 \u5468\u65e5\u516d\u70b9\n\u8bb0\u5f97\u5173\u6ce8 \u62a21\u4e07\u53f0\u624b\u673a\n\u6709\u8dd1\u6b65\u673a \u52a8\u611f\u5355\u8f66\n\u6311\u6218\u5168\u7f51\u6781\u81f4\u6027\u4ef7\u6bd4\n\n\u5bb6\u5ead\u6240\u9700 \u5c3d\u5728\u8f9b\u5df4\u76f4\u64ad\u89c1\n\n\u611f\u6069\u66fe\u7ecf\u7684\u4ed6 \u611f\u8c22\u8f9b\u9009\u7528\u6237\n\u5c3d\u5168\u529b\u505a\u6700\u597d\u7684\u81ea\u5df1\n\u603b\u6210\u7ee9\u56de\u62a5\u6240\u6709\u7684\u671f\u5f85\n\u7528\u4ea7\u54c1\u5f81\u670d\u4f60\u7684\u6001\u5ea6\n\u7528\u4fe1\u4ef0\u575a\u6301\u6211\u7684\u4e00\u751f\n\u6211\u662f\u8f9b\u5df4 \u4f60\u4eec\u7684\u4ea7\u54c1\u8c08\u5224\u5b98\n\n\u5468\u65e5 \u4e0d\u89c1\u4e0d\u6563',
          video_url: 'https://live.kuaishou.com/u/3xxcgtnm2bj65kq/3x4ffujniq7mg5a',
          video_create_time: '2020-08-28',
          video_screen_pic: 'https://tx2.a.yximgs.com/upic/2020/08/28/18/BMjAyMDA4MjgxODI4MDBfMTg4ODg4ODgwXzM1MTY5MDM0OTYzXzFfMw==_Bf33505eee9ddc91afd18d5085d855eb0.jpg?di=6e2b2cc5&bp=10004'
        },
        {
          video_digg_count: 425000,
          video_share_count: 0,
          video_comment_count: 65000,
          video_view_count: 16671000,
          video_desc:
            '\u5468\u65e5\u516d\u70b9\u6211\u4eec\u4e0d\u89c1\u4e0d\u6563\n\u8d85\u7ea7\u7535\u5668 \u6311\u6218\u5168\u7f51\u6781\u81f4\u6027\u4ef7\u6bd4\n\u76f4\u64ad\u95f4\u6709\u5b99\u65af\u738b \u6709\u6309\u6469\u6905 \u8fd8\u6709\u4e00\u6b3e\u8ba9\u6211\u4f69\u670d\u7684\u7834\u58c1\u673a\n\n\u66fe\u7ecf\u7684\u4ed6\u5168\u529b\u5ba3\u4f20\n\n\u611f\u8c22\u66fe\u7ecf\u7684\u4ed6 \u611f\u6069\u8f9b\u9009\u7528\u6237\n\n\u6211\u7528\u5fc3\u9009\u4ea7\u54c1 \u5c3d\u5168\u529b\u8c08\u4ef7\u683c\n\u6709\u9700\u8981\u8981\u7406\u6027\u8d2d\u7269\n\u8fd8\u6709\u4e00\u4e07\u53f0\u624b\u673a\u9001\u51fa\n\u5e0c\u671b\u90fd\u88ab\u66fe\u7ecf\u7684\u4ed6\u62a2\u5230',
          video_url: 'https://live.kuaishou.com/u/3xxcgtnm2bj65kq/3xnb2y7eka8kges',
          video_create_time: '2020-08-27',
          video_screen_pic: 'https://tx2.a.yximgs.com/upic/2020/08/27/20/BMjAyMDA4MjcyMDA3NDFfMTg4ODg4ODgwXzM1MTE5MTczNjE1XzFfMw==_B5b6733573758c98fd2eed00e3ff23da7.jpg?di=6e2b2cc5&bp=10004'
        }
      ]
      this.videoListLoading = false
    }, 3000)
  }
}
</script>

<style lang="less" module="s">
.title1 {
  width: 292px;
  height: 49px;
  background-image: url(../../assets/video-title1.png);
}
.title2 {
  width: 292px;
  height: 59px;
  background-image: url(../../assets/video-title2.png);
}
.title3 {
  width: 292px;
  height: 49px;
  background-image: url(../../assets/video-title3.png);
}
.title4 {
  width: 292px;
  height: 49px;
  background-image: url(../../assets/video-title4.png);
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
  .title1 {
    background-image: url(../../assets/video-title1@2x.png);
  }
  .title2 {
    background-image: url(../../assets/video-title2@2x.png);
  }
  .title3 {
    background-image: url(../../assets/video-title3@2x.png);
  }
  .title4 {
    background-image: url(../../assets/video-title4@2x.png);
  }
}
.list1 {
  display: flex;
  padding: 10px 30px 0;
  li {
    flex: 1;
    position: relative;
    text-align: center;
    color: #999;
    &::before {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 1px;
      height: 82px;
      overflow: hidden;
      background: #f3f6f8;
    }
    &:last-child::before {
      content: none;
    }
    &::after {
      content: '';
      display: block;
      width: 89px;
      height: 28px;
      margin: 4px auto 0;
      background: url(../../assets/bg-data.svg) no-repeat 0 0 / contain;
    }
  }
  em {
    display: block;
    font-size: 24px;
    color: #ff7b00;
    margin-bottom: 4px;
    span {
      font-size: 14px;
    }
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
  padding: 10px 10px 40px 40px;
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
    background: url(../../assets/play.svg) no-repeat 0 0 / contain;
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
.digg,
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
.digg::before {
  background-image: url(../../assets/heart.svg);
}
.comment::before {
  background-image: url(../../assets/comment.svg);
}
.videoInfo {
  font-size: 12px;
  color: #999;
  margin-top: 7px;
}
</style>
