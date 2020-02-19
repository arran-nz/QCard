<style>

	article {
		margin: 1em;
		padding: 1em;
		/* border: 1px solid black; */
		border-radius: 5px;

		-webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
		-moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
	}

	h1 {
		margin: 0;
		font-size: 3em;
		line-height: 0.9em;

	}

	h2 {
		margin: 0;
		color: #606c76;
	}

	header {
		margin-bottom: 0.5em;
	}

	a {
		font-size: 1.2em;
		color:inherit;
	}

	p {
		font-size:1.3em;
	}


    hr {
        border: 1px solid whitesmoke;
        margin: 0.5em;
    }

	.contact-info {
		height: 150px;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	.info-slot {
		/* display: flex;
		flex-direction: row;
		justify-content: space-evenly; */
	}

	.icon {
		margin: 2em;
		scale: 1.5;
		color: #ff3e00;
	}

	.mobile-solid.icon {
		
		position: absolute;
		margin-left: 4px;
		margin-top: 0px;
		width: 12px;
		height: 14px;
		border-radius: 2px;
		border-left: solid 1px currentColor;
		border-right: solid 1px currentColor;
		border-top: solid 3px currentColor;
		border-bottom: solid 4px currentColor;
	}

	.mobile-solid.icon:after {
		content: '';
		position: absolute;
		bottom: -3px;
		left: 5px;
		height: 2px;
		width: 2px;
		border-radius: 50%;
		color: white;
		background-color: currentColor;
	}


	.mail-solid.icon {
		position: absolute;
		margin-left: 2px;
		margin-top: 4px;
		width: 15px;
		height: 10px;
		border-radius: 1px;
		border: solid 1px currentColor;
		background-color: currentColor;
	}

	.mail-solid.icon:before {
		content: '';
		position: absolute;
		left: 7px;
		top: -4px;
		width: 1px;
		height: 10px;
		color: white;
		background-color: currentColor;
		-webkit-transform-origin: bottom;
				transform-origin: bottom;
		-webkit-transform: rotate(-54deg);
				transform: rotate(-54deg);
	}

	.mail-solid.icon:after {
		content: '';
		position: absolute;
		left: 7px;
		top: -4px;
		width: 1px;
		height: 10px;
		color: white;
		background-color: currentColor;
		-webkit-transform-origin: bottom;
				transform-origin: bottom;
		-webkit-transform: rotate(54deg);
				transform: rotate(54deg);
	}


	.browser-solid.icon {
		position: absolute;
		margin-left: 2px;
		margin-top: 2px;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		border: solid 1px currentColor;
		background-color: currentColor;
	}

	.browser-solid.icon:before {
		content: '';
		position: absolute;
		left: 1px;
		top: 1px;
		width: 11px;
		height: 11px;
		border-radius: 85% 15%;
		-webkit-transform: rotate(-45deg);
				transform: rotate(-45deg);
		color: white;
		border: solid 1px currentColor;
	}

	.browser-solid.icon:after {
		content: '';
		position: absolute;
		top: 7px;
		width: 15px;
		height: 1px;
		color: white;
		background-color: currentColor;
	}

</style>

<script>
	export let name;
	export let title;
	export let email
	export let phone;
	export let website;
	export let comment;

	// Remove the protocol from the address
	let websiteDisplay = website.replace(/(^\w+:|^)\/\//, '');
</script>


<article class="contact-card">


	<header>

		<h1>
			{name}
		</h1>

		{#if title}
		<h2>{title}</h2>
		{/if}

	</header>


	<div class="contact-info">

	{#if email}
		<div class="info-slot">
		<div class="mail-solid icon"></div>
		<a href="mailto:{email}">
			{email}
		</a>
	</div>
	{/if}

	{#if phone}
	<div class="info-slot">
		<div class="mobile-solid icon"></div>
		<a href="tel:{phone}">
			{phone}
		</a>
	</div>
	{/if}

	{#if website}
	<div class="info-slot">
		<div class="browser-solid icon"></div>
		<a href={website} target="_blank" alt="Website provided by {name}">{
			websiteDisplay}
		</a>
	</div>

	{/if}
	
	
	</div>




	{#if comment}
	<hr>
	<p>{comment}</p>
	{/if}
	
</article>