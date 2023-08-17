import React from "react";
import styles from "./Testinvoice.module.css";
import { CDN_URL_PRODUCT } from "@utils/routes";
import Image from "next/image";
import dayjs from "dayjs";
import QRCode from "react-qr-code";
import usePrice, { formatPrice } from "@utils/usePrice";
import { useRouter } from "next/router";

export interface InvoiceTemplateProps {
  orderId: number;
  orderData: any; // TODOS Replace 'any' with the actual type of your order data
}

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({
  orderId,
  orderData,
}) => {
  const { locale } = useRouter();

  function calculateSubtotal(total: number, discountPercent: number): number {
    const subtotal = (total * 100) / (100 - discountPercent);
    return parseFloat(subtotal.toFixed(2));
  }

  return (
    <div className={styles.main}>
      <div className={styles.csContainer}>
        <div className={`${styles.csInvoice} ${styles.csStyle1}`}>
          <div className={styles.csInvoice_in}>
            <div
              className={`${styles.csInvoice_head} ${styles.csType1} ${styles.csMb25}`}
            >
              <div className={styles.csInvoice_left}>
                <p
                  className={`${styles.csInvoice_number} ${styles.csPrimary_color} ${styles.csMb5} ${styles.csF16} ${styles.p}`}
                >
                  <b className={`${styles.csPrimary_color} ${styles.b}`}>
                    Life Smile
                  </b>
                </p>
                <p
                  className={`${styles.csInvoice_date} ${styles.csPrimary_color} ${styles.csM0} ${styles.p}`}
                >
                  48 Al Suq Al Kabeer St <br />
                  Deira Al Sabkha, Dubai, UAE
                </p>
              </div>
              <div
                className={`${styles.csInvoice_right} ${styles.csText_right}`}
              >
                <div className={`${styles.csLogo} ${styles.csMb5}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/lifesmile.png"
                    alt="Logo"
                    width="90px"
                    height="90px"
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.csInvoice_head} ${styles.csMb10}`}>
              <div className={styles.csInvoice_left}>
                <b className={`${styles.csPrimary_color} ${styles.b}`}>
                  Invoice / Recipt:
                </b>
                <p className={styles.p}>
                  Invoice: #{orderData.id} <br />
                  Date: {dayjs(orderData.createdAt).format("MMMM D, YYYY")}
                </p>
              </div>
              <div className={styles.csInvoice_right}>
                <QRCode value={`#${orderData.invoiceNumber}`} size={60} />
              </div>
            </div>
            <div className={`${styles.csBox2_wrap} ${styles.csMb30}`}>
              <div className={`${styles.csBox} ${styles.csStyle2}`}>
                <b className={`${styles.csPrimary_color} ${styles.b}`}>
                  Bill To:
                </b>
                <br />
                {orderData?.address?.fullname} <br />
                {orderData?.address?.phone} <br />
                {orderData?.address?.apartment} {orderData?.address?.address},{" "}
                {orderData?.address?.city}
                <br />
                {orderData?.address?.country} <br />
              </div>
              <div className={`${styles.csBox} ${styles.csStyle2}`}>
                <b className={`${styles.csPrimary_color} ${styles.b}`}>
                  Payment Info:
                </b>
                <br />
                Cash
                {orderData.paymentMethod === "cod"
                  ? "To be Paid"
                  : "Amount Paid"}
                : {"  "}
                <span style={{ textTransform: "uppercase" }}>
                  {orderData.totalAmount} {orderData.cart[0].currency}
                </span>
                <br />
                Payment Method:{" "}
                <span style={{ textTransform: "uppercase" }}>
                  {orderData.paymentMethod}
                </span>{" "}
              </div>
            </div>
            <div className={`${styles.cStable} ${styles.cSstyle1}`}>
              <div className={styles.csRound_border}>
                <div className={styles.csTable_responsive}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th
                          className={`${styles.th} ${styles.csWidth_2} ${styles.csSemi_bold} ${styles.csPrimary_color} ${styles.csFocus_bg}`}
                        ></th>
                        <th
                          className={`${styles.th} ${styles.csWidth_2} ${styles.csSemi_bold} ${styles.csPrimary_color} ${styles.csFocus_bg}`}
                        >
                          Item
                        </th>
                        <th
                          className={`${styles.th} ${styles.csWidth_4} ${styles.csSemi_bold} ${styles.csPrimary_color} ${styles.csFocus_bg}`}
                        >
                          Description
                        </th>
                        <th
                          className={`${styles.th} ${styles.csWidth_1} ${styles.csSemi_bold} ${styles.csPrimary_color} ${styles.csFocus_bg}`}
                        >
                          Qty
                        </th>
                        <th
                          className={`${styles.th} ${styles.csWidth_2} ${styles.csSemi_bold} ${styles.csPrimary_color} ${styles.csFocus_bg} ${styles.csText_right}`}
                        >
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderData?.cart?.map((a: any, i: number) => (
                        <tr key={i}>
                          <td
                            className={`${styles.csWidth_2} ${styles.td}`}
                            style={{ filter: " brightness(0.95)" }}
                          >
                            <Image
                              src={`${CDN_URL_PRODUCT}/thumbnail/${a.productImage}`}
                              alt={a.productName}
                              width={80}
                              height={80}
                              style={{ borderRadius: "10px" }}
                            />
                          </td>
                          <td className={`${styles.csWidth_2} ${styles.td}`}>
                            {a.ItemCode}
                          </td>
                          <td className={`${styles.csWidth_4} ${styles.td}`}>
                            {a.productName}
                          </td>
                          <td className={`${styles.csWidth_1} ${styles.td}`}>
                            {a.productQuantity}x{a.productAmount}
                          </td>
                          <td
                            className={`${styles.csWidth_3} ${styles.csText_right} ${styles.td}`}
                          >
                            {formatPrice({
                              basePrice: a.productAmount,
                              currencyCode: a.currency,
                              locale: locale as string,
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  className={`${styles.csInvoice_footer} ${styles.csBorder_top}`}
                >
                  <div
                    className={`${styles.csLeft_footer} ${styles.csMobile_hide}`}
                  >
                    <p className={`${styles.csMb0}  ${styles.p}`}>
                      <b className={`${styles.csPrimary_color} ${styles.b}`}>
                        Customer Note:
                      </b>
                    </p>
                    <p className={`${styles.csM0} ${styles.p}`}>
                      {orderData.customerNotes}
                    </p>
                  </div>
                  <div className={styles.csRight_footer}>
                    <table className={styles.table}>
                      <tbody>
                        <tr className={styles.csBorder_left}>
                          <td
                            className={`${styles.csWidth_3} ${styles.csSemi_bold} ${styles.csPrimary_color} ${styles.csFocus_bg} ${styles.td}`}
                          >
                            Subtotal
                          </td>
                          <td
                            className={`${styles.csWidth_3} ${styles.csSemi_bold} ${styles.csPrimary_color} ${styles.csFocus_bg} ${styles.td} ${styles.csText_right}`}
                          >
                            {formatPrice({
                              basePrice: calculateSubtotal(
                                orderData.totalAmount,
                                orderData.coupon.discountPercent
                              ),
                              currencyCode: orderData.cart[0].currency,
                              locale: locale as string,
                            })}
                          </td>
                        </tr>
                        <tr className={styles.csBorder_left}>
                          <td
                            className={`${styles.csWidth_3} ${styles.csSemi_bold} ${styles.csPrimary_color} ${styles.csFocus_bg} ${styles.td}`}
                          >
                            Shipping
                          </td>
                          <td
                            className={`${styles.csWidth_3} ${styles.csSemi_bold} ${styles.csPrimary_color} ${styles.csFocus_bg} ${styles.td} ${styles.csText_right}`}
                          >
                            FREE
                          </td>
                        </tr>
                        {orderData.coupon && (
                          <tr className={styles.csBorder_left}>
                            <td
                              className={`${styles.csWidth_3} ${styles.csSemi_bold} ${styles.csPrimary_color} ${styles.csFocus_bg} ${styles.td}`}
                            >
                              Coupon Discount
                            </td>
                            <td
                              className={`${styles.csWidth_3} ${styles.csSemi_bold} ${styles.csPrimary_color} ${styles.csFocus_bg} ${styles.td} ${styles.csText_right}`}
                            >
                              {orderData.coupon.discountPercent}% OFF
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className={styles.csInvoice_footer}>
                <div
                  className={`${styles.csLeft_footer} ${styles.csMobile_hide}`}
                ></div>
                <div className={styles.csRight_footer}>
                  <table>
                    <tbody>
                      <tr className={styles.csBorder_none}>
                        <td
                          className={`${styles.csWidth_3} ${styles.csBorder_top_0} ${styles.cSbold} ${styles.csF16} ${styles.csPrimary_color} ${styles.td}`}
                        >
                          Total Amount
                        </td>
                        <td
                          className={`${styles.csWidth_3} ${styles.csBorder_top_0} ${styles.cSbold} ${styles.csF16} ${styles.csPrimary_color} ${styles.td} ${styles.csText_right}`}
                        >
                          {formatPrice({
                            basePrice: orderData.totalAmount,
                            currencyCode: orderData.cart[0].currency,
                            locale: locale as string,
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className={styles.csNote}>
              <div className={styles.csNote_left}>🎉</div>
              <div className={styles.csNote_right}>
                <p className={`${styles.csMb0} ${styles.p}`}>
                  <b
                    className={`${styles.csPrimary_color} ${styles.csBold} ${styles.b}`}
                  >
                    Your order has been received:
                  </b>
                </p>
                <p className={`${styles.csM0} ${styles.p}`}>
                  Thank you for shopping at LIFE SMILE. We hope that it’s
                  exactly what you were looking for. Let us know how you like
                  it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
