import * as mongoose from 'mongoose';

export const NewsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'ID_IS_BLANK']
    },
    pageId: {
        type: String,
        required: [true, 'PAGE_ID_IS_BLANK']
    },
    title: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: [true, 'TITLE_IS_BLANK'],
    },
    content: {
        type: String,
        minlength: 3,
        maxlength: 4096,
        required: [true, 'CONTENT_IS_BLANK'],
    },
    extra: {
        type: Object,
        required: [false]
    }
}, {
    versionKey: false,
    timestamps: true,
});
