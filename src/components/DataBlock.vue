<template>
  <component :is="tag" :class="s.container">
    <template v-if="!lazyRender || shouldRender">
      <slot v-if="showErr && err" name="err" :err="err">
        <a-empty :class="s.center" :image="errImg">
          <span slot="description" style="color:#999">加载失败</span>
          <a-button :class="s.reload" type="primary" size="small" icon="reload" @click="onReloadClick">重试</a-button>
        </a-empty>
      </slot>
      <slot v-else-if="showEmpty && empty" name="empty" :data="data">
        <a-empty :class="s.center" />
      </slot>
      <slot v-else-if="data" :data="data" :err="err" :loading="loading"></slot>
      <slot v-if="showLoading && loading" name="loading" :loading="loading">
        <a-spin :class="s.center" />
      </slot>
    </template>
  </component>
</template>

<script>
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
    }
  },
  data() {
    return {
      ...lazy.data(),
      loading: false,
      resData: null,
      err: null
    }
  },
  computed: {
    ...lazy.computed,
    data() {
      return this.handler(this.resData, this.req)
    },
    empty() {
      return this.isEmpty(this.data, this.resData, this.err, this.req)
    }
  },
  watch: {
    req: {
      handler() {
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
    this.errImg = Empty.PRESENTED_IMAGE_SIMPLE
    this.fetchData = createFetchAction({
      key: 'resData',
      loadingKey: 'loading',
      getReqConfig() {
        return this.req
      },
      getReqOptions() {
        return { silent: true }
      },
      setData(data, err) {
        this.resData = data
        this.err = err
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

<style lang="less" module="s">
.container {
  position: relative;
  min-height: 130px;
}
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}
.reload {
  font-size: 12px;

  & > :global.anticon + span {
    margin-left: 4px;
  }
}
</style>
