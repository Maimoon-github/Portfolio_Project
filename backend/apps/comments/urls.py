from django.urls import path

from . import views

app_name = "comments"

urlpatterns = [
    path("post/<int:post_id>/comment/", views.add_comment, name="add_comment"),
    path("moderate/", views.CommentModerationView.as_view(), name="moderate"),
    path("approve/<int:comment_id>/", views.approve_comment, name="approve"),
    path("delete/<int:comment_id>/", views.delete_comment, name="delete"),
]
