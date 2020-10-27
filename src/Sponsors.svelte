<style>

    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 0 auto;
    }

    .container div {
        margin: 1em 2em;
        align-self: center;
    }

    label {
        margin: 0;
        color: #606c76;
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
        color: inherit;
        cursor: pointer;    
    }

    svg {
        box-sizing: border-box;
        width: 24px;
        height: 24px;
        fill: #ff4f64;        
        margin: 0px 2px;
    }


    hr {
        border: 1px solid whitesmoke;
        margin:  1em auto;
    }

    .icon {
        height:1em;
        margin: 0 0.3em;
        align-self: center;
    }

    @media all and (max-width: 600px) {
        .container {
            flex-direction: column;
        }
    }

</style>

<article>    
    <hr>
    <div class="container">
    
        <div id="sa">
            <a href="https://simpleanalytics.com/qcard.link?utm_source=qcard.link&utm_content=badge" referrerpolicy="origin" target="_blank"><img class="simpleanalytics" src="https://simpleanalyticsbadge.com/qcard.link?background=transparent&text=606c76" loading="lazy" referrerpolicy="no-referrer" crossorigin="anonymous" /></a>
            <label class="disclaimer">This website respects <abbr title="Do Not Track">DNT</abbr> requests</label>
        </div>

        <div id="source-code">
            <label>
                <a href="https://codeberg.org/arran/qcard" alt="QCard Source Code" target="_blank">            
                    <img loading="lazy" class="icon" src="/icons/git.svg" alt="Copy Icon"/>
                    <label>Source Code</label>
                </a>
            </label>
            <label class="disclaimer"><abbr title="Free (Libre) Open Source Software">FLOSS</abbr> Software - Licensed Under GPLv3</label>
        </div>

    </div>



</article>
