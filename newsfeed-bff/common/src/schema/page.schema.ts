import * as mongoose from 'mongoose';

export const PageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'ID_IS_BLANK']
    },
    name: {
        type: String,
        minlength: 3,
        maxlength: 256,
        required: [true, 'NAME_IS_BLANK'],
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 1024,
        required: [true, 'DESCRIPTION_IS_BLANK'],
    },
    creatorId: {
        type: String,
        required: [true, 'CREATOR_ID_IS_BLANK']
    },
    extra: {
        type: Object,
        required: [false]
    }
}, {
    versionKey: false,
    timestamps: true,
});
