<template>
  <div class="cart">
    <van-checkbox-group v-model="result">
      <van-checkbox
        class="chx"
        :name="item.product_id"
        v-for="item in cartList"
        :key="item.id"
        @click="goodClick(item)"
      >
        <van-card
          :num="item.number"
          :price="item.retail_price.toFixed(2)"
          :title="item.goods_name"
          :thumb="item.list_pic_url"
        >
        </van-card>
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar
      :price="cartTotal.checkedGoodsAmount * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
      <template #tip>
        累计共<span>{{ cartTotal.checkedGoodsCount }}</span
        >件商品,可点击<van-button type="primary" size="small">编辑</van-button
        >按钮进行商品数量修改
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
//加载购物车列表数据 
import { GetCartData, GoodChecked } from '@/request/api.js'
export default {
  data() {
    return {
      result: [],


      cartList: [],
      cartTotal: {}
    }
  },
  methods: {
    //商品卡片选中和未选中状态事件
    goodClick(item) {
      GoodChecked({
        isChecked: item.checked == 1 ? 0 : 1,
        productIds: item.product_id.toString()
      }).then(res => {
        if (res.data.errno == 0) {
          this.cartList = res.data.data.cartList
          //保存商品数据总量
          this.cartTotal = res.data.data.cartTotal
          this.result = []
          this.cartList.map(val => {
            if (val.checked == 1) {
              this.result.push(val.product_id)
            }
          })
        }
      }).then(err => {
        console.log(err);
      })
    },
    onSubmit() {
      console.log(1);
    },
    onClickEditAddress() {
      console.log(修改地址);
    }
  },
  computed: {
    //检测全选和单选
    checkedAll: function () {
      return this.result.length == this.cartList.length ? true : false;
      //return this.cartTotal.checkedGoodsCount == this.cartTotal.length ? true : false
    }
  },
  created() {
    GetCartData().then(res => {
      if (res.data.errno == 0) {
        //保存cartList里面的数据啊 
        this.cartList = res.data.data.cartList
        //保存商品数据总量
        this.cartTotal = res.data.data.cartTotal
        this.cartList.map(val => {
          if (val.checked == 1) {
            this.result.push(val.product_id)
          }
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
</script>

<style lang="less" scoped>
.van-submit-bar {
  bottom: 0.5rem;
}
.chx {
  padding: 0.1rem 4%;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  /deep/.van-checkbox_lablel {
    flex: 1;
  }
}
</style>