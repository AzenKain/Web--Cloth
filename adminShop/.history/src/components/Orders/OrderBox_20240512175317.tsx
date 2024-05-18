'use client'
import { AddListOrder } from "@/app/redux/features/order/order.redux";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getAllOrderApi, getProductByIdApi, getTopProductApi, makeRequestApi } from "@/lib/api";
import { OrderType } from "@/types/order";
import { ProductType } from "@/types/product";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";

const SalesBox = () => {
    const { data: session } = useSession()
    const dispatch = useAppDispatch()
    const listOrder = useAppSelector((state) => state.OrderRedux.value)
    const [dataItems, setDataItems] = useState<{ [productId: string]: ProductType }>({})


    useEffect(() => {
        const fetchData = async () => {
            try {
              const dataOrder: OrderType[] = await makeRequestApi(getAllOrderApi, null, session?.refresh_token, session?.access_token);
              if (!dataOrder) return;
              dispatch(AddListOrder(dataOrder))
              let newDataItems: { [productId: string]: ProductType } = {};
              for (let i = 0; i < dataOrder.length; i++) {
                  for (let j = 0; j < dataOrder[i].listProducts.length; j++) {
                      let productId: string = dataOrder[i].listProducts[j].productId
                      if (newDataItems[productId]) continue;
                      let tmpDataItem: ProductType = await getProductByIdApi(productId)
                      newDataItems[productId] = tmpDataItem
                  }
              }
              setDataItems(newDataItems)
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
      
          if (session?.userId && session?.refresh_token && session?.access_token) {
            fetchData();
          }
      }, [])


    return (
    
            <div className="flex flex-col gap-10">
                 <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between px-4 py-6 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        List Order
                    </h4>
                </div>
                {listOrder?.map((orderData, index) => (
                <div key={orderData?.id} className="w-full my-4 max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                    <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                            <div className="data">
                                <p className="font-semibold text-base leading-7 text-black dark:text-white ">Order Id: <span className="text-indigo-600 font-medium">{orderData.id}</span></p>
                                <p className="font-semibold text-base leading-7 text-black dark:text-white  mt-4">Order Payment : <span className="text-gray-400 font-medium">{new Date(orderData?.createdAt ?? "").toUTCString()}</span></p>
                            </div>
                            <div className="text-center text-3xl font-bold border-4 bg-gray-300 px-4 py-2 rounded-full">
                                {orderData.isPay?.isPaid ? "Paid" : "UnPaid"}
                            </div>
                            <div className="text-center text-3xl border-c font-bold text-black dark:text-white border-4 bg-green-500 px-4 py-2 rounded-full">
                                Edit
                            </div>
                        </div>
                        <div className="w-full px-3 min-[400px]:px-6">
                            {orderData?.listProducts.map((product, index) => (
                                <div key={index} className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                                    <div className="img-box max-lg:w-full">
                                        <Image
                                            src={dataItems[product.productId]?.imgDisplay.find(img => img?.link?.includes(product.color.toLowerCase()))?.url ?? ""}
                                            width={100}
                                            height={100}
                                            alt={`${dataItems[product.productId]?.productName}`}
                                            className="aspect-square w-full lg:max-w-[140px]"
                                        />
                                    </div>
                                    <div className="flex flex-row items-center w-full ">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                            <div className="flex items-center">
                                                <div>
                                                    <h2 className="font-semibold text-xl leading-8 text-black dark:text-white  mb-3">
                                                        {dataItems[product.productId]?.productName}
                                                    </h2>
                                                    <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                                        By: {dataItems[product.productId]?.detail?.company}</p>
                                                    <div className="flex items-center ">
                                                        <p className="font-medium text-base leading-7 text-black dark:text-white  pr-4 mr-4 border-r border-gray-200">
                                                            Size:
                                                            <span className="text-gray-500">
                                                                {product.size}
                                                            </span>
                                                        </p>
                                                        <p className="font-medium text-base leading-7 text-black dark:text-white  pr-4 mr-4 border-r border-gray-200">
                                                            Color:
                                                            <span className="text-gray-500">
                                                                {product.color}
                                                            </span>
                                                        </p>
                                                        <p className="font-medium text-base leading-7 text-black dark:text-white  ">
                                                            Qty:
                                                            <span className="text-gray-500">
                                                                {product.quantity}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-5">
                                                <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm leading-7 text-black dark:text-white ">Price</p>
                                                        <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">{product.price}đ</p>
                                                    </div>
                                                </div>
                                                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm leading-7 text-black dark:text-white ">
                                                            Status
                                                        </p>
                                                        <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-indigo-50 text-emerald-600">
                                                            {orderData.status}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                                            Expected Delivery Time</p>
                                                        <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                                            {new Date(new Date(orderData?.createdAt ?? "").setDate(new Date(orderData?.createdAt ?? "").getDate() + 7)).toDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                            <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200 ml-2">
                                <p className=" font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">Payment method: <span className="text-gray-500">{orderData.paymentMethods}</span></p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <p className="font-semibold text-lg text-black dark:text-white  py-6">Shipping: <span className="text-indigo-600">
                                    {orderData.deliveryType == "STANDARD" ? 25000 : orderData.deliveryType == "FAST" && 50000}đ
                                </span></p>
                                <p className="font-semibold text-lg text-black dark:text-white  py-6">Total Price:
                                    <span className="text-indigo-600">
                                        {orderData.totalAmount && (orderData.totalAmount * 1.1 + (orderData.deliveryType == "STANDARD" ? 25000 : orderData.deliveryType == "FAST" ? 50000 : 0)).toFixed(3)}đ
                                        <span className="text-base text-red-500">
                                            {" (+10% tax)"}
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>

        </div>
    )
}

export default SalesBox;