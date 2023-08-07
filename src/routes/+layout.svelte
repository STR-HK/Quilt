<script>
  import "./styles.css";
  import "../app.css";
</script>

<svelte:head>
  <title>Quilter</title>
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta
    name="viewport"
    content="viewport-fit=cover, user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
  />
  <link
    rel="preload"
    href="../src/lib/fonts/SF-Pro.woff2"
    as="font"
    crossorigin="anonymous"
  />
</svelte:head>

<div class="app">
  <main>
    <slot />
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    /*padding: 1rem;*/
    width: 100%;
    min-height: 100vh;
    height: 100%;
    /*max-width: 64rem;*/
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
