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

	let vCardObj = {};
	let vCardString;

	// Reactive to any variable changes in this component
	$: {

		setVCardProperty("n", name);
		setVCardProperty("title", title);
		setVCardProperty("email", email);
		setVCardProperty("tel", phone);
		setVCardProperty("url", website);
		setVCardProperty("note", comment);
		
		vCardString = generateVCardString(
			vCardObj,
			false
		);
	};

	function setVCardProperty(key, value){
		vCardObj[key] = [
			{
				'value': value,
			}
		]		
	};

	function setVCardPropertyByMeta(key, metaName, value){
		var new_object = {
			'value': value,
			'meta': {
				"type":[ metaName ]
			}
		};

		// Does the item have `key`,
		// and is that item an array?
		if (vCardObj.hasOwnProperty(key) 
			&& Array.isArray(vCardObj[key])) {

				// Loop over each key
				for (var index in vCardObj[key]){
					
					var element = vCardObj[key][index];

					// Has the match been found
					var found = false;
					// Loop over each meta type
					for (var typeIndex in element.meta.type){
						var type = element.meta.type[typeIndex];
						// If the type matches the specced metaName, set the value.
						if (type == metaName){
							element.value = value;
							found = true;
						}
					} 
				} 
				// If a match has not been found, push the new object into the array.
				if (!(found)){
					vCardObj[key].push(new_object);
				}
			}
		else{
			// If the vCardObject does not have the `key`
			// Fill it with an array of one object.
			vCardObj[key] = [new_object];
		}
	};

</script>


<article class="contact-card">

	{#if vCardString}
		<QRCode dataToEncode = {vCardString}/>
	{/if}

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