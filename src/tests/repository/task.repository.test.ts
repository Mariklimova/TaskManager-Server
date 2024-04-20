import { createTaskDB, getAllTaskDB, getByIdTaskDB, updateTaskDB, updateTaskOnResDB, deleteTaskDB } from '../../repository/task.repository';

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

describe('createTaskDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 1, task: 'task_1', user_id: '1' }] });

        const result = await createTaskDB('task_1', '1');

        expect(result).toEqual([{ id: 1, task: 'task_1', user_id: '1' }]);
        expect(result).toHaveLength(1);
        expect(client.query).toHaveBeenCalled();
    })
});

describe('getAllTaskDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 1, task: 'task_1', user_id: '1' }, { id: 2, task: 'task_2', user_id: '2' }] });

        const result = await getAllTaskDB();

        expect(result).toEqual([{ id: 1, task: 'task_1', user_id: '1' }, { id: 2, task: 'task_2', user_id: '2' }]);
        expect(result.length).toBeGreaterThan(1);
        expect(client.query).toHaveBeenCalled();
    })
});

describe('getByIdTaskDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 1, task: 'task_1', user_id: '1' }] });

        const result = await getByIdTaskDB('1');

        expect(result).toEqual([{ id: 1, task: 'task_1', user_id: '1' }]);
        expect(result).toHaveLength(1);
        expect(client.query).toHaveBeenCalled();
    })
});

describe('updateTaskDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 2, task: 'task_22', user_id: '4' }] });

        const result = await updateTaskDB('2', 'task_22', '4');

        expect(result).toEqual([{ id: 2, task: 'task_22', user_id: '4' }]);
        expect(result).toHaveLength(1);
        expect(client.query).toHaveBeenCalled();
    })
});

describe('updateTaskOnResDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 2, task: 'task_4', user_id: '4' }] });

        const result = await updateTaskOnResDB('2', { task: 'task_4' });

        expect(result).toEqual([{ id: 2, task: 'task_4', user_id: '4' }]);
        expect(result).toHaveLength(1);
        expect(client.query).toHaveBeenCalled();
    })
});

describe('deleteTaskDB', () => {
    test('correct', async () => {
        client.query.mockResolvedValue({ rows: [{ id: 2, task: 'task_4', user_id: '4' }] });

        const result = await deleteTaskDB('2');

        expect(result).toEqual([{ id: 2, task: 'task_4', user_id: '4' }]);
        expect(result).toHaveLength(1);
        expect(client.query).toHaveBeenCalled();
    })
});