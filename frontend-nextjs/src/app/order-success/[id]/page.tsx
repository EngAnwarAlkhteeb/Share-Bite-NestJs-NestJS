"use client";

import OrderSuccess from "@/pages/OrderSuccess/OrderSuccess";

export default function OrderSuccessPage({ params }: { params: { id: string } }) {
  return <OrderSuccess orderId={params.id} />;
}

