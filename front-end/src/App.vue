<template>
<div id="app">
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/authors">Authors</router-link> |
    <router-link to="/edit">Edit</router-link>
  </div>
  <router-view />

  <footer id="footer">
    <p>Check out the full repository <a href="https://github.com/brundagejoe/brundage-blog">here</a>.</p>
  </footer>
</div>
</template>

<style>
#app {
  font-family: 'EB Garamond', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#footer {
  position: sticky;
  padding-top: .5em;
  padding-bottom: .5em;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f9f9f9;
  text-align: center;
  color: black;
}

h1 {
  font-weight: bold;
  font-size: 3em;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #347194;
}
</style>
