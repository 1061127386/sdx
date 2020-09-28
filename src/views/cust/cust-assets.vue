<template>
    <div class="assets">
            <div class="head">
                <div class="top">
                    <div>
                        <p>今年</p>
                        <h3>￥ {{data.year}}</h3>
                    </div>
                    <div>
                        <p>总收入</p>
                        <h3>￥ {{data.total}}</h3>
                    </div>
                </div>
                <img src="../../assets/images/cust/底框.png" alt="">
                <div class="bi">
                    同比 <span>{{data.contrast}}</span>
                </div>
            </div>

            <div class="line">
                <span></span>
                    <p></p>
                <span></span>
            </div>

            <div class="main">
                <div class="title">
                    <i class="el-icon-s-data"></i>
                    收入统计
                </div>
                <ul>
                    <li v-for="(val,idx) in data.list" :key="idx">
                        <span>{{val.year}}年</span>
                        <span>{{val.income}}</span>
                    </li>
                </ul>
            </div>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default(){
                return {
                year:"2020万",
                list:[{yaer:"2020年",income:"2020万"}]
            }
            }
        }
    }
}
</script>
 
<style lang = "less" scoped>
.assets{
    box-sizing: border-box;
    
}

.head{
    background-color: #fff;
    height: 20%;
    padding: 5% 0;
    position: relative;

    .top{
        display: flex;

        div:not(:last-child){
            border-right: 2px solid #eee;
        }
        div{
            flex: 1;
            padding-left:7% ;
            p{
                font-size: 1.6rem;
                color: #aaa;
            }
            h3{
                color: #ffcc33;
                font-size: 2rem;
            }
        }
    }
    img{
        width: 9rem;
        transform: translateX(20%);
    }
    .bi{
        position: absolute;
        left: 9%;
        bottom: 20%;

        span{
            color: #003399;
            font-weight: bold;
        }
    }
} 

.line{
    display: flex;
    justify-content: space-between;
    align-items:center;
    height: 3rem;
    background-color: #fff;
    p{
        border-bottom: 1px dotted #ccc;
        width: 80%;
    }
    span{
        background-color: #efefef;
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
    }
    span:nth-child(1){
        transform: translateX(-50%);
    }
    span:nth-of-type(2){
        transform: translateX(50%);
    }
}

.main{
    margin-bottom: 1rem;
    background-color: #fff;
    padding: 0 4%;

    .title{
        line-height: 5rem;
        font-size: 2rem;
        color: #999;
    }
    ul{
        li{
            border-top: #ccc 1px dotted;
            line-height: 3.5rem;
            display:flex;
            justify-content: space-between;
            padding: 0 4%;
            span:nth-child(1){
                color: #aaa;
            }
            span:nth-child(2){
                color: #ffcc33;
            }
        }
    }
}
</style>