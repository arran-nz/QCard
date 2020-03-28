<style>
  #container {
    display: flex;
		justify-content: center;
}

  img {
    /* Reduce the margin based on the width of the screen:
    A bigger QRCode is important when screen realestatic is limited. */
    margin: 1vw;
    max-width: 420px;
  }

</style>

<script>

import QRCode from './plugins/qr.js';

let src;

export let dataToEncode;
export let qrOptions = {
            margin: 0,
            modulesize: 10
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

<div id="container">
  <img {src} alt="QRCode"/>
</div>
