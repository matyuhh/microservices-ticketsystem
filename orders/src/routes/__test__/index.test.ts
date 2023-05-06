import request from 'supertest';

import app from '../../app';
import Ticket from '../../models/ticket';
import getCookie from '../../test/getCookie';

const buildTicket = async () => {
  const ticket = await Ticket.create({
    title: 'concert',
    price: 20,
  });

  return ticket;
};

describe('Index related tests', () => {
  it('fetches orders for an particular user', async () => {
    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();
    const ticketThree = await buildTicket();

    const userOne = getCookie();
    const userTwo = getCookie();

    await request(app)
      .post('/api/orders')
      .set('Cookie', userOne)
      .send({ ticketId: ticketOne.id })
      .expect(201);

    const orderOne = await request(app)
      .post('/api/orders')
      .set('Cookie', userTwo)
      .send({ ticketId: ticketTwo.id })
      .expect(201);

    const orderTwo = await request(app)
      .post('/api/orders')
      .set('Cookie', userTwo)
      .send({ ticketId: ticketThree.id })
      .expect(201);

    const response = await request(app)
      .get('/api/orders')
      .set('Cookie', userTwo)
      .expect(200);

    expect(response.body.length).toEqual(2);
    expect(response.body[0].id).toEqual(orderOne.body.id);
    expect(response.body[1].id).toEqual(orderTwo.body.id);
    expect(response.body[0].ticket.id).toEqual(ticketTwo.id);
    expect(response.body[1].ticket.id).toEqual(ticketThree.id);
  });
});
