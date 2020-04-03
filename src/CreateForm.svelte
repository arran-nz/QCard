<style>

	label.required:after{
		color: #ff3e00;
		content: " *";
	}

	fieldset {
		border: 0;
	}

	.button-submit {
		margin: 0;
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
		padding: 0.5em;
		border-radius: 5px;
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

<article>
	<form on:submit|preventDefault="{handleSubmit}">
		<fieldset>
			<label class="required" for="nameField">Name</label>
			<input type="text" placeholder="Jaskier" id="nameField" required>

			<label for="titleField">Title</label>
			<input type="text" placeholder="Singer, Poet, Lute Player" id="titleField">

			<label for="emailField">Email</label>
			<input type="text" placeholder="info@balladsfromjaskier.com" id="emailField">

			<label for="phoneField">Phone</label>
			<input type="tel" placeholder="+0 000 000 000" id="phoneField">

			<label for="webField">Website</label>
			<input type="url" placeholder="https://thelute.com" id="webField">
			
			<label for="commentField">Comment</label>
			<textarea placeholder="Yes, yes, yes. You never get involved. Except you actually do, all of the time." id="commentField"></textarea>

			<input class="button-submit" type="submit" value="Create">
		</fieldset>
	</form>
</article>

