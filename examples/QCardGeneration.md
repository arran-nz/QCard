# QCard Generation

## Python

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
