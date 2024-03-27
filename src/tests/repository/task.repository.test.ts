import { createTaskDB } from '../../repository/task.repository';

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

describe('createTaskDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 1, task: 'task_1', user_id: '1' }] });

        const result = await createTaskDB('task_1', '1');

        expect(result).toEqual([{ id: 1, task: 'task_1', user_id: '1' }]);
        expect(result).toHaveLength(1);
        expect(client.query).toHaveBeenCalled();
    })
});