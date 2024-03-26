import { } from '../../repository/task.repository';

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

describe('createTaskDB',()=>{
    test('correct',async()=>{
client.query.mockResolvedValue({rows:[{id: task:'task_1', user_id}]})
    })
})