    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

    import {
    getFirestore,
    collection,
    addDoc,
    getDocs
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

    //////////////////////
    const sectionSelect = document.getElementById("sectionSelect");

    async function loadSectionsDropdown() {
        try {
            const querySnapshot = await getDocs(collection(db, "sections"));
            
            sectionSelect.innerHTML = `<option value="" disabled selected>اختر القسم التابع له الوجبة</option>`;

            querySnapshot.forEach((doc) => {
                const sectionData = doc.data();
                const sectionId = doc.id;
                const sectionName = sectionData.name; 

  
                const option = document.createElement("option");
                option.value = sectionId;    
                option.textContent = sectionName; 
                
                sectionSelect.appendChild(option);
            });

        } catch (error) {
            console.error("خطأ أثناء جلب الأقسام للقائمة:", error);
        }
    }

    loadSectionsDropdown();
///////////////////////////

    // data from the feilds;
    let errorStyle = document.querySelector(".allerror");
    let myError = [];
    document.querySelector("#creatItem").addEventListener("submit",async (e) => {

        e.preventDefault();
        errorStyle.innerHTML = "";

        let name = document.querySelector("#name").value.trim();
        let price = document.querySelector("#price").value.trim();


        if (name === "") {
            myError.push("حقل الوجبة فارغ");
        } else if (name.length >= 20) {
            myError.push("اسم الوجبة طويل");
        } else if (name.length <= 2) {
            myError.push("اسم الوجبة قصير");
        }

        if (price === "") {
            myError.push("حقل السعر فارغ");
        } else if (price.length >= 8) {
            myError.push(" السعر طويل");
        } else if (price.length <= 0) {
            myError.push(" السعر قصير");
        }

        if (sectionSelect.value === "") {
            myError.push("يجب تحدد صنف الوجبة");
        }


        if(myError.length <= 0) {

            try {

                let loding = document.querySelector(".loader-container");
                loding.style.display = "flex";

                let myList = document.querySelector("select");

                await addDoc(collection(db,"items"),{
                    name:name,
                    price:price,
                    section_id:myList.value
                });

                console.log("done");
                document.querySelector("#creatItem").reset();

                //////////////////////////////
                const doneAdd = document.createElement("div");
                doneAdd.classList.add("goode");
                doneAdd.textContent = "تمت إضافة الوجبة بنجاح";
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