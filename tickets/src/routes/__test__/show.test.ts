import request from 'supertest';
import { Types } from 'mongoose';

import app from '../../app';
import getCookie from '../../test/getCookie';

describe('Show related tests', () => {
  it('returns a 404 if the ticket is not found', async () => {
    const id = new Types.ObjectId().toHexString();
    await request(app)
      .get(`/api/tickets/${id}`)
      .send()
      .expect(404);
  });

  it('returns the ticket if the ticket is found', async () => {
    const title = 'concert';
    const price = 20;

    const createdTicketResponse = await request(app)
      .post('/api/tickets')
      .set('Cookie', getCookie())
      .send({ title, price })
      .expect(201);

    const getTicketResponse = await request(app)
      .get(`/api/tickets/${createdTicketResponse.body.id}`)
      .send()
      .expect(200);

    expect(getTicketResponse.body.title).toEqual(title);
    expect(getTicketResponse.body.price).toEqual(price);
  });
});
