// Musicado Theme JavaScript
window.MusicadoApp = (function() {
    'use strict';

    // Global variables
    let currentLanguage = 'en';
    let formData = {};
    let discountModalShown = false;
    let appliedDiscountCode = null;
    let currentlyPlaying = [null, null];

    // MP3 files configuration - Update these with your actual uploaded file names
    const mp3Files = [
        { 
            filename: "wonderlijke-wereld-ai-matelletam.mp3", 
            title: { en: "Wonderlijke wereld van AI - Matelletam", nl: "Wonderlijke wereld van AI - Matelletam" },
            style: { en: "Electronic/Ambient style", nl: "Electronic/Ambient stijl" }
        },
        { 
            filename: "wonderlijke-wereld-ai-rockyrocky.mp3", 
            title: { en: "Wonderlijke wereld van AI - RockyRocky", nl: "Wonderlijke wereld van AI - RockyRocky" },
            style: { en: "Rock/Pop style", nl: "Rock/Pop stijl" }
        },
        { 
            filename: "survivor-eye-of-the-tiger.mp3", 
            title: { en: "Survivor - Eye Of The Tiger", nl: "Survivor - Eye Of The Tiger" },
            style: { en: "Classic Rock style", nl: "Klassieke Rock stijl" }
        },
        { 
            filename: "music-for-vlogs-birthday.mp3", 
            title: { en: "Birthday Celebration", nl: "Verjaardag Viering" },
            style: { en: "Upbeat/Celebration style", nl: "Vrolijke/Viering stijl" }
        }
    ];

    // Subheadline arrays
    const subheadlines = {
        en: [
            "Make Your Loved Ones Happy With Personal Songs",
            "Make Your Loved Ones Happy With Personal Songs in Less than 3 minutes",
            "It's music, but personal",
            "Songs that will not only be stuck in their head, but in their hearts.",
            "Your mom has enough perfume, but does she have a song?",
            "It's not simply a song, it's an emotion.",
            "Make Songs For Your Loved Ones, No Skills Required",
            "Imagine your loved ones singing your songs in the shower",
            "It's not simply music, it's a message",
            "Imagine your favourite song but it's personal and will be remembered forever",
            "You're going to THAT store again to buy the same gift as last year? Give something unique and create songs that make your loved ones smile",
            "It's not a gift you give, it's a gift you feel.",
            "Stop giving lame presents to the people you love, make unique songs that stick.",
            "Remember your favourite song? It's that, but personal for the ones you love.",
            "Remember the gift you got her last year? Neither does she. Try This Unforgettable gift and make your loved ones happy.",
            "The greatest gifts are not wrapped, they're experienced.",
            "Another generic bottle of wine? They have enough of those. Let's create some music that makes a party.",
            "Tired of dull Gifts? You're not alone. Discover the most personal gift in the Netherlands.",
            "It's like a giftcard, but 10 times cooler and it plays on spotify.",
            "It could be played at a party, it could be played at a funeral. It's the gift that always works."
        ],
        nl: [
            "Maak Je Geliefden Blij Met Persoonlijke Liedjes",
            "Maak Je Geliefden Blij Met Persoonlijke Liedjes in Minder dan 3 minuten",
            "Het is muziek, maar dan persoonlijk",
            "Liedjes die niet alleen in hun hoofd blijven hangen, maar in hun hart.",
            "Je moeder heeft genoeg parfum, maar heeft ze wel een liedje?",
            "Het is niet zomaar een liedje, het is een emotie.",
            "Maak Liedjes Voor Je Geliefden, Geen Vaardigheden Vereist",
            "Stel je voor dat je geliefden jouw liedjes zingen onder de douche",
            "Het is niet zomaar muziek, het is een boodschap",
            "Stel je je favoriete liedje voor, maar dan persoonlijk en voor altijd herinnerd",
            "Ga je weer naar DIE winkel om hetzelfde cadeau te kopen als vorig jaar? Geef iets unieks en creëer liedjes die je geliefden laten glimlachen",
            "Het is geen cadeau dat je geeft, het is een cadeau dat je voelt.",
            "Stop met saaie cadeaus geven aan mensen van wie je houdt, maak unieke liedjes die blijven plakken.",
            "Weet je nog je favoriete liedje? Dit is dat, maar dan persoonlijk voor degenen van wie je houdt.",
            "Weet je nog het cadeau dat je haar vorig jaar gaf? Zij ook niet. Probeer dit onvergetelijke cadeau en maak je geliefden blij.",
            "De beste cadeaus worden niet ingepakt, ze worden ervaren.",
            "Weer een gewoon flesje wijn? Ze hebben er genoeg van. Laten we wat muziek maken dat een feestje wordt.",
            "Moe van saaie cadeaus? Je bent niet alleen. Ontdek het meest persoonlijke cadeau van Nederland.",
            "Het is als een cadeaubon, maar 10 keer cooler en het speelt op Spotify.",
            "Het kan gespeeld worden op een feestje, het kan gespeeld worden op een begrafenis. Het is het cadeau dat altijd werkt."
        ]
    };

    // Initialize the application
    function init() {
        currentLanguage = document.documentElement.lang || 'en';
        setupEventListeners();
        setRandomSubheadline();
        loadRandomAudio(1);
        loadRandomAudio(2);
        updateWordsSection();
        setupTestimonialCarousel();
        setupScrollTrigger();
    }

    function setupEventListeners() {
        // Language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                setLanguage(this.dataset.lang);
            });
        });

        // Package selection
        document.querySelectorAll('input[name="package"]').forEach(radio => {
            radio.addEventListener('change', function() {
                updateSongTitles();
                updateWordsSection();
                document.querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('selected'));
                this.closest('.radio-option').classList.add('selected');
                
                if (this.value === 'contact') {
                    showFullAlbumModal();
                    this.checked = false;
                    this.closest('.radio-option').classList.remove('selected');
                }
            });
        });

        // Voice selection
        document.querySelectorAll('input[name="voiceType"]').forEach(radio => {
            radio.addEventListener('change', function() {
                document.querySelectorAll('input[name="voiceType"]').forEach(r => {
                    r.closest('.radio-option').classList.remove('selected');
                });
                this.closest('.radio-option').classList.add('selected');
            });
        });

        // Reason selection
        const reasonSelect = document.getElementById('reason');
        if (reasonSelect) {
            reasonSelect.addEventListener('change', function() {
                const otherField = document.getElementById('otherReason');
                if (this.value === 'other') {
                    otherField.style.display = 'block';
                    otherField.required = true;
                } else {
                    otherField.style.display = 'none';
                    otherField.required = false;
                }
            });
        }

        // Form submission
        const selectionForm = document.getElementById('selectionForm');
        if (selectionForm) {
            selectionForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateForm()) {
                    collectFormData();
                    showSummary();
                    showPage('page2');
                }
            });
        }

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleNewsletterSubmission();
            });
        }

        // Setup modal listeners
        setupModalListeners();

        // Setup discount functionality
        setupDiscountListeners();
    }

    function setupModalListeners() {
        // Privacy modal
        const privacyModal = document.getElementById('privacyModal');
        const privacyLink = document.getElementById('fullPrivacyLink');
        const privacyClose = privacyModal?.querySelector('.close');

        if (privacyLink && privacyModal) {
            privacyLink.addEventListener('click', function(e) {
                e.preventDefault();
                privacyModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }

        if (privacyClose) {
            privacyClose.addEventListener('click', function() {
                privacyModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        // Discount modal
        const discountModal = document.getElementById('discountModal');
        const discountClose = discountModal?.querySelector('.discount-close');

        if (discountClose) {
            discountClose.addEventListener('click', closeDiscountModal);
        }

        // Full album modal
        const fullAlbumModal = document.getElementById('fullAlbumModal');
        const fullAlbumClose = document.getElementById('fullAlbumClose');
        const fullAlbumForm = document.getElementById('fullAlbumContactForm');

        if (fullAlbumClose) {
            fullAlbumClose.addEventListener('click', closeFullAlbumModal);
        }

        if (fullAlbumForm) {
            fullAlbumForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFullAlbumContactSubmission();
            });
        }

        // Close modals on outside click
        [privacyModal, discountModal, fullAlbumModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                });
            }
        });

        // ESC key to close modals
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                [privacyModal, discountModal, fullAlbumModal].forEach(modal => {
                    if (modal && modal.style.display === 'block') {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                });
            }
        });
    }

    function setupDiscountListeners() {
        // Discount code application
        const applyDiscountBtn = document.querySelector('.discount-apply-btn');
        if (applyDiscountBtn) {
            applyDiscountBtn.addEventListener('click', applyDiscountCode);
        }

        // Copy discount code
        const copyCodeBtn = document.querySelector('.copy-btn');
        if (copyCodeBtn) {
            copyCodeBtn.addEventListener('click', copyDiscountCode);
        }
    }

    function loadRandomAudio(playerNumber) {
        if (mp3Files.length === 0) {
            console.error('No MP3 files available');
            return;
        }

        let availableFiles = mp3Files.slice();
        const otherPlayerIndex = playerNumber === 1 ? 2 : 1;
        
        if (currentlyPlaying[otherPlayerIndex - 1] !== null) {
            availableFiles = availableFiles.filter((_, index) => index !== currentlyPlaying[otherPlayerIndex - 1]);
        }

        if (availableFiles.length === 0) {
            availableFiles = mp3Files.slice();
        }

        const randomIndex = Math.floor(Math.random() * availableFiles.length);
        const selectedFile = availableFiles[randomIndex];
        const originalIndex = mp3Files.indexOf(selectedFile);

        currentlyPlaying[playerNumber - 1] = originalIndex;

        const audioPlayer = document.getElementById(`audioPlayer${playerNumber}`);
        const audioTitle = document.getElementById(`audioTitle${playerNumber}`);
        const audioDesc = document.getElementById(`audioDesc${playerNumber}`);

        if (!audioPlayer || !audioTitle || !audioDesc) return;

        audioPlayer.innerHTML = '';
        
        const source = document.createElement('source');
        // Use Shopify CDN URL format for uploaded files
        source.src = window.shopUrl + '/cdn/shop/files/' + selectedFile.filename;
        source.type = 'audio/mpeg';
        audioPlayer.appendChild(source);

        const fallback = document.createElement('span');
        fallback.textContent = 'Your browser does not support the audio element.';
        audioPlayer.appendChild(fallback);

        audioTitle.textContent = selectedFile.title[currentLanguage];
        audioDesc.textContent = selectedFile.style[currentLanguage];

        audioPlayer.load();

        audioTitle.style.opacity = '0.6';
        audioDesc.style.opacity = '0.6';
        
        audioPlayer.addEventListener('loadeddata', function() {
            audioTitle.style.opacity = '1';
            audioDesc.style.opacity = '1';
        }, { once: true });

        audioPlayer.addEventListener('error', function(e) {
            console.error(`Error loading audio file: ${selectedFile.filename}`, e);
            audioTitle.textContent = currentLanguage === 'nl' ? 'Fout bij laden' : 'Loading Error';
            audioDesc.textContent = currentLanguage === 'nl' ? 
                'Bestand niet gevonden. Upload MP3 bestanden naar Shopify Files.' : 
                'File not found. Upload MP3 files to Shopify Files.';
            audioTitle.style.opacity = '1';
            audioDesc.style.opacity = '1';
        }, { once: true });
    }

    function setRandomSubheadline() {
        const headlines = subheadlines[currentLanguage];
        const randomIndex = Math.floor(Math.random() * headlines.length);
        const selectedHeadline = headlines[randomIndex];
        
        const subheadlineElement = document.getElementById('randomSubheadline');
        if (subheadlineElement) {
            subheadlineElement.textContent = selectedHeadline;
            subheadlineElement.style.opacity = '0';
            setTimeout(() => {
                subheadlineElement.style.opacity = '1';
            }, 100);
        }
    }

    function updateWordsSection() {
        const selectedPackage = document.querySelector('input[name="package"]:checked');
        const wordsContainer = document.getElementById('wordsContainer');
        
        if (!wordsContainer || !selectedPackage || selectedPackage.value === 'contact') {
            if (wordsContainer) wordsContainer.innerHTML = '';
            return;
        }

        wordsContainer.innerHTML = '';

        if (selectedPackage.value === 'ep') {
            for (let song = 1; song <= 4; song++) {
                const songSection = document.createElement('div');
                songSection.className = 'song-words-section';
                
                const songTitle = document.createElement('div');
                songTitle.className = 'song-words-title';
                songTitle.textContent = `Song ${song} - Words/Names:`;
                songSection.appendChild(songTitle);
                
                const wordsRow = document.createElement('div');
                wordsRow.className = 'words-row';
                
                for (let word = 1; word <= 3; word++) {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.name = `song${song}_word${word}`;
                    input.placeholder = `Word/Name ${word}`;
                    input.className = 'word-input';
                    wordsRow.appendChild(input);
                }
                
                songSection.appendChild(wordsRow);
                wordsContainer.appendChild(songSection);
            }
        } else {
            const wordsRow = document.createElement('div');
            wordsRow.className = 'words-row';
            
            for (let i = 1; i <= 3; i++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.name = `word${i}`;
                input.placeholder = `Word/Name ${i}`;
                input.style.marginBottom = '10px';
                wordsRow.appendChild(input);
            }
            
            wordsContainer.appendChild(wordsRow);
        }
    }

    function updateSongTitles() {
        const selectedPackage = document.querySelector('input[name="package"]:checked');
        const titleContainer = document.getElementById('titleFields');
        const songTitlesSection = document.getElementById('songTitles');
        
        if (!selectedPackage || selectedPackage.value === 'contact') {
            if (songTitlesSection) songTitlesSection.classList.remove('show');
            return;
        }

        let numSongs;
        switch(selectedPackage.value) {
            case 'one': numSongs = 1; break;
            case 'ep': numSongs = 4; break;
            default: numSongs = 0;
        }

        if (titleContainer) {
            titleContainer.innerHTML = '';
            for (let i = 1; i <= numSongs; i++) {
                const titleField = document.createElement('div');
                titleField.className = 'title-field';
                titleField.innerHTML = `<input type="text" name="songTitle${i}" placeholder="Song ${i} Title">`;
                titleContainer.appendChild(titleField);
            }
        }

        if (songTitlesSection) songTitlesSection.classList.add('show');
    }

    function validateForm() {
        let isValid = true;
        let missingFields = [];

        const packageSelected = document.querySelector('input[name="package"]:checked');
        if (!packageSelected) {
            isValid = false;
            missingFields.push(currentLanguage === 'nl' ? 'Pakket selectie' : 'Package selection');
            document.querySelectorAll('input[name="package"]').forEach(radio => {
                radio.closest('.radio-option').style.borderColor = '#ef4444';
            });
        } else {
            document.querySelectorAll('input[name="package"]').forEach(radio => {
                radio.closest('.radio-option').style.borderColor = '#475569';
            });
        }

        const requiredFields = [
            { name: 'musicStyle1', label: currentLanguage === 'nl' ? 'Eerste Muziekstijl' : 'First Music Style' },
            { name: 'musicStyle2', label: currentLanguage === 'nl' ? 'Tweede Muziekstijl' : 'Second Music Style' },
            { name: 'reason', label: currentLanguage === 'nl' ? 'Reden' : 'Reason' },
            { name: 'songLanguage', label: currentLanguage === 'nl' ? 'Liedje taal' : 'Song Language' }
        ];

        const voiceSelected = document.querySelector('input[name="voiceType"]:checked');
        if (!voiceSelected) {
            isValid = false;
            missingFields.push(currentLanguage === 'nl' ? 'Stem voorkeur' : 'Voice preference');
            document.querySelectorAll('input[name="voiceType"]').forEach(radio => {
                radio.closest('.radio-option').style.borderColor = '#ef4444';
            });
        } else {
            document.querySelectorAll('input[name="voiceType"]').forEach(radio => {
                radio.closest('.radio-option').style.borderColor = '#475569';
            });
        }

        requiredFields.forEach(field => {
            const element = document.querySelector(`[name="${field.name}"]`);
            if (!element || !element.value) {
                isValid = false;
                missingFields.push(field.label);
                if (element) {
                    element.style.borderColor = '#ef4444';
                }
            } else {
                if (element) {
                    element.style.borderColor = '#475569';
                }
            }
        });

        const reasonSelect = document.querySelector('[name="reason"]');
        const otherReasonField = document.getElementById('otherReason');
        if (reasonSelect && reasonSelect.value === 'other' && (!otherReasonField.value || otherReasonField.value.trim() === '')) {
            isValid = false;
            missingFields.push(currentLanguage === 'nl' ? 'Andere reden specificatie' : 'Other reason specification');
            otherReasonField.style.borderColor = '#ef4444';
        }

        if (!isValid) {
            const message = currentLanguage === 'nl' ? 
                'Vul de volgende verplichte velden in:\n• ' + missingFields.join('\n• ') :
                'Please fill in the following required fields:\n• ' + missingFields.join('\n• ');
            alert(message);
        }

        return isValid;
    }

    function collectFormData() {
        const form = document.getElementById('selectionForm');
        formData = {};
        
        const selectedPackage = document.querySelector('input[name="package"]:checked');
        if (selectedPackage) {
            formData.package = selectedPackage.value;
            if (selectedPackage.value === 'contact') {
                formData.price = 'contact';
            } else {
                formData.price = selectedPackage.dataset.price;
            }
        }
        
        const formDataObj = new FormData(form);
        for (let [key, value] of formDataObj.entries()) {
            if (key !== 'package') {
                formData[key] = value;
            }
        }
    }

    function showSummary() {
        const summaryContent = document.getElementById('summaryContent');
        const totalPrice = document.getElementById('totalPrice');
        
        if (!summaryContent) return;

        let html = '<div class="summary-item"><div class="summary-label">Package:</div><div class="summary-value">';
        
        switch(formData.package) {
            case 'one': html += currentLanguage === 'nl' ? 'Één Liedje' : 'One Song'; break;
            case 'ep': html += currentLanguage === 'nl' ? 'EP (4 liedjes)' : 'EP (4 songs)'; break;
            case 'contact': html += currentLanguage === 'nl' ? 'Volledig Album' : 'Full Album'; break;
        }
        html += '</div></div>';

        html += `<div class="summary-item"><div class="summary-label">Music Style:</div><div class="summary-value">${formData.musicStyle1}, ${formData.musicStyle2}</div></div>`;
        html += `<div class="summary-item"><div class="summary-label">Language:</div><div class="summary-value">${formData.songLanguage}</div></div>`;
        
        if (formData.voiceType) {
            let voiceLabel = '';
            switch(formData.voiceType) {
                case 'male': voiceLabel = currentLanguage === 'nl' ? 'Mannelijke Stem' : 'Male Voice'; break;
                case 'female': voiceLabel = currentLanguage === 'nl' ? 'Vrouwelijke Stem' : 'Female Voice'; break;
                case 'no_preference': voiceLabel = currentLanguage === 'nl' ? 'Geen Voorkeur' : 'No Preference'; break;
            }
            html += `<div class="summary-item"><div class="summary-label">Voice:</div><div class="summary-value">${voiceLabel}</div></div>`;
        }
        
        if (formData.artist1 || formData.artist2 || formData.artist3) {
            html += '<div class="summary-item"><div class="summary-label">Favorite Artists:</div><div class="summary-value">';
            const artists = [formData.artist1, formData.artist2, formData.artist3].filter(a => a);
            html += artists.join(', ') + '</div></div>';
        }

        if (formData.package === 'ep') {
            for (let song = 1; song <= 4; song++) {
                const songWords = [];
                for (let word = 1; word <= 3; word++) {
                    const wordValue = formData[`song${song}_word${word}`];
                    if (wordValue && wordValue.trim()) {
                        songWords.push(wordValue.trim());
                    }
                }
                if (songWords.length > 0) {
                    html += `<div class="summary-item"><div class="summary-label">Song ${song} Words:</div><div class="summary-value">${songWords.join(', ')}</div></div>`;
                }
            }
        } else if (formData.package === 'one') {
            const words = [formData.word1, formData.word2, formData.word3].filter(w => w && w.trim());
            if (words.length > 0) {
                html += '<div class="summary-item"><div class="summary-label">Words/Names:</div><div class="summary-value">' + words.join(', ') + '</div></div>';
            }
        }

        summaryContent.innerHTML = html;
        
        const paymentSection = document.getElementById('paymentSection');
        const contactSection = document.getElementById('contactSection');
        
        if (formData.package === 'contact') {
            if (paymentSection) paymentSection.style.display = 'none';
            if (contactSection) contactSection.style.display = 'block';
            if (totalPrice) {
                totalPrice.innerHTML = '<div class="total-breakdown"><div class="total-row final"><span>Price:</span><span>' + 
                    (currentLanguage === 'nl' ? 'Neem contact op voor prijs' : 'Contact us for custom pricing') + '</span></div></div>';
            }
        } else {
            if (paymentSection) paymentSection.style.display = 'block';
            if (contactSection) contactSection.style.display = 'none';
            calculateTotal();
        }
    }

    function calculateTotal() {
        if (formData.package === 'contact') return;
        
        const originalPrice = parseFloat(formData.price);
        if (isNaN(originalPrice)) return;
        
        let discountAmount = 0;
        
        if (localStorage.getItem('discountAppliedViaModal') === 'true' || appliedDiscountCode === '15%MUSIC') {
            discountAmount = originalPrice * 0.15;
            window.appliedDiscount = discountAmount;
            appliedDiscountCode = '15%MUSIC';
        } else if (window.appliedDiscount) {
            discountAmount = window.appliedDiscount;
        }
        
        const finalPrice = originalPrice - discountAmount;
        
        let totalHtml = '<div class="total-breakdown">';
        
        if (discountAmount > 0) {
            totalHtml += `<div class="total-row subtotal">
                <span>Subtotal:</span>
                <span>€${originalPrice.toFixed(2)}</span>
            </div>`;
            totalHtml += `<div class="total-row discount">
                <span>Discount (15%):</span>
                <span>-€${discountAmount.toFixed(2)}</span>
            </div>`;
            totalHtml += `<div class="total-row final">
                <span>Total:</span>
                <span>€${finalPrice.toFixed(2)}</span>
            </div>`;
        } else {
            totalHtml += `<div class="total-row final">
                <span>Total:</span>
                <span>€${originalPrice.toFixed(2)}</span>
            </div>`;
        }
        
        totalHtml += '</div>';
        
        const totalElement = document.getElementById('totalPrice');
        if (totalElement) {
            totalElement.innerHTML = totalHtml;
        }
        
        formData.finalPrice = finalPrice.toFixed(2);
        formData.discountAmount = discountAmount.toFixed(2);
    }

    function applyDiscountCode() {
        const codeInput = document.getElementById('discountCodeInput');
        const code = codeInput?.value?.trim()?.toUpperCase();
        const messageDiv = document.getElementById('discountMessage');
        
        if (!code || !messageDiv) return;
        
        messageDiv.className = 'discount-message';
        messageDiv.style.display = 'none';
        
        if (appliedDiscountCode || localStorage.getItem('discountAppliedViaModal') === 'true') {
            showDiscountMessage('error', currentLanguage === 'nl' ? 'Kortingscode al toegepast.' : 'Discount code already applied.');
            return;
        }
        
        if (code === '15%MUSIC') {
            const originalPrice = parseFloat(formData.price);
            const discountAmount = originalPrice * 0.15;
            window.appliedDiscount = discountAmount;
            appliedDiscountCode = code;
            
            showDiscountMessage('success', 
                (currentLanguage === 'nl' ? 'Korting succesvol toegepast! Je bespaart €' : 'Discount applied successfully! You save €') + 
                discountAmount.toFixed(2));
            
            calculateTotal();
            
            codeInput.disabled = true;
            const applyBtn = document.querySelector('.discount-apply-btn');
            if (applyBtn) {
                applyBtn.disabled = true;
                applyBtn.style.opacity = '0.6';
            }
        } else {
            showDiscountMessage('error', currentLanguage === 'nl' ? 'Ongeldige kortingscode. Controleer en probeer opnieuw.' : 'Invalid discount code. Please check and try again.');
        }
    }

    function showDiscountMessage(type, message) {
        const messageDiv = document.getElementById('discountMessage');
        if (messageDiv) {
            messageDiv.className = `discount-message ${type}`;
            messageDiv.textContent = message;
            messageDiv.style.display = 'block';
        }
    }

    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo(0, 0);
        }
    }

    function goBack() {
        showPage('page1');
    }

    function handleNewsletterSubmission() {
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput?.value;
        
        if (!email || !email.includes('@')) {
            alert(currentLanguage === 'nl' ? 'Voer een geldig e-mailadres in.' : 'Please enter a valid email address.');
            return;
        }

        const button = document.querySelector('.newsletter-btn');
        if (button) {
            const originalText = button.textContent;
            button.textContent = currentLanguage === 'nl' ? 'Aangemeld! ✓' : 'Subscribed! ✓';
            button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)';
                button.disabled = false;
                if (emailInput) emailInput.value = '';
            }, 3000);
        }

        // Submit to Shopify customer list or newsletter service
        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `form_type=customer&email=${encodeURIComponent(email)}&tags=newsletter`
        }).catch(console.error);
    }

    function setupTestimonialCarousel() {
        const carousel = document.getElementById('featuredTestimonials');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        let startX = 0;
        let isDragging = false;

        if (!carousel || dots.length === 0) return;

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            carousel.style.transition = 'none';
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;

            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            const threshold = 50;

            if (Math.abs(diffX) > threshold) {
                if (diffX > 0 && currentSlide < dots.length - 1) {
                    currentSlide++;
                } else if (diffX < 0 && currentSlide > 0) {
                    currentSlide--;
                }
            }
            updateCarousel();
        });

        function updateCarousel() {
            if (window.innerWidth <= 768) {
                const translateX = -currentSlide * 25;
                carousel.style.transform = `translateX(${translateX}%)`;
                carousel.style.transition = 'transform 0.3s ease';
            } else {
                carousel.style.transform = 'none';
                carousel.style.transition = 'none';
            }

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        updateCarousel();
        
        window.addEventListener('resize', updateCarousel);
    }

    function setupScrollTrigger() {
        setTimeout(() => {
            const pricingSection = document.querySelector('.radio-group');
            
            if (pricingSection) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !discountModalShown) {
                            showDiscountModal();
                            discountModalShown = true;
                        }
                    });
                }, { 
                    threshold: 0.5,
                    rootMargin: '-50px 0px -50px 0px'
                });

                observer.observe(pricingSection);
            } else {
                setTimeout(() => {
                    if (!discountModalShown) {
                        showDiscountModal();
                        discountModalShown = true;
                    }
                }, 3000);
            }
        }, 500);
    }

    function showDiscountModal() {
        const modal = document.getElementById('discountModal');
        if (modal) {
            showDiscountStep('discountEmailStep');
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function showDiscountStep(stepId) {
        document.querySelectorAll('.discount-step').forEach(step => {
            step.classList.remove('active');
        });
        
        const targetStep = document.getElementById(stepId);
        if (targetStep) {
            targetStep.classList.add('active');
        }
    }

    function closeDiscountModal() {
        const modal = document.getElementById('discountModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            const emailInput = document.getElementById('discountEmail');
            const consentCheckbox = document.getElementById('emailConsent');
            if (emailInput) emailInput.value = '';
            if (consentCheckbox) consentCheckbox.checked = false;
        }
    }

    function submitDiscountEmail() {
        const emailInput = document.getElementById('discountEmail');
        const consentCheckbox = document.getElementById('emailConsent');
        const consentSection = document.getElementById('emailConsentCheckbox');
        
        const email = emailInput?.value?.trim();
        const hasConsent = consentCheckbox?.checked;
        
        if (emailInput) emailInput.style.borderColor = '';
        if (consentSection) consentSection.classList.remove('error');
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            if (emailInput) {
                emailInput.style.borderColor = '#ef4444';
                emailInput.focus();
            }
            alert(currentLanguage === 'nl' ? 
                'Voer een geldig e-mailadres in.' : 
                'Please enter a valid email address.');
            return;
        }
        
        if (!hasConsent) {
            if (consentSection) consentSection.classList.add('error');
            alert(currentLanguage === 'nl' ? 
                'U moet akkoord gaan met het ontvangen van e-mails om uw kortingscode te ontvangen.' : 
                'You must agree to receive emails to get your discount code.');
            return;
        }
        
        localStorage.setItem('discountEmail', email);
        localStorage.setItem('emailConsent', 'true');
        localStorage.setItem('discountAppliedViaModal', 'true');
        
        // Submit to Shopify customer list
        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `form_type=customer&email=${encodeURIComponent(email)}&tags=discount_modal_consent`
        }).catch(console.error);
        
        appliedDiscountCode = '15%MUSIC';
        if (formData.price && formData.price !== 'contact') {
            const originalPrice = parseFloat(formData.price);
            window.appliedDiscount = originalPrice * 0.15;
        }
        
        showDiscountStep('discountSuccessStep');
    }

    function copyDiscountCode() {
        const code = '15%MUSIC';
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(code).then(() => {
                const button = document.querySelector('.copy-btn');
                if (button) {
                    const originalText = button.textContent;
                    button.textContent = currentLanguage === 'nl' ? 'Gekopieerd!' : 'Copied!';
                    button.style.background = '#10b981';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = '#fbbf24';
                    }, 2000);
                }
            }).catch(() => {
                fallbackCopyTextToClipboard(code);
            });
        } else {
            fallbackCopyTextToClipboard(code);
        }
    }

    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            alert(currentLanguage === 'nl' ? 'Code gekopieerd naar klembord!' : 'Code copied to clipboard!');
        } catch (err) {
            alert(currentLanguage === 'nl' ? 'Kon niet kopiëren, selecteer de code handmatig' : 'Could not copy, please select the code manually');
        }
        
        document.body.removeChild(textArea);
    }

    function showFullAlbumModal() {
        const modal = document.getElementById('fullAlbumModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeFullAlbumModal() {
        const modal = document.getElementById('fullAlbumModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            const form = document.getElementById('fullAlbumContactForm');
            if (form) {
                form.reset();
                const topicField = document.getElementById('fullAlbumTopic');
                if (topicField) {
                    topicField.value = 'Interested in a full album please contact me';
                }
            }
        }
    }

    function handleFullAlbumContactSubmission() {
        const form = document.getElementById('fullAlbumContactForm');
        const formData = new FormData(form);
        
        const email = formData.get('email');
        const phone = formData.get('phone');
        const topic = formData.get('topic');
        const notes = formData.get('notes');

        if (!email || !phone) {
            alert(currentLanguage === 'nl' ? 
                'Vul alle verplichte velden in.' : 
                'Please fill in all required fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert(currentLanguage === 'nl' ? 
                'Voer een geldig e-mailadres in.' : 
                'Please enter a valid email address.');
            return;
        }

        // Submit to Shopify contact form
        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `form_type=contact&contact[email]=${encodeURIComponent(email)}&contact[body]=${encodeURIComponent(`Topic: ${topic}\nPhone: ${phone}\nNotes: ${notes || 'None'}`)}&contact[subject]=Full Album Inquiry`
        }).then(() => {
            alert(currentLanguage === 'nl' ? 
                'Bedankt voor uw interesse! We nemen binnen 24 uur contact met u op via e-mail voor een persoonlijk gesprek over uw volledige album.' : 
                'Thank you for your interest! We will contact you within 24 hours via email for a personal consultation about your full album.');
            closeFullAlbumModal();
        }).catch(console.error);
    }

    function setLanguage(lang) {
        currentLanguage = lang;
        setRandomSubheadline();
        // Language switching would be handled by Shopify's built-in localization
        window.location.href = `/${lang}`;
    }

    // Global functions for backward compatibility
    window.loadRandomAudio = loadRandomAudio;
    window.showPage = showPage;
    window.goBack = goBack;
    window.applyDiscountCode = applyDiscountCode;
    window.submitDiscountEmail = submitDiscountEmail;
    window.copyDiscountCode = copyDiscountCode;

    // Public API
    return {
        init: init,
        loadRandomAudio: loadRandomAudio,
        showPage: showPage,
        goBack: goBack,
        applyDiscountCode: applyDiscountCode,
        submitDiscountEmail: submitDiscountEmail,
        copyDiscountCode: copyDiscountCode
    };
})();