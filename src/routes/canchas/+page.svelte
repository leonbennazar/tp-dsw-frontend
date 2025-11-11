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
          <button
          onclick={() => filtro = 0}
          class:active={filtro === 0}>
          Sin filtro</button>
          {#each arrayTamanios as tamanio}
            <button 
              onclick={() => filtro = Number(tamanio.id)} 
              class:active={filtro === Number(tamanio.id)}>
              F{tamanio.capacidad_x_equipo}
            </button>
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
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: transparent;
  color: #000;
  transition: background 0.2s ease;
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 10px 0;
}

.filtrosbtn button {
  background-color: #3a3a3a;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.filtrosbtn button:hover {
  background-color: #555;
  transform: translateY(-1px);
}

/* 🔹 estilo cuando está activo */
.filtrosbtn button.active {
  background-color: #00b894;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 0 6px rgba(0, 184, 148, 0.6);
}

.addbtn {
  position: fixed;
  top: 80px;
  right: 30px;
  z-index: 10;
}

.addbtn button{
  background-color: #00b894;
  border: none;
  color: white;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}

.addbtn button:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(0, 184, 148, 0.5);
}

.canchas{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  gap: 60px;
}

.canchas button {
  background: linear-gradient(135deg, #2c2d83, #3939b4);
  border: none;
  border-radius: 18px;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.canchas button:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
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