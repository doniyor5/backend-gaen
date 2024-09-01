import uuid

from slugify import slugify

from django.db import models

from GAEN.userAuth.models import User


class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    slug = models.CharField(max_length=300, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(str(self.name)) + '-' + uuid.uuid4().hex[:20]
        super().save(*args, **kwargs)


    def __str__(self):
        return self.name

    class Meta:
        db_table = 'Category'


class Art(models.Model):

    title = models.CharField(max_length=50)
    art_name = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    email = models.EmailField(max_length=120)
    description = models.TextField()
    art_img = models.ImageField(upload_to=f'media/artsImages/%Y/%m/')

    category = models.ForeignKey(Category, to_field='name', on_delete=models.CASCADE)

    is_accepted = models.BooleanField(default=False, )

    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    edited = models.BooleanField(default=False)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='art_user')
    slug = models.CharField(max_length=300, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(str(self.title)) + '-' + uuid.uuid4().hex[:20]
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.title} - {self.category} - {self.created_at}'

    class Meta:
        db_table = 'Art'


class Comment(models.Model):
    text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    art = models.ForeignKey(Art, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    edited = models.BooleanField(default=False)

    slug = models.CharField(max_length=300, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(str(self.text)) + '-' + uuid.uuid4().hex[:20]
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.text} at {self.created_at}'

    class Meta:
        db_table = 'Comment'

    def update(self, **kwargs):
        self.text = kwargs['text']
        self.edited = kwargs['edited']
        self.art = kwargs['art']
        self.user = kwargs['user']

    class Meta:
        db_table = 'Comments'
