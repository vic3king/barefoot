import { userRepository } from '../db/repositories/user-repository';
import { UserSearchParams } from './type';
import { IUser, UserTypeModel } from '../db/models/type';

/**
 * @class UserService
 */
export default class UserService {
    private userRepository = userRepository;
    /**
     * @method createUser
     * @description creates a user and assigns a token
     * @param {} data
     * @returns {Promise<any>} new user
     */
    static async create(data: UserTypeModel): Promise<IUser> {
        return userRepository.create(data);
    }

    /**
     * @method getAll
     * @description gets all users
     * @param {object} params
     * @returns {Promise<any>} new user
     */
    static async getAll(params: UserSearchParams) {
        return userRepository.getAll(params);
    }

    /**
     * @method getOne
     * @description gets one user
     * @param {object} params
     * @returns {Promise<any>} new user
     * */
    static async getOne(params: UserSearchParams) {
        return userRepository.getOne(params);
    }
}

export const userService = new UserService();
