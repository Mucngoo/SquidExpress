const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const cancelButton = document.querySelectorAll('.cancelBtn')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

cancelButton.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
  document.body.classList.add('modal-open');
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
  document.body.classList.remove('modal-open');
}

window.addEventListener('DOMContentLoaded', (event) => {
 		
  let checkbox = document.querySelector(".switch input[type='checkbox']")
  
  let body = document.querySelector("body")

  checkbox.addEventListener('change', (event) => {       
    event.target.checked ? body.setAttribute('data-theme', "dark") : body.removeAttribute("data-theme")
  });

});

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
	const dropZoneElement = inputElement.closest(".drop-zone");

	dropZoneElement.addEventListener("click", (e) => {
		inputElement.click();
	});

	inputElement.addEventListener("change", (e) => {
		if (inputElement.files.length) {
			updateThumbnail(dropZoneElement, inputElement.files[0]);
		}
	});

	dropZoneElement.addEventListener("dragover", (e) => {
		e.preventDefault();
		dropZoneElement.classList.add("drop-zone--over");
	});

	["dragleave", "dragend"].forEach((type) => {
		dropZoneElement.addEventListener(type, (e) => {
			dropZoneElement.classList.remove("drop-zone--over");
		});
	});

	dropZoneElement.addEventListener("drop", (e) => {
		e.preventDefault();

		if (e.dataTransfer.files.length) {
			inputElement.files = e.dataTransfer.files;
			updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
		}

		dropZoneElement.classList.remove("drop-zone--over");
	});
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
	let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

	// First time - remove the prompt
	if (dropZoneElement.querySelector(".drop-zone__prompt")) {
		dropZoneElement.querySelector(".drop-zone__prompt").remove();
	}

	// First time - there is no thumbnail element, so lets create it
	if (!thumbnailElement) {
		thumbnailElement = document.createElement("div");
		thumbnailElement.classList.add("drop-zone__thumb");
		dropZoneElement.appendChild(thumbnailElement);
	}

	thumbnailElement.dataset.label = file.name;

	// Show thumbnail for image files
	if (file.type.startsWith("image/")) {
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = () => {
			thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
		};
	} else {
		thumbnailElement.style.backgroundImage = null;
	}
}

document.addEventListener('DOMContentLoaded', function() {
  const eyeIcon = document.querySelector('.fa-eye-slash');
  const passwordInput = document.getElementById('oldPassword');

  eyeIcon.addEventListener('click', function() {
      if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          eyeIcon.classList.remove('fa-eye-slash');
          eyeIcon.classList.add('fa-eye');
      } else {
          passwordInput.type = 'password';
          eyeIcon.classList.remove('fa-eye');
          eyeIcon.classList.add('fa-eye-slash');
      }
  });
});