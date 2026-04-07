(function() {
    let debounceTimer;
    let currentTitle = '';
    let currentContent = '';
    let currentKeyphrase = '';
    let config = {};

    function getCsrfToken() {
        return document.querySelector('[name=csrfmiddlewaretoken]')?.value || config.csrfToken;
    }

    function updateSidebar(data) {
        // SEO Score
        const seoScore = data.seo_score ?? 0;
        const seoScoreElem = document.getElementById('seo-score');
        if (seoScoreElem) {
            seoScoreElem.textContent = seoScore + '/100';
            const fill = document.querySelector('.score-fill');
            if (fill) fill.style.width = seoScore + '%';
            // Color class
            seoScoreElem.className = 'score-value ' + (seoScore >= 70 ? 'good' : (seoScore >= 50 ? 'medium' : 'poor'));
        }
        // Readability Score
        const readability = data.readability_score ?? 0;
        const readabilityElem = document.getElementById('readability-score');
        if (readabilityElem) {
            readabilityElem.textContent = readability + '/100';
            readabilityElem.className = readability >= 60 ? 'good' : readability >= 40 ? 'medium' : 'poor';
        }
        // Word count
        const wordCount = data.word_count ?? 0;
        const wordCountElem = document.getElementById('word-count');
        if (wordCountElem) wordCountElem.textContent = wordCount;
        // Title length
        const titleLength = data.title_length ?? 0;
        const titleLengthElem = document.getElementById('title-length');
        if (titleLengthElem) {
            titleLengthElem.textContent = titleLength;
            titleLengthElem.className = (titleLength >= 30 && titleLength <= 60) ? 'good' : 'warning';
        }
        // Keyphrase checks
        const keyphraseAnalysis = data.keyphrase_analysis || {};
        const inTitle = keyphraseAnalysis.found_in_title ? '✅ Yes' : '❌ No';
        const inFirstPara = keyphraseAnalysis.found_in_first_para ? '✅ Yes' : '❌ No';
        const keyphraseTitleElem = document.getElementById('keyphrase-title');
        if (keyphraseTitleElem) keyphraseTitleElem.textContent = inTitle;
        const keyphraseFirstElem = document.getElementById('keyphrase-first-para');
        if (keyphraseFirstElem) keyphraseFirstElem.textContent = inFirstPara;
        // Suggestions
        const suggestions = data.suggestions || [];
        const suggestionsList = document.getElementById('seo-suggestions-list');
        if (suggestionsList) {
            suggestionsList.innerHTML = suggestions.map(s => `<li>${escapeHtml(s)}</li>`).join('');
        }
        // Readability details
        const readabilityDetails = data.readability_details || {};
        const detailsDiv = document.getElementById('readability-details');
        if (detailsDiv) {
            detailsDiv.innerHTML = `
                <div>Flesch Reading Ease: ${readabilityDetails.flesch_reading_ease?.score ?? '—'}</div>
                <div>Avg. Sentence Length: ${readabilityDetails.avg_sentence_length ?? '—'} words</div>
                <div>Passive Voice: ${readabilityDetails.passive_voice_percentage ?? '—'}%</div>
                <div>Transition Words: ${readabilityDetails.transition_word_percentage ?? '—'}%</div>
            `;
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    function fetchAnalysis() {
        const title = currentTitle;
        const content = currentContent;
        const keyphrase = currentKeyphrase;
        if (!title && !content) return;

        fetch(config.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken()
            },
            body: JSON.stringify({
                title: title,
                body: content,
                focus_keyphrase: keyphrase
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('SEO analysis error:', data.error);
                return;
            }
            updateSidebar(data);
        })
        .catch(err => console.error('Failed to fetch SEO analysis:', err));
    }

    function debounceFetch() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(fetchAnalysis, 800);
    }

    function getFieldValue(selector) {
        const field = document.querySelector(selector);
        return field ? field.value : '';
    }

    function observeFields() {
        // Title field
        const titleField = document.querySelector('#' + config.titleFieldId);
        if (titleField) {
            titleField.addEventListener('input', function(e) {
                currentTitle = e.target.value;
                debounceFetch();
            });
            currentTitle = titleField.value;
        }
        // Content field (assuming it's a textarea or div with contenteditable)
        const contentField = document.querySelector('#' + config.contentFieldId);
        if (contentField) {
            contentField.addEventListener('input', function(e) {
                currentContent = e.target.value;
                debounceFetch();
            });
            currentContent = contentField.value;
        }
        // Focus keyphrase field (from SEO inline)
        const keyphraseField = document.querySelector('#' + config.focusKeyphraseFieldId);
        if (keyphraseField) {
            keyphraseField.addEventListener('input', function(e) {
                currentKeyphrase = e.target.value;
                debounceFetch();
            });
            currentKeyphrase = keyphraseField.value;
        }
        // Initial fetch after a short delay
        setTimeout(fetchAnalysis, 500);
    }

    window.initSeoSidebar = function(cfg) {
        config = cfg;
        observeFields();
    };
})();