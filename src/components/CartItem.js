import React from "react";
import addbtn from "../images/add.png";
import subtractbtn from "../images/subtracting-button.png";
import deletebtn from "../images/delete.png";

const CartItem = (props) => {
        const {product, onIncreaseQuantity, onDecreaseQuantity, onDeleteProduct} = props;
        const {title, price, qty, img} = props.product;
        return(
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image} src={img} alt={title} />
                </div>
                <div className="right-block">
                    <div style={{fontSize : "25px"}}>{title}</div>
                    <div style={{ color : "#777"}}>Rs {price}</div>
                    <div style={{ color : "#777"}}>Qty : {qty}</div>
                    <div className="cart-item-actions">
                        <img alt="increase" className="action-icons" src={addbtn} onClick={() => onIncreaseQuantity(product)}/>
                        <img alt="decrease" className="action-icons" src={subtractbtn} onClick={() => onDecreaseQuantity(product)} />
                        <img alt="delete" className="action-icons" src={deletebtn} onClick={() => onDeleteProduct(product.id)} />
                    </div>
                </div>
            </div>
        );
}

const styles = {
    image : {
        height : "110px",
        width : "110px",
        borderRadius : "4px",
        background : "#ccc"
    }
}

export default CartItem;