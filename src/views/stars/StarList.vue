<template>
  <div :class="s.container">
    <div v-if="empty" :class="s.emptyTitle">
      智选库中暂无数据，请减少部分条件
      <div>为您推荐可能感兴趣的KOL</div>
    </div>
    <h3 v-else-if="list.length > 0">符合条件的红人(1931)</h3>
    <RecycleScroller :class="s.list" v-infinite-scroll="loadMore" infinite-scroll-disabled="infDisabled" infinite-scroll-distance="120" page-mode :items="list" :itemSize="476" :buffer="1000">
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
  data() {
    return {
      empty: false,
      list: [],
      infDisabled: false,
      loading: true
    }
  },
  mounted() {
    if (this.empty) {
      this.infDisabled = true
      this.loading = false
      for (let i = 0; i < 6; i++) {
        const gender = Math.random() > 0.5 ? 'male' : 'female'
        pushItem(this.list, {
          id: i,
          gender,
          avatar: gender === 'male' ? 'https://xhlcdn.xiaohulu.com/avatar/202/1270146631' : 'https://xhlcdn.xiaohulu.com/avatar/201/73838190950'
        })
      }
    }
  },
  methods: {
    loadMore() {
      this.infDisabled = true
      setTimeout(() => {
        if (this.list.length > 300) {
          this.infDisabled = true
          this.loading = false
          return
        }
        for (let i = 0; i < 30; i++) {
          const gender = Math.random() > 0.5 ? 'male' : 'female'
          pushItem(this.list, {
            id: i,
            gender,
            avatar: gender === 'male' ? 'https://xhlcdn.xiaohulu.com/avatar/202/1270146631' : 'https://xhlcdn.xiaohulu.com/avatar/201/73838190950'
          })
        }
        this.infDisabled = false
      }, 1000)
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
  & > div {
    font-size: 14px;
    font-weight: 400;
    color: #333;
    margin-top: 10px;
  }
}
</style>
