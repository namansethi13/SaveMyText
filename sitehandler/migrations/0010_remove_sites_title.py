# Generated by Django 4.1 on 2023-03-21 11:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sitehandler', '0009_remove_page_title_sites_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sites',
            name='title',
        ),
    ]