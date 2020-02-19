<style>

	label.required:after{
		color: #ff3e00;
		content: " *";
	}

	fieldset {
		border: 0;
	}

	.create-form {
		width: 100%;		
		text-align: left;
	}

	.button-submit {

		font-weight: 800;
		font-size: 1.5em;

		background-color: #ff3e00;
		color: white;

		display: block;
	}

	.button-submit:hover{	
		cursor: pointer;
	}

	input, textarea {
		width: 100%;
		padding: 0.6em;
		border-radius: 5px;
	}

	label {
		text-align: left;
		font-weight: 00;
		font-size: 1.3em;
		padding: 0.3em 0 0.2em 0;
		width: 100%;
	}
</style>

<script>
	// Import Event Dispatcher
	import { createEventDispatcher } from 'svelte'
  	const dispatch = createEventDispatcher()

	// Handle the form submit
	function handleSubmit(form)
	{
		// Call the `Submitted` event for which parent
		// componets can subscribe to.
		dispatch("Submitted", 
		{
			name: form.target.nameField.value,
			title: form.target.titleField.value,
		  	email: form.target.emailField.value,
			phone: form.target.phoneField.value,
			website: form.target.webField.value,
			comment: form.target.commentField.value
		});
	}
</script>

<article class="create-form">
	<form on:submit|preventDefault="{handleSubmit}">
		<fieldset>
			<label class="required" for="nameField">Name</label>
			<input type="text" placeholder="Marco" id="nameField" required>

			<label for="titleField">Title</label>
			<input type="text" placeholder="Coin Tosser at Witcher's Feet" id="titleField">

			<label for="emailField">Email</label>
			<input type="text" placeholder="hey@marco.com" id="emailField">

			<label for="phoneField">Phone</label>
			<input type="tel" placeholder="+555" id="phoneField">

			<label for="webField">Website</label>
			<input type="url" placeholder="https://marco.com" id="webField">
			
			<label for="commentField">Comment</label>
			<textarea placeholder="Senior coin tosser at.." id="commentField"></textarea>

			<input class="button-submit" type="submit" value="Create">
		</fieldset>
	</form>
</article>

