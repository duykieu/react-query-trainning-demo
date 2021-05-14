from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
import requests

from utils import format_phone
from local.models import Province, District, Ward, Street
from core.models import User, Group
from property.models import Property, PropertyCategory, PriceModel
import uuid


class Command(BaseCommand):
    help = 'Import users from laravel system'

    def handle(self, *args, **options):
        data = requests.get(settings.OLD_SYSTEM + '/users')
        users = data.json()
        create_list = []
        staff_group = Group.objects.filter(name='staff').first()
        for user in users:
            if user['user_group_id'] <= 6 and user['phone_number']:
                # Find current
                phone_number = format_phone(user['phone_number'])
                if not User.objects.filter(phone_number=phone_number).count():
                    user = User.objects.create(
                        id=uuid.uuid4(),
                        name=user['name'],
                        id_number=user['id_number'],
                        id_issue_date=user['id_issue_date'],
                        id_issue_place=user['id_issue_place'],
                        phone_number=format_phone(user['phone_number']),
                        phone_number_2=user['phone_number_2'],
                        address=user['address'],
                        display_name=user['display_name'],
                        is_staff=True,
                        is_active=True,
                        old_system_id=user['id'],
                    )
                    user.groups.add(staff_group)
