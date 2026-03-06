// Suggestions Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Themes Suggestion Form
    const themesForm = document.getElementById('themesSuggestForm');
    if (themesForm) {
        themesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(themesForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                if (data[key]) {
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            }
            submitForm('https://formspree.io/f/meerqeqk', data, 'Thank you for your theme suggestion!');
            themesForm.reset();
            // Reset char count
            document.getElementById('themesCharCount').textContent = '0';
        });
    }

    // Books Suggestion Form
    const booksForm = document.getElementById('booksSuggestForm');
    if (booksForm) {
        booksForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(booksForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                if (data[key]) {
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            }
            submitForm('https://formspree.io/f/mreygegd', data, 'Thank you for your book recommendation!');
            booksForm.reset();
            // Reset char count
            document.getElementById('booksCharCount').textContent = '0';
        });
    }

    // Character count for themes
    const themesComment = document.getElementById('themesComment');
    const themesCharCount = document.getElementById('themesCharCount');
    if (themesComment && themesCharCount) {
        themesComment.addEventListener('input', function() {
            themesCharCount.textContent = this.value.length;
        });
    }

    // Character count for books
    const booksComment = document.getElementById('booksComment');
    const booksCharCount = document.getElementById('booksCharCount');
    if (booksComment && booksCharCount) {
        booksComment.addEventListener('input', function() {
            booksCharCount.textContent = this.value.length;
        });
    }

    function submitForm(url, data, message) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert(message);
            } else {
                alert('There was an error submitting your suggestion. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your suggestion. Please try again.');
        });
    }
});