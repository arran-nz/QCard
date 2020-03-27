<style>
	article {
		padding: 1em;
		border-radius: 5px;

		-webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
		-moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);

		margin: 0 auto;
		max-width: 420px;
		min-width: 250px;
	}

	h1 {
		text-align: center;
		margin: 0;
		font-size: 3em;
		line-height: 0.9em;

	}

	h2 {
		text-align: center;
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

	#comment {
		padding: 5px 0px;
		border-left: 5px solid whitesmoke;
	}

	#comment p {
		margin: 5px 10px;
	}

	hr {
		border: 1px solid whitesmoke;
		margin: 1em;
	}

	.contact-info {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	.info-slot {
		margin: 15px;
	}

	.info-slot svg{
		min-width: 20px;
		max-width: 45px;
		width: 8vw;
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

<article>
  {#if vCardString}
		<QRCode dataToEncode = {vCardString}/>
	{/if}

	<header>
    <hr>
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

				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<g data-name="Layer 2">
					<g data-name="email">
						<rect width="24" height="24" opacity="0" />
						<path
						d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3
						3 0 0 0-3-3zm0 2l-6.5 4.47a1 1 0 0 1-1 0L5 6z" />
					</g>
					</g>
				</svg>

			</a>
		</div>
		{/if}

		{#if phone}
		<div class="info-slot">
			<a href="tel:{phone}">

				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<g data-name="Layer 2">
						<g data-name="phone-call">
							<rect width="24" height="24" opacity="0" />
							<path d="M13 8a3 3 0 0 1 3 3 1 1 0 0 0 2 0 5 5 0 0 0-5-5 1 1 0 0 0 0 2z" />
							<path d="M13 4a7 7 0 0 1 7 7 1 1 0 0 0 2 0 9 9 0 0 0-9-9 1 1 0 0 0 0 2z" />
							<path
								d="M21.75 15.91a1 1 0 0 0-.72-.65l-6-1.37a1 1 0 0 0-.92.26c-.14.13-.15.14-.8 1.38a9.91 9.91 0 0 1-4.87-4.89C9.71 10 9.72 10 9.85 9.85a1 1 0 0 0 .26-.92L8.74 3a1 1 0 0 0-.65-.72 3.79 3.79 0 0 0-.72-.18A3.94 3.94 0 0 0 6.6 2 4.6 4.6 0 0 0 2 6.6 15.42 15.42 0 0 0 17.4 22a4.6 4.6 0 0 0 4.6-4.6 4.77 4.77 0 0 0-.06-.76 4.34 4.34 0 0 0-.19-.73z" />
						</g>
					</g>
				</svg>

			</a>
		</div>
		{/if}

		{#if website}
		<div class="info-slot">
			<a href={website} target="_blank" alt="Website provided by {name}">

				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<g data-name="Layer 2">
						<g data-name="external-link">
							<rect width="24" height="24" opacity="0" />
							<path
								d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z" />
							<path
								d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z" />
						</g>
					</g>
				</svg>

			</a>
		</div>
		{/if}
	
	</div>

  {#if comment}
  <div id="comment">
    <p>{comment}</p>
  </div>
	{/if}

</article>
