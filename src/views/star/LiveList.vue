<template>
  <div>
    <ul :class="s.list">
      <li v-for="(item, index) in list" :key="index">
        <div :class="s.avatar"><img src="https://xhlcdn.xiaohulu.com/avatar/202/188888880" referrerpolicy="no-referrer" @error="onAvatarError" alt="头像" /></div>
        <div>
          <div :class="s.titleLine">
            <span :class="[c.tag1, s.tag]">带货直播</span>
            <span :class="[c.tag2, s.tag]">已结束</span>
            <span :class="[c.tag3, s.tag]">直播中</span>
            <span :class="[c.ellispis1, s.title]">直播惊喜价！免单抽奖！</span>
          </div>
          <div :class="c.splitInfo">
            <span>开始时间：2020-10-06 19:53:18</span>
            <span>结束时间：2020-10-07 00:03:15</span>
            <span>总直播时长 3.8h</span>
          </div>
          <ul :class="s.data">
            <li>峰值人气<span>10万</span></li>
            <li>收到贡献值<span>156.62万</span></li>
            <li>送礼人数<span>5.72万</span></li>
            <li>弹幕条数<span>42.25万</span></li>
            <li>弹幕人数<span>19.23万</span></li>
          </ul>
        </div>
      </li>
    </ul>
    <a-pagination :current="page" :total="total" :pageSize="pageSize" :hideOnSinglePage="true" @change="onPageChange" style="text-align:center"></a-pagination>
  </div>
</template>

<script>
import { onAvatarError } from '@/utils/utils'
export default {
  props: {
    list: Array,
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 5
    }
  },
  methods: {
    onAvatarError,
    onPageChange(page) {
      this.$emit('update:page', page)
    }
  }
}
</script>

<style lang="less" module="s">
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
.title {
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
