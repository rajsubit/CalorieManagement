from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _

from .manager import MealManager


class Meal(models.Model):
    """ Meal model contains detail information about meals"""

    # Relations:
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='meal_users')

    # Attributes:
    name = models.CharField(max_length=300)
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    calorie = models.FloatField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    # Object Manager:
    objects = MealManager()

    # Meta and Strings:
    class Meta:
        """ Meta class for Meal model """
        verbose_name = _('Meal')
        verbose_name_plural = _('Meals')

    def __str__(self):
        return self.name
