<template>
  <div>
    <h2 :class="c.h2a"><i :class="[c.titleIcon, s.category]"></i>按带货品类筛选红人<span>通过红人30日内直播带货的数据表现来定位您的合作对象,进行带货合作</span></h2>
    <filters key="category" :fields="['platform', 'category', 'pop', 'audience']" @update:filters="updateFilters"></filters>
    <DataBlock :class="[c.block, s.result]" :req="listReq" :handler="dataHandler" :isEmpty="isEmpty" :loadingMask="true">
      <template v-slot="{ data: { list, total } }">
        <div :class="s.t1" style="margin-bottom:20px">找到以下符合条件的红人 ({{ total }})</div>
        <div :class="s.rtTip">
          <a-tooltip placement="bottom">
            <template slot="title">
              <div>销售额:近30日红人直播带货的总销售额/场均销售额</div>
              <div>订单数:近30日红人直播带货的总订单数/场均订单数</div>
              <div>客单价:近30日红人直播中所售商品的平均客单价</div>
              <div>*带货品类TOP3(场均):在近30日红人带货直播中,场均销售额最高的前三品类.</div>
            </template>
            <a-icon type="question-circle" />
            数据说明
          </a-tooltip>
        </div>
        <span :class="s.t1" style="margin-right:10px">排序</span>
        <SortBtns :list="sortList" :sortKey.sync="sortKey" :sortValue.sync="sortValue" :asc="2" :desc="1" />
        <table v-if="list.length > 0" ref="table" :class="[c.dataTable, s.dataTable]">
          <colgroup>
            <col />
            <col style="width:168px" />
            <col style="width:148px" />
            <col style="width:168px" />
            <col style="width:158px" />
          </colgroup>
          <thead>
            <tr>
              <th :class="s.col1">红人信息</th>
              <th>销售额(元)</th>
              <th>订单数(笔)</th>
              <th>上架商品</th>
              <th :class="s.colCenter">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.id" @click="onItemClick(item)">
              <td :class="s.col1">
                <BaseInfo :info="item" :avatarSize="60">
                  <template #extra>
                    <div :class="s.extra1">
                      近30日带货 <em>{{ item.liveCount }}</em> 场
                    </div>
                  </template>
                </BaseInfo>
              </td>
              <td>
                <div :class="s.hl">
                  <em>{{ item.liveIncome.n }}</em
                  >{{ item.liveIncome.unit }}元
                </div>
                <div :class="s.subTxt">场均{{ item.liveAvgIncome }}</div>
              </td>
              <td>
                <div>
                  <em>{{ item.orders.n }}</em
                  >{{ item.orders.unit }}
                </div>
                <div :class="s.subTxt">场均{{ item.avgOrders }}</div>
              </td>
              <td>
                <div>
                  客单价<em>{{ item.avgPrice.n }}</em
                  >{{ item.avgPrice.unit }}元
                </div>
                <div :class="s.subTxt">场均上架{{ item.avgGoods }}款</div>
              </td>
              <td :class="s.colCenter">
                <a-button v-if="selected[item.id]" @click.stop="removeSelected(item.id)">已添加</a-button>
                <a-button v-else @click.stop="addSelected({ id: item.id })"><i :class="c.plus"></i>添加红人</a-button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else :class="c.empty1">暂无数据</div>
        <a-pagination :class="c.pagin1" :current="page" @change="onPageChange" :total="total" :pageSize="pageSize" :hideOnSinglePage="true" />
      </template>
      <template #empty>
        <div :class="c.empty1">未找到结果 请尝试减少筛选条件~~</div>
      </template>
    </DataBlock>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import Filters from './Filters'
import SortBtns from '@/components/SortBtns'
import BaseInfo from '@/views/components/BaseInfo'
import { parseNumberUnit, formatNumber } from '@/utils/utils'

