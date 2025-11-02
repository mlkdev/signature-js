# SignatureJS

A zero-dependency JavaScript utility to easily turn a hidden input field into a functional signature canvas.

## Installation
Just clone the repo into your static assets directory and include it either through your preferred build tool or with a classic `<script>` tag right before `</body>`:
```html
<script src="/path/to/signature.js"></script>
```

## Integration
Just add a `data-signature-fields` attribute to your form tag. The value of the data attribute is a CSV (comma separated value) list of hidden fields in that form that should be converted into signature pads. You can have as few or as many as you like.

```html
<form method="POST" data-signature-fields="signature,initials">
    ...
    <div><input type="hidden" name="signature" value="" /></div>
    <div><input type="hidden" name="initials" value="" /></div>
    ...
</form>
```
