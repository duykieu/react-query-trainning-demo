import os
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from core.serializers import UserSerializer
import random

from io import StringIO
from html.parser import HTMLParser


class MLStripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.reset()
        self.strict = False
        self.convert_charrefs = True
        self.text = StringIO()

    def handle_data(self, d):
        self.text.write(d)

    def get_data(self):
        return self.text.getvalue()


def strip_tags(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()


def format_phone(phone):
    return '+84' + str(int(phone)).replace('+84', '')


def return_new():
    pass


def path(path):
    return os.path.abspath(path or '')


def get_user_login_payload(user):
    refresh = RefreshToken.for_user(user)
    return Response({
        'token': str(refresh.access_token),
        'user': UserSerializer(user).data
    })



def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]
