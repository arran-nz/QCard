<style>
	#card {
		display: flex;
		flex-direction: column;

		padding: 20px;
		border-radius: 5px;

		-webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
		-moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
		color: #2f363d;
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
		margin: 10px 0;
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
		list-style-type: none;
		padding: 0;
	}

	ul.contact-copy li {
		font-weight: 400;
		letter-spacing: 2px;

		margin: 5px 0;
		padding: 10px;

		background-color: whitesmoke;
		border-radius: 5px;
		border: 1px solid #ccc;

		font-size: 0.8em;
	}

	ul.contact-copy li img{
		float: right;
		height: 20px;
	}

	a {
		font-size: 1.2em;
		color:inherit;
  	}

	a img {
		transition: all 0.1s ease-in-out;
	}
	a:hover img{
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

		border: 0;
		border-radius: 5px;

		cursor: pointer;
	}

	button.download {
		background-color: #D64550;
	}


	.create-footer-link {
		margin: 1em;
		display:block;
		font-size: 0.8em;
		font-weight: 300;
		text-align: right;
	}

	.create-footer-link strong {
		color: #D64550;
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
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.contact-method-item {
		padding: 10px;
		border-top: 2px solid whitesmoke;
	}

	.contact-method-item:first-child
	{
		border: none;
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
		var n = ["", name, "", "", ""];
		setVCardProperty("fn", name);
		setVCardProperty("n", n);
		setVCardProperty("title", title);
		setVCardProperty("email", email);
		setVCardProperty("tel", phone);
		setVCardProperty("url", website);
		setVCardProperty("note", comment);
		setVCardProperty("adr", address);

		vCardString = generateVCardString(
			vCardObj,
			true
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
		<a href={selfLink} alt="QCard URL">
			<QRCode dataToEncode = {selfLink}/>
		</a>
	</div>
	{:else}
		<ul class="contact-copy">

			{#if email}
			<li>
				{email}
				<img src="/icons/copy.svg" alt="Copy Icon"/>
			</li>
			{/if}

			{#if phone}
			<li>
				{phone}
				<img src="/icons/copy.svg" alt="Copy Icon"/>
			</li>
			{/if}

			{#if website}
			<li>
				{website}
				<img src="/icons/copy.svg" alt="Copy Icon"/>
			</li>
			{/if}

			{#if address}
			<li>
				{address}
				<img src="/icons/copy.svg" alt="Copy Icon"/>
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
					<img src="/icons/inbox.svg" alt="Email Icon"/>
				</a>
			</div>
			{/if}

			{#if phone}
			<div class="contact-method-item">
				<a href="tel:{phone}" alt={phone}>
					<img src="/icons/phone.svg" alt="Phone Icon"/>
				</a>
			</div>
			{/if}

			{#if website}
			<div class="contact-method-item">
				<a href={website} target="_blank" alt="Website provided by {name}">
					<img src="/icons/link.svg" alt="External Link Icon"/>
				</a>
			</div>
			{/if}

			{#if address}
			<div class="contact-method-item">
				<a href="https://www.openstreetmap.org/search?query={address}" target="_blank" alt="{address}">
					<img src="/icons/map-pin.svg" alt="Location icon"/>
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
		<button on:click={ShareQCard} alt="Share this QCard's URL" class="share">
			<img src="/icons/share.svg" alt="Share Icon"/>
		</button>
		{:else}
		<button on:click={CopySelfLink} alt="Copy the URL of this QCard" class="copy">
			<img src="/icons/copy.svg" alt="Copy Icon"/>
		</button>
		{/if}

		<button on:click={DownloadVCard} class="download" alt="Download the VCard">
			<img src="/icons/download.svg" alt="Download Icon"/>
		</button>

	</div>

</div>

	{#if loadedExternalVCard}
		<div class="create-footer-link" in:fly="{{ y: -20, duration: 600, delay:800, easing: backOut}}">
			<a href={baseUrl}>Create your own <strong>QCard</strong></a>
		</div>
	{/if}

</article>


