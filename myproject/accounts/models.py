from django.contrib.auth.models import AbstractUser
from django.db import models

class UserProfile(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('curator', 'Curator'),
        ('user', 'User'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    
    # Add related_name to avoid conflicts with 'auth.User.groups' and 'auth.User.user_permissions'
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',  # Change this name to avoid the clash
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',  # Change this name to avoid the clash
        blank=True
    )

    def __str__(self):
        return f"{self.username} ({self.role})"

class Exhibit(models.Model):
    name = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name