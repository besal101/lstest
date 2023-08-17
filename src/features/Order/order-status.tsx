import { useOrderStatusQuery } from "@query/order/order-status";
import ProgressBox from "@components/ProgressBox";

interface Props {
  status: number;
}

const OrderStatus = ({ status }: Props) => {
  const { data, isLoading } = useOrderStatusQuery();
  return !isLoading ? (
    <ProgressBox data={data} status={status} />
  ) : (
    <div>Loading...</div>
  );
};

export default OrderStatus;
