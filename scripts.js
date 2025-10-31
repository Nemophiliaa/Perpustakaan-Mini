// Get Button Id 

const buttonSubmit = document.getElementById('buttonSubmit');

// Get bookContainer

const bookContainer = document.getElementById('bookStorage'); 

// Create count Variable And Get bookCounter

let count = 0 ; 
const bookCounter = document.getElementById('bookCounter');
bookCounter.innerText = `${count} Buku `; 

// Create Varible to track edit Mode 
let editingCard = null;

// Check If Empty Massage Exist Function (Belum Dipakai) 

const checkEmptyMassage = () => {
  const emptyMessage = document.querySelector('.empty-massage');
  if (bookContainer.children.length === 0) {
    // if Card Doesnt Exist 
    if (!emptyMessage) {
      const p = document.createElement('p');
      p.className = `empty-massage font-medium text-slate-500 text-center xl:absolute xl:left-1/2 xl:top-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2`;
      p.innerText = `Belum ada buku. Tambahkan buku pertama Anda!`;
      bookContainer.appendChild(p);
    }
  } else {
    // If Card Exist 
    emptyMessage?.remove();
  }
};

// Run Empty Massage (Default)

checkEmptyMassage(); 

// Render Button Function 

const renderButton = () => {

    // Get Button Wrapper

    const buttonWrapper = document.getElementById('buttonWrapper'); 

    // Check if close button already exists
    
    const existingCloseButton = buttonWrapper.querySelector('.close-button');
    if (existingCloseButton) {
        return; // Don't create another button if one exists
    }

    const button = document.createElement('button');
    button.type = 'button'; 
    button.className  = `close-button cursor-pointer border-none outline-none bg-red-500 font-medium text-slate-100 py-2 px-5 rounded-lg  hover:bg-red-900 duration-300 transition-all shadow-inner`; 
    button.textContent = `Tutup Perubahan` 

    buttonWrapper.appendChild(button); 


    // == Close Button Function == // 
    
    // Get class button
    button.addEventListener('click', (e)=> {
        e.preventDefault(); 

        button.remove(); 
        buttonSubmit.innerText = `Tambah Buku`; 
        editingCard = null;
        document.querySelector('form').reset();  
    });

}

// Create function renderCard 

const renderCard = () => {
    // Get All Input Id Value 

    const fJudul = document.getElementById('judul').value.trim(); 
    const fpenulis = document.getElementById('penulis').value.trim(); 
    const fTahun = document.getElementById('tahun').value.trim(); 
    const fketagori = document.getElementById('kategori').value.trim();  

    const cardContainer = document.createElement('div'); 
    cardContainer.className = 
    `shadow-md grid gap-5  bg-slate-100 rounded-2xl group px-8 py-5 border border-transparent hover:-translate-y-3 hover:shadow-sm outline-none hover:border-blue-500 transition-all duration-300 md:grid-cols-2  xl:grid-cols-1 `;

    cardContainer.innerHTML = 
    `
    <header>
        <h1 class="font-semibold text-2xl mb-3 group-hover:text-blue-500 duration-200 transition-all"> ${fJudul}</h1>
        <div class="flex gap-2 mb-1.5 items-center  text-left justify-start">
            <p class="font-medium text-[1.05rem] text-slate-500"> Penerbit : </p>
            <p class="text-base font-light text-slate-500">${fpenulis}</p>
        </div> 
        <div class="flex gap-2 mb-1.5 items-center  text-left justify-start">
            <p class="font-medium text-[1.05rem] text-slate-500"> Tahun : </p>
            <p class="text-base font-light text-slate-500">${fTahun}</p>
        </div> 
        <div class="flex gap-2 mb-1.5 items-center text-left justify-start">
            <p class="font-medium text-[1.05rem] text-slate-500"> Kategori : </p>
            <p class="px-5 py-2 border font-medium text-sm border-rose-500 rounded-full  bg-rose-500/20 text-rose-950">${fketagori}</p>
        </div> 
    </header>
    <aside class="flex items-center gap-3 md:gap-1.5  md:grid md:justify-end xl:grid-cols-2"> 
        <button type="button" class="edit-button cursor-pointer flex justify-center items-center text-center w-full  px-5 py-2 rounded-lg  font-medium text-slate-50 bg-blue-500 hover:bg-blue-700 transition-all duration-150 ">
            Edit
        </button> 
        <button type="button" class="delete-button cursor-pointer flex justify-center items-center text-center  w-full px-5 py-2 rounded-lg font-medium text-slate-50 bg-red-500 hover:bg-red-700   transition-all duration-150">
            Hapus
        </button> 
    </aside>
    `;
    
    bookContainer.appendChild(cardContainer); 
    // Check After Add Card
    checkEmptyMassage();


    // === Edit Button ===

    const editButton = cardContainer.querySelector('.edit-button');
    editButton.addEventListener('click', () => {

    // Get Data From Card

    const judul = cardContainer.querySelector('h1').innerText;
    const penulis = cardContainer.querySelectorAll('p')[1].innerText;
    const tahun = cardContainer.querySelectorAll('p')[3].innerText;
    const kategori = cardContainer.querySelectorAll('p')[5].innerText;

    // Fill To form

    document.getElementById('judul').value = judul;
    document.getElementById('penulis').value = penulis;
    document.getElementById('tahun').value = tahun;
    document.getElementById('kategori').value = kategori;

    // Add Close Button
    renderButton(); 

    // Change Button Submit 
    buttonSubmit.innerText = "Simpan Perubahan";
    editingCard = cardContainer;
    
  });

    //  == Button Delete == // 

    // Get Delete Button

    const deleteButton = cardContainer.querySelector('.delete-button');
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        cardContainer.remove(); 
        count--; 
        bookCounter.innerText = `${count} Buku`; 
        checkEmptyMassage(); // Check Card Exist Or not 
    });

}

// Custom Validation Input

const AllInput = document.querySelectorAll('form input');
AllInput.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.target.setCustomValidity("Mohon Untuk Anda Mengisinya!");
    });
    
    input.addEventListener('input', (e) => {
        e.target.setCustomValidity("");
    });
});

// Submit Button 

buttonSubmit.addEventListener('click', (e)=> {
    e.preventDefault();
    const fJudul = document.getElementById('judul').value.trim(); 
    const fpenulis = document.getElementById('penulis').value.trim(); 
    const fTahun = document.getElementById('tahun').value.trim(); 
    const fketagori = document.getElementById('kategori').value.trim();

    // Check if any field is empty
    if(!fJudul || !fpenulis || !fTahun || !fketagori) {
        alert("Semua field harus diisi!");
        return;
    }

    if (editingCard) {
        editingCard.querySelector('h1').innerText = fJudul;
        editingCard.querySelectorAll('p')[1].innerText = fpenulis;
        editingCard.querySelectorAll('p')[3].innerText = fTahun;
        editingCard.querySelectorAll('p')[5].innerText = fketagori;

        buttonSubmit.innerText = "Tambah Buku"; // Balikin tombol
        editingCard = null;
        document.querySelector('form').reset();
        return;
  }

    // Create Card
    renderCard(); 
    count++; 
    bookCounter.innerText = `${count} Buku`; 

    // Clear form after successful submission
    document.querySelector('form').reset();
});