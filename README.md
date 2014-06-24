# Floored Panorama Viewer

See the tests folder for example usage.

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