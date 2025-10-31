<script>
import NavBar from '$lib/components/navbar.svelte'
</script>

<NavBar />

<div class="content">
  <form action="http://localhost:3000/api/characters/" method= "POST">
    <input type="text"  placeholder ="Nombre de la cancha" required>
    <input type="radio" name="tipo_turno" value="y_media" required>
    <input type="radio" name="tipo_turno" value="en_punto" required> 
    <input type="submit">
  </form>
</div>



<style>
  .content{
    margin-top: 70px;
  }
</style>