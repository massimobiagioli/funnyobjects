<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
          aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        <a class="navbar-brand" v-link="{path: '/'}">Pannello di Controllo</a>
      </div>
      <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li v-link="{path: '/objects', activeClass: 'active'}"><a v-link="{path: '/objects'}">Oggetti</a></li>
        </ul>
      </div>
      <!--/.nav-collapse -->
  </nav>

  <div class="container">
    <router-view></router-view>
  </div>
  <!-- /.container -->
</template>

<script>
export default {
    vuex: {
        actions: {
    },
    getters: {
    }
  }
}
</script>
