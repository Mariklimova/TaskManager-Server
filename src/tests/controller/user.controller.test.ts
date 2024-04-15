import supertest from 'supertest';
import { app } from '../../app';

let id: string;


test('post/user', async () => {

    const res = await supertest(app).post('/user').send({ name:'Anton', surname:'Antonov', email:'anton@mail.ru', pwd:'345678912'})

    id = res.body[0].id;


    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Anton')
    expect(res.body[0].surname).toBe('Antonov')
    expect(res.body[0].email).toBe('anton@mail.ru')
    expect(res.body[0].pwd).toBe('345678912')

});

test('get/user', async () => {

    const res = await supertest(app).get('/user');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
});

test('getById/user', async () => {

    const res = await supertest(app).get(`/user/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
});


test('update/user', async () => {

    const res = await supertest(app).put(`/user/${id}`).send({ name:'Sidor', surname:'Sidorov', email:'sidor@mail.ru', pwd:'456789123'});

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Sidor')
    expect(res.body[0].surname).toBe('Sidorov')
    expect(res.body[0].email).toBe('sidor@mail.ru')
    expect(res.body[0].pwd).toBe('456789123')

});

test('PATCH/user', async () => {

    const res = await supertest(app).patch(`/user/${id}`).send({pwd: '234567891' });

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].pwd).toBe('234567891');

});


test('delete/user', async () => {

    const res = await supertest(app).delete(`/user/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
});
