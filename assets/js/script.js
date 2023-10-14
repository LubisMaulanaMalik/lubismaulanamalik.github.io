// Animasi navbar
const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul')

menuToggle.addEventListener('click', function(){
    nav.classList.toggle('slide'); 
});

// Animasi ketik di navbar
var typed = new Typed(".text-welcome", {
  strings: ["Selamat Datang", "Di Web Pribadi", "Lubis Maulana"],
  typeSpeed: 200,
  backSpeed: 200,
  loop:  true
})


// Animasi ketik di home
var typed = new Typed(".typing", {
  strings: ["mahasiswa semester 7", "manusia biasa", "pengejar cita-cita"],
  typeSpeed: 200,
  backSpeed: 200,
  loop:  true
})