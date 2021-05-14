from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from django.contrib.auth.models import Group

GROUPS = [
    {
        'name': 'admin'
    },
    {
        'name': 'editor',
    },
    {
        'name': 'staff'
    },
    {
        'name': 'member'
    }
]


class Command(BaseCommand):
    help = 'Init create group from laravel system'

    def handle(self, *args, **options):
        for group in GROUPS:
            Group.objects.create(
                name=group['name']
            )
