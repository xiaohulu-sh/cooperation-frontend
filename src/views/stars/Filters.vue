<template>
  <div>
    <div v-if="fields.includes('platform')" :class="s.filterRow">
      <div :class="s.rowTitle">平台类型：</div>
      <div :class="s.rowContent">
        <radio-list :list="platforms" v-model="platform"></radio-list>
      </div>
    </div>
    <div v-if="fields.includes('type')" :class="s.filterRow">
      <div :class="s.rowTitle">创作类型：</div>
      <div :class="s.rowContent">
        <radio-list :list="types" v-model="type"></radio-list>
      </div>
    </div>
    <div v-if="fields.includes('category')" :class="s.filterRow">
      <div :class="s.rowTitle">带货品类：</div>
      <div :class="s.rowContent">
        <radio-list :list="categorys" v-model="category"></radio-list>
      </div>
    </div>
    <div v-if="otherFields.length > 0" :class="s.filterRow">
      <div :class="s.rowTitle" style="line-height:25px">其他选项：</div>
      <div :class="s.rowContent">
        <template v-for="key in fields">
          <div v-if="key === 'area'" :key="key" :class="s.filterItem">
            所在地：
            <a-select v-model="province" size="small" :class="s.select" style="width:92px">
              <a-select-option key="">省份</a-select-option>
              <a-select-option v-for="p in provinces" :key="p">{{ p }} </a-select-option>
            </a-select>
            <a-select v-model="city" size="small" :class="s.select" style="width:92px;margin-left:10px">
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
          <div v-else-if="key === 'gender'" :key="key" :class="s.filterItem">
            粉丝性别：
            <a-select v-model="gender" size="small" :class="s.select" style="width:92px">
              <a-select-option key="">不限</a-select-option>
              <a-select-option v-for="{ label, value } in genders" :key="value">{{ label }} </a-select-option>
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
          <div v-else-if="key === 'age'" :key="key" :class="s.filterItem">
            粉丝年龄：
            <a-checkbox-group v-model="age" :options="ages"></a-checkbox-group>
          </div>
          <div v-else-if="key === 'pop'" :key="key" :class="s.filterItem">
            粉丝数：
            <radio-list :list="pops" :allValue="allRange" v-model="pop"></radio-list>
            <custom-range v-model="pop"></custom-range>
          </div>
        </template>
      </div>
    </div>
    <div v-if="selectedList.length > 0" :class="s.selectedFilters">
      <div :class="s.selectedTitle">已选：</div>
      <div :class="s.selectedContent">
        <div v-for="{ key, label, text } in selectedList" :key="key" :class="s.selectedItem">
          {{ label }}: <a-tag closable @close="e => (e.preventDefault(), reset(key))">{{ text }}</a-tag>
        </div>
      </div>
      <button :class="s.selectedReset" @click="resetAll">
        <svg height="12" viewBox="0 0 12 12" width="12">
          <path
            d="m9.89688244 8.37578681c-1.33357225 2.20306849-4.19297107 2.90330759-6.38665103 1.56403979-2.19367995-1.3392796-2.89093497-4.21091602-1.55737449-6.41398444 1.3335722-2.20306842 4.19297103-2.90330754 6.38665098-1.56403972.42472123.25929918.80528246.58533032 1.12718575.96567348l-1.56538461 1.54809226 4.09869096.26401511-.2748395-4.11623245-1.3263948 1.34407326c-2.21785082-2.45374003-5.99644223-2.63727704-8.43972571-.4099447-2.44328348 2.22734293-2.62603834 6.02210588-.40819788 8.4758461 1.11072222 1.2288606 2.67863769 1.9408306 4.33100766 1.9667608 2.12035742.0045757 4.08820617-1.1065125 5.18609583-2.92826017.1909526-.32482392.0840365-.7435823-.238991-.93605295-.3234479-.19177007-.7404217-.0843965-.93207216.24001363z"
            fill="currentColor"
            fill-rule="evenodd"
            transform="matrix(-1 0 0 1 12 0)"
          />
        </svg>
        重置
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
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
          { label: '男', value: 1 },
          { label: '女', value: 2 }
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
          { label: '10万以上', value: [100000, ''] },
          { label: '5万-10万', value: [50000, 100000] },
          { label: '1万-5万', value: [10000, 50000] },
          { label: '1万以下', value: ['', 10000] }
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
    otherFields() {
      return this.fields.filter(key => !['platform', 'type', 'category'].includes(key))
    },
    provinces() {
      return Object.keys(this.areasHash)
    },
    cities() {
      return this.areasHash[this.province]
    },
    selected() {
      const selected = {}
      if (this.platform) selected.platform = this.platform
      if (this.type) selected.type = this.type
      if (this.category) selected.category = this.category
      if (this.province) selected.province = this.province
      if (this.city) selected.city = this.city
      if (this.gender) selected.gender = this.gender
      if (this.age && this.age.length > 0) selected.age = this.age
      if (this.pop && (this.pop[0] !== '' || this.pop[1] !== '')) selected.pop = this.pop
      return selected
    },
    selectedList() {
      const list = []
      if (this.platform) {
        const item = this.platforms.find(({ value }) => value === this.platform)
        if (item) list.push({ key: 'platform', label: '平台类型', text: item.label })
      }
      if (this.type) {
        const item = this.types.find(({ value }) => value === this.type)
        if (item) list.push({ key: 'type', label: '创作类型', text: item.label })
      }
      if (this.category) {
        const item = this.categorys.find(({ value }) => value === this.category)
        if (item) list.push({ key: 'category', label: '带货品类', text: item.label })
      }
      if (this.province || this.city) {
        list.push({ key: 'area', label: '所在地', text: [this.province, this.city].filter(v => v).join(' ') })
      }
      if (this.age && this.age.length > 0) {
        list.push({ key: 'age', label: '粉丝年龄', text: this.age.map(v => this.ages.find(({ value }) => v === value).label).join('、') })
      }
      if (this.pop) {
        const [popMin, popMax] = this.pop
        let popText = ''
        if (popMin !== '' && popMax === '') {
          popText = popMin + '以上'
        } else if (popMin !== '' && popMax !== '') {
          popText = `${popMin}-${popMax}`
        } else if (popMin === '' && popMax !== '') {
          popText = popMax + '以下'
        }
        if (popText) {
          list.push({ key: 'pop', label: '粉丝数', text: popText })
        }
      }
      return list
    }
  },
  watch: {
    province() {
      this.city = ''
    },
    selected: {
      handler(selected) {
        this.$emit('update:selected', selected)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('enum', ['fetchTags', 'fetchAreas']),
    reset(key) {
      const handlers = {
        area: () => {
          this.province = ''
          this.city = ''
        },
        age: () => {
          this.age = []
        },
        pop: () => {
          this.pop = this.allRange
        }
      }
      if (handlers[key]) {
        handlers[key]()
      } else {
        this[key] = ''
      }
    },
    resetAll() {
      this.selectedList.forEach(({ key }) => this.reset(key))
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
.filterRow {
  display: flex;
  margin-bottom: 10px;
}
.rowTitle {
  min-width: 80px;
  color: #333;
  font-weight: 600;
}
.rowContent {
  flex: 1 1 auto;
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
.selectedFilters {
  display: flex;
  border-top: 1px solid #e3e4eb;
  padding: 20px 0;
}
.selectedTitle {
  min-width: 50px;
  color: #333;
  font-weight: 600;
}
.selectedContent {
  flex: 1 1 auto;
}
.selectedItem {
  display: inline-block;
  margin: 0 25px 8px 0;
  :global .ant-tag {
    vertical-align: middle;
    margin-top: -2px;
  }
}
.selectedReset {
  border: 0;
  background: none;
  color: #736af2;
  white-space: nowrap;
  margin-top: -10px;
  transition: all 0.3s;
  &:hover {
    color: #a399ff;
  }
  svg {
    vertical-align: middle;
    margin: -2px 4px 0 0;
  }
}
</style>
