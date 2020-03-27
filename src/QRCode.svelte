<style>
  #container {
    display: flex;
		justify-content: center;
}

  img {
    max-width: 420px;
  }

</style>

<script>

import QRCode from './plugins/qr.js';

let src;

export let dataToEncode;
export let qrOptions = {
            margin: 2,
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
