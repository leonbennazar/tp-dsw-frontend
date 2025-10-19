<script>
  import { page } from '$app/stores';
</script>

<nav>
  <a href="/" class:selected={$page.url.pathname === '/'}>Inicio</a>
  <a href="/page2" class:selected={$page.url.pathname === '/page2'}>Page 2</a>
</nav>

<style>
  nav {
    display: flex;
    margin-top: 150px;
    background-color: blueviolet;
  }

  a {
    text-decoration: none;
    color: #333;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: 0.2s;
  }

  a:hover {
    background: #eee;
  }

  a.selected {
    background: #0070f3;
    color: white;
    font-weight: bold;
  }
</style>
