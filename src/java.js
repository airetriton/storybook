$( document ).ready(function() {

var s = Snap('svg');
var text = 'Choose Your Adventure'
var len = text.length;
var array = [];
for (var x = 0; x < len; x++) {
  var t = text[x]
  array.push(t);
}
var txt = s.text(50, 50, array)
$('tspan').css({
  'font-size': 50,
  fill: 'none',
  stroke: '#ff66ff',
  'stroke-dasharray': 200,
  'stroke-dashoffset': 200
})

$('tspan').each(function(index) {
  $(this).stop(true, true).delay(170 * index).animate({
    'stroke-dashoffset': 0,
  }, 1000, function() {
    $(this).css('fill', '#8080ff')
  })
})


});