import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBYFe8s2OZ2BVVuftaMDdJQxYWx0k9Cftw",
  authDomain: "my-portfolio-7c5aa.firebaseapp.com",
  projectId: "my-portfolio-7c5aa",
  storageBucket: "my-portfolio-7c5aa.firebasestorage.app",
  messagingSenderId: "898694127714",
  appId: "1:898694127714:web:324cd820a3f3bfa146b13b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const addbtn = document.getElementById("addproject");
const projectcontainer = document.getElementById("projectContainer");


window.onload = function () {
  loadProjects();
};

// ================= ADD PROJECT =================
addbtn.addEventListener("click", async function () {
  let projectname = prompt("Enter Project Name");
  let imageurl = prompt("Paste Image URL");
  let projectlink = prompt("Paste Project Link");

  if (!projectname) return;

  await addDoc(collection(db, "projects"), {
    name: projectname,
    image: imageurl,
    link: projectlink
  });

  loadProjects();
});

// ================= LOAD PROJECTS =================
async function loadProjects() {
  projectcontainer.innerHTML = "";

  const snapshot = await getDocs(collection(db, "projects"));
  snapshot.forEach((docSnap) => {
    addProjectToDOM({
      id: docSnap.id,
      ...docSnap.data()
    });
  });
}

// ================= ADD PROJECT TO DOM =================
function addProjectToDOM(project) {
  let box = document.createElement("div");

  box.style.border = "1px solid black";
  box.style.margin = "10px";
  box.style.padding = "10px";
  box.style.boxShadow = "-1px -10px 25px rgba(76, 158, 209, 1)";

  box.innerHTML = `
    <img src="${project.image}" width="200"><br>
    <h3>${project.name}</h3>

    <a href="${project.link}" target="_blank">
      <button>View Project</button>
    </a>

    <button class="delete-btn">Delete</button>
  `;

  // DELETE BUTTON
  box.querySelector(".delete-btn").addEventListener("click", async () => {
    await deleteDoc(doc(db, "projects", project.id));
    box.remove();
  });

  projectcontainer.appendChild(box);
