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


Let's break it down in `bash`:
```bash
# A QCard URL
$ SAMPLE="https://qcard.now.sh/?v=QkVHSU46VkNBUkQNCk46R2l0aHViIEJyb3dzZXINClRJVExFOkludGVyZXN0ZWQgaW4gUUNhcmQNClVSTDpodHRwczovL3FjYXJkLm5vdy5zaA0KTk9URTpIZXlcLCB0aGF0J3MgbWUhDQpFTkQ6VkNBUkQ="

# Create a helper to parse the QCard Url,
# This grabs the contents of the `v` parameter and base64 decodes it.
# ---
# 1. echo in the QCard Url.
# 2. grep the `v` parameter and contents.
# 3. cut the first 3 characters.
# 4. base64 decode the result.
$ function qcard() { echo "$@" | grep --only-matching v=.*$ | cut --characters 3- | base64 --decode;}

# Run the helper
$ qcard $SAMPLE

# You can save the contents to a file to import somewhere
$ qcard $SAMPLE > contact.vcf
```
[Sample QCard](https://qcard.now.sh/?v=QkVHSU46VkNBUkQNCk46R2l0aHViIEJyb3dzZXINClRJVExFOkludGVyZXN0ZWQgaW4gUUNhcmQNClVSTDpodHRwczovL3FjYXJkLm5vdy5zaA0KTk9URTpIZXlcLCB0aGF0J3MgbWUhDQpFTkQ6VkNBUkQ=)

## I want to make QCards programatically

Cool, here are some examples - Feel free to add your own!

 - [QCardGeneration](./examples/QCardGeneration.md)

## Contributions

Welcome!

## Issues

If your device gets hit by a stray cosmic ray and the application breaks.. please create an Issue here on Github.

