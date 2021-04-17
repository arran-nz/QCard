<svelte:head>
	<title>QCard.link - Contact Sharing</title>
</svelte:head>

<script>
	import ContactCard from '../ContactCard.svelte';
	import CreateForm from '../CreateForm.svelte';
	import AppHeader from '../AppHeader.svelte';
	import Footer from '../Footer.svelte';
	import { fromNothing, fromUrl } from '../plugins/qcardFactory';
	import { onMount } from 'svelte';

	let existingQCard;
	let qCard = fromNothing()

	// sleep time expects milliseconds
	function sleep (time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	function onFormSubmitted(event) {
		qCard = event.detail.qCard;
		// Must wait until the DOM object is rendered before scrolling.
		sleep(50).then(() => {
			document.getElementById("created-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
		});
	}

	onMount(() => {
		let qCardFromUrl = fromUrl(window.location.href.toString())
		if (qCardFromUrl == undefined) return
		if (qCardFromUrl.name != "") {
			existingQCard = qCardFromUrl
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
			{#if existingQCard}
				<CreateForm {existingQCard} on:Submitted={e => onFormSubmitted(e)} />
			{:else}
				<CreateForm on:Submitted={e => onFormSubmitted(e)}  />
			{/if}

		</div>

		{#if qCard.name != undefined}
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
