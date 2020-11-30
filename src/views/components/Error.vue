<template>
  <a-result :class="[c.main, s.result]" status="error" :title="err">
    <h3>商务联系方式</h3>
    <ul>
      <li>电话：18812345678</li>
      <li>微信：xxx</li>
      <li>邮箱：xxx@xiaohulu.com</li>
    </ul>
    <div :class="s.ft1">
      <router-link to="/" replace><a-button type="primary" size="large">重新尝试</a-button></router-link>
    </div>
  </a-result>
</template>

<script>
export default {
  props: {
    err: String
  }
}
</script>

<style lang="less" module="s">
.result {
  margin: 50px 0;
  :global .ant-result-content {
    background: #fff;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  h3 {
    font-size: 16px;
    font-weight: bold;
    margin: 0 0 10px;
  }
}
.ft1 {
  margin-top: 20px;
  text-align: center;
}
</style>
