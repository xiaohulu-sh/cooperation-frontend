<template>
  <router-link :to="`/star/${item.id}`" target="_blank" :class="s.item">
    <div :class="s.bg" :style="`background-image:url(${item.avatar})`">
      <span v-if="item.location" :class="s.area">{{ item.location }}</span>
      <div :class="{ [s.name]: true, [s.onlyName]: item.tags.length === 0 }">
        <span v-if="item.plat" :class="[c.tag1, s.tag1]">{{ item.plat }}</span>
        <span :class="[c[item.gender], s[item.gender]]">{{ item.name || '未知' }}</span>
      </div>
      <div :class="s.tags">
        <span v-for="tag in item.tags" :key="tag" :class="[c.tag2, s.tag2]">{{ tag }}</span>
        <span v-if="item.guild" :class="[c.tag3, s.tag3]">{{ item.guild }}</span>
      </div>
    </div>
    <div :class="[c.ellipsis1, s.intro1]">男女粉丝比例：男粉居多，26-32岁粉丝居多</div>
    <div :class="s.data">
      <div :class="s.dataCol">
        总粉丝数<br />
        <strong>{{ formatNumber(item.fans, { empty: '--' }) }}</strong>
        <span>30天涨粉{{ formatNumber(item.newFans, { empty: '--' }) }}</span>
      </div>
      <div :class="s.dataCol">
        总点赞数<br />
        <strong>{{ formatNumber(item.likes, { empty: '--' }) }}</strong>
        <span>作品数{{ formatNumber(item.videos, { empty: '--' }) }}</span>
      </div>
      <div :class="s.dataCol">
        星途报价<br />
        <strong>{{ formatNumber(item.price, { empty: '暂无' }) }}</strong>
        <span>{{ item.priceType }}</span>
      </div>
    </div>
    <div :class="s.btnWrap">
      <a-button v-if="selected[item.id]" icon="check" @click.prevent="removeSelected(item.id)">已添加</a-button>
      <a-button v-else @click.prevent="addSelected({ id: item.id })"><i :class="c.plus"></i>添加红人</a-button>
    </div>
  </router-link>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { formatNumber } from '@/utils/utils'

export default {
  props: {
    item: Object
  },
  computed: {
    ...mapState('selected', { selected: 'hash' })
  },
  methods: {
    ...mapMutations('selected', { addSelected: 'add', removeSelected: 'remove' }),
    formatNumber
  }
}
</script>

<style lang="less" module="s">
.item {
  display: inline-block;
  position: relative;
  width: 300px;
  height: 400px;
  border: 1px solid #d9d9d9;
  margin: 0 30px 30px 0;
  padding-top: 200px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: rgba(0, 0, 0, 0.65);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  }
}
.bg {
  position: absolute;
  left: -1px;
  right: -1px;
  top: -1px;
  height: 200px;
  background-color: #666;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 40px;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  }
}
.area {
  position: absolute;
  left: 10px;
  top: 10px;
  height: 20px;
  line-height: 20px;
  padding: 0 7px;
  background: rgba(0, 0, 0, 0.62);
  border-radius: 10px;
  font-size: 12px;
  color: #fff;
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 12px;
    background: url(~@/assets/location.svg) no-repeat 0 0 / contain;
    vertical-align: middle;
    margin: -2px 4px 0 0;
  }
}
.tag1 {
  margin-right: 5px;
}
.tag2 {
  margin-left: 10px;
}
.tag3 {
  float: right;
  margin-right: 10px;
}
.name {
  position: absolute;
  left: 0;
  top: 130px;
  padding: 0 10px;
  color: #fff;
  .male::after,
  .female::after {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin: -2px 0 0 4px;
  }
}
.onlyName {
  top: 162px;
}
.tags {
  position: absolute;
  top: 162px;
  left: 0;
  right: 0;
}
.intro1 {
  font-size: 12px;
  margin: 10px;
}
.data {
  display: flex;
  margin: 20px 0 25px;
  white-space: nowrap;
}
.dataCol {
  flex: 1 1 100px;
  padding: 0 10px;
  strong {
    display: block;
    font-size: 16px;
    line-height: 22px;
    color: #736af2;
  }
  span {
    font-size: 12px;
    color: #999;
  }
}
.btnWrap {
  text-align: center;
}
</style>
