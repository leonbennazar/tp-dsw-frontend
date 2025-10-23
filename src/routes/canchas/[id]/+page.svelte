<script lang="ts">
  import { page } from '$app/stores';
  import NavBar from '$lib/components/navbar.svelte'
  $: id = $page.params.id;


  $: promise = fetch(`https://api.attackontitanapi.com/titans/${id}`)
    .then(res => res.json());
</script>

{#await promise}
  <p>Cargando cancha...</p>
{:then cancha}
<h1>{cancha.name}</h1>
{:catch err}
  <p style="color:red">No se encontro la cancha</p>
{/await}

