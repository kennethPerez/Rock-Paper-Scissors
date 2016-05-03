Rock-Paper-Scissor
===================

In a game of rock-paper-scissors, each player chooses to play Rock (**R**), Paper (**P**), or Scissors (**S**). 
The rules are: 

 - Rock beats Scissors.
 - Scissors beats Paper.
 - Paper beats Rock.

A rock-paper-scissors game is encoded as a list, where the elements are 2-element lists that encode a player’s name and a player’s strategy.

```
[[ "Armando", "P" ], [ "Dave", "S" ]]
# => returns the list ["Dave", "S"] wins since S>P
```

A rock, paper, scissors tournament is encoded as a bracketed array of games - that is, each element can be considered its own tournament.

```
[
	[
		[ ["Armando", "P"], ["Dave", "S"] ],
		[ ["Richard", "R"], ["Michael", "S"] ]
	],
	[
		[ ["Allen", "S"], ["Omer", "P"] ],
		[ ["John", "R"], ["Robert", "P"] ]
	]
]
```

[View a running example of aplication here](http://kenneth-perez.scalingo.io/)


Installation
-------------
First you need installed in you PC:

 1. Node.JS<br>
[![](http://thomas-harlan.com/images/nodejs-logo.png)](https://nodejs.org/en/download/)

 2. MongoDB<br>
[![](https://www.mulesoft.org/sites/all/themes/litejazz/images/muleforge/3.5.0-Everest-b-mongodb-connector-icon-mongo-small.png)](https://www.mongodb.org/)

*If you have problem with the instalation, view some tutorial for install that.*

When you install this and both are functional to use:
 (Make sure the ***Mongod service is running***)

Clone this repository:
```sh
$ git clone https://github.com/kennethPerez/Rock-Paper-Scissors.git
```
then:
```sh
$ cd <ROUTE>/Rock-Paper-Scissors
$ npm install
$ npm start
```

> In your browser go to http://localhost:3000
