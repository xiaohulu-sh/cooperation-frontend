<template>
  <a-result :class="[c.main, s.result]" status="error" :title="err">
    <div>
      <h3>商务联系方式</h3>
      <ul>
        <li>电话：18812345678</li>
        <li>微信：xxx</li>
        <li>邮箱：xxx@xiaohulu.com</li>
      </ul>
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
</style>
