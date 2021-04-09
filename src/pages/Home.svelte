<script>
    import { Link } from "svelte-routing";
    import ContactCard from '../ContactCard.svelte'; 
    import AppHeader from '../AppHeader.svelte'; 
    import Footer from '../Footer.svelte';
    import QRCode from '../QRCode.svelte';
    import QCard from "../plugins/qcard";

    let qCard = new QCard(
        "Julia",
        "Senior Hacker",
        "Julia@example.com",
        "+555",
        "https://qcard.link",
        "We met at the 2021 FOSS Conference in Amsterdamn! 🍺🍺"
    )

</script>
<article class="limit-width mx-auto">

    <AppHeader/>
    
    <div class="flex-container">
        <div class="explaination">
            <h1>What is <strong>QCard</strong></h1>
            <p>QCard is a beautifully <strong>simple</strong> way to share contact information on-the-go.</p>
            <ul>
                <li>🛡️ Completely <strong>private</strong> by design - All contact data is in the QR code</li>
                <li>💚 An alternative to Business Cards that is <strong>waste-free</strong></li>
                <li>⚡ Super <strong>light-weight</strong>, optimzed for cellular internet</li>
            </ul>    
            
            <a href="https://qcard.link/create" class="bold button">Create a QCard</a>
        </div>

        <div class="media card">
            <ContactCard {qCard} />
        </div>
    </div>

    <hr>

    <div class="flex-container flex-dir-reverse">
        <div class="explaination">
            <h1><strong>Share</strong> whats contextually important</h1>
            <p>
                Whether you're going to a conference, a bar or hiking, create a custom QCard for each opportunity - Share what you want, when you want.
            </p>

            <h3>
                Save or print a <strong>screenshot</strong> of the QR code for quick access!
            </h3>
        </div>
        <div class="media">
            <img src="/images/undraw_personal_information.svg" alt="A person showing their personal information"/>
        </div>
    </div>

    <hr>

    <div class="flex-container">
        <div class="explaination">
            <h1>How it <strong>works</strong></h1>
            <p>
                After contact data is entered, data is represented as a <a target="_blank" class="external" href="https://en.wikipedia.org/wiki/VCard" alt="vCard Wikipedia" >vCard</a> object.
            </p>
            <p>
                The vCard is then encoded into <a target="_blank" href="https://en.wikipedia.org/wiki/Base64" alt="Base64 Wikipedia">Base64</a>
                and appended to the URL <code>{qCard.toUrl().substring(0, 40)}...</code>
            </p>
            <br />

            <p>
                This URL is subsequently stored in the QR code at the top of a QCard.
            </p>
            <p>
                When the QCard is visited, we simply decode the data and display it!
            </p>
            <br />
            <p>
                Completely client-side and <strong>knowledgeless</strong>!
            </p>
            

        </div>
        <div class="flex-code media">

            <pre>
                {qCard.toVCardString()}
            </pre>
            
            <img class="icon" src="/icons/arrow-down.svg" alt="Arrow pointing down"/>

            <div class="qrcode mx-auto">
                <QRCode dataToEncode = {qCard.toUrl()}/>
            </div>
        </div>
    </div>

    <hr>

    <div class="flex-container flex-dir-reverse">
        <div class="explaination center">
            <img style="width:50%" class="mx-auto" src="/images/undraw_professional_card.svg" alt="A person showing their personal information card"/>
            <h1>You know what to do!</h1>
            <a href="https://qcard.link/create" class="mx-auto bold button">Create a QCard</a>
        </div>
    </div>

    <hr>

    <Footer showSponsors=true/>

</article>
<style>

    ul {
        margin:1em;
        padding:0;
        list-style-position: inside;
    }

    img {
        width:100%;
    }

    .icon {
        height: 2em;
        width: auto;
        margin:1em auto;
        display: block;
    }

    .flex-container {
        margin: 2em 0;
    }

    .flex-code {
        margin: 0;
        justify-content: space-between;
        align-items: center;
    }

    .flex-code pre {
        flex:1;
    }

    .qrcode
    {
        max-width: 15em;
    }

    .flex-container .explaination {
        flex: 2;
        align-self: center;
        margin: 1em 2em;
    }

    .flex-container .explaination.center {
        text-align: center;
    }

    .flex-container .media {
        flex: 1;
        margin: 1em 2em;
        align-self: center;
    }

    @media all and (max-width: 800px) {
        .flex-container .card {
            margin: 3em 2em;
        }
    }


</style>