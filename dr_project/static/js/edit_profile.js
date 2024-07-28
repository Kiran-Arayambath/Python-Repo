// Feather Icons
feather.replace({ 'aria-hidden': 'true' });

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

function redirectToTools() {
    window.location.href = '/dashboard/tools/';
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const profilePictureInput = document.getElementById('profile-picture-input');
    const profilePicture = document.getElementById('my_profile-picture');

    if (profilePictureInput && profilePicture) {
        profilePictureInput.addEventListener('change', function() {
            const file = profilePictureInput.files[0];
            console.log('File input change event triggered');
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    console.log('File read successfully:', e.target.result);
                    profilePicture.src = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                console.log('No file selected');
            }
        });
    }
});

