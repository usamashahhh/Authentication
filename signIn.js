
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


var email= document.getElementById("email");
var password= document.getElementById("password");
var signin= document.getElementsByClassName("btn-primary")


//              ******************************************************


signin[0].addEventListener("click",function()
{
    event.preventDefault()


    //                      ********* SIGN IN AUTHENTICATION START *********


    firebase.auth().signInWithEmailAndPassword(email.value,password.value)

    .then((user)=>{
        console.log(user.user)  
        
        localStorage.setItem("uid",user.user.uid);
        localStorage.setItem("email",email.value);
    
        window.location.replace("home.html")
    
    })
    .catch((err)=>{
        alert(err.message)
    })



})
