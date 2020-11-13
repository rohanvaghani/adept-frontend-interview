/**
 * Requirements
 * 1. There are 4 functions to fill in.
 * 2. Some functions will use other functions to complete their answers.
 * 3. Avoid using for, forEach, for...in or for...of.
 * 4. Do not mutate objects that are being passed to functions.
 * 6. Run the file using `node question.js` in your terminal and you will see the output.
 */

/**
 * Returns all the points a team had in the game.
 *
 * @param pointsPerQuarter {Array<number>} - An array of numbers that represent all the points a team had in the game.
 * @returns {number} - Sum of all points that a team had in the game.
 */
const totalScore = (pointsPerQuarter) => {
  // @TODO
  let i = 0;
  let t = 0;
  while (i < pointsPerQuarter.length) {
    t += pointsPerQuarter[i];
    i += 1;
  }
  console.log(pointsPerQuarter);
  return t;
};

const raptorsScore = totalScore([26, 21, 25, 21]);
console.log('Total Score', raptorsScore);

/**
 * Calculates and returns the average points of all players' points.
 *
 * @param players {Object<string, Object<points, number>>}
 * @returns {number} - Average points per starting player
 */
const getAveragePoints = (players) => {
  // @TODO
  let t = 0;
  Object.entries(players).map(item => {
    t += item[1].points;
   });
   console.log(players);
   return t / Object.entries(players).length;
};

const startingPlayers = {
  ibaka: {
    points: 12,
  },
  miles: {
    points: 13,
  },
  anunoby: {
    points: 2,
  },
  lowry: {
    points: 5,
  },
  derozen: {
    points: 13,
  },
};

const averageScore = getAveragePoints(startingPlayers);
console.log('Scoring Average', averageScore);

/**
 * Returns a new players object that excludes starting players who scored less than the the average.
 * - Return value of the function should be in the same format as the `players` parameter of the function.
 * - Make use of `startingPlayers` and `averageScore` that were created in the question #2.
 *
 * @param players {Object<string, Object<points, number>>}
 * @param average {number}
 * @returns {Object<string, Object<points, number>>}
 */
const getHighestScorers = (players, average) => {
  // @TODO
  let t = [];
  Object.entries(players).map(item => {
    if(item[1].points > average){
      t.push(item);
    }
   });
   console.log(players);
   return t;
};

const highestScoringPlayers = getHighestScorers(startingPlayers, averageScore);
console.log('Highest Scoring Players', highestScoringPlayers);

/**
 * Returns a new players object where each player object has a new field `perQuarter` whose value represents each player's time played in each quarter.
 * - `time` field in each player's object represent the total time they played in the game.
 * - assuming every player played all quarters, add a `perQuarter` field to each player's object.
 *
 * @param timePlayedArr {Array<{ name: string, time: number }>}
 * @returns {Array<{ name: string, time: number, perQuarter: number }>}
 */
const addTimePlayedPerQuarter = (timePlayedArr) => {
  // @TODO
  let t = [];
  Object.entries(timePlayedArr).map(item => {
    console.log(item[1])
    t.push({...item[1],  perQuarter: item[1].time });
   });
   console.log(timePlayedArr);
   return t;
};

const timePlayed = [
  {
    name: 'ibaka',
    time: 18,
  },
  {
    name: 'miles',
    time: 23,
  },
  {
    name: 'anunoby',
    time: 20,
  },
  {
    name: 'lowry',
    time: 30,
  },
  {
    name: 'derozen',
    time: 30,
  },
];

const timePerQuarter = addTimePlayedPerQuarter(timePlayed);
console.log('Players with time per quarter', timePerQuarter);
