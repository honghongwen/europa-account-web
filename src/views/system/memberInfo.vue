<template>
  <div class="member_info_main">
    <el-card>
      <div class="member_info_goback">
        <el-button type="primary" icon="el-icon-arrow-left" @click="goBack">返回</el-button>
      </div>
      <div class="member_info_card_group">
        <el-card class="member_info_card color-green1"> {{ member.name }} <i class="el-icon-user color-green1"> </i>
        </el-card>
        <el-card class="member_info_card color-red"> {{ member.gender | genderText }} <i class="el-icon-shopping-cart-2 color-red"></i> </el-card>
        <el-card class="member_info_card color-blue"> {{ member.mark }} <i class="el-icon-s-comment color-blue"> </i></el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {
    getMember,
  } from "@/api/member";
  export default {
    data() {
      return {
        id: 0,
        member: {
          id: null,
          name: "",
          gender: 0,
          mark: "",
          createTime: "",
          updateTime: ""
        }
      };
    },
    filters: {
        genderText(val) {
            if(val === 1) {
                return '男'
            }else {
                return '女'
            }
        }
    },
    created() {
      this.initParam();
      this.getMemberById(this.id);
    },
    methods: {
      initParam() {
        this.id = this.$route.query.id;
      },
      goBack() {
        this.$router.back(-1);
      },
      getMemberById(id) {
        getMember(id).then((response) => {
          this.member = response.data
        })
      }
    },
  };

</script>

<style lang="scss" scoped>
  .member_info_card_group {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;

    .color-green1 {
      color: #40c9c6 !important;
    }

    .color-blue {
      color: #36a3f7 !important;
    }

    .color-red {
      color: #f4516c !important;
    }

    .member_info_card {
      width: 400px;
      font-size: 18px;
      font-weight: 600;

      i {
        margin-left: 250px;
        font-size: 55px;
      }
    }
  }

</style>
