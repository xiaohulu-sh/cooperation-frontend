<template>
  <a-result :class="[c.main, c.block, s.result]" status="error" title="您的账号暂未开通使用权限">
    <div :class="s.info">
      联系商务开通权限之后重新登录即可
      <div :class="s.tip">
        (联系时请将您的用户名 <em>{{ name }}</em> 告知商务)
      </div>
      <div :class="s.btnWrap">
        <a-button type="link" @click="retry">开通后，前往使用 &gt;</a-button>
      </div>
    </div>
    <div :class="s.contact">
      <div>
        商务联系方式1
        <ul>
          <li>手机：<em>13641087033</em></li>
          <li>微信：<em>moxiaoshan</em></li>
        </ul>
      </div>
      <div>
        商务联系方式2
        <ul>
          <li>手机：<em>13611731051</em></li>
          <li>微信：<em>13611731051</em></li>
        </ul>
      </div>
    </div>
  </a-result>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    err: String
  },
  computed: mapState('user', ['name']),
  methods: {
    retry() {
      location.replace('/')
    }
  }
}
</script>

<style lang="less" module="s">
.result {
  :global {
    .ant-result-title {
      font-size: 16px;
      color: #333;
    }
    .ant-result-content {
      background: #fff;
      margin: 0;
      padding: 0;
    }
  }
}
.info {
  margin-top: 8px;
  text-align: center;
  font-size: 16px;
  color: #333;
}
.tip {
  font-size: 14px;
  color: #888;
  em {
    font-size: 16px;
    font-weight: bold;
    color: #f60;
  }
}
.btnWrap {
  margin: 10px 0;
  button {
    font-size: 15px;
  }
}
.contact {
  display: flex;
  justify-content: center;
  margin: 30px 0 10px;
  & > div {
    min-width: 192px;
    margin: 0 20px;
    padding: 25px 30px;
    border-radius: 4px;
    border: 1px solid #e3e4eb;
  }
  ul {
    margin-top: 6px;
    li {
      margin: 2px 0;
    }
  }
  em {
    font-weight: bold;
    color: #333;
  }
}
</style>
