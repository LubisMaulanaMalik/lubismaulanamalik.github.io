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

let typed1;

function sliderNextCard(){
  const wadah = document.querySelector('.cards').offsetWidth;
  const elements = document.querySelectorAll('.card');
  let st = false;
  let idx = 0;

  const nextSlide = (n, idx) => {
    for (let i = 0; i < n; i++){
      idx++;
      if (idx >= elements.length){
        idx -= elements.length;
        elements[idx].style.display = "flex";
        elements[idx].style.order = i;
      }else{
        elements[idx].style.display = "flex";
        elements[idx].style.order = i;
      }
    }
  }

  const findStart = () => {
    for (let i = 0; i < elements.length; i++){
      if (cekDisplay(i)){
        return i;
      }
    }
  }

  const kondisiKedua = (index, n) =>{
    for (let i = index; i < elements.length; i++){
      console.log(i);
      if (cekDisplay(i)){
        elements[i].style.display = "none";
        nextSlide(n, i);
        return;
      }
    }
  }

  const cekDisplay = (index) => {
    return (elements[index].style.display == "" || elements[index].style.display == "flex");
  }

  //untuk kondisi 1 card
  if(wadah < 480){
    idx = findStart();
    elements[idx].style.display = "none";
    nextSlide(1, idx);
  } 
  
  //untuk kondisi 2 card
  else if (wadah < 720){
    idx = findStart();
    if (cekDisplay(idx + 1)){
      elements[idx].style.display = "none";
      nextSlide(2, idx);
    }else{
      kondisiKedua(idx+1, 2);
    }
  } 
  
  //untuk kondisi 3 card
  else if(wadah < 960){
    idx = findStart();
    if (cekDisplay(idx + 1) && cekDisplay(idx+2)){
      elements[idx].style.display = "none";
      nextSlide(3, idx);
    }else{
      kondisiKedua(idx+2, 3);
    }
  }

  //untuk kondisi 4 card
  else{
    idx = findStart();
    if (cekDisplay(idx + 1) && cekDisplay(idx+2) && cekDisplay(idx+3)){
      elements[idx].style.display = "none";
      nextSlide(4, idx);
    }else{
      if (!(cekDisplay(idx+1))){
        kondisiKedua(idx+1, 4);
      } else if(!(cekDisplay(idx+2))){
        kondisiKedua(idx+2, 4);
      } else if(!(cekDisplay(idx+3))){
        kondisiKedua(idx+3, 4);
      }
    }
  }
}

function loadHal(){
    const wadah = document.querySelector('.cards').offsetWidth;
    const elements = document.querySelectorAll('.card');
    
    const offSign = () =>{
        document.querySelector('.sign-right').style.display = "none";
        document.querySelector('.sign-left').style.display = "none";
    }

    const offEl = (idx) => {
        for(let i = 0; i < idx; i++){
            elements[i].style.display = "flex";
        }
        for(let i = idx; i<elements.length; i++){
            elements[i].style.display = "none";
        }
    }

    if (wadah < 480){
        if(elements.length <= 1){
            offSign();
        } else{
            offEl(1);
        }
    } else if(wadah < 720){
        if(elements.length <= 2){
            offSign();
        } else{
            offEl(2);
        }
    } else if(wadah < 960){
        if(elements.length <= 3){
            offSign();
        } else{
            offEl(3);
        }
    } else{
        if(elements.length <= 4){
            offSign();
        } else{
            offEl(4);
        }
    }
}

window.addEventListener('resize',loadHal);

function sliderPrevCard(){
  const wadah = document.querySelector('.cards').offsetWidth;
  const elements = document.querySelectorAll('.card');
  let st = false;
  let idx = 0;

  const nextSlide = (n, idx) => {
    for (let i = n; i > 0; i--){
      idx--;
      if (idx < 0){
        idx += elements.length;
        elements[idx].style.display = "flex";
        elements[idx].style.order = i;
      }else{
        elements[idx].style.display = "flex";
        elements[idx].style.order = i;
      }
    }
  }

  const findStart = () => {
    for (let i = elements.length-1; i >= 0; i--){
      if (cekDisplay(i)){
        return i;
      }
    }
  }

  const kondisiKedua = (index, n) =>{
    for (let i = index; i >= 0; i--){
      console.log(i);
      if (cekDisplay(i)){
        elements[i].style.display = "none";
        nextSlide(n, i);
        return;
      }
    }
  }

  const cekDisplay = (index) => {
    return (elements[index].style.display == "" || elements[index].style.display == "flex");
  }

  //untuk kondisi 1 card
  if(wadah < 480){
    idx = findStart();
    elements[idx].style.display = "none";
    nextSlide(1, idx);
  } 
  
  //untuk kondisi 2 card
  else if (wadah < 720){
    idx = findStart();
    if (cekDisplay(idx - 1)){
      elements[idx].style.display = "none";
      nextSlide(2, idx);
    }else{
      kondisiKedua(idx-1, 2);
    }
  } 
  
  //untuk kondisi 3 card
  else if(wadah < 960){
    idx = findStart();
    if (cekDisplay(idx - 1) && cekDisplay(idx-2)){
      elements[idx].style.display = "none";
      nextSlide(3, idx);
    }else{
      kondisiKedua(idx-2, 3);
    }
  }

  //untuk kondisi 4 card
  else{
    idx = findStart();
    if (cekDisplay(idx - 1) && cekDisplay(idx-2) && cekDisplay(idx-3)){
      elements[idx].style.display = "none";
      nextSlide(4, idx);
    }else{
      if (!(cekDisplay(idx-1))){
        kondisiKedua(idx-1, 4);
      } else if(!(cekDisplay(idx-2))){
        kondisiKedua(idx-2, 4);
      } else if(!(cekDisplay(idx-3))){
        kondisiKedua(idx-3, 4);
      }
    }
  }
}

