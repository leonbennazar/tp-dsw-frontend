<script>

  import Navbar from "$lib/components/navbar.svelte";
</script>

<Navbar></Navbar>

<div class = "content">
  <div class="mapaydesc">
    <h1>Mi turno FC</h1>
    <!-- svelte-ignore a11y_missing_attribute -->
    <iframe class="mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1183.550267584815!2d-60.66249840930015!3d-32.961946570332046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab719cfd80c3%3A0xe1dcf08777e95a1e!2sHipodromo%20De%20Rosario!5e0!3m2!1ses-419!2sar!4v1761512150806!5m2!1ses-419!2sar" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    <p>Más de 5 años de trayectoria</p>
    <p>Variedad de canchas de futbol para que nuestro clientes puedan recibir una atencion adecuada a sus necesidades</p>
  </div>
</div>

<style>
  .content{
    margin-top:70px;
    display: flex;
    justify-content: center;
  }
  p, h1{
    justify-content: center;
    display:flex;
    color:white;
  }
  .mapa{
  display: flex;
  width: 80%;
  height: 300px;
  margin : auto
  }
  @media (min-width: 1024px) {
    .mapa{
    height: 400px;
    width: 800px;
    }
  }
</style>