# models.py dashboard
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    dp = models.ImageField(upload_to='dp/', default='dp/default_dp.png', blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(max_length=100)
    dob = models.DateField()
    locality = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=50)
    pincode = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Reel(models.Model):
    reel_file = models.FileField(upload_to='reels/')
    title = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if Reel.objects.count() >= 3:
            oldest_reel = Reel.objects.order_by('uploaded_at').first()
            oldest_reel.delete()
        super().save(*args, **kwargs)
