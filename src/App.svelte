<script>
	import ContactCard from './ContactCard.svelte';
	import CreateForm from './CreateForm.svelte';
	import AppHeader from './AppHeader.svelte';
	import Sponsors from './Sponsors.svelte';

	let contactDetails = {
		name: "Arran Smith",
		title: "Developer",
		email: "social@arran.nz",
		phone: "+555 555 555",
		website: "https://arran.nz",
		comment: "I like beaches",
	};


</script>

<AppHeader/>


<CreateForm on:Submitted = { event =>
    {
    	contactDetails = event.detail;
    }
  }
/>


<ContactCard 
	name = {contactDetails.name}
	title = {contactDetails.title}
	email = {contactDetails.email}
	phone = {contactDetails.phone}
	website = {contactDetails.website}
	comment = {contactDetails.comment}
/>


<Sponsors />
