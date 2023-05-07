import { Schema, model, Document } from 'mongoose';

export interface ITicket extends Document {
  title: string;
  price: number;
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
