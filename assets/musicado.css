/* Enhanced Musicado CSS with Debug Tools */
/* Version: 2.0 - Cart Fix Edition */

:root {
    --primary-color: #3b82f6;
    --secondary-color: #1e40af;
    --accent-color: #06b6d4;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
    --background-color: #f8fafc;
    --text-color: #1e293b;
    --border-color: #e2e8f0;
    --card-background: #ffffff;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Page Management */
.page {
    display: none;
    min-height: 100vh;
    padding: 20px 0;
}

.page.active {
    display: block;
}

/* Cards */
.card {
    background: var(--card-background);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
}

/* Banner */
.banner {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    text-align: center;
    padding: 60px 20px;
    margin-bottom: 40px;
    border-radius: 16px;
}

.banner h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 16px;
}

/* Form Styles */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text-color);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

input[type="text"],
input[type="email"],
input[type="tel"],
select,
textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s ease;
    background: white;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
select:focus,
textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Form Error States */
.form-error,
input.form-error,
select.form-error {
    border-color: var(--error-color) !important;
    background-color: #fef2f2;
}

.form-error:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

/* Radio Groups */
.radio-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.radio-option {
    display: flex;
    align-items: center;
    padding: 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: white;
}

.radio-option:hover {
    border-color: var(--primary-color);
    background-color: #f8fafc;
}

.radio-option input[type="radio"] {
    margin-right: 12px;
    scale: 1.2;
}

.radio-option input[type="radio"]:checked + label,
.radio-option:has(input[type="radio"]:checked) {
    background-color: rgba(59, 130, 246, 0.1);
    border-color: var(--primary-color);
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 24px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    min-height: 48px;
}

.btn:hover {
    background: var(--secondary-color);
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
}

.btn:active {
    transform: translateY(0);
}

.btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

/* Payment Button */
.payment-btn {
    background: var(--success-color);
    font-size: 18px;
    padding: 16px 32px;
    width: 100%;
    margin-top: 20px;
}

.payment-btn:hover {
    background: #059669;
}

.contact-btn {
    background: var(--accent-color);
    font-size: 18px;
    padding: 16px 32px;
    width: 100%;
}

.contact-btn:hover {
    background: #0891b2;
}

.back-btn {
    background: #6b7280;
    margin-top: 20px;
}

.back-btn:hover {
    background: #4b5563;
}

/* Button Loading State */
.button-loading {
    display: none;
    align-items: center;
    gap: 8px;
}

.loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Words Section */
.words-song-group {
    margin-bottom: 20px;
    padding: 16px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid var(--border-color);
}

.words-song-group h4 {
    margin-bottom: 12px;
    color: var(--primary-color);
    font-weight: 600;
}

.words-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
}

/* Audio Examples */
.audio-examples-title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2rem;
    color: var(--text-color);
}

.audio-players {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}

.audio-player {
    background: #f8fafc;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    text-align: center;
}

.audio-info h3 {
    margin-bottom: 8px;
    color: var(--primary-color);
}

.audio-info p {
    margin-bottom: 16px;
    color: #6b7280;
}

audio {
    width: 100%;
    margin-bottom: 16px;
}

.audio-refresh-btn {
    background: var(--accent-color);
    font-size: 14px;
    padding: 8px 16px;
}

/* Summary Styles */
.summary-items {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid var(--border-color);
}

.summary-label {
    font-weight: 600;
    color: var(--text-color);
}

.summary-value {
    font-weight: 500;
    color: var(--primary-color);
    text-align: right;
}

/* Customer Details */
.customer-details-section {
    margin: 24px 0;
    padding: 24px;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid var(--border-color);
}

.customer-details-section h3 {
    margin-bottom: 20px;
    color: var(--text-color);
    font-size: 1.5rem;
}

/* Discount Code Section */
.discount-code-section {
    margin: 24px 0;
    padding: 20px;
    background: #f0fdf4;
    border-radius: 12px;
    border: 1px solid #bbf7d0;
}

.discount-input-container {
    display: flex;
    gap: 12px;
    margin-top: 12px;
}

.discount-input-container input {
    flex: 1;
}

