
//                  ************** FIREBASE CONFIG ****************


const firebaseConfig = {
    apiKey: "AIzaSyAL6a2P8nj6TMz8o6ZpcN7hAlpmzDgbAbs",
    authDomain: "authentication-test-3a092.firebaseapp.com",
    projectId: "authentication-test-3a092",
    storageBucket: "authentication-test-3a092.appspot.com",
    messagingSenderId: "92440852010",
    appId: "1:92440852010:web:9fff361c60f16e13ba3553"
};

firebase.initializeApp(firebaseConfig);

//                 ------------------------------------------------------       
       
//                        ************* PROFILE ELEMENTS ***********

var userRole= document.getElementById("role");
var userEmail= document.getElementById("email");
var userName= document.getElementById("name");
var signout= document.getElementsByTagName("button");

//                  -----------------------------------------------------

//                        ************* ADMIN ELEMENTS ***********

var dish_name= document.getElementById("dish_name");
var price= document.getElementById("price");
var quantity= document.getElementById("quantity");
var choose_file= document.getElementById("file");
var upload= document.getElementById("upload");
var add_dish= document.getElementById("add_dish");
var progress1= document.getElementById("progress");
var row= document.getElementsByClassName("row")
var files
img_url=""



//              ***************** USER PROFILE SHOW *********************

       
var currentUserEmail= localStorage.getItem("email");
console.log("CurrentUserEmail : " + currentUserEmail);
var currentUserId= localStorage.getItem("uid")

       
       firebase.database().ref("grocer/").once("value",(snapshot)=>
        {
            var data= snapshot.toJSON();
            console.log(data)
            var value= Object.values(data);
            console.log(value)
            var userdata= Object.values(value[1])
            console.log(userdata);
            var admindata= Object.values(value[0])
            console.log(admindata)
            for(var i=0; i<admindata.length; i++)
            {
                var adminAllData= Object.values(admindata[i])
                console.log(adminAllData[0])

                if(currentUserEmail == adminAllData[0])
                {
                    firebase.database().ref(`grocer/all admins/${currentUserId}`).once("value",(snp)=>
                    {
                        var data= snp.toJSON();
                        var role= data.role;
                        localStorage.setItem("role",role)

                        var urole= data["role"];
                        console.log("User Role : " + urole)
                        userRole.innerHTML += `: ${urole}`

                        var uname= data["name"];
                        console.log("User name : " + uname);
                        userName.innerHTML += `: ${uname}`;

                        var uemail= data["email"];
                        console.log("User Email : " + uemail);
                        userEmail.innerHTML += `: ${uemail}`;

                    })

                    document.getElementById("form").style.display= 'inline';


                    // *************** SELECTING IMAGE FORM FOLDER ************


                    choose_file.addEventListener("click",function(){
                        choose_file.onchange = e =>{
                            files = e.target.files;
                            reader = new FileReader();
                    
                            console.log(reader.result)
                            reader.onload = function(){           
                            }
                            reader.readAsDataURL(files[0])
                            console.log(files[0])
                            document.getElementById("upload").removeAttribute("disabled")
                    
                           
                        }
                        
                    })

//                          ********************************* ADMIN PANEL *****************************


                    upload.addEventListener("click",function (){
                        event.preventDefault()
                        console.log(files[0])
                        var strg = firebase.storage().ref()
                    
                        var uploadTask = strg.child(`images/${files[0].name}`)
                        .put(files[0])
                    
                        uploadTask.on('state_changed', 
                          (snapshot) => {
                          
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            progress1.style.display="inline"
                            progress1.innerText=`Progress : ${progress}`
                            // console.log('Upload is ' + progress + '% done');
                    
                            if(progress==0){
                                progress1.innerText="Start upload"
                            //   alert("Upload Process Star\n Plz Wait For Upload Image In Data Base")
                            }
                            if(progress<25){
                                progress1.innerText=`Progress : ${progress}`
                            }
                            if(progress<50){
                                progress1.innerText=`Progress : ${progress}`
                            }
                            if(progress<75){
                                progress1.innerText=`Progress : ${progress}`
                            }
                    
                            if(progress==100){
                                progress1.innerText="complete"
                            //   alert("Upload Process Finish \n Successfully Upload Image In Data Base")
                            }
                            
                          }, 
                          (error) => {
                            // Handle unsuccessful uploads
                          }, 
                          () => {
                            // Handle successful uploads on complete
                            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                img_url =   downloadURL;
                              console.log('File available at', downloadURL);
                             document.getElementById('add_dish').removeAttribute('disabled')
                            });
                          }
                        );
                    
                    
                    })

                    add_dish.addEventListener("click",async function(){
                        event.preventDefault()
                        var key = firebase.database().ref("grocer/dishes/").push().getKey()
                    
                        var obj = {
                            Dish_Name: dish_name.value,
                            Price: price.value,
                            Quantity: quantity.value,
                            ImgUrl : img_url,
                            Dish_Key : key
                    
                        }
                    
                      await   firebase.database().ref("grocer/dishes/").child(key).set(obj)

                      window.location.reload();
                    })

                    firebase.database().ref("grocer/dishes/").once("value", (snapshot) => {
                        console.log(snapshot.toJSON())
                        var dishData = Object.values(snapshot.toJSON()) 
                        console.log(data)
                    
                        dishData.map((v, i) => {
                            // console.log(v)
                            row[7].innerHTML += 
                            
                            `

                                <div class="col col-lg-3 col-md-4 col-sm-6 col-12 mt-2 mx-4" style="height:400px">
                                    <div class="card" >
                                            <img src=${v.ImgUrl} class="card-img-top" alt="..." style="width:100%;height:200px">
                                        <div class="card-body">
                                    
                                            <h5 class="card-title">${v.Dish_Name==""  ?"No title" : 'Product Name : ' + v.Dish_Name  }
                                            
                                            </h5>
                                            <p class="card-text">${v.Price==""  ?"100" : 'price : ' + v.Price + ' Rs' }</p> </br></br>
                                            
                                            <a href="#" id="${v.Dish_Key}" class="btn btn-success" onclick="editDish(this)"> Edit </a> 
                                            <a href="#" id="${v.Dish_Key}" class="btn btn-danger" onclick="deleteDish(this)"> Delete </a> 

                                        </div>
                                    </div>
                                </div>

                            `
                    
                        })
                    
                    })

                    

                }

            }

 //              *********************************  USER PANEL *************************************************** 


            for(var i=0; i<userdata.length; i++)
            {
                var userAllData= Object.values(userdata[i]);
                console.log(userAllData[0])  
                
                if(currentUserEmail == userAllData[0])
                {
                    firebase.database().ref(`grocer/all users/${currentUserId}`).once("value",(snapshot)=>
                    {
                        var data= snapshot.toJSON();
                        var role= data.role;
                        localStorage.setItem("role",role)

                        var urole= data["role"];
                        console.log("User Role : " + urole)
                        userRole.innerHTML += `: ${urole}`

                        var uname= data["name"];
                        console.log("User name : " + uname);
                        userName.innerHTML += `: ${uname}`;

                        var uemail= data["email"];
                        console.log("User Email : " + uemail);
                        userEmail.innerHTML += `: ${uemail}`;


                    })

                    firebase.database().ref("grocer/dishes/").once("value", (snapshot) => {
                        console.log(snapshot.toJSON())
                        var dishData = Object.values(snapshot.toJSON()) 
                        console.log(data)
                    
                        dishData.map((v, i) => {
                            // console.log(v)
                            row[7].innerHTML += `
                        <div class="col col-lg-3 col-md-4 col-sm-6 col-12 mt-2 mx-4" style="height:400px">
                        <div class="card" >
                            <img src=${v.ImgUrl} class="card-img-top" alt="..." style="width:100%;height:200px">
                            <div class="card-body">
                           
                              <h5 class="card-title">${v.Dish_Name==""  ?"No title" : 'Product Name : ' + v.Dish_Name  }
                              
                              </h5>
                              <p class="card-text">${v.Price==""  ?"100" : 'price : ' + v.Price + ' Rs' }</p> </br></br>
                              
                              <button class="btn btn-primary"> Order </button> 

                            </div>
                          </div>
                    </div>
                        `
                    
                        })
                    
                    })


                }


            }

        })

        function editDish(e)
        {
            
            localStorage.setItem("Dish_Key", e.id)
            window.location.href= "edit_dish.html";

        }
        function deleteDish(d)
        {
            localStorage.setItem("Dish_Key", d.id)
            var key= localStorage.getItem("Dish_Key");


            firebase.database().ref("grocer/dishes").child(key).remove();
            window.location.reload();
        }
        



var signout= document.getElementsByTagName("button");
signout[0].addEventListener("click",function()
{
    firebase.auth().signOut()
    // window.location.reload()
    window.location.replace("signIn.html")
})



