<script lang="ts">
	import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import NavBar from '$lib/components/navbar.svelte'
  $: id = $page.params.id;
  let tamanioRecibido :any = '';


  async function getTamanio() {
    const req = await fetch(`http://localhost:3000/api/tamanios/${id}`, {method: "GET"});
    const res = await req.json();
    tamanioRecibido = res
    console.log(tamanioRecibido)
  }

async function borrarTamanio() {

    if (!confirm('¿Estás seguro de que quieres borrar este tamaño?')) {
      return; 
    }
      const respuesta = await fetch(`http://localhost:3000/api/tamanios/${id}`, {method: 'DELETE'});
      goto('/tamanios')
    if (!respuesta.ok) {
        throw new Error('No se pudo borrar el tamanio');
      }

    }
</script>


<NavBar />

<div class= "content">
  <button class="backbtn"on:click={() => history.back()}>Volver</button>
  {#await getTamanio()}
    <h1>Cargando tamaño</h1>
  {:then tamanio}
  <button class ="editbtn"on:click ={() => goto(`/tamanio/edit/${id}`)}>Editar</button>
  <button class ="delbtn"on:click ={() => borrarTamanio()}>BORRAR</button>
    <h1>{tamanioRecibido.id}</h1>
  {:catch err}
    <p style="color:red">Hubo un problema con la base de datos</p>
  {/await}


</div>

<style>
  .content{
  margin-top: 70px;
}

  h1{
    color:white;
  }
  button{
    height:30px;
    border: none;
  }
  button:hover{
    cursor: pointer;
  }

  .delbtn{
    background-color: rgb(126, 30, 46);
    color: white;
  }
</style>