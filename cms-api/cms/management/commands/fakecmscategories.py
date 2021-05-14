from django.core.management.base import BaseCommand, CommandError

from cms.models import Category
import uuid, lorem


class Command(BaseCommand):
    help = 'Fake CMS Categories'

    def handle(self, *args, **options):

        categories = []
        for i in range(0, 20):
            categories.append(Category(
                name=lorem.sentence(),
                description=lorem.paragraph(),
                slug=uuid.uuid4()
            ))

        Category.objects.bulk_create(categories)
