<style>

article {
	margin: 0 auto;
	max-width: 1600px;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	flex-direction: row;
}

article div {
	min-width: 300px;
}

#app-header {
	width: 100%;
}

#create-form {
	margin: 1em auto;
	width: 100%;	
	max-width: 1000px;	
}

#contact-card {
	margin: 40px auto;
	max-width: 420px;
}

@media all and (max-width: 600px) {
	#contact-card {
		max-width: none;
		min-width: none;
		width: 100%;
		margin: 0px auto;
	}
}



</style>


<script>
	import { fade } from 'svelte/transition';
	
	import ContactCard from './ContactCard.svelte';
	import CreateForm from './CreateForm.svelte';
	import AppHeader from './AppHeader.svelte';
	import Sponsors from './Sponsors.svelte';
	import { parseVCardString } from './plugins/vcard.js';

	let contactDetails = {
		name: "",
		title: "",
		email: "",
		phone: "",
    	website: "",
		comment: "",
		address: "",
	};

	let loadedExternalVCard = false;


	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}

	function decodeData(str) {
		return decodeURIComponent(escape(window.atob(str)));
	}

	function getVCardProperty(VCardObj, key){

            if ( (VCardObj.hasOwnProperty(key)) && (Array.isArray(VCardObj[key])) ){
				return VCardObj[key][0].value; 
			}
            return "";
	}

	// Get Card Data (If present)
	var encodedVCard = getUrlVars()["v"]
	if (encodedVCard != null || encodedVCard != undefined){    
		var decodedVCard = decodeData(encodedVCard);
		var VCardObj = parseVCardString(decodedVCard);
		
		contactDetails = {
			name: getVCardProperty(VCardObj, "fn"),
			title: getVCardProperty(VCardObj, "title"),
			email: getVCardProperty(VCardObj, "email"),
			phone: getVCardProperty(VCardObj, "tel"),
			website: getVCardProperty(VCardObj, "url"),
			comment: getVCardProperty(VCardObj, "note"),
			address: getVCardProperty(VCardObj, "adr")
		}

		loadedExternalVCard = true;
	}

	// sleep time expects milliseconds
	function sleep (time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

</script>

<svelte:head>
	{#if loadedExternalVCard}
  		<title>{contactDetails.name}'s QCard</title>
  	{:else}
  		<title>QCard.link - Contact Sharing</title>
  	{/if}
	  
	<!-- Set Android Browser Tab Colour -->
	<meta name="theme-color" content="#ff3e00">

  	<script async defer src="https://cdn.simpleanalytics.io/hello.js"></script>
</svelte:head>


<article transition:fade>

{#if !loadedExternalVCard}
<div id="app-header">
	<AppHeader
		on:ReloadRequested = {
			event =>
			{
				console.log("Reload Requested");
			}
		}
	
	/>
</div>
<div id="create-form">
	<CreateForm 
		on:Submitted = { 
			event =>
			{
				contactDetails = event.detail;
				
				// Must wait until the DOM object is rendered before scrolling.
				sleep(50).then(() => {
					document.getElementById("contact-card").scrollIntoView({ behavior: "smooth", block: "center" }); 
				});

			}
		}
	/>
</div>
{/if}

{#if contactDetails.name != ""}
<div id="contact-card">
	<ContactCard 
		name = {contactDetails.name}
		title = {contactDetails.title}
		email = {contactDetails.email}
		phone = {contactDetails.phone}
		website = {contactDetails.website}
		comment = {contactDetails.comment}
		address = {contactDetails.address}

		loadedExternalVCard = {loadedExternalVCard}
	/>
</div>
{/if}

</article>

{#if !loadedExternalVCard}
<Sponsors />
{/if}

<!-- Simple Analytics-->
<img src="https://api.simpleanalytics.io/hello.gif" alt="">


