import { Schema, Types, model } from 'mongoose';
import { OrderStatus } from '@mgmts/common';
import { ITicket } from './ticket';

interface IOrder {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: ITicket;
}

const orderSchema = new Schema<IOrder>({
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    required: true,
    default: OrderStatus.Created,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  ticket: {
    type: Types.ObjectId,
    ref: 'Ticket',
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

const Order = model<IOrder>('Order', orderSchema);

export default Order;
