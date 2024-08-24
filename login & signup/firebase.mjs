import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("btnca").addEventListener("click", function() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User created:", user);

      // Send email verification
      sendEmailVerification(user).then(() => {
        console.log("Verification email sent.");
      });

      // Sign in the user
      return signInWithEmailAndPassword(auth, email, password);
    })
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user);
    })
    .catch((error) => {
      console.error("Error:", error.code, error.message);
    });

  // Monitor authentication state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in:", user.uid);
    } else {
      console.log("User is signed out");
    }
  });
});

// Reset password function
function resetPassword() {
  const email = document.getElementById("email").value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent!");
    })
    .catch((error) => {
      console.error("Error:", error.code, error.message);
    });
}

// Sign out function
function logOut() {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}