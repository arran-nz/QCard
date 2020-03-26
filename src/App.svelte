<script>
	import ContactCard from './ContactCard.svelte';
	import CreateForm from './CreateForm.svelte';
	import AppHeader from './AppHeader.svelte';
	import Sponsors from './Sponsors.svelte';

	let contactDetails = {
		name: "",
		title: "",
		email: "",
		phone: "",
		website: "",
		comment: "",
	};

</script>

<AppHeader/>


<CreateForm 
	on:Submitted = { 
		event =>
		{
    		contactDetails = event.detail;
		}
	}
/>


{#if contactDetails.name != ""}
<ContactCard 
	name = {contactDetails.name}
	title = {contactDetails.title}
	email = {contactDetails.email}
	phone = {contactDetails.phone}
	website = {contactDetails.website}
	comment = {contactDetails.comment}
/>
{/if}



<Sponsors />
