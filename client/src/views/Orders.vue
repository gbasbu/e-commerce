<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    computed:{
        ...mapGetters(['orders'])
    },
    methods: {
        ...mapActions(['fetchOrders'])
    },
    created() {
        this.fetchOrders()
    },
}
</script>

<template>
    <div>
        <div class="header">
            <h1>Orders</h1>
        </div>
        <div class="container">
            <div v-for="order in orders" :key="order.id">
                <div class="order">
                    <div class="order-info">
                        <time>{{ new Date(order.date).toDateString() }}</time>
                        <p>Total: <span>{{ order.total }} TL</span></p>
                    </div>
                    <hr>
                    <div class="status">
                        <p class="waiting" v-if="order.inCargo == false && order.isComplete == false">Order is waiting</p>
                        <p class="cargo" v-if="order.inCargo == true && order.isComplete == false"><i class="fas fa-truck"></i> Order in cargo</p>
                        <p v-if="order.isComplete == true && order.inCargo == false"><i class="fas fa-check"></i> Order was delivered</p>
                    </div>
                    <div class="products-images">
                        <figure v-for="(item, i) in order.products" :key="i">
                            <img :src="require(`../../../server/public/images/${item.productImg}`)" width="50" height="70" alt="Product Image">
                        </figure>
                    </div>
                    <div class="product-count">
                        <hr>
                        <p v-if="order.products.length == 1 && order.isComplete == true">{{ order.products.length }} product was delivered</p>
                        <p v-if="order.products.length > 1 && order.isComplete == true">{{ order.products.length }} products was delivered</p>
                        <p v-if="order.products.length == 1 && order.inCargo == true">{{ order.products.length }} product in cargo</p>
                        <p v-if="order.products.length > 1 && order.inCargo == true">{{ order.products.length }} products in cargo</p>
                        <p v-if="order.products.length == 1 && order.inCargo == false && order.isComplete == false">{{ order.products.length }} product is waiting</p>
                        <p v-if="order.products.length > 1 && order.inCargo == false && order.isComplete == false">{{ order.products.length }} products are waiting</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .header{
        text-align: center;
        margin-top: 20px;
        margin-bottom: 70px;
    }
    .container{
        @media (min-width:768px) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 50px;
        }
    }
    .order{
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        border-radius: 10px;
        padding: 10px 20px;
        margin-bottom: 40px;
        .order-info{
            display: flex;
            justify-content: space-between;
            align-items: center;
            time{
                opacity: .6;
            }
            p{
                span{
                    color: orangered;
                }
            }
        }
        hr{
            margin: 15px 0;
            opacity: .5;
        }
        .products-images{
            figure{
                display: inline;
                margin-right: 15px;
            }
        }
        .status{
            color: green;
            margin: 20px 0;
            i{
                margin-right: 10px;
            }
            .waiting{
                color: red;
            }
            .cargo{
                color: orangered;
            }
        }
        .product-count{
            hr{
                margin-top: 20px;
            }
            p{
                opacity: .7;
            }
        }
    }
</style>