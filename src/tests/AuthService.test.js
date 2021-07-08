import axios from 'axios';
import authService from "../services/auth-service";
import { REST_API_URL } from '../services/constants'

const user = 'user';
const password = 'password';
const url = `${REST_API_URL}/auth/login`
jest.mock('axios', () => ({
    post: jest.fn()
}));


describe('login tests', () => {

    const service = authService;

    it('authenticate', async () => {
        const expectedResponse = {data : {username: user, password: null, isAdmin:true}}
        axios.post.mockReturnValueOnce(expectedResponse)
        const result = await service.login(user, password);
        expect(axios.post).toHaveBeenNthCalledWith(1, url, {username: user, password: password}) 
        expect(result.data).toEqual({username: user, password: null, isAdmin:true});
    })


    it('authenticate fails', async () => {
        const expectedResponse = {
            "timestamp": "2021-07-08T01:31:33.927+00:00",
            "status": 406,
            "error": "Not Acceptable",
            "message": "The user does not have exist.",
            "path": "/api/auth/login"
          }
        axios.post.mockReturnValueOnce(expectedResponse);
        const result = await service.login(user, password);
        expect(axios.post).toHaveBeenNthCalledWith(1, url, {username: user, password: password})  
        expect(result).toEqual(expectedResponse);
    })
})