from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Appointment, Contact
from dashboard.models import Reel


# Create your views here.
def index(request):
    reels = Reel.objects.all().order_by('-uploaded_at')[:3]
    return render(request, "index.html", {'reels': reels})


def about(request):
    return render(request, "about.html")


def services(request):
    return render(request, "services.html")


def faq(request):
    return render(request, "faq.html")


def contact(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        contact = Contact(name=name, email=email, subject=subject, message=message)
        contact.save()
        return redirect('contact')

    return render(request, "contact.html")


def appointment(request):
    if request.method == "POST":
        name = request.POST.get('name')
        phone_number = request.POST.get('phone')
        email = request.POST.get('email')
        date = request.POST.get('date')
        time = request.POST.get('time')
        area = request.POST.get('area')
        city = request.POST.get('city')
        state = request.POST.get('state')
        pincode = request.POST.get('post-code')

        appointment = Appointment(name=name, phone_number=phone_number, email=email, date=date, time=time, area=area,
                                  city=city, state=state, pincode=pincode)
        appointment.save()
        return redirect('appointment')  # Redirect to avoid resubmission on refresh

    return render(request, "appointment.html")


def homepage(request):
    reels = Reel.objects.all().order_by('-uploaded_at')[:3]
    return render(request, "homepage.html", {'reels': reels})


def delete_mail(request, mail_id):
    if request.method == 'POST':
        mail = get_object_or_404(Contact, id=mail_id)
        mail.delete()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=400)


def mail_detail(request, mail_id):
    mail = get_object_or_404(Contact, id=mail_id)
    return render(request, 'mail_detail.html', {'mail': mail})
