const {UsersController} = require('./controller')
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
});