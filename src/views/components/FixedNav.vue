<template>
  <div :class="s.container">
    <div :class="s.fixed">
      <a-badge :count="selectedList.length" :offset="[-2, 2]">
        <router-link :class="s.cart" to="/stars/selected"></router-link>
      </a-badge>
      <div :class="s.backtop" :style="{ visibility: showBackTop ? '' : 'hidden' }" @click="scrollToTop"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'

export default {
  data() {
    return {
      showBackTop: false
    }
  },
  computed: { ...mapGetters('selected', { selectedList: 'list' }) },
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
      window.scroll({ top: 0, behavior: 'smooth' })
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
  bottom: 20px;
  :global .ant-badge-count {
    opacity: 0.8;
  }
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
  margin-bottom: 10px;
  &:hover {
    opacity: 0.8;
  }
}
.cart {
  background-image: url(~@/assets/cart.svg);
}
.backtop {
  background-image: url(~@/assets/up.svg);
}
</style>
