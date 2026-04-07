# File Tree: backend_v2

**Root Path:** `c:\Users\Aurum\vscode\Portfolio_Project\backend_v2`

```
├── 📁 api
│   ├── 📁 migrations
│   │   └── 🐍 __init__.py
│   ├── 🐍 __init__.py
│   ├── 🐍 admin.py
│   ├── 🐍 apps.py
│   ├── 🐍 models.py
│   ├── 🐍 tests.py
│   ├── 🐍 urls.py
│   └── 🐍 views.py
├── 📁 apps
│   ├── 📁 blog
│   │   ├── 📁 migrations
│   │   │   ├── 🐍 0001_initial.py
│   │   │   └── 🐍 __init__.py
│   │   ├── 📁 tests
│   │   │   ├── 🐍 __init__.py
│   │   │   ├── 🐍 test_models.py
│   │   │   └── 🐍 test_views.py
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 admin.py
│   │   ├── 🐍 apps.py
│   │   ├── 🐍 filters.py
│   │   ├── 🐍 models.py
│   │   ├── 🐍 serializers.py
│   │   ├── 🐍 sitemaps.py
│   │   ├── 🐍 urls.py
│   │   └── 🐍 views.py
│   ├── 📁 comments
│   │   ├── 📁 migrations
│   │   │   ├── 🐍 0001_initial.py
│   │   │   └── 🐍 __init__.py
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 admin.py
│   │   ├── 🐍 apps.py
│   │   ├── 🐍 forms.py
│   │   ├── 🐍 models.py
│   │   ├── 🐍 tests.py
│   │   ├── 🐍 urls.py
│   │   └── 🐍 views.py
│   ├── 📁 contact
│   │   ├── 📁 migrations
│   │   │   ├── 🐍 0001_initial.py
│   │   │   └── 🐍 __init__.py
│   │   ├── 📁 tests
│   │   │   ├── 🐍 __init__.py
│   │   │   └── 🐍 test_views.py
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 admin.py
│   │   ├── 🐍 apps.py
│   │   ├── 🐍 models.py
│   │   ├── 🐍 serializers.py
│   │   ├── 🐍 urls.py
│   │   └── 🐍 views.py
│   ├── 📁 knowledge
│   │   ├── 📁 migrations
│   │   │   ├── 🐍 0001_initial.py
│   │   │   └── 🐍 __init__.py
│   │   ├── 📁 tests
│   │   │   ├── 🐍 __init__.py
│   │   │   └── 🐍 test_views.py
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 admin.py
│   │   ├── 🐍 apps.py
│   │   ├── 🐍 models.py
│   │   ├── 🐍 serializers.py
│   │   ├── 🐍 urls.py
│   │   └── 🐍 views.py
│   ├── 📁 projects
│   │   ├── 📁 migrations
│   │   │   ├── 🐍 0001_initial.py
│   │   │   └── 🐍 __init__.py
│   │   ├── 📁 tests
│   │   │   ├── 🐍 __init__.py
│   │   │   ├── 🐍 test_models.py
│   │   │   └── 🐍 test_views.py
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 admin.py
│   │   ├── 🐍 apps.py
│   │   ├── 🐍 filters.py
│   │   ├── 🐍 models.py
│   │   ├── 🐍 serializers.py
│   │   ├── 🐍 urls.py
│   │   └── 🐍 views.py
│   ├── 📁 resume
│   │   ├── 📁 migrations
│   │   │   ├── 🐍 0001_initial.py
│   │   │   └── 🐍 __init__.py
│   │   ├── 📁 tests
│   │   │   ├── 🐍 __init__.py
│   │   │   └── 🐍 test_views.py
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 admin.py
│   │   ├── 🐍 apps.py
│   │   ├── 🐍 models.py
│   │   ├── 🐍 serializers.py
│   │   ├── 🐍 urls.py
│   │   └── 🐍 views.py
│   └── 📁 seo
│       ├── 📁 analysis
│       │   ├── 🐍 __init__.py
│       │   ├── 🐍 checks_registry.py
│       │   ├── 🐍 engine.py
│       │   ├── 🐍 readability.py
│       │   └── 🐍 utils.py
│       ├── 📁 api
│       │   ├── 🐍 __init__.py
│       │   ├── 🐍 serializers.py
│       │   ├── 🐍 urls.py
│       │   └── 🐍 views.py
│       ├── 📁 management
│       │   ├── 📁 commands
│       │   │   ├── 🐍 __init__.py
│       │   │   ├── 🐍 find_orphan_posts.py
│       │   │   ├── 🐍 reanalyze_all_posts.py
│       │   │   └── 🐍 validate_post_schema.py
│       │   └── 🐍 __init__.py
│       ├── 🐍 __init__.py
│       ├── 🐍 admin.py
│       ├── 🐍 apps.py
│       ├── 🐍 cache.py
│       ├── 🐍 checks.py
│       ├── 🐍 constants.py
│       ├── 🐍 forms.py
│       ├── 🐍 models.py
│       ├── 🐍 schema.py
│       ├── 🐍 services.py
│       ├── 🐍 signals.py
│       ├── 🐍 sitemaps.py
│       ├── 🐍 tasks.py
│       ├── 🐍 urls.py
│       └── 🐍 views.py
├── 📁 backend
│   ├── 📁 settings
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 base.py
│   │   ├── 🐍 development.py
│   │   └── 🐍 production.py
│   ├── 🐍 __init__.py
│   ├── 🐍 asgi.py
│   ├── 🐍 urls.py
│   └── 🐍 wsgi.py
├── 📁 core
│   ├── 🐍 __init__.py
│   ├── 🐍 mixins.py
│   ├── 🐍 pagination.py
│   ├── 🐍 permissions.py
│   └── 🐍 utils.py
├── 📁 posts
│   └── 📁 2026
│       └── 📁 03
│           ├── 🖼️ image.png
│           └── 🖼️ image_Kih0luL.png
├── 📁 requirements
│   ├── 📄 base.txt
│   ├── 📄 development.txt
│   └── 📄 production.txt
├── 📁 static
│   └── 📁 assets
│       ├── 📄 index-BJtHbVKZ.js
│       └── 🎨 index-DDfjWax8.css
├── 📁 staticfiles
│   ├── 📁 admin
│   │   ├── 📁 css
│   │   │   ├── 📁 vendor
│   │   │   │   └── 📁 select2
│   │   │   │       ├── 📝 LICENSE-SELECT2.f94142512c91.md
│   │   │   │       ├── 📦 LICENSE-SELECT2.f94142512c91.md.gz
│   │   │   │       ├── 📝 LICENSE-SELECT2.md
│   │   │   │       ├── 📦 LICENSE-SELECT2.md.gz
│   │   │   │       ├── 🎨 select2.a2194c262648.css
│   │   │   │       ├── 📦 select2.a2194c262648.css.gz
│   │   │   │       ├── 🎨 select2.css
│   │   │   │       ├── 📦 select2.css.gz
│   │   │   │       ├── 🎨 select2.min.9f54e6414f87.css
│   │   │   │       ├── 📦 select2.min.9f54e6414f87.css.gz
│   │   │   │       └── 📦 select2.min.css.gz
│   │   │   ├── 🎨 autocomplete.4a81fc4242d0.css
│   │   │   ├── 📦 autocomplete.4a81fc4242d0.css.gz
│   │   │   ├── 🎨 autocomplete.css
│   │   │   ├── 📦 autocomplete.css.gz
│   │   │   ├── 🎨 base.523eb49842a7.css
│   │   │   ├── 📦 base.523eb49842a7.css.gz
│   │   │   ├── 🎨 base.css
│   │   │   ├── 📦 base.css.gz
│   │   │   ├── 🎨 changelists.9237a1ac391b.css
│   │   │   ├── 📦 changelists.9237a1ac391b.css.gz
│   │   │   ├── 🎨 changelists.css
│   │   │   ├── 📦 changelists.css.gz
│   │   │   ├── 🎨 dark_mode.css
│   │   │   ├── 📦 dark_mode.css.gz
│   │   │   ├── 🎨 dark_mode.ef27a31af300.css
│   │   │   ├── 📦 dark_mode.ef27a31af300.css.gz
│   │   │   ├── 🎨 dashboard.css
│   │   │   ├── 📦 dashboard.css.gz
│   │   │   ├── 🎨 dashboard.e90f2068217b.css
│   │   │   ├── 📦 dashboard.e90f2068217b.css.gz
│   │   │   ├── 🎨 forms.c14e1cb06392.css
│   │   │   ├── 📦 forms.c14e1cb06392.css.gz
│   │   │   ├── 🎨 forms.css
│   │   │   ├── 📦 forms.css.gz
│   │   │   ├── 🎨 login.586129c60a93.css
│   │   │   ├── 📦 login.586129c60a93.css.gz
│   │   │   ├── 🎨 login.css
│   │   │   ├── 📦 login.css.gz
│   │   │   ├── 🎨 nav_sidebar.269a1bd44627.css
│   │   │   ├── 📦 nav_sidebar.269a1bd44627.css.gz
│   │   │   ├── 🎨 nav_sidebar.css
│   │   │   ├── 📦 nav_sidebar.css.gz
│   │   │   ├── 🎨 responsive.css
│   │   │   ├── 📦 responsive.css.gz
│   │   │   ├── 🎨 responsive.f6533dab034d.css
│   │   │   ├── 📦 responsive.f6533dab034d.css.gz
│   │   │   ├── 🎨 responsive_rtl.7d1130848605.css
│   │   │   ├── 📦 responsive_rtl.7d1130848605.css.gz
│   │   │   ├── 🎨 responsive_rtl.css
│   │   │   ├── 📦 responsive_rtl.css.gz
│   │   │   ├── 🎨 rtl.512d4b53fc59.css
│   │   │   ├── 📦 rtl.512d4b53fc59.css.gz
│   │   │   ├── 🎨 rtl.css
│   │   │   ├── 📦 rtl.css.gz
│   │   │   ├── 🎨 widgets.css
│   │   │   ├── 📦 widgets.css.gz
│   │   │   ├── 🎨 widgets.ee33ab26c7c2.css
│   │   │   └── 📦 widgets.ee33ab26c7c2.css.gz
│   │   ├── 📁 img
│   │   │   ├── 📁 gis
│   │   │   │   ├── 🖼️ move_vertex_off.7a23bf31ef8a.svg
│   │   │   │   ├── 📦 move_vertex_off.7a23bf31ef8a.svg.gz
│   │   │   │   ├── 🖼️ move_vertex_off.svg
│   │   │   │   ├── 📦 move_vertex_off.svg.gz
│   │   │   │   ├── 🖼️ move_vertex_on.0047eba25b67.svg
│   │   │   │   ├── 📦 move_vertex_on.0047eba25b67.svg.gz
│   │   │   │   ├── 🖼️ move_vertex_on.svg
│   │   │   │   └── 📦 move_vertex_on.svg.gz
│   │   │   ├── 📄 LICENSE
│   │   │   ├── 📄 LICENSE.2c54f4e1ca1c
│   │   │   ├── 📦 LICENSE.2c54f4e1ca1c.gz
│   │   │   ├── 📦 LICENSE.gz
│   │   │   ├── 📄 README.a70711a38d87.txt
│   │   │   ├── 📦 README.a70711a38d87.txt.gz
│   │   │   ├── 📄 README.txt
│   │   │   ├── 📦 README.txt.gz
│   │   │   ├── 🖼️ calendar-icons.39b290681a8b.svg
│   │   │   ├── 📦 calendar-icons.39b290681a8b.svg.gz
│   │   │   ├── 🖼️ calendar-icons.svg
│   │   │   ├── 📦 calendar-icons.svg.gz
│   │   │   ├── 🖼️ icon-addlink.d519b3bab011.svg
│   │   │   ├── 📦 icon-addlink.d519b3bab011.svg.gz
│   │   │   ├── 🖼️ icon-addlink.svg
│   │   │   ├── 📦 icon-addlink.svg.gz
│   │   │   ├── 🖼️ icon-alert.034cc7d8a67f.svg
│   │   │   ├── 📦 icon-alert.034cc7d8a67f.svg.gz
│   │   │   ├── 🖼️ icon-alert.svg
│   │   │   ├── 📦 icon-alert.svg.gz
│   │   │   ├── 🖼️ icon-calendar.ac7aea671bea.svg
│   │   │   ├── 📦 icon-calendar.ac7aea671bea.svg.gz
│   │   │   ├── 🖼️ icon-calendar.svg
│   │   │   ├── 📦 icon-calendar.svg.gz
│   │   │   ├── 🖼️ icon-changelink.18d2fd706348.svg
│   │   │   ├── 📦 icon-changelink.18d2fd706348.svg.gz
│   │   │   ├── 🖼️ icon-changelink.svg
│   │   │   ├── 📦 icon-changelink.svg.gz
│   │   │   ├── 🖼️ icon-clock.e1d4dfac3f2b.svg
│   │   │   ├── 📦 icon-clock.e1d4dfac3f2b.svg.gz
│   │   │   ├── 🖼️ icon-clock.svg
│   │   │   ├── 📦 icon-clock.svg.gz
│   │   │   ├── 🖼️ icon-deletelink.564ef9dc3854.svg
│   │   │   ├── 📦 icon-deletelink.564ef9dc3854.svg.gz
│   │   │   ├── 🖼️ icon-deletelink.svg
│   │   │   ├── 📦 icon-deletelink.svg.gz
│   │   │   ├── 🖼️ icon-no.439e821418cd.svg
│   │   │   ├── 📦 icon-no.439e821418cd.svg.gz
│   │   │   ├── 🖼️ icon-no.svg
│   │   │   ├── 📦 icon-no.svg.gz
│   │   │   ├── 🖼️ icon-unknown-alt.81536e128bb6.svg
│   │   │   ├── 📦 icon-unknown-alt.81536e128bb6.svg.gz
│   │   │   ├── 🖼️ icon-unknown-alt.svg
│   │   │   ├── 📦 icon-unknown-alt.svg.gz
│   │   │   ├── 🖼️ icon-unknown.a18cb4398978.svg
│   │   │   ├── 📦 icon-unknown.a18cb4398978.svg.gz
│   │   │   ├── 🖼️ icon-unknown.svg
│   │   │   ├── 📦 icon-unknown.svg.gz
│   │   │   ├── 🖼️ icon-viewlink.41eb31f7826e.svg
│   │   │   ├── 📦 icon-viewlink.41eb31f7826e.svg.gz
│   │   │   ├── 🖼️ icon-viewlink.svg
│   │   │   ├── 📦 icon-viewlink.svg.gz
│   │   │   ├── 🖼️ icon-yes.d2f9f035226a.svg
│   │   │   ├── 📦 icon-yes.d2f9f035226a.svg.gz
│   │   │   ├── 🖼️ icon-yes.svg
│   │   │   ├── 📦 icon-yes.svg.gz
│   │   │   ├── 🖼️ inline-delete.fec1b761f254.svg
│   │   │   ├── 📦 inline-delete.fec1b761f254.svg.gz
│   │   │   ├── 🖼️ inline-delete.svg
│   │   │   ├── 📦 inline-delete.svg.gz
│   │   │   ├── 🖼️ search.7cf54ff789c6.svg
│   │   │   ├── 📦 search.7cf54ff789c6.svg.gz
│   │   │   ├── 🖼️ search.svg
│   │   │   ├── 📦 search.svg.gz
│   │   │   ├── 🖼️ selector-icons.b4555096cea2.svg
│   │   │   ├── 📦 selector-icons.b4555096cea2.svg.gz
│   │   │   ├── 🖼️ selector-icons.svg
│   │   │   ├── 📦 selector-icons.svg.gz
│   │   │   ├── 🖼️ sorting-icons.3a097b59f104.svg
│   │   │   ├── 📦 sorting-icons.3a097b59f104.svg.gz
│   │   │   ├── 🖼️ sorting-icons.svg
│   │   │   ├── 📦 sorting-icons.svg.gz
│   │   │   ├── 🖼️ tooltag-add.e59d620a9742.svg
│   │   │   ├── 📦 tooltag-add.e59d620a9742.svg.gz
│   │   │   ├── 🖼️ tooltag-add.svg
│   │   │   ├── 📦 tooltag-add.svg.gz
│   │   │   ├── 🖼️ tooltag-arrowright.bbfb788a849e.svg
│   │   │   ├── 📦 tooltag-arrowright.bbfb788a849e.svg.gz
│   │   │   ├── 🖼️ tooltag-arrowright.svg
│   │   │   └── 📦 tooltag-arrowright.svg.gz
│   │   └── 📁 js
│   │       ├── 📁 admin
│   │       │   ├── 📄 DateTimeShortcuts.9f6e209cebca.js
│   │       │   ├── 📦 DateTimeShortcuts.9f6e209cebca.js.gz
│   │       │   ├── 📄 DateTimeShortcuts.js
│   │       │   ├── 📦 DateTimeShortcuts.js.gz
│   │       │   ├── 📄 RelatedObjectLookups.8609f99b9ab2.js
│   │       │   ├── 📦 RelatedObjectLookups.8609f99b9ab2.js.gz
│   │       │   ├── 📄 RelatedObjectLookups.js
│   │       │   └── 📦 RelatedObjectLookups.js.gz
│   │       ├── 📁 vendor
│   │       │   ├── 📁 jquery
│   │       │   │   ├── 📄 LICENSE.de877aa6d744.txt
│   │       │   │   ├── 📦 LICENSE.de877aa6d744.txt.gz
│   │       │   │   ├── 📄 LICENSE.txt
│   │       │   │   ├── 📦 LICENSE.txt.gz
│   │       │   │   ├── 📄 jquery.0208b96062ba.js
│   │       │   │   ├── 📦 jquery.0208b96062ba.js.gz
│   │       │   │   ├── 📄 jquery.js
│   │       │   │   ├── 📦 jquery.js.gz
│   │       │   │   ├── 📄 jquery.min.641dd1437010.js
│   │       │   │   ├── 📦 jquery.min.641dd1437010.js.gz
│   │       │   │   └── 📦 jquery.min.js.gz
│   │       │   ├── 📁 select2
│   │       │   │   ├── 📁 i18n
│   │       │   │   │   ├── 📄 af.4f6fcd73488c.js
│   │       │   │   │   ├── 📦 af.4f6fcd73488c.js.gz
│   │       │   │   │   ├── 📄 af.js
│   │       │   │   │   ├── 📦 af.js.gz
│   │       │   │   │   ├── 📄 ar.65aa8e36bf5d.js
│   │       │   │   │   ├── 📦 ar.65aa8e36bf5d.js.gz
│   │       │   │   │   ├── 📄 ar.js
│   │       │   │   │   ├── 📦 ar.js.gz
│   │       │   │   │   ├── 📄 az.270c257daf81.js
│   │       │   │   │   ├── 📦 az.270c257daf81.js.gz
│   │       │   │   │   ├── 📄 az.js
│   │       │   │   │   ├── 📦 az.js.gz
│   │       │   │   │   ├── 📄 bg.39b8be30d4f0.js
│   │       │   │   │   ├── 📦 bg.39b8be30d4f0.js.gz
│   │       │   │   │   ├── 📄 bg.js
│   │       │   │   │   ├── 📦 bg.js.gz
│   │       │   │   │   ├── 📄 bn.6d42b4dd5665.js
│   │       │   │   │   ├── 📦 bn.6d42b4dd5665.js.gz
│   │       │   │   │   ├── 📄 bn.js
│   │       │   │   │   ├── 📦 bn.js.gz
│   │       │   │   │   ├── 📄 bs.91624382358e.js
│   │       │   │   │   ├── 📦 bs.91624382358e.js.gz
│   │       │   │   │   ├── 📄 bs.js
│   │       │   │   │   ├── 📦 bs.js.gz
│   │       │   │   │   ├── 📄 ca.a166b745933a.js
│   │       │   │   │   ├── 📦 ca.a166b745933a.js.gz
│   │       │   │   │   ├── 📄 ca.js
│   │       │   │   │   ├── 📦 ca.js.gz
│   │       │   │   │   ├── 📄 cs.4f43e8e7d33a.js
│   │       │   │   │   ├── 📦 cs.4f43e8e7d33a.js.gz
│   │       │   │   │   ├── 📄 cs.js
│   │       │   │   │   ├── 📦 cs.js.gz
│   │       │   │   │   ├── 📄 da.766346afe4dd.js
│   │       │   │   │   ├── 📦 da.766346afe4dd.js.gz
│   │       │   │   │   ├── 📄 da.js
│   │       │   │   │   ├── 📦 da.js.gz
│   │       │   │   │   ├── 📄 de.8a1c222b0204.js
│   │       │   │   │   ├── 📦 de.8a1c222b0204.js.gz
│   │       │   │   │   ├── 📄 de.js
│   │       │   │   │   ├── 📦 de.js.gz
│   │       │   │   │   ├── 📄 dsb.56372c92d2f1.js
│   │       │   │   │   ├── 📦 dsb.56372c92d2f1.js.gz
│   │       │   │   │   ├── 📄 dsb.js
│   │       │   │   │   ├── 📦 dsb.js.gz
│   │       │   │   │   ├── 📄 el.27097f071856.js
│   │       │   │   │   ├── 📦 el.27097f071856.js.gz
│   │       │   │   │   ├── 📄 el.js
│   │       │   │   │   ├── 📦 el.js.gz
│   │       │   │   │   ├── 📄 en.cf932ba09a98.js
│   │       │   │   │   ├── 📦 en.cf932ba09a98.js.gz
│   │       │   │   │   ├── 📄 en.js
│   │       │   │   │   ├── 📦 en.js.gz
│   │       │   │   │   ├── 📄 es.66dbc2652fb1.js
│   │       │   │   │   ├── 📦 es.66dbc2652fb1.js.gz
│   │       │   │   │   ├── 📄 es.js
│   │       │   │   │   ├── 📦 es.js.gz
│   │       │   │   │   ├── 📄 et.2b96fd98289d.js
│   │       │   │   │   ├── 📦 et.2b96fd98289d.js.gz
│   │       │   │   │   ├── 📄 et.js
│   │       │   │   │   ├── 📦 et.js.gz
│   │       │   │   │   ├── 📄 eu.adfe5c97b72c.js
│   │       │   │   │   ├── 📦 eu.adfe5c97b72c.js.gz
│   │       │   │   │   ├── 📄 eu.js
│   │       │   │   │   ├── 📦 eu.js.gz
│   │       │   │   │   ├── 📄 fa.3b5bd1961cfd.js
│   │       │   │   │   ├── 📦 fa.3b5bd1961cfd.js.gz
│   │       │   │   │   ├── 📄 fa.js
│   │       │   │   │   ├── 📦 fa.js.gz
│   │       │   │   │   ├── 📄 fi.614ec42aa9ba.js
│   │       │   │   │   ├── 📦 fi.614ec42aa9ba.js.gz
│   │       │   │   │   ├── 📄 fi.js
│   │       │   │   │   ├── 📦 fi.js.gz
│   │       │   │   │   ├── 📄 fr.05e0542fcfe6.js
│   │       │   │   │   ├── 📦 fr.05e0542fcfe6.js.gz
│   │       │   │   │   ├── 📄 fr.js
│   │       │   │   │   ├── 📦 fr.js.gz
│   │       │   │   │   ├── 📄 gl.d99b1fedaa86.js
│   │       │   │   │   ├── 📦 gl.d99b1fedaa86.js.gz
│   │       │   │   │   ├── 📄 gl.js
│   │       │   │   │   ├── 📦 gl.js.gz
│   │       │   │   │   ├── 📄 he.e420ff6cd3ed.js
│   │       │   │   │   ├── 📦 he.e420ff6cd3ed.js.gz
│   │       │   │   │   ├── 📄 he.js
│   │       │   │   │   ├── 📦 he.js.gz
│   │       │   │   │   ├── 📄 hi.70640d41628f.js
│   │       │   │   │   ├── 📦 hi.70640d41628f.js.gz
│   │       │   │   │   ├── 📄 hi.js
│   │       │   │   │   ├── 📦 hi.js.gz
│   │       │   │   │   ├── 📄 hr.a2b092cc1147.js
│   │       │   │   │   ├── 📦 hr.a2b092cc1147.js.gz
│   │       │   │   │   ├── 📄 hr.js
│   │       │   │   │   ├── 📦 hr.js.gz
│   │       │   │   │   ├── 📄 hsb.fa3b55265efe.js
│   │       │   │   │   ├── 📦 hsb.fa3b55265efe.js.gz
│   │       │   │   │   ├── 📄 hsb.js
│   │       │   │   │   ├── 📦 hsb.js.gz
│   │       │   │   │   ├── 📄 hu.6ec6039cb8a3.js
│   │       │   │   │   ├── 📦 hu.6ec6039cb8a3.js.gz
│   │       │   │   │   ├── 📄 hu.js
│   │       │   │   │   ├── 📦 hu.js.gz
│   │       │   │   │   ├── 📄 hy.c7babaeef5a6.js
│   │       │   │   │   ├── 📦 hy.c7babaeef5a6.js.gz
│   │       │   │   │   ├── 📄 hy.js
│   │       │   │   │   ├── 📦 hy.js.gz
│   │       │   │   │   ├── 📄 id.04debded514d.js
│   │       │   │   │   ├── 📦 id.04debded514d.js.gz
│   │       │   │   │   ├── 📄 id.js
│   │       │   │   │   ├── 📦 id.js.gz
│   │       │   │   │   ├── 📄 is.3ddd9a6a97e9.js
│   │       │   │   │   ├── 📦 is.3ddd9a6a97e9.js.gz
│   │       │   │   │   ├── 📄 is.js
│   │       │   │   │   ├── 📦 is.js.gz
│   │       │   │   │   ├── 📄 it.be4fe8d365b5.js
│   │       │   │   │   ├── 📦 it.be4fe8d365b5.js.gz
│   │       │   │   │   ├── 📄 it.js
│   │       │   │   │   ├── 📦 it.js.gz
│   │       │   │   │   ├── 📄 ja.170ae885d74f.js
│   │       │   │   │   ├── 📦 ja.170ae885d74f.js.gz
│   │       │   │   │   ├── 📄 ja.js
│   │       │   │   │   ├── 📦 ja.js.gz
│   │       │   │   │   ├── 📄 ka.2083264a54f0.js
│   │       │   │   │   ├── 📦 ka.2083264a54f0.js.gz
│   │       │   │   │   ├── 📄 ka.js
│   │       │   │   │   ├── 📦 ka.js.gz
│   │       │   │   │   ├── 📄 km.c23089cb06ca.js
│   │       │   │   │   ├── 📦 km.c23089cb06ca.js.gz
│   │       │   │   │   ├── 📄 km.js
│   │       │   │   │   ├── 📦 km.js.gz
│   │       │   │   │   ├── 📄 ko.e7be6c20e673.js
│   │       │   │   │   ├── 📦 ko.e7be6c20e673.js.gz
│   │       │   │   │   ├── 📄 ko.js
│   │       │   │   │   ├── 📦 ko.js.gz
│   │       │   │   │   ├── 📄 lt.23c7ce903300.js
│   │       │   │   │   ├── 📦 lt.23c7ce903300.js.gz
│   │       │   │   │   ├── 📄 lt.js
│   │       │   │   │   ├── 📦 lt.js.gz
│   │       │   │   │   ├── 📄 lv.08e62128eac1.js
│   │       │   │   │   ├── 📦 lv.08e62128eac1.js.gz
│   │       │   │   │   ├── 📄 lv.js
│   │       │   │   │   ├── 📦 lv.js.gz
│   │       │   │   │   ├── 📄 mk.dabbb9087130.js
│   │       │   │   │   ├── 📦 mk.dabbb9087130.js.gz
│   │       │   │   │   ├── 📄 mk.js
│   │       │   │   │   ├── 📦 mk.js.gz
│   │       │   │   │   ├── 📄 ms.4ba82c9a51ce.js
│   │       │   │   │   ├── 📦 ms.4ba82c9a51ce.js.gz
│   │       │   │   │   ├── 📄 ms.js
│   │       │   │   │   ├── 📦 ms.js.gz
│   │       │   │   │   ├── 📄 nb.da2fce143f27.js
│   │       │   │   │   ├── 📦 nb.da2fce143f27.js.gz
│   │       │   │   │   ├── 📄 nb.js
│   │       │   │   │   ├── 📦 nb.js.gz
│   │       │   │   │   ├── 📄 ne.3d79fd3f08db.js
│   │       │   │   │   ├── 📦 ne.3d79fd3f08db.js.gz
│   │       │   │   │   ├── 📄 ne.js
│   │       │   │   │   ├── 📦 ne.js.gz
│   │       │   │   │   ├── 📄 nl.997868a37ed8.js
│   │       │   │   │   ├── 📦 nl.997868a37ed8.js.gz
│   │       │   │   │   ├── 📄 nl.js
│   │       │   │   │   ├── 📦 nl.js.gz
│   │       │   │   │   ├── 📄 pl.6031b4f16452.js
│   │       │   │   │   ├── 📦 pl.6031b4f16452.js.gz
│   │       │   │   │   ├── 📄 pl.js
│   │       │   │   │   ├── 📦 pl.js.gz
│   │       │   │   │   ├── 📄 ps.38dfa47af9e0.js
│   │       │   │   │   ├── 📦 ps.38dfa47af9e0.js.gz
│   │       │   │   │   ├── 📄 ps.js
│   │       │   │   │   ├── 📦 ps.js.gz
│   │       │   │   │   ├── 📄 pt-BR.e1b294433e7f.js
│   │       │   │   │   ├── 📦 pt-BR.e1b294433e7f.js.gz
│   │       │   │   │   ├── 📄 pt-BR.js
│   │       │   │   │   ├── 📦 pt-BR.js.gz
│   │       │   │   │   ├── 📄 pt.33b4a3b44d43.js
│   │       │   │   │   ├── 📦 pt.33b4a3b44d43.js.gz
│   │       │   │   │   ├── 📄 pt.js
│   │       │   │   │   ├── 📦 pt.js.gz
│   │       │   │   │   ├── 📄 ro.f75cb460ec3b.js
│   │       │   │   │   ├── 📦 ro.f75cb460ec3b.js.gz
│   │       │   │   │   ├── 📄 ro.js
│   │       │   │   │   ├── 📦 ro.js.gz
│   │       │   │   │   ├── 📄 ru.934aa95f5b5f.js
│   │       │   │   │   ├── 📦 ru.934aa95f5b5f.js.gz
│   │       │   │   │   ├── 📄 ru.js
│   │       │   │   │   ├── 📦 ru.js.gz
│   │       │   │   │   ├── 📄 sk.33d02cef8d11.js
│   │       │   │   │   ├── 📦 sk.33d02cef8d11.js.gz
│   │       │   │   │   ├── 📄 sk.js
│   │       │   │   │   ├── 📦 sk.js.gz
│   │       │   │   │   ├── 📄 sl.131a78bc0752.js
│   │       │   │   │   ├── 📦 sl.131a78bc0752.js.gz
│   │       │   │   │   ├── 📄 sl.js
│   │       │   │   │   ├── 📦 sl.js.gz
│   │       │   │   │   ├── 📄 sq.5636b60d29c9.js
│   │       │   │   │   ├── 📦 sq.5636b60d29c9.js.gz
│   │       │   │   │   ├── 📄 sq.js
│   │       │   │   │   ├── 📦 sq.js.gz
│   │       │   │   │   ├── 📄 sr-Cyrl.f254bb8c4c7c.js
│   │       │   │   │   ├── 📦 sr-Cyrl.f254bb8c4c7c.js.gz
│   │       │   │   │   ├── 📄 sr-Cyrl.js
│   │       │   │   │   ├── 📦 sr-Cyrl.js.gz
│   │       │   │   │   ├── 📄 sr.5ed85a48f483.js
│   │       │   │   │   ├── 📦 sr.5ed85a48f483.js.gz
│   │       │   │   │   ├── 📄 sr.js
│   │       │   │   │   ├── 📦 sr.js.gz
│   │       │   │   │   ├── 📄 sv.7a9c2f71e777.js
│   │       │   │   │   ├── 📦 sv.7a9c2f71e777.js.gz
│   │       │   │   │   ├── 📄 sv.js
│   │       │   │   │   ├── 📦 sv.js.gz
│   │       │   │   │   ├── 📄 th.f38c20b0221b.js
│   │       │   │   │   ├── 📦 th.f38c20b0221b.js.gz
│   │       │   │   │   ├── 📄 th.js
│   │       │   │   │   ├── 📦 th.js.gz
│   │       │   │   │   ├── 📄 tk.7c572a68c78f.js
│   │       │   │   │   ├── 📦 tk.7c572a68c78f.js.gz
│   │       │   │   │   ├── 📄 tk.js
│   │       │   │   │   ├── 📦 tk.js.gz
│   │       │   │   │   ├── 📄 tr.b5a0643d1545.js
│   │       │   │   │   ├── 📦 tr.b5a0643d1545.js.gz
│   │       │   │   │   ├── 📄 tr.js
│   │       │   │   │   ├── 📦 tr.js.gz
│   │       │   │   │   ├── 📄 uk.8cede7f4803c.js
│   │       │   │   │   ├── 📦 uk.8cede7f4803c.js.gz
│   │       │   │   │   ├── 📄 uk.js
│   │       │   │   │   ├── 📦 uk.js.gz
│   │       │   │   │   ├── 📄 vi.097a5b75b3e1.js
│   │       │   │   │   ├── 📦 vi.097a5b75b3e1.js.gz
│   │       │   │   │   ├── 📄 vi.js
│   │       │   │   │   ├── 📦 vi.js.gz
│   │       │   │   │   ├── 📄 zh-CN.2cff662ec5f9.js
│   │       │   │   │   ├── 📦 zh-CN.2cff662ec5f9.js.gz
│   │       │   │   │   ├── 📄 zh-CN.js
│   │       │   │   │   ├── 📦 zh-CN.js.gz
│   │       │   │   │   ├── 📄 zh-TW.04554a227c2b.js
│   │       │   │   │   ├── 📦 zh-TW.04554a227c2b.js.gz
│   │       │   │   │   ├── 📄 zh-TW.js
│   │       │   │   │   └── 📦 zh-TW.js.gz
│   │       │   │   ├── 📝 LICENSE.f94142512c91.md
│   │       │   │   ├── 📦 LICENSE.f94142512c91.md.gz
│   │       │   │   ├── 📝 LICENSE.md
│   │       │   │   ├── 📦 LICENSE.md.gz
│   │       │   │   ├── 📄 select2.full.c2afdeda3058.js
│   │       │   │   ├── 📦 select2.full.c2afdeda3058.js.gz
│   │       │   │   ├── 📄 select2.full.js
│   │       │   │   ├── 📦 select2.full.js.gz
│   │       │   │   ├── 📄 select2.full.min.fcd7500d8e13.js
│   │       │   │   ├── 📦 select2.full.min.fcd7500d8e13.js.gz
│   │       │   │   └── 📦 select2.full.min.js.gz
│   │       │   └── 📁 xregexp
│   │       │       ├── 📄 LICENSE.bf79e414957a.txt
│   │       │       ├── 📦 LICENSE.bf79e414957a.txt.gz
│   │       │       ├── 📄 LICENSE.txt
│   │       │       ├── 📦 LICENSE.txt.gz
│   │       │       ├── 📄 xregexp.efda034b9537.js
│   │       │       ├── 📦 xregexp.efda034b9537.js.gz
│   │       │       ├── 📄 xregexp.js
│   │       │       ├── 📦 xregexp.js.gz
│   │       │       ├── 📄 xregexp.min.b0439563a5d3.js
│   │       │       ├── 📦 xregexp.min.b0439563a5d3.js.gz
│   │       │       └── 📦 xregexp.min.js.gz
│   │       ├── 📄 SelectBox.7d3ce5a98007.js
│   │       ├── 📦 SelectBox.7d3ce5a98007.js.gz
│   │       ├── 📄 SelectBox.js
│   │       ├── 📦 SelectBox.js.gz
│   │       ├── 📄 SelectFilter2.bdb8d0cc579e.js
│   │       ├── 📦 SelectFilter2.bdb8d0cc579e.js.gz
│   │       ├── 📄 SelectFilter2.js
│   │       ├── 📦 SelectFilter2.js.gz
│   │       ├── 📄 actions.eac7e3441574.js
│   │       ├── 📦 actions.eac7e3441574.js.gz
│   │       ├── 📄 actions.js
│   │       ├── 📦 actions.js.gz
│   │       ├── 📄 autocomplete.01591ab27be7.js
│   │       ├── 📦 autocomplete.01591ab27be7.js.gz
│   │       ├── 📄 autocomplete.js
│   │       ├── 📦 autocomplete.js.gz
│   │       ├── 📄 calendar.f8a5d055eb33.js
│   │       ├── 📦 calendar.f8a5d055eb33.js.gz
│   │       ├── 📄 calendar.js
│   │       ├── 📦 calendar.js.gz
│   │       ├── 📄 cancel.ecc4c5ca7b32.js
│   │       ├── 📦 cancel.ecc4c5ca7b32.js.gz
│   │       ├── 📄 cancel.js
│   │       ├── 📦 cancel.js.gz
│   │       ├── 📄 change_form.9d8ca4f96b75.js
│   │       ├── 📦 change_form.9d8ca4f96b75.js.gz
│   │       ├── 📄 change_form.js
│   │       ├── 📦 change_form.js.gz
│   │       ├── 📄 collapse.f84e7410290f.js
│   │       ├── 📦 collapse.f84e7410290f.js.gz
│   │       ├── 📄 collapse.js
│   │       ├── 📦 collapse.js.gz
│   │       ├── 📄 core.cf103cd04ebf.js
│   │       ├── 📦 core.cf103cd04ebf.js.gz
│   │       ├── 📄 core.js
│   │       ├── 📦 core.js.gz
│   │       ├── 📄 filters.0e360b7a9f80.js
│   │       ├── 📦 filters.0e360b7a9f80.js.gz
│   │       ├── 📄 filters.js
│   │       ├── 📦 filters.js.gz
│   │       ├── 📄 inlines.22d4d93c00b4.js
│   │       ├── 📦 inlines.22d4d93c00b4.js.gz
│   │       ├── 📄 inlines.js
│   │       ├── 📦 inlines.js.gz
│   │       ├── 📄 jquery.init.b7781a0897fc.js
│   │       ├── 📦 jquery.init.b7781a0897fc.js.gz
│   │       ├── 📄 jquery.init.js
│   │       ├── 📦 jquery.init.js.gz
│   │       ├── 📄 nav_sidebar.3b9190d420b1.js
│   │       ├── 📦 nav_sidebar.3b9190d420b1.js.gz
│   │       ├── 📄 nav_sidebar.js
│   │       ├── 📦 nav_sidebar.js.gz
│   │       ├── 📄 popup_response.c6cc78ea5551.js
│   │       ├── 📦 popup_response.c6cc78ea5551.js.gz
│   │       ├── 📄 popup_response.js
│   │       ├── 📦 popup_response.js.gz
│   │       ├── 📄 prepopulate.bd2361dfd64d.js
│   │       ├── 📦 prepopulate.bd2361dfd64d.js.gz
│   │       ├── 📄 prepopulate.js
│   │       ├── 📦 prepopulate.js.gz
│   │       ├── 📄 prepopulate_init.6cac7f3105b8.js
│   │       ├── 📦 prepopulate_init.6cac7f3105b8.js.gz
│   │       ├── 📄 prepopulate_init.js
│   │       ├── 📦 prepopulate_init.js.gz
│   │       ├── 📄 theme.ab270f56bb9c.js
│   │       ├── 📦 theme.ab270f56bb9c.js.gz
│   │       ├── 📄 theme.js
│   │       ├── 📦 theme.js.gz
│   │       ├── 📄 urlify.ae970a820212.js
│   │       ├── 📦 urlify.ae970a820212.js.gz
│   │       ├── 📄 urlify.js
│   │       └── 📦 urlify.js.gz
│   ├── 📁 assets
│   │   ├── 📄 index-BJtHbVKZ.197b0b24445c.js
│   │   ├── 📦 index-BJtHbVKZ.197b0b24445c.js.gz
│   │   ├── 📄 index-BJtHbVKZ.js
│   │   ├── 📦 index-BJtHbVKZ.js.gz
│   │   ├── 🎨 index-DDfjWax8.3f9fd85e88b3.css
│   │   ├── 📦 index-DDfjWax8.3f9fd85e88b3.css.gz
│   │   ├── 🎨 index-DDfjWax8.css
│   │   └── 📦 index-DDfjWax8.css.gz
│   ├── 📁 debug_toolbar
│   │   ├── 📁 css
│   │   │   ├── 🎨 print.css
│   │   │   ├── 🎨 print.fe959e423a6a.css
│   │   │   ├── 🎨 toolbar.css
│   │   │   ├── 📦 toolbar.css.gz
│   │   │   ├── 🎨 toolbar.d1b9b93e0e7a.css
│   │   │   └── 📦 toolbar.d1b9b93e0e7a.css.gz
│   │   └── 📁 js
│   │       ├── 📄 history.174de637fb55.js
│   │       ├── 📦 history.174de637fb55.js.gz
│   │       ├── 📄 history.js
│   │       ├── 📦 history.js.gz
│   │       ├── 📄 redirect.d643ba40b49f.js
│   │       ├── 📄 redirect.js
│   │       ├── 📄 timer.1c46156d9973.js
│   │       ├── 📦 timer.1c46156d9973.js.gz
│   │       ├── 📄 timer.js
│   │       ├── 📦 timer.js.gz
│   │       ├── 📄 toolbar.f7a2eeaa7a70.js
│   │       ├── 📦 toolbar.f7a2eeaa7a70.js.gz
│   │       ├── 📄 toolbar.js
│   │       ├── 📦 toolbar.js.gz
│   │       ├── 📄 utils.67d1dd5de37b.js
│   │       ├── 📦 utils.67d1dd5de37b.js.gz
│   │       ├── 📄 utils.js
│   │       └── 📦 utils.js.gz
│   ├── 📁 rest_framework
│   │   ├── 📁 css
│   │   │   ├── 🎨 bootstrap-theme.min.1d4b05b397c3.css
│   │   │   ├── 📦 bootstrap-theme.min.1d4b05b397c3.css.gz
│   │   │   ├── 📦 bootstrap-theme.min.css.51806092cc05.map.gz
│   │   │   ├── 📦 bootstrap-theme.min.css.gz
│   │   │   ├── 📦 bootstrap-theme.min.css.map.gz
│   │   │   ├── 🎨 bootstrap-tweaks.css
│   │   │   ├── 📦 bootstrap-tweaks.css.gz
│   │   │   ├── 🎨 bootstrap-tweaks.ee4ee6acf9eb.css
│   │   │   ├── 📦 bootstrap-tweaks.ee4ee6acf9eb.css.gz
│   │   │   ├── 📦 bootstrap.min.css.cafbda9c0e9e.map.gz
│   │   │   ├── 📦 bootstrap.min.css.gz
│   │   │   ├── 📦 bootstrap.min.css.map.gz
│   │   │   ├── 🎨 bootstrap.min.f17d4516b026.css
│   │   │   ├── 📦 bootstrap.min.f17d4516b026.css.gz
│   │   │   ├── 🎨 default.789dfb5732d7.css
│   │   │   ├── 📦 default.789dfb5732d7.css.gz
│   │   │   ├── 🎨 default.css
│   │   │   ├── 📦 default.css.gz
│   │   │   ├── 🎨 font-awesome-4.0.3.c1e1ea213abf.css
│   │   │   ├── 📦 font-awesome-4.0.3.c1e1ea213abf.css.gz
│   │   │   ├── 🎨 font-awesome-4.0.3.css
│   │   │   ├── 📦 font-awesome-4.0.3.css.gz
│   │   │   ├── 🎨 prettify.a987f72342ee.css
│   │   │   ├── 📦 prettify.a987f72342ee.css.gz
│   │   │   ├── 🎨 prettify.css
│   │   │   └── 📦 prettify.css.gz
│   │   ├── 📁 docs
│   │   │   ├── 📁 css
│   │   │   │   ├── 🎨 base.css
│   │   │   │   ├── 📦 base.css.gz
│   │   │   │   ├── 🎨 base.e630f8f4990e.css
│   │   │   │   ├── 📦 base.e630f8f4990e.css.gz
│   │   │   │   ├── 🎨 highlight.css
│   │   │   │   ├── 📦 highlight.css.gz
│   │   │   │   ├── 🎨 highlight.e0e4d973c6d7.css
│   │   │   │   ├── 📦 highlight.e0e4d973c6d7.css.gz
│   │   │   │   ├── 🎨 jquery.json-view.min.a2e6beeb6710.css
│   │   │   │   ├── 📦 jquery.json-view.min.a2e6beeb6710.css.gz
│   │   │   │   └── 📦 jquery.json-view.min.css.gz
│   │   │   ├── 📁 img
│   │   │   │   ├── 📄 favicon.5195b4d0f3eb.ico
│   │   │   │   ├── 📦 favicon.5195b4d0f3eb.ico.gz
│   │   │   │   ├── 📄 favicon.ico
│   │   │   │   ├── 📦 favicon.ico.gz
│   │   │   │   ├── 🖼️ grid.a4b938cf382b.png
│   │   │   │   └── 🖼️ grid.png
│   │   │   └── 📁 js
│   │   │       ├── 📄 api.18a5ba8a1bd8.js
│   │   │       ├── 📦 api.18a5ba8a1bd8.js.gz
│   │   │       ├── 📄 api.js
│   │   │       ├── 📦 api.js.gz
│   │   │       ├── 📄 highlight.pack.479b5f21dcba.js
│   │   │       ├── 📦 highlight.pack.479b5f21dcba.js.gz
│   │   │       ├── 📄 highlight.pack.js
│   │   │       ├── 📦 highlight.pack.js.gz
│   │   │       ├── 📄 jquery.json-view.min.b7c2d6981377.js
│   │   │       ├── 📦 jquery.json-view.min.b7c2d6981377.js.gz
│   │   │       └── 📦 jquery.json-view.min.js.gz
│   │   ├── 📁 fonts
│   │   │   ├── 📄 fontawesome-webfont.3293616ec0c6.woff
│   │   │   ├── 🖼️ fontawesome-webfont.83e37a11f9d7.svg
│   │   │   ├── 📦 fontawesome-webfont.83e37a11f9d7.svg.gz
│   │   │   ├── 📄 fontawesome-webfont.8b27bc96115c.eot
│   │   │   ├── 📄 fontawesome-webfont.dcb26c7239d8.ttf
│   │   │   ├── 📦 fontawesome-webfont.dcb26c7239d8.ttf.gz
│   │   │   ├── 📄 fontawesome-webfont.eot
│   │   │   ├── 🖼️ fontawesome-webfont.svg
│   │   │   ├── 📦 fontawesome-webfont.svg.gz
│   │   │   ├── 📄 fontawesome-webfont.ttf
│   │   │   ├── 📦 fontawesome-webfont.ttf.gz
│   │   │   ├── 📄 fontawesome-webfont.woff
│   │   │   ├── 🖼️ glyphicons-halflings-regular.08eda92397ae.svg
│   │   │   ├── 📦 glyphicons-halflings-regular.08eda92397ae.svg.gz
│   │   │   ├── 📄 glyphicons-halflings-regular.448c34a56d69.woff2
│   │   │   ├── 📄 glyphicons-halflings-regular.e18bbf611f2a.ttf
│   │   │   ├── 📦 glyphicons-halflings-regular.e18bbf611f2a.ttf.gz
│   │   │   ├── 📄 glyphicons-halflings-regular.eot
│   │   │   ├── 📄 glyphicons-halflings-regular.f4769f9bdb74.eot
│   │   │   ├── 📄 glyphicons-halflings-regular.fa2772327f55.woff
│   │   │   ├── 🖼️ glyphicons-halflings-regular.svg
│   │   │   ├── 📦 glyphicons-halflings-regular.svg.gz
│   │   │   ├── 📄 glyphicons-halflings-regular.ttf
│   │   │   ├── 📦 glyphicons-halflings-regular.ttf.gz
│   │   │   ├── 📄 glyphicons-halflings-regular.woff
│   │   │   └── 📄 glyphicons-halflings-regular.woff2
│   │   ├── 📁 img
│   │   │   ├── 🖼️ glyphicons-halflings-white.9bbc6e960299.png
│   │   │   ├── 🖼️ glyphicons-halflings-white.png
│   │   │   ├── 🖼️ glyphicons-halflings.90233c9067e9.png
│   │   │   ├── 🖼️ glyphicons-halflings.png
│   │   │   ├── 🖼️ grid.a4b938cf382b.png
│   │   │   └── 🖼️ grid.png
│   │   └── 📁 js
│   │       ├── 📄 ajax-form.4e1cdcb7acab.js
│   │       ├── 📦 ajax-form.4e1cdcb7acab.js.gz
│   │       ├── 📄 ajax-form.js
│   │       ├── 📦 ajax-form.js.gz
│   │       ├── 📄 bootstrap.min.2f34b630ffe3.js
│   │       ├── 📦 bootstrap.min.2f34b630ffe3.js.gz
│   │       ├── 📦 bootstrap.min.js.gz
│   │       ├── 📄 coreapi-0.1.1.e580e3854595.js
│   │       ├── 📦 coreapi-0.1.1.e580e3854595.js.gz
│   │       ├── 📄 coreapi-0.1.1.js
│   │       ├── 📦 coreapi-0.1.1.js.gz
│   │       ├── 📄 csrf.455080a7b2ce.js
│   │       ├── 📦 csrf.455080a7b2ce.js.gz
│   │       ├── 📄 csrf.js
│   │       ├── 📦 csrf.js.gz
│   │       ├── 📄 default.5b08897dbdc3.js
│   │       ├── 📦 default.5b08897dbdc3.js.gz
│   │       ├── 📄 default.js
│   │       ├── 📦 default.js.gz
│   │       ├── 📄 jquery-3.7.1.min.2c872dbe60f4.js
│   │       ├── 📦 jquery-3.7.1.min.2c872dbe60f4.js.gz
│   │       ├── 📦 jquery-3.7.1.min.js.gz
│   │       ├── 📄 load-ajax-form.8cdb3a9f3466.js
│   │       ├── 📄 load-ajax-form.js
│   │       ├── 📄 prettify-min.709bfcc456c6.js
│   │       ├── 📦 prettify-min.709bfcc456c6.js.gz
│   │       ├── 📄 prettify-min.js
│   │       └── 📦 prettify-min.js.gz
│   ├── 🌐 index.bd1eb401ff45.html
│   ├── 📦 index.bd1eb401ff45.html.gz
│   ├── 🌐 index.html
│   ├── 📦 index.html.gz
│   └── ⚙️ staticfiles.json
├── 📁 templates
│   └── 🌐 index.html
├── 📁 tools
│   └── 🖼️ Media_Dunes_Logo.png
├── ⚙️ .gitignore
├── 🐳 Dockerfile
├── 📝 backend_v2 Tree.md
├── 📄 build.sh
├── 🐍 manage.py
└── ⚙️ pytest.ini
```