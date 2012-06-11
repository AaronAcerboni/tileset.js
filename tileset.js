// T I L E S E T . J S
//
// A JavaScript canvas utility library for working with tilesets.
// Made in mind for HTML5 Canvas game development or graphical art.

var tileset = (function () {
  var exports = this,

      context,
      tileSize = 32,
      columns,
      sheets;

  // High level usage, needed to setup the tileset module

  exports.setup = function (config) {
    context    = config.context;
    tileSize   = config.tileSize || tileSize;
    columns    = config.columns;
    sheets     = config.sheets;
  };

  // High level usage, pass a canvas x y coordinate and have 
  // it drawn for you.

  exports.tile = function (sheet, canvasX, canvasY, tileNo) {
    getTileset(sheet, function (img) {
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

  exports.tileMap = function (sheet, twoDimensionalArray) {

  };

  // Lower level usage, pass just a tileNo and recieve back 
  // its x y position in a tileset

  exports.sliceTile = function (sheet, tileNo) {
    return getTilePosition(tileNo);
  }

  // Private, fetches a tileset and passes its img to a callback

  function getTileset (sheet, cb) {
    var img = new Image();
    img.onload = function () {
      cb(img);
    };
    img.src = sheets[sheet];
    return img;
  }

  // Private, fetches the tile as a slice from the tileset

  function getTilePosition (tileNo) {
    var maxPixelWidth = tileSize * columns,
        slicePos      = {},
        currentTileNo = 0,
        yTarget       = 0,
        xTarget       = 0;

    console.log('start');

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