<template>
  <div class="mainPage">
    <transition name="fade-page" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {};
</script>