import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const getCookie = (): string[] => {
  const payload = {
    id: new Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const sessionBase64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${sessionBase64}`];
};

export default getCookie;
