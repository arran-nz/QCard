<style>
	#card {

		display: flex;
		flex-direction: column;

		padding: 3vw;
		
		border-radius: 5px;

		-webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
		-moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
	}
	h1, h2 {
		text-align: left;

	}

	h1 {
		margin: 0;
		font-size: 2.5em;
		line-height: 0.9em;

	}

	h2 {
		font-size: 1.2em;
		margin: 0;
		color: #606c76;
	}

	hr {
		border: 1px solid whitesmoke;
		margin: 2vh 0;
	}


	@media all and (min-width: 800px) {
		#card {
			padding: 20px;
		}

		h1 {
			font-size: 3em;
		}

		h2 {
			font-size: 1.5em;
		}

		hr {
			margin: 20px 0;
		}
	}


	header {
		margin-bottom: 10px;
	}

	p {
		font-size:1em;
	}

	#comment {
		padding: 5px 0px;
		border-left: 7px solid whitesmoke;
	}

	#comment p {
		margin: 5px 10px;
	}



	/* Contact Copying */
	ul.contact-copy {
		margin: 1em;
		list-style-type: none;
		padding: 0;

	}

	ul.contact-copy li {
		font-weight: 400;
		letter-spacing: 2px;

		margin: 0.5em 0;
		padding: 0.5em;

		background-color: whitesmoke;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	ul.contact-copy li svg{
		float: right;
		height: 20px;
		fill: #606c76;
	}

	a {
		font-size: 1.2em;
		color:inherit;
  	}


	a:hover svg{
		fill: #ff3e00;
		transform: scale(1.25);
	}

	div.button-container {
		display: flex;
		justify-content: flex-end;

	}

	button {
		margin: 0 5px;
		padding: 5px 30px;
		font-weight: 600;
		font-size: 1em;

		border: 0;
		border-radius: 5px;

		cursor: pointer;
	}

	button svg {
		min-width: 15px;
		max-width: 25px;
		width: 8vw;
	}

	button.download {
		background-color: #ff3e00;
		color: white;
	}

	button.download svg {
		fill: white;
	}



	.create-footer-link {
		margin: 1em;
		display:block;
		font-size: 0.8em;
		font-weight: 300;
		text-align: right;
	}

	.create-footer-link strong {
		color: #ff3e00;
		font-weight: 600;
	}
	
	/*Contact Info*/

	.contact-meta {
		display:flex;
		flex-direction: column;
		justify-content: space-evenly

	}

	.contact-info-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

	}

	.contact-methods {
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.contact-method-item {
		margin: 0.5em;
	}

	.contact-method-item svg{
		min-width: 25px;
		max-width: 35px;
		width: 8vw;
		transition-duration: 0.3s;
	}

</style>

<script>
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	import Toast from 'svelte-toast'

	import QRCode from './QRCode.svelte';
	import { generateVCardString } from './plugins/vcard.js';

	export let name;
	export let title;
	export let email
	export let phone;
	export let website;
	export let comment;
	export let address;

	export let loadedExternalVCard;

	let showRawData = false;

	let vCardObj = {};
	let vCardString;

	let baseUrl = window.location.href.split('?')[0];
	let selfLink;

	// Reactive to any variable changes in this component
	$: {

		setVCardProperty("n", name);
		setVCardProperty("title", title);
		setVCardProperty("email", email);
		setVCardProperty("tel", phone);
		setVCardProperty("url", website);
		setVCardProperty("note", comment);
		setVCardProperty("adr", address);

		vCardString = generateVCardString(
			vCardObj,
			false
		);

		selfLink = getSelfLink();
	};

	function setVCardProperty(key, value){
		vCardObj[key] = [
			{
				'value': value,
			}
		]
	};

	function getSelfLink(){
		var encodedVCard = encodeData(vCardString);
		var selfLink = baseUrl + "?v=" + encodedVCard;
		return selfLink;
	}

	function encodeData(str) {
		return window.btoa(unescape(encodeURIComponent(str)));
	}

	function DownloadVCard(){
		var fileName = name + ".vcf";
		var downloadElement = document.createElement("a");
		downloadElement.setAttribute("href", "data:text/vcard:charset=utf-8," + encodeURIComponent(vCardString));
		downloadElement.setAttribute("download", fileName);
		downloadElement.style.display = "none";

		document.body.appendChild(downloadElement);
		downloadElement.click();
		document.body.removeChild(downloadElement);
	}

	function ShareQCard(){
		if (navigator.share) {
			navigator.share({
				title: name + "'s QCard'",
				text: "Here's " + {name} + "'s contact information",
				url: selfLink,
			})
				.then(() => console.log('Successful share'))
				.catch((error) => console.log('Error sharing', error));
		}
	}

	function CopySelfLink(){
		// Thank you the World Wide Web <3
		// https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/
		// Create new element
		var el = document.createElement('textarea');
		// Set value (string to be copied)
		el.value = selfLink;
		// Set non-editable to avoid focus and move outside of view
		el.setAttribute('readonly', '');
		el.style = { display: 'none', position: 'absolute'};
		document.body.appendChild(el);
		// Select text inside element
		el.select();
		// Copy text to clipboard
		document.execCommand('copy');
		// Remove temporary element
		document.body.removeChild(el);

		// Display Toast Notification to User.
		var toast = new Toast();
		toast.success('QCard URL Copied');

	}

</script>

<article in:fly="{{ x: -100, duration: 600, easing: backOut }}">
<div id="card">
  	{#if selfLink && !showRawData}

	<div class="qrcode-container">
		<a href={selfLink} alt="QRCard URL">
			<QRCode dataToEncode = {selfLink}/>
		</a>
	</div>
	{:else}
		<ul class="contact-copy">

			{#if name}
			<li>
				{name}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="copy"><rect width="24" height="24" opacity="0"/><path d="M18 9h-3V5.67A2.68 2.68 0 0 0 12.33 3H5.67A2.68 2.68 0 0 0 3 5.67v6.66A2.68 2.68 0 0 0 5.67 15H9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3zm-9 3v1H5.67a.67.67 0 0 1-.67-.67V5.67A.67.67 0 0 1 5.67 5h6.66a.67.67 0 0 1 .67.67V9h-1a3 3 0 0 0-3 3z"/></g></g></svg>
			</li>
			{/if}

			{#if email}
			<li>
				{email}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="copy"><rect width="24" height="24" opacity="0"/><path d="M18 9h-3V5.67A2.68 2.68 0 0 0 12.33 3H5.67A2.68 2.68 0 0 0 3 5.67v6.66A2.68 2.68 0 0 0 5.67 15H9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3zm-9 3v1H5.67a.67.67 0 0 1-.67-.67V5.67A.67.67 0 0 1 5.67 5h6.66a.67.67 0 0 1 .67.67V9h-1a3 3 0 0 0-3 3z"/></g></g></svg>
			</li>
			{/if}

			{#if phone}
			<li>
				{phone}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="copy"><rect width="24" height="24" opacity="0"/><path d="M18 9h-3V5.67A2.68 2.68 0 0 0 12.33 3H5.67A2.68 2.68 0 0 0 3 5.67v6.66A2.68 2.68 0 0 0 5.67 15H9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3zm-9 3v1H5.67a.67.67 0 0 1-.67-.67V5.67A.67.67 0 0 1 5.67 5h6.66a.67.67 0 0 1 .67.67V9h-1a3 3 0 0 0-3 3z"/></g></g></svg>
			</li>
			{/if}

			{#if website}
			<li>
				{website}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="copy"><rect width="24" height="24" opacity="0"/><path d="M18 9h-3V5.67A2.68 2.68 0 0 0 12.33 3H5.67A2.68 2.68 0 0 0 3 5.67v6.66A2.68 2.68 0 0 0 5.67 15H9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3zm-9 3v1H5.67a.67.67 0 0 1-.67-.67V5.67A.67.67 0 0 1 5.67 5h6.66a.67.67 0 0 1 .67.67V9h-1a3 3 0 0 0-3 3z"/></g></g></svg>
			</li>
			{/if}
		</ul>
	{/if}

	<hr>

	<!-- BEGIN-->

	<div class="contact-info-container">

		<div class="contact-meta">

			<header>
				<h1>
					{name}
				</h1>
				{#if title}
				<h2>{title}</h2>
				{/if}
			</header>
			
			{#if address}
			<div id="address">
				<p>{address}</p>
			</div>
			{/if}

			{#if comment}
			<div id="comment">
				<p>{comment}</p>
			</div>
			{/if}
		</div>


		{#if email || phone || website}
		<div class="contact-methods">
			{#if email}
			<div class="contact-method-item">
				<a href="mailto:{email}" alt="{email}" target="_blank">

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
			<div class="contact-method-item">
				<a href="tel:{phone}" alt={phone}>

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
			<div class="contact-method-item">
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
		{/if}

	</div>


	<!-- STOP-->

	<hr>

	<div class="button-container">

		{#if navigator.share}
		<button on:click={ShareQCard} alt="Share this QCard's URL" data-clipboard-text="Just because you can doesn't mean you should — clipboard.js">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<g data-name="Layer 2">
					<g data-name="share">
						<rect width="24" height="24" opacity="0" />
						<path
							d="M18 15a3 3 0 0 0-2.1.86L8 12.34V12v-.33l7.9-3.53A3 3 0 1 0 15 6v.34L7.1 9.86a3 3 0 1 0 0 4.28l7.9 3.53V18a3 3 0 1 0 3-3z" />
					</g>
				</g>
			</svg>
		</button>
		{:else}
			<button on:click={CopySelfLink} alt="Copy the URL of this QCard">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="copy"><rect width="24" height="24" opacity="0"/><path d="M18 9h-3V5.67A2.68 2.68 0 0 0 12.33 3H5.67A2.68 2.68 0 0 0 3 5.67v6.66A2.68 2.68 0 0 0 5.67 15H9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3zm-9 3v1H5.67a.67.67 0 0 1-.67-.67V5.67A.67.67 0 0 1 5.67 5h6.66a.67.67 0 0 1 .67.67V9h-1a3 3 0 0 0-3 3z"/></g></g></svg>
			</button>
		{/if}

		<button on:click={DownloadVCard} class="download" alt="Download the VCard">

			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<g data-name="Layer 2">
					<g data-name="download">
						<rect width="24" height="24" opacity="0" />
						<rect x="4" y="18" width="16" height="2" rx="1" ry="1" />
						<rect x="3" y="17" width="4" height="2" rx="1" ry="1" transform="rotate(-90 5 18)" />
						<rect x="17" y="17" width="4" height="2" rx="1" ry="1" transform="rotate(-90 19 18)" />
						<path
							d="M12 15a1 1 0 0 1-.58-.18l-4-2.82a1 1 0 0 1-.24-1.39 1 1 0 0 1 1.4-.24L12 12.76l3.4-2.56a1 1 0 0 1 1.2 1.6l-4 3a1 1 0 0 1-.6.2z" />
						<path d="M12 13a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z" />
					</g>
				</g>
			</svg>
		</button>

	</div>

</div>

	{#if loadedExternalVCard}
		<div class="create-footer-link" in:fly="{{ y: -20, duration: 600, delay:800, easing: backOut}}">
			<a href={baseUrl}>Create your own <strong>QCard</strong></a>
		</div>
	{/if}

</article>


