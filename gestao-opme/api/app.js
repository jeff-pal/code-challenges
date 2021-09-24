const express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
app = express(),
router = express.Router()
axios = require('axios');

app.options('*', cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authentication");
    next();
});

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static('public'));


router.get('/users', async (req, res) => {

    if(!req.query.since)
        res.status(400).send('Please, Provide a query string with a "since" field containing an id value to start the list of users');

    let options;
    
    if(req.headers.authorization) {
      options = {
        headers: {Authorization: req.headers.authorization}
      }
    }
    else
      options = {};
    
    let since = req.query.since ? req.query.since : 0;
     
    axios.get(`https://api.github.com/users?since=${since}`, options)
         .then(response => {
            
            let link = response.headers.link,
            newSince = link.substring(link.search('since='), link.indexOf('>'));

            newSince = parseInt(newSince.split('=')[1]);
            res.status(200).send({next_since: newSince, list: response.data});
         })
         .catch(error => {
            console.log(error);
            res.status(500).send('Internal error');
         });
});


router.get('/users/:user/details', async (req, res) => {

    let user = req.params.user, options;
    
    if(req.headers.authorization) {
      options = {
        headers: {Authorization: req.headers.authorization}
      }
    }
    else
      options = {};
      
    axios.get(`https://api.github.com/users/${user}`, options).then(response => {
        console.log(response.data);
        res.status(200).send(response.data);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send('erro interno');
      });   
});

router.get('/users/:user/repos', async (req, res) => {

    let user = req.params.user, options;
    
    if(req.headers.authorization) {
      options = {
        headers: {Authorization: req.headers.authorization}
      }
    }
    else
      options = {};
      
    axios.get(`https://api.github.com/users/${user}/repos`, options).then(response => {
        console.log(response.data);
        res.status(200).send(response.data);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send('erro interno');
      });
});

app.use('/api', router);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
console.log(`[jeff-getlist-api] is listening on port ` +  app.get('port'));
});