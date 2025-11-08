<script lang="ts">
  import { onMount } from 'svelte';
  import {goto} from '$app/navigation';
	import Navbar from '$lib/components/navbar.svelte';
  let mostrar: any= '';
  let arrayTipos: any[] = [];  //en typescript: data va a ser un array de cualquier tipo

  async function getTipos() {
    const req = await fetch('http://localhost:3000/api/tipos/', {method: "GET"});
    const res = await req.json();
    arrayTipos = res.data;  //uso esto porque el array que trae el contenido se llama data
    console.log(arrayTipos); //si la consola devuelve entre {}, es objeto, entre [] es array
  }

async function borrarTipo(x:number) {

    if (!confirm('¿Estás seguro de que quieres borrar este tamaño?')) {
      return; 
    }
      const respuesta = await fetch(`http://localhost:3000/api/tipos/${x}`, {method: 'DELETE'});
      goto('/tipos')
    if (!respuesta.ok) {
        throw new Error('No se pudo borrar el tipo');
      }
    mostrar = 0;
    window.location.reload()
    }

async function editartipo(x:number){
  goto(`/tipos/edit/${x}`),
  mostrar = 0;
}

onMount(getTipos)
</script>

<Navbar></Navbar>



<div class ="content">

  <div class ="addbtn">
    <button on:click ={(()=> goto('/tipos/add'))}>+</button>

  </div>

      {#await getTipos()}
        <h1>Cargando tipos...</h1>

        {:then tipo}
          <h1>Haz click en cada uno para mas información</h1>
          <div class="tipos">
            {#each arrayTipos as tipo}
            <button class="accionTipos" on:click={() => mostrar = tipo.id_tipo}>
              <div class ="tipo-card">
                  <h1>{tipo.nombre}</h1>
              </div>
            </button>
            {/each}
          </div>
      {:catch err}
      <p style="color:red">Ocurrió un error con la base de datos</p>
      {/await}

        {#each arrayTipos  as tipo}    
        {#if mostrar === tipo.id_tipo}
          <div class="overlay">
            <div class="popup" >
              <h1>{tipo.nombre}</h1>
              <h1>Piso de {tipo.piso}</h1>
              {#if tipo.techo === 'con_techo'}
                <h1>Techado</h1>
              {:else}
                <h1>Sin techo</h1>
              {/if}
              <button on:click={() => mostrar = 0}>Cerrar</button>
              <button on:click={() => editartipo(tipo.id_tipo)}>Editar</button>
              <button class ="delbtn" on:click={() => borrarTipo(tipo.id_tipo)}>BORRAR</button>
            </div>
          </div>
        {/if}
        {/each}


</div>




<style>
.content{
  margin-top: 70px;
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
.delbtn{
  background-color: rgb(126, 30, 46);
  color: white;
}
.tipos{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  gap: 60px;
}


@media (min-width: 768px) {
  .tipos {
    display: grid;
    justify-items: center;  
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));        
    grid-column-gap: 100px;
    grid-row-gap: 60px;
  }
}
.tipos button{
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
  .tipos button{
    width: 240px;
    height: 150px;
  }
}
@media (min-width: 1024px){
  .tipos button{
    font-size: 30px;
    width: 290px;
    height: 200px;
  }
}


 .accionTipos:hover{
  transform: translateY(-8px);
  cursor:pointer;
  transition: 0.3s;
}

h1{
  size:300px;
  color:white;
  display:flex;
  justify-content: center;
}

  button{
    height:30px;
    border: none;
    cursor: pointer;
  }

  .popup{
    background-color: rgb(30, 2, 97);
    padding: 10px;
    border-radius: 10px;
    width:500px
  }
  .overlay { 
    position:fixed;
    display:flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: #111111b4
  }

</style>