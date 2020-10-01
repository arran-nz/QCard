<style>

    h1, p {
		color: #606c76;
		text-align:center;
    }


    article {
        margin: 1em;
    }

    strong {
        color: #D64550;
        font-weight: 600;
    }

    h1 strong {
        font-size: 1.3em;
    }

    h1 {
        margin: 0;
        font-size: 2em;
        font-weight: 500;
        line-height: 0.8em;
        
    }

    p {
        margin: 10;
        font-size: 1.2em;
    }


    .reload {
        cursor: pointer;
    }


</style>

<script>
    // Import Event Dispatcher
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher();

    function handleReloadRequest(){
        dispatch("ReloadRequested");
    }

</script>

<article>
  
  <div class="reload" on:click={handleReloadRequest} alt="Reload the application">
    <h1><strong>QCard</strong>.link</h1>
  </div>

  <p>
      The minimalist, fast and <strong>private</strong> way to share contact information. 
  </p>

</article>
