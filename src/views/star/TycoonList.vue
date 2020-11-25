<template>
  <div>
    <div :class="c.th">
      <div :class="s.colOrder">排序</div>
      <div :class="s.colName">昵称</div>
      <div :class="s.colAmount">送礼金额</div>
    </div>
    <ul :class="[c.tbList, s.list]">
      <li v-for="({ order, nickname, amount, lv }, index) in dataList" :key="index">
        <div :class="[c.colOrder, s.colOrder]">
          <span v-if="index < 3" :class="c[`no${order}`]">{{ order }}</span>
          <span v-else>{{ order }}</span>
        </div>
        <div :class="s.colName">
          {{ nickname }}<span v-if="lv" :class="s.tag">Lv.{{ lv }}</span>
        </div>
        <div :class="s.colAmount">
          <em
            >{{ amount.n }}<span v-if="amount.unit">{{ amount.unit }}</span></em
          >
        </div>
      </li>
    </ul>
    <a-pagination :class="c.pagin1" :current="page" :total="total" :pageSize="pageSize" :hideOnSinglePage="true" @change="onPageChange"></a-pagination>
  </div>
</template>

<script>
import { parseNumberUnit } from '@/utils/utils'

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
  computed: {
    dataList() {
      return (this.list || []).map(({ nickname, dyCoinOut, level }, index) => {
        const amount = parseNumberUnit(dyCoinOut)
        return {
          order: (this.page - 1) * 10 + index + 1,
          nickname,
          amount,
          lv: Number(level)
        }
      })
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
  color: #333;
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
