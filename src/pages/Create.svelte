<svelte:head>
	<title>QCard.link - Contact Sharing</title>
</svelte:head>

<script>
	import ContactCard from '../ContactCard.svelte';
	import CreateForm from '../CreateForm.svelte';
	import AppHeader from '../AppHeader.svelte';
	import Footer from '../Footer.svelte';
	import { fromUrl } from '../plugins/qcardFactory';
	import { onMount } from 'svelte';
	import { writable} from 'svelte/store';
	import { fromNothing } from '../plugins/qcardFactory'

	let qCard = fromNothing()
	let existingQCard;

	// sleep time expects milliseconds
	function sleep (time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	onMount(() => {
		existingQCard = fromUrl(window.location.href.toString())
		if (existingQCard != undefined){
			qCard = existingQCard
		}
	})


</script>

<article>

	<div id="app-header" class="mx-auto">
		<AppHeader/>
	</div>
	<div class="flex-container mx-auto limit-width">
		<div id="create-form" class="mx-auto limit-width">
			<CreateForm
				{existingQCard}

				on:Submitted = { 
					event =>
					{
						qCard = event.detail.qCard;
						// Must wait until the DOM object is rendered before scrolling.
						sleep(50).then(() => {
							document.getElementById("created-card").scrollIntoView({ behavior: "smooth", block: "center" });
						});

					}
				}
			/>
		</div>

		{#if qCard.name != ""}
		<div class="spacer" />
		<div id="created-card" class="mx-auto">
			<ContactCard {qCard}/>
		</div>
		{/if}
	</div>

</article>

<hr>

<Footer />

<style>

	hr {
		margin: 4em 0;
	}

	.spacer {
		padding: 0.5em;
	}

	#created-card{
		flex:0.5;
		align-self: center;

		max-width: 420px;
	}

	#create-form {
		flex:1;
		width:100%;
	}
		
</style>
