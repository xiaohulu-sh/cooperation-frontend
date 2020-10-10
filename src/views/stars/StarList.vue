<template>
  <div :class="$style.starsContainer">
    <div v-if="empty" :class="$style.emptyTitle">
      智选库中暂无数据，请减少部分条件
      <div>为您推荐可能感兴趣的KOL</div>
    </div>
    <h3 v-else-if="list.length > 0">符合条件的红人(1931)</h3>
    <RecycleScroller :class="$style.starList" v-infinite-scroll="loadMore" infinite-scroll-disabled="infDisabled" infinite-scroll-distance="120" page-mode :items="list" :itemSize="476" :buffer="1000">
      <template v-slot="{ item: arr }">
        <StarItem :class="$style.starItem" v-for="item in arr" :key="item.id" :item="item"></StarItem>
      </template>
      <template v-if="loading" #after>
        <div :class="$style.moreLoading"><a-spin /></div>
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

<style src="@/styles/common.module.less" lang="less" module></style>
