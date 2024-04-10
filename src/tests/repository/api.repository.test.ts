import {createUserApiDB, getUserByEmailDB } from '../../repository/api.repository';

const client = {
    query: jest.fn()
}

jest.mock('pg', function () {
    const pool = {
        connect: jest.fn(() => client)
    }

    return {
        Pool: jest.fn(() => pool)
    }
});

describe('createUserApiDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 1, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '123456789' }] });

        const result = await createUserApiDB('Ivan', 'Ivanov', 'ivan@mail.ru', '123456789');

        expect(result).toEqual([{ id: 1, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '123456789' }]);
        expect(result).toHaveLength(1);
        expect(client.query).toHaveBeenCalled();
    })
});

describe('getUserByEmailDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 1, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '123456789' }] });

        const result = await getUserByEmailDB('ivan@mail.ru');

        expect(result).toEqual([{ id: 1, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '123456789' }]);
        expect(result).toHaveLength(1);
        expect(client.query).toHaveBeenCalled();
    })
});