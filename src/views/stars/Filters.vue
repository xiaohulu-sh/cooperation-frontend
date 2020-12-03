<template>
  <div :class="[c.block, s.container]">
    <a-input-search v-if="fields.includes('search')" :class="s.search" size="small" placeholder="输入红人昵称查询" enter-button="搜索" @search="onSearch" />
    <div :class="s.table">
      <div v-if="fields.includes('platform')" :class="s.filterRow">
        <div :class="s.rowTitle">红人所属平台：</div>
        <div :class="s.rowContent">
          <radio-list :list="platforms" v-model="platform"></radio-list>
        </div>
      </div>
      <div v-if="fields.includes('type')" :class="s.filterRow">
        <div :class="s.rowTitle">红人内容类型：</div>
        <div :class="s.rowContent">
          <CategoryPicker :list="types" v-model="type" />
        </div>
      </div>
      <div v-if="fields.includes('category')" :class="s.filterRow">
        <div :class="s.rowTitle">带货品类：</div>
        <div :class="s.rowContent">
          <radio-list :list="categorys" v-model="category"></radio-list>
        </div>
      </div>
      <div v-if="fields.includes('pop')" :class="s.filterRow">
        <div :class="s.rowTitle">红人粉丝数：</div>
        <div :class="s.rowContent">
          <radio-list :list="pops" :allValue="allRange" v-model="pop"></radio-list>
          <custom-range v-model="pop" :min="50000"></custom-range>
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
import CustomRange from '@/components/CustomRange'
import CategoryPicker from '@/components/CategoryPicker'

export default {
  components: { CustomRange, CategoryPicker },
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
        category: '',
        categorys: [
          { label: '女装', value: 1 },
          { label: '男装', value: 2 },
          { label: '内衣', value: 3 },
          { label: '箱包', value: 4 },
          { label: '美妆', value: 5 },
          { label: '个人护理', value: 6 },
          { label: '腕表', value: 7 },
          { label: '眼镜', value: 8 },
          { label: '珠宝首饰', value: 9 },
          { label: '手机', value: 10 },
          { label: '进口食品', value: 11 },
          { label: '茶酒零食', value: 12 },
          { label: '母婴玩具', value: 13 },
          { label: '电脑办公', value: 14 },
          { label: '数码', value: 15 },
          { label: '未分类', value: 16 }
        ]
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
    ...mapState('enum', { platforms: 'platforms', types: 'tags' }),
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
      if (this.category) filters.category = this.category
      if (this.province) filters.province = this.province
      if (this.city) filters.city = this.city
      if (this.gender) filters.gender = this.gender
      if (this.age && this.age.length > 0) filters.age = this.age
      if (this.pop && (this.pop[0] !== '' || this.pop[1] !== '')) filters.pop = this.pop
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
    ...mapActions('enum', ['fetchTags', 'fetchAreas']),
    onSearch(value) {
      this.search = value.trim()
    }
  },
  created() {
    if (this.fields.includes('type')) {
      this.fetchTags()
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
  white-space: nowrap;
  min-width: 80px;
  color: #333;
  font-weight: 600;
  padding: 0 10px 10px 0;
}
.rowContent {
  display: table-cell;
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
.filterItem {
  display: inline-block;
  min-width: 273px;
  margin: 0 20px 10px 0;
}
</style>
