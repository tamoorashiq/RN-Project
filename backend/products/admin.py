from django.contrib import admin

from products.models import Category, Product, ProductMedia

# Register your models here.

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

class ProductMediaInline(admin.TabularInline):
    model = ProductMedia
    extra = 0

@admin.register(Product)
class ProposalAadmin(admin.ModelAdmin):
    inlines = [ProductMediaInline]
    list_display = ("user", "name", "category", "estimated_amount")
    # list_filter = ("duration", "paid_type", "status")
    # search_fields = ("public_id", "job__public_id")
    # readonly_fields = ("public_id",)