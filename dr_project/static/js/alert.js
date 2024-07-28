$(document).ready(function () {
    // Handle form submit
    $("#appointment-form").submit(function (event) {
        event.preventDefault();

        // Form validation successful, proceed to submit the form
        var form = $(this);
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            success: function (response) {
                New.alert({
                    status: 'success',
                    title: 'Successfully Submitted!',
                    content: 'We will get back to you shortly.'
                });
                form.trigger("reset");
            },
            error: function (response) {
                New.alert({
                    status: 'error',
                    title: 'Submission Failed',
                    content: 'There was an error submitting your form. Please try again later.'
                });
            }
        });
    });

    // Custom alert function
    const New = {
        status: 'success',
        title: '',
        content: '',
        alert: function ({ status, title, content, confirmbtn = true }) {
            var modal = document.createElement('section');
            modal.setAttribute('class', 'alert_modal');
            document.body.append(modal);
            var alert = document.createElement('div');
            alert.setAttribute('class', 'alert_container');
            modal.appendChild(alert);

            alert.innerHTML = `
                <div class="alert_heading"></div>
                <div class="alert_details">
                    <h2>${title}</h2>
                    <p>${content}</p>
                </div>
                <div class="alert_footer"></div>
            `;

            var alert_heading = alert.querySelector('.alert_heading');
            var alert_footer = alert.querySelector('.alert_footer');

            if (status == 'success') {
                alert_heading.innerHTML = `
                    <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M8 12L11 15L16 10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0"/></path></g></svg>
                `;
                alert_footer.innerHTML = `<span class="close" title="Ok">Ok</span>`;
                alert_heading.style = 'background: linear-gradient(80deg, #67FF86, #1FB397);';
                alert.querySelector('.alert_details > h2').style.color = '#1FB397';
            } else if (status == 'error') {
                alert_heading.innerHTML = `
                    <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"/></path></g></svg>
                `;
                alert_footer.innerHTML = `<span class="close" title="Ok">Ok</span>`;
                alert_heading.style = 'background: linear-gradient(80deg, #FF6767, #B31F1F);';
                alert.querySelector('.alert_details > h2').style.color = '#B31F1F';
            }

            alert_footer.querySelector('.close').addEventListener('click', function () {
                alert.remove();
                modal.remove();
            });
        }
    };
});

