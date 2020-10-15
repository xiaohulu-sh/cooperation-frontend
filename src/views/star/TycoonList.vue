<template>
  <div>
    <div :class="$style.hd">
      <div :class="$style.colOrder">排序</div>
      <div :class="$style.colName">昵称</div>
      <div :class="$style.colAmount">送礼金额</div>
    </div>
    <ul :class="$style.list">
      <li v-for="(item, index) in list" :key="index">
        <div :class="$style.colOrder">
          <span v-if="index < 3" :class="$style[`no${index + 1}`]">{{ index + 1 }}</span>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <div :class="$style.colName">菲利普达文西<span :class="$style.tag">Lv.1</span></div>
        <div :class="$style.colAmount">
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

<style lang="less" module>
.hd {
  display: flex;
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  background: #e9ebf1;
  color: #596a85;
}
.colOrder {
  width: 60px;
  text-align: center;
  span {
    display: block;
    margin: auto;
    width: 22px;
    height: 22px;
    line-height: 22px;
    border-radius: 50%;
    background: #f2f3f7;
    color: #999999;
    font-size: 12px;
  }
  .no1,
  .no2,
  .no3 {
    width: 18px;
    height: 18px;
    overflow: hidden;
    text-indent: -50px;
    border-radius: 0;
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .no1 {
    background-image: url(../../assets/gold.svg);
  }
  .no2 {
    background-image: url(../../assets/silver.svg);
  }
  .no3 {
    background-image: url(../../assets/bronze.svg);
  }
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
  color: #333;
  li {
    display: flex;
    align-items: center;
    min-height: 48px;
    &:nth-child(2n) {
      background: #f9f9fb;
    }
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
