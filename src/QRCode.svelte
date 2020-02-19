<style>


</style>

<script>

import {  QRCode } from "qrcode.min.js";


function renderQRCode(text_content){
    var qrcode = new QRCode({
    color: "#364958",
    content: text_content,
    container: "svg-viewbox", //Responsive use
    join: true //Crisp rendering and 4-5x reduced file size
    });
    var svg = qrcode.svg();
    document.getElementById("qr_render").innerHTML = svg;
}

renderQRCode("this");

</script>



<article>    
       <div id="qr_render">

       </div>

</article>