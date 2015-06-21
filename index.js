#!/usr/bin/env node

var request = require('request-promise');
var track = 1;
var sorryMsg = 'Sorry, nothing to stream for now...';

console.log("✨ Streaming jQuerySF 2015✨ ");


(function tick(stamp) {
  request.get('http://www.streamtext.net/text-data.ashx?event=JQSF&last=' + stamp + '&language=en')
  .then(function(v) {
      v = JSON.parse(v);
      stamp = v.lastPosition;
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
  .finally(setTimeout.bind({}, tick.bind({}, stamp), 1000));
})(null);

