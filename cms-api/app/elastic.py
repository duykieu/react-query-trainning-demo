from elasticsearch import Elasticsearch
from app import settings
from rest_framework.exceptions import ParseError
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

es = Elasticsearch(
    [settings.ELASTIC_HOST],
    http_auth=(settings.ELASTIC_USER, settings.ELASTIC_PASSWORD),
    scheme=settings.ELASTIC_SCHEME,
    port=9200,
)


@api_view(http_method_names=["post"])
@permission_classes([IsAuthenticated])
def elastic_authenticated_search(request, *args, **kwargs):
    try:
        es.search(body=request.data)
    except:
        raise (ParseError(detail="Lỗi tìm kiếm dữ liệu"))


@api_view(http_method_names=["post"])
@permission_classes([IsAuthenticated])
def elastic_authenticated_retrieve(request, *args, **kwargs):
    pass
