import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://qqhciqropekbcrquvsyx.supabase.co";
const supabaseKey = "sb_publishable_mKc8jHrNisqxx_BCP1uKzw_drs98CK0";
const supabase = createClient(supabaseUrl, supabaseKey);

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const db = getFirestore(app);

// data from the feilds;
let errorStyle = document.querySelector(".allerror");
let myError = [];

document.querySelector("#creatSection").addEventListener("submit",async (e) => {

    e.preventDefault();
    errorStyle.innerHTML = "";

    let name = document.querySelector("#name").value.trim();
    const imageFile = document.getElementById("image").files[0];


    if (name === "") {
        myError.push("حقل الصنف فارغ");
    } else if (name.length >= 25) {
        myError.push("حقل الصنف طويل");
    } else if (name.length <= 2) {
        myError.push("حقل الصنف قصير");
    }

    if(myError.length <= 0) {

        try {

            let loding = document.querySelector(".loader-container");
            loding.style.display = "flex";

            // إنشاء اسم مميز للصورة
            const goodName = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}_${imageFile.goodName}`;

            // رفع الصورة
            const { data, error } = await supabase.storage
                .from("MenuImage")
                .upload(fileName, imageFile);

            if (error) throw error;

            // console.log("تم رفع الصورة بنجاح");
            // console.log("مسار الصورة:", data.path);

            // استخراج رابط الصورة
            const { data: imageData } = supabase.storage
                .from("MenuImage")
                .getPublicUrl(data.path);
            //console.log("رابط الصورة:", imageData.publicUrl);

            // ---------------------------------
            await addDoc(collection(db,"sections"),{
                name:name,
                image:imageData.publicUrl
            });

            console.log("done");
            document.querySelector("#creatSection").reset();

            //////////////////////////////
            const doneAdd = document.createElement("div");
            doneAdd.classList.add("goode");
            doneAdd.textContent = "تمت إضافة الصنف بنجاح";
            errorStyle.appendChild(doneAdd);
            //////////////////////////////

            loding.style.display = "none";

        } catch (error) {
            myError.push("عذرا حدث خطاء الرجاء المحاولة مرة اخرى");
        }

    } else {
        
        myError.forEach((er) => {

            const myBug = document.createElement("div");
            myBug.classList.add("error");
            myBug.textContent = er;

            errorStyle.appendChild(myBug);
            //console.log(er);
        });
        
        myError = [];
    }
    
});