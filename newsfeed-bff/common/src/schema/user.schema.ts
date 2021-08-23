import * as mongoose from 'mongoose';
// import * as validator from 'validator';
// import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'ID_IS_BLANK']
    },
    password: {
        type: String,
        minlength: 1,
        maxlength: 16,
        required: [true, 'PASSWORD_IS_BLANK'],
    },
    name: {
        type: String,
        minlength: 1,
        maxlength: 255,
        required: [true, 'NAME_IS_BLANK'],
    },
    roles: {
        type: [String],
        default: ['student'],
    },
    subscriptionPages: {
        type: [String],
        required: [false]
    },
    extra: {
        type: Object,
        required: [false]
    }
}, {
    versionKey: false,
    timestamps: true,
});

// UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
//     try {
//       if (!this.isModified('password')) {
//         return next();
//       }
//       // tslint:disable-next-line:no-string-literal
//       const hashed = await bcrypt.hash(this['password'], 10);
//       // tslint:disable-next-line:no-string-literal
//       this['password'] = hashed;
//       return next();
//     } catch (err) {
//       return next(err);
//     }
// });
