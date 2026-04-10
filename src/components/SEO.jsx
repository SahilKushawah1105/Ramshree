import React from 'react'
import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, keywords, ogImage, canonicalUrl }) => {
    const siteName = 'Ramshree International'
    const fullTitle = `${title} | ${siteName} - Premium Indian Spices Exporter`
    const defaultDesc = 'Ramshree International is a leading merchant exporter of premium Indian spices like Turmeric, Chili, and Cumin. Quality-driven spice exporters from Ahmedabad, India.'

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDesc} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            {ogImage && <meta property="og:image" content={ogImage} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDesc} />

            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": siteName,
                    "url": "https://www.ramshreeinternational.com",
                    "logo": "https://www.ramshreeinternational.com/logo.png",
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+91-9727571536",
                        "contactType": "customer service",
                        "areaServed": "Worldwide",
                        "availableLanguage": ["en", "Hindi", "Gujarati"]
                    },
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "A-13, Saidham Tenament, Nr. Kameshwar Park, Vastral Road",
                        "addressLocality": "Ahmedabad",
                        "addressRegion": "Gujarat",
                        "postalCode": "382418",
                        "addressCountry": "IN"
                    }
                })}
            </script>
        </Helmet>
    )
}

export default SEO
