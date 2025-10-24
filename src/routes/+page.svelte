<script>
	import { goto } from "$app/navigation";
	import Navbar from "$lib/components/navbar.svelte";

</script>
<Navbar></Navbar>

<div class= "content">
	
	<div class="container">
		<button on:click={()=> goto('/about')}>Sobre nosotros</button>
	</div>

</div>



<style>
	.content{
		margin-top: 70px;
	}

	.container{
		display:flex;
		justify-content: center;
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
  }

</style>