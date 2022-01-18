'use strict';

const express = require('express');
const app = express();
app.use(express.json());

// Your code starts here. Placeholders for .get and .post are provided for
//  your convenience.
var candidates = [];

app.post('/candidates', function(req, res) {
  if(!req.body) {
    return res.sendStatus(400);
  }
  candidates.push(req.body);
  return res.sendStatus(201);
});

app.get('/candidates/search', function(req, res) {
  if(!req.query.skills) {
    return res.sendStatus(400);
  }
  if(candidates.length <= 0) {
    return res.sendStatus(404);
  }
  else {
    const requiredSkills = req.query.skills.split(',');
    const requiredSkillsLength = requiredSkills.length;
    let bestCandidate;
    let bestCandidateScore = 0;

    for(let candidate of candidates) {
      const currentCandidateSkills = [...candidate.skills];
      let currentCandidateScore = 0;

      for(let requiredSkill of requiredSkills) {
        const index = currentCandidateSkills.findIndex(item => item === requiredSkill);
        if(index >= 0) {
          currentCandidateSkills.splice(index, 1);
          currentCandidateScore++;
        }
      }
      if(currentCandidateScore > bestCandidateScore) {
        bestCandidate = candidate;
        bestCandidateScore = currentCandidateScore;
        
      }
      if(bestCandidateScore === requiredSkillsLength) {
        return res.status(200).send(bestCandidate);
      }
    }
    if(!bestCandidate) {
      return res.sendStatus(404);
    }
    return res.status(200).send(bestCandidate);
  }
});

app.listen(process.env.HTTP_PORT || 3000);
