<script>
import { mapActions } from 'vuex'

export default {
    name: 'CommentCard',
    props: ['comment'],
    data() {
        return {
            date: new Date(this.comment.date).toDateString(),
        }
    },
    methods: {
        ...mapActions(['likeComment', 'dislikeComment']),
        like(id) {
            this.likeComment(id)
        },
        dislike(id) {
            this.dislikeComment(id)
        }
    },
}
</script>

<template>
    <div>
        <div class="infos">
            <p>Puan</p>
            <p>{{ this.date }}</p>
            <p>{{ comment.userFirstName }} {{ comment.userLastName }}</p>
        </div>
        <div class="description">
            {{ comment.description }}
        </div>
        <div class="icons">
            <p>Did you find it helpful?</p>
            <button @click="like(comment._id)"><i class="fas fa-thumbs-up like"></i></button> {{ comment.like.length }}
            <button @click="dislike(comment._id)"><i class="fas fa-thumbs-down dislike"></i></button> {{ comment.dislike.length }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
    div{
        .infos{
            display: flex;
            justify-content: space-between;
            padding: 10px;
            p{
                text-transform: capitalize;
            }
        }
        .description{
            margin-top: 15px;
            text-align: left;
            background-color: #ccc;
            padding: 10px 20px;
            border-radius: 10px;
        }
        .icons{
            display: flex;
            justify-content:space-around;
            align-items: center;
            margin-top: 15px;
            i{
                font-size: 1.5rem;
                color: #cccccc;
            }
            .like:hover{
                color: #44ab51;
            }
            .dislike:hover{
                color: #de4453;
            }
        }
    }
</style>