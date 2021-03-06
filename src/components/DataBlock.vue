<template>
  <component :is="tag" :class="s.container">
    <template v-if="!lazyRender || shouldRender">
      <slot v-if="showErr && err" name="err" :err="err" :ss="s" :img="simpleImg">
        <a-empty :image="simpleImg" :class="s.center">
          <span slot="description" style="color: #999">加载失败</span>
          <a-button :class="s.reload" :loading="loading" type="primary" size="small" icon="reload" @click="onReloadClick">重试</a-button>
        </a-empty>
      </slot>
      <slot v-else-if="showEmpty && empty" name="empty" :data="data" :ss="s" :img="noDataImage">
        <a-empty :image="noDataImage" :class="s.center" />
      </slot>
      <slot v-else-if="data" :data="data" :req="curReq" :err="err" :loading="loading"></slot>
      <transition name="loading">
        <slot v-if="showLoading && loading" name="loading" :loading="loading" :data="data" :ss="s">
          <div v-if="loadingMask" :class="s.mask">
            <a-spin :class="s.center" />
          </div>
          <a-spin v-else :class="s.center" />
        </slot>
      </transition>
    </template>
  </component>
</template>

<script>
import isEqual from 'lodash/isEqual'
import { Empty } from 'ant-design-vue'
import { createFetchAction } from '@/utils/http'
import lazy from '@/components/common/lazy'

export default {
  props: {
    req: Object,
    handler: {
      type: Function,
      default(resData) {
        return resData
      }
    },
    isEmpty: {
      type: Function,
      default(data) {
        return data && data.length === 0
      }
    },
    tag: {
      type: String,
      default: 'div'
    },
    refresh: {
      type: [Number, String],
      default: 0
    },
    showErr: {
      type: Boolean,
      default: true
    },
    showEmpty: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    lazyRender: {
      type: Boolean,
      default: false
    },
    loadingMask: {
      type: Boolean,
      default: false
    },
    silent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      ...lazy.data(),
      loading: false,
      resData: undefined,
      curReq: undefined,
      err: undefined
    }
  },
  computed: {
    ...lazy.computed,
    data() {
      return this.handler(this.resData, this)
    },
    empty() {
      return this.isEmpty(this.data, this)
    }
  },
  watch: {
    req: {
      handler(req, prevReq) {
        if (isEqual({ ...prevReq, extra: null }, { ...req, extra: null })) return
        this.fetchData()
      },
      deep: true
    },
    refresh() {
      this.fetchData({ refresh: true })
    },
    data(data, prevData) {
      lazy.watch.data.call(this, data, prevData)
      this.$emit('update:data', data, prevData)
    },
    visible: lazy.watch.visible
  },
  methods: {
    onReloadClick() {
      this.fetchData()
    }
  },
  created() {
    this.simpleImg = Empty.PRESENTED_IMAGE_SIMPLE
    this.fetchData = createFetchAction({
      key: 'resData',
      loadingKey: 'loading',
      getReqConfig() {
        return this.req
      },
      getReqOptions() {
        return { silent: this.silent }
      },
      setData(data, req, err) {
        this.resData = data
        this.curReq = req
        this.err = !err && data === null ? { code: -1, msg: '加载失败' } : err
      }
    })
    if (!this.lazyRender) {
      this.fetchData()
    }
  },
  mounted() {
    if (this.lazyRender) {
      lazy.mounted.call(this)
      this.loading = true
      setTimeout(() => {
        this.fetchData()
      }, 500)
    }
  }
}
</script>

<style scoped>
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.3s;
}
.loading-enter,
.loading-leave-to {
  opacity: 0;
}
</style>
<style lang="less" module="s">
.container {
  position: relative;
  min-height: 130px;
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
  }
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.62);
    z-index: 100;
  }
  :global {
    .ant-empty-image {
      margin-bottom: 5px;
    }
    .ant-empty-footer {
      margin-top: 10px;
    }
  }
  .reload {
    font-size: 12px;

    & > :global.anticon + span {
      margin-left: 4px;
    }
  }
}
</style>
