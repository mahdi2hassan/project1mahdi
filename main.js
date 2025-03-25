const form = document.getElementById('cardForm');
const previewCard = document.getElementById('preview-card');
const selectedImage = document.getElementById('selected-image');
const textContainer = document.getElementById('text-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const userName = document.getElementById('userName').value.trim();
  const selectedDesign = document.querySelector('input[name="card-design"]:checked');
  const textColor = document.querySelector('input[name="text-color"]:checked').value;

  if (!userName || !selectedDesign) {
    showAlert('الرجاء إدخال الاسم واختيار تصميم البطاقة', 'error');
    return;
  }

  showPreview(userName, selectedDesign, textColor);
});

function showPreview(name, design, color) {
  selectedImage.src = design.parentElement.querySelector('img').src;
  textContainer.innerHTML = `
    <p class="tek" id="card-text" style="color: ${color}">
      إلى ${name}<br>
      تقبل الله طاعتكم وكل عام وأنتم بخير و رمـضـان كريم
    </p>
  `;
  previewCard.hidden = false;
  form.hidden = true;
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function resetForm() {
  form.reset();
  previewCard.hidden = true;
  form.hidden = false;
  document.querySelectorAll('input[name="card-design"]').forEach(radio => radio.checked = false);
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function showAlert(message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert-${type}`;
  alertDiv.textContent = message;
  document.body.prepend(alertDiv);
  setTimeout(() => alertDiv.remove(), 3100);
}

function downloadCard() {
  const cloneContainer = document.createElement('div');
  cloneContainer.style.position = 'fixed';
  cloneContainer.style.top = '-9999px';
  
  const clonedCard = document.querySelector('.card-wrapper').cloneNode(true);
  clonedCard.style.width = '600px'; 
  //clonedCard.style.border = '15px solid #d4af37';
  clonedCard.style.borderRadius = '30px';
  //clonedCard.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
  
  const textElement = clonedCard.querySelector('.tek');
//  textElement.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
  textElement.style.padding = '15px';
  //textElement.style.background = 'rgba(0,0,0,0.3)';
  textElement.style.borderRadius = '15px';
  
  cloneContainer.appendChild(clonedCard);
  document.body.appendChild(cloneContainer);

  html2canvas(clonedCard, {
    useCORS: true,
    scale: 3, 
    logging: true,
    backgroundColor: null,
    allowTaint: true,
    onclone: (clonedDoc) => {
      clonedDoc.querySelector('.card-wrapper').style.transform = 'scale(1)';
    }
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'ramadan-card-' + Date.now() + '.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    
    
    document.body.removeChild(cloneContainer);
  });
}
