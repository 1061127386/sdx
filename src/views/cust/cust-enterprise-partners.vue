<template>
    <div class="enterprise">
        <ul>
            <li v-for="(val,idx) in data" :key="idx">
                <img src="../../assets/images/cust/旗下企业-头像.png" alt="">
                <div class="context">
                    <h3>{{two?"企业名称：":""}}{{two?val.company:val.creator}}</h3>
                    <span>{{two?"注册时间：":""}}{{two?val.createTime:val.company}}</span>
                    <span>{{two?"法人：":"成立时间"}} {{two?val.creator:val.createTime}}</span>
                </div>
                <van-icon name="arrow" />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        two:{
            type:Boolean,
            default:true
        },
        data:{
            type:Array,
            value:[]
        }
    },
    data () {
        return {
 
        }
    }
}
</script>
 
<style lang = "less" scoped>
.enterprise{
    box-sizing: border-box;
    padding: 4% 0;
    width: 100%;
}
ul{
    padding: 0 4%;
    li{
        display:flex;
        padding: 4% 0;
        border-bottom: 1px dotted pink;
        position: relative;
        box-sizing: border-box;

        img{
            width: 6rem;
            margin-right: 1rem;
        }
        .context{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;

            
            h3{
                font-size: 1.4rem;
                color: #666;
                white-space: nowrap;
                overflow-x: hidden;
                text-overflow:ellipsis;
                width: 85%;
            }
            span{
                color: #aaa;
            }
        }

        .van-icon{
            position: absolute;
            right: 0;
            top:50%;
            transform: translateY(-50%);
            font-size: 2rem;
            color: #aaa;
        }
    }
}
</style>