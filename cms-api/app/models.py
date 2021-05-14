from django.db import models

import datetime


class JModel(models.Model):
    created_by = models.ForeignKey(
        "core.User",
        on_delete=models.SET_NULL,
        null=True,
        db_constraint=False,
        related_name="+"
    )
    updated_by = models.ForeignKey(
        "core.User",
        on_delete=models.SET_NULL,
        null=True,
        db_constraint=False,
        related_name="+"
    )
    created_at = models.DateTimeField(default=datetime.datetime.now, null=True)
    updated_at = models.DateTimeField(default=datetime.datetime.now, null=True)

    class Meta:
        abstract = True


class DModel(JModel):
    class Meta:
        abstract = True
