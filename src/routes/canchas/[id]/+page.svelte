<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import NavBar from '$lib/components/navbar.svelte';
	$: id = $page.params.id;
	let canchaRecibida: any = '';

	let fechaSelec = new Date();

	async function getCancha() {
		const req = await fetch(`http://localhost:3000/api/canchas/${id}`, { method: 'GET' });
		const res = await req.json();
		canchaRecibida = res.data;
		console.log(canchaRecibida);
	}

	async function borrarCancha() {
		if (!confirm('¿Estás seguro de que quieres borrar esta cancha?')) {
			return;
		}
		const respuesta = await fetch(`http://localhost:3000/api/canchas/${id}`, { method: 'DELETE' });
		goto('/canchas');
		if (!respuesta.ok) {
			throw new Error('No se pudo borrar la cancha');
		}
	}

	async function reservar(turno_id: number) {
		await fetch('http://localhost:3000/api/reservas', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				cancha: id,
				turno: turno_id,
				fecha_reserva: fechaSelec,
				estado_reserva: 'pendiente'
			})
		});
	}


</script>

<NavBar />

<div class="content">
	<button class="backbtn" on:click={() => history.back()}>Volver</button>
	{#await getCancha()}
		<h1>Cargando cancha...</h1>
	{:then cancha}
		<button class="editbtn" on:click={() => goto(`/canchas/edit/${id}`)}>Editar</button>
		<button class="delbtn" on:click={() => borrarCancha()}>BORRAR</button>

		<div class="listadoTurnos">
			<label><input type="date" name="fecha" bind:value={fechaSelec} /></label>
        {#each canchaRecibida.turnos as turno}
          <h1>
            {turno.hora_ini}<button class="addReservabtn" on:click={() => reservar(turno.id)}
              >+</button
            >
          </h1>
        {/each}
		</div>
		<div class="canchaData">
			<div class="columna">
				<h2>Cancha</h2>
				<h1>{canchaRecibida.numero}</h1>
				<h3>"{canchaRecibida.nombre}"</h3>
				{#if canchaRecibida.tamanio === null}
					<p>• Sin tamaño</p>
				{:else}
					<p>• Futbol {canchaRecibida.tamanio.capacidad_x_equipo}</p>
				{/if}
				{#if canchaRecibida.tipo === null}
					<p>• Sin tipo</p>
				{:else}
					<p>• {canchaRecibida.tipo.nombre}</p>
				{/if}
			</div>
		</div>

		<div class="listadoTurnos">
			{#each canchaRecibida.turnos as turnos}
				<h1>{turnos.hora_ini}</h1>
			{/each}
		</div>
	{:catch err}
		<p style="color:red">Hubo un problema con la base de datos</p>
	{/await}
</div>

<style>
	.listadoTurnos {
		display: grid;
		grid-column-gap: 10px;
		grid-row-gap: 6px;
	}
	.content {
		margin-top: 70px;
	}
	.columna h2 {
		color: white;
		font-size: large;
		font-size: 40px;
	}
	.columna h1,
	h3 {
		color: white;
		margin-top: -10px;
		align-items: center;
	}
	.columna h1 {
		font-size: 60px;
	}
	.columna p {
		color: white;
	}
	button {
		height: 30px;
	}
	button:hover {
		cursor: pointer;
	}

	.delbtn {
		background-color: rgb(126, 30, 46);
		color: white;
	}

	.canchaData {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
	}
	.columna {
		position: absolute;
		left: 0;
		display: flex;
		height: 100%;
		flex-direction: column;
		align-items: center;
		padding: 10px;
		background-color: #2c2d83;
	}
</style>
