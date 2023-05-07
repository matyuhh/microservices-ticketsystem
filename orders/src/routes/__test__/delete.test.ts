import request from 'supertest';
import { OrderStatus } from '@mgmts/common';

import app from '../../app';
import Ticket from '../../models/ticket';
import getCookie from '../../test/getCookie';
import Order from '../../models/order';
import natsWrapper from '../../nats-wrapper';

describe('Delete related tests', () => {
  it('marks an order as cancelled', async () => {
    const ticket = await Ticket.create({
      title: 'concert',
      price: 20,
    });

    const user = getCookie();

    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .delete(`/api/orders/${order.id}`)
      .set('Cookie', user)
      .send()
      .expect(204);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder.status).toEqual(OrderStatus.Cancelled);
  });

  it('emits an order cancelled event', async () => {
    const ticket = await Ticket.create({
      title: 'concert',
      price: 20,
    });

    const user = getCookie();

    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .delete(`/api/orders/${order.id}`)
      .set('Cookie', user)
      .send()
      .expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
