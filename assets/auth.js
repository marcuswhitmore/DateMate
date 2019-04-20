
var provider = new firebase.auth.GoogleAuthProvider();

//use the user's defualt device language
firebase.auth().useDeviceLanguage();

provider.addScope('email');
provider.addScope('profile');

//Store user data in Firebase
function writeUserData(newUser) {

}

//make branch, add pics, push to origin

$("#btn_sign_in").on("click", function () {
    console.log("sign-in clicked");
    //Provide sign-in via Pop-up
    firebase.auth().signInWithPopup(provider).then(function (result) {
        //This provides a Google API token
        var token = results.credential.accessToken;

        //This stores the signed-in user's info
        var user = result.user;
        //writeUserData(user);

    }).catch(function (error) {
        //This handles error messages here
        var errorCode = error.code;
        var errorMessage = error.message;

        //email associated with error
        var email = error.email;

        //firebase.auth.authCredential type used
        var credential = error.credential;
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //user signed in
        }
        else {
            //not signed in
        }
    });
})

$("#btn_sign_out").on("click", function () {
    console.log("sign out clicked");
    //Provide sign-out feature
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("yes");
    }).catch(function (error) {
        // An error happened.
    });
})

var user = firebase.auth().currentUser;

if (user) {
    //current user
}
else {
    //no signed
}

