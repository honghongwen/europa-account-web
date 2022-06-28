<template>
  <div class="t-sidebar">
    <el-scrollbar>
      <el-menu>
        <router-link to="/">
          <el-menu-item> <i class="el-icon-s-home"></i>首页 </el-menu-item>
        </router-link>

        <router-link to="/dashboard">
          <el-menu-item> <i class="el-icon-truck"></i>看板 </el-menu-item>
        </router-link>

        <el-submenu index="1">
          <template slot="title"><i class="el-icon-s-data"></i>统计</template>
          <router-link to="/analyze/day">
            <el-menu-item index="1-1"> 日报 </el-menu-item>
          </router-link>
          <router-link to="/analyze/month">
            <el-menu-item index="1-2"> 月报 </el-menu-item>
          </router-link>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-s-platform"></i>日常账单</template
          >
          <router-link to="/accounting/eating">
            <el-menu-item index="2-1"> 吃 </el-menu-item>
          </router-link>
          <router-link to="/accounting/playing">
            <el-menu-item index="2-2"> 玩 </el-menu-item>
          </router-link>
          <router-link to="/accounting/living">
            <el-menu-item index="2-3"> 行 </el-menu-item>
          </router-link>
          <router-link to="/accounting/other">
            <el-menu-item index="2-4"> 其他 </el-menu-item>
          </router-link>
          <router-link to="/accounting/income">
            <el-menu-item index="2-5"> 收入 </el-menu-item>
          </router-link>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-s-tools"></i>系统管理</template
          >
          <router-link to="/system/member">
            <el-menu-item index="3-1"> 成员管理 </el-menu-item>
          </router-link>
          <router-link to="/system/setting">
            <el-menu-item index="3-2"> 系统设置 </el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>