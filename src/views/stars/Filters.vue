<template>
  <div :class="[c.block, s.container]">
    <a-input-search v-if="fields.includes('search')" :class="s.search" size="small" placeholder="输入红人昵称查询" enter-button="搜索" @search="onSearch" />
    <div :class="s.table">
      <div v-if="fields.includes('platform')" :class="s.filterRow">
        <div :class="s.rowTitle">红人所属平台：</div>
        <div :class="s.rowContent">
          <RadioList :list="platforms" v-model="platform" />
        </div>
      </div>
      <div v-if="fields.includes('type')" :class="s.filterRow">
        <div :class="s.rowTitle">红人内容类型：</div>
        <div :class="s.rowContent">
          <CategoryPicker :list="types" v-model="type" />
        </div>
      </div>
      <template v-if="fields.includes('category')">
        <div :class="s.filterRow">
          <div :class="s.rowTitle">
            <a-tooltip placement="bottom">
              <template slot="title">红人在近30日直播带货销售过程中所有上架商品的所属品类.</template>
              <a-icon type="question-circle" />
            </a-tooltip>
            带过的品类：
          </div>
          <div :class="s.rowContent">
            <MultipleSelection :list="categories" v-model="category" />
            <div :class="s.extra1">
              <span :class="s.label1">
                <a-tooltip placement="bottom">
                  <template slot="title">可以对已经选中的品类进行*场均*销售额和*场均*订单数的筛选</template>
                  <a-icon type="question-circle" />
                </a-tooltip>
                以上所选品类
              </span>
              <label :class="s.label2">30日直播销售额 &gt;<a-input v-model.trim="minAmountInput" @pressEnter="onMinConfirm" :class="s.input1" size="small" />元</label>
              <label :class="s.label2">场均订单数 &gt;<a-input v-model.trim="minOrdersInput" @pressEnter="onMinConfirm" :class="s.input1" size="small" />单</label>
              <button :class="c.smBtn" style="margin-left:20px" @click="onMinConfirm">确定</button>
            </div>
          </div>
        </div>
        <div :class="s.filterRow">
          <div :class="s.rowTitle">场均销售额：</div>
          <div :class="s.rowContent">
            <radio-list :list="avgAmounts" :allValue="allRange" v-model="avgAmount"></radio-list>
            <custom-range v-model="avgAmount"></custom-range>
          </div>
        </div>
        <div :class="s.filterRow">
          <div :class="s.rowTitle">场均订单数：</div>
          <div :class="s.rowContent">
            <radio-list :list="avgOrders" :allValue="allRange" v-model="avgOrder"></radio-list>
            <custom-range v-model="avgOrder"></custom-range>
          </div>
        </div>
        <div :class="s.filterRow">
          <div :class="s.rowTitle">商品客单价：</div>
          <div :class="s.rowContent">
            <radio-list :list="unitPrices" :allValue="allRange" v-model="unitPrice"></radio-list>
            <custom-range v-model="unitPrice"></custom-range>
          </div>
        </div>
        <div :class="s.filterRow">
          <div :class="s.rowTitle">直播场次数：</div>
          <div :class="s.rowContent">
            <radio-list :list="liveCounts" :allValue="allRange" v-model="liveCount"></radio-list>
            <custom-range v-model="liveCount"></custom-range>
          </div>
        </div>
      </template>
      <div v-if="fields.includes('pop')" :class="s.filterRow">
        <div :class="s.rowTitle">红人粉丝数：</div>
        <div :class="s.rowContent">
          <radio-list :list="pops" :allValue="allRange" v-model="pop"></radio-list>
          <custom-range v-model="pop" :min="50000"></custom-range>
        </div>
      </div>
      <div v-if="fields.includes('audience')" :class="s.filterRow">
        <div :class="s.rowTitle">
          <a-tooltip placement="bottom">
            <template slot="title">抖音/快手平台为30日带货直播中的单场最高在线数峰值.</template>
            <a-icon type="question-circle" />
          </a-tooltip>
          最高观众数：
        </div>
        <div :class="s.rowContent">
          <radio-list :list="audiences" :allValue="allRange" v-model="audience"></radio-list>
          <custom-range v-model="audience" :min="50000"></custom-range>
        </div>
      </div>
      <div v-if="fields.includes('age')" :class="s.filterRow">
        <div :class="s.rowTitle">粉丝主要年龄：</div>
        <div :class="s.rowContent">
          <a-checkbox-group v-model="age" :options="ages"></a-checkbox-group>
        </div>
      </div>
      <div v-if="fields.includes('gender')" :class="s.filterRow">
        <div :class="s.rowTitle">粉丝主要性别：</div>
        <div :class="s.rowContent">
          <radio-list :list="genders" v-model="gender"></radio-list>
        </div>
      </div>
      <!-- <div :class="s.filterRow">
      <div :class="s.rowTitle" style="line-height:25px">其他选项：</div>
      <div :class="s.rowContent">
        <template v-for="key in fields">
          <div v-if="key === 'area'" :key="key" :class="s.filterItem">
            所在地：
            <a-select v-model="province" size="small" :class="s.select" style="width:120px">
              <a-select-option key="">省份</a-select-option>
              <a-select-option v-for="p in provinces" :key="p">{{ p }} </a-select-option>
            </a-select>
            <a-select v-model="city" size="small" :class="s.select" style="width:120px;margin-left:10px">
              <a-select-option key="">地区</a-select-option>
              <a-select-option v-for="c in cities" :key="c">{{ c }} </a-select-option>
            </a-select>
          </div>
          <div v-else-if="key === 'frequency'" :key="key" :class="s.filterItem">
            视频发布频率：
            <a-select v-model="frequency" size="small" :class="s.select" style="width:92px">
              <a-select-option key="">不限</a-select-option>
            </a-select>
          </div>
          <div v-else-if="key === 'broadcasted'" :key="key" :class="s.filterItem">
            历史是否开直播：
            <a-select v-model="broadcasted" size="small" :class="s.select" style="width:92px">
              <a-select-option key="">不限</a-select-option>
            </a-select>
          </div>
          <div v-else-if="key === 'grow'" :key="key" :class="s.filterItem">
            数据涨幅：
            <a-select v-model="grow" size="small" :class="s.select" style="width:92px">
              <a-select-option key="">不限</a-select-option>
            </a-select>
          </div>
          <div v-else-if="key === 'thumbs'" :key="key" :class="s.filterItem">
            历史作品总点赞：
            <a-select v-model="thumbs" size="small" :class="s.select" style="width:92px">
              <a-select-option key="">不限</a-select-option>
            </a-select>
          </div>
          <div v-else-if="key === 'purchase'" :key="key" :class="s.filterItem">
            粉丝购买力：
            <a-select v-model="purchase" size="small" :class="s.select" style="width:92px">
              <a-select-option key="">不限</a-select-option>
            </a-select>
          </div>
          <div v-else-if="key === 'occupation'" :key="key" :class="s.filterItem">
            消费者职业：
            <a-select v-model="occupation" size="small" :class="s.select" style="width:92px">
              <a-select-option key="">不限</a-select-option>
            </a-select>
          </div>
          <div v-else-if="key === 'loyalty'" :key="key" :class="s.filterItem">
            粉丝购买忠诚度：
            <a-select v-model="loyalty" size="small" :class="s.select" style="width:92px">
              <a-select-option key="">不限</a-select-option>
            </a-select>
          </div>
        </template>
      </div>
    </div> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import MultipleSelection from '@/components/MultipleSelection'
