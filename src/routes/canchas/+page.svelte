<script lang="ts">
  import { onMount } from 'svelte';
  import {goto} from '$app/navigation';
	import Navbar from '$lib/components/navbar.svelte';
  let mostrar: any= '';
  let arrayCanchas: any[] = [];  //en typescript: data va a ser un array de cualquier tipo

  async function getCanchas() {
    const req = await fetch('https://api.attackontitanapi.com/titans/');
    const res = await req.json();
    arrayCanchas = res.results;  //uso esto porque la request devuelve objetos
    console.log(arrayCanchas); //si la consola devuelve entre {}, es objeto, entre [] es array
  }

  onMount(() => {
    getCanchas();
  });
</script>

<Navbar></Navbar>



<div class ="content">
      {#await getCanchas()}
        <h1>Cargando canchas...</h1>

        {:then cancha}
          <div class="canchas">
            {#each arrayCanchas as cancha}
            <button class="accioncancha" on:click={() => goto(`/canchas/${cancha.id}`)}>
              <div class ="cancha-card">
                <img src= '/logo.png' alt={cancha.name}/>
                  <div class= "descripcion">
                  <p>{cancha.name}</p>
                </div>
              </div>
            </button>
            {/each}
          </div>
      {:catch err}
      <p style="color:red">No se encontro la cancha</p>
      {/await}

</div>




<style>
.content{
  margin-top: 70px;
}
.canchas{
  display:grid;
  grid-template-columns: repeat(auto-fill,minmax(200px, 10px));
  grid-column-gap: 50px;
  grid-row-gap: 60px;
  padding: 100px;
}
.canchas img{
  width: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.canchas button{
  background: none;
  border: none;
}

.cancha-card{
  transition: 0.2s ease;
}
.descripcion{
  color:white;
  padding: 5px;
  width: 190px;
  transform: translateY(-15px);
  background-color: #d32f2f;
  border-radius: 5px;
  border-top-left-radius: 0px ;
  border-top-right-radius:0px;

}

.cancha-card:hover{
  transform: translateY(-8px);
  cursor:pointer;
}

h1{
  size:300px;
  color:white;
}


</style>