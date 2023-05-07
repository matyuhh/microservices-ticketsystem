import { Publisher, Subjects, OrderCreatedEvent } from '@mgmts/common';

class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}

export default OrderCreatedPublisher;
