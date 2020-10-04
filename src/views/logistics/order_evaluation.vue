<template>
  <div class="edit">
    <van-nav-bar title="快递单评价">
      <template #left>
        <van-icon name="arrow-left" size="26" @click="$router.go(-1)" />
      </template>
      <template #right v-if="starData.star == 1">
        <van-icon name="wap-home-o" size="26" @click="$router.push('/home')" />
      </template>
      <template #right v-else>
        <div @click="send">提交</div>
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="form">
      <div class="total">
        <span>总体评分</span>
        <p>
          <b>{{
            starData.star == 1 ? starData.totalScore * 2 : totalScore * 2
          }}</b
          >分
        </p>
        <van-field name="totalScore" :rules="[{ required: false }]">
          <template #input>
            <van-rate
              v-if="starData.star == 1"
              v-model="starData.totalScore"
              :disabled="true"
              :icon="xiaolian"
              :void-icon="shangxin"
            />
            <van-rate
              v-else
              v-model="totalScore"
              :disabled="true"
              :icon="xiaolian"
              :void-icon="shangxin"
            />
          </template>
        </van-field>
      </div>

      <div class="ping">
        <p>店铺评分</p>
        <div>
          <span>店铺评分</span>
          <van-field name="rate1" :rules="[{ required: false }]">
            <template #input>
              <van-rate
                v-model="starData.shop"
                :readonly="starData.star == 1"
                :size="30"
                color="#ffcf60"
                void-icon="star"
                void-color="#eee"
              />
            </template>
          </van-field>
        </div>
        <div>
          <span>物流速度</span>
          <van-field name="rate2" :rules="[{ required: false }]">
            <template #input>
              <van-rate
                v-model="starData.logistics"
                :readonly="starData.star == 1"
                :size="30"
                color="#ff8d5b"
                void-icon="star"
                void-color="#eee"
              />
            </template>
          </van-field>
        </div>
        <div>
          <span>快递评分</span>
          <van-field name="rate3" :rules="[{ required: false }]">
            <template #input>
              <van-rate
                v-model="starData.express"
                :readonly="starData.star == 1"
                :size="30"
                color="#ff5d5e"
                void-icon="star"
                void-color="#eee"
              />
            </template>
          </van-field>
        </div>
      </div>

      <van-field
        v-model="starData.info"
        :readonly="starData.star == 1"
        rows="3"
        name="txt"
        type="textarea"
        maxlength="60"
        placeholder="写几句评价"
        show-word-limit
        :rules="[{ required: false }]"
      />

      <van-field
        name="uploader"
        class="uploader"
        :rules="[{ required: false }]"
      >
        <template #input>
          <van-uploader
            v-model="fileList"
            :after-read="afterRead"
            multiple
            :max-count="5"
          >
            <template #default>
              <div class="load">
                <img src="../../assets/images/all/xiangji.png" alt="" />
                <span>{{ fileList.length }} / 5</span>
              </div>
            </template>

            <template #preview-cover>
              <!-- <img src="../../assets/images/all/delete.png" alt="" @click.stop="del"/> -->
            </template>
          </van-uploader>
        </template>
      </van-field>
    </van-form>

    <div class="swipe" v-if="starData.star == 1">
      <div class="imgs">
        <img
          :src="img"
          alt=""
          v-for="(img, idx) in imgs"
          :key="idx"
          @click="showImg(idx)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { GetStarInfo, PutStarInfo } from "@/axios/api";
// 图片预览组件
import { ImagePreview } from "vant";

