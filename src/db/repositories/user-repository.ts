import { User } from '../models';
import BaseRepository from './base-repository';

/**
 * @class UserRepository
 */
export default class UserRepository extends BaseRepository {
    /**
     * @constructor
     */
    constructor() {
        super(User);
    }
}

export const userRepository = new UserRepository();
