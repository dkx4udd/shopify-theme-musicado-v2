// Musicado Theme JavaScript - Alleen Nederlands
window.MusicadoApp = (function() {
    'use strict';

    // Globale variabelen - Alleen Nederlands
    let formData = {};
    let customerData = {};
    let discountModalShown = false;
    let appliedDiscountCode = null;
    let currentlyPlaying = [null, null];

    // MP3 bestanden configuratie - Bijgewerkt met juiste Shopify paden
    const mp3Files = [
        { 
            filename: "https://cdn.shopify.com/s/files/1/0905/1462/0749/files/Wonderlijke_wereld_van_AI_-_Matelletam.mp3", 
            title: "Wonderlijke wereld van AI - Matelletam",
            style: "Electronic/Ambient stijl"
        },
        { 
            filename: "https://cdn.shopify.com/s/files/1/0905/1462/0749/files/Wonderlijke_wereld_van_AI_-_RockyRocky.mp3", 
            title: "Wonderlijke wereld van AI - RockyRocky",
            style: "Rock/Pop stijl"
        },
        { 
            filename: "https://cdn.shopify.com/s/files/1/0905/1462/0749/files/Survivor_-_Eye_Of_The_Tiger_Official_HD_Video.mp3", 
            title: "Survivor - Eye Of The Tiger",
            style: "Klassieke Rock stijl"
        },
        { 
            filename: "https://cdn.shopify.com/s/files/1/0905/1462/0749/files/Music_for_vlogs_-_Birthday.mp3", 
            title: "Verjaardag Viering",
            style: "Vrolijke/Viering stijl"
        }
    ];

    // Nederlandse subkoppen
    const subheadlines = [
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
    ];

    // Initialiseer de applicatie
    function init() {
        setupEventListeners();
        setRandomSubheadline();
        loadRandomAudio(1);
        loadRandomAudio(2);
        updateWordsSection();
        setupTestimonialCarousel();
        setupScrollTrigger();
    }

    function setupEventListeners() {
        // Pakket selectie
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

        // Stem selectie
        document.querySelectorAll('input[name="voiceType"]').forEach(radio => {
            radio.addEventListener('change', function() {
                document.querySelectorAll('input[name="voiceType"]').forEach(r => {
                    r.closest('.radio-option').classList.remove('selected');
                });
                this.closest('.radio-option').classList.add('selected');
            });
        });

        // Reden selectie
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

        // Formulier indiening
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

        // Nieuwsbrief formulier
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleNewsletterSubmission();
            });
        }

        // Setup modal listeners
        setupModalListeners();

        // Setup korting functionaliteit
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

        // Korting modal
        const discountModal = document.getElementById('discountModal');
        const discountClose = discountModal?.querySelector('.discount-close');

        if (discountClose) {
            discountClose.addEventListener('click', closeDiscountModal);
        }

        // Volledig album modal
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

        // Sluit modals bij klikken buiten modal
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

        // ESC toets om modals te sluiten
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
        // Kortingscode toepassen
        const applyDiscountBtn = document.querySelector('.discount-apply-btn');
        if (applyDiscountBtn) {
            applyDiscountBtn.addEventListener('click', applyDiscountCode);
        }

        // Kopieer kortingscode
        const copyCodeBtn = document.querySelector('.copy-btn');
        if (copyCodeBtn) {
            copyCodeBtn.addEventListener('click', copyDiscountCode);
        }
    }

    function loadRandomAudio(playerNumber) {
        if (mp3Files.length === 0) {
            console.error('Geen MP3 bestanden beschikbaar');
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
        source.src = selectedFile.filename;
        source.type = 'audio/mpeg';
        audioPlayer.appendChild(source);

        const fallback = document.createElement('span');
        fallback.textContent = 'Je browser ondersteunt het audio element niet.';
        audioPlayer.appendChild(fallback);

        audioTitle.textContent = selectedFile.title;
        audioDesc.textContent = selectedFile.style;

        audioPlayer.load();

        audioTitle.style.opacity = '0.6';
        audioDesc.style.opacity = '0.6';
        
        audioPlayer.addEventListener('loadeddata', function() {
            audioTitle.style.opacity = '1';
            audioDesc.style.opacity = '1';
        }, { once: true });

        audioPlayer.addEventListener('error', function(e) {
            console.error(`Fout bij laden van audiobestand: ${selectedFile.filename}`, e);
            audioTitle.textContent = 'Fout bij laden';
            audioDesc.textContent = 'Bestand niet gevonden. Upload MP3 bestanden naar Shopify Files.';
            audioTitle.style.opacity = '1';
            audioDesc.style.opacity = '1';
        }, { once: true });
    }

    function setRandomSubheadline() {
        const randomIndex = Math.floor(Math.random() * subheadlines.length);
        const selectedHeadline = subheadlines[randomIndex];
        
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
                songTitle.textContent = `Liedje ${song} - Woorden/Namen:`;
                songSection.appendChild(songTitle);
                
                const wordsRow = document.createElement('div');
                wordsRow.className = 'words-row';
                
                for (let word = 1; word <= 3; word++) {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.name = `song${song}_word${word}`;
                    input.placeholder = `Woord/Naam ${word}`;
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
                input.placeholder = `Woord/Naam ${i}`;
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
                titleField.innerHTML = `<input type="text" name="songTitle${i}" placeholder="Liedje ${i} Titel">`;
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
            missingFields.push('Pakket selectie');
            document.querySelectorAll('input[name="package"]').forEach(radio => {
                radio.closest('.radio-option').style.borderColor = '#ef4444';
            });
        } else {
            document.querySelectorAll('input[name="package"]').forEach(radio => {
                radio.closest('.radio-option').style.borderColor = '#475569';
            });
        }

        const requiredFields = [
            { name: 'musicStyle1', label: 'Eerste Muziekstijl' },
            { name: 'musicStyle2', label: 'Tweede Muziekstijl' },
            { name: 'reason', label: 'Reden' },
            { name: 'songLanguage', label: 'Liedje taal' }
        ];

        const voiceSelected = document.querySelector('input[name="voiceType"]:checked');
        if (!voiceSelected) {
            isValid = false;
            missingFields.push('Stem voorkeur');
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
            missingFields.push('Andere reden specificatie');
            otherReasonField.style.borderColor = '#ef4444';
        }

        if (!isValid) {
            const message = 'Vul de volgende verplichte velden in:\n• ' + missingFields.join('\n• ');
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

    function collectCustomerData() {
        customerData = {
            firstName: document.getElementById('firstName')?.value || '',
            lastName: document.getElementById('lastName')?.value || '',
            email: document.getElementById('customerEmail')?.value || '',
            phone: document.getElementById('mobilePhone')?.value || '',
            termsAccepted: document.getElementById('agreeTerms')?.checked || false
        };
    }

    function validateCustomerDetails() {
        collectCustomerData();
        
        const required = ['firstName', 'lastName', 'email', 'phone'];
        const missing = required.filter(field => !customerData[field]);
        
        if (missing.length > 0 || !customerData.termsAccepted) {
            alert('Vul alle klantgegevens in en accepteer de voorwaarden.');
            return false;
        }

        // Basis e-mail validatie
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerData.email)) {
            alert('Voer een geldig e-mailadres in.');
            return false;
        }

        return true;
    }

    function getProductVariantId(packageType) {
        console.log('Ophalen variant ID voor pakket:', packageType);
        
        // Probeer eerst van theme instellingen te krijgen
        if (window.themeSettings && window.themeSettings[packageType + 'VariantId']) {
            const variantId = window.themeSettings[packageType + 'VariantId'];
            console.log('Variant ID gevonden in instellingen:', variantId);
            return variantId;
        }
        
        // Probeer alternatieve instellingsnamen
        const settingMappings = {
            'one': ['singleSongVariantId', 'single_song_variant_id'],
            'ep': ['epVariantId', 'ep_variant_id'],
            'contact': ['albumVariantId', 'album_variant_id']
        };
        
        if (settingMappings[packageType] && window.themeSettings) {
            for (const setting of settingMappings[packageType]) {
                if (window.themeSettings[setting]) {
                    console.log('Variant ID gevonden in alternatieve instelling:', window.themeSettings[setting]);
                    return window.themeSettings[setting];
                }
            }
        }
        
        // TIJDELIJKE FALLBACK - Vervang deze door je echte variant ID's
        const fallbackIds = {
            'one': '',    // VERVANG: Voeg hier je single song variant ID toe
            'ep': '',     // VERVANG: Voeg hier je EP variant ID toe  
            'contact': '' // VERVANG: Voeg hier je album variant ID toe
        };
        
        console.log('Gebruik fallback variant ID:', fallbackIds[packageType]);
        return fallbackIds[packageType] || '';
    }

    function populateCartProperties() {
        const packageProp = document.getElementById('packageProperty');
        const style1Prop = document.getElementById('style1Property');
        const style2Prop = document.getElementById('style2Property');
        const voiceProp = document.getElementById('voiceProperty');
        const customerProp = document.getElementById('customerProperty');
        const wordsProp = document.getElementById('wordsProperty');
        const languageProp = document.getElementById('languageProperty');
        const reasonProp = document.getElementById('reasonProperty');

        if (packageProp) packageProp.value = formData.package || '';
        if (style1Prop) style1Prop.value = formData.musicStyle1 || '';
        if (style2Prop) style2Prop.value = formData.musicStyle2 || '';
        if (voiceProp) voiceProp.value = formData.voiceType || '';
        if (languageProp) languageProp.value = formData.songLanguage || '';
        if (reasonProp) reasonProp.value = formData.reason || '';
        
        if (customerProp) {
            customerProp.value = `${customerData.firstName} ${customerData.lastName}, ${customerData.email}, ${customerData.phone}`;
        }
        
        if (wordsProp) {
            let words = [];
            if (formData.package === 'ep') {
                for (let song = 1; song <= 4; song++) {
                    for (let word = 1; word <= 3; word++) {
                        const wordValue = formData[`song${song}_word${word}`];
                        if (wordValue && wordValue.trim()) {
                            words.push(`Liedje${song}-${wordValue.trim()}`);
                        }
                    }
                }
            } else {
                for (let i = 1; i <= 3; i++) {
                    const wordValue = formData[`word${i}`];
                    if (wordValue && wordValue.trim()) {
                        words.push(wordValue.trim());
                    }
                }
            }
            wordsProp.value = words.join(', ');
        }
    }

    function processPayment() {
        console.log('Betaling verwerken...');
        
        if (!validateCustomerDetails()) {
            return;
        }

        if (formData.package === 'contact') {
            handleContactRequest();
            return;
        }

        if (shouldUseContactFormFallback()) {
            handleContactFormFallback();
            return;
        }

        addToShopifyCart();
    }

    function shouldUseContactFormFallback() {
        const variantId = getProductVariantId(formData.package);
        
        if (!variantId || variantId.length < 10 || variantId === '') {
            console.log('Gebruik contactformulier fallback vanwege ontbrekende/ongeldige variant ID');
            return true;
        }
        
        return false;
    }

    function handleContactFormFallback() {
        console.log('Gebruik contactformulier fallback voor betaling');
        
        const customerDetails = `${customerData.firstName} ${customerData.lastName}`;
        const packageDetails = formData.package === 'one' ? 
            `Enkel Liedje (€${formData.price})` : 
            `EP 4 Liedjes (€${formData.price})`;
        
        let wordsSection = '';
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
                    wordsSection += `Liedje ${song} Woorden: ${songWords.join(', ')}\n`;
                }
            }
        } else {
            const words = [];
            for (let i = 1; i <= 3; i++) {
                const wordValue = formData[`word${i}`];
                if (wordValue && wordValue.trim()) {
                    words.push(wordValue.trim());
                }
            }
            if (words.length > 0) {
                wordsSection = `Woorden/Namen: ${words.join(', ')}\n`;
            }
        }

        const payButton = document.querySelector('.payment-btn') || document.querySelector('.btn');
        if (payButton) {
            payButton.disabled = true;
            payButton.textContent = 'Verwerken...';
        }

        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'form_type': 'contact',
                'contact[subject]': `Muziek Bestelling: ${packageDetails}`,
                'contact[email]': customerData.email,
                'contact[body]': `MUZIEK BESTELLING

Klant: ${customerDetails}
Email: ${customerData.email}
Telefoon: ${customerData.phone}

Pakket: ${packageDetails}
Totaalprijs: €${formData.finalPrice || formData.price}

Bestelling Details:
- Muziekstijlen: ${formData.musicStyle1}, ${formData.musicStyle2}
- Taal: ${formData.songLanguage}
- Stem voorkeur: ${formData.voiceType}
- Reden: ${formData.reason}

${wordsSection}

Opmerking: Deze bestelling is ingediend via contactformulier. Stuur betalingsinstructies naar de klant.`
            })
        }).then(response => {
            if (response.ok) {
                showSuccessMessage();
            } else {
                throw new Error('Contactformulier inzending mislukt');
            }
        }).catch(error => {
            console.error('Contactformulier fout:', error);
            showErrorMessage();
        }).finally(() => {
            if (payButton) {
                payButton.disabled = false;
                payButton.textContent = 'Nu Betalen';
            }
        });
    }

    function showSuccessMessage() {
        alert('Bestelling ontvangen! We sturen je binnen 24 uur betalingsinstructies via e-mail. Bedankt voor je bestelling!');
        showPage('page1');
        showNotification('Bestelling succesvol verzonden!', 'success');
    }

    function showErrorMessage() {
        alert('Er ging iets mis. Probeer het opnieuw of neem direct contact op via contact@musicado.nl');
    }

    function addToShopifyCart() {
        const variantId = getProductVariantId(formData.package);
        
        if (!variantId) {
            alert('Productconfiguratie fout. Neem contact op met de ondersteuning.');
            console.error('Ontbrekende variant ID voor pakket:', formData.package);
            return;
        }

        const variantIdInput = document.querySelector('.product-variant-id');
        if (variantIdInput) {
            variantIdInput.value = variantId;
        }

        populateCartProperties();

        const cartForm = document.getElementById('AddToCartForm');
        if (cartForm) {
            const payButton = cartForm.querySelector('button');
            if (payButton) {
                payButton.disabled = true;
                payButton.textContent = 'Verwerken...';
            }

            const formData = new FormData(cartForm);
            
            fetch(window.routes.cart_add_url, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/checkout';
                } else {
                    return response.text().then(text => {
                        throw new Error(`Winkelwagen fout: ${text}`);
                    });
                }
            })
            .catch(error => {
                console.error('Winkelwagen inzending fout:', error);
                alert('Er ging iets mis bij het toevoegen aan winkelwagen. Probeer het opnieuw.');
                
                if (payButton) {
                    payButton.disabled = false;
                    payButton.textContent = 'Nu Betalen';
                }
            });
        }
    }

    function handleContactRequest() {
        const contactData = {
            name: `${customerData.firstName} ${customerData.lastName}`,
            email: customerData.email,
            phone: customerData.phone,
            package: 'Volledig Album',
            details: JSON.stringify(formData)
        };

        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'form_type': 'contact',
                'contact[subject]': 'Volledig Album Verzoek',
                'contact[email]': contactData.email,
                'contact[body]': `Naam: ${contactData.name}\nTelefoon: ${contactData.phone}\nPakket: ${contactData.package}\nDetails: ${contactData.details}`
            })
        }).then(response => {
            if (response.ok) {
                alert('Bedankt! We nemen binnen 24 uur contact met u op.');
            } else {
                throw new Error('Contactformulier inzending mislukt');
            }
        }).catch(error => {
            console.error('Contactformulier fout:', error);
            alert('Er ging iets mis. Probeer het opnieuw of neem direct contact op.');
        });
    }

    function showSummary() {
        const summaryContent = document.getElementById('summaryContent');
        
        if (!summaryContent) return;

        let html = '<div class="summary-item"><div class="summary-label">Pakket:</div><div class="summary-value">';
        
        switch(formData.package) {
            case 'one': html += 'Één Liedje'; break;
            case 'ep': html += 'EP (4 liedjes)'; break;
            case 'contact': html += 'Volledig Album'; break;
        }
        html += '</div></div>';

        html += `<div class="summary-item"><div class="summary-label">Muziekstijl:</div><div class="summary-value">${formData.musicStyle1}, ${formData.musicStyle2}</div></div>`;
        html += `<div class="summary-item"><div class="summary-label">Taal:</div><div class="summary-value">${formData.songLanguage}</div></div>`;
        
        if (formData.voiceType) {
            let voiceLabel = '';
            switch(formData.voiceType) {
                case 'male': voiceLabel = 'Mannelijke Stem'; break;
                case 'female': voiceLabel = 'Vrouwelijke Stem'; break;
                case 'no_preference': voiceLabel = 'Geen Voorkeur'; break;
            }
            html += `<div class="summary-item"><div class="summary-label">Stem:</div><div class="summary-value">${voiceLabel}</div></div>`;
        }
        
        if (formData.artist1 || formData.artist2 || formData.artist3) {
            html += '<div class="summary-item"><div class="summary-label">Favoriete Artiesten:</div><div class="summary-value">';
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
                    html += `<div class="summary-item"><div class="summary-label">Liedje ${song} Woorden:</div><div class="summary-value">${songWords.join(', ')}</div></div>`;
                }
            }
        } else if (formData.package === 'one') {
            const words = [formData.word1, formData.word2, formData.word3].filter(w => w && w.trim());
            if (words.length > 0) {
                html += '<div class="summary-item"><div class="summary-label">Woorden/Namen:</div><div class="summary-value">' + words.join(', ') + '</div></div>';
            }
        }

        summaryContent.innerHTML = html;
        
        addCustomerDetailsForm();
        
        const paymentSection = document.getElementById('paymentSection');
        const contactSection = document.getElementById('contactSection');
        const totalPrice = document.getElementById('totalPrice');
        
        if (formData.package === 'contact') {
            if (paymentSection) paymentSection.style.display = 'none';
            if (contactSection) contactSection.style.display = 'block';
            if (totalPrice) {
                totalPrice.innerHTML = '<div class="total-breakdown"><div class="total-row final"><span>Prijs:</span><span>Neem contact op voor prijs</span></div></div>';
            }
        } else {
            if (paymentSection) paymentSection.style.display = 'block';
            if (contactSection) contactSection.style.display = 'none';
            calculateTotal();
        }
    }

    function addCustomerDetailsForm() {
        let customerDetailsSection = document.querySelector('#page2 .customer-details-section');
        
        if (!customerDetailsSection) {
            const page2Card = document.querySelector('#page2 .card');
            if (page2Card) {
                const customerDetailsHTML = `
                    <div class="customer-details-section">
                        <h3>Klantgegevens</h3>
                        <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div class="form-group">
                                <label for="firstName">Voornaam *</label>
                                <input type="text" id="firstName" name="firstName" required>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Achternaam *</label>
                                <input type="text" id="lastName" name="lastName" required>
                            </div>
                        </div>
                        <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div class="form-group">
                                <label for="customerEmail">E-mail *</label>
                                <input type="email" id="customerEmail" name="customerEmail" required>
                            </div>
                            <div class="form-group">
                                <label for="mobilePhone">Telefoon *</label>
                                <input type="tel" id="mobilePhone" name="mobilePhone" required placeholder="+31 6 12345678">
                            </div>
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" id="agreeTerms" required>
                                <label for="agreeTerms">Ik ga akkoord met de algemene voorwaarden</label>
                            </div>
                        </div>
                    </div>
                `;
                
                const totalPriceSection = page2Card.querySelector('.total-price-section');
                if (totalPriceSection) {
                    totalPriceSection.insertAdjacentHTML('beforebegin', customerDetailsHTML);
                } else {
                    const backButton = page2Card.querySelector('button');
                    if (backButton) {
                        backButton.insertAdjacentHTML('beforebegin', customerDetailsHTML);
                    }
                }
            }
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
                <span>Subtotaal:</span>
                <span>€${originalPrice.toFixed(2)}</span>
            </div>`;
            totalHtml += `<div class="total-row discount">
                <span>Korting (15%):</span>
                <span>-€${discountAmount.toFixed(2)}</span>
            </div>`;
            totalHtml += `<div class="total-row final">
                <span>Totaal:</span>
                <span>€${finalPrice.toFixed(2)}</span>
            </div>`;
        } else {
            totalHtml += `<div class="total-row final">
                <span>Totaal:</span>
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
            showDiscountMessage('error', 'Kortingscode al toegepast.');
            return;
        }
        
        if (code === '15%MUSIC') {
            const originalPrice = parseFloat(formData.price);
            const discountAmount = originalPrice * 0.15;
            window.appliedDiscount = discountAmount;
            appliedDiscountCode = code;
            
            showDiscountMessage('success', 'Korting succesvol toegepast! Je bespaart €' + discountAmount.toFixed(2));
            
            calculateTotal();
            
            codeInput.disabled = true;
            const applyBtn = document.querySelector('.discount-apply-btn');
            if (applyBtn) {
                applyBtn.disabled = true;
                applyBtn.style.opacity = '0.6';
            }
        } else {
            showDiscountMessage('error', 'Ongeldige kortingscode. Controleer en probeer opnieuw.');
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
            alert('Voer een geldig e-mailadres in.');
            return;
        }

        const button = document.querySelector('.newsletter-btn');
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Aangemeld! ✓';
            button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)';
                button.disabled = false;
                if (emailInput) emailInput.value = '';
            }, 3000);
        }

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
            alert('Voer een geldig e-mailadres in.');
            return;
        }
        
        if (!hasConsent) {
            if (consentSection) consentSection.classList.add('error');
            alert('U moet akkoord gaan met het ontvangen van e-mails om uw kortingscode te ontvangen.');
            return;
        }
        
        localStorage.setItem('discountEmail', email);
        localStorage.setItem('emailConsent', 'true');
        localStorage.setItem('discountAppliedViaModal', 'true');
        
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
                    button.textContent = 'Gekopieerd!';
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

    function applyDiscountAndClose() {
        if (!appliedDiscountCode && !localStorage.getItem('discountAppliedViaModal')) {
            const originalPrice = parseFloat(formData.price);
            if (!isNaN(originalPrice)) {
                window.appliedDiscount = originalPrice * 0.15;
                appliedDiscountCode = '15%MUSIC';
                localStorage.setItem('discountAppliedViaModal', 'true');
            }
        }
        
        closeDiscountModal();
        
        if (formData.price && formData.price !== 'contact') {
            setTimeout(() => {
                calculateTotal();
            }, 100);
        }
        
        showNotification('Korting toegepast! Je kunt nu doorgaan naar betaling.', 'success');
        
        setTimeout(() => {
            const paymentSection = document.getElementById('paymentSection');
            if (paymentSection && paymentSection.style.display !== 'none') {
                paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 4000);
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
            alert('Code gekopieerd naar klembord!');
        } catch (err) {
            alert('Kon niet kopiëren, selecteer de code handmatig');
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
                    topicField.value = 'Geïnteresseerd in een volledig album, neem contact met mij op';
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
            alert('Vul alle verplichte velden in.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Voer een geldig e-mailadres in.');
            return;
        }

        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `form_type=contact&contact[email]=${encodeURIComponent(email)}&contact[body]=${encodeURIComponent(`Onderwerp: ${topic}\nTelefoon: ${phone}\nOpmerkingen: ${notes || 'Geen'}`)}&contact[subject]=Volledig Album Aanvraag`
        }).then(() => {
            alert('Bedankt voor uw interesse! We nemen binnen 24 uur contact met u op via e-mail voor een persoonlijk gesprek over uw volledige album.');
            closeFullAlbumModal();
        }).catch(console.error);
    }

    // Globale functies
    window.loadRandomAudio = loadRandomAudio;
    window.showPage = showPage;
    window.goBack = goBack;
    window.applyDiscountCode = applyDiscountCode;
    window.submitDiscountEmail = submitDiscountEmail;
    window.copyDiscountCode = copyDiscountCode;
    window.processPayment = processPayment;
    window.applyDiscountAndClose = applyDiscountAndClose;

    // Publieke API
    return {
        init: init,
        loadRandomAudio: loadRandomAudio,
        showPage: showPage,
        goBack: goBack,
        applyDiscountCode: applyDiscountCode,
        submitDiscountEmail: submitDiscountEmail,
        copyDiscountCode: copyDiscountCode,
        processPayment: processPayment,
        applyDiscountAndClose: applyDiscountAndClose
    };
})();
