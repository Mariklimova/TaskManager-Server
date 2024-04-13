import supertest from 'supertest';
import { app } from '../../app';

let id: string;

test('post/task', async () => {

    const res = await supertest(app).post('/task').send({ task: 'task_5', user_id: 6 });

    id = res.body[0].id;

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].task).toBe('task_5')
    expect(res.body[0].user_id).toBe(6)

});


test('get/task', async () => {

    const res = await supertest(app).get('/task');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
});


test('getById/task', async () => {

    const res = await supertest(app).get(`/task/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
});


test('update/task', async () => {

    const res = await supertest(app).put(`/task/${id}`).send({ task: 'task_2', user_id: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].task).toBe('task_2')
    expect(res.body[0].user_id).toBe(2)

});


test('patch/task', async () => {

    const res = await supertest(app).put(`/task/${id}`).send({ task: 'task_24'});

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].task).toBe('task_24')

});


test('delete/task', async () => {

    const res = await supertest(app).delete(`/task/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
});