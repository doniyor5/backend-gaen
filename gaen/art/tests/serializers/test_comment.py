from django.test import TestCase
from slugify import slugify
import uuid

from art.models import Category
from art.serializers import CategorySerializer
