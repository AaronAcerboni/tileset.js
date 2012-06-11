# tileset.js

This library is aims to provide an easy layer for working with the html canvas 
and tilsets. 

Tilesets are bitmaps with a number of different tiles which can be pieced 
together to create graphical scenes.

    var context  = document.getElementsByTagName('canvas')[0].getContext('2d'),
        tileSize = 16,
        tilemap  = [
          [1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 1, 4, 2, 1],
          [1, 0, 0, 0, 1, 2, 4, 1],
          [1, 1, 1, 1, 1, 1, 1, 1]
        ];

    tileset.setup({
      context: context,
      sheets: {
        test: 'sheets/test.jpg',
      },
      tileSize: tileSize,
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

### Configuration

Before tileset can be used tileset.setup(config) must be called.

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
      sheets: {
        forest: 'sheets/forest.jpg',
        town: 'sheets/town.jpg'
      },
      tileSize: 8,
      columns: 6
    }

### Methods

`tileset.setup(config)` &mdash; See Configuration

`tileset.tile(sheet, canvasX, canvasY, tileNumber)` &mdash; See example

`tileset.tileMap` &mdash; Not implemented

`tileset.sliceTile` &mdash; See example