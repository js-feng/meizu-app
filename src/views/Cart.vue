<template>
  <div class="cart">
    <van-checkbox-group :disabled="isClicked" v-model="result">
      <van-checkbox
        class="chx"
        :name="item.product_id"
        v-for="item in cartList"
        :key="item.id"
        @click="goodClick(item)"
      >
        <van-swipe-cell>
          <van-card
            :num="item.number"
            :price="item.retail_price.toFixed(2)"
            :title="item.goods_name"
            :thumb="item.list_pic_url"
          >
            <!--删除按钮-->
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
              >
              </van-button>
            </template>
          </van-card>
        </van-swipe-cell>
        <van-stepper
          v-model="item.number"
          v-show="isClicked"
          @change="stepChange(item)"
        />
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar
      :price="cartTotal.checkedGoodsAmount * 100"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll" :disabled="isClicked"
        >全选</van-checkbox
      >
      <template #tip>
        累计共<span>{{ cartTotal.checkedGoodsCount }}</span
        >件商品,可点击<van-button
          :type="isClicked ? 'danger' : 'primary'"
          size="mini"
          @click="isClicked = !isClicked"
          >{{ isClicked ? '完成编辑' : '编辑' }}</van-button
        >按钮进行商品数量修改
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
//加载购物车列表数据 
import { GetCartData, GoodChecked, StepNum, DelGood } from '@/request/api.js'

export default {
  data() {
    return {
      result: [],
      cartList: [],
      cartTotal: {},
      isClicked: false
    }
  },
  methods: {
    //商品卡片选中和未选中状态事件
    goodClick(item) {

      if (this.isClicked) {
        return
      } else {
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
        }).catch(err => {
          console.log(err);
        })
      }

    },
    stepChange(item) {
      StepNum({
        goodsId: item.goods_id,
        id: item.id,
        number: item.number,
        productId: item.product_id
      }).then(res => {
        if (res.data.errno == 0) {
          console.log(res);
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
    checkedAll: {


      get() {
        return this.result.length == this.cartList.length ? true : false;
      },
      set(val) {
        //将一个数组转字符串用join()
        //拿到cartList中的每一项的product_id
        if (this.isClicked) {
          return
        } else {
          let arr = []
          this.cartList.map(val => {
            arr.push(val.product_id)
          })
          GoodChecked({
            isChecked: val ? 1 : 0,
            productIds: arr.join()
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
          })
        }

      }

      // npm install --save vue/types/umd
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
  .van-stepper {
    text-align: right;
  }
}
.delete-button {
  height: 100%;
}
</style>