<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "./assets/css/@media.less";
@import "./assets/css/imgs.less";

* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}

.fl {
  float: left !important;
}

.fr {
  float: right !important;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.auto {
  margin-left: auto;
  margin-right: auto;
}

a {
  text-decoration: none;
  color: #5bfdff;
}

.mxw-200 {
  max-width: 200rem;
}

.mxw-80 {
  max-width: 80rem;
}

.mxw-100 {
  max-width: 100rem;
}

.mxw-150 {
  max-width: 150rem;
}

.mb-18 {
  margin-bottom: 18rem;
}

.mr-20 {
  margin-right: 20rem;
}

.ml-150 {
  margin-left: 150rem;
}

.ml-005 {
  margin-left: 5% !important;
}

.mt-14 {
  margin-top: 14rem;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fefefe;
  font-size: 16rem;
  height: 100%;
}

</style>
