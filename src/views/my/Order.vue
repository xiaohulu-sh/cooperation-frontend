<template>
  <div>
    <div :class="s.titleWrap">
      <h2 :class="c.h2b" style="margin:0">订单详情</h2>
      <svg height="62" viewBox="0 0 75 62" width="75" style="margin-left:20px">
        <g fill="none" fill-rule="evenodd">
          <path
            d="m52.7928834 4.15176214c10.0505824 5.83851762 15.8524189 16.74174586 15.3589734 28.16865966l6.0762954 3.5303446c.5659646.3287758.7598797 1.0569346.4331182 1.626392l-13.0163239 22.6840183c-.3267601.569456-1.0504544.7645673-1.6164204.4357908l-6.0755925-3.5295277c-9.523504 6.1101389-21.6200802 6.4775098-31.4960392.9463769l-.4298562-.2452944c-9.9628025-5.7840064-15.86362755-16.6592755-15.35975444-28.1691209l-6.07543453-3.5298908c-.56596456-.3287758-.75987968-1.0569345-.43311892-1.626392l13.01632399-22.6840183c.32676-.56945599 1.0504543-.76456737 1.6164204-.43579083l6.0744988 3.52915816c9.657996-6.19652769 21.9694692-6.48923625 31.9269099-.70070549zm-29.5825162 51.55458796c8.90877 5.1752307 19.7192395 5.0439026 28.4043211.0036207l-3.6396787-2.1158997c-7.3330571 3.4692843-15.9248492 3.1283514-22.9897345-.9809447-7.1424231-4.1491353-11.6543745-11.4778214-12.3378615-19.5394794l-3.6442626-2.1172644c-.00240582 10.1558458 5.3723616 19.621463 14.2072162 24.7499675zm-8.577424-51.72555745-11.83302177 20.62182125 11.90607857 6.9163861.2242476-.0057901.0037524.1377901 33.1190184 19.2388248c.006657-.0036024.0133126-.0072084.0199669-.0108181l.0160147.0319933 12.0980449 7.0284688 11.8330218-20.6218213zm11.1806024 46.35982585.3550372.2103149c5.8976771 3.4310024 12.9717566 3.9590651 19.2420166 1.5545299l-30.2015746-17.5438189c1.0440865 6.529441 4.8960602 12.3263552 10.6045208 15.7789741zm33.2062627-7.023376c.6891274-1.0265797 2.0604709-1.3562594 3.1431886-.727297 1.1319283.6575471 1.5197564 2.1138691.8662363 3.252784l-.0896521.1442832c-.6891274 1.0265796-2.0604709 1.3562594-3.1431886.727297-1.1319283-.6575472-1.5197564-2.1138692-.8662363-3.2527841zm-35.8157648-37.10751952 3.6423684 2.11543766c7.2022941-3.40710201 15.6100671-3.13603522 22.5922175.75660246l.3959202.225511c7.0573372 4.0933468 11.6569889 11.400931 12.3388667 19.5397457l3.6426506 2.11671c.0025391-10.0112189-5.2186082-19.3444665-13.8178167-24.52002839l-.3886813-.22975879c-8.829181-5.13267754-19.6634102-5.08564336-28.4055254-.00421964zm6.2051769 3.60460823 30.2009412 17.54379359c-1.0450645-6.5415313-4.9050149-12.3322529-10.6031996-15.7780356l-.3556481-.2106279c-5.8932408-3.42910186-12.9671005-3.96164016-19.2420935-1.55513009zm-17.5288204 6.11907989c.6892872-1.0264746 2.0606806-1.3559464 3.1432992-.7268196 1.1318293.6577257 1.5194391 2.1141073.8657483 3.252918l-.0896747.1442697c-.6892873 1.0264752-2.0606806 1.3559463-3.1432992.7268195-1.13183-.6577257-1.5194392-2.1141073-.8657483-3.252918z"
            fill="#f4f3fe"
            fill-rule="nonzero"
          />
          <text fill="#999" font-family="PingFangSC-Regular, PingFang SC" font-size="14" transform="matrix(.8660254 .5 -.5 .8660254 20.45706 -14.346788)">
            <!-- <tspan x="16" y="36">已取消</tspan> -->
            <tspan x="9" y="36">执行完成</tspan>
          </text>
        </g>
      </svg>
      <a-button type="primary" style="margin-left:30px" @click="navToSummary">查看汇总报告</a-button>
    </div>
    <div style="display:flex">
      <h3 :class="s.t1">订单进度</h3>
      <a-steps :class="s.steps" progress-dot size="small" :current="1">
        <a-step title="意向单" />
        <a-step title="修改合作红人" />
        <a-step title="确定合作红人" />
        <a-step title="确定达人方案" />
        <a-step title="达人执行中" />
        <a-step title="执行完成" />
      </a-steps>
      <!-- <a-steps style="width:290px" progress-dot size="small" :current="1">
        <a-step title="意向单" />
        <a-step title="已取消" />
      </a-steps> -->
    </div>
    <h3 :class="s.t2">订单信息</h3>
    <ul :class="s.infoList">
      <li>订单号：<span>20200908142255468</span></li>
      <li>订单生成时间：<span>2020-09-08 14:22</span></li>
      <li>订单状态：<span>执行完成</span></li>
      <li>订单确认时间：<span>2020-09-10 16:22</span></li>
      <li>商务负责人：<span>XXX 15640152793</span></li>
    </ul>
    <h3 :class="s.t2">合作红人</h3>
    <!-- <div :class="c.th1">
      <div :class="s.colA">红人信息</div>
      <div :class="s.colB">总粉丝数</div>
      <div :class="s.colB">30天增粉</div>
      <div :class="s.colB">总点赞数</div>
      <div :class="s.colB">总作品数</div>
      <div :class="s.colC">合作模式</div>
    </div>
    <ul :class="[c.tbList1, s.list]">
      <li v-for="(_, index) in new Array(5)" :key="index">
        <StarInfo :class="s.colA"></StarInfo>
        <div :class="s.colB">2672万</div>
        <div :class="s.colB">1372万</div>
        <div :class="s.colB">752万</div>
        <div :class="s.colB">618</div>
        <div :class="s.colC">短视频带货</div>
      </li>
    </ul>
    <div :class="s.ft">
      <a-button type="primary" size="large">确认订单</a-button>
      <a-button size="large" style="margin-left:20px">取消订单</a-button>
    </div> -->
    <!-- <div :class="c.th1">
      <div :class="s.colA">红人信息</div>
      <div :class="s.colC">合作模式</div>
      <div :class="s.colB">红人报价</div>
      <div :class="s.colD">合作时间</div>
      <div :class="s.colE">执行信息</div>
    </div>
    <ul :class="[c.tbList1, s.list1]">
      <li v-for="(_, index) in new Array(5)" :key="index">
        <div :class="s.mainInfo">
          <StarInfo :class="s.colA"></StarInfo>
          <div :class="s.colC">短视频带货</div>
          <div :class="s.colB">32万</div>
          <div :class="s.colD">
            09-21 21:45 到<br />
            09-22 00:50
          </div>
          <div :class="s.colE">
            RoomID 546489456<br />
            PID dhhfje-232323424wwww
          </div>
        </div>
        <div :class="s.extraList">
          <span>总粉丝数 172万</span>
          <span>30天增粉 172万</span>
          <span>总点赞数 172万</span>
          <span>总作品数 133</span>
        </div>
      </li>
    </ul> -->
    <div :class="s.tb1">
      <div :class="c.th1">
        <div :class="s.colA">红人信息</div>
        <div :class="s.colC">合作模式</div>
        <div :class="s.colB">红人报价</div>
        <div :class="s.colD">合作时间</div>
        <div :class="s.colE">执行信息</div>
        <div :class="s.colF">推广效果</div>
      </div>
      <ul :class="[c.tbList1, s.list1]">
        <li v-for="(_, index) in new Array(5)" :key="index">
          <div :class="s.mainInfo">
            <StarInfo :class="s.colA"></StarInfo>
            <div :class="s.colC">短视频带货</div>
            <div :class="s.colB">32万</div>
            <div :class="s.colD">
              09-21 21:45 到<br />
              09-22 00:50
            </div>
            <div :class="s.colE">
              RoomID 546489456<br />
              PID dhhfje-232323424wwww
            </div>
            <div :class="s.colF">
              <!-- <span style="color:#999">未开始</span> -->
              <!-- <span style="color:#333">数据计算中</span> -->
              <router-link to="/my/order/123/data">查看报告</router-link>
            </div>
          </div>
          <div :class="s.extraList">
            <span>总粉丝数 172万</span>
            <span>30天增粉 172万</span>
            <span>总点赞数 172万</span>
            <span>总作品数 133</span>
          </div>
        </li>
      </ul>
    </div>
    <a-modal v-model="cancelModal" title="取消订单">
      <div :class="s.modalTxt">
        确定取消订单吗？
        <a-select v-model="cancelType" size="small">
          <a-select-option :key="1">不想投了</a-select-option>
        </a-select>
      </div>
      <a-textarea :class="s.textarea" placeholder="请输入取消理由" :rows="4" />
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cancelModal: false,
      cancelType: 1
    }
  },
  methods: {
    navToSummary() {
      this.$router.push('/my/order/123/summary')
    }
  }
}
</script>

