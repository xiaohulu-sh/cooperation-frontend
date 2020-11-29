<template>
  <div :class="s.container">
    <div v-if="empty" :class="s.emptyTitle">
      智选库中暂无数据，请减少部分条件
      <!-- <div>为您推荐可能感兴趣的KOL</div> -->
    </div>
    <h3 v-else-if="list.length > 0">符合条件的红人({{ total }})</h3>
    <RecycleScroller :class="s.list" v-infinite-scroll="loadMore" infinite-scroll-disabled="infDisabled" infinite-scroll-distance="400" page-mode :items="list" :itemSize="430" :buffer="1000">
      <template v-slot="{ item: arr }">
        <StarItem v-for="item in arr" :key="item.id" :item="item"></StarItem>
      </template>
      <template v-if="loading" #after>
        <div :class="s.moreLoading"><a-spin /></div>
      </template>
    </RecycleScroller>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { asyncHelper } from '@/utils/utils'
import { request } from '@/utils/http'
import StarItem from './StarItem'

function pushItem(list, item) {
  let a = list[list.length - 1]
  if (!a || a.length === 3) {
    a = []
    list.push(a)
  }
  a.push(item)
  a.id = a.map(item => item.id).join('-')
}

export default {
  components: { StarItem },
  props: {
    req: Object
  },
  data() {
    return {
      empty: false,
      list: [],
      infDisabled: false,
      loading: false,
      page: 0,
      total: 0
    }
  },
  computed: {
    ...mapGetters('enum', ['platformLabels'])
  },
  watch: {
    req() {
      this.infDisabled = true
      this.list = []
      this.page = 0
      this.loadMore()
    }
  },
  methods: {
    async loadMore() {
      this.empty = false
      this.infDisabled = true
      this.loading = true
      const page = this.page + 1
      const reqConfig = { ...this.req, params: { ...this.req.params, page, limit: 15 } }
      this.reqConfig = reqConfig
      const data = await asyncHelper(request(reqConfig))
      if (this.reqConfig !== reqConfig) return
      this.loading = false
      if (!data) {
        if (this.list.length === 0) {
          this.empty = true
        }
        return
      }
      const { current_page, last_page, list, total } = data
      this.page = page
      this.total = total
      list.forEach(({ pid, rid, nickname, gender, LocationName, tags, guild, fansnum, new_fans_30, diggnum, videonum, price_1_20s, price_21_60s }) => {
        let price = 0
        let priceType = '1-20s报价'
        if (price_1_20s) {
          price = price_1_20s
        } else if (price_21_60s) {
          price = price_21_60s
          priceType = '21-60s报价'
        }

        pushItem(this.list, {
          id: `${pid}/${rid}`,
          pid,
          rid,
          name: nickname,
          gender: gender == 1 ? 'male' : gender == 2 ? 'female' : '',
          avatar: `https://xhlcdn.xiaohulu.com/avatar/${pid}/${rid}`,
          plat: this.platformLabels[pid],
          location: LocationName,
          tags,
          guild,
          fans: fansnum,
          newFans: new_fans_30,
          likes: diggnum,
          videos: videonum,
          price,
          priceType
        })
      })
      if (current_page >= last_page) {
        this.infDisabled = true
        if (this.list.length === 0) {
          this.empty = true
        }
      } else {
        this.infDisabled = false
      }
    }
  }
}
</script>

<style lang="less" module="s">
.container {
  h3 {
    color: #333;
    font-size: 16px;
    margin: 20px 0;
  }
}
.list {
  margin: 0 -30px -30px 0;
}
.moreLoading {
  text-align: center;
  padding: 20px 0 40px;
}
.emptyTitle {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin: 20px 0 38px;
  padding-bottom: 30px;
  & > div {
    font-size: 14px;
    font-weight: 400;
    color: #333;
    margin-top: 10px;
  }
}
</style>
