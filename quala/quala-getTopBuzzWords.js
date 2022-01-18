import fetch from 'node-fetch';

const customersURL = 'https://tp-customers.herokuapp.com/customers';

function getCustomerUrl(url=customersURL) {
  return fetch(url).then(async response => {
    const users = await response.json();
    users.sort((a, b) => (a.distance - b.distance));
    return users.slice(0, 3);
  });
}

function getCustomerUrlById(id){
  return fetch(`${customersURL}/${id}`)
  .then(async response => {
    const data = await response.json();
    return data;
  });
}

async function getUserDetails(data) {
  let userDetails = [];
  for(let i=0; i< data.length; i++) {
    const userDetail = data[i];
    await getCustomerUrlById(userDetail.id).then(item => {
      userDetails.push(item)
    });
  }
  return userDetails;
}

function getTopBuzzWords(buzzWordsString) {
  const buzzWords = buzzWordsString.split(';');
  let topBuzzWords = {};

  for(let i=0; i < buzzWords.length; i++) {
    const key = buzzWords[i];

    if(!topBuzzWords[key]) {
      topBuzzWords[key] = 1;
    }
    else {
      topBuzzWords[key] += 1;
    }
  }
  
  const topBuzzWords2 = Object.keys(topBuzzWords).map(function(word) { return [word, topBuzzWords[word]]; })

  topBuzzWords2.sort((a, b) => {
    const result = b[1] - a[1];
    return result;
  })

  console.log(topBuzzWords2);
} 

getCustomerUrl().then(getUserDetails).then( firstThreeUserDetails => {
  for(let i=0; i < firstThreeUserDetails.length; i++) {
    const item = firstThreeUserDetails[i];
    getTopBuzzWords(item.buzzWords);
  }
});

/*
   buzzWords: 'transition;brand;iterate;cultivate;mesh;exploit;whiteboard;whiteboard;mesh;reinvent;engage;visualize;redefine;disintermediate;deploy;drive;innovate;architect;transform;repurpose;synergize;reintermediate;cultivate;extend;harness;visualize;exploit;syndicate;disintermediate;streamline;streamline;mesh;drive;generate;streamline;unleash;strategize;synergize;benchmark;deliver;reinvent;disintermediate;whiteboard;syndicate;deploy;synthesize;architect;integrate;disintermediate;envisioneer;synthesize;optimize;synthesize;visualize;aggregate;repurpose;harness;target;deliver;orchestrate;innovate;deploy;repurpose;revolutionize;matrix;unleash;productize;cultivate;architect;generate;engage;engineer;integrate;disintermediate;productize;enable;innovate;implement;facilitate;engage;engage;embrace;enhance;reinvent;exploit;seize;reintermediate;evolve;matrix;reintermediate;envisioneer;disintermediate;strategize;morph;brand;orchestrate;synergize;target;iterate;utilize'
*/