<script lang="ts">
  import { onMount } from 'svelte';
  import {goto} from '$app/navigation';
	import Navbar from '$lib/components/navbar.svelte';
  let mostrar: any= '';
  // svelte-ignore non_reactive_update
    let arrayCanchas: any[] = [];  //en typescript: data va a ser un array de cualquier tipo
  let filtro: number = $state(0)
  async function getCanchas() {
    const req = await fetch('http://localhost:3000/api/canchas/', {method: "GET"});
    const res = await req.json();
    arrayCanchas = res.data;  //uso esto porque el array que trae el contenido se llama data
    arrayCanchas.sort((a, b) => a.numero - b.numero)
    console.log(arrayCanchas); //si la consola devuelve entre {}, es objeto, entre [] es array
  }

	// svelte-ignore non_reactive_update
		let arrayTamanios: any[] = $state([]); 

	async function getTamanios() {
		const req = await fetch('http://localhost:3000/api/tamanios', { method: 'GET' });
		const res = await req.json();
		arrayTamanios = res.data;
		arrayTamanios.sort((a, b) => a.capacidad_x_equipo - b.capacidad_x_equipo);
  }
onMount(getTamanios)
</script>

<Navbar></Navbar>



<div class ="content">

  <div class ="addbtn">
    <button onclick ={(()=> goto('/canchas/add'))}>+</button>
  </div>


      {#await getCanchas()}
        <h1>Cargando canchas...</h1>

        {:then canchas}
        {#if arrayCanchas.length === 0}
          <h1>No hay canchas cargadas</h1>
        {:else}
        <div class ="filtrosbtn">
          <button onclick={() => filtro = 0}>Sin filtro</button>
          {#each arrayTamanios as tamanio}
          <button onclick={() => filtro = tamanio.id}>F{tamanio.capacidad_x_equipo}</button>
          {/each}

        </div>
          <div class="canchas">
            {#each arrayCanchas as cancha}
            {#if filtro === 0 || cancha.tamanio?.id === filtro }
            <button class="accioncancha" onclick={() => goto(`/canchas/${cancha.id}`)}>
              <div class ="cancha-card">
                  <h1>Cancha {cancha.numero}</h1>
              </div>
            </button>
            {/if}
            {/each}
          </div>
        {/if}
      {:catch err}
      <p style="color:red">Ocurrió un error con la base de datos</p>
      {/await}

</div>




<style>
.content{
  margin-top: 70px;
}
.filtrosbtn{
  display: flex;
  gap:5px;
  cursor: pointer    /*te dejo para que le des estilo lucca*/
}
.addbtn button{
  background-color: #00B894;
  border:none;
  color: white;
  border-radius: 5px;
  height: 35px;
  width:35px;
  cursor:pointer;
}
.canchas{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  gap: 60px;
}


h1{
  size:300px;
  color:white;
  display: flex;
  justify-content: center;
}

@media (min-width: 768px) {
  .canchas {
    display: grid;
    justify-items: center;  
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));        
    grid-column-gap: 100px;
    grid-row-gap: 60px;
  }
}
.canchas button{
  color:white;
  padding: 5px;
  width: 190px;
  height:100px;
  background-color: #2c2d83;
  border-radius: 15px;
  transition: 0.3s;
  box-shadow: inset 5px 5px 10px rgba(30, 2, 97, 0.699);
  border: none;
}
@media (min-width: 768px){
  .canchas button{
    width: 240px;
    height: 150px;
  }
}
@media (min-width: 1024px){
  .canchas button{
    font-size: 20px;
    width: 290px;
    height: 200px;
  }
}


 .accioncancha:hover{
  transform: translateY(-8px);
  cursor:pointer;
  transition: 0.3s;
}

h1{
  size:300px;
  color:white;
}


</style>