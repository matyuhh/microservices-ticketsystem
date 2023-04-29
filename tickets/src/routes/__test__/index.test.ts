import request from 'supertest';

import app from '../../app';
import getCookie from '../../test/getCookie';

const createTicket = () => {
  const title = 'title';
  const price = 20;

  return request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({ title, price });
};

describe('Index related tests', () => {
  it('can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
      .get('/api/tickets')
      .send()
      .expect(200);

    expect(response.body.length).toEqual(3);
  });
});
