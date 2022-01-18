'use strict';

import lodash from 'lodash';
import { v4 as uuidv4, validate as uuidv4Validate } from 'uuid';
import express from 'express';
import faker from '@faker-js/faker';

const app = express();
app.use(express.json());

// Your code starts here.
// Placeholders for all requests are provided for your convenience.

const users = [];
const sessionTokens = [];
const articles = [];

function isValidData(object, keys) {
    if(!object) {
        return false;
    }
    for(let item of keys) {
        if(
            !object[item.key] ||
            typeof object[item.key] !== item.expectedType
        ) {
            return false;
        }
    }
    return true;
}

function isValidUser(user) {
    const keys = [{
            key: 'user_id',
            expectedType: 'string',
        },
        { 
            key:'login',
            expectedType: 'string',
        },
        { 
            key: 'password',
            expectedType: 'string',
        }
    ];
    return isValidData(user, keys);
}

function isValidLogin(user) {
    const keys = [{
            key: 'login',
            expectedType: 'string',
        },
        { 
            key:'password',
            expectedType: 'string',
        },
    ];
    return isValidData(user, keys);
}

function isValidArticle(article) {
    const keys = [{
            key: 'article_id',
            expectedType: 'string',
        },
        { 
            key:'title',
            expectedType: 'string',
        },
        { 
            key:'content',
            expectedType: 'string',
        },
        { 
            key:'visibility',
            expectedType: 'string',
        },
    ];
    return isValidData(article, keys);
}

function createSession(userId, token) {
    sessionTokens.push({
        user_id: userId,
        token
    })
}

function isValidSession(authenticationHeader) {
    const session = lodash.find(sessionTokens, item => item.token === authenticationHeader)

    if(!session) {
        return false;
    }
    if(!uuidv4Validate(session.token)) {
        return false;
    }
    return session;
}

function sessionAuthorization(req, res, next) {
    const validSession = isValidSession(req.headers['authentication-header']);
    if(!validSession) {
        return res.sendStatus(401);
    }
    req.body.user_id = validSession.user_id;
    return next();
}

function isValidVisibility(visibility) {
    return (
        visibility === 'public' ||
        visibility === 'private' ||
        visibility === 'logged_in'
    )
}

app.post('/api/user', (req, res) => {
    if(isValidUser(req.body)) {
        const user = req.body;
        const userAlreadyExists = lodash.find(users, item => item.login === user.login);
        if(!userAlreadyExists) {
            users.push(user);
        }
        return res.sendStatus(201);
    }
    return res.sendStatus(400);
});

app.post('/api/authenticate', (req, res) => {
    if(isValidLogin(req.body)) {
        const authentication = req.body;
        const user = lodash.find(users, item => item.login === authentication.login);
        if(!user) {
            return res.sendStatus(404);
        }
        if(user.password !== authentication.password) {
            return res.sendStatus(401);
        }
        const token = uuidv4();
        createSession(user.user_id, token)
        return res.send({ token });
    }
    return res.sendStatus(400);
});

app.post('/api/logout', (req, res) => {
    const authenticationHeader = req.headers['authentication-header'];

    if(!uuidv4Validate(authenticationHeader)) {
        return res.sendStatus(401)
    }
    const sessionIndex = lodash.findIndex(sessionTokens, item => item.token === authenticationHeader);
    if(sessionIndex >= 0) {
        sessionTokens.splice(sessionIndex, 1)
    }
    res.sendStatus(200);
});

app.post('/api/articles', sessionAuthorization, (req, res) => {
    if(isValidArticle(req.body)) {
        const newArticle = req.body;
        if(!isValidVisibility(newArticle.visibility)) {
            return res.sendStatus(400);
        }
        const article = lodash.find(articles, item => {
            return (
                item.article_id === newArticle.article_id ||
                item.title === newArticle.title
            )
        })
        if(article) {
            return res.sendStatus(409);
        }
        articles.push({
            ...newArticle,
            user_id: req.body.user_id,
        });
        return res.sendStatus(200);
    }
    return res.sendStatus(400);
});

app.get('/api/articles', (req, res) => {
    const authenticationHeader = req.headers['authentication-header'];
    const validSession = isValidSession(authenticationHeader);

    if(!validSession) {
        const publicArticles =  lodash.filter(articles, item => item.visibility === 'public');
        return res.send(publicArticles);
    }
    const userId = validSession.user_id; 

    const publicArticles = articles.filter(item => {
        return (
            item.visibility === 'public' ||
            item.visibility === 'logged_in' ||
            item.user_id === userId
        )
    });
    return res.send(publicArticles);
});

export default app.listen(process.env.HTTP_PORT || 3000);
