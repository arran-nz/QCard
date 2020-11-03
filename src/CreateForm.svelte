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
	import { createEventDispatcher } from 'svelte'
	import { afterUpdate } from 'svelte';
  	const dispatch = createEventDispatcher()

	let fields = [
		{ id: 'titleField', type:"text", displayName: "Title", value: '', placeholder: "Singer, Poet, Lute Player"},
		{ id: 'emailField', type:"text", displayName: "Email", value: '', placeholder: "info@balladsfromjaskier.com"},
		{ id: 'phoneField', type:"tel", displayName: "Phone", value: '', placeholder: "+000 000"},
		{ id: 'websiteField', type:"url", displayName: "Website", value: '', placeholder: "https://thelute.com"},
		{ id: 'commentField', type:"textarea", displayName: "Comment", value: '', placeholder: "Yes, yes, yes. You never get involved. Except you actually do, all of the time."},
		{ id: 'addressField', type:"text", displayName: "Address", value: '', placeholder: "10 Lute Street, 012"},
	];

	let activeFields = [
		{ required: true, id: 'nameField', displayName: "Name", value: '', placeholder: "Jaskier"},
	];

	let elementIdToFocus;

	// Handle the form submit
	function handleSubmit(form)
	{
		// Call the `Submitted` event for which parent
		// componets can subscribe to.
		dispatch("Submitted", 
		{
			name: form.target.nameField.value,
			title: form.target.titleField ? form.target.titleField.value : "",
		 	email: form.target.emailField ? form.target.emailField.value : "",
			phone: form.target.phoneField ? form.target.phoneField.value : "",
			website: form.target.websiteField ? form.target.websiteField.value : "",
			comment: form.target.commentField ? form.target.commentField.value : "",
			address: form.target.addressField ? form.target.addressField.value : "",
		});
	}

	/// Move a field from `fields` to `activeFields`
	function makeFieldActive(field)
	{
		activeFields = [...activeFields, field];
		const index = fields.indexOf(field);
		if (index > -1) {
			fields.splice(index, 1);
		}
		fields = fields;

		elementIdToFocus = field.id
		
	}

	afterUpdate(() => {
		if (elementIdToFocus != undefined)
		{
			document.getElementById(elementIdToFocus).focus();
		}
	});

</script>

<article>
	<form on:submit|preventDefault="{handleSubmit}">
		<fieldset>
			<div id="fields">
			{#each activeFields as field (field.id)}
				
				<label class:required={field.required} for={field.id}>{field.displayName}</label>

				{#if field.type == "textarea"}
					<textarea class="field" placeholder={field.placeholder} id={field.id} required={field.required}></textarea>
				{:else}
				<input class="field" type={field.type} placeholder={field.placeholder} id={field.id} required={field.required}>
				{/if}
				
			{/each}
			</div>

			{#each fields as field (field.id)}
				<button class="additionalField" on:click|once="{() => makeFieldActive(field)}">{field.displayName}</button>
			{/each}

			<input class="button bold" type="submit" value="Create">
		</fieldset>
	</form>
</article>

