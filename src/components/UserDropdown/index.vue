<template>
  <div class="dropDownContainer">
    <el-dropdown class="user-dropdown">
      <div class="userDrop">
        <span class="userDrop_text"
          >{{ username }} <i class="el-icon-caret-bottom"></i
        ></span>
        <img src="@/assets/image/hesuan.png" alt="user" />
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">
          <i class="el-icon-user-solid"></i> 首页</el-dropdown-item
        >
        <el-dropdown-item command="b">
          <i class="el-icon-s-tools"></i>设置
        </el-dropdown-item>
        <el-dropdown-item command="c" divided>
          <i class="el-icon-switch-button"></i> 重新登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "冯文",
    };
  },
};
</script>