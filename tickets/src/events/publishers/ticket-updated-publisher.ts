import { Publisher, Subjects, TicketUpdatedEvent } from '@mgmts/common';

class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

export default TicketUpdatedPublisher;
