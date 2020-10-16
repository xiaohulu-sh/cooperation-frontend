<template>
  <div>
    <ul :class="s.list">
      <li v-for="(item, index) in list" :key="index">
        <div :class="s.avatar"><img src="https://xhlcdn.xiaohulu.com/avatar/202/188888880" referrerpolicy="no-referrer" @error="onAvatarError" alt="头像" /></div>
        <div>
          <div :class="s.titleLine">
            <span :class="s.tag1">带货直播</span>
            <span :class="s.tag2">已结束</span>
            <span :class="s.tag3">直播中</span>
            <span :class="[c.ellispis1, s.title]">直播惊喜价！免单抽奖！</span>
          </div>
          <div :class="s.timeInfo">
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
.tag {
  width: 76px;
  text-align: center;
  height: 23px;
  line-height: 23px;
  color: #fff;
  border-radius: 12px;
  margin-right: 10px;
}
.tag1 {
  composes: tag;
  background: #ffbc40;
}
.tag2 {
  composes: tag;
  background: #d8d8d8;
}
.tag3 {
  composes: tag;
  background: #ec595d;
  border: 1px solid #c13539;
  line-height: 21px;
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
.timeInfo {
  color: #666;
  margin-top: 10px;
  span {
    display: inline-flex;
    align-items: center;
    margin-right: 20px;
    &::after {
      content: '|';
      margin-left: 20px;
    }
    &:last-child {
      &::after {
        content: none;
      }
    }
  }
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
