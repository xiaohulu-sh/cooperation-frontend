<template>
  <div>
    <h2 :class="c.h2b">我的订单</h2>
    <DataBlock :req="listReq" :isEmpty="isEmpty">
      <template v-slot="{ data: { list, total } }">
        <div :class="c.th1">
          <div :class="s.col1">订单生成时间</div>
          <div :class="s.col2">订单编号</div>
          <div :class="s.col3">已选红人数</div>
          <div :class="s.col4">红人头像</div>
          <div :class="s.col5">状态</div>
          <div :class="s.col6">操作</div>
        </div>
        <ul :class="[c.tbList1, s.list1]">
          <li v-for="{ order_id, create_time, count, avatars, progress } in list" :key="order_id">
            <div :class="s.col1">{{ create_time }}</div>
            <div :class="s.col2">{{ order_id }}</div>
            <div :class="s.col3">{{ count }}</div>
            <div :class="s.col4">
              <img v-for="(url, index) in avatars" :key="url" :class="s.avatar1" :src="url" referrerpolicy="no-referrer" @error="onAvatarError" :style="{ zIndex: avatars.length - index }" />
            </div>
            <div :class="s.col5">{{ stateLabels[progress] }}</div>
            <div :class="s.col6"><router-link :to="`/my/order/${order_id}`">查看详情</router-link></div>
          </li>
        </ul>
        <a-pagination :class="c.pagin1" v-model="page" :total="total" :pageSize="pageSize" :hideOnSinglePage="true" />
      </template>
    </DataBlock>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    ...mapGetters('enum', ['stateLabels']),
    listReq() {
      return {
        url: 'v1_front_order/agreementOrderList',
        params: {
          page: this.page,
          limit: this.pageSize
        }
      }
    }
  },
  methods: {
    isEmpty(data) {
      return (!data && data !== null) || (data && !data.total)
    }
  }
}
</script>

<style lang="less" module="s">
.avatar1 {
  position: relative;
  width: 56px;
  height: 56px;
  border: 1px solid #f8f8f8;
  border-radius: 50%;
  margin-right: -10px;
}
.col1 {
  width: 160px;
  padding-left: 25px;
}
.col2 {
  width: 180px;
  padding-left: 30px;
}
.col3,
.col5 {
  width: 100px;
  text-align: center;
}
.col4 {
  flex: 1;
  padding-left: 30px;
}
.col6 {
  width: 120px;
  text-align: center;
}
.list1 {
  font-weight: 600;
  color: #666;
  li {
    padding: 10px 0;
  }
  .col3 {
    font-size: 16px;
    color: #333;
  }
}
</style>
