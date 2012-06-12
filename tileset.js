// T I L E S E T . J S
//
// A JavaScript canvas utility library for working with tilesets.
// Made in mind for HTML5 Canvas game development or graphical art.

var tileset = (function () {
  var exports = this,
      _context,
      _tileSize = 32,
      _columns,
      _tilesets;

  // High level usage, needed to setup the tileset module

  exports.set = function (config) {
    _context    = config.context  || _context;
    _tileSize   = config.tileSize || _tileSize;
    _columns    = config.columns  || _columns;
    _tilesets   = config.tilesets || _tilesets;
  };

  // High level usage, pass a canvas x y coordinate and have 
  // it drawn for you.

  exports.tile = function (tileset, canvasX, canvasY, tileNo, config) {
    var config   = config || {},
        context  = config.context || _context,
        tileSize = config.tileSize|| _tileSize,
        columns  = config.columns || _columns,
        tilesets = config.tilesets|| _tilesets;

    getTileset(tileset, function (img) {
      var slicePos = getTilePosition(tileNo, config);
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

  exports.tileMap = function (tileset, twoDimArr, config) {
    // Not implemented.
  };

  // Lower level usage, pass just a tileNo and recieve back 
  // its x y position in a tileset

  exports.getTile = function (tileNo, config) {
    return getTilePosition(tileNo, config);
  }

  // Private, fetches a tileset and passes its DOM <img> to a callback

  function getTileset (tileset, cb) {
    var img = new Image();
    img.onload = function () {
      cb(img);
    };
    img.src = _tilesets[tileset];
    return img;
  }

  // Private, fetches the tile top left pos from the tileset

  function getTilePosition (tileNo, config) {
    var config   = config || {},
        tileSize = config.tileSize|| _tileSize,
        columns  = config.columns || _columns,

        maxPixelWidth = tileSize * columns,
        slicePos      = {},
        currentTileNo = 0,
        yTarget       = 0,
        xTarget       = 0;

    tileNo--;
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