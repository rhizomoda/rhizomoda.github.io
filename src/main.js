// main.js
document.addEventListener('DOMContentLoaded', function () {
  initializeEditor('myprimary', 'index.document');
  initializeEditor('mysecondary', 'moda.document');
  initializeEditor('mytertiary', 'rhizo.document');
  var wallpapers = [
    'fill-071',
    'fill-074',
    'fill-075',
    'fill-076',
    'fill-080',
    'fill-087',
    'fill-096',
    'fill-099',
    'fill-103',
    'fill-108',
    'fill-114',
    'fill-115'
  ];
  var wallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
  document.body.classList.add(wallpaper);
  // var planetarium = null;
  new MenuBar(document.getElementById('mymenubar'), [{
    text: 'Widgets',
    subMenuItems: [{
      text: 'VirtualSky',
      handler: function () {
        // if (!planetarium) {
        //   planetarium = S.virtualsky({
        //     id: 'myvirtualsky',
        //     latitude: 45.51,
        //     live: true,
        //     longitude: -73.56,
        //     projection: 'stereo'
        //   });
        // }
        var el = document.getElementById('myvirtualsky');
        el.classList.toggle('hidden');
      }
    }]
  }]);
}, false);
