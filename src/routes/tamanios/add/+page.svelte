<script lang="ts">
import NavBar from '$lib/components/navbar.svelte'
import {goto} from '$app/navigation';
	import { onMount } from 'svelte';
  // @ts-ignore
  async function Enviar(event) {
    event.preventDefault(); // evita el reload del form

    const form = event.target;
    const formData = new FormData(form);

    // Convertir a objeto común
    const data = Object.fromEntries(formData.entries());
    for (const [key, value] of formData.entries()) {
  console.log(key, value);
}

    // Convertir a JSON
    const jsonData = JSON.stringify(data);

    // Enviar al backend
    const res = await fetch("http://localhost:3000/api/tamanios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    goto('/tamanios')
  }



</script>

<NavBar />

<div class="content">
<button on:click={() => history.back()}>Volver</button>
<h1>Agregar tamaño</h1>
  <form on:submit={Enviar} class="editForm">
    <input type="number" name="capacidad_x_equipo" required placeholder="Capacidad por equipo" min="1"/>
    <input type="number" name="ancho" required placeholder="Ancho en metros" min="1"/>
    <input type="number" name="largo" required placeholder="Largo en metros" min="1"/>
    <button type="submit">Enviar</button>
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

  h1{
    display: flex;
    justify-content:center;
    color: white
  }
</style>