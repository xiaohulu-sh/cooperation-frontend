<template>
  <div>
    <h2 :class="c.h2b">已选红人</h2>
    <div :class="c.th1">
      <div :class="s.col1"><a-checkbox :indeterminate="false"></a-checkbox></div>
      <div :class="s.col2">红人信息</div>
      <div :class="s.colVal">总粉丝数</div>
      <div :class="s.colVal">30天增粉</div>
      <div :class="s.colVal">总点赞</div>
      <div :class="s.colVal">总作品</div>
      <div :class="s.colOp1">合作类型</div>
      <div :class="s.colOp2">
        <span :class="c.delBtn">
          <svg height="16" viewBox="0 0 13 16" width="13">
            <path
              d="m0 2.46375287c0-.45325053.35525041-.82175096.79375092-.82175096h3.96875462v-.82075095c0-.45375053.35550042-.82125096.79375093-.82125096h1.58750184c.43775051 0 .79375093.36750043.79375093.82125096v.82075095h3.96875466c.4380005 0 .7937509.36750043.7937509.82175096v.82125095h-12.7000148zm11.9062639 2.46325286v1.64200191 8.48525986c0 .4530005-.3557505.820751-.793751.820751h-9.52501105c-.43825051 0-.79375093-.3680005-.79375093-.820751v-8.48525986-1.64200191-.82100095h11.11251298zm-7.93750928 1.64200191c0-.45350052-.35575042-.82100095-.79375093-.82100095-.43825051 0-.79375092.36750043-.79375092.82100095v6.84300796c0 .4530005.35550041.821251.79375092.821251.43775051 0 .79375093-.3675005.79375093-.821251zm3.17500369 0c0-.45350052-.35575041-.82100095-.79375092-.82100095-.43850051 0-.79375092.36750043-.79375092.82100095v6.84300796c0 .4530005.35525041.821251.79375092.821251.43800051 0 .79375092-.3675005.79375092-.821251zm3.17500369 0c0-.45350052-.35600041-.82100095-.79400092-.82100095-.43825051 0-.79375092.36750043-.79375092.82100095v6.84300796c0 .4530005.35550041.821251.79375092.821251.43800051 0 .79400092-.3675005.79400092-.821251z"
              fill="currentColor"
            />
          </svg>
          删除
        </span>
      </div>
    </div>
    <ul :class="[c.tbList1, s.list1]">
      <li v-for="(_, index) in new Array(4)" :key="index">
        <div :class="s.col1"><a-checkbox></a-checkbox></div>
        <StarInfo :class="s.col2"></StarInfo>
        <div :class="s.colVal">2672万</div>
        <div :class="s.colVal">1372万</div>
        <div :class="s.colVal">752万</div>
        <div :class="s.colVal">618</div>
        <div :class="s.colOp1">
          <a-radio-group :value="1">
            <a-radio :class="s.radio" :value="1">直播带货</a-radio>
            <a-radio :class="s.radio" :value="2">短视频带货</a-radio>
          </a-radio-group>
        </div>
        <div :class="s.colOp2"><a href="javascript:">查看数据</a></div>
      </li>
    </ul>
    <div :class="s.ft">
      <span :class="s.txt1">已选红人：3</span>
      <a-button type="primary" size="large">确认生成意向单 <a-icon type="right" style="font-size:14px"/></a-button>
    </div>
  </div>
</template>

<style lang="less" module="s">
.radio {
  display: block;
  margin: 3px 0;
}
.col1 {
  width: 46px;
  text-align: center;
}
.col2 {
  flex: 1;
  padding-right: 10px;
}
.colVal {
  width: 90px;
}
.colOp1 {
  width: 120px;
}
.colOp2 {
  width: 92px;
  padding-left: 10px;
}
.list1 {
  .colVal {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
}
.ft {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 10px;
}
.txt1 {
  font-size: 16px;
  color: #333;
}
</style>
