import { model } from 'mongoose';
import userSchema from '../schemas/user-schema';
import authHelper from '../../helpers/auth';
import { IUser } from './type';

userSchema.pre('validate', async function hashPassword() {
    if (this.isNew) {
        const hashedPassword = await authHelper.hashPassword(this.password);
        this.password = hashedPassword;
    }
});

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

const User = model<IUser>('User', userSchema);

export default User;
