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
		await getCancha(); // Actualiza los datos después de reservar
	}

	async function cancelarReserva(turno_id: number, fecha: Date) {
		const reserva = canchaRecibida.reservas.find((r: any) => 
			r.turno === turno_id && 
			new Date(r.fecha_reserva).toISOString().slice(0, 10) === new Date(fecha).toISOString().slice(0, 10) &&
			r.estado_reserva === 'pendiente'
		);

		await fetch(`http://localhost:3000/api/reservas/${reserva.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				estado_reserva: 'cancelada'
			})
		});

		await getCancha();
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
									{#if !canchaRecibida.reservas?.some((r: { turno: any; fecha_reserva: any; estado_reserva: any }) => r.turno === turno.id 
									&& new Date(r.fecha_reserva).toISOString().slice(0,10) === new Date(fechaSelec).toISOString().slice(0,10)
									&& r.estado_reserva === 'pendiente')}
									<!--la funcion transforma la fecha a string y solo evalua los primeros 10 digitos, osea el formato yyyymmdd, 
									tambien analiza que el estado no sea pendiente, es decir que muestra disponible un turno que haya sido reservado y luego cancelado-->
									<h1>
										{turno.hora_ini}<button class="addReservabtn" on:click={() => reservar(turno.id)}
											>+</button
										>
									</h1>
									{:else}
										{turno.hora_ini}<button class="delReservabtn" on:click={() => cancelarReserva(turno.id, fechaSelec)}
											>-</button
										>
									{/if}
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


	{:catch err}
		<p style="color:red">Hubo un problema con la base de datos</p>
	{/await}
</div>



<style>
	/*cambios*/
.listadoTurnos {
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin: 30px auto;
	background-color: rgba(255, 255, 255, 0.05);
	padding: 15px;
	border-radius: 10px;
	width: fit-content;
}

.backbtn {
	background-color: #0984e3;
	color: white;
	border: none;
	border-radius: 5px;
	padding: 8px 12px;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	margin-top: 10px;
}

.addReservabtn {
	background-color: #00b894;
	color: white;
	border: none;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	font-size: 18px;
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.addReservabtn:hover {
	transform: scale(1.1);
	box-shadow: 0 0 10px rgba(0, 184, 148, 0.6);
}
/*cambios*/

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