export default {
  components: { Filters, SortBtns, BaseInfo },
  data() {
    return {
      filters: null,
      sortList: [
        { value: 3, label: '单场平均销售额' },
        { value: 1, label: '累计销售额' },
        { value: 7, label: '单场平均订单数' },
        { value: 4, label: '带货商品客单价' },
        { value: 6, label: '粉丝数' }
      ],
      sortKey: 3,
      sortValue: 1,
      page: 1,
      pageSize: 20
    }
  },
  computed: {
    ...mapState('selected', { selected: 'hash' }),
    ...mapGetters('enum', ['platformLabels']),
    reqParams() {
      const { platform, category, minAmount, minOrders, avgAmount, avgOrder, unitPrice, liveCount, pop, audience } = this.filters || {}
      return {
        plat_type: platform,
        cate_type: category,
        avg_live_sale: minAmount || 0,
        avg_live_order: minOrders || 0,
        single_live_agv_sale: avgAmount && [avgAmount[0] || 0, avgAmount[1] || 0].join('-'),
        single_live_agv_order: avgOrder && [avgOrder[0] || 0, avgOrder[1] || 0].join('-'),
        goods_agv_sale: unitPrice && [unitPrice[0] || 0, unitPrice[1] || 0].join('-'),
        live_count: liveCount && [liveCount[0] || 0, liveCount[1] || 0].join('-'),
        fans_count: pop && [pop[0] || 0, pop[1] || 0].join('-'),
        live_online_count: audience && [audience[0] || 0, audience[1] || 0].join('-'),
        sort_by: this.sortKey,
        sort_type: this.sortValue
      }
    },
    listReq() {
      if (!this.filters) return null
      return {
        url: 'v1_front_search/anchorListByGoods',
        params: {
          ...this.reqParams,
          page: this.page,
          limit: this.pageSize
        }
      }
    }
  },
  watch: {
    reqParams() {
      this.page = 1
    }
  },
  methods: {
    ...mapMutations('selected', { addSelected: 'add', removeSelected: 'remove' }),
    updateFilters(filters) {
      this.filters = filters
    },
    dataHandler(resData) {
      if (!resData) return null
      const { list = [], total = 0 } = resData || {}
      return {
        list: list.map(({ platform_id, room_id, nickname, gender, fansCount, live_count, live_avg_price, avg_live_sales_number, unit_avg_price, live_avg_good_count }) => {
          return {
            id: `${platform_id}/${room_id}`,
            pid: platform_id,
            rid: room_id,
            name: nickname,
            avatar: `https://xhlcdn.xiaohulu.com/avatar/${platform_id}/${room_id}`,
            gender: gender == 1 ? 'male' : gender == 2 ? 'female' : '',
            plat: this.platformLabels[platform_id],
            subTxt: `${formatNumber(fansCount)}粉`,
            subTxtStyle: { color: '#666' },
            liveCount: live_count,
            liveAvgIncome: formatNumber(live_avg_price / 100),
            liveIncome: parseNumberUnit((live_avg_price * live_count) / 100),
            avgOrders: formatNumber(avg_live_sales_number),
            orders: parseNumberUnit(avg_live_sales_number * live_count),
            avgPrice: parseNumberUnit(unit_avg_price / 100),
            avgGoods: formatNumber(live_avg_good_count)
          }
        }),
        total
      }
    },
    isEmpty(data) {
      return data && data.total === 0
    },
    onPageChange(page) {
      this.page = page
      if (!this.$refs.table) return
      try {
        window.scrollTo({ top: window.pageYOffset + this.$refs.table.getBoundingClientRect().top })
        // eslint-disable-next-line no-empty
      } catch (err) {}
    },
    onItemClick({ id }) {
      window.open(`/star/${id}`, '_blank')
    }
  }
}
</script>

<style lang="less" module="s">
.category {
  background-image: url(~@/assets/by-category.svg);
}
.result {
  padding: 30px;
  margin-top: 20px;
  :global {
    .ant-pagination + div .ant-spin {
      top: 200px;
    }
  }
}
.t1 {
  color: #333;
  font-weight: 600;
}
.col1 {
  padding-left: 10px;
}
.colCenter {
  text-align: center;
}
.dataTable {
  margin-top: 20px;
  th {
    padding-top: 8px;
    padding-bottom: 8px;
    line-height: 14px;
  }
  tbody {
    color: #333;
    tr {
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: #eeedfd;
      }
    }
  }
  em {
    line-height: 22px;
    font-size: 18px;
    font-weight: bold;
    margin: 0 1px;
  }
  .hl {
    color: #ee7a30;
  }
  th.col1 {
    padding-left: 20px;
  }
}
.extra1 {
  margin-top: 4px;
  em {
    font-size: 14px;
    color: #736af2;
    font-weight: bold;
    margin: 0;
  }
}
.subTxt {
  font-size: 14px;
  color: #999;
}
.txt1 {
  line-height: 18px;
  margin: 4px 0;
  span {
    color: #999;
  }
}
.rtTip {
  position: absolute;
  right: 30px;
  top: 32px;
  font-size: 12px;
  color: #736af2;
  z-index: 1;
  :global {
    .anticon-question-circle {
      font-size: 14px;
    }
  }
}
</style>
