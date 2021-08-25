import * as mongoose from 'mongoose';

export const PageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'ID_IS_BLANK']
    },
    schoolName: {
        type: String,
        minlength: 1,
        maxlength: 256,
        required: [true, 'SCHOOL_NAME_IS_BLANK'],
    },
    region: {
        type: String,
        minlength: 1,
        maxlength: 256,
        required: [true, 'REGION_IS_BLANK'],
    },
    name: {
        type: String,
        minlength: 1,
        maxlength: 256,
        required: [true, 'NAME_IS_BLANK'],
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 1024,
        required: [false, 'DESCRIPTION_IS_BLANK'],
    },
    extra: {
        type: Object,
        required: [false]
    }
}, {
    versionKey: false,
    timestamps: true,
});
