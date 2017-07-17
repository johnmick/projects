var cardIndex = 0;

var poses = {
  "Savasana": [ "330px", "1497px", "83px", "49px" ],
  "Butterfly": [ "239px", "1497px", "83px", "49px" ],
  "Supine Twist": [ "56px", "1499px", "81px", "41px" ],
  "Dead Man's Pose": [ "896px", "1398px", "70px", "40px" ],
  "Plow Pose": [ "794px", "1390px", "84px", "54px" ],
  "Shoulderstand Headstand Waterfall": [ "728px", "1366px", "38px", "76px" ],
  "Fish": [ "608px", "1396px", "85px", "38px" ],
  "Reverse Tabletop": [ "520px", "1383px", "78px", "60px" ],
  "Seated Forward Bend": [ "423px", "1388px", "84px", "47px" ],
  "Seated Single Leg Extension": [ "236px", "1390px", "87px", "43px" ],
  "Frog": [ "148px", "1382px", "79px", "73px" ],
  "Double Pigeon": [ "895px", "1262px", "68px", "78px" ],
  "Half Pigeon": [ "607px", "1271px", "85px", "58px" ],
  "High to Low 10x": [ "516px", "1262px", "85px", "65px" ],
  "Abdominal Twists 50x": [ "428px", "1278px", "75px", "43px" ],
  "60/30 Lift 10x": [ "330px", "1271px", "84px", "51px" ],
  "Scissor Legs 50x": [ "250px", "1270px", "64px", "51px" ],
  "Dead Bug": [ "156px", "1266px", "68px", "62px" ],
  "Supta Baddha Konasana": [ "52px", "1266px", "83px", "51px" ],
  "Wheel 6x": [ "896px", "1152px", "66px", "73px" ],
  "Bridge": [ "798px", "1162px", "79px", "52px" ],
  "Camel 2x": [ "718px", "1150px", "55px", "72px" ],
  "Floor Bow 2x": [ "524px", "1156px", "70px", "55px" ],
  "Locust 2x": [ "422px", "1166px", "85px", "43px" ],
  "Twisting Triangle": [ "431px", "1020px", "74px", "76px" ],
  "Namaste Front Facing Forward Fold": [ "334px", "1024px", "76px", "59px" ],
  "Side Facing Wide Leg Forward Bend": [ "241px", "1022px", "81px", "58px" ],
  "Triangle": [ "150px", "1029px", "80px", "77px" ],
  "Tree": [ "728px", "805px", "32px", "80px" ],
  "Dancer's Pose 2x": [ "621px", "801px", "63px", "72px" ],
  "Half Moon": [ "522px", "811px", "75px", "70px" ],
  "Airplane": [ "444px", "818px", "64px", "56px" ],
  "Extended Leg Raise": [ "342px", "801px", "59px", "76px" ],
  "Eagle 2x": [ "166px", "801px", "44px", "84px" ],
  "Crow": [ "64px", "812px", "67px", "71px" ],
  "Gorilla": [ "904px", "694px", "54px", "76px" ],
  "Peace Fingers": [ "814px", "696px", "47px", "74px" ],
  "Thunderbolt Prayer": [ "626px", "680px", "58px", "73px" ],
  "Extended Side Angle": [ "433px", "572px", "63px", "69px" ],
  "Warrior 2": [ "334px", "582px", "81px", "72px" ],
  "Hands to Heart Center Twist": [ "248px", "592px", "61px", "43px" ],
  "Crescent Lunge": [ "154px", "572px", "68px", "78px" ],
  "Side Plank": [ "707px", "372px", "73px", "67px" ],
  "Flip Dog": [ "610px", "370px", "80px", "53px" ],
  "Warrior 1": [ "625px", "252px", "48px", "74px" ],
  "Thunderbolt": [ "78px", "251px", "40px", "85px" ],
  "Upward Facing Dog": [ "424px", "146px", "84px", "70px" ],
  "Chaturanga Dandasana": [ "328px", "160px", "86px", "38px" ],
  "Half Lift": [ "250px", "148px", "59px", "76px" ],
  "Forward Fold": [ "167px", "146px", "39px", "78px" ],
  "Child's Pose": [ "55px", "50px", "76px", "60px" ],
  "Downward Facing Dog": [ "145px", "40px", "85px", "70px" ],
  "Ragdoll": [ "235px", "40px", "85px", "70px" ],
  "Extended Mountain": [ "330px", "37px", "80px", "76px" ],
  "Samashtiti with 3 OMs": [ "434px", "37px", "60px", "72px" ]
};

var card  = document.getElementById("card");
var label = document.getElementById("label");
function setCard(opts, name) {
  card.style.backgroundPosition = "-" + opts[0] + " -" + opts[1]; 
  card.style.width              = opts[2];
  card.style.height             = opts[3];
  label.innerHTML               = name;
}

var p = [];
for (var pose in poses)
  p.push(pose);
function advance() {
	cardIndex += 1;
	if (cardIndex > p.length - 1)
		cardIndex = 0;
  var name = p[cardIndex];
  setCard(poses[name], name);
}
setTimeout(function() {
  card.style.display = "block";
  advance();
  setInterval(advance, 2000);
  document.body.onclick = advance;
}, 3000);

////////////////////////////////////////////// 
// var counts = {}
// var tmp = "var poses = {\n";
// cards.forEach(function(card) {
// 	var name = card[4];
// 	if (counts[name] === undefined) {
// 		counts[name] = 0;
//     tmp += '  "' + name + '": [ "';
// 		tmp += card[0] + '", "';
// 		tmp += card[1] + '", "';
// 		tmp += card[2] + '", "';
// 		tmp += card[3] + '" ],\n';
// 
// 	}
// 	counts[name] += 1;
// });
// console.log("Counts", counts);
// tmp += "\n};";
// console.log(tmp);

////////////////////////////////////////////// 
// var names = [];
// cards.forEach(function(card) {
// 	var name = card[4];
// 	if (names.indexOf(name) === -1)
// 		names.push(name);
// });
// console.log("Unique Names", names);
