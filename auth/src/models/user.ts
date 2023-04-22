import { Schema, model } from 'mongoose';
import Password from '../utils/password';

interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      // eslint-disable-next-line no-param-reassign
      ret.id = ret._id;
      // eslint-disable-next-line no-param-reassign
      delete ret._id;
      // eslint-disable-next-line no-param-reassign
      delete ret.password;
      // eslint-disable-next-line no-param-reassign, no-underscore-dangle
      delete ret.__v;
    },
  },
});

// eslint-disable-next-line func-names
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

const User = model<IUser>('User', userSchema);

export default User;
