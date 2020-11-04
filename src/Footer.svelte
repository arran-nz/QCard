<script>
     export let showSponsors = false;
</script>

<article>    
    <div class="flex-container">

        <div id="source-code">
            <label>
                <a href="https://codeberg.org/arran/qcard" alt="QCard Source Code" target="_blank">            
                    <img loading="lazy" class="icon" src="/icons/git.svg" alt="Copy Icon"/>
                    <label>Source Code</label>
                </a>
            </label>
            <label class="disclaimer"><abbr title="Free (Libre) Open Source Software">FLOSS</abbr> Software - Licensed Under GPLv3</label>
        </div>

        {#if showSponsors}
        <div id="sa">
            <a href="https://simpleanalytics.com/qcard.link?utm_source=qcard.link&utm_content=badge" referrerpolicy="origin" target="_blank"><img class="simpleanalytics" src="https://simpleanalyticsbadge.com/qcard.link?background=transparent&text=606c76" loading="lazy" referrerpolicy="no-referrer" crossorigin="anonymous" /></a>
            <label class="disclaimer">This website respects <abbr title="Do Not Track">DNT</abbr> requests</label>
        </div>
        {/if}

    </div>
</article>

<style>

    .flex-container div {
        margin: 5em 2em;
        align-self: center;
    }

    label {
        margin: 0;
        font-size: 1em;
        font-weight: 500;
    }

    .disclaimer {
        margin: 0.1em 0 ;
        font-size: 0.7em;
        text-align: center;
    }

    a {
        justify-content: center;
        display: flex; 
    }

    .icon {
        height:1em;
        margin: 0 0.3em;
        align-self: center;
    }

</style>


