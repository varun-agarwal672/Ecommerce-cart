import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD7_bGwp6YJKT_xTMTR2hTTxk1aKbuooOM",
  authDomain: "ecommerce-cart-93616.firebaseapp.com",
  projectId: "ecommerce-cart-93616",
  storageBucket: "ecommerce-cart-93616.appspot.com",
  messagingSenderId: "734919715653",
  appId: "1:734919715653:web:fc7eab4f1dda9fa4622c2c",
  measurementId: "G-HPP5M1M028"
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);