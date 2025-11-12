<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Navbar from '$lib/components/navbar.svelte';
	let mostrar: any = '';
	let arrayTamanios: any[] = []; //en typescript: data va a ser un array de cualquier tipo

	async function getTamanios() {
		const req = await fetch('http://localhost:3000/api/tamanios', { method: 'GET' });
		const res = await req.json();
		arrayTamanios = res.data;
		arrayTamanios.sort((a, b) => a.capacidad_x_equipo - b.capacidad_x_equipo);
		console.log(arrayTamanios); //si la consola devuelve entre {}, es objeto, entre [] es array
	}
	async function borrarTamanio(x: number) {
		if (
			!confirm(
				'¿Estás seguro de que quieres borrar este tamaño? Las canchas que lo contengan quedaran sin un tamaño asignado.'
			)
		) {
			return;
		}
		const respuesta = await fetch(`http://localhost:3000/api/tamanios/${x}`, { method: 'DELETE' });
		goto('/tamanios');
		if (!respuesta.ok) {
			throw new Error('No se pudo borrar el tamanio');
		}
		mostrar = 0;
		window.location.reload();
	}

	async function editarTamanio(x: number) {
		(goto(`/tamanios/edit/${x}`), (mostrar = 0));
	}

	onMount(getTamanios);
</script>

<Navbar></Navbar>

<div class="content">
	<div class="addbtn">
		<button on:click={() => goto('/tamanios/add')}>+</button>
	</div>

	{#await getTamanios()}
		<h1>Cargando tamaños...</h1>
	{:then tamanio}
		{#if arrayTamanios.length === 0}
			<h1>No hay tamaños cargados</h1>
		{:else}
			<h1>Haz click en cada uno para mas información</h1>
			<div class="tamanios">
				{#each arrayTamanios as tamanio}
					<button class="acciontamanio" on:click={() => (mostrar = tamanio.id)}>
						<div class="tamanio-card">
							<h1>F{tamanio.capacidad_x_equipo}</h1>
						</div>
					</button>
				{/each}
			</div>
		{/if}

		{#each arrayTamanios as tamanio}
			<!--Esto detecta que tamaño se tocó, para mostrar el popup-->
			{#if mostrar === tamanio.id}
				<div class="overlay">
					<div class="popup">
						<h1>Equipos de {tamanio.capacidad_x_equipo}</h1>
						<h1>Ancho: {tamanio.ancho} metros</h1>
						<h1>Largo: {tamanio.largo} metros</h1>
						<button class = "cerrar" on:click={() => (mostrar = 0)}>Cerrar</button>
						<button class = "editar" on:click={() => editarTamanio(tamanio.id)}>Editar</button>
						<button class="borrar" on:click={() => borrarTamanio(tamanio.id)}>BORRAR</button>
					</div>
				</div>
			{/if}
		{/each}
	{:catch err}
		<p style="color:red">Ocurrió un error con la base de datos</p>
	{/await}
</div>

<style>
	.content {
		margin-top: 70px;
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


	.delbtn {
		background-color: rgb(126, 30, 46);
		color: white;
	}

	button {
		border: none;
		border-radius: 8px;
		padding: 8px 16px;
		font-size: 16px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s ease-in-out;
	}

	.tamanios {
		display: flex;
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
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			grid-column-gap: 100px;
			grid-row-gap: 60px;
		}
	}
	.tamanios button {
		color: white;
		padding: 5px;
		width: 190px;
		height: 100px;
		background-color: #2c2d83;
		border-radius: 15px;
		transition: 0.3s;
		box-shadow: inset 5px 5px 10px rgba(30, 2, 97, 0.699);
		border: none;
	}
	@media (min-width: 768px) {
		.tamanios button {
			width: 240px;
			height: 150px;
		}
	}
	@media (min-width: 1024px) {
		.tamanios button {
			font-size: 30px;
			width: 290px;
			height: 200px;
		}
	}

	.acciontamanio:hover {
		transform: translateY(-8px);
		cursor: pointer;
		transition: 0.3s;
	}

	h1 {
		size: 300px;
		color: white;
		display: flex;
		justify-content: center;
	}

	.popup {
		background-color: rgb(30, 2, 97);
		padding: 10px;
		border-radius: 10px;
		width: 500px;
	}
	.overlay {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #111111b4;
	}
	.cerrar {
		background-color: #007bff;
		color: white;
	}

	.cerrar:hover {
		background-color: #005ec4;
		transform: translateY(-1px);
	}

	.editar {
		background-color: #00bfa6;
		color: white;
	}

	.editar:hover {
		background-color: #009e89;
		transform: translateY(-1px);
	}

	.borrar {
		background-color: #c62828;
		color: white;
	}

	.borrar:hover {
		background-color: #a32020;
		transform: translateY(-1px);
	}
</style>
