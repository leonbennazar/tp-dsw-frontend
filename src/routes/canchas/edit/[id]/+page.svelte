<script>
import NavBar from '$lib/components/navbar.svelte'
import {goto} from '$app/navigation'
import { page } from '$app/stores';
 $: id = $page.params.id;
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
    const res = await fetch(`http://localhost:3000/api/characters/${id}`, {
      method: "PUT",
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
      <input type="text" name="nombre" required />
    </label>
    <label>
      <input type="radio" name="tipo_turno" value="y_media" required />
      Y media
    </label>
    <label>
      <input type="radio" name="tipo_turno" value="en_punto" required />
      En punto
    </label>
    <button type="submit">Enviar</button>
  </form>
</div>



<style>
  .content{
    margin-top: 70px;
  }
</style>