<template>
    <div class="incomes">
        <ul>
            <li v-for="(val,idx) in data" :key="idx">
                <span>{{val.month}}月</span>
                <p :style="val.income.replace('万','')>1000?'color:red;':'color:#ffcc33;'">{{val.income}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Array,
            value:[]
        }
    },
    data () {
        return {

        }
    },
    created(){
        let str="100万"
        console.log(str.replace("万",""))
    }
}
</script>
 
<style lang = "less" scoped>
.incomes{
    background-color: #efefef !important;

    ul{

        li{
            border-radius: .5rem;
            line-height: 6rem;
            background-color: #fff;
            margin-bottom: 1rem;
            box-sizing: border-box;
            padding: 0 5%;
            display: flex;
            justify-content:space-between;
            font-size: 1.6rem;

            span{
                color: #666;
            }
        }
    }
} 
</style>