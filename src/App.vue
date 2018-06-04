<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
html, body, label, input, a, span, strong, em, img, hr, p, div, ul, ol, li, dl, dt, dd, h1, h2, h3, h4, h5, h6, form, button, select, textarea {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0
}
html {
  width: 100%;
  height: 100%;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  overflow: auto;
}
body {
  height: 100%;
  background: #f5f7fa;
  color: #404040;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  font-size: 14px;
  min-width: 1200px;
}
a {
  color: #262626;
  cursor: pointer;
  text-decoration: none;
}
a:hover {
  color: #fd6853;
}
a:active {
  outline: 0 none;
}
img {
  -ms-interpolation-mode: bicubic;
}
i, cite, em, var, address, dfn {
  font-style: normal;
}
h1, h2, h3, h4, h5, h6 {
  font-weight: normal;
}
li {
  list-style: none;
}
button, input, select, textarea {
  font-size: 100%;
  vertical-align: middle;
  color: inherit;
}
</style>
