    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

    import {
    getAuth,
    signInWithEmailAndPassword
    } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

    const firebaseConfig = {
    apiKey: "AIzaSyBxDDWhtNOjl94uCKJtPgfynbbkourcfOo",
    authDomain: "m-menu-8145e.firebaseapp.com",
    projectId: "m-menu-8145e",
    storageBucket: "m-menu-8145e.firebasestorage.app",
    messagingSenderId: "474385945524",
    appId: "1:474385945524:web:46d29cd0c4b2922408d8e1"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // data from the feilds;
    document.querySelector("#login").addEventListener("submit",async (e) => {
        e.preventDefault();

        const email = document.querySelector("#email").value.trim();
        const pass = document.querySelector("#pass").value.trim();

        try {

            const userCredential = await signInWithEmailAndPassword(auth,email,pass);
            const user = userCredential.user;

            console.log(user.uid);

            console.log("done");
            document.querySelector("#login").reset();
            window.location.href = "user/home.html";

        } catch (error) {
            console.log("faild");
            console.error(error.code,error.message);
        }
    });