.discount-apply-btn {
    background: var(--success-color);
    white-space: nowrap;
}

.discount-message {
    margin-top: 12px;
    padding: 8px 12px;
    border-radius: 6px;
    font-weight: 500;
}

/* Total Price */
.total-price-section {
    margin: 24px 0;
}

.total-breakdown {
    background: white;
    border: 2px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
}

.total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border-color);
}

.total-row:last-child {
    border-bottom: none;
}

.total-row.subtotal {
    background: #f8fafc;
}

.total-row.discount {
    background: #f0fdf4;
    color: var(--success-color);
}

.total-row.final {
    background: var(--primary-color);
    color: white;
    font-weight: 700;
    font-size: 1.25rem;
}

/* Payment Error */
.payment-error {
    margin: 20px 0;
    padding: 20px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 12px;
    color: var(--error-color);
}

.error-message {
    margin-bottom: 16px;
    font-weight: 600;
}

/* Testimonials */
.featured-testimonials-container {
    margin: 40px 0;
}

.featured-testimonials {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}

.testimonial {
    background: white;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow);
}

.testimonial .stars {
    color: #fbbf24;
    font-size: 1.2rem;
    margin-bottom: 12px;
}

.testimonial-text {
    font-style: italic;
    margin-bottom: 16px;
    line-height: 1.6;
}

.customer-name {
    font-weight: 600;
    color: var(--primary-color);
}

/* Newsletter */
.newsletter-section {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    margin: 40px 0;
    border-radius: 16px;
}

.newsletter-card {
    padding: 40px 20px;
    text-align: center;
}

.newsletter-content h3 {
    color: white;
    font-size: 2rem;
    margin-bottom: 16px;
}

.newsletter-content p {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 24px;
    font-size: 1.1rem;
}

.newsletter-form {
    max-width: 400px;
    margin: 0 auto;
}

.newsletter-input-group {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
}

.newsletter-input-group input {
    flex: 1;
}

.newsletter-btn {
    background: white;
    color: var(--primary-color);
    white-space: nowrap;
}

.newsletter-btn:hover {
    background: #f8fafc;
}

.newsletter-terms {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
}

/* ===== ENHANCED DEBUG TOOLS STYLES ===== */

/* Debug Container */
.debug-container {
    background: rgba(59, 130, 246, 0.05);
    border: 2px solid rgba(59, 130, 246, 0.2);
    border-radius: 12px;
    padding: 20px;
    margin: 20px 0;
}

.debug-container h4 {
    color: var(--primary-color);
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Debug Buttons */
.debug-container .btn {
    margin: 5px;
    font-size: 14px;
    padding: 8px 16px;
    min-height: auto;
}

.debug-container .btn[style*="background: #f59e0b"] {
    background: var(--warning-color) !important;
}

.debug-container .btn[style*="background: #ef4444"] {
    background: var(--error-color) !important;
}

.debug-container .btn[style*="background: #10b981"] {
    background: var(--success-color) !important;
}

.debug-container .btn[style*="background: #8b5cf6"] {
    background: #8b5cf6 !important;
}

/* Debug Results */
#debugResults {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 16px;
    margin-top: 16px;
}

#debugResults h5 {
    color: var(--text-color);
    margin-bottom: 12px;
    font-size: 1rem;
}

#debugOutput {
    background: #1e293b;
    color: #e2e8f0;
    padding: 12px;
    border-radius: 6px;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 12px;
    overflow-x: auto;
    white-space: pre;
    line-height: 1.4;
}

/* Debug Status Indicators */
.status-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
}

.status-indicator.success {
    background: var(--success-color);
}

.status-indicator.error {
    background: var(--error-color);
}

.status-indicator.warning {
    background: var(--warning-color);
}

/* Debug Info Boxes */
.debug-info {
    background: #dbeafe;
    border: 1px solid #93c5fd;
    border-radius: 8px;
    padding: 12px;
    margin: 12px 0;
    font-family: monospace;
    font-size: 13px;
}

.debug-success {
    background: #dcfce7;
    border-color: #86efac;
    color: #166534;
}

.debug-error {
    background: #fef2f2;
    border-color: #fca5a5;
    color: #991b1b;
}

