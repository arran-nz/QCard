<style>

	article {
		margin: 1em;
		padding: 1em;
		/* border: 1px solid black; */
		border-radius: 5px;

		-webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
		-moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
	}

	h1 {
		margin: 0;
		font-size: 3em;
		line-height: 0.9em;

	}

	h2 {
		margin: 0;
		color: #606c76;
	}

	header {
		margin-bottom: 0.5em;
	}

	a {
		font-size: 1.2em;
		color:inherit;
	}

	a:hover{
		color: #ff3e00;
	}

	p {
		font-size:1em;
	}

    hr {
        border: 1px solid whitesmoke;
        margin: 1em;
    }

	.contact-info {
		height: 150px;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	.info-slot {
		/* display: flex;
		flex-direction: row;
		justify-content: space-evenly; */
	}

</style>

<script>
	import QRCode from './QRCode.svelte';
	import { generateVCardString } from './plugins/vcard.js';

	export let name;
	export let title;
	export let email
	export let phone;
	export let website;
	export let comment;

	// Remove the protocol from the address
	let websiteDisplay = website.replace(/(^\w+:|^)\/\//, '');

	let vCardString;
	$: {
		console.log("Updated vCard String");
		vCardString = generateVCardString(
			{
				"n": [
					{
						'value': name,
					}
				]
			},
			true
		);
	}

</script>


<article class="contact-card">

	<QRCode dataToEncode = {vCardString}/>

	<header>

		<h1>
			{name}
		</h1>

		{#if title}
		<h2>{title}</h2>
		{/if}

	</header>


	<div class="contact-info">

		{#if email}
		<div class="info-slot">
			<a href="mailto:{email}">
				{email}
			</a>
		</div>
		{/if}

		{#if phone}
		<div class="info-slot">
			<a href="tel:{phone}">
				{phone}
			</a>
		</div>
		{/if}

		{#if website}
		<div class="info-slot">
			<a href={website} target="_blank" alt="Website provided by {name}">{
				websiteDisplay}
			</a>
		</div>

		{/if}
	
	</div>

	{#if comment}
	<hr>
	<p>{comment}</p>
	{/if}
	
</article>