<script lang="ts">
import NavBar from '$lib/components/navbar.svelte'
import {goto} from '$app/navigation';
import { page } from '$app/stores';
import { onMount } from 'svelte';
let arrayTamanios: any[] =[];
 $: id = $page.params.id;
  let canchaRecibida :any = '';


  async function getCancha() {
    const req = await fetch(`http://localhost:3000/api/canchas/${id}`, {method: "GET"});
    const res = await req.json();
    canchaRecibida = res
    console.log(canchaRecibida)
  }
  // @ts-ignore
  async function Enviar(event) {
    event.preventDefault(); 

    const form = event.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    const jsonData = JSON.stringify(data);
  
    const res = await fetch(`http://localhost:3000/api/canchas/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    goto('/canchas')
  }
  async function getTamanios() {
    const req = await fetch('http://localhost:3000/api/tamanios', {method: "GET"});
    const res = await req.json();
    arrayTamanios = res;  //uso esto porque el array que trae el contenido se llama data
    console.log(arrayTamanios); //si la consola devuelve entre {}, es objeto, entre [] es array
  }

  onMount(getTamanios)
  onMount(getCancha)

</script>

<NavBar />

<div class="content">
<button on:click={() => history.back()}>Volver</button>
<h1>Editar "{canchaRecibida.nombre}"</h1>
  <form on:submit={Enviar} class="editForm">
    <input type="text" name="nombre" required placeholder="Nombre"/>
    <label>Tipo de turno:
      <label>
        <input type="radio" name="tipo_turno" value="y_media" required />
        Y media
      </label>
      <label>
        <input type="radio" name="tipo_turno" value="en_punto" required />
        En punto
    <label>Tamaño<br>
    {#each arrayTamanios as tamanio }
    <label>
      <input type="radio" name="tamanio" value={tamanio.capacidad_x_equipo} required />
    {tamanio.capacidad_x_equipo}</label><br>
    {/each}
    </label>
    </label>
      <button type="submit">Enviar</button>
    </label>
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