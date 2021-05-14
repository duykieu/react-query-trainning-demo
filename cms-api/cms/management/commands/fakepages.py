from django.core.management.base import BaseCommand, CommandError

from cms.models import Page, Category
from core.models import Image
import lorem, uuid, random


class Command(BaseCommand):
    help = 'Fake CMS Posts'

    def handle(self, *args, **options):
        pages = []
        for i in range(0, 100):
            pages.append(
                Page(
                    name=lorem.sentence(),
                    slug=uuid.uuid4(),
                    body=lorem.text()
                )
            )
        Page.objects.bulk_create(pages)