<template>
  <div :class="c.main2">
    <h2 :class="c.h2b">直播带货效果</h2>
    <!-- <h2 :class="c.h2b">短视频带货效果</h2> -->
    <div :class="s.title">红人数据描述</div>
    <div :class="s.info">
      <StarInfo style="width:350px" />
      <ul :class="s.dataList">
        <li>总粉丝数<em>555.44万</em></li>
        <li>30天增粉<em>15.44万</em></li>
        <li>总点赞数<em>154万</em></li>
        <li>总作品数<em>15</em></li>
        <li>合作模式<em>直播带货</em></li>
        <!-- <li>合作模式<em>短视频带货</em></li> -->
        <li>直播时长<em>3.2小时</em></li>
      </ul>
    </div>
    <div :class="s.title">商品数据概述</div>
    <div :class="s.goodsList">
      <div v-for="(_, index) in new Array(2)" :key="index" :class="s.goodsItem">
        <div :class="c.goodsImg">
          <div><img src="https://sf6-ttcdn-tos.pstatp.com/img/temai/f6bb14e63a3da88d61d8cfc7b8a1297ewww844-844~tplv-resize:200:0.jpg" referrerpolicy="no-referrer" /></div>
          <span>京东</span>
        </div>
        <div :class="c.goodsInfo">
          <div :class="[c.ellipsis2, c.goodsTitle]">maje2019春夏新款女装 腰带条纹衬衫长款连衣裙E19RAJI</div>
          <div :class="c.goodsSub">售价：<em>￥17.00</em><a :class="c.link" href="javascript:">商品链接</a></div>
        </div>
        <ul :class="s.dataList">
          <li>全网销量<em>1100</em></li>
          <li>直播销量<em>1100</em></li>
          <li>商品PV<em>1100</em></li>
          <li>商品UV<em>1100</em></li>
          <li>下单数<em>1100</em></li>
          <li>总金额<em>150025</em></li>
          <li>支付人数<em>43</em></li>
        </ul>
      </div>
    </div>
    <div :class="s.title">购买商品人群画像</div>
    <div :class="s.block1">
      <div>
        <h3 :class="c.h3">性别分布</h3>
        <LazyBlock :class="s.b1" :data="chartGender">
          <Chart :class="s.chart1" :chartData="chartGender"></Chart>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">星座分布</h3>
        <LazyBlock :class="s.b1" :data="chartConstell">
          <Chart :class="s.chart1" :chartData="chartConstell"></Chart>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">粉丝活跃时间分布 — 按天</h3>
        <LazyBlock :class="s.b1" :data="chartDay">
          <Chart :class="s.chart1" :chartData="chartDay"></Chart>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">粉丝活跃时间分布 — 按周</h3>
        <LazyBlock :class="s.b1" :data="chartWeek">
          <Chart :class="s.chart1" :chartData="chartWeek"></Chart>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">年龄分布</h3>
        <LazyBlock :class="s.b1" :data="chartAge">
          <Chart :class="s.chart1" :chartData="chartAge"></Chart>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">地域分布</h3>
        <LazyBlock :class="[s.b1, s.mapBlock]" :data="chartArea">
          <Chart :class="s.chart1" :chartData="chartArea"></Chart>
          <ul v-if="areaList">
            <li v-for="{ name, percent } in areaList" :key="name">{{ name }}{{ percent }}</li>
          </ul>
        </LazyBlock>
      </div>
    </div>
    <div :class="s.t1">购买红人商品的粉丝画像（京东）</div>
    <div :class="s.block1">
      <div>
        <h3 :class="c.h3">性别分布</h3>
        <LazyBlock :class="s.b1" :data="chartGender">
          <Chart :class="s.chart1" :chartData="chartGender"></Chart>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">星座分布</h3>
        <LazyBlock :class="s.b1" :data="chartConstell">
          <Chart :class="s.chart1" :chartData="chartConstell"></Chart>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">年龄分布</h3>
        <LazyBlock :class="s.b1" :data="chartAge">
          <Chart :class="s.chart1" :chartData="chartAge"></Chart>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">地域分布</h3>
        <LazyBlock :class="[s.b1, s.mapBlock]" :data="chartArea">
          <Chart :class="s.chart1" :chartData="chartArea"></Chart>
          <ul v-if="areaList">
            <li v-for="{ name, percent } in areaList" :key="name">{{ name }}{{ percent }}</li>
          </ul>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">职业分布</h3>
        <LazyBlock :class="s.b1" :data="chartJob">
          <Chart :class="s.chart1" :chartData="chartJob"></Chart>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">学历分布</h3>
        <LazyBlock :class="s.b1" :data="chartEdu">
          <Chart :class="s.chart1" :chartData="chartEdu"></Chart>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">该KOL的粉丝还喜欢购买哪些商品</h3>
        <LazyBlock :class="s.b1" :data="chartCategory" style="height:304px">
          <a-radio-group :value="30" size="small" style="margin:20px 0">
            <a-radio-button :value="30">30天</a-radio-button>
            <a-radio-button :value="60">60天</a-radio-button>
            <a-radio-button :value="90">90天</a-radio-button>
          </a-radio-group>
          <Chart :class="s.chart1" :chartData="chartCategory" style="height:240px"></Chart>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">该KOL的粉丝购买力分布</h3>
        <LazyBlock :class="s.b1" :data="chartPower">
          <Chart :class="s.chart1" :chartData="chartPower"></Chart>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">该KOL的粉丝购买品牌偏好</h3>
        <LazyBlock :class="s.b1" :data="chartBrand">
          <Chart :class="s.chart1" :chartData="chartBrand"></Chart>
        </LazyBlock>
      </div>
      <div>
        <h3 :class="c.h3">该KOL的粉丝忠诚度</h3>
        <LazyBlock :class="s.b1" :data="chartLoyalty">
          <Chart :class="s.chart1" :chartData="chartLoyalty"></Chart>
        </LazyBlock>
      </div>
    </div>
  </div>
