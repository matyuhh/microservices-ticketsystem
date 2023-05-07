import request from 'supertest';
import { Types } from 'mongoose';
import { OrderStatus } from '@mgmts/common';

import app from '../../app';
import getCookie from '../../test/getCookie';
import Ticket from '../../models/ticket';
import Order from '../../models/order';
import natsWrapper from '../../nats-wrapper';

describe('New related tests', () => {
  it('returns an error if the ticket does not exists', async () => {
    const ticketId = new Types.ObjectId();

    await request(app)
      .post('/api/orders')
      .set('Cookie', getCookie())
      .send({ ticketId })
      .expect(404);
  });

  it('returns an error if the ticket is already reserved', async () => {
    const ticket = await Ticket.create({
      title: 'concert',
      price: 20,
    });

    await Order.create({
      ticket,
      userId: 'test',
      status: OrderStatus.Created,
      expiresAt: new Date(),
    });

    await request(app)
      .post('/api/orders')
      .set('Cookie', getCookie())
      .send({ ticketId: ticket.id })
      .expect(400);
  });

  it('reserves a ticket', async () => {
    const ticket = await Ticket.create({
      title: 'concert',
      price: 20,
    });

    await request(app)
      .post('/api/orders')
      .set('Cookie', getCookie())
      .send({ ticketId: ticket.id })
      .expect(201);
  });

  it('emits an order created event', async () => {
    const ticket = await Ticket.create({
      title: 'concert',
      price: 20,
    });

    await request(app)
      .post('/api/orders')
      .set('Cookie', getCookie())
      .send({ ticketId: ticket.id })
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
