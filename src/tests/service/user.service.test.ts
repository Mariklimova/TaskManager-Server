import { createUser, getAllUser, getUserById, updateUser, deleteUser, updateUserOnRes } from '../../service/user.service';
import * as repository from '../../repository/user.repository';


describe('createUser', () => {
    test('correct', async () => {
        const fake = jest.spyOn(repository, 'createUserDB');
        fake.mockResolvedValue([{ id: 1, name: 'Anton', surname: 'Antonov', email: 'anton@mail.ru', pwd: '123456789' }])

        const res = await createUser('Anton', 'Antonov', 'anton@mail.ru', '123456789');

        expect(res).toEqual([{ id: 1, name: 'Anton', surname: 'Antonov', email: 'anton@mail.ru', pwd: '123456789' }])
        expect(res).toHaveLength(1);
        expect(fake).toHaveBeenCalled();
        expect(fake).toHaveBeenCalledWith('Anton', 'Antonov', 'anton@mail.ru', '123456789');
    });

    test('uncorrect', async () => {
        const fake = jest.spyOn(repository, 'createUserDB');
        try {
            fake.mockResolvedValue([])

            await createUser('Anton', 'Antonov', 'anton@mail.ru', '123456789');
        } catch (error: any) {
            expect(fake).toHaveBeenCalled();
            expect(error.message).toBe('data do not create')
        }

    });
});


describe('getAllUser', () => {
    test('correct', async () => {
        const fake = jest.spyOn(repository, 'getAllUserDB');
        fake.mockResolvedValue([{ id: 1, name: 'Anton', surname: 'Antonov', email: 'anton@mail.ru', pwd: '123456789' }, { id: 2, name: 'Semen', surname: 'Semenov', email: 'semen@mail.ru', pwd: '234567891' }])

        const res = await getAllUser();

        expect(fake).toHaveBeenCalled();
        expect(res).toEqual([{ id: 1, name: 'Anton', surname: 'Antonov', email: 'anton@mail.ru', pwd: '123456789' }, { id: 2, name: 'Semen', surname: 'Semenov', email: 'semen@mail.ru', pwd: '234567891' }])
        expect(res).toHaveLength(2);

    });

    test('uncorrect', async () => {
        const fake = jest.spyOn(repository, 'getAllUserDB');
        try {
            fake.mockResolvedValue([])

            await getAllUser();
        } catch (error: any) {
            expect(fake).toHaveBeenCalled();
            expect(error.message).toBe('database is empty')
        }

    });
});

describe('getUserById', () => {
    test('correct', async () => {
        const fake = jest.spyOn(repository, 'getUserByIdDB');
        fake.mockResolvedValue([{ id: 2, name: 'Semen', surname: 'Semenov', email: 'semen@mail.ru', pwd: '234567891' }])

        const res = await getUserById('2');

        expect(fake).toHaveBeenCalled();
        expect(res).toEqual([{ id: 2, name: 'Semen', surname: 'Semenov', email: 'semen@mail.ru', pwd: '234567891' }])
        expect(res).toHaveLength(1);

    });

    test('uncorrect', async () => {
        const fake = jest.spyOn(repository, 'getUserByIdDB');
        try {
            fake.mockResolvedValue([])

            await getUserById('2');
        } catch (error: any) {
            expect(fake).toHaveBeenCalled();
            expect(error.message).toBe('id not found')
        }

    });
});

describe('updateUser', () => {
    test('correct', async () => {
        const fake = jest.spyOn(repository, 'updateUserDB');
        fake.mockResolvedValue([{ id: 2, name: 'Ivan', surname: 'Ivanov', email: 'semen@mail.ru', pwd: '234567891' }])

        const res = await updateUser(2, 'Ivan', 'Ivanov', 'semen@mail.ru', '234567891');

        expect(res).toEqual([{ id: 2, name: 'Ivan', surname: 'Ivanov', email: 'semen@mail.ru', pwd: '234567891' }])
        expect(res).toHaveLength(1);
        expect(fake).toHaveBeenCalled();
        expect(fake).toHaveBeenCalledWith(2, 'Ivan', 'Ivanov', 'semen@mail.ru', '234567891');
    });

    test('uncorrect', async () => {
        const fake = jest.spyOn(repository, 'updateUserDB');
        try {
            fake.mockResolvedValue([])

            await updateUser(2, 'Ivan', 'Ivanov', 'semen@mail.ru', '234567891');
        } catch (error: any) {
            expect(fake).toHaveBeenCalled();
            expect(error.message).toBe('Data is not changed')
        }

    });
});

describe('updateUserOnRes', () => {
    test('correct', async () => {
        const fake = jest.spyOn(repository, 'updateUserOnResDB');
        fake.mockResolvedValue([{ id: 2, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '345678912' }])

        const res = await updateUserOnRes(2, { email: 'ivan@mail.ru', pwd: '345678912' });

        expect(res).toEqual([{ id: 2, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '345678912' }])
        expect(res).toHaveLength(1);
        expect(fake).toHaveBeenCalled();
        expect(fake).toHaveBeenCalledWith(2, { email: 'ivan@mail.ru', pwd: '345678912' });
    });

    test('uncorrect', async () => {
        const fake = jest.spyOn(repository, 'updateUserOnResDB');
        try {
            fake.mockResolvedValue([])

            await updateUserOnRes(2, { email: 'ivan@mail.ru', pwd: '345678912' });
        } catch (error: any) {
            expect(fake).toHaveBeenCalled();
            expect(error.message).toBe('id not found, data is not changed')
        }

    });
});

describe('deleteUser', () => {
    test('correct', async () => {
        const fake = jest.spyOn(repository, 'deleteUserDB');
        fake.mockResolvedValue([{ id: 2, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '345678912' }])

        const res = await deleteUser('2');

        expect(fake).toHaveBeenCalled();
        expect(res).toEqual([{ id: 2, name: 'Ivan', surname: 'Ivanov', email: 'ivan@mail.ru', pwd: '345678912' }])
        expect(res).toHaveLength(1);

    });

    test('uncorrect', async () => {
        const fake = jest.spyOn(repository, 'deleteUserDB');
        try {
            fake.mockResolvedValue([])

            await deleteUser('2');
        } catch (error: any) {
            expect(fake).toHaveBeenCalled();
            expect(error.message).toBe('Data is not deleted')
        }

    });
});