</template>

<script>
import { createPie1, createPie2 } from '@/utils/charts/pie'
import { createBar1, createBar2 } from '@/utils/charts/bar'
import { registerMap, createChinaMap1 } from '@/utils/charts/map'

export default {
  data() {
    return {
      gender: [
        { value: 415, name: '男性用户' },
        { value: 958, name: '女性用户' }
      ],
      constell: [
        { name: '白羊座', value: 61 },
        { name: '金牛座', value: 56 },
        { name: '双子座', value: 61 },
        { name: '巨蟹座', value: 66 },
        { name: '狮子座', value: 68 },
        { name: '处女座', value: 81 },
        { name: '天秤座', value: 94 },
        { name: '天蝎座', value: 68 },
        { name: '射手座', value: 71 },
        { name: '摩羯座', value: 129 },
        { name: '水瓶座', value: 89 },
        { name: '双鱼座', value: 81 }
      ],
      day: [
        ['0时', '1.57'],
        ['1时', '0.84'],
        ['2时', '0.70'],
        ['3时', '0.49'],
        ['4时', '0.17'],
        ['5时', '0.44'],
        ['6时', '0.90'],
        ['7时', '1.28'],
        ['8时', '1.13'],
        ['9时', '1.22'],
        ['10时', '1.11'],
        ['11时', '4.13'],
        ['12时', '5.53'],
        ['13时', '10.70'],
        ['14时', '4.89'],
        ['15时', '7.56'],
        ['16时', '6.40'],
        ['17时', '9.57'],
        ['18时', '10.82'],
        ['19时', '8.67'],
        ['20时', '3.87'],
        ['21时', '4.92'],
        ['22时', '8.38'],
        ['23时', '4.71']
      ],
      week: [
        ['星期日', 0],
        ['星期一', 0],
        ['星期二', '19.95'],
        ['星期三', '19.14'],
        ['星期四', '42.09'],
        ['星期五', '5.99'],
        ['星期六', '12.83']
      ],
      age: [
        ['18-25岁', '29.87'],
        ['26-32岁', '46.10'],
        ['33-39岁', '16.23'],
        ['40岁以上', '3.90'],
        ['其他', '3.90']
      ],
      area: null,
      job: [
        ['金融', 12000],
        ['医务人员', 11000],
        ['公务员', 22000],
        ['白领', 16000],
        ['工人', 21000],
        ['学生', 8000]
      ],
      edu: [
        { name: '初中及以下', value: 4500 },
        { name: '高中(中专)', value: 5500 },
        { name: '大学(专科及本科)', value: 4200 },
        { name: '研究生(硕士及以上)', value: 1600 }
      ],
      category: [
        ['家装', 900],
        ['乐器', 700],
        ['玩具', 800],
        ['服饰', 400],
        ['家具', 500],
        ['生鲜', 700],
        ['纸尿裤', 500],
        ['奶粉', 600]
      ],
      power: [
        { name: '土豪', value: 4500 },
        { name: '高级白领', value: 5500 },
        { name: '小白领', value: 4200 },
        { name: '蓝领', value: 2200 },
        { name: '收入很少', value: 1400 },
        { name: '未识别', value: 1600 }
      ],
      brand: [
        { name: '泉林本色', value: 4500 },
        { name: '雅漾', value: 5500 },
        { name: '戴森', value: 4200 },
        { name: '伊利', value: 2200 },
        { name: '欧莱雅', value: 1400 },
        { name: 'dell', value: 1600 },
        { name: 'apple', value: 1600 }
      ],
      loyalty: [
        { name: '高度-忠诚型', value: 4500 },
        { name: '中度-忠诚型', value: 5500 },
        { name: '近期-普通型', value: 4200 },
        { name: '远期-普通型', value: 2200 },
        { name: '近期-偶然型', value: 1400 },
        { name: '近期-投机型', value: 1600 },
        { name: '远期-偶然型', value: 1600 },
        { name: '远期-投机型', value: 1600 }
      ]
    }
  },
  computed: {
    chartGender() {
      return createPie1(this.gender, { showDataType: 'scale', unit: '人', color: ['#5c89ff', '#FF7486', '#736AF2'], size: 'sm' })
    },
    chartConstell() {
      return createPie2(this.constell, { legend: false, showDataType: 'scale', unit: '人' })
    },
    chartDay() {
      return createBar1(this.day, { unit: '%' })
    },
    chartWeek() {
      return createBar1(this.week, { interval: 0, unit: '%' })
    },
    chartAge() {
      return createBar1(this.age, { interval: 0, unit: '%' })
    },
    areaList() {
      if (!this.area) return []
      return Object.keys(this.area)
        .slice(0, 10)
        .map(name => ({ name, percent: this.area[name].percent }))
    },
    chartArea() {
      if (!this.area) return null
      return createChinaMap1(Object.keys(this.area).map(name => ({ name, value: this.area[name].count })))
    },
    chartJob() {
      return createBar1(this.job, { interval: 0, unit: '人' })
    },
    chartEdu() {
      return createPie2(this.edu, { showDataType: 'scale', unit: '人', labelFormatter: '{c}' })
    },
    chartCategory() {
      return createBar2(this.category, { interval: 0, unit: '人' })
    },
    chartPower() {
      return createPie2(this.power, { showDataType: 'scale', unit: '人', labelFormatter: '{c}' })
    },
    chartBrand() {
      return createPie2(this.brand, { showDataType: 'scale', unit: '人', labelFormatter: '{c}' })
    },
    chartLoyalty() {
      return createPie2(this.loyalty, { showDataType: 'scale', unit: '人', labelFormatter: '{c}' })
    }
  },
  async mounted() {
    await registerMap(this.echarts)
    this.area = {
      山东: { count: 145, percent: '11.3%' },
      河北: { count: 141, percent: '10.99%' },
      辽宁: { count: 106, percent: '8.26%' },
      黑龙江: { count: 98, percent: '7.64%' },
      广东: { count: 81, percent: '6.31%' },
      江苏: { count: 76, percent: '5.92%' },
      吉林: { count: 72, percent: '5.61%' },
      山西: { count: 68, percent: '5.3%' },
      河南: { count: 57, percent: '4.44%' },
      内蒙古: { count: 53, percent: '4.13%' },
      北京: { count: 42, percent: '3.27%' },
      浙江: { count: 42, percent: '3.27%' },
      甘肃: { count: 32, percent: '2.49%' },
      陕西: { count: 28, percent: '2.18%' },
      云南: { count: 25, percent: '1.95%' },
      福建: { count: 25, percent: '1.95%' },
      四川: { count: 22, percent: '1.71%' },
      安徽: { count: 20, percent: '1.56%' },
      天津: { count: 19, percent: '1.48%' },
      湖北: { count: 19, percent: '1.48%' },
      上海: { count: 14, percent: '1.09%' },
      广西: { count: 14, percent: '1.09%' },
      贵州: { count: 13, percent: '1.01%' },
      江西: { count: 12, percent: '0.94%' },
      宁夏: { count: 11, percent: '0.86%' },
      新疆: { count: 10, percent: '0.78%' },
      湖南: { count: 9, percent: '0.7%' },
      澳门: { count: 7, percent: '0.55%' },
      重庆: { count: 7, percent: '0.55%' },
      青海: { count: 5, percent: '0.39%' },
      海南: { count: 3, percent: '0.23%' },
      香港: { count: 3, percent: '0.23%' },
      台湾: { count: 2, percent: '0.16%' },
      西藏: { count: 2, percent: '0.16%' }
    }
  }
}
</script>

<style lang="less" module="s">
.title {
  color: #333;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
}
.info {
  display: flex;
  margin: 20px 0 40px;
}
.dataList {
  display: flex;
  color: #999;
  margin-left: 40px;
  li {
    width: 100px;
    white-space: nowrap;
  }
  em {
    display: block;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    line-height: 22px;
  }
}
.goodsList {
  margin-bottom: 30px;
}
.goodsItem {
  display: flex;
  padding: 20px 0;
  &:not(:first-child) {
    border-top: 1px solid #e3e4eb;
  }
}
.block1 {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 30px;
  & > div {
    width: 50%;
    padding: 0 20px;
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
  margin: 10px 0 10px 15px;
}
</style>
