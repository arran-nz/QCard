<style>
	label.required:after{
		color: #D64550;
		content: " *";
	}

	fieldset {
		border: 0;
		padding:0;
		margin:0;
	}
	input, textarea {
		width: 100%;
		padding: 0.5em;
	}

	textarea {
		height: 10vh;
	}

	label {
		text-align: left;
		font-weight: 400;
		font-size: 1em;
		padding: 0.2em 0;
		width: 100%;
	}

	.field:last-child
	{
		margin: 0;
	}

	.additionalField
	{
		transition: all 100ms;
		cursor: pointer;

		background-color: white;

		border-radius: 5px;
		margin: 4px 2px;
		padding: 2px 8px;
		font-size: 0.85rem;
		display: inline;
	}	
	.additionalField:hover, .additionalField:focus
	{
		border-color: #D64550;
	}

	.additionalField::before
	{
		content: "+ ";
		color: #D64550;
		font-weight: 600;
	}

	.additionalField:first-of-type
	{
		margin-left: 0;
	}
	
</style>

<script>
	// Import Event Dispatcher
	import { beforeUpdate, afterUpdate, createEventDispatcher } from 'svelte'
	import QCard from './plugins/qcard'	

  	const dispatch = createEventDispatcher()

	const fields = [
		{ required: true, id: 'name', displayName: "Name", value: '', placeholder: "Jaskier"},
		{ id: 'title', type:"text", displayName: "Title", value: '', placeholder: "Singer, Poet, Lute Player"},
		{ id: 'email', type:"text", displayName: "Email", value: '', placeholder: "info@balladsfromjaskier.com"},
		{ id: 'phone', type:"tel", displayName: "Phone", value: '', placeholder: "+000 000"},
		{ id: 'website', type:"url", displayName: "Website", value: '', placeholder: "https://thelute.com"},
		{ id: 'comment', type:"textarea", displayName: "Comment", value: '', placeholder: "Yes, yes, yes. You never get involved. Except you actually do, all of the time."},
		{ id: 'address', type:"text", displayName: "Address", value: '', placeholder: "10 Lute Street, 012"},
		{ id: 'xmpp', type:"text", displayName: "XMPP", value: '', placeholder: "jaskier@xmpp.thelute.com"},
	];

	let activeFields = []

	let elementIdToFocus;
	export let existingQCard;

	// Handle the form submit
	function handleSubmit(form)
	{
		// Call the `Submitted` event for which parent
		// componets can subscribe to.
		dispatch("Submitted", 
		{	
			qCard: new QCard(
				form.target.name? form.target.name.value : "",
				form.target.title? form.target.title.value : "",
				form.target.email? form.target.email.value : "",
				form.target.phone? form.target.phone.value : "",
				form.target.website? form.target.website.value : "",
				form.target.comment? form.target.comment.value : "",
				form.target.address? form.target.address.value : "",
				form.target.xmpp? form.target.xmpp.value : ""
			)
		});
	}

	/// Move a field from `fields` to `activeFields`
	function makeFieldActive(field) {
		activeFields = [...activeFields, field];
		const index = fields.indexOf(field);
		if (index > -1) {
			fields.splice(index, 1);
		}
		fields = fields;

		elementIdToFocus = field.id
		
	}

	function makeRequiredFieldsActive() {
		if (fields.map(x => x.required) !== activeFields.map(x => x.required)) {
			fields.forEach(
				field => {
					if (field.required) {
						makeFieldActive(field)
					}
				}
			)
		}
	}

	afterUpdate(() => {
		if (elementIdToFocus != undefined) {
			document.getElementById(elementIdToFocus)?.focus();
		}
	});

	beforeUpdate(() =>{

		if (existingQCard != undefined) {
			// activeFields = []
			// Iterate over each field in the QCard
			Object.keys(existingQCard).map(propertyName => {
				
				// Iterate over each existing field
				// Checking if the field in the form needs
				// to be overwritten
				[...fields].map(field => {
					let value = existingQCard[propertyName]
					if(field.id == propertyName && value != "") {
						field.value = existingQCard[propertyName]
						makeFieldActive(field)
					}
				})
			})

			return
		}

		makeRequiredFieldsActive()

	})

</script>

<article>
	<form on:submit|preventDefault="{handleSubmit}">
		<fieldset>
			<div id="fields">
			{#each activeFields as field (field.id)}
				
				<label class:required={field.required} for={field.id}>{field.displayName}</label>
				{#if field.type == "textarea"}
					<textarea class="field" placeholder={field.placeholder} id={field.id} required={field.required} value={field.value}></textarea>
				{:else}
				<input class="field" type={field.type} placeholder={field.placeholder} id={field.id} required={field.required} value={field.value}>
				{/if}
				
			{/each}
			</div>

			{#each fields as field (field.id)}
				<button class="additionalField" on:click|once="{() => makeFieldActive(field)}">{field.displayName}</button>
			{/each}

			<input class="button bold" type="submit" value="Create"/>
		</fieldset>
	</form>
</article>

