# Generated by Django 4.1.7 on 2023-09-12 13:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_match'),
    ]

    operations = [
        migrations.RenameField(
            model_name='match',
            old_name='date',
            new_name='matchdate',
        ),
    ]
