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

  <form on:submit={Enviar} class="editForm">
    <input type="text" name="nombre" required placeholder="Nombre de la cancha"/>
    <br>
    <label>Tipo de turno
    <br>
      <label>
        <input type="radio" name="tipo_turno" value="y_media" required />
        Y media
      </label>
      <br>
      <label>
        <input type="radio" name="tipo_turno" value="en_punto" required />
        En punto
      </label>
      <button type="submit">Enviar</button>
    </label>

  </form>
</div>



<style>
  .content{
    margin-top: 70px;
  }

    .editForm {
    width: 300px;
    margin: 2rem auto;
    padding: 1.5rem;
    background-color: #f4f4f4;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

</style>