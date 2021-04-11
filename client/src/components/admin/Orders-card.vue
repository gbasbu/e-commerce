<script>
import { mapActions } from 'vuex'
export default {
    name: 'OrdersCard',
    props: ['order'],
    data() {
        return {
            isClick : false
        }
    },
    methods: {
        ...mapActions(['inCargo', 'complete']),
        setCargo(id){
            this.inCargo(id)
        },
        setDelivered(id){
            this.complete(id)
        }
    },
}
</script>

<template>
    <div>
        <div class="top">
            <div class="buttons">
                <button class="show" v-if="isClick == false" @click="isClick = true">+</button>
                <button class="hidden" v-if="isClick == true" @click="isClick = false">-</button>
            </div>
            <div class="user">
                <p>{{ order.userName }}</p>
            </div>
            <div class="date">
                <time>{{ new Date(order.date).toDateString() }}</time>
            </div>
            <div class="piece">
                <p>{{ order.products.length }}</p>
            </div>
            <div class="total">
                <p>{{ order.total }} TL</p>
            </div>
            <div class="status">
                <p class="waiting" v-if="order.isComplete == false && order.inCargo == false">Order waiting</p>
                <p v-if="order.isComplete == true"><i class="fas fa-check"></i></p>
                <p class="cargo" v-if="order.inCargo == true"><i class="fas fa-truck"></i></p>
            </div>
            <div class="action">
                <div>
                    <button class="action-item-1" @click="setCargo(order._id)">In Cargo</button>
                    
                </div>
                <div>
                    <button class="action-item-2" @click="setDelivered(order._id)">Delivered</button>
                </div>
            </div>
        </div>
        <div class="bottom" v-if="isClick == true">
            <ul>
                <li class="bottom-date"><span>Date: </span><time>{{ new Date(order.date).toDateString() }}</time></li>
                <li class="bottom-piece"><span>Piece: </span>{{ order.products.length }}</li>
                <li class="bottom-total"><span>Total: </span>{{ order.total }} TL</li>
                <li class="bottom-action">
                    <span>Action: </span>
                    <button class="action-item-1" @click="setCargo(order._id)">In Cargo</button>
                    <button class="action-item-2" @click="setDelivered(order._id)">Delivered</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .top{
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        align-items: center;
        .show, .hidden{
            font-size: 1.5rem;
            padding: 2px 6px;
            margin-top: -5px;
            border-radius: 100%;
        }
        .show{
            background-color: seagreen;
            color: white;
        }
        .hidden{
            padding: 2px 8px;
            background-color: indianred;
            color: white;
        }
        .date, .piece, .total, .action{
            display: none;
        }
        .status{
            text-align: center;
            color: green;
        }
        .waiting{
            color: red;
        }
        .cargo{
            color: orangered;
        }
        
    }
    .bottom{
        padding: 20px 30px;
        li{
            margin: 5px 0;
            span{
                font-weight: bold;
            }
        }
    }
    .action-item-1, .action-item-2{
        background-color: seagreen;
        font-weight: bold;
        padding: 4px 6px;
        border-radius: 5px;
        color: white;
        margin-right: 15px;
    }
    @media (min-width:576px) {
        .top{
            grid-template-columns: .5fr 2fr 2fr 1fr;
            .date{
                display: flex;
                justify-content: center;
            }
            .user{
                display: flex;
                justify-content: center;
            }
            .status{
                display: flex;
                margin: 0 auto;
            }
        }
        .bottom{
            .bottom-date{
                display: none;
            }
        }
    }
    @media (min-width:768px) {
        .top{
            grid-template-columns: .5fr 1fr 1fr .5fr 1fr;
            .piece{
                display: flex;
                justify-content: center;
            }
        }
        .bottom{
            .bottom-piece{
                display: none;
            }
        }
    }
    @media (min-width:992px) {
        .top{
            grid-template-columns: .5fr 1fr 1fr .5fr 1fr 1fr;
            .total{
                display: flex;
                justify-content: center;
            }
        }
        .bottom{
            .bottom-total{
                display: none;
            }
        }
    }
    @media (min-width:1200px) {
        .top{
            grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1.5fr;
            .action{
                display: flex;
                justify-content: flex-end;
                button{
                    margin: 0;
                }
                .action-item-2{
                    margin-left: 20px;
                }
            }
            .buttons{
                display: none;
            }
            .user, .date, .piece, .total, .status{
                justify-content: flex-start;
            }
        }
        .bottom{
            display: none;
        }
    }
</style>