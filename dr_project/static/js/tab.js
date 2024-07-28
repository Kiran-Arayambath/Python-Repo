// Feather Icons
feather.replace({ 'aria-hidden': 'true' })

// Status Button
document.addEventListener('DOMContentLoaded', (event) => {
    const selectElements = document.querySelectorAll('.status-select');

    selectElements.forEach(selectElement => {
        selectElement.addEventListener('change', function() {
            const selectedGradient = selectElement.value;
            selectElement.style.background = selectedGradient;
        });

        // Trigger change event on load to set initial gradient
        const eventInit = new Event('change');
        selectElement.dispatchEvent(eventInit);
    });
});

// Email Hover Action
document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll('tr[data-href]');

    rows.forEach(row => {
        row.addEventListener('click', function () {
            window.location.href = this.getAttribute('data-href');
        });
    });
});

// Search Appointments
document.getElementById('search').addEventListener('keyup', function() {
    const searchText = this.value.toLowerCase();
    const tableRows = document.querySelectorAll('#appointmentTable tbody tr');
    const tableHead = document.querySelector('#appointmentTable thead');
    let foundAny = false;

    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let found = false;

        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(searchText)) {
                found = true;
            }
        });

        if (found) {
            row.style.display = '';
            foundAny = true;
        } else {
            row.style.display = 'none';
        }
    });

    if (foundAny) {
        tableHead.style.display = '';
        document.getElementById('noDataMessage').style.display = 'none';
    } else {
        tableHead.style.display = 'none';
        document.getElementById('noDataMessage').style.display = 'block';
    }
});

// Delete Mail
function deleteMail(element) {
    const mailId = element.getAttribute('data-mail-id');
    if (confirm('Are you sure you want to delete this mail?')) {
        const csrfToken = getCookie('csrftoken');
        fetch(`/delete_mail/${mailId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Mail deleted successfully!');
                window.location.href = '/dashboard/mail/';  // Redirect to inbox and refresh
            } else {
                alert('Failed to delete mail: ' + (data.error || 'Unknown error'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to delete mail due to a network error.');
        });
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Link Scripts
function redirectToDashboard() {
    window.location.href = '/dashboard/dashboard';
}

function redirectToAppointments() {
    window.location.href = '/dashboard/appointments/';
}

function redirectToInbox() {
    window.location.href = '/dashboard/mail/';
}

function redirectToProfile() {
    window.location.href = '/dashboard/profile/';
}

function redirectToInbox() {
    window.location.href = '/dashboard/mail/';
}

function redirectToTools() {
    window.location.href = '/dashboard/tools/';
}

// Reels Upload
document.addEventListener('DOMContentLoaded', function () {
    $('#editReelModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var reelId = button.data('id');
        var reelTitle = button.data('title');
        var reelUrl = button.data('url');

        var modal = $(this);
        modal.find('#reelId').val(reelId);
        modal.find('#reelTitle').val(reelTitle);
    });

    $('#editReelForm').on('submit', function (event) {
        event.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            url: "{% url 'edit_reel' %}",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
            location.reload();
            }
        });
    });
});

