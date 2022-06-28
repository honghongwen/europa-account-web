<template>
  <div class="wrapper">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <app-main-page></app-main-page>
  </div>
</template>

<script>
import AppHeader from "./components/header";
import AppSidebar from "./components/sidebar";
import AppMainPage from "./components/mainPage";

export default {
  name: "layout",
  components: {
    AppHeader,
    AppSidebar,
    AppMainPage
  },
};
</script>