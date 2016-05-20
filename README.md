# Resize Boundary
jQuery plugin for initialization based on window width. You can apply window width boundary initialization callbacks and they will be called only once when window width become in applyed boundary.

## Usage
```javascript
$.fn.resizeBoundary.addBoundary({from: fromPx, to: toPx}, cb, destroyCb); 
// cb will be called once when window size become in fromPx, toPx boundary
// destroyCb will be called once when window size become not in fromPx, toPx boundary

$.fn.resizeBoundary.matchBoundaries(); 
//call boundary cb based on current window width 
```

## Example (for columnizer plugin)
```javascript
$.fn.resizeBoundary
            .addBoundary({to: 820}, function() {
                $('#container-post').columnize({columns: 1});
            }, function () {
                $('#container-post').uncolumnize();
            })
            .addBoundary({from: 820, to: 1550}, function() {
                $('#container-post').columnize({columns: 2});
            }, function () {
                $('#container-post').uncolumnize();
            })
            .addBoundary({from: 1550}, function() {
                $('#container-post').columnize({columns: 3});
            }, function () {
                $('#container-post').uncolumnize();
            })
            .matchBoundaries();
```

## License

MIT © Oleh Birjukov
