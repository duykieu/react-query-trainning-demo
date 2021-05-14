from rest_framework import routers

router = routers.SimpleRouter()

from .views import CategoriesViewSets, PostsViewSets, TagsViewSets, PageViewSets

router.register('categories', CategoriesViewSets)
router.register('posts', PostsViewSets)
router.register('tags', TagsViewSets)
router.register('pages', PageViewSets)

urlpatterns = router.urls
