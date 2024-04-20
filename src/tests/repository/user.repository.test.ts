import { createUserDB, getAllUserDB, getUserByIdDB, updateUserDB, deleteUserDB, updateUserOnResDB } from '../../repository/user.repository';

const client = {
    query: jest.fn(),
    release: jest.fn()
}

jest.mock('pg', function () {
    const pool = {
        connect: jest.fn(() => client)
    }

    return {
        Pool: jest.fn(() => pool)
    }
});

describe('createUserDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 1, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '123456789' }] });

        const result = await createUserDB('Ivan', 'Ivanov', 'ivan@mail.ru', '123456789');

        expect(result).toEqual([{ id: 1, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '123456789' }]);
        expect(result).toHaveLength(1);
        expect(client.query).toHaveBeenCalled();
    })
});
describe('getAllUserDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 1, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '123456789' }, { id: 2, name: 'Peter', surname: 'Petrov', email: 'peter@mail.ru', pwd: '234567891' }] });

        const result = await getAllUserDB();

        expect(result).toEqual([{ id: 1, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '123456789' }, { id: 2, name: 'Peter', surname: 'Petrov', email: 'peter@mail.ru', pwd: '234567891' }]);
        expect(result.length).toBeGreaterThan(1);
        expect(client.query).toHaveBeenCalled();
    })
});

describe('getUserByIdDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 1, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '123456789' }] });

        const result = await getUserByIdDB('1');

        expect(result).toEqual([{ id: 1, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '123456789' }]);
        expect(result).toHaveLength(1);
        expect(client.query).toHaveBeenCalled();
    })
});

describe('updateUserDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 2, name: 'Sidor', surname: 'Sidorov', email: 'sidor@mail.ru', pwd: '345678912' }] });

        const result = await updateUserDB('2', 'Sidor', 'Sidorov', 'sidor@mail.ru', '345678912');

        expect(result).toEqual([{ id: 2, name: 'Sidor', surname: 'Sidorov', email: 'sidor@mail.ru', pwd: '345678912' }]);
        expect(result).toHaveLength(1);
        expect(client.query).toHaveBeenCalled();
    })
});

describe('updateUserOnResDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 2, name: 'Sidor', surname: 'Sidorov', email: 'sidor22@mail.ru', pwd: '456789123' }] });

        const result = await updateUserOnResDB('2',{ email: 'sidor22@mail.ru', pwd: '456789123' });

        expect(result).toEqual([{ id: 2, name: 'Sidor', surname: 'Sidorov', email: 'sidor22@mail.ru', pwd: '456789123' }]);
        expect(result).toHaveLength(1);
        expect(client.query).toHaveBeenCalled();
    })
});

describe('deleteUserDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 2, name: 'Sidor', surname: 'Sidorov', email: 'sidor22@mail.ru', pwd: '4566789123' }] });

        const result = await deleteUserDB('2');

        expect(result).toEqual([{id: 2, name: 'Sidor', surname: 'Sidorov', email: 'sidor22@mail.ru', pwd: '4566789123' }]);
        expect(result).toHaveLength(1);
        expect(client.query).toHaveBeenCalled();
    })
});
