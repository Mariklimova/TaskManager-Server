import { createTask,getAllTask,getByIdTask, updateTask,updateTaskOnRes,deleteTask } from '../../service/task.service';
import * as repository from '../../repository/task.repository';


describe('createTask', () => {
    test('correct', async () => {
        const fake = jest.spyOn(repository, 'createTaskDB');
        fake.mockResolvedValue([{ id: 1, task: 'task_1', user_id: '1' }])

        const res = await createTask('task_1', '1');

        expect(res).toEqual([{ id: 1, task: 'task_1', user_id: '1' }])
        expect(res).toHaveLength(1);
        expect(fake).toHaveBeenCalled();
        expect(fake).toHaveBeenCalledWith('task_1', '1');
    });

    test('uncorrect', async () => {
        const fake = jest.spyOn(repository, 'createTaskDB');
        try {
            fake.mockResolvedValue([])

            await createTask('task_1', '1');
        } catch (error: any) {
            expect(fake).toHaveBeenCalled();
            expect(error.message).toBe('data do not create')
        }

    });
});


describe('getAllTask', () => {
    test('correct', async () => {
        const fake = jest.spyOn(repository, 'getAllTaskDB');
        fake.mockResolvedValue([{ id: 1, task: 'task_1', user_id: '1' },{ id: 2, task: 'task_2', user_id: '2' }])

        const res = await getAllTask();

        expect(fake).toHaveBeenCalled();
        expect(res).toEqual([{ id: 1, task: 'task_1', user_id: '1' },{ id: 2, task: 'task_2', user_id: '2' }])
        expect(res).toHaveLength(2);
     
    });

    test('uncorrect', async () => {
        const fake = jest.spyOn(repository, 'getAllTaskDB');
        try {
            fake.mockResolvedValue([])

            await getAllTask();
        } catch (error: any) {
            expect(fake).toHaveBeenCalled();
            expect(error.message).toBe('The database is empty')
        }

    });
});

describe('getByIdTask', () => {
    test('correct', async () => {
        const fake = jest.spyOn(repository, 'getByIdTaskDB');
        fake.mockResolvedValue([{ id: 2, task: 'task_2', user_id: '2' }])

        const res = await getByIdTask('2');

        expect(fake).toHaveBeenCalled();
        expect(res).toEqual([{ id: 2, task: 'task_2', user_id: '2' }])
        expect(res).toHaveLength(1);
     
    });

    test('uncorrect', async () => {
        const fake = jest.spyOn(repository, 'getByIdTaskDB');
        try {
            fake.mockResolvedValue([])

            await getByIdTask('2');
        } catch (error: any) {
            expect(fake).toHaveBeenCalled();
            expect(error.message).toBe('Not found ID')
        }

    });
});

describe('updateTask', () => {
    test('correct', async () => {
        const fake = jest.spyOn(repository, 'updateTaskDB');
        fake.mockResolvedValue([{ id: 1, task: 'task_1task_1', user_id: '4' }])

        const res = await updateTask(1,'task_1task_1', '4');

        expect(res).toEqual([{ id: 1, task: 'task_1task_1', user_id: '4' }])
        expect(res).toHaveLength(1);
        expect(fake).toHaveBeenCalled();
        expect(fake).toHaveBeenCalledWith(1,'task_1task_1', '4');
    });

    test('uncorrect', async () => {
        const fake = jest.spyOn(repository, 'updateTaskDB');
        try {
            fake.mockResolvedValue([])

            await updateTask(1,'task_1task_1', '4');
        } catch (error: any) {
            expect(fake).toHaveBeenCalled();
            expect(error.message).toBe('Data is not changed')
        }

    });
});

describe('updateTaskOnRes', () => {
    test('correct', async () => {
        const fake = jest.spyOn(repository, 'updateTaskOnResDB');
        fake.mockResolvedValue([{ id: 1, task: 'tasktask_1', user_id: '4' }])

        const res = await updateTaskOnRes(1,{task:'tasktask_1'});

        expect(res).toEqual([{ id: 1, task: 'tasktask_1', user_id: '4' }])
        expect(res).toHaveLength(1);
        expect(fake).toHaveBeenCalled();
        expect(fake).toHaveBeenCalledWith(1,{task:'tasktask_1'});
    });

    test('uncorrect', async () => {
        const fake = jest.spyOn(repository, 'updateTaskOnResDB');
        try {
            fake.mockResolvedValue([])

            await updateTaskOnRes(1,{task:'tasktask_1'});
        } catch (error: any) {
            expect(fake).toHaveBeenCalled();
            expect(error.message).toBe('Data is not changed')
        }

    });
});

describe('deleteTask', () => {
    test('correct', async () => {
        const fake = jest.spyOn(repository, 'deleteTaskDB');
        fake.mockResolvedValue([{ id: 2, task: 'task_2', user_id: '2' }])

        const res = await deleteTask('2');

        expect(fake).toHaveBeenCalled();
        expect(res).toEqual([{ id: 2, task: 'task_2', user_id: '2' }])
        expect(res).toHaveLength(1);
     
    });

    test('uncorrect', async () => {
        const fake = jest.spyOn(repository, 'deleteTaskDB');
        try {
            fake.mockResolvedValue([])

            await deleteTask('2');
        } catch (error: any) {
            expect(fake).toHaveBeenCalled();
            expect(error.message).toBe('Data is not deleted')
        }

    });
});
