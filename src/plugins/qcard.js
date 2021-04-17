
import { generateVCardString } from './vcard.js';
import { encode } from './base64.js';

class QCard {

    constructor(
        name,
        title,
        email,
        phone,
        website,
        comment,
        address,
        xmpp
    ) {
        this.name = name
        this.title = title
        this.email = email
        this.phone = phone
        this.website = website
        this.comment = comment
        this.address = address
        this.xmpp = xmpp
    }

    toViewUrl() {
        return `/card/#${this.toEncodedString()}`
    }

    toEditUrl() {
        return `/create/#${this.toEncodedString()}`
    }

    toEncodedString() {
        return encode(this.toVCardString())
    }

    toVCardString() {
        return generateVCardString(this.getVCard())
    }

    setProperty(vCard, key, value) {
        if(value == undefined) return
		vCard[key] = [{'value': value}]
	}

    getVCard() {
        let vCard = {}
        this.setName(vCard)
        this.setTitle(vCard)
        this.setEmail(vCard)
        this.setPhone(vCard)
        this.setWebsite(vCard)
        this.setComment(vCard)
        this.setAddress(vCard)
        this.setXmpp(vCard)
        return vCard
    }

    setName(vCard) {
        var n = ["", this.name, "", "", ""];
        this.setProperty(vCard, 'n', n)
        this.setProperty(vCard, 'fn', this.name)
    }

    setTitle(vCard) {
        this.setProperty(vCard, 'title', this.title)
    }

    setEmail(vCard) {
        this.setProperty(vCard, 'email', this.email)
    }

    setPhone(vCard) {
        this.setProperty(vCard, 'tel', this.phone)
    }

    setWebsite(vCard) {
        this.setProperty(vCard, 'url', this.website)
    }

    setComment(vCard) {
        this.setProperty(vCard, 'note', this.comment)
    }

    setAddress(vCard) {
        this.setProperty(vCard, 'adr', this.address)
    }

    setXmpp(vCard) {
        this.setProperty(vCard, 'X-JABBER', this.xmpp)
    }

}

export default QCard


