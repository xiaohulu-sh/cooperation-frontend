<template>
  <div class="custom-range">
    <label>
      {{ label1 }}
      <input ref="min" type="text" v-model="minValue" :placeholder="placeholder1" />
    </label>
    <label>
      {{ label2 }}
      <input ref="max" type="text" v-model="maxValue" :placeholder="placeholder2" />
    </label>
    <button @click="onConfirm">确定</button>
  </div>
</template>

<script>
export default {
  props: {
    label1: {
      type: String,
      default: '自定义:'
    },
    label2: {
      type: String,
      default: '-'
    },
    placeholder1: {
      type: String,
      default: '最小值'
    },
    placeholder2: {
      type: String,
      default: '最大值'
    },
    value: {
      type: Array,
      default() {
        return ['', '']
      }
    },
    min: {
      type: Number,
      default: 0
    },
    errorHandler: {
      type: Function,
      default(msg) {
        return this.$message.error(msg)
      }
    }
  },
  data() {
    return {
      minValue: '',
      maxValue: ''
    }
  },
  watch: {
    value: {
      handler() {
        this.minValue = this.value[0]
        this.maxValue = this.value[1]
      },
      immediate: true
    }
  },
  methods: {
    onConfirm() {
      let minValue = this.minValue
      if (minValue == null) {
        minValue = ''
      }
      if (minValue !== '') {
        minValue = Number(this.minValue)
        if (isNaN(minValue)) {
          this.$refs.min.focus()
          return this.errorHandler('请输入正确的数值')
        }
        if (minValue < this.min) {
          return this.errorHandler(`最小值不能小于${this.min}`)
        }
      }
      let maxValue = this.maxValue
      if (maxValue == null) {
        maxValue = ''
      }
      if (maxValue !== '') {
        maxValue = Number(this.maxValue)
        if (isNaN(maxValue)) {
          this.$refs.max.focus()
          return this.errorHandler('请输入正确的数值')
        }
        if (maxValue < this.min) {
          return this.errorHandler(`最大值不能小于${this.min}`)
        }
      }
      if (minValue !== '' && maxValue !== '' && maxValue < minValue) {
        return this.errorHandler('请输入正确的范围，最大值不能小于最小值')
      }
      this.minValue = minValue
      this.maxValue = maxValue
      this.$emit('input', [minValue, maxValue])
    }
  }
}
</script>

<style lang="less" scoped>
.custom-range {
  margin-left: 20px;
  display: inline-block;

  input {
    width: 80px;
    height: 24px;
    margin: 0 5px;
    padding: 0 6px;
    border: 1px solid #e3e4eb;
    border-radius: 2px;
    outline: none;
    transition: all 0.3s;

    &::placeholder {
      color: #aaa;
      font-size: 13px;
    }

    &:hover,
    &:focus {
      border-color: #a399ff;
    }
  }

  button {
    height: 24px;
    border: 1px solid #e9ebf1;
    border-radius: 2px;
    background: #fff;
    color: #736af2;
    transition: all 0.3s;

    &:hover,
    &:focus {
      border-color: #a399ff;
    }
  }
}
</style>
