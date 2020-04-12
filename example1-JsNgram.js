// example using JsNgram
// https://github.com/sukuba/js-py-ngram-full-text-search

$(document).ready(function(){
  
  var $q = $('#q');
  var ignore = /[\s,.，．、。]/g;
  
  JsNgram.errorSelector = $('#error');
  JsNgram.resultSelector = $('#result');
  JsNgram.size = 2;
  JsNgram.indexBase = 'idx/';
  JsNgram.textBase = 'txt/';
  JsNgram.keySeparator = '/';
  JsNgram.verbose = 1;
  
  function enterSearch() {
    var what = $q.val();
    if(ignore.test(what)) {
      setTimeout(
        function(){
          JsNgram.appendErrorMessage(' / Blanks, periods, or other unsupported characters were removed before search.');
        }, 
        2400
      );
      what = what.replace(ignore, '');
      $q.val(what);
    }
    JsNgram.search(what);
  }
  
  $('#search').click(function(){
    enterSearch();
  });
  
  $q.keypress(function(k){
    if(k.which == 13) {
      enterSearch();
      return(false);
    }
  });
  
  $q.focus();
});

$('#error').click(function(){
  
var chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  
  title:{
    text:"Fortune 500 Companies by Country"
  },
  axisX:{
    interval: 1
  },
  axisY2:{
    interlacedColor: "rgba(1,77,101,.2)",
    gridColor: "rgba(1,77,101,.1)",
    title: "Number of Companies"
  },
  data: [{
    type: "bar",
    name: "companies",
    axisYType: "secondary",
    color: "#014D65",
    dataPoints: [
      { y: 3, label: "Sweden" },
      { y: 7, label: "Taiwan" },
      { y: 5, label: "Russia" },
      { y: 9, label: "Spain" },
      { y: 7, label: "Brazil" },
      { y: 7, label: "India" },
      { y: 9, label: "Italy" },
      { y: 8, label: "Australia" },
      { y: 11, label: "Canada" },
      { y: 15, label: "South Korea" },
      { y: 12, label: "Netherlands" },
      { y: 15, label: "Switzerland" },
      { y: 25, label: "Britain" },
      { y: 28, label: "Germany" },
      { y: 29, label: "France" },
      { y: 52, label: "Japan" },
      { y: 103, label: "China" },
      { y: 134, label: "US" }
    ]
  }]
});
chart.render();

}
