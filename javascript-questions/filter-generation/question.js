/**
You will use data that we use in production. You will need to generate unique filters from a list of data.

Data list format:
[
  {
    "_id":"5a6771db8393c714a22cfd93",
    "text":"sleeveless jacket",
    "metadata":{
      "created_by":"5a217e6b166ffe2c4a99667b"
    },
    "revision":"new",
    "status":"PENDING",
    "annotations":[
      {
        "value":"SLEEVELESS",
        "type":"ATTRIBUTE",
        "name":"SLEEVE_TYPE"
      },
      {
        "type":"CATEGORY",
        "name":"JACKET"
      }
    ]
  },
  {
    "_id":"5a6771db8393c714a22cfd86",
    "text":"jacket",
    "metadata":{
      "created_by":"5a217e6b166ffe2c4aAAAAAA"
    },
    "revision":"new",
    "status":"APPROVED",
    "annotations":[
      {
        "value":"COTTON",
        "type":"ATTRIBUTE",
        "name":"MATERIAL"
      },
      {
        "type":"CATEGORY",
        "name":"JACKET"
      }
    ]
  }
]

Expected output:
{
  "attribute":[
    "MATERIAL:COTTON",
    "SLEEVE_TYPE:SLEEVELESS"
  ],
  "category":[
    "JACKET"
  ],
  "status":[
    "APPROVED",
    "PENDING"
  ],
  "creator":[
    {
      "value":"5a217e6b166ffe2c4a99667b"
    },
    {
      "value":"5a217e6b166ffe2c4aAAAAAA"
    }
  ]
}

Requirements
- The `attribute` and `category` values will need to be pulled out of the `annotations` field value and aggregated based on `type`
- All lists (`attribute`, `category`, `status` and `creator`) should be unique with no falsey values.
- `attribute`, `category` and `status` should be sorted alphabetically.
- Try to get it running as fast as possible while using ES6 features and syntax.
- Avoid using for, forEach, for...in or for...of (There are close to 12K entries).
- The example data above is a simplified schema, the one you will be using will have many other fields.
- Run the file using `node question.js` in your terminal and you will see the output.
- You can alternatively have the result saved to a JSON file named `result.json`.
- You can find the expected output in ./data/result-full.js
*/

/**
 * Answer
 */

const data = require('./data/queries.json');

function uniqueByAttribute(arr, prop){
  return { "attribute": arr.reduce((a, d) => {
    if(!a.includes(d[prop].map(item => { 
      if(item["type"] === "ATTRIBUTE")
        a.push({ [item["name"]] : item["value"] });
      })))
    return a;
  }, [])};
}

function uniqueByCategory(arr, prop){
  return { "category": arr.reduce((a, d) => {
    if(!a.includes(d[prop].map(item => { 
      if(item["type"] === "CATEGORY")
        a.push(item["name"]) 
    })))
    return a.filter((c, d) => a.indexOf(c) === d).sort();
  }, [])};
}

function uniqueByStatus(arr, prop){
  return { "status": arr.reduce((a, d) => {
    if (!a.includes(d[prop])) { a.push(d[prop]); }
    return a.sort();
  }, [])};
}

function uniqueByCreator(arr, key, v) {
  return { "creator": [...new Map(arr.map(item => [item[key][v], item[key][v] !== null ? {value: item[key][v]} : null ])).values()]}
}

let result =  Object.assign(
  uniqueByAttribute(data, "annotations"),
  uniqueByCategory(data, "annotations"),
  uniqueByStatus(data, "status"),
  uniqueByCreator(data, "metadata","created_by"),
);

console.log(result);