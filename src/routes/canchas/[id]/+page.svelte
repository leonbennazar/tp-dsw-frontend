<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import NavBar from '$lib/components/navbar.svelte';
	$: id = $page.params.id;
	let canchaRecibida: any = '';

	let fechaSelec = new Date();
	const ahoraFecha = new Date();
	let fechaHoy = ahoraFecha.toISOString().slice(0,10);
	const horaActual = ahoraFecha.getHours();
	const minutoActual = ahoraFecha.getMinutes(); 

function desamarcarTurnos(horaturno: string) {
	if (new Date(fechaSelec).toISOString().slice(0,10) === fechaHoy) {
				const [horaTurno, minutoTurno] = horaturno.split(':').map(Number);
				if (horaTurno < horaActual) {
					return true;
				} else if (horaTurno === horaActual && minutoTurno < minutoActual) {
					return true;
				}														
			;
		}
		return false;
		
	}
	async function getCancha() {
		const req = await fetch(`http://localhost:3000/api/canchas/${id}`, { method: 'GET' });
		const res = await req.json();
		canchaRecibida = res.data;
		console.log(canchaRecibida);
	}

	async function borrarCancha() {
		if (!confirm('¿Estás seguro de que queres borrar esta cancha?')) {
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
		if (!confirm('¿Estás seguro de que queres cancelar esta reserva?')) {
			return;
		}
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
	{#await getCancha()}
		<h1>Cargando cancha...</h1>
	{:then cancha}
		<div class="acciones">
			<button class="btn volver" on:click={() => history.back()}>Volver</button>
			<button class="btn editar" on:click={() => goto(`/canchas/edit/${id}`)}>Editar</button>
			<button class="btn borrar" on:click={() => borrarCancha()}>Borrar</button>
		</div>

		<div class="listadoTurnos">
			<label><input type="date" name="fecha" bind:value={fechaSelec} min={fechaHoy} /></label>
        {#each canchaRecibida.turnos as turno}
			{#if new Date(ahoraFecha).toISOString().slice(0,10) === new Date(fechaSelec).toISOString().slice(0,10) && desamarcarTurnos(turno.hora_ini)}
			<h1 class= "reservado">
				{turno.hora_ini}<button class="NoSePuede"
					>No disponible</button
				>
			</h1>
			{:else if !canchaRecibida.reservas?.some((r: { turno: any; fecha_reserva: any; estado_reserva: any }) => r.turno === turno.id 
			&& new Date(r.fecha_reserva).toISOString().slice(0,10) === new Date(fechaSelec).toISOString().slice(0,10)
			&& r.estado_reserva === 'pendiente')}
			<h1>
				{turno.hora_ini}<button class="addReservabtn" on:click={() => reservar(turno.id)}
					>Resevar</button
				>
			</h1>
			{:else}
			<h1 class= "reservado">
				{turno.hora_ini}<button class="delReservabtn" on:click={() => cancelarReserva(turno.id, fechaSelec)}
					>-</button
				>
			</h1>
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
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin: 30px auto;
	background-color: rgba(255, 255, 255, 0.05);
	padding: 15px;
	border-radius: 10px;

}


@media (min-width: 1024px) {
	.listadoTurnos {
		flex-direction: row;
		width: fit-content;
		margin: auto;
	}
}
.addReservabtn {
	position: relative;
	background-color: #00b894;
	color: white;
	border: none;
	border-radius: 50%;
	width: 100px;
	height: 30px;
	font-size: 18px;
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	margin-left:10px;
}

.addReservabtn:hover {
	transform: scale(1.1);
	box-shadow: 0 0 10px rgba(0, 184, 148, 0.6);
}
.reservado{
	color:grey
}

h1{
	color:white
}

.delReservabtn {
	background-color: #c62828;
	color: white;
	border: none;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	font-size: 18px;
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	margin-left:10px;
}

.delReservabtn:hover {
	transform: scale(1.1);
	box-shadow: 0 0 10px #a32020;
}
.NoSePuede {
	background-color: #4d4d4d;
	color: white;
	border: none;
	border-radius: 50%;
	width: 130px;
	height: 30px;
	font-size: 18px;
	cursor: not-allowed;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	margin-left:10px;
}





	.content {
		margin-top: 70px;
		display: flex;
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


	.acciones {
		display: flex;
		gap: 10px;
		margin-top: 0px;
		position: absolute;

	}

	.btn {
		border: none;
		border-radius: 8px;
		padding: 8px 16px;
		font-size: 16px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s ease-in-out;
	}

	.volver {
		background-color: #007bff;
		color: white;
	}

	.volver:hover {
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
		margin-top:30px
	}
h1{
	cursor: default;
}
</style>
