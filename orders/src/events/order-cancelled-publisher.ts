import { Publisher, Subjects, OrderCancelledEvent } from '@mgmts/common';

class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}

export default OrderCancelledPublisher;
