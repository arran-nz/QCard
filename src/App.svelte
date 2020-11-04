<script>
    import { Router, Route, Link } from "svelte-routing";
    import { navigate } from "svelte-routing";

    import { fade } from 'svelte/transition';
    
    import Home from "./pages/Home.svelte";
    import Create from "./pages/CreateCard.svelte";
    import View from "./pages/ViewCard.svelte";
    
    
    export let url = "";

    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has('v'))
    {
      navigate("/card/?v=" + urlParams.get('v'), { replace: true });
    }

</script>

<svelte:head>
	<title>QCard.link - Contact Sharing</title>
	<!-- Set Android Browser Tab Colour -->
	<meta name="theme-color" content="#D64550">

  <!-- Analytics -->
  <script async defer src="https://sa.qcard.link/latest.js"></script>
</svelte:head>

<main transition:fade class="mx-auto">
  <Router url="{url}">  
      <div>
        <Route path="/"  component="{Home}" />
        <Route path="create" component="{Create}" /> 
        <Route path="card" component="{View}" /> 
      </div>
  </Router>   
</main> 

<!-- Simple Analytics-->
<noscript><img src="https://sa.qcard.link/noscript.gif" alt="Simple Analytics for NoScript"/></noscript> 

