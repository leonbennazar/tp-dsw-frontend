<script lang="ts">
  import { onMount } from 'svelte';
  import {goto} from '$app/navigation';
	import Navbar from '$lib/components/navbar.svelte';
  let mostrar: any= '';
  let arrayTamanios: any[] = [];  //en typescript: data va a ser un array de cualquier tipo

  async function getTamanios() {
    const req = await fetch('http://localhost:3000/api/tamanios/', {method: "GET"});
    const res = await req.json();
    arrayTamanios = res;  //uso esto porque el array que trae el contenido se llama data
    console.log(arrayTamanios); //si la consola devuelve entre {}, es objeto, entre [] es array
  }

</script>

<Navbar></Navbar>



<div class ="content">

  <div class ="agregarbtn">
    <button on:click ={(()=> goto('/tamanios/add'))}>+</button>

  </div>

      {#await getTamanios()}
        <h1>Cargando tamaños...</h1>

        {:then tamanio}
          <div class="tamanios">
            {#each arrayTamanios as tamanio}
            <button class="acciontamanio" on:click={() => goto(`/tamanios/${tamanio.id}`)}>
              <div class ="tamanio-card">
                  <h1>F{tamanio.capacidad_x_equipo}</h1>
              </div>
            </button>
            {/each}
          </div>
      {:catch err}
      <p style="color:red">Ocurrió un error con la base de datos</p>
      {/await}

</div>




<style>
.content{
  margin-top: 70px;
}


.tamanios{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  gap: 60px;
}


@media (min-width: 768px) {
  .tamanios {
    display: grid;
    justify-items: center;  
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));        
    grid-column-gap: 10px;
    grid-row-gap: 60px;
  }
}
.tamanios button{
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
  .tamanios button{
    width: 240px;
    height: 150px;
  }
}
@media (min-width: 1024px){
  .tamanios button{
    font-size: 30px;
    width: 290px;
    height: 200px;
  }
}


 .acciontamanio:hover{
  transform: translateY(-8px);
  cursor:pointer;
  transition: 0.3s;
}

h1{
  size:300px;
  color:white;
}


</style>