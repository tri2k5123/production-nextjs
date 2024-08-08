import Link from "next/link"
import { memo } from "react"
import { addDotToPrice } from "./admin/generalData"

function ListProduct({ params, product }) {
    return (
        <Link href={`/product/${product._id}`}>
            <div className="product-item">
                <img className="product-img" src={product.imgs[0]} alt="" />
                <img src={product.imgs[1]} alt="" className="product-img-hover" />
                <div className="product-name">{product.productName}</div>
                {product.percentPrice ?
                    (
                        <div className="flex justify-center items-center mt-3 text-color-text text-xs pb-5">
                            <div className="text-white bg-color-price p-1">-{product.percentPrice}%</div>
                            <div className="mx-1.5 text-base">{addDotToPrice(product.basePrice)}đ</div>
                            <div className="relative p-1 text-[#939393] cancel-price general">{addDotToPrice(Math.floor(product.initialPrice))}đ</div>
                        </div>
                    ) :
                    (
                        <div className="flex justify-center items-center mt-3 text-color-text text-xs pb-5">
                            <div className="mx-1.5 text-base">{addDotToPrice(product.basePrice)}đ</div>
                        </div>
                    )
                }
                {product.remaining == 0 && (
                    <div class="home-product-item__sold-out">
                        <div class="text-sm md:text-base text-white font-semibold">
                            SOLD<br/>OUT
                        </div>
                    </div>
                )}
            </div>
        </Link>
    )
}
export default memo(ListProduct)