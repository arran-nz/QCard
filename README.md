# [QCard](https://qcard.now.sh)

QCard is a beautifully simple way to share contact information, here's why you should care:

- 🎈 Super light-weight, coming in at only **~25 Kilobytes!**
- 📖 Requires no backend, doesn't store data and runs 100% client-side.
- 💚 Waste free alternative to Business Cards.

---
You can find the source code on [Github](https://github.com/Azza292/QCard).

## Try it

Fill in any information you want and try it out at [QCard.now.sh](https://qcard.now.sh)

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

