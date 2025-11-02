<script>
import NavBar from '$lib/components/navbar.svelte'
import {goto} from '$app/navigation'
  // @ts-ignore
  async function Enviar(event) {
    event.preventDefault(); // evita el reload del form

    const form = event.target;
    const formData = new FormData(form);

    // Convertir a objeto común
    const data = Object.fromEntries(formData.entries());

    // Convertir a JSON
    const jsonData = JSON.stringify(data);

    // Enviar al backend
    const res = await fetch("http://localhost:3000/api/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    goto('/canchas')
  }


</script>

<NavBar />

<div class="content">
<button on:click={() => history.back()}>⬅️ Volver</button>

  <form on:submit={Enviar}>
    <label>
      Nombre:
      <input type="text" name="name" required />
    </label>
    <button type="submit">Enviar</button>
  </form>
</div>



<style>
  .content{
    margin-top: 70px;
  }
</style>