import { createUserApi, authUserEmail } from '../../service/api.service';
import bcrypt from 'bcrypt'
import * as repository from '../../repository/api.repository';

describe('createUserApi', () => {
    test('corrected', async () => {
        const mock_1 = jest.spyOn(repository, 'getUserByEmailDB');
        const mock_2 = jest.spyOn(repository, 'createUserApiDB');
        const mock_3 = jest.spyOn(bcrypt, 'hash')

        mock_1.mockResolvedValue([]);
        mock_3.mockResolvedValue('cmhghj3jgguj3');
        mock_2.mockResolvedValue([{ id: 1, name: 'Anton', surname: 'Antonov', email: 'anton@mail.ru', pwd: 'cmhghj3jgguj3' }]);

        const res = await createUserApi('Anton', 'Antonov', 'anton@mail.ru', '123456789')

        expect(mock_1).toHaveBeenCalled();
        expect(mock_2).toHaveBeenCalled();
        expect(mock_3).toHaveBeenCalled();
        expect(mock_1).toHaveBeenCalledWith('anton@mail.ru');
        expect(mock_2).toHaveBeenCalledWith('Anton', 'Antonov', 'anton@mail.ru', 'cmhghj3jgguj3');
        expect(mock_3).toHaveBeenCalledWith('123456789', 3);
        expect(res).toEqual([{ id: 1, name: 'Anton', surname: 'Antonov', email: 'anton@mail.ru', pwd: 'cmhghj3jgguj3' }]);
        expect(res.length).toBe(1);

    })

    test('uncorrect', async () => {
        const mock = jest.spyOn(repository, 'getUserByEmailDB');

        try {
            mock.mockResolvedValue([{ id: 1, name: 'Anton', surname: 'Antonov', email: 'anton@mail.ru', pwd: '123456789' }]);
            await createUserApi('Anton', 'Antonov', 'anton@mail.ru', '123456789')
        } catch (error: any) {
            expect(mock).toHaveBeenCalled();
            expect(error.message).toBe('this email alredy exist');
        }
    });

    test('uncorrect_2', async () => {
        const mock_1 = jest.spyOn(repository, 'getUserByEmailDB');
        const mock_2 = jest.spyOn(repository, 'createUserApiDB');
        const mock_3 = jest.spyOn(bcrypt, 'hash');

        try {
            mock_1.mockResolvedValue([]);
            mock_3.mockResolvedValue('cmhghj3jgguj3');
            mock_2.mockResolvedValue([]);

            await createUserApi('Anton', 'Antonov', 'anton@mail.ru', '123456789');
        } catch (error: any) {
            expect(mock_1).toHaveBeenCalled();
            expect(mock_2).toHaveBeenCalled();
            expect(mock_3).toHaveBeenCalled();
            expect(error.message).toBe('data not saved');
        }
    })
});

describe('authUserEmail', () => {
    test('correct', async () => {
        const mock_1 = jest.spyOn(repository, 'getUserByEmailDB');
        const mock_2 = jest.spyOn(bcrypt, 'compare');

        mock_1.mockResolvedValue([{ id: 1, name: 'Anton', surname: 'Antonov', email: 'anton@mail.ru', pwd: 'cmhghj3jgguj3' }]);
        mock_2.mockResolvedValue(true);

        const result = await authUserEmail('anton@mail.ru', '123456789');

        expect(mock_1).toHaveBeenCalled();
        expect(mock_2).toHaveBeenCalled();
        expect(mock_1).toHaveBeenCalledWith('anton@mail.ru');
        expect(mock_2).toHaveBeenCalledWith('123456789', 'cmhghj3jgguj3');
        expect(result).toEqual([{ id: 1, name: 'Anton', surname: 'Antonov', email: 'anton@mail.ru', pwd: 'cmhghj3jgguj3' }]);
    });

    test('uncorrect', async () => {
        const mock = jest.spyOn(repository, 'getUserByEmailDB');

        try {
            mock.mockResolvedValue([]);
            await authUserEmail('anton@mail.ru', 'cmhghj3jgguj3');
        } catch (error: any) {
            expect(mock).toHaveBeenCalled();
            expect(error.message).toBe('wrong email');
        }
    });

    test('uncorrect_2', () => {
        const mock_1 = jest.spyOn(repository, 'getUserByEmailDB');
        const mock_2 = jest.spyOn(bcrypt, 'compare');

        try {
            mock_1.mockResolvedValue([{ id: 1, name: 'Anton', surname: 'Antonov', email: 'anton@mail.ru', pwd: 'cmhghj3jgguj3' }]);
            mock_2.mockResolvedValue(false);
        } catch (error: any) {
            expect(mock_1).toHaveBeenCalled();
            expect(mock_2).toHaveBeenCalled();
            expect(error.message).toBe('wrong password')
        }
    });
});