<script lang="ts">
import NavBar from '$lib/components/navbar.svelte'
import {goto} from '$app/navigation';
import { page } from '$app/stores';
import { onMount } from 'svelte';
 $: id = $page.params.id;
  let tamanioRecibido :any = '';


  async function getTamanio() {
    const req = await fetch(`http://localhost:3000/api/tamanios/${id}`, {method: "GET"});
    const res = await req.json();
    tamanioRecibido = res
    console.log(tamanioRecibido)
  }
  // @ts-ignore
  async function Enviar(event) {
    event.preventDefault(); 

    const form = event.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    const jsonData = JSON.stringify(data);
  
    const res = await fetch(`http://localhost:3000/api/tamanios/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    goto('/tamanios')
  }

  onMount(getTamanio)


</script>

<NavBar />

<div class="content">
<button on:click={() => history.back()}>Volver</button>
<h1>Editar "F{tamanioRecibido.capacidad_x_equipo}"</h1>
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