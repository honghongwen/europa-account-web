<template>
  <div class="header">
    <div class="header_left">
      <a href="javascript:;" class="logoLink">AMS</a>
    </div>
    <div class="header_right">
      <div class="header_right_one">
        <collapse class="header_right_one_collapse"></collapse>
        <bread-crumb class="header_right_one_breadCrumb"></bread-crumb>
      </div>
      <div class="header_right_two">
        <ul class="header_right_tow_ul">
          <li id="message_notice">
            <el-badge is-dot>
              <i class="el-icon-message-solid"></i>
            </el-badge>
          </li>
          <li id="user-dropdown">
            <user-dropdown></user-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Collapse from "@/components/Collapse";
import UserDropdown from "@/components/UserDropdown";
import BreadCrumb from "@/components/BreadCrumb";
export default {
  components: {
    Collapse,
    BreadCrumb,
    UserDropdown,
  },
};
</script>
