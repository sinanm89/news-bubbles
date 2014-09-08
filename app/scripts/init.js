'use strict';
var NB = NB || {};


//Constants
NB.DUR = 200; //should match _variables.scss duration variable
NB.RESIZER_WIDTH = 24;
NB.splitPos = 0;

NB.MIN_POINTS = 1;
NB.HITS_PER_PAGE = 100;
NB.hasTouch = true;
NB.oldestStory = Infinity;

// //Even as I do this I know that using display name as a key is a bad idea...
// NB.hnCategoryColors = {
//   'default': '#2980b9',
//   'Hacker News story': '#2980b9',
//   'Ask HN': '#e74c3c',
//   'Show HN': '#16a085',
// };
// NB.rdCategoryColors = {
//   'default': '#2980b9',
//   'imgur.com': '#27ae60',
//   'AskReddit': '#f39c12',
//   'funny': '#d35400',
//   'pick': '#2980b9'
// };


/*

$asbestos: #7f8c8d;
$aliezarin: #e74c3c;
$green-sea: #16a085;
$nephritis: #27ae60;
$orange: #f39c12;
$pumpkin: #d35400;
$belizeHole: #2980b9;
*/