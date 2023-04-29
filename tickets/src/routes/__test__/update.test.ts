import request from 'supertest';
import { Types } from 'mongoose';

import app from '../../app';
import getCookie from '../../test/getCookie';

describe('Update related tests', () => {
  const id = new Types.ObjectId().toHexString();

  it('returns a 404 if the provided id does not exist', async () => {
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', getCookie())
      .send({
        title: 'title',
        price: 20,
      })
      .expect(404);
  });

  it('returns a 401 if the user is not authenticated', async () => {
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title: 'title',
        price: 20,
      })
      .expect(401);
  });

  it('returns a 401 if the user does not own the ticket', async () => {
    const createdTicketResponse = await request(app)
      .post('/api/tickets')
      .set('Cookie', getCookie())
      .send({
        title: 'title',
        price: 20,
      });

    await request(app)
      .put(`/api/tickets/${createdTicketResponse.body.id}`)
      .set('Cookie', getCookie())
      .send({
        title: 'newtitle',
        price: 25,
      })
      .expect(401);
  });

  it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = getCookie();

    const createdTicketResponse = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'title',
        price: 20,
      });

    await request(app)
      .put(`/api/tickets/${createdTicketResponse.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: '',
        price: 25,
      })
      .expect(400);
  });

  it('updates the ticket if provided valid inputs', async () => {
    const cookie = getCookie();

    const createdTicketResponse = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'title',
        price: 20,
      })
      .expect(201);

    const updatedTicketResponse = await request(app)
      .put(`/api/tickets/${createdTicketResponse.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: 'newtitle',
        price: 25,
      })
      .expect(200);

    expect(updatedTicketResponse.body.title).toEqual('newtitle');
    expect(updatedTicketResponse.body.price).toEqual(25);
  });
});
