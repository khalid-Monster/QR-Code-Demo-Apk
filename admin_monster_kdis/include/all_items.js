import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
getFirestore,
collection,
getDocs,
deleteDoc,
doc,
getDoc,
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

let content = document.querySelector(".content");

async function loadeSections() {
    
    try {

        const querySnapshot = await getDocs(collection(db,"items"));

        if (querySnapshot.empty) {

            let noItems = document.createElement("div");
            noItems.classList.add("nosections");
            noItems.textContent = "لا توجد وجبات حاليا";
            document.querySelector("body").appendChild(noItems);

        } else {

            querySnapshot.forEach( async (myItem) => {

                const itemData = myItem.data();
                const itemId = myItem.id;
                const itName = itemData.name;


                const itembody = document.createElement("div");
                itembody.classList.add("sectionbody");

                const viewNmae = document.createElement("div");
                viewNmae.classList.add("sectionName");
                viewNmae.textContent = itName;

                const viewIcone = document.createElement("i");
                viewIcone.classList.add("fa","fa-trash");

                const editIcone = document.createElement("i");
                editIcone.classList.add("fa","fa-pencil" , "i2");
                editIcone.style.color = "green";

                viewIcone.addEventListener("click", async () => {
                    try {

                        let loding = document.querySelector(".loader-container");
                        loding.style.display = "flex";

                        await deleteDoc(doc(db,"items",itemId));
                        itembody.remove();

                        if (querySnapshot.empty) {
                            let noSections = document.createElement("div");
                            noItems.classList.add("nosections");
                            noItems.textContent = "لا توجد وجبات حاليا";
                            document.querySelector("body").appendChild(noSections);
                        }

                        loding.style.display = "none";
                        
                    } catch (error) {
                        console.log(sectionId);
                    }
                    
                });

                editIcone.addEventListener("click", () => {
                    window.location.href = `edit_items.html?id=${itemId}`;
                });

                itembody.appendChild(editIcone);
                itembody.appendChild(viewIcone);
                itembody.appendChild(viewNmae);
                content.appendChild(itembody);

            });
        }

    } catch (error) {
        console.log("saad");
    }
}

loadeSections();