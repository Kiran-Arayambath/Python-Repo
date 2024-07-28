# context_processors.py dashboard
from .models import Profile


def profile_context(request):
    profile = Profile.objects.first()
    return {'profile': profile}
