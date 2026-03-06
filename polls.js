// Polls Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Meeting Poll Form (multiple selections)
    const meetingPollForm = document.getElementById('meetingPollForm');
    if (meetingPollForm) {
        meetingPollForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const selected = document.querySelectorAll('input[name="meeting"]:checked');
            if (selected.length > 0) {
                const selections = Array.from(selected).map(el => el.value);
                const data = { meeting: selections };
                submitForm('https://formspree.io/f/maqpyeel', data, 'Thank you for voting! You selected ' + selections.length + ' time(s):\n\n' + selections.join('\n'));
                meetingPollForm.reset();
            } else {
                alert('Please select at least one time slot before submitting.');
            }
        });
    }

    // Book Poll Form
    const bookPollForm = document.getElementById('bookPollForm');
    if (bookPollForm) {
        bookPollForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const selected = document.querySelector('input[name="book"]:checked');
            if (selected) {
                const data = { book: selected.value };
                submitForm('https://formspree.io/f/xyknyeev', data, 'Thank you for voting! You selected: ' + selected.value);
                bookPollForm.reset();
            } else {
                alert('Please select an option before voting.');
            }
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
                alert('There was an error submitting your vote. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your vote. Please try again.');
        });
    }
});
