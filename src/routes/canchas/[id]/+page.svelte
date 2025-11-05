<script lang="ts">
	import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import NavBar from '$lib/components/navbar.svelte'
  $: id = $page.params.id;
  let canchaRecibida :any = '';


  async function getCancha() {
    const req = await fetch(`http://localhost:3000/api/canchas/${id}`, {method: "GET"});
    const res = await req.json();
    canchaRecibida = res
    console.log(canchaRecibida)
  }

async function borrarCancha() {

    if (!confirm('¿Estás seguro de que quieres borrar esta cancha?')) {
      return; 
    }
      const respuesta = await fetch(`http://localhost:3000/api/canchas/${id}`, {method: 'DELETE'});
      goto('/canchas')
    if (!respuesta.ok) {
        throw new Error('No se pudo borrar la cancha');
      }

    }
</script>


<NavBar />

<div class= "content">
  <button class="backbtn"on:click={() => history.back()}>Volver</button>
  {#await getCancha()}
    <h1>Cargando cancha...</h1>
  {:then cancha}
  <button class ="editbtn"on:click ={() => goto(`/canchas/edit/${id}`)}>Editar</button>
  <button class ="delbtn"on:click ={() => borrarCancha()}>BORRAR</button>
    <h1>{canchaRecibida.nombre}</h1>
      <h2>{canchaRecibida.tipo_turno}<br>{canchaRecibida.items}</h2>
  {:catch err}
    <p style="color:red">Hubo un problema con la base de datos</p>
  {/await}


</div>

<style>
  .content{
  margin-top: 70px;
}

  h1, h2{
    color:white;
  }
  button{
    height:30px;
  }
  button:hover{
    cursor: pointer;
  }

  .delbtn{
    background-color: rgb(126, 30, 46);
    color: white;
  }
</style>