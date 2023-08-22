import React from "react";
import addbtn from "../images/add.png";
import subtractbtn from "../images/subtracting-button.png";
import deletebtn from "../images/delete.png";

class CartItem extends React.Component {
    constructor() {
        super();
        this.state = {
            title : "Phone",
            price : 999,
            qty : 1
        }

        // this.increaseQuantity = this.increaseQuantity.bind(this);
    }

    increaseQuantity = () => {
        // setState format 1 -> use when previous state is not required.
        // this.setState({
        //     qty : this.state.qty + 1
        // });

        //setState form 2 -> use when previous state is required.
        this.setState((prevState) => {
            return {
                qty : prevState.qty + 1
            }
        });
    }

    decreaseQuantity = () => {
        this.setState((prevState) => {
            return {
                qty : prevState.qty > 0 ? prevState.qty - 1 : 0
            }
        });
    }

    render() {
        const {title, price, qty} = this.state;
        return(
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image} />
                </div>
                <div className="right-block">
                    <div style={{fontSize : "25px"}}>{title}</div>
                    <div style={{fontSize : "25px", color : "#777"}}>Rs {price}</div>
                    <div style={{fontSize : "25px", color : "#777"}}>Qty : {qty}</div>
                    <div className="cart-item-actions">
                        <img alt="increase" className="action-icons" src={addbtn} onClick={this.increaseQuantity}/>
                        <img alt="decrease" className="action-icons" src={subtractbtn} onClick={this.decreaseQuantity} />
                        <img alt="delete" className="action-icons" src={deletebtn} />
                    </div>
                </div>
            </div>
        );
    }
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