import { Schema } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});

export default userSchema;
