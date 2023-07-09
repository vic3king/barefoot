import { UserSearchParams } from '../../services/type';
import { UserTypeModel } from '../models/type';

/**
 * @class BaseRepository
 */
export default class BaseRepository {
    public model: UserTypeModel;

    /**
     * @constructor
     * @param {UserTypeModel} model
     */
    constructor(model: UserTypeModel) {
        this.model = model;
    }

    /**
     * @method create
     * @description Creates a document
     * @param {UserTypeModel} dataObject
     * @returns {Promise<UserTypeModel>} Created object
     */
    async create(dataObject: UserTypeModel) {
        const data = await this.model.create(dataObject);
        return data;
    }

    /**
     * @method getAll
     * @description Retrieves all documents
     * @param {UserSearchParams} params - Search parameters
     * @returns {Promise<UserTypeModel[]>} Documents
     */
    async getAll(params: UserSearchParams) {
        const { query = {}, fields = null, options = { sort: {}, limit: 10, skip: 0 } } = params;
        return this.model.find(query, fields, options);
    }

    /**
     * @method getOne
     * @description Retrieves one document
     * @param {UserSearchParams} params - Search parameters
     * @returns {Promise<UserTypeModel>} Document
     */
    async getOne(params: UserSearchParams) {
        const { query = {}, fields = null, options = { sort: {}, limit: 10, skip: 0 } } = params;
        return this.model.findOne(query, fields, options);
    }
}
