/**
 * Simple MusicadoApp - Clean and Working
 * File: assets/musicado.js
 * No complex debugging, just core functionality
 */

console.log('🎵 Loading Simple MusicadoApp...');

class MusicadoApp {
    constructor() {
        this.formData = null;
        this.customerData = null;
        this.appliedDiscount = 0;
        this.appliedDiscountCode = null;
        
        // Simple settings
        this.settings = {
            variants: {
                'one': '52062844846413',
                'ep': '52062845796685', 
                'contact': '52062847467853'
            },
            discountCode: '15%MUSIC',
            discountPercentage: 15
        };
        
        this.init();
    }
    
    init() {
        console.log('🚀 Initializing MusicadoApp...');
        this.setupFormHandlers();
        console.log('✅ MusicadoApp ready');
    }
    
    setupFormHandlers() {
        // Package selection handler
        document.querySelectorAll('input[name="package"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.updateWordsSection(e.target.value);
            });
        });
        
        // Reason selection handler  
        const reasonSelect = document.getElementById('reason');
        if (reasonSelect) {
            reasonSelect.addEventListener('change', (e) => {
                const otherField = document.getElementById('otherReason');
                if (otherField) {
                    otherField.style.display = e.target.value === 'other' ? 'block' : 'none';
                    otherField.required = e.target.value === 'other';
                }
            });
        }
        
        // Form submission
        const form = document.getElementById('selectionForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
        
        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup();
            });
        }
    }
    
    handleFormSubmit() {
        console.log('📝 Processing form...');
        
        if (this.validateForm()) {
            this.formData = this.collectFormData();
            this.showSummary();
            this.showPage('page2');
        }
    }
    
    validateForm() {
        const errors = [];
        
        // Check package
        const packageSelected = document.querySelector('input[name="package"]:checked');
        if (!packageSelected) errors.push('Selecteer een pakket');
        
        // Check music styles
        const style1 = document.getElementById('musicStyle1');
        const style2 = document.getElementById('musicStyle2');
        if (!style1?.value) errors.push('Selecteer eerste muziekstijl');
        if (!style2?.value) errors.push('Selecteer tweede muziekstijl');
        
        // Check voice
        const voice = document.querySelector('input[name="voiceType"]:checked');
        if (!voice) errors.push('Selecteer stem voorkeur');
        
        // Check language
        const language = document.getElementById('songLanguage');
        if (!language?.value) errors.push('Selecteer taal');
        
        // Check reason
        const reason = document.getElementById('reason');
        if (!reason?.value) errors.push('Selecteer reden');
        
        if (reason?.value === 'other') {
            const otherReason = document.getElementById('otherReason');
            if (!otherReason?.value?.trim()) errors.push('Specificeer andere reden');
        }
        
        if (errors.length > 0) {
            alert('Vul de volgende velden in:\n• ' + errors.join('\n• '));
            return false;
        }
        
        return true;
    }
    
    collectFormData() {
        const packageSelected = document.querySelector('input[name="package"]:checked');
        const voiceSelected = document.querySelector('input[name="voiceType"]:checked');
        
        const formData = {
            package: packageSelected?.value || '',
            price: packageSelected?.dataset.price || '',
            musicStyle1: document.getElementById('musicStyle1')?.value || '',
            musicStyle2: document.getElementById('musicStyle2')?.value || '',
            voiceType: voiceSelected?.value || '',
            songLanguage: document.getElementById('songLanguage')?.value || '',
            reason: document.getElementById('reason')?.value || ''
        };
        
        // Add other reason if needed
        if (formData.reason === 'other') {
            formData.otherReason = document.getElementById('otherReason')?.value || '';
        }
        
        // Collect words
        if (formData.package === 'ep') {
            for (let song = 1; song <= 4; song++) {
                for (let word = 1; word <= 3; word++) {
                    const input = document.querySelector(`input[name="song${song}_word${word}"]`);
                    if (input?.value?.trim()) {
                        formData[`song${song}_word${word}`] = input.value.trim();
                    }
                }
            }
        } else if (formData.package === 'one') {
            for (let i = 1; i <= 3; i++) {
                const input = document.querySelector(`input[name="word${i}"]`);
                if (input?.value?.trim()) {
                    formData[`word${i}`] = input.value.trim();
                }
            }
        }
        
        console.log('✅ Form data collected');
        return formData;
    }
    
    showSummary() {
        const summaryContent = document.getElementById('summaryContent');
        if (!summaryContent) return;
        
        // Package labels
        const packageLabels = {
            'one': 'Één Liedje (€49)',
            'ep': 'EP - 4 Liedjes (€99)', 
            'contact': 'Volledig Album (Prijs op aanvraag)'
        };
        
        // Voice labels
        const voiceLabels = {
            'male': 'Mannelijke Stem',
            'female': 'Vrouwelijke Stem',
            'no_preference': 'Geen Voorkeur'
        };
        
        let html = '<div class="summary-list">';
        
        // Package
        html += `<div class="summary-row">
            <span>Pakket:</span>
            <span>${packageLabels[this.formData.package] || this.formData.package}</span>
        </div>`;
        
        // Music styles
        if (this.formData.musicStyle1 && this.formData.musicStyle2) {
            html += `<div class="summary-row">
                <span>Muziekstijlen:</span>
                <span>${this.formData.musicStyle1} + ${this.formData.musicStyle2}</span>
            </div>`;
        }
        
        // Voice
        if (this.formData.voiceType) {
            html += `<div class="summary-row">
                <span>Stem:</span>
                <span>${voiceLabels[this.formData.voiceType] || this.formData.voiceType}</span>
            </div>`;
        }
        
        // Language
        if (this.formData.songLanguage) {
            html += `<div class="summary-row">
                <span>Taal:</span>
                <span>${this.formData.songLanguage}</span>
            </div>`;
        }
        
        // Reason
        if (this.formData.reason) {
            let reasonText = this.formData.reason;
            if (this.formData.reason === 'other' && this.formData.otherReason) {
                reasonText = this.formData.otherReason;
            }
            html += `<div class="summary-row">
                <span>Reden:</span>
                <span>${reasonText}</span>
            </div>`;
        }
        
        // Words
        if (this.formData.package === 'ep') {
            for (let song = 1; song <= 4; song++) {
                const words = [];
                for (let word = 1; word <= 3; word++) {
                    const wordValue = this.formData[`song${song}_word${word}`];
                    if (wordValue) words.push(wordValue);
                }
                if (words.length > 0) {
                    html += `<div class="summary-row">
                        <span>Liedje ${song} Woorden:</span>
                        <span>${words.join(', ')}</span>
                    </div>`;
                }
            }
        } else if (this.formData.package === 'one') {
            const words = [];
            for (let i = 1; i <= 3; i++) {
                const wordValue = this.formData[`word${i}`];
                if (wordValue) words.push(wordValue);
            }
            if (words.length > 0) {
                html += `<div class="summary-row">
                    <span>Woorden/Namen:</span>
                    <span>${words.join(', ')}</span>
                </div>`;
            }
        }
        
        html += '</div>';
        summaryContent.innerHTML = html;
        
        // Add customer form
        this.addCustomerForm();
        
        // Calculate total
        this.calculateTotal();
        
        // Show correct payment section
        const paymentSection = document.getElementById('paymentSection');
        const contactSection = document.getElementById('contactSection');
        
        if (this.formData.package === 'contact') {
            if (paymentSection) paymentSection.style.display = 'none';
            if (contactSection) contactSection.style.display = 'block';
        } else {
            if (paymentSection) paymentSection.style.display = 'block';
            if (contactSection) contactSection.style.display = 'none';
        }
    }
    
    addCustomerForm() {
        let customerSection = document.querySelector('#page2 .customer-form');
        
        if (!customerSection) {
            const summaryContent = document.getElementById('summaryContent');
            if (summaryContent) {
                const customerHTML = `
                    <div class="customer-form">
                        <h3>Klantgegevens</h3>
                        <div class="form-grid">
                            <div>
                                <label for="firstName">Voornaam *</label>
                                <input type="text" id="firstName" name="firstName" required>
                            </div>
                            <div>
                                <label for="lastName">Achternaam *</label>
                                <input type="text" id="lastName" name="lastName" required>
                            </div>
                            <div>
                                <label for="customerEmail">E-mail *</label>
                                <input type="email" id="customerEmail" name="customerEmail" required>
                            </div>
                            <div>
                                <label for="mobilePhone">Telefoon *</label>
                                <input type="tel" id="mobilePhone" name="mobilePhone" required>
                            </div>
                        </div>
                        <div class="terms-check">
                            <input type="checkbox" id="agreeTerms" required>
                            <label for="agreeTerms">Ik ga akkoord met de algemene voorwaarden</label>
                        </div>
                    </div>
                `;
                
                summaryContent.insertAdjacentHTML('afterend', customerHTML);
            }
        }
    }
    
    calculateTotal() {
        if (this.formData.package === 'contact') {
            const totalElement = document.getElementById('totalPrice');
            if (totalElement) {
                totalElement.innerHTML = `
                    <div class="total-display">
                        <span>Prijs: Neem contact op voor offerte</span>
                    </div>
                `;
            }
            return;
        }
        
        const originalPrice = parseFloat(this.formData.price);
        if (isNaN(originalPrice)) return;
        
        let discountAmount = this.appliedDiscount || 0;
        const finalPrice = originalPrice - discountAmount;
        
        const totalElement = document.getElementById('totalPrice');
        if (totalElement) {
            let html = '<div class="total-display">';
            
            if (discountAmount > 0) {
                html += `
                    <div class="total-line">Subtotaal: €${originalPrice.toFixed(2)}</div>
                    <div class="total-line discount">Korting: -€${discountAmount.toFixed(2)}</div>
                    <div class="total-line final">Totaal: €${finalPrice.toFixed(2)}</div>
                `;
            } else {
                html += `<div class="total-line final">Totaal: €${originalPrice.toFixed(2)}</div>`;
            }
            
            html += '</div>';
            totalElement.innerHTML = html;
        }
        
        // Store final price
        this.formData.finalPrice = finalPrice.toFixed(2);
        this.formData.discountAmount = discountAmount.toFixed(2);
    }
    
    updateWordsSection(packageType) {
        const wordsContainer = document.getElementById('wordsContainer');
        if (!wordsContainer) return;
        
        let html = '';
        
        if (packageType === 'ep') {
            html = '<p>Voor elke van de 4 liedjes, vul maximaal 3 woorden/namen in:</p>';
            for (let song = 1; song <= 4; song++) {
                html += `<div class="words-group">
                    <h4>Liedje ${song}:</h4>
                    <div class="words-inputs">`;
                for (let word = 1; word <= 3; word++) {
                    html += `<input type="text" name="song${song}_word${word}" placeholder="Woord ${word}">`;
                }
                html += '</div></div>';
            }
        } else if (packageType === 'one') {
            html = '<p>Vul maximaal 3 woorden/namen in:</p>';
            html += '<div class="words-inputs">';
            for (let i = 1; i <= 3; i++) {
                html += `<input type="text" name="word${i}" placeholder="Woord/Naam ${i}">`;
            }
            html += '</div>';
        } else if (packageType === 'contact') {
            html = '<p>Voor het volledige album pakket bespreken we uw wensen persoonlijk.</p>';
        }
        
        wordsContainer.innerHTML = html;
    }
    
    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    goBack() {
        this.showPage('page1');
    }
    
    collectCustomerData() {
        this.customerData = {
            firstName: document.getElementById('firstName')?.value || '',
            lastName: document.getElementById('lastName')?.value || '',
            email: document.getElementById('customerEmail')?.value || '',
            phone: document.getElementById('mobilePhone')?.value || '',
            termsAccepted: document.getElementById('agreeTerms')?.checked || false
        };
        
        return this.customerData;
    }
    
    validateCustomerData() {
        const customerData = this.collectCustomerData();
        const errors = [];
        
        if (!customerData.firstName?.trim()) errors.push('Voornaam');
        if (!customerData.lastName?.trim()) errors.push('Achternaam');
        if (!customerData.email?.trim()) errors.push('E-mail');
        if (!customerData.phone?.trim()) errors.push('Telefoon');
        if (!customerData.termsAccepted) errors.push('Algemene voorwaarden');
        
        if (errors.length > 0) {
            alert('Vul de volgende velden in:\n• ' + errors.join('\n• '));
            return false;
        }
        
        return true;
    }
    
    processPayment() {
        console.log('💳 Processing payment...');
        
        try {
            // Validate customer data
            if (!this.validateCustomerData()) {
                return;
            }
            
            // Get variant ID
            const variantId = this.settings.variants[this.formData.package];
            if (!variantId) {
                alert('Product variant niet gevonden. Neem contact op.');
                return;
            }
            
            console.log('💳 Using variant ID:', variantId);
            
            // Try AJAX first
            this.submitViaAjax(variantId);
            
        } catch (error) {
            console.error('Payment error:', error);
            alert('Er ging iets mis bij de betaling. Probeer opnieuw.');
        }
    }
    
    async submitViaAjax(variantId) {
        const cartData = {
            id: variantId,
            quantity: 1,
            properties: {
                'Pakket': this.formData.package,
                'Muziekstijl 1': this.formData.musicStyle1,
                'Muziekstijl 2': this.formData.musicStyle2,
                'Stem Voorkeur': this.formData.voiceType,
                'Liedje Taal': this.formData.songLanguage,
                'Reden': this.formData.reason,
                'Klant Details': `${this.customerData.firstName} ${this.customerData.lastName}, ${this.customerData.email}, ${this.customerData.phone}`
            }
        };
        
        // Add words
        const words = this.collectWords();
        if (words.length > 0) {
            cartData.properties['Woorden/Namen'] = words.join(', ');
        }
        
        console.log('📡 Sending to cart:', cartData);
        
        try {
            const response = await fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(cartData)
            });
            
            if (response.ok) {
                console.log('✅ Payment successful');
                alert('🎉 Bestelling toegevoegd aan winkelwagen!\n\nU wordt doorgestuurd naar de checkout.');
                window.location.href = '/cart';
            } else {
                console.log('AJAX failed, trying redirect method...');
                this.submitViaRedirect(variantId);
            }
            
        } catch (error) {
            console.error('AJAX failed, trying redirect:', error);
            this.submitViaRedirect(variantId);
        }
    }
    
    submitViaRedirect(variantId) {
        console.log('🔀 Using redirect method...');
        
        // Save order data for manual retrieval if needed
        try {
            localStorage.setItem('musicado_order', JSON.stringify({
                formData: this.formData,
                customerData: this.customerData,
                timestamp: new Date().toISOString()
            }));
        } catch (e) {
            // LocalStorage might be disabled, continue anyway
        }
        
        // Redirect to cart with product
        window.location.href = `/cart/${variantId}:1`;
    }
    
    collectWords() {
        const words = [];
        
        if (this.formData.package === 'ep') {
            for (let song = 1; song <= 4; song++) {
                for (let word = 1; word <= 3; word++) {
                    const wordValue = this.formData[`song${song}_word${word}`];
                    if (wordValue?.trim()) {
                        words.push(`Liedje${song}-${wordValue.trim()}`);
                    }
                }
            }
        } else {
            for (let i = 1; i <= 3; i++) {
                const wordValue = this.formData[`word${i}`];
                if (wordValue?.trim()) {
                    words.push(wordValue.trim());
                }
            }
        }
        
        return words;
    }
    
    applyDiscountCode() {
        const codeInput = document.getElementById('discountCodeInput');
        const messageDiv = document.getElementById('discountMessage');
        
        if (!codeInput || !messageDiv) return;
        
        const code = codeInput.value.trim().toUpperCase();
        
        if (code === this.settings.discountCode) {
            const originalPrice = parseFloat(this.formData.price);
            this.appliedDiscount = originalPrice * (this.settings.discountPercentage / 100);
            this.appliedDiscountCode = code;
            
            messageDiv.textContent = `✅ Kortingscode toegepast! ${this.settings.discountPercentage}% korting`;
            messageDiv.style.color = '#10b981';
            messageDiv.style.display = 'block';
            
            this.calculateTotal();
            
            console.log('✅ Discount applied:', this.appliedDiscount);
        } else {
            messageDiv.textContent = '❌ Ongeldige kortingscode';
            messageDiv.style.color = '#ef4444';
            messageDiv.style.display = 'block';
        }
    }
    
    handleNewsletterSignup() {
        const emailInput = document.getElementById('newsletterEmail');
        if (!emailInput) return;
        
        const email = emailInput.value.trim();
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Voer een geldig e-mailadres in');
            return;
        }
        
        // Here you would normally send to your newsletter service
        console.log('📧 Newsletter signup:', email);
        
        alert('✅ Bedankt voor uw aanmelding!\n\nU ontvangt binnenkort onze nieuwsbrief.');
        emailInput.value = '';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM loaded - initializing MusicadoApp...');
    
    try {
        window.MusicadoApp = new MusicadoApp();
        console.log('✅ MusicadoApp initialized successfully');
    } catch (error) {
        console.error('❌ MusicadoApp initialization failed:', error);
    }
});

// Global payment function for button onclick
function processPayment() {
    if (window.MusicadoApp) {
        window.MusicadoApp.processPayment();
    } else {
        console.error('MusicadoApp not loaded');
        alert('Applicatie niet geladen. Ververs de pagina en probeer opnieuw.');
    }
}

console.log('🎵 Simple MusicadoApp loaded successfully');
