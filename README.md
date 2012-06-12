# tileset.js

*600~ bytes minified*

Tilesets are bitmaps with a number of different tiles which can be pieced 
together to create graphical scenes.

This library aims to provide an easy layer for working with the html canvas 
and multiple tilsets. 

tileset.js works fine with uniformed square tiles and the tilesets can 
be any size providing they are all the same width.

You only need to specify the tile's size and the amount of columns it has.

    var tilemap  = [
          [1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 1, 4, 2, 1],
          [1, 0, 0, 0, 1, 2, 4, 1],
          [1, 1, 1, 1, 1, 1, 1, 1]
        ];

    tileset.set({
      context: document.getElementsByTagName('canvas')[0].getContext('2d'),
      sheets: {
        test: 'sheets/test.jpg',
      },
      tileSize: 16,
      columns: 4
    });

    for(var i = 0; i < tilemap.length; i++){
      for(var n = 0; n < tilemap[i].length; n++){
        tileset.tile('test', n * tileSize, i * tileSize, tilemap[i][n]);
      }
    }

Generates the following:

![Mapped tiles](https://github.com/AaronAcerboni/tileset.js/blob/master/example/outcome.png?raw=true)


From the following tileset:

![Tileset](https://github.com/AaronAcerboni/tileset.js/blob/master/example/sheets/test.jpg?raw=true)

## Usage

tileset.js will give users a 0-based integer lookup to provided tilesets from 
left to right and then the next row running down the tileset. 
       
    | 0 | 1 | 2 | 4 |
    | 5 | 6 | 7 | 8 |
    | 9 |10 |11 |12 |

As previously mentioned one should specify the tile size and the columns the 
tilesets have. This is how tileset.js is able to achieve the lookup.

If you are working with uniformed tilesets you may specify this all in a config 
option.

However tileset.js has been designed for the possibility of sized tilesets also.
So the config settings can be overridden in every method or reset to something 
else.

Tile sizes within each tileset must be uniformed however. So if its 16 pixels in 
tileset A then the rest of the tiles in A should also be 16 pixels.


### Configuration

`tileset.set(config)` must be called if one does not specify a config for each 
method.

The config object must specify the following key/values:

- A canvas 2d **context**. This is where the tile bitmaps will be applied to.
- A **sheets** object. This should be a object key/value mapping between a 
  sheet's identifier name and its location for retrieval.
- A **columns** integer. The amount of tile columns within each tileset. This 
  value is **not** zero based.

The following key/value is optional:

- tileSize (default: 32) is the square pixel size of each tile in the tileset.

An example config option:

    {
      context:  context,
      tilesets: {
        forest: 'sheets/forest.jpg',
        town: 'sheets/town.jpg'
      },
      tileSize: 8,
      columns: 6
    }

### Methods

#### .set(config)

Sets the default configuration options for tileset to use (see Configuration &uarr;).

#### .tile(tileset, canvasX, canvasY, tileNumber, config)

This method draws a tile to the provided canvas context.

- `tileset`: One of the keys specified in config.tilesets.
- `canvasX`: The canvas x position to apply a tile from the top left.
- `canvasY`: The canvas y position to apply a tile from the top left.
- `tileNumber`: An integer representing the desired tile to use (see Usage).
- `config`: a config to use or use over the previously set config. If config 
properties were previously set, then setting only specific properties in the 
config object is possible.

#### .tileMap(tileset, twoDimensionalArray, config)

Not implemented yet.

#### .getTile(tileset, tileNumber, config)

This is a proxy to the small algorithm tileset.js uses for tile traversal based 
on integers.

It returns `{x: #, y: #}` which is the top left position of a tile on the 
requested tileset. This is useful as this can be used with the tile size to slice 
from the tileset.

- `tileNumber`: An integer representing the desired tile to use (see Usage).
- `config`: a config to use or use over the previously set config. If config 
properties were previously set, then setting only specific properties in the 
config object is possible.

### Further development ideas

- Investigate layers and pseudo transparency
- Allow for explicit specification of column and tile size for each sheet. This 
is over config overloading in methods.