const { UsersController } = require('./controller')
const { Database } = require('./database')
const { spy, stub, assert } = require('sinon')
let expectedResponse

describe('Users controller', () => {
    beforeAll(() => {
        expectedResponse = [
            {
                id: 7,
                name: 'Mark Lee',
                email: 'test@mail.com'
            }
        ]
    });

    it('fake', () => {
        const fakeDb = {
            findAll(){
                return expectedResponse
            }
        }

        const controller = new UsersController(fakeDb)
        const response = controller.getAll()

        expect(response).toBe(expectedResponse)
    });

    it('spy', () => {
        const findAll = spy(Database, 'findAll')
        const controller = new UsersController(Database)
        controller.getAll()

        assert.calledWith(findAll, 'users')
        findAll.restore()
    });

    it('stub', () => {
        const findAll= stub(Database, 'findAll')
        findAll.withArgs('users').returns(expectedResponse)

        const controller = new UsersController(Database)
        const response = controller.getAll()

        assert.calledWith(findAll, 'users')
        expect(response).toEqual(expectedResponse)
        
        findAll.restore()
    });
});