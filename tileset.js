// T I L E S E T . J S
//
// A JavaScript canvas utility library for working with tilesets.
// Made in mind for HTML5 Canvas game development or graphical art.

var tileset = (function () {
  var exports = this,

      context,
      tileSize = 32,
      columns,
      tilesets;

  // High level usage, needed to setup the tileset module

  exports.set = function (config) {
    context    = config.context  || tilesets;
    tileSize   = config.tileSize || tileSize;
    columns    = config.columns  || columns;
    tilesets   = config.tilesets || tilesets;
  };

  // High level usage, pass a canvas x y coordinate and have 
  // it drawn for you.

  exports.tile = function (tileset, canvasX, canvasY, tileNo) {
    getTileset(tileset, function (img) {
      var slicePos = getTilePosition(tileNo);
      context.drawImage(
        img,
        slicePos.x,
        slicePos.y,
        tileSize,
        tileSize,
        canvasX,
        canvasY,
        tileSize,
        tileSize
      );
    });
  };

  // High level usage, pass a 2d array and have it drawn
  // for you

  exports.tileMap = function (tileset, twoDimensionalArray) {

  };

  // Lower level usage, pass just a tileNo and recieve back 
  // its x y position in a tileset

  exports.getTile = function (tileset, tileNo) {
    return getTilePosition(tileNo);
  }

  // Private, fetches a tileset and passes its img to a callback

  function getTileset (tileset, cb) {
    var img = new Image();
    img.onload = function () {
      cb(img);
    };
    img.src = tilesets[tileset];
    return img;
  }

  // Private, fetches the tile as a slice from the tileset

  function getTilePosition (tileNo) {
    var maxPixelWidth = tileSize * columns,
        slicePos      = {},
        currentTileNo = 0,
        yTarget       = 0,
        xTarget       = 0;

    while (true) {
      if (xTarget === maxPixelWidth) {
        xTarget = 0;
        yTarget += tileSize;
      }
      if (currentTileNo > tileNo) {
        slicePos['x'] = xTarget;
        slicePos['y'] = yTarget;
        break;
      }
      xTarget += tileSize;
      currentTileNo++;
    }
    return slicePos;
  }

  return exports;
} () );