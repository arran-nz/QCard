<style>
	article {
		display: flex;
		flex-direction: column;
		padding: 1em;

		border-radius: 5px;
	}

	h1 {
		color: #2f363d;
		margin: 0;
		line-height: 0.9em;
	}

	h2 {
		font-size: 1.2em;
		margin: 0;
	}

	header {
		margin-bottom: 10px;
	}
	
	#comment {
		padding: 5px 0px;
		border-left: 7px solid whitesmoke;
		overflow: hidden;
	}

	#comment p {
		margin: 5px 10px;
		font-size: 1em;
		word-break: break-all;
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
		padding: 0.2em 1.5em;
		font-weight: 600;

		border: 0;
		border-radius: 5px;

		cursor: pointer;

		transition: all 0.1s ease-in;
		background-color: whitesmoke;
	}

	button.download {
		background-color: #D64550;
	}

	button.edit {
		padding: 0.2em 0.5em;
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

	.contact-method-item img {
		width:24px;
		height: 24px;
	}

	.contact-method-item:first-child
	{
		border: none;
	}

</style>

<script>
	import Toast from 'svelte-toast'
	import QRCode from './QRCode.svelte'
	import { navigate } from "svelte-routing";

	export let qCard;
	$: selfLink = `https://qcard.link${qCard.toViewUrl()}`

	function downloadVCard(){
		var fileName = qCard.name + ".vcf";
		var downloadElement = document.createElement("a");
		downloadElement.setAttribute("href", "data:text/vcard:charset=utf-8," + encodeURIComponent(vCardString));
		downloadElement.setAttribute("download", fileName);
		downloadElement.style.display = "none";

		document.body.appendChild(downloadElement);
		downloadElement.click();
		document.body.removeChild(downloadElement);
	}

	function shareQCard(){
		if (navigator.share) {
			navigator.share({
				title: `${qCard.name}'s QCard`,
				text: `Here's ${qCard.name}'s contact information`,
				url: selfLink,
			})
				.then(() => console.log('Successful share'))
				.catch((error) => console.log('Error sharing', error));
		}
	}

	function copySelfLink(){
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
		toast.success(qCard.name + '\'s ' + 'QCard Copied');
	}

	function editQCard(){
		navigate(`/create/#${qCard.toEncodedString()}`)
	}

</script>

<article class="shadow" style="position:relative">

	<a href={qCard.toViewUrl()} alt="View this QCard">
		<QRCode dataToEncode={selfLink}/>
	</a>

	<hr>

	<div class="contact-info-container">

		<div class="contact-meta">

			<header>
				<h1>
					{qCard.name}
				</h1>
				{#if qCard.title}
				<h2>{qCard.title}</h2>
				{/if}
			</header>

			{#if qCard.comment}
			<div id="comment">
				<p>{qCard.comment}</p>
			</div>
			{/if}
		</div>


		{#if qCard.email || qCard.phone || qCard.website || qCard.address || qCard.xmpp}
		<div class="contact-methods">
			{#if qCard.email}
			<div class="contact-method-item">
				<a href="mailto:{qCard.email}" alt="{qCard.email}" target="_blank">
					<img src="/icons/inbox.svg" alt="Email Icon"/>
				</a>
			</div>
			{/if}

			{#if qCard.phone}
			<div class="contact-method-item">
				<a href="tel:{qCard.phone}" alt={qCard.phone}>
					<img src="/icons/phone.svg" alt="Phone Icon"/>
				</a>
			</div>
			{/if}

			{#if qCard.xmpp}
			<div class="contact-method-item">
				<a href="xmpp:{qCard.xmpp}" target="_blank" alt="{qCard.xmpp}">
					<img src="/icons/xmpp.svg" alt="XMPP icon"/>
				</a>
			</div>
			{/if}

			{#if qCard.website}
			<div class="contact-method-item">
				<a href={qCard.website} target="_blank" alt="Website provided by {qCard.name}">
					<img src="/icons/link.svg" alt="External Link Icon"/>
				</a>
			</div>
			{/if}

			{#if qCard.address}
			<div class="contact-method-item">
				<a href="https://www.openstreetmap.org/search?query={qCard.address}" target="_blank" alt="{qCard.address}">
					<img src="/icons/map-pin.svg" alt="Location icon"/>
				</a>
			</div>
			{/if}
		</div>
		{/if}

	</div>

	<hr>

	<div class="button-container">

		<button on:click={editQCard} alt="Edit the QCard" class="edit">
			<img src="/icons/edit.svg" alt="Edit Icon"/>
		</button>

		{#if navigator.share}
		<button on:click={shareQCard} alt="Share this QCard's URL" class="share">
			<img src="/icons/share.svg" alt="Share Icon"/>
		</button>
		{:else}
		<button on:click={copySelfLink} alt="Copy the URL of this QCard" class="copy">
			<img src="/icons/copy.svg" alt="Copy Icon"/>
		</button>
		{/if}

		<button on:click={downloadVCard} alt="Download the VCard" class="download">
			<img src="/icons/download.svg" alt="Download Icon"/>
		</button>

	</div>
</article>


