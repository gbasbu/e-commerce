<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            addressId: '',
            isConfirmCard: false,
        }
    },
    computed:{
        ...mapGetters(['addresses', 'basket'])
    },
    methods: {
        ...mapActions(['fetchAddresses', 'fetchBasket', 'confirmBasket']),
        selectedAddress(id){
            this.addressId = id
        },
        completeOrder(addressId){
            this.confirmBasket(addressId).then(() => {
                this.$router.push('/')
            })
        }
    },
    created() {
        this.fetchAddresses(),
        this.fetchBasket()
    },
}
</script>

<template>
    <main>
        <div class="address" :class="[addressId != '' ? 'none' : '']">
            <h3 class="title">Address Check</h3>
            <div v-if="addresses.length == 0">
                <p>No registered addresses! <br>Please first create a new address.</p>
                <router-link class="link" to="/address-add">Create Address</router-link>
            </div>
            <div class="address-card" v-for="address in addresses" :key="address.id">
                <div class="address-info">
                    <button @click="selectedAddress(address._id)">
                        <h3>{{ address.title }}</h3>
                        <h5>{{ address.county }} {{ address.province }}</h5>
                    </button>
                </div>
                <div class="address-select" :class="[address._id == addressId ? 'selected' : '']"></div>
            </div>
        </div>
        <div class="payment" :class="[addressId ? 'block' : 'none']" v-if="isConfirmCard == false">
            <h3 class="title">Payment Check</h3>
            <div class="form">
                <div class="labels">
                    <label for="number">Card Number</label>
                    <label for="name">Card Name</label>
                    <label for="number">Expiration date</label>
                    <label for="cvv">CVV</label>
                </div>
                <div class="inputs">
                    <input type="text" maxlength="16" name="number">
                    <input type="text" name="name">
                    <input class="date mr-10 pl-5" type="text" maxlength="2" name="number" placeholder="Month">
                    <input class="date ml-10 pl-10" type="text" maxlength="2" name="number" placeholder="Year">
                    <input class="cvv" type="text" maxlength="3" name="cvv">
                </div>
            </div>
            <button class="confirm-button" @click="isConfirmCard = true">Confirm Card</button>
        </div>
        <div class="order-detail" :class="[isConfirmCard == true ? 'block' : 'none']">
            <h3 class="title"> Order Detail</h3>
            <div class="product-card" v-for="item in basket" :key="item.id">
                <figure>
                    <img v-if="basket !== undefined" :src="require(`../../../server/public/images/${item.productImg}`)" width="50" height="70">
                </figure>
                <div>
                    <h4>{{ item.productBrandName }}</h4>
                    <h5>{{ item.productTitle }}</h5>
                </div>
                <div>
                    <span v-if="item.stock == 1">{{ item.stock }} Piece</span>
                    <span v-if="item.stock > 1">{{ item.stock }} Pieces</span>
                </div>
                <div>
                    <span>{{ item.stock * item.productPrice }} TL</span>
                </div>
            </div>
        </div>
        <div class="confirm" v-if="isConfirmCard == true">
            <button class="confirm-button" @click="completeOrder(addressId)">Complete Order</button>
        </div>
    </main>
</template>

<style lang="scss" scoped>
main{
    height: 100vh;
    position: relative;
    text-align: center;
    .address{
        height: 100vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-top: 70px;
        .title{
            margin-bottom: 30px;
        }
        p{
            margin-bottom: 50px;
        }
        .address-card{
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            width: 200px;
            height: 100px;
            margin: 0 auto;
            margin-top: 20px;
            padding: 10px 20px;
            .address-info{
                padding: 15px;
            }
            .address-select{
                width: 20px;
                height: 20px;
                margin: 0 auto;
                border-radius: 100%;
                border: 1px solid black;
            }
            .selected{
                background-color: seagreen;
            }
        }
    }
    .payment{
        position: absolute;
        width: 400px;
        top: 50%;
        left: 50%;
        transform: translate(-53%, -60%);
        margin-right: 30px;
        .form{
            display: grid;
            grid-template-columns: 1fr 1fr;
            margin-top: 30px;
            margin-right: 20px;
            label{
                display: block;
            }
            label, input{
                margin-bottom: 20px;
            }
            input{
                border: none;
                border-bottom: 2px solid black;
                padding-left: 13px;
            }
            .date, .cvv{
                width: 50px;
            }
            .mr-10{
                margin-right: 10px;
            }
            .ml-10{
                margin-left: 10px;
            }
            .pl-5{
                padding-left: 5px;
            }
            .pl-10{
                padding-left: 10px;
            }
            .cvv{
                display: block;
                margin: 0 auto;
            }
        }
        button{
            margin-top: 40px;
        }
    }
    .order-detail{
        display: none;
        margin-top: 70px;
        .product-card{
            display: grid;
            grid-template-columns: 1fr 2fr 1fr 1fr;
            align-items: center;
            text-transform: capitalize;
            margin-top: 30px;
            h4{
                margin-top: -5px;
                margin-bottom: 10px;
                opacity: .7;
            }
            h5{
                font-size: 1rem;
            }
        }
    }
    .confirm{
        margin-top: 50px;
    }
    .confirm-button{
        width: 200px;
        padding: 10px 20px;
        border-radius: 20px;
        background-color: seagreen;
        color: white;
        font-weight: bold;
    }
    .none{
        display: none;
    }
    .block{
        display: block;
    }
}

</style>