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

<svelte:head>
  <script async defer src="https://cdn.simpleanalytics.io/hello.js"></script>
  <noscript><img src="https://api.simpleanalytics.io/hello.gif" alt=""></noscript> 
</svelte:head>

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