import CustomRange from '@/components/CustomRange'
import CategoryPicker from '@/components/CategoryPicker'

export default {
  components: { MultipleSelection, CustomRange, CategoryPicker },
  props: {
    fields: {
      type: Array,
      required: true
    }
  },
  data() {
    const allRange = ['', '']
    const data = {
      allRange
    }
    const initial = {
      search: {
        search: ''
      },
      platform: {
        platform: ''
      },
      type: {
        type: ''
      },
      category: {
        category: [],
        minAmountInput: '',
        minAmount: '',
        minOrdersInput: '',
        minOrders: '',
        avgAmounts: [
          { label: '10万以下', value: ['', 100000] },
          { label: '10-50万', value: [100000, 500000] },
          { label: '50-100万', value: [500000, 1000000] },
          { label: '100-200万', value: [1000000, 2000000] },
          { label: '200-500万', value: [2000000, 5000000] },
          { label: '500万以上', value: [5000000, ''] }
        ],
        avgAmount: allRange,
        avgOrders: [
          { label: '1万以下', value: ['', 10000] },
          { label: '1-10万', value: [10000, 100000] },
          { label: '10-50万', value: [100000, 500000] },
          { label: '50-100万', value: [500000, 1000000] },
          { label: '100万以上', value: [1000000, ''] }
        ],
        avgOrder: allRange,
        unitPrices: [
          { label: '50以下', value: ['', 50] },
          { label: '50-100', value: [50, 100] },
          { label: '100-200', value: [100, 200] },
          { label: '200-500', value: [200, 500] },
          { label: '500以上', value: [500, ''] }
        ],
        unitPrice: allRange,
        liveCounts: [
          { label: '8场以下', value: ['', 8] },
          { label: '8-30', value: [8, 30] },
          { label: '30场以上', value: [30, ''] }
        ],
        liveCount: allRange
      },
      area: {
        province: '',
        city: ''
      },
      frequency: { frequency: '' },
      broadcasted: { broadcasted: '' },
      grow: { grow: '' },
      gender: {
        gender: '',
        genders: [
          { label: '男性粉丝较多', value: 1 },
          { label: '女性粉丝较多', value: 2 }
        ]
      },
      thumbs: { thumbs: '' },
      purchase: { purchase: '' },
      occupation: { occupation: '' },
      loyalty: { loyalty: '' },
      age: {
        ages: [
          { label: '18岁以下', value: 1 },
          { label: '18-25岁', value: 2 },
          { label: '26-32岁', value: 3 },
          { label: '33-39岁', value: 4 },
          { label: '40岁以上', value: 5 }
        ],
        age: []
      },
      pop: {
        pops: [
          { label: '5-20万', value: [50000, 200000] },
          { label: '20-50万', value: [200000, 500000] },
          { label: '50-100万', value: [500000, 1000000] },
          { label: '100-200万', value: [1000000, 2000000] },
          { label: '200-500万', value: [2000000, 5000000] },
          { label: '500万以上', value: [5000000, ''] }
        ],
        pop: allRange
      },
      audience: {
        audiences: [
          { label: '5000以下', value: ['', 5000] },
          { label: '5000-1万', value: [5000, 10000] },
          { label: '1-5万', value: [10000, 50000] },
          { label: '5-10万', value: [50000, 100000] },
          { label: '10万以上', value: [100000, ''] }
        ],
        audience: allRange
      }
    }
    this.fields.forEach(key => {
      if (key in initial) {
        Object.assign(data, initial[key])
      }
    })
    return data
  },
  computed: {
    ...mapState('enum', { platforms: 'platforms', types: 'tags', categories: 'categories' }),
    ...mapGetters('enum', ['areasHash']),
    provinces() {
      return Object.keys(this.areasHash)
    },
    cities() {
      return this.areasHash[this.province]
    },
    filters() {
      const filters = {}
      if (this.search) filters.search = this.search
      if (this.platform) filters.platform = this.platform
      if (this.type) filters.type = this.type.split('|')
      if (this.category && this.category.length > 0) filters.category = this.category
      if (this.minAmount) filters.minAmount = this.minAmount
      if (this.minOrders) filters.minOrders = this.minOrders
      if (this.avgAmount && (this.avgAmount[0] || this.avgAmount[1])) filters.avgAmount = this.avgAmount
      if (this.avgOrder && (this.avgOrder[0] || this.avgOrder[1])) filters.avgOrder = this.avgOrder
      if (this.unitPrice && (this.unitPrice[0] || this.unitPrice[1])) filters.unitPrice = this.unitPrice
      if (this.liveCount && (this.liveCount[0] || this.liveCount[1])) filters.liveCount = this.liveCount
      if (this.province) filters.province = this.province
      if (this.city) filters.city = this.city
      if (this.gender) filters.gender = this.gender
      if (this.age && this.age.length > 0) filters.age = this.age
      if (this.pop && (this.pop[0] || this.pop[1])) filters.pop = this.pop
      if (this.audience && (this.audience[0] || this.audience[1])) filters.audience = this.audience
      return filters
    }
  },
  watch: {
    province() {
      this.city = ''
    },
    filters: {
      handler(filters) {
        this.$emit('update:filters', filters)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('enum', ['fetchTags', 'fetchCategories', 'fetchAreas']),
    onSearch(value) {
      this.search = value.trim()
    },
    onMinConfirm() {
      const amount = Number(this.minAmountInput)
      this.minAmount = amount > 0 ? amount : ''
      this.minAmountInput = this.minAmount
      const orders = Number(this.minOrdersInput)
      this.minOrders = orders > 0 ? orders : ''
      this.minOrdersInput = this.minOrders
    }
  },
  created() {
    if (this.fields.includes('type')) {
      this.fetchTags()
    }
    if (this.fields.includes('category')) {
      this.fetchCategories()
    }
    if (this.fields.includes('area')) {
      this.fetchAreas()
    }
  }
}
</script>

<style lang="less" module="s">
.container {
  padding: 30px 30px 20px;
  :global {
    .anticon-question-circle {
      color: #736af2;
    }
  }
}
.search {
  width: 300px;
  margin-bottom: 20px;
}
.table {
  display: table;
}
.filterRow {
  display: table-row;
}
.rowTitle {
  display: table-cell;
  vertical-align: top;
  white-space: nowrap;
  min-width: 80px;
  color: #333;
  font-weight: 600;
  padding: 0 10px 10px 0;
  text-align: right;
}
.rowContent {
  display: table-cell;
  vertical-align: top;
  padding-bottom: 10px;
}
.select {
  :global {
    .ant-select-selection--single {
      height: 26px;
    }
    .ant-select-selection__rendered {
      line-height: 24px;
    }
    .ant-select-arrow-icon {
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
.extra1 {
  margin: 8px 0;
}
.input1 {
  width: 90px;
  margin: 0 2px;
}
.label1 {
  font-weight: bold;
  color: #333;
}
.label2 {
  margin: 0 10px 0 20px;
}
// .filterItem {
//   display: inline-block;
//   min-width: 273px;
//   margin: 0 20px 10px 0;
// }
</style>
