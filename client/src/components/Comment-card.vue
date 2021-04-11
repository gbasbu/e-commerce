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
        <div class="comment-infos">
            <p>{{ comment.userFirstName }} {{ comment.userLastName }}</p>
            <time>{{ this.date }}</time>
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
        .comment-infos{
            width:100% ;
            padding: 0 10px;
            display: grid;
            grid-template-columns: 2fr 2fr;
            @media (min-width:768px) {
                width: 600px;
            }
            p{
                text-transform: capitalize;
            }
        }
        .description{
            margin-top: 10px;
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
            text-transform: none;
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