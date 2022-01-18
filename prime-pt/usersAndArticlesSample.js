const users = [

    {
        user_id: 'fbc20577-7222-4726-a080-8cd75f3f1677',
        login: 'Lucas7',
        password: '0yzWxdcOOptbzCz'
    },
    {
        user_id: 'c5dd5edb-f0de-4b0f-8e96-60ecbc92664c',
        login: 'Mireille.Maggio',
        password: 'Sl7vjmmHkmBKqGy'
    }

];

const articles = [
    {
        article_id: faker.datatype.uuid(),
        user_id: 'fbc20577-7222-4726-a080-8cd75f3f1677',
        title: faker.name.title() + 1,
        content: faker.lorem.words(),
        visibility: 'public',
    },
    {
        article_id: faker.datatype.uuid(),
        user_id: 'fbc20577-7222-4726-a080-8cd75f3f1677',
        title: faker.name.title() + 2,
        content: faker.lorem.words(),
        visibility: 'logged_in',
    },

    {
        article_id: faker.datatype.uuid(),
        user_id: 'fbc20577-7222-4726-a080-8cd75f3f1677',
        title: faker.name.title() + 3,
        content: faker.lorem.words(),
        visibility: 'private',
    },
    {
        article_id: faker.datatype.uuid(),
        user_id: 'c5dd5edb-f0de-4b0f-8e96-60ecbc92664c',
        title: faker.name.title() + 4,
        content: faker.lorem.words(),
        visibility: 'public',
    },
    {
        article_id: faker.datatype.uuid(),
        user_id: 'c5dd5edb-f0de-4b0f-8e96-60ecbc92664c',
        title: faker.name.title() + 5,
        content: faker.lorem.words(),
        visibility: 'logged_in',
    },

    {
        article_id: faker.datatype.uuid(),
        user_id: 'c5dd5edb-f0de-4b0f-8e96-60ecbc92664c',
        title: faker.name.title() + 6,
        content: faker.lorem.words(),
        visibility: 'private',
    },
];