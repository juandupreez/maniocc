import container, { GlobalDependencyInjectionContainer } from '../main/DependencyInjectionContainer';
import { ClientRepository, ClientRepositoryInterface } from './testutil/ClientRepository';
import { EmployeeRepository, EmployeeRepositoryInterface } from './testutil/EmployeeRepository';

describe('Global DependencyInjection Container', () => {

    it('should be an instance of the GlobalDependencyInjectionContainer interface', () => {
        expect(container instanceof GlobalDependencyInjectionContainer)
    })

    it('should register and resolve a simple class', () => {
        container.register('employeeRepository', () => {
            const employeeRepository: EmployeeRepository = new EmployeeRepository()
            employeeRepository.setReplyText('This is: ' + employeeRepository);
            return employeeRepository;
        })

        const employeeRepository: EmployeeRepository = container.resolve('employeeRepository', EmployeeRepository);
        expect(employeeRepository.getReplyText()).toBe('This is: ' + employeeRepository)
    })

    it('should register and resolve a class which implements an interface', () => {
        container.register('employeeRepository', () => {
            const employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository()
            employeeRepository.setReplyText('This is: ' + employeeRepository);
            return employeeRepository;
        })

        const employeeRepository: EmployeeRepositoryInterface = container.resolve('employeeRepository', EmployeeRepository);
        expect(employeeRepository.getReplyText()).toBe('This is: ' + employeeRepository)
    })

    it('should throw error when resolving to a different class than what the dependency actually is', () => {
        container.register('employeeRepository', () => {
            const employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository()
            employeeRepository.setReplyText('This is: ' + employeeRepository);
            return employeeRepository;
        })
        try {
            const clientRepository: ClientRepositoryInterface = container.resolve('employeeRepository', ClientRepository);
            fail('Expected an error to be thrown but none was')
        } catch (err) {
            expect(err).toEqual(new Error('Error resolving dependency with name: '
                + "employeeRepository"
                + ". The type of the registered dependency is incompatable with the desired resoultion type"))
        }
    })

    it('should throw error when resolving a dependency that does not exist', () => {
        try {
            const employeeRepository: EmployeeRepository = container.resolve('nonExistentDependency', EmployeeRepository);
            fail('Expected an error to be thrown but none was')
        } catch (err) {
            expect(err).toEqual(new Error('Error resolving dependency with name: '
                + "nonExistentDependency"
                + ". No such dependency registered"))
        }
    })

})