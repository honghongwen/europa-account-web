<template>
  <div class="collapse">
    <i
      :class="[isActive ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
      @click="toggleOpen"
    ></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    toggleOpen() {
      this.isActive = this.isActive ? false : true;
    },
  },
};
</script>

<style lang="scss" scoped>
.collapse i {
  font-size: 20px;
  cursor: pointer;
  color: #363f44;
}
</style>