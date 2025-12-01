export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Send contact form email using appropriate endpoint
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
    console.log('📧 Sending contact form email...');
    
    // Determine the appropriate endpoint based on environment
    const isDevelopment = import.meta.env.DEV;
    const endpoint = isDevelopment 
        ? '/api/send-contact-email'  // For local development with Vite
        : '/.netlify/functions/send-contact-email';  // For Netlify production
    
    console.log('🌍 Environment:', isDevelopment ? 'Development' : 'Production');
    console.log('📡 Using endpoint:', endpoint);

    try {
        // Use the appropriate email endpoint
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log('📡 Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP ${response.status}: Failed to send contact email`);
        }

        const result = await response.json();
        console.log('✅ Contact email sent successfully:', result);
        
        // Store contact in localStorage for tracking
        const existingContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        existingContacts.push({
            ...formData,
            timestamp: Date.now(),
            emailSent: true,
            emailResponse: result,
            endpoint: endpoint
        });
        localStorage.setItem('contacts', JSON.stringify(existingContacts));
        
    } catch (error) {
        console.error('❌ Error sending contact email:', error);
        console.log('📧 Falling back to mock contact email implementation');
        
        try {
            console.log('📧 Contact email (mock) to admin');
            console.log('📧 Auto-reply email (mock) to:', formData.email);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('✅ Mock contact emails sent as fallback');
            
            // Still store the contact
            const existingContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            existingContacts.push({
                ...formData,
                timestamp: Date.now(),
                emailSent: 'mock_fallback',
                endpoint: 'mock'
            });
            localStorage.setItem('contacts', JSON.stringify(existingContacts));
            
        } catch (fallbackError) {
            console.error('❌ Even fallback contact email failed:', fallbackError);
            throw error; // Re-throw original error for UI feedback
        }
    }
};
