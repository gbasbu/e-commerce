<script>
import { mapActions } from 'vuex'
export default {
    name: 'UsersCard',
    props: ['user'],
    data() {
        return {
            isClick: false,
            date: new Date(this.user.date).toDateString(),
            logo: this.user.firstName.slice(0,1) + this.user.lastName.slice(0,1)
        }
    },
    methods: {
        ...mapActions(['banUser', 'unbanUser', 'deleteUser']),
        banned(id){
            this.banUser(id)
        },
        unBanned(id){
            this.unbanUser(id)
        },
        removeUser(id){
            this.deleteUser(id)
        }
    },
}
</script>

<template>
    <div>
        <div class="top" v-if="user.isAdmin !== true">
            <div class="buttons">
                <button class="show" v-if="isClick == false" @click="isClick = true">+</button>
                <button class="hidden" v-if="isClick == true" @click="isClick = false">-</button>
            </div>
            <div class="logo">
                <h3>{{ this.logo }}</h3>
            </div>
            <div class="email">
                <h3>{{ user.email }}</h3>
            </div>
            <div class="name">
                <h3>{{ user.firstName }} {{ user.lastName }} </h3>
            </div>
            <div class="date">
                <h3>{{ this.date }}</h3>
            </div>
            <div class="stattus">
                <span class="status active" v-if="user.isVerified == true">Active</span>
                <span class="status deactive" v-if="user.isVerified == false">Deactive</span>
            </div>
            <div class="action">
                <div>
                    <button class="ban" @click="banned(user._id)">Deactive</button>
                </div>
                <div>
                    <button class="unban" @click="unBanned(user._id)">Active</button>
                </div>
                <div>
                    <button class="delete" @click="removeUser(user._id)">Delete</button>
                </div>
                
            </div>
        </div>
        <div class="bottom" v-if="isClick == true && user.isAdmin !== true">
            <ul>
                <li class="bottom-name"><span>Name:</span> {{ user.firstName }} {{ user.lastName }}</li>
                <li class="bottom-date"><span>Register Date:</span> {{ this.date }}</li>
                <li class="bottom-status">
                    <span>Status: </span>
                    <span class="status active" v-if="user.isVerified == true">Active</span>
                    <span class="status deactive" v-if="user.isVerified == false">Deactive</span>
                </li>
                <li class="bottom-action">
                    <span>Action:</span>
                    <button class="ban" @click="banned(user._id)">Deactive</button>
                    <button class="unban" @click="unBanned(user._id)">Active</button>
                    <button class="delete" @click="removeUser(user._id)">Delete</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .top{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        button{
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
        h3{
            font-weight: normal;
            margin-right: 36px;
        }
        .logo{
            text-transform: uppercase;
            background-color: #ccc;
            width: 50px;
            padding: 10px;
            border-radius: 100% ;
        }
        .name, .date, .status, .action{
            display: none;
            text-transform: capitalize;
        }
        .buttons{
            display: flex;
            justify-content: flex-start;
        }
        
    }
    .bottom{
        padding: 20px 30px;
        span{
            font-weight: bold;
        }
        li{
            padding: 5px 0;
            text-transform: capitalize;
            button{
            background-color: indianred;
            padding: 2px 6px;
            border-radius: 5px;
            color: white;
        }
        }
        .ban{
            margin-left: 5px;  
        }
        .unban{
            margin-left: 10px ;
            background-color: seagreen;
        }
        .delete{
            margin-left: 10px;
        }
    }
    .status{
        font-weight: normal;
        color: white;
        border-radius: 5px;
        padding: 2px 6px;
    }
    .active{
        background-color: seagreen;
    }
    .deactive{
        background-color: indianred;
    }
    @media (min-width:576px) {
      .top{
        grid-template-columns: 1fr 1fr 2fr 2fr;
        .name{
            display: flex;
            justify-content: center;
        }
      }
      .bottom{
          .bottom-name{
              display: none;
          }
      }
    }
    @media (min-width:768px) {
      .top{
        grid-template-columns: 1fr 1fr 2fr 2fr 2fr;
        .date{
            display: flex;
        }
      }
      .bottom{
          .bottom-date{
              display: none;
          }
      }
    }
    @media (min-width:992px) {
      .top{
        grid-template-columns: 1fr 1fr 2fr 2fr 2fr 1fr;
        .status{
            display: flex;
            width: 70px;
            justify-content: center;
        }
      }
      .bottom{
          .bottom-status{
              display: none;
          }
      }
    }
    @media (min-width:1200px) {
      .top{
        grid-template-columns: 1fr 2fr 2fr 2fr 2fr 1fr;
        .action{
            display: flex;
            justify-content: center;
            button{
                font-size: .9rem;
                font-weight: bold;
                color: white;
                border-radius: 5px;
                padding: 5px;
            }
            .ban{
                background-color: indianred;
            }
            .unban{
                background-color: seagreen;
                margin-left: 20px;
            }
            .delete{
                background-color: indianred;
                margin-left: 20px;
            }
        }
        .buttons{
            display: none;
        }
        .email, .name, .date, .status{
            margin: 0 auto;
        }
      }
      .bottom{
        display: none;
      }
    }
</style>