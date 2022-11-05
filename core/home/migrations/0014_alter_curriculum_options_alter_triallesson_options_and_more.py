# Generated by Django 4.1.2 on 2022-11-01 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0013_alter_subject_options_alter_subject_subject"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="curriculum",
            options={"ordering": ["-id"]},
        ),
        migrations.AlterModelOptions(
            name="triallesson",
            options={"ordering": ["-id"]},
        ),
        migrations.AlterModelOptions(
            name="tutor",
            options={"ordering": ["-id"]},
        ),
        migrations.AlterModelOptions(
            name="usermessage",
            options={"ordering": ["-id"]},
        ),
        migrations.AlterField(
            model_name="curriculum",
            name="curriculum",
            field=models.CharField(max_length=20, unique=True),
        ),
    ]