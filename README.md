# [QCard](https://qcard.now.sh)

QCard is a beautifully simple way to share contact information, here's why you should care:

- 🎈 Super light-weight, coming in at only **~25 Kilobytes!**
- 📖 Requires no backend, doesn't store data and run's 100% client-side.
- 💚 Waste free alternative to Business Cards.

## What is a "QCard"?

Essentially a wrapper around the standardised [VCard](https://en.wikipedia.org/wiki/VCard) format, But designed for maximum portability.

Let's break it down in bash:
```shell
# An entire QCard
$ echo https://qcard.now.sh/?v=QkVHSU46VkNBUkQNCk46R2l0aHViIEJyb3dzZXINClRJVExFOkludGVyZXN0ZWQgaW4gUUNhcmQNClVSTDpodHRwczovL3FjYXJkLm5vdy5zaA0KTk9URTpIZXlcLCB0aGF0J3MgbWUhDQpFTkQ6VkNBUkQ=

# The `v` parameter is Base64 encoded, decode it
$ echo "QkVHSU46VkNBUkQNCk4..." | base64 --decode

BEGIN:VCARD
N:Github Browser
TITLE:Interested in QCard
URL:https://qcard.now.sh
NOTE:Hey\, that's me!
END:VCARD

# You can save this as a `.vcf` file to import somewhere
# With a bonus bash trick for you to grab the last output.
$ echo "$(!!)" > contact.vcf
```
[Your QCard](https://qcard.now.sh/?v=QkVHSU46VkNBUkQNCk46R2l0aHViIEJyb3dzZXINClRJVExFOkludGVyZXN0ZWQgaW4gUUNhcmQNClVSTDpodHRwczovL3FjYXJkLm5vdy5zaA0KTk9URTpIZXlcLCB0aGF0J3MgbWUhDQpFTkQ6VkNBUkQ=)

## I want to make QCards programatically

Cool, here are some examples - Feel free to add your own!

 - [QCardGeneration](./examples/QCardGeneration.md)

## Contributions

Welcome!

## Issues

If your device gets hit by a stray cosmic ray and the application breaks.. please create an Issue here on Github.

## License

MIT

## Automating QCard Generation

### Requirements

- [VObject](https://github.com/eventable/vobject)

```shell
$ pip install vobject
```

### Example

```python
import vobject
import base64

card = vobject.vCard()
card.add('n')
card.n.value = vobject.vcard.Name(given='Arran')
card.add('fn')
card.fn.value = "Arran"

card.add('email')
card.email.value = 'mail@email.co'

card.add('tel')
card.tel.value = '+555'

card.add('url')
card.url.value = 'https://arran.nz'

card.add('note')
card.note.value = 'Here I go, making cards in Python again'

serializedCard = card.serialize()
encodedCard = base64.b64encode(serializedCard.encode())

print("https://qcard.now.sh/?v={}".format(encodedCard.decode()))
```