function showMore(number){
  const bg = document.querySelector('.bg');
  const img = document.querySelector('.top-card-hobby');
  let typed;

  if (number == 1){
    if (typed1) {
      typed1.destroy();
    }
    bg.style.display = "flex";
    document.querySelector('.title-bg').innerText = "Dia";
    document.querySelector('.author-bg').innerText = "Oleh : Lubis";
    img.style.backgroundImage ='url(../assets/image/bg-hobby1.jpg)';
    typed1 = new Typed(".content", {
      strings: ["Karya terbaik tuhan tampak begitu </br>cantik dengan senyumnya </br>Tingkah unik dengan hal misterius </br>menjadi daya tariknya </br>Tak hanya makhluk hidup,</br>semesta juga kagum oleh parasnya</br>Tak ada kata yang mampu </br>menggantikan keindahannya</br>Dan angka pun tak sanggup </br>menampung semua nilainya</br>Bahkan bidadari sedikit cemburu </br>dibuat oleh kehadirannya"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      cursorChar: ""
    })
  } else if(number == 2){
    if (typed1) {
      typed1.destroy();
    }
    bg.style.display = "flex";
    document.querySelector('.title-bg').innerText = "Ntah Apa";
    document.querySelector('.author-bg').innerText = "Oleh : Lubis";
    img.style.backgroundImage ='url(../assets/image/bg-hobby2.jpg)';
    typed1 = new Typed(".content", {
      strings: ["Kata-kata yang tak bermakna keluar</br>seakan disengaja</br>Menarik perhatian, hingga dikira</br>sangat merusak suasana</br>Mencoba obrolan lain agar</br>terhindar dari cibiran sekitarnya</br>Namun mata yang sinis sudah</br>tertuju hanya pada dirinya</br>Menunduk tuk merasa lebih baik,</br>tapi tidak seperti nyatanya</br>Bukan cibiran, tapi suasana yang</br>memojokkan kehadirannya"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      cursorChar: ""
    })
  }else if(number == 3){
    if (typed1) {
      typed1.destroy();
    }
    bg.style.display = "flex";
    document.querySelector('.title-bg').innerText = "Anak Mama";
    document.querySelector('.author-bg').innerText = "Oleh : Lubis";
    img.style.backgroundImage ='url(../assets/image/bg-hobby3.jpg)';
    typed1 = new Typed(".content", {
      strings: ["Pribadi yang tidak menjadi</br>keinginan dan bahagiamu</br>Masih kau anggap anak untukmu di</br>setiap harimu</br>Doa indahmu hadir sebagai sosok</br>pelindung untukku</br>Berpuluhan tahun sudah menemani</br>hari-hariku</br>", 
      "Betapa bodoh diriku yang tak</br>bahagia dengan keinginanmu</br>Meski aku tau bahagia untukku</br>dalam harapanmu</br>Maafkan aku yang tak mampu jadi</br>doa dan harapanmu</br>Walau sudah kau percayakan</br>bahagia tuk masa depanku"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      cursorChar: ""
    })
  }else if(number == 4){
    if (typed1) {
      typed1.destroy();
    }
    bg.style.display = "flex";
    document.querySelector('.title-bg').innerText = "Batas Kagum";
    document.querySelector('.author-bg').innerText = "Oleh : Lubis";
    img.style.backgroundImage ='url(../assets/image/bg-hobby4.jpg)';
    typed1 = new Typed(".content", {
      strings: ["Begitu rapuhnya diriku, namun</br>beginilah adanya aku</br>Sekadar mengarungi mimpi tentang</br>paras menawanmu</br>Begitulah caraku bahagia, meski</br>terlihat sangat sederhana</br>Senyummu yang memancar, dipanah</br>aku oleh pesonamu",
      "Meski panah yang masih tertancap</br>amat dalam di dadaku</br>Secara paksa dilepaskan oleh takdir</br>yang telah kau pilih</br>Namun aku tetap diriku, meski</br>tak seperti yang lalu</br>Hingga air matamu saja masih</br>mampu melukai hati ini"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      cursorChar: ""
    })
  }else if(number == 5){
    if (typed1) {
      typed1.destroy();
    }
    bg.style.display = "flex";
    document.querySelector('.title-bg').innerText = "Semangat Tak Kenal Berhenti";
    document.querySelector('.author-bg').innerText = "Oleh : Lubis";
    img.style.backgroundImage ='url(../assets/image/bg-hobby5.jpg)';
    typed1 = new Typed(".content", {
      strings: ["Semangat berteriak datang dan</br>menghampiri jiwa</br>Sembari bertanya, \"mengapa kita</br>harus menyerah?\"</br>Hingga semua fokus telah tertuju</br>hanya padanya",
      "Usaha yang masih lelah sontak</br>terbangun dari tidurnya</br>Hati yang bimbang hanya berikan</br>senyuman untuknya</br>Bahkan masa lalu berbalik arah,</br>hingga terdiam sejenak",
      "Tak sadar akan perbuatannya,</br>ia berbisik pada jiwa yang letih</br>Sehingga jiwa tertawa geli dengan</br>luka yang masih menggigit</br>Menjawab dengan pelan, \"sudah</br>pernah dan gagal berkali-kali\""],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      cursorChar: ""
    })
  }else if(number == 6){
    if (typed1) {
      typed1.destroy();
    }
    bg.style.display = "flex";
    document.querySelector('.title-bg').innerText = "Diantara Gemerlap";
    document.querySelector('.author-bg').innerText = "Oleh : Lubis";
    img.style.backgroundImage ='url(../assets/image/bg-hobby6.jpg)';
    typed1 = new Typed(".content", {
      strings: ["Aku bujangga, seorang petualang</br>di dunia yang menderang</br>Melangkah dalam terang jalan</br>yang tak sejalan</br>Mengendus langkah untuk meraba</br>jalanku</br>Menjelma seperti robot,</br>beradaptasi pada kata kata yang</br>tak bersahabat",
      "Perlahan menjalar mengikat jiwa</br>tanpa kebebasan</br>Setetes demi setetes air jatuh dari</br>perjuangan tanpa henti</br>Hingga lelah mematahkan raga yang</br>ku inginkan</br>Menggantikan mimpi dengan cahaya</br>yang tak sepadan"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      cursorChar: ""
    })
  }else if(number == 7){
    if (typed1) {
      typed1.destroy();
    }
    bg.style.display = "flex";
    document.querySelector('.title-bg').innerText = "Menanti Nasib di Ruang Itu";
    document.querySelector('.author-bg').innerText = "Oleh : Lubis";
    img.style.backgroundImage ='url(../assets/image/bg-hobby7.jpg)';
    typed1 = new Typed(".content", {
      strings: ["Mereka yang ada maupun tiada,</br>terhembus oleh harapan</br>Air mata yang begitu jernih</br>mengalir dari ketulusan</br>Jiwa yang tak tenang menunggu</br>angin tuk meyakinkan</br>Seakan tak percaya, semua</br>terdiam mendengar ketukan",
      "Naik dan turun sudah terbiasa</br>terlihat jelas oleh mata</br>Kadang kata syukur terdengar</br>keras diiringi air mata</br>Tak jarang telinga mendengar</br>\"beragam tanda tanya\"</br>Tak jarang juga air mata</br>mengalir ditemani oleh duka</br></br>Hingga penyesalan, harapan bahkan</br>kenangan dibalut rapi oleh kepergian"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      cursorChar: ""
    })
  }else if(number == 8){
    if (typed1) {
      typed1.destroy();
    }
    bg.style.display = "flex";
    document.querySelector('.title-bg').innerText = "Ruang Gelap";
    document.querySelector('.author-bg').innerText = "Oleh : Lubis";
    img.style.backgroundImage ='url(../assets/image/bg-hobby8.jpg)';
    typed1 = new Typed(".content", {
      strings: ["Tak tau sudah berapa lama ku</br>terjabak disini</br>Sesak dan takut, ku mencoba</br>tuk menguasai diri</br>Hingga kegelapan telah membutakan</br>pandangan ini</br>Bahkan keliru menghalangi jalanku</br>tuk menuju mimpi</br>",
      "Terdiam dalam jangka waktu/br>yang tak terduga<</br>Mungkin hanya satu hal yang</br>terpikiran saat ini</br>Berdiam dan menanti datangnya</br>secercah cahaya"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      cursorChar: ""
    })
  }else if(number == 9){
    if (typed1) {
      typed1.destroy();
    }
    bg.style.display = "flex";
    document.querySelector('.title-bg').innerText = "Kata";
    document.querySelector('.author-bg').innerText = "Oleh : Lubis";
    img.style.backgroundImage ='url(../assets/image/bg-hobby9.jpg)';
    typed1 = new Typed(".content", {
      strings: ["Perasaan yang tak slalu terikat</br>olehnya</br>Berikan makna begitu dalam</br>karenanya</br>Satu ataupun lebih darinya</br></br>Sangat beragam rasa dibuat</br>olehnya</br>Bahkan bahagia aku mendengarnya</br>Hingga terluka karnanya"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      cursorChar: ""
    })
  }
}