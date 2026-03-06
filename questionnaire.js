// Questionnaire Form Handling

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('entranceForm');
    const successMessage = document.getElementById('successMessage');
    
    // Update book slider value display
    const booksSlider = document.getElementById('booksPerYear');
    const booksValue = document.getElementById('booksValue');
    
    if (booksSlider) {
        booksSlider.addEventListener('input', function() {
            booksValue.textContent = this.value;
        });
    }

    // Update expectations character count
    const expectationsField = document.getElementById('expectations');
    const expectationsCount = document.getElementById('expectationsCount');
    
    if (expectationsField) {
        expectationsField.addEventListener('input', function() {
            expectationsCount.textContent = this.value.length;
            updateCharCountStyle(expectationsCount, this.value.length, 300);
        });
    }

    // Update about character count
    const aboutField = document.getElementById('about');
    const aboutCount = document.getElementById('aboutCount');
    
    if (aboutField) {
        aboutField.addEventListener('input', function() {
            aboutCount.textContent = this.value.length;
            updateCharCountStyle(aboutCount, this.value.length, 1000);
        });
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        
        // Clear previous errors
        clearErrorMessages();
        
        // Validate form
        if (validateForm()) {
            // Collect form data
            const formData = collectFormData();
            
            // Log form data (in a real scenario, you'd send this to a server)
            console.log('Form submitted with data:', formData);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            booksValue.textContent = '0';
            expectationsCount.textContent = '0';
            aboutCount.textContent = '0';
            
            // Optionally, redirect after a delay
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 3000);
        }
    });

    function validateForm() {
        let isValid = true;

        // Validate name
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            showError('name', 'Please enter your name');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }

        // Validate gender
        const genderChecked = document.querySelector('input[name="gender"]:checked');
        if (!genderChecked) {
            showError('gender', 'Please select your gender');
            isValid = false;
        }

        // Validate source (how they heard about us)
        const sourceInput = document.getElementById('source');
        if (!sourceInput.value) {
            showError('source', 'Please select how you heard about us');
            isValid = false;
        }

        // Validate city
        const cityInput = document.getElementById('city');
        if (!cityInput.value.trim()) {
            showError('city', 'Please enter your city');
            isValid = false;
        } else if (cityInput.value.trim().length < 2) {
            showError('city', 'City must be at least 2 characters');
            isValid = false;
        }

        // Validate books per year (slider should have a value)
        const booksInput = document.getElementById('booksPerYear');
        if (!booksInput.value) {
            showError('books', 'Please select how many books you read per year');
            isValid = false;
        }

        // Validate languages (at least one selected)
        const languagesChecked = document.querySelectorAll('input[name="languages"]:checked');
        if (languagesChecked.length === 0) {
            showError('languages', 'Please select at least one language');
            isValid = false;
        }

        // Validate expectations
        const expectationsInput = document.getElementById('expectations');
        if (!expectationsInput.value.trim()) {
            showError('expectations', 'Please tell us your expectations');
            isValid = false;
        } else if (expectationsInput.value.trim().length < 10) {
            showError('expectations', 'Please provide at least 10 characters');
            isValid = false;
        }

        // Validate about yourself
        const aboutInput = document.getElementById('about');
        if (!aboutInput.value.trim()) {
            showError('about', 'Please tell us about yourself');
            isValid = false;
        } else if (aboutInput.value.trim().length < 10) {
            showError('about', 'Please provide at least 10 characters');
            isValid = false;
        }

        return isValid;
    }

    function collectFormData() {
        const pronounsChecked = Array.from(document.querySelectorAll('input[name="pronouns"]:checked')).map(el => el.value);
        const languagesChecked = Array.from(document.querySelectorAll('input[name="languages"]:checked')).map(el => el.value);

        return {
            name: document.getElementById('name').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            preferredPronouns: pronounsChecked.length > 0 ? pronounsChecked : 'Not specified',
            howHeardAbout: document.getElementById('source').value,
            city: document.getElementById('city').value,
            booksPerYear: document.getElementById('booksPerYear').value,
            readingLanguages: languagesChecked,
            expectations: document.getElementById('expectations').value,
            about: document.getElementById('about').value,
            submittedAt: new Date().toLocaleString()
        };
    }

    function showError(fieldName, message) {
        const errorElement = document.getElementById(fieldName + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
            
            // Add error class to form group
            const formGroup = errorElement.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('error');
            }
        }
    }

    function clearErrorMessages() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => {
            el.classList.remove('show');
            el.textContent = '';
        });

        const formGroups = document.querySelectorAll('.form-group.error');
        formGroups.forEach(el => {
            el.classList.remove('error');
        });
    }

    function showSuccessMessage() {
        // Hide form element only (so message can be displayed separately)
        form.style.display = 'none';
        
        // Show success message which is now outside the form
        successMessage.style.display = 'block';
    }

    function updateCharCountStyle(element, currentLength, maxLength) {
        const parent = element.parentElement;
        parent.classList.remove('warning', 'error');
        
        if (currentLength > maxLength * 0.8) {
            parent.classList.add('warning');
        }
        if (currentLength > maxLength) {
            parent.classList.add('error');
        }
    }
});

