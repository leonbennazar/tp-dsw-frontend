<script>
	import { goto } from "$app/navigation";
	import Navbar from "$lib/components/navbar.svelte";

</script>
<Navbar></Navbar>

<div class= "content">
	
	<div class="container">
	<h1>Mi turno FC</h1>
			<div class="slider">
				<div class="imagenes">
					<img src= "/cancha1.jpg" alt="">
					<img src= "/cancha2.jpeg" alt="">
					<img src= "/cancha3.jpg" alt="">
					<img src= "/cancha4.jpeg" alt="">
				</div>
				
			</div>
			<h3>¡Reservá tu cancha de fútbol en minutos!</h3>
			<nav>
				<button on:click={()=> goto('/about')}>Sobre nosotros</button>
				<button on:click={()=> goto('/canchas')}>Hacé tu reserva</button>
			</nav>

	</div>

</div>



<style>
	.content{
		margin-top: 70px;
		text-align: center;
	}

	.container{
		display:grid;
		justify-content: center;
		align-items: center;
		margin-top: 150px;
	}

	button{
		font-size: 26px;
		background-color:#2c2d83;
		border-radius: 5px;
		border: none;
		color: white;
	}

	button:hover {
    color: #5f69f5;
		cursor: pointer;
	}

	.slider{
		display: flex;
		justify-content: center;
		width: 85vmin;
		top: 50%;
		left:50%;
		overflow:hidden;


	}
	.imagenes{
		width:100%;
		display:flex;
		animation: slide 16s infinite;
	}
	.imagenes img{
		width: 100%;
	}
	nav{
		display: flex;
		justify-content: center;
		margin-top: 20px;
		gap: 30px;
	}
	@keyframes slide{
		0%{transform: translateX(0%)}
		25%{transform: translateX(0%)}
		30%{transform: translateX(-100%)}
		50%{transform: translateX(-100%)}
		55%{transform: translateX(-200%)}
		75%{transform: translateX(-200%)}
		80%{transform: translateX(-300%)}
		100%{transform: translateX(-300%)}
	}

h1, h3{
	color:white
}
</style>