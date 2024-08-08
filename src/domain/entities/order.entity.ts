export class OrderEntity {
  private props: OrderProps;
  constructor(props: OrderProps) {
    this.props = props;
  }

  static create(props: OrderProps): OrderEntity {
    return new OrderEntity(props);
  }

  get id() {
    return this.props.id;
  }
  get customerName() {
    return this.props.customerName;
  }
  get product() {
    return this.props.product;
  }
  get quantity() {
    return this.props.quantity;
  }
  get status() {
    return this.props.status;
  }
}

export type OrderProps = {
  id: string;
  customerName: string;
  product: string;
  quantity: number;
  status: string;
};
