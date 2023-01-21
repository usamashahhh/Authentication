
//                                  *************** FIREBASE CONFIG ***************

const firebaseConfig = {
    apiKey: "AIzaSyAL6a2P8nj6TMz8o6ZpcN7hAlpmzDgbAbs",
    authDomain: "authentication-test-3a092.firebaseapp.com",
    projectId: "authentication-test-3a092",
    storageBucket: "authentication-test-3a092.appspot.com",
    messagingSenderId: "92440852010",
    appId: "1:92440852010:web:9fff361c60f16e13ba3553"
};

  firebase.initializeApp(firebaseConfig);

//                      ____________________________________________________________________

//                                    *********** ELEMENTS GET *********


var dishName= document.getElementById("dish name");
var price= document.getElementById("price");
var quantity= document.getElementById("quantity");
var submit= document.getElementById("submit");
var edit_dish_key= localStorage.getItem("Dish_Key")
console.log(edit_dish_key);


//                                    *********** EDIT DISH *********


firebase.database().ref("grocer/dishes").child(edit_dish_key).once("value",(snp)=>
{


    var dishData= snp.toJSON();
    console.log(dishData)

    dishName.value = dishData.Dish_Name;
    price.value = dishData.Price;
    quantity.value = dishData.Quantity;

})

submit.addEventListener("click", async function()
{
    event.preventDefault()

    var obj= {
                Dish_Name: dishName.value,
                Price: price.value,
                Quantity: quantity.value,

            }

    await    firebase.database().ref("grocer/dishes").child(edit_dish_key).update(obj)

    window.location.replace("home.html")


})


