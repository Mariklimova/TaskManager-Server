import { createTask,getAllTask } from '../../service/task.service';
import * as repository from '../../repository/task.repository';


describe('createTask', () => {
    test('corrected', async () => {
        const fake = jest.spyOn(repository, 'createTaskDB');
        fake.mockResolvedValue([{ id: 1, task: 'task_1', user_id: '1' }])

        const res = await createTask('task_1', '1');

        expect(res).toEqual([{ id: 1, task: 'task_1', user_id: '1' }])
        expect(res).toHaveLength(1);
        expect(fake).toHaveBeenCalled();
        expect(fake).toHaveBeenCalledWith('task_1', '1');
    });

    test('uncorrected', async () => {
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
    test('corrected', async () => {
        const fake = jest.spyOn(repository, 'getAllTaskDB');
        fake.mockResolvedValue([{ id: 1, task: 'task_1', user_id: '1' },{ id: 2, task: 'task_2', user_id: '2' }])

        const res = await getAllTask();

        expect(fake).toHaveBeenCalled();
        expect(res).toEqual([{ id: 1, task: 'task_1', user_id: '1' },{ id: 2, task: 'task_2', user_id: '2' }])
        expect(res).toHaveLength(2);
     
    });

})