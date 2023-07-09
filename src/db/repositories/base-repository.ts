import { UserSearchParams } from '../../services/type';
import { UserTypeModel } from '../models/type';

/**
 * @class BaseRepository
 */
export default class BaseRepository {
    public model;

    /**
     * @constructor
     * @param {} model
     */
    constructor(model: any) {
        this.model = model;
    }

    /**
     * @method create
     * @description
     * @param {object} dataObject
     * @returns {object} created object
     */
    async create(dataObject: UserTypeModel) {
        const data = this.model.create(dataObject);
        return data;
    }

    /**
     * @method getAll
     * @description gets all documents
     * @param {object} query
     *  @param {object} fields
     * @param {object} options
     * @returns {object} documents
     * */
    async getAll({
        query = {},
        fields = null,
        options = { sort: {}, limit: 10, skip: 0, populate: '' },
    }: UserSearchParams) {
        return this.model.find(query, fields, options).populate(options.populate);
    }

    /**
     * @method getOne
     * @description gets one document
     * @param {object} query
     * @param {object} fields
     * @param {object} options
     * @returns {object} document
     * */
    async getOne({
        query = {},
        fields = null,
        options = { sort: {}, limit: 10, skip: 0, populate: '' },
    }: UserSearchParams) {
        return this.model.findOne(query, fields, options).populate(options.populate);
    }
}
