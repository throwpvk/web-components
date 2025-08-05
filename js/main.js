import "../components/modal/app-modal.js";
import "../components/tender/app-tender.js";

const openModalBtn = document.querySelector("#open-modal-btn");
const openModalBtn2 = document.querySelector("#open-modal-btn-2");
const appModal = document.querySelector(".app-modal");
const appModal2 = document.querySelector(".app-modal2");

// Mở modal
openModalBtn.addEventListener("click", () => {
  appModal.open();
});
openModalBtn2.addEventListener("click", () => {
  appModal2.open();
});
