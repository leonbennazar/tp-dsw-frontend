<script lang="ts">
import NavBar from '$lib/components/navbar.svelte'
import {goto} from '$app/navigation';
import { page } from '$app/stores';
import { onMount } from 'svelte';
 $: id = $page.params.id;
  let tipoRecibido :any = '';


  async function getTipo() {
    const req = await fetch(`http://localhost:3000/api/tipos/${id}`, {method: "GET"});
    const res = await req.json();
    tipoRecibido = res.data
    console.log(tipoRecibido)
  }
  // @ts-ignore
  async function Enviar(event) {
    event.preventDefault(); 

    const form = event.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    const jsonData = JSON.stringify(data);
  
    const res = await fetch(`http://localhost:3000/api/tipos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    goto('/tipos')
  }

onMount(getTipo)

</script>

<NavBar />

<div class="content">
<button on:click={() => history.back()}>Volver</button>
<h1>Editar "{tipoRecibido.nombre}"</h1>
  <form on:submit={Enviar} class="editForm">
    <input type="text" name="nombre" required placeholder="Nombre" min="1"/>
    <input type="text" name="piso" required placeholder="Material del piso" min="1"/>
    <label>
        <input type="hidden" name="techo" value="sin_techo"  />
        <label>
        <input type="checkbox" name="techo" value="con_techo"  />
      Techado
      </label>
      </label>
      
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