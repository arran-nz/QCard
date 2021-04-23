<script>
    import { fly } from 'svelte/transition';
    import { backOut } from 'svelte/easing';
    import ContactCard from '../ContactCard.svelte';

    import { fromUrl } from '../plugins/qcardFactory';
    import { onMount } from 'svelte';

    let loading = true;
    let canEdit = false;
    let qCard;

    const renderEdit = (localSHA, qCardSHA) => {
        console.log(`${localSHA} == ${qCardSHA}`)
        if (localSHA === qCardSHA) canEdit = true;
    }

    onMount(() => {
        qCard = fromUrl(window.location.href.toString())
        if (qCard == undefined)
        {
            window.location.replace("/");
        }
        loading = false

        let localSHA = localStorage.getItem('QCard_SHA256')
        if (localSHA)
        {
            qCard.toSHA256().then(qCardSHA => {
                renderEdit(localSHA, qCardSHA)
            })
        }
        
    })


</script>

<svelte:head>
    {#if !loading}
	<title>{qCard.name}'s QCard - QCard.link</title>
    {/if}
</svelte:head>


{#if !loading}
<article>
    <div id="contact-card-container" in:fly="{{ x: -100, duration: 600, easing: backOut }}">
        <ContactCard {qCard} {canEdit}/> 
        <div class="create-footer-link" in:fly="{{ y: -20, duration: 600, delay:800, easing: backOut}}">
            <a href="https://qcard.link">Create your own <strong>QCard</strong></a>
        </div>
    </div>
</article>
{/if}

<style>
    #contact-card-container {
        margin: 2em auto;
        max-width: 500px;
    }

    @media only screen and (max-width: 600px) {
        #contact-card-container {
            margin: 0 auto;
            max-width: none;
        }
    }

    .create-footer-link {
        margin: 0.5em auto;
        display:block;
        font-weight: 300;
        text-align: center;
    }
</style>