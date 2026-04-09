import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMRylaUJ3dI7KeA7vKN0FWPADnElPgIbY",
  authDomain: "paul-garage.firebaseapp.com",
  projectId: "paul-garage"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let editId = null;

/* 🔐 登入檢查（修正鬼打牆） */
onAuthStateChanged(auth,(user)=>{
  if(!user){
    window.location.href="login.html";
  }
});

/* 🚪 登出 */
window.logout = async function(){
  await signOut(auth);
  window.location.href="login.html";
};

/* 🚗 上架（🔥修正版） */
window.addCar = async function(){

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const img = document.getElementById("img").value;
  const desc = document.getElementById("desc").value;

  if(!name || !price){
    alert("請填寫車名與價格");
    return;
  }

  await addDoc(collection(db,"cars"),{
    name,
    price,
    img,
    desc,
    active:true,
    time:Date.now()
  });

  // ✅ 清空 input（重點）
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("img").value = "";
  document.getElementById("desc").value = "";

  alert("上架成功");
};

/* 📦 即時列表（🔥加排序） */
const list = document.getElementById("list");

const q = query(collection(db,"cars"),orderBy("time","desc"));

onSnapshot(q,(snap)=>{

  list.innerHTML="";

  snap.forEach(d=>{
    const c = d.data();

    list.innerHTML += `
      <div class="car">
        <img src="${c.img || ''}">
        <b>${c.name}</b><br>
        ${c.price}<br>
        ${c.desc || ""}<br>

        <button onclick="openEdit('${d.id}','${c.name}','${c.price}','${c.img}','${c.desc || ""}')">
          修改
        </button>

        <button onclick="toggle('${d.id}',${c.active})">
          ${c.active ? "下架" : "上架"}
        </button>

        <button onclick="del('${d.id}')">刪除</button>
      </div>
    `;
  });
});

/* 🔁 上下架 */
window.toggle = async function(id,state){
  await updateDoc(doc(db,"cars",id),{
    active:!state
  });
};

/* 🗑 刪除 */
window.del = async function(id){
  if(confirm("確定刪除？")){
    await deleteDoc(doc(db,"cars",id));
  }
};

/* ✏️ 修改 */
window.openEdit = function(id,name,price,img,desc){

  editId = id;

  document.getElementById("editBox").style.display="block";

  eName.value = name;
  ePrice.value = price;
  eImg.value = img;
  eDesc.value = desc;
};

window.closeEdit = function(){
  document.getElementById("editBox").style.display="none";
};

window.saveEdit = async function(){

  await updateDoc(doc(db,"cars",editId),{
    name:eName.value,
    price:ePrice.value,
    img:eImg.value,
    desc:eDesc.value
  });

  alert("修改成功");
  closeEdit();
};
