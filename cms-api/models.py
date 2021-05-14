# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Ads(models.Model):
    title = models.CharField(max_length=191)
    slug = models.CharField(max_length=191)
    property_type_id = models.IntegerField()
    address = models.CharField(max_length=191, blank=True, null=True)
    province_code = models.CharField(max_length=191)
    district_id = models.IntegerField()
    ward_id = models.IntegerField(blank=True, null=True)
    street_id = models.IntegerField(blank=True, null=True)
    horizontal = models.FloatField(blank=True, null=True)
    vertical = models.FloatField(blank=True, null=True)
    be_horizontal = models.FloatField(blank=True, null=True)
    land_size = models.FloatField(blank=True, null=True)
    gfa = models.FloatField(blank=True, null=True)
    num_of_bed = models.IntegerField(blank=True, null=True)
    num_of_wc = models.IntegerField(blank=True, null=True)
    structure = models.CharField(max_length=191, blank=True, null=True)
    direction = models.CharField(max_length=191, blank=True, null=True)
    paper_type_code = models.CharField(max_length=191, blank=True, null=True)
    size_for_cal = models.FloatField(blank=True, null=True)
    keywords = models.TextField(blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    price_type_id = models.IntegerField()
    note = models.TextField(blank=True, null=True)
    user_id = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    vip = models.IntegerField()
    property_id = models.IntegerField()
    price_in_vnd = models.BigIntegerField(blank=True, null=True)
    num_of_floor = models.IntegerField(blank=True, null=True)
    num_of_basement = models.IntegerField(blank=True, null=True)
    elevator = models.IntegerField(blank=True, null=True)
    show_address = models.IntegerField()
    vip_0 = models.ForeignKey('Vips', models.DO_NOTHING, db_column='vip_id')  # Field renamed because of name conflict.
    start_on = models.DateTimeField()
    end_on = models.DateTimeField()
    available = models.IntegerField()
    censored = models.IntegerField()
    hidden = models.IntegerField()
    fee = models.BigIntegerField()
    num_of_rooftop = models.IntegerField()
    num_of_elevator = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'ads'


class AdsStage(models.Model):
    title = models.CharField(max_length=191)
    property_type_id = models.IntegerField()
    address = models.CharField(max_length=191, blank=True, null=True)
    province_code = models.CharField(max_length=191)
    district_id = models.IntegerField()
    ward_id = models.IntegerField(blank=True, null=True)
    street_id = models.IntegerField(blank=True, null=True)
    horizontal = models.FloatField(blank=True, null=True)
    vertical = models.FloatField(blank=True, null=True)
    be_horizontal = models.FloatField(blank=True, null=True)
    land_size = models.FloatField(blank=True, null=True)
    gfa = models.FloatField(blank=True, null=True)
    num_of_bed = models.IntegerField(blank=True, null=True)
    num_of_wc = models.IntegerField(blank=True, null=True)
    structure = models.CharField(max_length=191, blank=True, null=True)
    direction = models.CharField(max_length=191, blank=True, null=True)
    tags = models.CharField(max_length=191, blank=True, null=True)
    paper_type_code = models.CharField(max_length=191, blank=True, null=True)
    size_for_cal = models.FloatField(blank=True, null=True)
    keywords = models.TextField(blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    price_type_id = models.IntegerField()
    note = models.TextField(blank=True, null=True)
    user_id = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    property_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'ads_stage'


class AdsTag(models.Model):
    ads_id = models.IntegerField()
    tag_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'ads_tag'


class Branches(models.Model):
    name = models.CharField(max_length=191)
    company = models.ForeignKey('Companies', models.DO_NOTHING)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'branches'


class Categories(models.Model):
    name = models.CharField(max_length=191)
    slug = models.CharField(max_length=191)
    description = models.TextField(blank=True, null=True)
    parent_id = models.IntegerField()
    order_number = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'categories'


class Companies(models.Model):
    name = models.CharField(max_length=191)
    active = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    field = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'companies'


class ComposeReports(models.Model):
    compose = models.ForeignKey('Composes', models.DO_NOTHING)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    host = models.CharField(max_length=255)
    links = models.TextField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'compose_reports'


class Composes(models.Model):
    title = models.CharField(max_length=255)
    slug = models.CharField(max_length=255)
    body = models.TextField()
    user = models.ForeignKey('Users', models.DO_NOTHING)
    price = models.PositiveBigIntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'composes'


class ContactGroups(models.Model):
    name = models.CharField(max_length=191)
    slug = models.CharField(max_length=191)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    google_display = models.CharField(max_length=191)

    class Meta:
        managed = False
        db_table = 'contact_groups'


class ContactTag(models.Model):
    contact = models.ForeignKey('Contacts', models.DO_NOTHING)
    tag = models.ForeignKey('Tags', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'contact_tag'


class ContactUser(models.Model):
    contact = models.ForeignKey('Contacts', models.DO_NOTHING)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'contact_user'


class Contacts(models.Model):
    name = models.CharField(max_length=191)
    phone_number_1 = models.CharField(max_length=191, blank=True, null=True)
    phone_number_2 = models.CharField(max_length=191, blank=True, null=True)
    phone_number_3 = models.CharField(max_length=191, blank=True, null=True)
    contact_group = models.ForeignKey(ContactGroups, models.DO_NOTHING)
    company = models.ForeignKey(Companies, models.DO_NOTHING)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    branch = models.ForeignKey(Branches, models.DO_NOTHING)
    team = models.ForeignKey('Teams', models.DO_NOTHING)
    budget_type = models.ForeignKey('PriceTypes', models.DO_NOTHING)
    budget = models.FloatField(blank=True, null=True)
    note = models.TextField(blank=True, null=True)
    searching_area = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    is_mart = models.IntegerField()
    brand = models.CharField(max_length=191)

    class Meta:
        managed = False
        db_table = 'contacts'


class CssClasses(models.Model):
    class_field = models.CharField(db_column='class', max_length=191)  # Field renamed because it was a Python reserved word.
    name = models.CharField(max_length=191)

    class Meta:
        managed = False
        db_table = 'css_classes'


class DealStatuses(models.Model):
    name = models.CharField(max_length=191)
    note = models.TextField()
    css_class = models.CharField(max_length=191)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'deal_statuses'


class Deals(models.Model):
    contact_user = models.ForeignKey(ContactUser, models.DO_NOTHING)
    property = models.ForeignKey('Properties', models.DO_NOTHING)
    status = models.ForeignKey(DealStatuses, models.DO_NOTHING)
    note = models.TextField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'deals'


class Directions(models.Model):
    name = models.CharField(max_length=191)
    slug = models.CharField(max_length=191)
    code = models.CharField(max_length=191)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'directions'


class Districts(models.Model):
    id = models.IntegerField(unique=True)
    name = models.CharField(max_length=191)
    slug = models.CharField(max_length=191, blank=True, null=True)
    province_code = models.CharField(max_length=191)
    order_number = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'districts'


class Keys(models.Model):
    key = models.CharField(max_length=191)
    value = models.CharField(max_length=191)
    description = models.CharField(max_length=191, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'keys'


class MarketTypes(models.Model):
    name = models.CharField(max_length=191)
    slug = models.CharField(max_length=191)
    code = models.CharField(max_length=191)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'market_types'


class Media(models.Model):
    model_type = models.CharField(max_length=191)
    model_id = models.PositiveBigIntegerField()
    collection_name = models.CharField(max_length=191)
    name = models.CharField(max_length=191)
    file_name = models.CharField(max_length=191)
    mime_type = models.CharField(max_length=191, blank=True, null=True)
    disk = models.CharField(max_length=191)
    size = models.PositiveIntegerField()
    manipulations = models.TextField()
    custom_properties = models.TextField()
    order_column = models.PositiveIntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    responsive_images = models.TextField()

    class Meta:
        managed = False
        db_table = 'media'


class Migrations(models.Model):
    migration = models.CharField(max_length=191)
    batch = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'migrations'


class NlTransactions(models.Model):
    transaction_info = models.CharField(max_length=191, blank=True, null=True)
    order_code = models.CharField(max_length=191, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    payment_id = models.IntegerField(blank=True, null=True)
    payment_type = models.IntegerField(blank=True, null=True)
    error_text = models.TextField(blank=True, null=True)
    secure_code = models.CharField(max_length=191, blank=True, null=True)
    token_nl = models.CharField(max_length=191, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'nl_transactions'


class Pages(models.Model):
    user_id = models.IntegerField()
    content = models.TextField(blank=True, null=True)
    description = models.CharField(max_length=191, blank=True, null=True)
    title = models.CharField(max_length=191)
    slug = models.CharField(max_length=191)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pages'


class PaperTypes(models.Model):
    name = models.CharField(max_length=191)
    slug = models.CharField(max_length=191, blank=True, null=True)
    code = models.CharField(max_length=191)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'paper_types'


class PasswordResets(models.Model):
    email = models.CharField(max_length=191)
    token = models.CharField(max_length=191)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'password_resets'


class PaySecure(models.Model):
    code = models.CharField(max_length=191)

    class Meta:
        managed = False
        db_table = 'pay_secure'


class PermissionGroups(models.Model):
    name = models.CharField(max_length=191)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'permission_groups'


class PermissionRole(models.Model):
    permission = models.OneToOneField('Permissions', models.DO_NOTHING, primary_key=True)
    role = models.ForeignKey('Roles', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'permission_role'
        unique_together = (('permission', 'role'),)


class Permissions(models.Model):
    name = models.CharField(max_length=191)
    label = models.CharField(max_length=191, blank=True, null=True)
    permission_group = models.ForeignKey(PermissionGroups, models.DO_NOTHING)
    active = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'permissions'


class PhoneLog(models.Model):
    user_id = models.IntegerField()
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    referer = models.CharField(max_length=191, blank=True, null=True)
    referer_host = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'phone_log'


class Phongtro123(models.Model):
    id = models.BigAutoField(primary_key=True)
    link = models.CharField(max_length=191)
    district_id = models.IntegerField()
    province_id = models.IntegerField()
    size = models.IntegerField()
    done = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'phongtro123'


class Posts(models.Model):
    title = models.CharField(max_length=191)
    slug = models.CharField(max_length=191)
    content = models.TextField()
    user = models.ForeignKey('Users', models.DO_NOTHING)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'posts'


class PriceTypes(models.Model):
    name = models.CharField(max_length=191)
    order_number = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'price_types'


class Properties(models.Model):
    property_type_id = models.IntegerField()
    address = models.CharField(max_length=191, blank=True, null=True)
    province_code = models.CharField(max_length=191)
    district_id = models.IntegerField()
    ward_id = models.IntegerField(blank=True, null=True)
    street_id = models.IntegerField(blank=True, null=True)
    horizontal = models.FloatField(blank=True, null=True)
    vertical = models.FloatField(blank=True, null=True)
    be_horizontal = models.FloatField(blank=True, null=True)
    land_size = models.FloatField(blank=True, null=True)
    gfa = models.FloatField(blank=True, null=True)
    num_of_bed = models.IntegerField(blank=True, null=True)
    num_of_wc = models.IntegerField(blank=True, null=True)
    structure = models.CharField(max_length=191, blank=True, null=True)
    direction = models.CharField(max_length=191, blank=True, null=True)
    paper_type_code = models.CharField(max_length=191, blank=True, null=True)
    size_for_cal = models.FloatField(blank=True, null=True)
    commission = models.CharField(max_length=191, blank=True, null=True)
    owner_phone_1 = models.CharField(max_length=191, blank=True, null=True)
    owner_name_1 = models.CharField(max_length=191, blank=True, null=True)
    owner_phone_2 = models.CharField(max_length=191, blank=True, null=True)
    owner_name_2 = models.CharField(max_length=191, blank=True, null=True)
    keywords = models.TextField(blank=True, null=True)
    owner_phone_3 = models.CharField(max_length=191, blank=True, null=True)
    owner_name_3 = models.CharField(max_length=191, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    price_total_in_usd = models.FloatField(blank=True, null=True)
    price_type_id = models.IntegerField()
    note = models.TextField(blank=True, null=True)
    signing_date = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    signing_update_id = models.IntegerField()
    history = models.TextField(blank=True, null=True)
    hide = models.IntegerField()
    pulled = models.IntegerField()
    google_resource = models.CharField(max_length=191, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'properties'


class PropertyTag(models.Model):
    property_id = models.IntegerField()
    tag_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'property_tag'


class PropertyTypes(models.Model):
    name = models.CharField(max_length=191)
    slug = models.CharField(max_length=191, blank=True, null=True)
    market_type_code = models.CharField(max_length=191)
    order_number = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'property_types'


class Provinces(models.Model):
    code = models.CharField(max_length=191)
    name = models.CharField(max_length=191)
    slug = models.CharField(max_length=191, blank=True, null=True)
    order_number = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'provinces'


class RoleUser(models.Model):
    user = models.OneToOneField('Users', models.DO_NOTHING, primary_key=True)
    role = models.ForeignKey('Roles', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'role_user'
        unique_together = (('user', 'role'),)


class RoleUserGroup(models.Model):
    user_group = models.OneToOneField('UserGroups', models.DO_NOTHING, primary_key=True)
    role = models.ForeignKey('Roles', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'role_user_group'
        unique_together = (('user_group', 'role'),)


class Roles(models.Model):
    name = models.CharField(max_length=191)
    label = models.CharField(max_length=191, blank=True, null=True)
    active = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'roles'


class Streets(models.Model):
    id = models.IntegerField()
    name = models.CharField(max_length=191)
    slug = models.CharField(max_length=191, blank=True, null=True)
    district_id = models.IntegerField()
    order_number = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'streets'


class Tags(models.Model):
    name = models.CharField(max_length=191)
    slug = models.CharField(unique=True, max_length=191)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tags'


class Teams(models.Model):
    name = models.CharField(max_length=191)
    branch = models.ForeignKey(Branches, models.DO_NOTHING)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'teams'


class TelegramAuth(models.Model):
    phone = models.CharField(max_length=20, blank=True, null=True)
    telegram_id = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'telegram_auth'


class TelegramUpdates(models.Model):
    id = models.BigAutoField(primary_key=True)
    update_id = models.CharField(max_length=191)

    class Meta:
        managed = False
        db_table = 'telegram_updates'


class UriByDistrict(models.Model):
    slug = models.CharField(max_length=191)
    province_id = models.IntegerField()
    district_id = models.IntegerField()
    district_name = models.CharField(max_length=191, blank=True, null=True)
    province_name = models.CharField(max_length=191, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'uri_by_district'


class UriByStreet(models.Model):
    slug = models.CharField(max_length=191)
    district_id = models.IntegerField()
    street_id = models.IntegerField()
    district_name = models.CharField(max_length=191, blank=True, null=True)
    street_name = models.CharField(max_length=191, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'uri_by_street'


class UriByWard(models.Model):
    slug = models.CharField(max_length=191)
    district_id = models.IntegerField()
    ward_id = models.IntegerField()
    district_name = models.CharField(max_length=191, blank=True, null=True)
    ward_name = models.CharField(max_length=191, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'uri_by_ward'


class UserGroups(models.Model):
    name = models.CharField(max_length=191)

    class Meta:
        managed = False
        db_table = 'user_groups'


class Users(models.Model):
    name = models.CharField(max_length=191)
    email = models.CharField(unique=True, max_length=191)
    password = models.CharField(max_length=191)
    id_number = models.CharField(max_length=191, blank=True, null=True)
    id_issue_date = models.CharField(max_length=191, blank=True, null=True)
    id_issue_place = models.CharField(max_length=191, blank=True, null=True)
    phone_number = models.CharField(max_length=191, blank=True, null=True)
    phone_number_2 = models.CharField(max_length=191, blank=True, null=True)
    user_group_id = models.IntegerField()
    address = models.TextField()
    team_id = models.IntegerField()
    branch_id = models.IntegerField()
    company_id = models.IntegerField()
    remember_token = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    display_name = models.CharField(max_length=191)
    balance = models.PositiveBigIntegerField()
    promote_balance = models.PositiveBigIntegerField()
    extra_balance = models.PositiveBigIntegerField()
    active = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'users'


class Vips(models.Model):
    name = models.CharField(max_length=191)
    price = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'vips'


class Wards(models.Model):
    id = models.IntegerField()
    name = models.CharField(max_length=191)
    slug = models.CharField(max_length=191)
    district_id = models.IntegerField()
    order_number = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'wards'
