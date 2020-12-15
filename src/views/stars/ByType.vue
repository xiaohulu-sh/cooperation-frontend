<template>
  <div>
    <h2 :class="c.h2a"><i :class="[c.titleIcon, s.type]"></i>按创作类型筛选<span>通过红人发布视频内容的类型来定位您的合作对象,进行品宣视频合作或者橱窗带货合作等</span></h2>
    <filters key="type" :fields="['search', 'platform', 'type', 'age', 'pop']" @update:filters="updateFilters"></filters>
    <DataBlock :class="[c.block, s.result]" :req="listReq" :handler="dataHandler" :isEmpty="isEmpty" :loadingMask="true">
      <template v-slot="{ data: { list, total } }">
        <div :class="s.t1" style="margin-bottom:20px">找到以下符合条件的红人 ({{ total }})</div>
        <span :class="s.t1" style="margin-right:10px">排序</span>
        <SortBtns :list="sortList" :sortKey.sync="sortKey" :sortValue.sync="sortValue" />
        <table v-if="list.length > 0" ref="table" :class="[c.dataTable, s.dataTable]">
          <colgroup>
            <col />
            <col style="width:208px" />
            <col style="width:168px" />
            <col style="width:138px" />
            <col style="width:140px" />
          </colgroup>
          <thead>
            <tr>
              <th :class="s.col1">红人信息</th>
              <th>粉丝情况</th>
              <th>作品获赞情况</th>
              <th :class="s.colCenter">视频合作报价</th>
              <th :class="s.colCenter">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.id" @click="onItemClick(item)">
              <td :class="s.col1"><BaseInfo :info="item" /></td>
              <td>
                <em :class="s.hl">
                  {{ item.fans.n }}<span v-if="item.fans.unit">{{ item.fans.unit }}</span>
                </em>
                <div :class="s.sub1">近30日{{ item.fansDelta }}</div>
                <div :class="s.sub2">{{ item.fansOverview }}</div>
              </td>
              <td>
                <em>
                  {{ item.likes.n }}<span v-if="item.likes.unit">{{ item.likes.unit }}</span>
                </em>
                <div :class="s.sub1">近30日作品均赞{{ item.newLikes }}</div>
                <div :class="s.sub2">总作品数{{ item.videos }}</div>
              </td>
              <td :class="s.colCenter">
                <em>{{ item.price ? intlFormatNumber(item.price) : '--' }}</em>
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
import { parseNumberUnit, formatNumber, intlFormatNumber } from '@/utils/utils'

export default {
  components: { Filters, SortBtns, BaseInfo },
  data() {
    return {
      filters: null,
      sortList: [
        { value: 1, label: '按粉丝排序' },
        { value: 2, label: '按视频平均点赞排序' },
        { value: 3, label: '按30日涨粉数排序' }
      ],
      sortKey: 1,
      sortValue: 2,
      page: 1,
      pageSize: 20
    }
  },
  computed: {
    ...mapState('selected', { selected: 'hash' }),
    ...mapGetters('enum', ['platformLabels']),
    reqParams() {
      const { search, platform, type = [], province, city, gender, age, pop } = this.filters || {}
      return {
        name: search || undefined,
        plat_type: platform,
        cate_type: type[0],
        cate_son_type: type[1],
        province: province || undefined,
        region: city || undefined,
        gender,
        fans_age: age && age.join(','),
        fansnum: pop && [pop[0] || 0, pop[1] || 0].join('-'),
        sort_type: this.sortKey,
        sort: this.sortValue
      }
    },
    listReq() {
      if (!this.filters) return null
      return {
        url: 'v1_front_search/anchorListByType',
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
    intlFormatNumber,
    updateFilters(filters) {
      this.filters = filters
    },
    dataHandler(resData) {
      if (!resData) return null
      const { list = [], total = 0 } = resData || {}
      return {
        list: list.map(({ pid, rid, nickname, gender, LocationName, fansnum, new_fans_30, fans_boy_count, fans_girl_count, fans_age_18, fans_age_18_25, fans_age_26_32, fans_age_33_39, fans_age_40, diggnum, new_digg_30, videonum, price_1_20s, price_21_60s }) => {
          const fansDeltaStr = formatNumber(new_fans_30)
          const ageValues = [fans_age_18, fans_age_18_25, fans_age_26_32, fans_age_33_39, fans_age_40]
          const ageLabels = ['18岁以下', '18-25岁', '26-32岁', '33-39岁', '40岁以上']
          return {
            id: `${pid}/${rid}`,
            pid,
            rid,
            name: nickname,
            avatar: `https://xhlcdn.xiaohulu.com/avatar/${pid}/${rid}`,
            gender: gender == 1 ? 'male' : gender == 2 ? 'female' : '',
            plat: this.platformLabels[pid],
            subTxt: LocationName,
            fans: parseNumberUnit(fansnum),
            fansDelta: fansDeltaStr.substring(0, 1) === '-' ? `下降${fansDeltaStr.substring(1)}` : `上涨${fansDeltaStr}`,
            fansOverview: `${fans_girl_count > fans_boy_count ? '女性居多' : '男性居多'},主要为${ageLabels[ageValues.indexOf(Math.max(...ageValues))]}`,
            likes: parseNumberUnit(diggnum),
            newLikes: formatNumber(new_digg_30),
            videos: videonum,
            price: Number(price_1_20s) || Number(price_21_60s)
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
.type {
  background-image: url(~@/assets/by-type.svg);
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
.dataTable {
  margin-top: 20px;
  tbody {
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
    font-size: 16px;
    font-weight: 600;
    color: #333;
    span {
      font-size: 14px;
      font-weight: normal;
    }
  }
  .hl {
    font-size: 18px;
    color: #ee7a30;
  }
}
.col1 {
  padding-left: 20px;
}
.colCenter {
  text-align: center;
}
.sub1 {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}
.sub2 {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
  margin-top: 2px;
}
</style>
