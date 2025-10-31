<script lang="ts">
  import { page } from '$app/stores';
  import NavBar from '$lib/components/navbar.svelte'
  $: id = $page.params.id;
  let canchaRecibida :any = '';


  async function getCancha() {
    const req = await fetch(`http://localhost:3000/api/characters//${id}`, {method: "GET"});
    const res = await req.json();
    canchaRecibida = res.data
    console.log(canchaRecibida)
  }
</script>


<NavBar />

<div class= "content">

  {#await getCancha()}
    <h1>Cargando cancha...</h1>
  {:then cancha}
    <h1>{canchaRecibida.name}</h1>
      <h2>{canchaRecibida.characterClass}<br>{canchaRecibida.items}</h2>
  {:catch err}
    <p style="color:red">No se enconco</p>
  {/await}


</div>

<style>
  .content{
  margin-top: 70px;
}

  h1, h2{
    color:white;
  }
</style>