# Floored Panorama Viewer

See the tests folder for example usage.

## Oculus Setup
- See [here](https://github.com/benvanik/vr.js/tree/master)

## Documentation

```
index.html

<!DOCTYPE html>
<html>
    <head>
        <title>Testing</title>
        <!-- data-main attribute tells require.js to load
             scripts/main.js after require.js loads. -->
        <script data-main="main" src="require.js"></script>
    </head>
    <body>
    </body>
</html>
```

```
main.js

// Assumes library is in root of URL
require.config({
  baseUrl: '/',
  paths: {
    'fallback': 'fallback'
  }
});

require(['fallback'], function(fallback) {
    console.log(fallback.shouldShow);
    fallback.show('/tests/streetview', {});
});
```