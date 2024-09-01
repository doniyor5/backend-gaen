from django.test import TestCase
from slugify import slugify
import uuid

from art.models import Category
from art.serializers import CategorySerializer


class TestCategorySerializer(TestCase):
    def setUp(self) -> None:
        self.category1: Category = Category.objects.create(name='category one', description='category one description')
        self.category2: Category = Category.objects.create(name='category two')

    def slug_maker_with_uuid(self, category: Category) -> str:
        return slugify(str(category.name)) + '-' + uuid.uuid4().hex[:20]

    def slug_maker_without_uuid(self, category: Category) -> str:
        return slugify(str(category.name))

    def test_category(self) -> None:
        data = CategorySerializer(self.category1).data
        assert data['name'] == 'category one'
        assert data['description'] == 'category one description'
        assert data['slug'] != self.slug_maker_with_uuid(self.category1)
        assert data['slug'] == self.slug_maker_without_uuid(self.category1)

    def test_nullable_category(self) -> None:
        data = CategorySerializer(self.category2).data
        assert data['name'] == 'category two'
        assert data['description'] is None
        assert data['slug'] != self.slug_maker_with_uuid(self.category2)
        assert data['slug'].strip('-').remove(-1).join('-') == self.slug_maker_without_uuid(self.category1)
