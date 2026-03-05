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
                alert(`Thank you for voting! You selected ${selections.length} time(s):\n\n${selections.join('\n')}`);
                // In a real app, you'd send this to a server
                console.log('Meeting preferences:', selections);
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
                alert(`Thank you for voting! You selected: ${selected.value}`);
                // In a real app, you'd send this to a server
                console.log('Book vote:', selected.value);
                bookPollForm.reset();
            } else {
                alert('Please select an option before voting.');
            }
        });
    }
});