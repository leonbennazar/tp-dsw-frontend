<script>
	import { goto } from "$app/navigation";
	import Navbar from "$lib/components/navbar.svelte";

</script>
<Navbar></Navbar>

<div class= "content">
	
	<div class="container">
	
			<div class="slider">
				<div class="imagenes">
					<img src= "/cancha1.jpg" alt="">
					<img src= "https://www.paralimpicos.es/sites/default/files/inline-images/Futbol5_Espa%C3%B1a%20Argentina%203%C2%BA%20y%204%C2%BA%20puesto_03.jpg" alt="">
					<img src= "https://media.lacapital.com.ar/p/d43ec43b5d6a529c412ab317534676d7/adjuntos/204/imagenes/029/953/0029953122/1200x675/smart/futbol-5jpg.jpg" alt="">
					<img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3It7Pvx8N0nr8GLlfBbkpTWa5F3IaiM_xjw&s" alt="">
				</div>
				
			</div>

			<nav>
				<button on:click={()=> goto('/about')}>Sobre nosotros</button>
				<button on:click={()=> goto('/canchas')}>Hacé tu reserva</button>
			</nav>

	</div>

</div>



<style>
	.content{
		margin-top: 70px;
	}

	.container{
		display:grid;
		justify-content: center;
		align-items: center;
		margin-top: 150px;
	}

	button{
		font-size: 20px;
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

</style>