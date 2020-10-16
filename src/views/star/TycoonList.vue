<template>
  <div>
    <div :class="c.th">
      <div :class="s.colOrder">排序</div>
      <div :class="s.colName">昵称</div>
      <div :class="s.colAmount">送礼金额</div>
    </div>
    <ul :class="[c.tbList, s.list]">
      <li v-for="(item, index) in list" :key="index">
        <div :class="[c.colOrder, s.colOrder]">
          <span v-if="index < 3" :class="c[`no${index + 1}`]">{{ index + 1 }}</span>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <div :class="s.colName">菲利普达文西<span :class="s.tag">Lv.1</span></div>
        <div :class="s.colAmount">
          <em>9.35<span>万</span></em>
        </div>
      </li>
    </ul>
    <a-pagination :current="page" :total="total" :pageSize="pageSize" :hideOnSinglePage="true" @change="onPageChange" style="text-align:center;margin-top:20px"></a-pagination>
  </div>
</template>

<script>
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
      default: 10
    }
  },
  methods: {
    onPageChange(page) {
      this.$emit('update:page', page)
    }
  }
}
</script>

<style lang="less" module="s">
.colOrder {
  width: 60px;
  text-align: center;
}
.colName {
  flex: 1;
  padding-left: 30px;
}
.colAmount {
  width: 240px;
  padding-right: 30px;
  text-align: right;
}
.tag {
  font-size: 12px;
  padding: 0 1em;
  margin-left: 5px;
  background: #736af2;
  color: #fff;
  border-radius: 11px;
}
.list {
  li {
    min-height: 48px;
  }
  em {
    font-size: 18px;
    color: #ee7a30;
    font-weight: 500;
    span {
      font-size: 14px;
    }
  }
  .colName {
    font-weight: 600;
  }
}
</style>
