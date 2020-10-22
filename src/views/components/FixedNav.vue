<template>
  <div :class="s.container">
    <div :class="s.fixed">
      <a :class="s.cart" href="javascript:"></a>
      <div :class="s.backtop" :style="{ visibility: showBackTop ? '' : 'hidden' }" @click="scrollToTop"></div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'

export default {
  data() {
    return {
      showBackTop: false
    }
  },
  mounted() {
    const throttledScrollHandler = throttle(() => {
      this.showBackTop = window.pageYOffset > 200
    }, 300)
    document.addEventListener('scroll', throttledScrollHandler)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('scroll', throttledScrollHandler)
    })
  },
  methods: {
    scrollToTop() {
      window.scroll({ top: 0, left: window.pageXOffset, behavior: 'smooth' })
    }
  }
}
</script>

<style lang="less" module="s">
.container {
  position: absolute;
  right: -10px;
}
.fixed {
  position: fixed;
  bottom: 30px;
}
@media screen and (max-width: 1360px) {
  .fixed {
    right: 30px;
  }
}
.cart,
.backtop {
  display: block;
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    opacity: 0.8;
  }
}
.cart {
  background-image: url(../../assets/cart.svg);
}
.backtop {
  background-image: url(../../assets/up.svg);
}
</style>
