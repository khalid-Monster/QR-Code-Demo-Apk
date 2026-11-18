import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import { getFirestore,collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

let upp = document.querySelector(".upside");

window.onscroll = function () {
    if(window.scrollY >= 780) {
        upp.style.display = "flex";
    } else {
        upp.style.display = "none";
    }
}

upp.onclick = function () {
    window.scrollTo({
        top:0,
        left:0,
        behavior:"smooth"
    });
    upp.style.display = "none";
}

// الحاوية الرئيسية البتحتوي على الأقسام والوجبات (مثلاً div الفيهو الكلاس lobby أو نحوه)
const mainContainer = document.querySelector(".content") || document.body;

async function loadMenuData() {
    try {
        // 1. جلب كل الأقسام أولاً
        const sectionsSnapshot = await getDocs(collection(db, "sections"));
        
        //mainContainer.innerHTML = ""; // تفريغ الحاوية قبل العرض

        sectionsSnapshot.forEach(async (secDoc) => {
            const secId = secDoc.id;
            const secData = secDoc.data();
            const secName = secData.name;
            const secImage = secData.image || "images/default.jpg"; // صورة افتراضية لو مفيش

            // 2. إنشاء هيكل الـ section بناءً على تصميمك في الـ HTML
            const sectionDiv = document.createElement("div");
            sectionDiv.classList.add("section");

            // إطار الصورة واسم القسم
            const imageFrame = document.createElement("div");
            imageFrame.classList.add("imageframe");

            const imageTitle = document.createElement("div");
            imageTitle.classList.add("imagetitle");
            imageTitle.textContent = secName;

            const imgElement = document.createElement("img");
            imgElement.src = secImage;
            imgElement.alt = secName;

            imageFrame.appendChild(imageTitle);
            imageFrame.appendChild(imgElement);
            sectionDiv.appendChild(imageFrame);

            // إطار المنتجات التابعة للقسم ده
            const itemFrame = document.createElement("div");
            itemFrame.classList.add("itemframe");

            // 3. جلب المنتجات التابعة للقسم الحالي (عن طريق section_id)
            // ملاحظة: يمكنك جلب كل المنتجات مرة واحدة وفلترتها محلياً أو الاستعلام مباشرة
            const itemsSnapshot = await getDocs(collection(db, "items"));
            
            itemsSnapshot.forEach((itemDoc) => {
                const itemData = itemDoc.data();
                
                // تحقق هل المنتج تابع للقسم الحالي ولا لا
                if (itemData.section_id === secId) {
                    const itemName = itemData.name;
                    const itemPrice = itemData.price;

                    // إنشاء عنصر الوجبة بنفس التنسيق تماماً
                    const theItem = document.createElement("div");
                    theItem.classList.add("theitem");

                    theItem.innerHTML = `
                        <div class="price">${itemPrice}</div>
                        <div class="line"></div>
                        <div class="name">${itemName}</div>
                    `;

                    itemFrame.appendChild(theItem);
                }
            });

            // إضافة إطار المنتجات للقسم الرئيسي
            sectionDiv.appendChild(itemFrame);
            
            // إضافة القسم كله للحاوية الكبيرة في الصفحة
            mainContainer.appendChild(sectionDiv);
        });

    } catch (error) {
        console.error("خطأ أثناء جلب القائمة:", error);
    }
}

// استدعاء الدالة عند فتح الصفحة
loadMenuData();
