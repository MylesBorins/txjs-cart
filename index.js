#!/usr/bin/env node

var request = require('request-promise');
var track = 1;
var sorryMsg = 'Sorry, nothing to stream for now...';

console.log("✨ Streaming Cascadiafest 2015✨ ");

var last = null;

(function tick() {
  request.get('http://www.streamtext.net/text-data.ashx?event=CascadiaFest2015&last=' + last + '&language=en')
  .then(function(v) {
      v = JSON.parse(v);
      last = v.lastPosition;
      if (v.i && v.i.length) {
        process.stdout.write(v.i.map(function(v) {
          return decodeURIComponent(v.d);
        }).join(''));
      }
  })
  .catch(function(err){
    if(err.statusCode === 404) {
      process.stdout.write(sorryMsg);
      sorryMsg = '.';
    }
  })
  .finally(setTimeout.bind({}, tick, 1000));
})(null);

