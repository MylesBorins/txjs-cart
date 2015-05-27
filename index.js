#!/usr/bin/env node

var request = require('request-promise');
var track = 1;

if (process.argv[2] && process.argv[2].toLowerCase() == 'b') {
  console.log("✨ Streaming track B✨ ");
  track = 2;
} else {
  console.log("✨ Streaming track A✨ ");
}

(function tick(stamp) {
  request.get('http://www.streamtext.net/text-data.ashx?event=JSConf' + track +  '&last=' + stamp + '&language=en')
  .then(function(v) {
      v = JSON.parse(v);
      stamp = v.lastPosition;
      if (v.i && v.i.length) {
        process.stdout.write(v.i.map(function(v) {
          return decodeURIComponent(v.d);
        }).join(''));
      }
  })
  .catch(function(){})
  .finally(setTimeout.bind({}, tick.bind({}, stamp), 1000));
})(null);

