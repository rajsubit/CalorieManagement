from django.contrib import admin

from .models import Meal


@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
	"""
	Admin class for registering Meal
	"""

	list_display = ("user", "name", "date", "time", "calorie",)
	ordering = ("-date",)
