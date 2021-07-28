import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyADazAG-IOkPVu34QMWMzpsFhGMU-72FcQ",
  authDomain: "onlineprintingservice-69f84.firebaseapp.com",
  databaseURL: "https://onlineprintingservice-69f84.firebaseio.com",
  projectId: "onlineprintingservice-69f84",
  storageBucket: "onlineprintingservice-69f84.appspot.com",
  messagingSenderId: "537030650630",
  appId: "1:537030650630:web:c707bf9bf3f89bbe2e8c87",
  measurementId: "G-S36V9LLPXK",
};
firebase.initializeApp(config);

export const createNewAdd = (file) => {
  console.log("=------------------", file);
  var itemObj = {
    itemImg: {
      name: file,
    },
    category: "printing",
  };
  return new Promise((resolve, reject) => {
    firebase
      .storage()
      .ref()
      .child(`category/${file.name}`)
      .put(file)
      .then((success) => {
        success.ref
          .getDownloadURL()
          .then((url) => {
            itemObj.itemImg = url;
            console.log("check url now hello", url);
            // firebase
            //   .database()
            //   .ref(`category/${file}/`)
            //   .push(itemObj)
            //   .then((success) => {
            //     alert("Add Created Successfully");
            //   })
            //   .catch((error) => {
            //     console.log(error.message);
            //   });
            resolve(url);
          })
          .catch((error) => {
            console.log(error.message);
            alert(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
};
