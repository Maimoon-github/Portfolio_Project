"""
Django CKEditor 5 custom configuration with SEO plugins.
"""

from django.conf import settings

# Configuration for CKEditor 5 with SEO plugins
CKEDITOR_5_CONFIGS = {
    'default': {
        'toolbar': [
            'heading', '|', 
            'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
            'outdent', 'indent', '|',
            'blockQuote', 'insertTable', '|',
            'imageUpload', 'mediaEmbed', '|',
            'undo', 'redo',
        ],
        'language': 'en',
        'image': {
            'toolbar': [
                'imageStyle:alignBlockLeft', 'imageStyle:alignCenter', 'imageStyle:alignBlockRight',
                '|',
                'toggleImageCaption', 'imageTextAlternative',
            ]
        },
        'table': {
            'contentToolbar': [
                'tableColumn', 'tableRow', 'mergeTableCells',
                'tableCellProperties', 'tableProperties',
            ],
        },
        'height': '500px',
        'width': '100%',
        'removePlugins': [],
    },
    'seo_editor': {
        'toolbar': [
            'heading', '|', 
            'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
            'outdent', 'indent', '|',
            'blockQuote', 'insertTable', '|',
            'imageUpload', 'mediaEmbed', '|',
            'seoAnalysis', 'keywordDensity', 'readabilityChecker', '|',
            'metaPreview', 'linkSuggester', 'altTextHelper', '|',
            'undo', 'redo',
        ],
        'language': 'en',
        'image': {
            'toolbar': [
                'imageStyle:alignBlockLeft', 'imageStyle:alignCenter', 'imageStyle:alignBlockRight',
                '|',
                'toggleImageCaption', 'imageTextAlternative',
            ]
        },
        'table': {
            'contentToolbar': [
                'tableColumn', 'tableRow', 'mergeTableCells',
                'tableCellProperties', 'tableProperties',
            ],
        },
        'height': '500px',
        'width': '100%',
        'removePlugins': [],
        'extraPlugins': [
            'SeoAnalysisPlugin',
            'KeywordDensityPlugin',
            'ReadabilityAnalyzerPlugin',
            'MetaPreviewPlugin',
            'InternalLinkSuggesterPlugin',
            'AltTextEnforcerPlugin',
            'HeadingStructurePlugin',
        ],
        'seoAnalysis': {
            'apiUrl': '/api/v1/seo/analyze/',
            'autoAnalyze': True,
            'focusKeywordField': 'focus_keyword',
            'refreshRate': 5000, # milliseconds
        },
    },
    'minimal': {
        'toolbar': [
            'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList',
            'blockQuote', 'undo', 'redo',
        ],
        'height': '300px',
        'width': '100%',
    },
}

# Register the custom CKEditor 5 configs with Django settings
if hasattr(settings, 'CKEDITOR_5_CONFIGS'):
    # Merge with existing configs if present
    settings.CKEDITOR_5_CONFIGS.update(CKEDITOR_5_CONFIGS)
else:
    # Set new configs
    settings.CKEDITOR_5_CONFIGS = CKEDITOR_5_CONFIGS
