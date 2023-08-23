import React from "react";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import {getFirestore,collection,onSnapshot,doc, updateDoc, addDoc, deleteDoc, query, orderBy, where} from "firebase/firestore";
import {app} from "./firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading : true
    };
    this.db = getFirestore(app);
  }

  componentDidMount(){
      const productsCollection = collection(this.db,"products");
      const q = query(productsCollection, orderBy("price","desc"));
      // const q = query(productsCollection, where("price",">=",999))
      onSnapshot(q, (snapshot) => {
          const products = snapshot.docs.map((doc) => {
            const data = doc.data();
            data.id = doc.id;
            return data;
          });
          this.setState({
            products,
            loading : false
          })
        });
  }

  handleIncreaseQuantity = (product) => {
    product.qty += 1;

    const collection = doc(this.db,"products",product.id);
    updateDoc(collection,{
      qty : product.qty
    }).then(() => {
      console.log("Quantity increased");
    }).catch((error)=>{
      console.log("Error : ", error);
    })
  };
  handleDecreaseQuantity = (product) => {
    if(product.qty === 0) {
      return;
    }
    product.qty -= 1;

    const collection = doc(this.db,"products",product.id);
    updateDoc(collection,{
      qty : product.qty
    }).then(() => {
      console.log("Quantity decreased");
    }).catch((error)=>{
      console.log("Error : ", error);
    })
  };
  handleDeleteProduct = (id) => {
    const collection = doc(this.db,"products",id);
    deleteDoc(collection).then(() => {
      console.log("Product Deleted");
    }).catch((error) => {
      console.log("Error : ", error);
    })
  }
  getCountValue = () => {
    const {products} = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }
  getTotalPrice = () => {
    const {products} = this.state;

    let totalprice = 0;

    products.forEach((product) => {
      totalprice += product.qty * product.price;
    })

    return totalprice;
  }
  addProduct = () => {
    const products = collection(this.db,"products");
    addDoc(products, {
      img : "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      title : "Watch",
      price : 999,
      qty : 5
    }).then((docRef) => {
      console.log("Product added", docRef);
    }).catch((error) => {
      console.log("Error : ", error);
    })
  }
  render () {
    const {products,loading} = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCountValue()} />
        {loading && <h1>Loading Products ...</h1>}
        <Cart 
          products = {products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <button style={{fontSize : 20, padding : 20}} onClick={this.addProduct}>Add Product</button>
        <div style={{padding:10, fontSize : 20}}>TOTAL : {this.getTotalPrice()}</div>
      </div>
    );
  }
}

export default App;