export default {
  computed: {
    totalScore() {
      let totalScore = Math.round(
        (this.starData.shop + this.starData.logistics + this.starData.express) /
          3
      );
      return totalScore;
    },
  },
  data() {
    return {
      shangxin: require("../../assets/images/all/shangxin.png"),
      xiaolian: require("../../assets/images/all/xiaolian.png"),
      starData: {},
      imgs: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601815499051&di=54593477194c6224d3f515db6bbc5bf6&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-26493e56519defb5fc93bcbab059c4c8_1440w.jpg%3Fsource%3D172ae18b",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3036056859,4284773898&fm=26&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3586332460,1301023714&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3431585440,2347437953&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2234059888,3529836727&fm=26&gp=0.jpg",
      ],
      fileList: [
        {
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601815499051&di=54593477194c6224d3f515db6bbc5bf6&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-26493e56519defb5fc93bcbab059c4c8_1440w.jpg%3Fsource%3D172ae18b",
          isImage: true,
        },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        {
          url:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3036056859,4284773898&fm=26&gp=0.jpg",
          isImage: true,
        },
        // {
        //   url:
        //     "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3586332460,1301023714&fm=26&gp=0.jpg",
        //   isImage: true,
        // },
        // {
        //   url:
        //     "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3431585440,2347437953&fm=26&gp=0.jpg",
        //   isImage: true,
        // },
        // {
        //   url:
        //     "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2234059888,3529836727&fm=26&gp=0.jpg",
        //   isImage: true,
        // },
      ],
    };
  },
  created() {
    GetStarInfo(this.$route.params.id)
      .then((res) => {
        if (res.data.errCode == 0) {
          console.log(JSON.parse(JSON.stringify(res.data.data)));

          this.starData = res.data.data;
        } else {
          this.$toast.fail(res.data.message);
        }
      })
      .catch(() => {
        this.$toast.fail("请求出错。");
      });
  },
  methods: {
    send() {
      this.$refs.form.submit();
    },
    onSubmit(obj) {
      console.log(obj);
      if (obj.rate1 == 0 || obj.rate2 == 0 || obj.rate3 == 0 || !obj.txt) {
        return this.$toast.fail("请评论打分后，再次提交。");
      }
      console.log(JSON.parse(JSON.stringify(this.starData)));
      PutStarInfo()
        .then((res) => {
          if (res.data.errCode == 0) {
            //   console.log(JSON.parse(JSON.stringify(res.data)));
            this.$toast("评论成功。");
            setTimeout(() => {
              this.$router.back(-1);
            }, 1000);
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch(() => {
          this.$toast.fail("请求出错。");
        });
    },
    // 显示图片预览组件
    showImg(idx) {
      ImagePreview({
        images: this.imgs,
        startPosition: idx,
        closeable: true,
      });
    },
    // 上传图片后的状态
    afterRead(file) {
      if (file.file.size > 100) {
        file.status = "uploading";
        file.message = "上传中...";
        setTimeout(() => {
          file.status = "done";
          file.message = "上传完成";
        }, 1000);
      } else {
        file.status = "failed";
        file.message = "上传失败";
      }
    },
    // 删除图片
    del(val) {
      console.log(val);
    },
  },
};
</script>
 
<style lang = "less" scoped>
/deep/.van-nav-bar {
  background-color: #003399;
  width: 100%;
  .van-icon {
    color: white;
  }
  .van-nav-bar__title {
    color: white;
  }
  .van-nav-bar__right {
    color: white;
    div {
      text-align: right;
      width: 5rem;
      line-height: 4rem;
    }
  }
}
.edit {
  height: 100%;
  background-color: #efefef;

  .total {
    text-align: center;
    font-size: 1.6rem;
    padding: 1rem 0;
    background-color: #fff;

    span {
      color: #aaa;
    }
    p {
      color: #ffb600;
      b {
        font-size: 5rem;
      }
    }
    /deep/.van-cell {
      padding: 0 1.6rem;
      .van-cell__value {
        .van-field__body {
          .van-field__control {
            .van-rate {
              width: 100%;
              display: flex;
              justify-content: space-evenly;
              border-bottom: 1px solid #ccc;
              padding: 3% 0;
              .van-rate__item {
                .van-rate__icon {
                  font-size: 3.5rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
.ping {
  background-color: #fff;
  padding: 0 3rem;
  p {
    font-size: 2rem;
  }
  /* 第一级子元素 div */
  & > div {
    padding: 0 2rem;
    margin: 1rem 0;
    display: flex;
    align-items: center;
    span {
      font-size: 1.6rem;
      width: 9rem;
    }
  }
}
.swipe {
  position: absolute;
  bottom: 0;
  width: 100vw;
  background-color: #fff;
  overflow: scroll;
  box-sizing: border-box;
  .imgs {
    display: inline-block;
    margin: 1rem;
    white-space: nowrap;
    img {
      /* width: 9rem; */
      height: 9rem;
      display: inline-block;
      border-radius: 0.6rem;
      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
}
.uploader {
  position: absolute;
  bottom: 0;
  overflow-x: scroll;
  /deep/.van-uploader__wrapper {
    flex-wrap: nowrap;
  }

  .van-uploader__preview {
    .van-image {
      .van-uploader__preview-cover {
        .van-image__img {
          filter: brightness(0.8);
        }
        /* 删除图标 */
        img {
          position: absolute;
          top: -3px;
          right: -3px;
          height: 2rem;
          width: 2re;
          cursor: pointer;
          z-index: 2000;
        }
      }
    }
  }
  /* 自定义上传区域 */
  /deep/.van-uploader__input-wrapper {
    height: 8rem;
    width: 8rem;
    border: 1px solid #ccc;
    .load {
      height: 100%;
      widows: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        width: 5rem;
      }
      span {
        color: #aaa;
      }
    }
  }
}
</style>