.debug-warning {
    background: #fefce8;
    border-color: #fde047;
    color: #92400e;
}

/* Alternative Payment Button */
#alternativePayment {
    display: none;
    background: var(--success-color) !important;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.8;
    }
}

/* Contact Info Styling */
.contact-info {
    margin-top: 20px;
    padding: 16px;
    background: #f0fdf4;
    border-radius: 8px;
    border: 1px solid #bbf7d0;
}

.contact-info strong {
    color: var(--primary-color);
}

/* Order Reminder */
.order-reminder {
    margin: 24px 0;
    padding: 20px;
    background: #fffbeb;
    border: 1px solid #fed7aa;
    border-radius: 12px;
}

.order-reminder h4 {
    color: var(--warning-color);
    margin-bottom: 12px;
}

.order-reminder ul {
    list-style: none;
    padding-left: 0;
}

.order-reminder li {
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;
}

.order-reminder li:before {
    content: "ℹ️";
    position: absolute;
    left: 0;
}

.contact-link {
    color: var(--primary-color);
    text-decoration: underline;
}

.contact-link:hover {
    color: var(--secondary-color);
}

/* Price Comparison */
.price-comparison {
    margin: 30px 0;
}

.comparison-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
}

.expensive-option,
.our-option {
    padding: 24px;
    border-radius: 12px;
    text-align: center;
}

.expensive-option {
    background: linear-gradient(135deg, #fef2f2, #fee2e2);
    border: 2px solid #fca5a5;
}

.our-option {
    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    border: 2px solid #86efac;
}

.expensive-option h3 {
    color: var(--error-color);
    margin-bottom: 16px;
}

.our-option h3 {
    color: var(--success-color);
    margin-bottom: 16px;
}

.expensive-list,
.our-list {
    list-style: none;
    margin-bottom: 16px;
}

.expensive-list li,
.our-list li {
    padding: 8px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.total-expensive {
    font-weight: 700;
    color: var(--error-color);
    font-size: 1.1rem;
}

.total-ours {
    font-weight: 700;
    color: var(--success-color);
    font-size: 1.1rem;
}

.vs-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    font-weight: 700;
    font-size: 1.2rem;
}

.comparison-conclusion {
    text-align: center;
    padding: 20px;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid var(--border-color);
}

.comparison-conclusion p {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-color);
}

/* Package Disclaimer */
.package-disclaimer {
    margin-top: 16px;
    padding: 12px;
    background: #fffbeb;
    border: 1px solid #fed7aa;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #92400e;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 0 16px;
    }
    
    .card {
        padding: 20px;
        margin-bottom: 16px;
    }
    
    .banner {
        padding: 40px 20px;
        margin-bottom: 30px;
    }
    
    .banner h1 {
        font-size: 2rem;
    }
    
    .form-row {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    
    .comparison-container {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    
    .vs-divider {
        order: -1;
        margin: 0 auto;
    }
    
    .featured-testimonials {
        grid-template-columns: 1fr;
    }
    
    .audio-players {
        grid-template-columns: 1fr;
    }
    
    .newsletter-input-group {
        flex-direction: column;
    }
    
    .discount-input-container {
        flex-direction: column;
    }
    
    .summary-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
    
    .summary-value {
        text-align: left;
    }
    
    .words-row {
        grid-template-columns: 1fr;
    }
    
    /* Debug tools mobile optimization */
    .debug-container .btn {
        display: block;
        width: 100%;
        margin: 5px 0;
        text-align: center;
    }
    
    #debugOutput {
        font-size: 11px;
    }
}

@media (max-width: 480px) {
    .banner h1 {
        font-size: 1.75rem;
    }
    
    .card {
        padding: 16px;
    }
    
    .btn {
        padding: 12px 20px;
        font-size: 15px;
    }
    
    .payment-btn,
    .contact-btn {
        padding: 14px 24px;
        font-size: 16px;
    }
}

/* Print Styles */
@media print {
    .debug-container,
    .payment-section,
    .contact-request-section,
    .btn {
        display: none !important;
    }
    
    .page {
        display: block !important;
    }
    
    .card {
        box-shadow: none;
        border: 1px solid #ccc;
    }
}
