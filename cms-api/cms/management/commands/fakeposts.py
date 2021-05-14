from django.core.management.base import BaseCommand, CommandError

from cms.models import Post, Category
from core.models import Image
import lorem, uuid, random


class Command(BaseCommand):
    help = 'Fake CMS Posts'

    def handle(self, *args, **options):
        categories = list(Category.objects.all())

        posts = []
        for i in range(0, 100):
            posts.append(Post(
                title=lorem.sentence(),
                slug=str(uuid.uuid4()),
                body=f"{lorem.text()} \n {lorem.text()} \n {lorem.text()}",
            ))

        return_posts = Post.objects.bulk_create(posts)
        for post in return_posts:
            category = categories[random.randint(0, len(categories) - 1)]
            post.categories.set([category])
            post.save()
