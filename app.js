const firebaseConfig = {
    apiKey: "AIzaSyAL6a2P8nj6TMz8o6ZpcN7hAlpmzDgbAbs",
    authDomain: "authentication-test-3a092.firebaseapp.com",
    projectId: "authentication-test-3a092",
    storageBucket: "authentication-test-3a092.appspot.com",
    messagingSenderId: "92440852010",
    appId: "1:92440852010:web:9fff361c60f16e13ba3553"
};

  firebase.initializeApp(firebaseConfig);

//              ******************************************************


// console.log(firebase.storage())

var email= document.getElementById("email")
var password= document.getElementById("password");
var uname= document.getElementById("uname");
var selectrole= document.getElementById("autoSizingSelect");
var signup= document.getElementsByClassName("btn-primary");



//                 ///////////////********* SIGN UP START **********\\\\\\\\\\\\\\\\\\


signup[0].addEventListener("click",function()
{
    event.preventDefault()

    //              *********** FIREBASE AUTHENTICATION START FOR SIGN UP ***********
    
    var e= email.value;
    var p= password.value;
    var n= uname.value;
    var s= selectrole.value;


    if(e != "" && p != "" && n != "" && s != "")
    {

        firebase.auth().createUserWithEmailAndPassword(email.value,password.value)

        .then((user)=>{
            console.log(user.user.uid)

            localStorage.setItem("uid",user.user.uid);
            localStorage.setItem("email",email.value);
            localStorage.setItem("role",selectrole.value);

            var obj= {
                        role: selectrole.value,
                        name: uname.value,
                        email: email.value,
                        password: password.value,
                        uid: user.user.uid
                        
                     }

            if(selectrole.value == "admin")
            {
                firebase.database().ref("grocer/").child("all admins/").child(user.user.uid).set(obj)
            }
            else if(selectrole.value == "user")
            {
                firebase.database().ref("grocer/").child("all users/").child(user.user.uid).set(obj)
            }

        })
        .catch((e)=>{
            alert(e.message)
        })


    }
    else
    {
        alert("Plz fill these fields for SIGN UP")
    }

})
