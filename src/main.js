import App from './App.svelte';

var app = new App({
	target: document.body,
	
	// This flag will cause animations to run at page load
	intro: true,
});

export default app;