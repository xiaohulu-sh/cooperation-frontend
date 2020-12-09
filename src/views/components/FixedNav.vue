<template>
  <div :class="s.container">
    <div :class="s.fixed" data-anchors-container>
      <a-anchor v-if="anchors.length > 0" :class="s.anchors" :targetOffset="10" :bounds="100" :affix="false" @click.prevent>
        <a-anchor-link v-for="{ id, title } in anchors" :key="id" :href="`#${id}`" :title="title" />
      </a-anchor>
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
import debounce from 'lodash/debounce'

let callback = null
const observer = new MutationObserver(
  debounce(function(mutations) {
    if (!callback) return
    if (mutations.every(({ target }) => target.hasAttribute('data-anchors-container'))) return
    const list = []
    document
      .getElementById('app')
      .querySelectorAll('[data-anchor]')
      .forEach(node => {
        list.push({ id: node.id, title: node.getAttribute('data-anchor') })
      })
    callback(list)
  }, 500)
)

export default {
  data() {
    return {
      showBackTop: false,
      anchorsString: '[]'
    }
  },
  computed: {
    ...mapGetters('selected', { selectedList: 'list' }),
    anchors() {
      try {
        return JSON.parse(this.anchorsString)
        // eslint-disable-next-line no-empty
      } catch (err) {}
      return []
    }
  },
  watch: {
    '$route.path'() {
      this.anchorsString = '[]'
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
    callback = list => {
      this.anchorsString = JSON.stringify(list)
    }
    observer.observe(document.getElementById('app'), { subtree: true, childList: true, attributes: true, attributeFilter: ['data-anchor'] })
  },
  beforeDestroy() {
    observer.disconnect()
    callback = null
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
div.anchors {
  background: none;
  margin: 0 0 20px -8px;
  :global {
    .ant-anchor-ink {
      display: none;
    }
    .ant-anchor-link {
      margin-bottom: 10px;
      font-size: 14px;
      padding: 0 2px 0 0;
      border: 4px solid #fff;
      border-width: 4px 5px 6px 18px;
      border-image-slice: 4 5 6 18 fill;
      border-image-source: url(~@/assets/anchor0.svg);
      border-image-repeat: stretch stretch;
      a {
        color: #333;
      }
    }
    .ant-anchor-link-active {
      border-image-source: url(~@/assets/anchor1.svg);
      a {
        color: #fff;
      }
    }
  }
}
@media screen and (max-width: 1360px) {
  .fixed {
    right: 30px;
  }
  div.anchors {
    display: none;
  }
}
</style>
