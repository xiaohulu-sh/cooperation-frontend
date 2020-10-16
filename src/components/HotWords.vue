<template>
  <div v-if="words.length > 0" :class="s.hotWords">
    <span v-for="({ text, style }, index) in list" :key="index" :style="style">{{ text }}</span>
  </div>
</template>

<script>
import shuffle from 'lodash/shuffle'

export default {
  props: {
    words: Array,
    colors: {
      type: Array,
      default() {
        return ['#80c5e5', '#a8c886', '#a875d0', '#b16848', '#ff008a', '#ff9b00', '#ff9898', '#a6a6a6']
      }
    },
    fontSizes: {
      type: Array,
      default() {
        return ['60px', '48px', '40px', '36px', '30px', '26px', '22px']
      }
    }
  },
  computed: {
    list() {
      return shuffle(
        this.words.map(({ text }, index) => ({
          text,
          style: {
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            fontSize: this.fontSizes[Math.ceil((index + 1) / Math.round(this.words.length / this.fontSizes.length))]
          }
        }))
      )
    }
  }
}
</script>

<style lang="less" module="s">
.hotWords {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  line-height: 1;
  overflow: hidden;
  span {
    margin-left: 10px;
    padding: 5px;
    white-space: nowrap;
  }
}
</style>
