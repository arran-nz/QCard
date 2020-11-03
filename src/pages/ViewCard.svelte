<script>
    import { fly } from 'svelte/transition';
    import { backOut } from 'svelte/easing';
    import ContactCard from '../ContactCard.svelte';
    import { parseVCardString } from '../plugins/vcard.js';

	function decodeData(str) {
		return decodeURIComponent(escape(window.atob(str)));
	}

	function getVCardProperty(VCardObj, key){

            if ( (VCardObj.hasOwnProperty(key)) && (Array.isArray(VCardObj[key])) ){
				return VCardObj[key][0].value; 
			}
            return "";
	}

    let contactDetails = {
		name: "",
		title: "",
		email: "",
		phone: "",
    	website: "",
		comment: "",
		address: "",
    };

    const urlParams = new URLSearchParams(location.search);
    let loading = true;

    if (urlParams.has("v")){
        var encodedVCard = urlParams.get("v");
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
        loading = false;
    }
    else {
        window.location.replace("/");
    }

</script>

<svelte:head>
	<title>{contactDetails.name}'s QCard - QCard.link</title>
</svelte:head>


{#if !loading}
<article>
    <div id="contact-card-container" in:fly="{{ x: -100, duration: 600, easing: backOut }}">
        <ContactCard 
        name = {contactDetails.name}
        title = {contactDetails.title}
        email = {contactDetails.email}
        phone = {contactDetails.phone}
        website = {contactDetails.website}
        comment = {contactDetails.comment}
        address = {contactDetails.address}
        /> 
        <div class="create-footer-link" in:fly="{{ y: -20, duration: 600, delay:800, easing: backOut}}">
            <a href="https://qcard.link">Create your own <strong>QCard</strong></a>
        </div>
    </div>
</article>
{/if}

<style>
    #contact-card-container {
        margin: 2em auto;
        max-width: 500px;
    }

    @media only screen and (max-width: 600px) {
        #contact-card-container {
            margin: 0 auto;
            max-width: none;
        }
    }

    .create-footer-link {
        margin: 0.5em auto;
        display:block;
        font-weight: 300;
        text-align: center;
    }
</style>