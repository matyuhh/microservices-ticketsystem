import request from 'supertest';

import app from '../../app';
import getCookie from '../../test/getCookie';
import Ticket from '../../models/ticket';
import natsWrapper from '../../nats-wrapper';

describe('New related tests', () => {
  it('has a route handler listening to /api/tickets for posts request', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .send({});

    expect(response.status).not.toEqual(404);
  });

  it('can only be accessed if the user is signed in', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .send({});

    expect(response.status).toEqual(401);
  });

  it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', getCookie())
      .send({});

    expect(response.status).not.toEqual(401);
  });

  it('returns an error if an invalid title is provided', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', getCookie())
      .send({
        title: '',
        price: 10,
      })
      .expect(400);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', getCookie())
      .send({
        price: 10,
      })
      .expect(400);
  });

  it('returns an error if an invalid price is provided', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', getCookie())
      .send({
        title: 'testtitle',
        price: -10,
      })
      .expect(400);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', getCookie())
      .send({
        title: 'testtitle',
      })
      .expect(400);
  });

  it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = 'testtitle';
    const price = 20;

    await request(app)
      .post('/api/tickets')
      .set('Cookie', getCookie())
      .send({
        title,
        price,
      })
      .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(price);
    expect(tickets[0].title).toEqual(title);
  });

  it('publishes an event', async () => {
    const title = 'testtitle';
    const price = 20;

    await request(app)
      .post('/api/tickets')
      .set('Cookie', getCookie())
      .send({
        title,
        price,
      })
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
