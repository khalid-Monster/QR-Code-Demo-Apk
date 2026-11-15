import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://qqhciqropekbcrquvsyx.supabase.co";
const supabaseKey = "sb_publishable_mKc8jHrNisqxx_BCP1uKzw_drs98CK0";
const supabase = createClient(supabaseUrl, supabaseKey);

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
getFirestore,
doc,
getDoc,
updateDoc
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

const urlParams = new URLSearchParams(window.location.search);
const myId = urlParams.get('id');

let sectionName = document.querySelector("#name");
let fexdName = "";

let sectionPrice = document.querySelector("#price");
let fexdPrice = "";

// data from the feilds;
let errorStyle = document.querySelector(".allerror");
let myError = [];

async function loadSectionData() {
    if(myId) {

        try {

            const oldSection = doc(db,"items",myId);
            const docsectionSnap = await getDoc(oldSection);

            if (docsectionSnap.exists()) {
                const data = docsectionSnap.data();   
                sectionName.value = data.name;
                fexdName = data.name;

                sectionPrice.value = data.price;
                fexdPrice = data.price;
            }

        } catch (error) {
            myError.push("عذرا حدث خطاء الرجاء المحاولة مرة اخرى");
        }

    } else {

        const myBug = document.createElement("div");
        myBug.classList.add("error");
        myBug.textContent = "لم يتم تحديد وجبة لتعديلها";
        errorStyle.appendChild(myBug);

        setTimeout(function () {
            window.location.href = "creat_item.html";
        },2000);

    }
    
}

loadSectionData();

document.querySelector("#creatItem").addEventListener("submit", async (e) => {

    e.preventDefault();
    errorStyle.innerHTML = "";

    if (sectionName.value === "") {
        myError.push("حقل الوجبة فارغ");
    } else if (sectionName.length >= 25) {
        myError.push("حقل الوجبة طويل");
    } else if (sectionName.length <= 2) {
        myError.push("حقل الوجبة قصير");
    }else if (sectionName.value === fexdName) {
        myError.push("لم تغير اسم الوجبة بعد");
    }

    if (sectionPrice.value === "") {
        myError.push("حقل السعر فارغ");
    } else if (sectionPrice.length >= 8) {
        myError.push(" السعر طويل");
    } else if (sectionPrice.length <= 0) {
        myError.push(" السعر قصير");
    } else if (sectionPrice.value === fexdPrice) {
        myError.push("لم تغير السعر بعد");
    }

    if (myError.length <= 0 ) {

        try {

            let loding = document.querySelector(".loader-container");
            loding.style.display = "flex";

            await updateDoc(doc(db,"items",myId),{
                name:sectionName.value,
                price:sectionPrice.value
            });

            console.log("done");
            document.querySelector("#creatItem").reset();

            //////////////////////////////
            const doneAdd = document.createElement("div");
            doneAdd.classList.add("goode");
            doneAdd.textContent = "تم تعديل الصنف بنجاح";
            errorStyle.appendChild(doneAdd);
            //////////////////////////////

            setTimeout(function () {
                window.location.href = "all_items.html";
            } , 1500);

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

        });
        
        myError = [];
    }
    
});

