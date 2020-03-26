<style>
    img {
        max-width: 1024px;
        width:100%;
    }

</style>

<script>

import QRCode from './plugins/qr.js';

let src;

export let dataToEncode;
export let qrOptions = {
            margin: 5,
            modulesize: 15
        }

// Reactive to any variable changes in this component
$: {
    console.log("Rendered QRCode");
    src = QRCode.generatePNG(
        dataToEncode,
        qrOptions
    );
}

</script>


<img {src} alt="QRCode"/>