<style lang="less" module="s">
.titleWrap {
  display: flex;
  align-items: center;
  min-height: 62px;
  margin-bottom: 30px;
}
.steps {
  flex: 1;
}
.t1 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}
.t2 {
  composes: t1;
  margin: 40px 0 10px;
}
.infoList {
  display: flex;
  flex-wrap: wrap;
  color: #999;
  li {
    width: 40%;
    margin-bottom: 10px;
    &:nth-child(3n + 2) {
      width: 40%;
    }
    &:nth-child(3n + 3) {
      width: 20%;
    }
  }
  span {
    color: #333;
  }
}
.colA {
  flex: 1;
  padding-left: 20px;
}
.colB {
  width: 100px;
  text-align: center;
}
.colC {
  width: 120px;
  text-align: center;
}
.colD {
  width: 140px;
  text-align: center;
}
.colE {
  width: 250px;
  padding-left: 20px;
}
.list {
  .colB {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
}
.list1 {
  composes: list;
  li {
    flex-wrap: wrap;
  }
}
.tb1 {
  .colB {
    width: 80px;
  }
  .colC {
    width: 88px;
  }
  .colD {
    width: 120px;
  }
  .colE {
    width: 230px;
    padding-left: 10px;
  }
  .colF {
    width: 88px;
  }
  .list1 {
    .colF {
      font-weight: 600;
    }
  }
}
.mainInfo {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 88px;
}
.extraList {
  width: 100%;
  border-top: 1px solid #e3e4eb;
  padding: 14px 20px 15px;
  span {
    margin-right: 30px;
  }
}
.ft {
  text-align: center;
  margin: 30px 0 10px;
}
.modalTxt {
  font-size: 16px;
  color: #333;
}
.textarea {
  margin-top: 15px;
  font-size: 16px;
}
</style>
