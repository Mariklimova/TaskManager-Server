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
        mock_2.mockResolvedValue([{ name: 'Anton', surname: 'Antonov', email: 'anton@mail.ru', pwd: 'cmhghj3jgguj3' }]);

        const res = await createUserApi('Anton', 'Antonov', 'anton@mail.ru', '123456789')

        expect(mock_1).toHaveBeenCalled();
        expect(mock_2).toHaveBeenCalled();
        expect(mock_3).toHaveBeenCalled();
        expect(mock_1).toHaveBeenCalledWith('anton@mail.ru');
        expect(mock_2).toHaveBeenCalledWith('Anton', 'Antonov', 'anton@mail.ru','cmhghj3jgguj3');
        expect(mock_3).toHaveBeenCalledWith('123456789', 3);
        expect(res).toEqual([{ name: 'Anton', surname: 'Antonov', email: 'anton@mail.ru', pwd: 'cmhghj3jgguj3' }]);
        expect(res.length).toBe(1);

    })
})