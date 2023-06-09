import { Schema, model } from 'mongoose';

interface ITicket {
  title: string;
  price: number;
  userId: string;
}

const ticketSchema = new Schema<ITicket>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  userId: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      // eslint-disable-next-line no-param-reassign
      ret.id = ret._id;
      // eslint-disable-next-line no-param-reassign
      delete ret._id;
    },
  },
});

const Ticket = model<ITicket>('Ticket', ticketSchema);

export default Ticket;
