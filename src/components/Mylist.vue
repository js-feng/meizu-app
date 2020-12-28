<template>
  <div class="mylist">
    <van-list :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="item in arr"
        :key="item"
        :title="item"
        @click="cellClick(item)"
      />
    </van-list>
  </div>
</template>

<script>
export default {
  props: ['arr'],
  data() {
    return {
      list: [],

      finished: false
    }
  },
  methods: {
    onLoad() {
      return '寂寞'
    },
    cellClick(item) {

      //子传父，传给mypopup执行一次搜索请求
      this.$emit('cellClick', item)
    }
  }
}
</script>

<style>
</style>