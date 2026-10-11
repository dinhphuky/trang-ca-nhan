const KHOA = "dsViec";
let dsViec = JSON.parse(localStorage.getItem(KHOA) || "[]");
const form = document.getElementById("form-todo");
const oNhap = document.getElementById("o-nhap");
const ul = document.getElementById("ds-viec");
const thongke = document.getElementById("thong-ke");

function luu() {
  localStorage.setItem(KHOA, JSON.stringify(dsViec));
}

function hienThi() {
  ul.innerHTML = "";
  dsViec.forEach((viec, i) => {
    const li = document.createElement("li");
    if (viec.xong) li.classList.add("xong");
    const span = document.createElement("span");
    span.textContent = viec.noiDung;
    span.addEventListener("click", () => {
      viec.xong = !viec.xong;
      luu();
      hienThi();
    });
    const nutXoa = document.createElement("button");
    nutXoa.textContent = "Xóa";
    nutXoa.addEventListener("click", () => {
      dsViec.splice(i, 1);
      luu();
      hienThi();
    });
    li.append(span, nutXoa);
    ul.appendChild(li);
  });
  const daXong = dsViec.filter(v => v.xong).length;
  thongke.textContent = `Hoàn thành ${daXong}/${dsViec.length} việc`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const noiDung = oNhap.value.trim();
  if (noiDung === "") return;
  dsViec.push({ noiDung, xong: false });
  oNhap.value = "";
  luu();
  hienThi();
});

hienThi();