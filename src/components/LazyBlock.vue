<template>
  <div>
    <slot v-if="shouldRender"></slot>
  </div>
</template>

<script>
import lazy from '@/components/common/lazy'
const { data, computed, watch, mounted } = lazy

export default {
  props: ['data'],
  data,
  computed,
  watch,
  mounted
}
</script>
