# views.py dashboard
from django.contrib import auth, messages
from django.contrib.auth.models import User
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .models import Reel, Profile
from dr_app.models import Contact, Appointment
from django.core.files.storage import FileSystemStorage


def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        if not username or not password:
            messages.error(request, 'Username and password are required.')
            return redirect('login')  # Make sure you have a named URL pattern for the login view

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('dashboard')  # Make sure you have a named URL pattern for the dashboard view
        else:
            messages.error(request, 'Invalid credentials.')
            return redirect('login')  # Make sure you have a named URL pattern for the login view

    return render(request, "login.html")


def logout(request):
    auth.logout(request)
    return redirect('/dashboard')


@login_required
def dashboard(request):
    return render(request, "dashboard.html")


@login_required
def appointments(request):
    appointment_list = Appointment.objects.all()
    paginator = Paginator(appointment_list, 4)  # Show 4 appointments per page

    page = request.GET.get('page')
    try:
        appointments = paginator.page(page)
    except PageNotAnInteger:
        appointments = paginator.page(1)
    except EmptyPage:
        appointments = paginator.page(paginator.num_pages)

    return render(request, "appointments.html", {'appointments': appointments})


@login_required
def mail(request):
    email_list = Contact.objects.all()
    paginator = Paginator(email_list, 10)  # Show 10 emails per page

    page = request.GET.get('page')
    try:
        emails = paginator.page(page)
    except PageNotAnInteger:
        emails = paginator.page(1)
    except EmptyPage:
        emails = paginator.page(paginator.num_pages)

    return render(request, "mail.html", {'emails': emails})


@login_required
def delete_mail(request, mail_id):
    if request.method == 'POST':
        mail = get_object_or_404(Contact, id=mail_id)
        mail.delete()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=400)


@login_required
def profile(request):
    return render(request, "profile.html")


@login_required
def tools(request):
    return render(request, "tools.html")


@login_required
def preceding(request):
    return render(request, "preceding.html")


@login_required
def upcoming(request):
    return render(request, "upcoming.html")


@login_required
def new_user(request):
    return render(request, "new_user.html")


@login_required
def webpage(request):
    if request.method == 'POST' and 'reel_file' in request.FILES:
        reel_file = request.FILES['reel_file']
        title = request.POST['title']
        fs = FileSystemStorage()
        filename = fs.save(reel_file.name, reel_file)
        reel = Reel(reel_file=filename, title=title)
        reel.save()
        return redirect('webpage')  # Redirect to clear the form and avoid resubmission

    reels = Reel.objects.all().order_by('-uploaded_at')[:3]
    return render(request, "webpage.html", {'reels': reels})


# @login_required
# @csrf_exempt
# def update_profile(request):
#     return render(request, "update_profile.html")

@login_required
@csrf_exempt
def update_profile(request):
    return render(request, "update_profile.html")


@login_required
def new_user(request):
    # if request.method == 'POST':
    #     username = request.POST.get('username')
    #     password = request.POST.get('password')
    #     email = request.POST.get('email')
    #     role = request.POST.get('role')
    #     dob = request.POST.get('dob')
    #     locality = request.POST.get('locality')
    #     address = request.POST.get('address')
    #     district = request.POST.get('district')
    #     state = request.POST.get('state')
    #     country = request.POST.get('country')
    #     pincode = request.POST.get('pincode')
    #     phone_number = request.POST.get('phone_number')
    #
    #     if User.objects.filter(username=username).exists():
    #         return render(request, 'new_user.html', {'error': 'Username already exists'})
    #
    #     user = User.objects.create_user(username=username, password=password, email=email)
    #     profile = Profile(
    #         user=user,
    #         role=role,
    #         dob=dob,
    #         locality=locality,
    #         address=address,
    #         district=district,
    #         state=state,
    #         country=country,
    #         pincode=pincode,
    #         phone_number=phone_number
    #     )
    #     profile.save()
    #     return redirect('dashboard')

    return render(request, 'new_user.html')
