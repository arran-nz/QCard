
import { parseVCardString } from './vcard'
import { decode } from './base64'
import QCard from './qcard'

function getVCardProperty(VCardObj, key){
    if ( (VCardObj.hasOwnProperty(key))
        && (Array.isArray(VCardObj[key])) ){
        return VCardObj[key][0].value; 
    }
    return "";
}

function encodedDataFromFragmentIdentifier(url){
    let parts = url.split("#");
    return parts[1];
}

export function fromUrl(url) {
    let encodedQCard = encodedDataFromFragmentIdentifier(url)
    if (encodedQCard == undefined) {
        return undefined
    }

    try{
        var decodedVCard = decode(encodedQCard);
        var VCardObj = parseVCardString(decodedVCard);
    }
    catch (error){
        console.error(error);
        throw error;
    }

    return fromVCard(VCardObj)
}

export function fromVCard(vCard) {
    return new QCard(
        getVCardProperty(vCard, "fn"),
        getVCardProperty(vCard, "title"),
        getVCardProperty(vCard, "email"),
        getVCardProperty(vCard, "tel"),
        getVCardProperty(vCard, "url"),
        getVCardProperty(vCard, "note"),
        getVCardProperty(vCard, "adr"),
        getVCardProperty(vCard, "X-JABBER"),
    )
}

export function fromNothing() {
    return new QCard()
}