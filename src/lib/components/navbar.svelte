<script>
  import { page } from '$app/stores';
  import {goto} from '$app/navigation';
  
</script>
<div class = "container">
  
  <div class = "logo">
    <button on:click={() => goto('/')}><img src="/logo.png" alt="Logo"></button>
  </div>
  <nav>
    <a href="/" class:selected={$page.url.pathname === '/'}>Inicio</a>
    <a href="/canchas" class:selected={$page.url.pathname === '/canchas'}>Canchas</a>
    <a href="/tamanios" class:selected={$page.url.pathname === '/tamanios'}>Tamaños</a>
    <a href="/tipos" class:selected={$page.url.pathname === '/tipos'}>Tipos</a>
    <button><img class="userimg" src="/user.png" alt="user by stasy"></button>
  </nav>
</div>

<style>
  nav {
    justify-content: right;
  }

  a {
    text-decoration: none;
    color: #ffffff;
    padding: 15px;
    transition: 0.2s;
    
  }

  a:hover {
    color: #5f69f5;
  }

  a.selected {
    color: #5f69f5;
    font-weight: bold;
  }

  .container{
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color:#2c2d83;
  height: 60px;
  width: 100%;
  top: 0;
  left: 0;
  }
  
  button{
    background: none;
    border: none;
  }

  img{
    padding: 15px;
    height: 50px;
    width: 50px;
  }
  img:hover{
    cursor: pointer;
  }
  nav{
    display: flex; 
    align-items: center; 
  }

</style>
